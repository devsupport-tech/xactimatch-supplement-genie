
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SupplementalForm from '@/components/SupplementalForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const NewSupplementRequest = () => {
  const navigate = useNavigate();
  
  const handleSupplementSubmit = (formData: any) => {
    console.log('Supplement request submitted:', formData);
    
    // After submission, navigate back to contractor portal
    setTimeout(() => {
      navigate('/contractors', { 
        state: { 
          notificationMessage: 'Your supplement request has been submitted successfully.' 
        } 
      });
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="mb-4" 
            onClick={() => navigate('/contractors')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portal
          </Button>
          
          <h1 className="text-3xl font-bold">Create Supplement Request</h1>
          <p className="text-muted-foreground mt-1">
            Submit a new supplement request for approval
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <SupplementalForm
            projectName=""
            claimNumber=""
            items={[]}
            totalAmount={0}
            onSubmit={handleSupplementSubmit}
          />
        </div>
      </main>
    </div>
  );
};

export default NewSupplementRequest;
