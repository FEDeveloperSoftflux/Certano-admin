import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

const Settings = () => {
  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-schibsted font-bold text-white mb-1">Settings</h1>
          <p className="text-text-body">Configure your platform settings here.</p>
        </div>
        
        <Button variant="secondary" className="px-4 py-2">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Help & Info
          </span>
        </Button>
      </div>
      
      <Card className="w-full">
        <div className="flex justify-center items-center py-12">
          <p className="text-text-body text-lg">Settings Content Coming Soon</p>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
