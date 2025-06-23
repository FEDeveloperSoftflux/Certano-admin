import Card from '@/components/common/Card';
import Button from '@/components/common/Button';

const Reporting = () => {
  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-schibsted font-bold text-white mb-1">Reporting</h1>
          <p className="text-text-body">View and generate reports here.</p>
        </div>
        
        <Button className="px-4 py-2">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export Report
          </span>
        </Button>
      </div>
      
      <Card className="w-full">
        <div className="flex justify-center items-center py-12">
          <p className="text-text-body text-lg">Reporting Content Coming Soon</p>
        </div>
      </Card>
    </div>
  );
};

export default Reporting;
