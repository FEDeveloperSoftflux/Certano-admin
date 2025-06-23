import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

const Sections = () => {
  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-schibsted font-bold text-white mb-1">Sections</h1>
          <p className="text-text-body">Manage your content sections here.</p>
        </div>
        
        <Button className="px-4 py-2">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Section
          </span>
        </Button>
      </div>
      
      <Card className="w-full">
        <div className="flex justify-center items-center py-12">
          <p className="text-text-body text-lg">Sections Content Coming Soon</p>
        </div>
      </Card>
    </div>
  );
};

export default Sections;
