
import { useNavigate } from 'react-router-dom';
import { useSupplements } from '@/hooks/use-supplements';
import SupplementHeader from '@/components/supplements/SupplementHeader';
import SupplementsContainer from '@/components/supplements/SupplementsContainer';
import SupplementCreation from '@/components/supplements/SupplementCreation';

const Supplements = () => {
  const navigate = useNavigate();
  const { 
    enhancedSupplements, 
    selectedSupplement, 
    setSelectedSupplement, 
    isCreating, 
    selectedProjectId,
    statusFilter,
    handleCreateSupplement,
    handleCancelCreate,
    handleSupplementSubmit
  } = useSupplements();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        {!isCreating && (
          <SupplementHeader 
            statusFilter={statusFilter} 
            onCreateSupplement={handleCreateSupplement} 
          />
        )}

        {isCreating ? (
          <SupplementCreation
            selectedProjectId={selectedProjectId}
            onCancel={handleCancelCreate}
            onSubmit={(formData) => {
              handleSupplementSubmit(formData);
              navigate('/supplements', { replace: true });
            }}
          />
        ) : (
          <SupplementsContainer
            supplements={enhancedSupplements}
            selectedSupplement={selectedSupplement}
            onSelectSupplement={setSelectedSupplement}
            onCreateSupplement={handleCreateSupplement}
            statusFilter={statusFilter}
          />
        )}
      </main>
    </div>
  );
};

export default Supplements;
