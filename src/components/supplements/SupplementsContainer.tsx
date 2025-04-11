
import { Supplement } from '@/types/supplement';
import SupplementsList from '@/components/supplements/SupplementsList';
import SupplementDetail from '@/components/supplements/SupplementDetail';

interface SupplementsContainerProps {
  supplements: Supplement[];
  selectedSupplement: Supplement | null;
  onSelectSupplement: (supplement: Supplement) => void;
  onCreateSupplement: () => void;
  statusFilter: string;
}

const SupplementsContainer = ({ 
  supplements, 
  selectedSupplement, 
  onSelectSupplement, 
  onCreateSupplement, 
  statusFilter 
}: SupplementsContainerProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <SupplementsList
        supplements={supplements}
        selectedSupplement={selectedSupplement}
        onSelectSupplement={onSelectSupplement}
        initialStatusFilter={statusFilter}
      />
      
      <div className="lg:col-span-2">
        {selectedSupplement ? (
          <SupplementDetail supplement={selectedSupplement} />
        ) : (
          <div className="flex items-center justify-center h-full bg-muted/20 rounded-lg border p-8">
            <div className="text-center">
              <h3 className="font-medium text-lg mb-2">No Supplement Selected</h3>
              <p className="text-muted-foreground mb-4">
                Select a supplement from the list to view its details
              </p>
              <button 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                onClick={onCreateSupplement}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                Create New Supplement
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplementsContainer;
