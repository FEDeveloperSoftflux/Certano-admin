import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';

/**
 * Rich text editor component for WhatsNew posts
 * 
 * @param {Object} props - Component props
 * @param {string} props.initialContent - Initial HTML content
 * @param {Function} props.onSave - Handler called when saving content
 * @param {Function} props.onCancel - Handler called when canceling edit
 * @returns {JSX.Element} Editor component
 */
const Editor = ({ initialContent = '', onSave, onCancel }) => {
  // Editor state
  const [status, setStatus] = useState('Draft');
  const [visibility, setVisibility] = useState('Public');
  const [schedule, setSchedule] = useState('Off');
  const [isPublishing, setIsPublishing] = useState(false);

  // Initialize editor with extensions
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Placeholder.configure({
        placeholder: 'Start writing your post...',
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-full focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  // Handle publishing
  const handlePublish = async () => {
    if (!editor) return;
    
    try {
      setIsPublishing(true);
      
      // Get HTML content from editor
      const content = editor.getHTML();
      
      // Call save handler with content and metadata
      await onSave({
        content,
        status,
        visibility,
        schedule: schedule === 'Off' ? null : schedule,
      });
      
      // Show success message or redirect
    } catch (error) {
      console.error('Error publishing post:', error);
      // Show error message
    } finally {
      setIsPublishing(false);
    }
  };

  // Handle editor keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Save on Ctrl+S / Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handlePublish();
      }
      
      // Cancel on Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel?.();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [editor, onSave, onCancel]);

  // If editor isn't ready yet, show loading
  if (!editor) {
    return <div className="animate-pulse bg-[#222] h-[300px] rounded-lg"></div>;
  }

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-[#333]">
        <h2 className="text-xl font-medium text-white">Create post</h2>
        <button
          onClick={onCancel}
          className="px-4 py-1.5 bg-[#333] hover:bg-[#444] rounded-full text-white text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-1">
        {/* Editor area */}
        <div className="flex-1 overflow-auto">
          {/* Toolbar */}
          <div className="flex items-center gap-2 p-3 border-b border-[#333] bg-[#1a1a1a]">
            {/* Paragraph style dropdown */}
            <select 
              value={editor.isActive('heading') ? `h${editor.getAttributes('heading').level}` : 'p'}
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'p') {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor.chain().focus().toggleHeading({ level: parseInt(value.replace('h', '')) }).run();
                }
              }}
              className="bg-[#222] text-white rounded px-2 py-1 text-sm border border-[#444]"
            >
              <option value="p">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
            </select>
            
            {/* Divider */}
            <div className="w-px h-6 bg-[#444]"></div>
            
            {/* Basic formatting */}
            <button 
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1.5 rounded hover:bg-[#333] ${editor.isActive('bold') ? 'bg-[#333]' : ''}`}
              title="Bold"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h8a4 4 0 0 0 0-8H6v8zm0 0h10a4 4 0 1 1 0 8H6v-8z" />
              </svg>
            </button>
            
            <button 
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1.5 rounded hover:bg-[#333] ${editor.isActive('italic') ? 'bg-[#333]' : ''}`}
              title="Italic"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 4h-9M14 20H5M14.8 4L9.2 20" />
              </svg>
            </button>
            
            <button 
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-1.5 rounded hover:bg-[#333] ${editor.isActive('underline') ? 'bg-[#333]' : ''}`}
              title="Underline"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 5v5a5 5 0 0 0 10 0V5M5 19h14" />
              </svg>
            </button>
            
            {/* Divider */}
            <div className="w-px h-6 bg-[#444]"></div>
            
            {/* Text alignment */}
            <button 
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`p-1.5 rounded hover:bg-[#333] ${editor.isActive({ textAlign: 'left' }) ? 'bg-[#333]' : ''}`}
              title="Align left"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h14" />
              </svg>
            </button>
            
            <button 
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`p-1.5 rounded hover:bg-[#333] ${editor.isActive({ textAlign: 'center' }) ? 'bg-[#333]' : ''}`}
              title="Align center"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M6 18h12" />
              </svg>
            </button>
            
            <button 
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`p-1.5 rounded hover:bg-[#333] ${editor.isActive({ textAlign: 'right' }) ? 'bg-[#333]' : ''}`}
              title="Align right"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M6 18h14" />
              </svg>
            </button>
            
            {/* Divider */}
            <div className="w-px h-6 bg-[#444]"></div>
            
            {/* Lists */}
            <button 
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-1.5 rounded hover:bg-[#333] ${editor.isActive('bulletList') ? 'bg-[#333]' : ''}`}
              title="Bullet list"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16M3 6v.01M3 12v.01M3 18v.01" />
              </svg>
            </button>
            
            <button 
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-1.5 rounded hover:bg-[#333] ${editor.isActive('orderedList') ? 'bg-[#333]' : ''}`}
              title="Numbered list"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16M8 6V4m0 2v2M8 12v-2m0 2v2M8 18v-2m0 2v2" />
              </svg>
            </button>
          </div>
          
          {/* Content editor */}
          <div className="bg-[#1d1d1d] min-h-[500px]">
            <EditorContent editor={editor} className="h-full" />
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="w-80 border-l border-[#333] p-4 bg-[#1a1a1a]">
          <div className="flex flex-col gap-4">
            <div>
              <button 
                onClick={handlePublish}
                disabled={isPublishing}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPublishing ? 'Publishing...' : 'Publish'}
              </button>
            </div>
            
            {/* Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-white">Status: {status}</span>
              </div>
              <button 
                onClick={() => {}}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Edit
              </button>
            </div>
            
            {/* Visibility */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-white">Visibility: {visibility}</span>
              </div>
              <button 
                onClick={() => {}}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Edit
              </button>
            </div>
            
            {/* Schedule */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-white">Schedule: {schedule}</span>
              </div>
              <button 
                onClick={() => {}}
                className="text-purple-400 hover:text-purple-300 text-sm"
              >
                Edit
              </button>
            </div>
            
            {/* Learn More URL */}
            <div className="mt-4">
              <label className="block text-white mb-2">Learn More URL</label>
              <input 
                type="url" 
                placeholder="https://example.com/learn-more"
                className="w-full bg-[#222] border border-[#444] rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Editor.propTypes = {
  initialContent: PropTypes.string,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default Editor;
