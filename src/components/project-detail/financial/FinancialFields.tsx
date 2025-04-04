
import React from 'react';
import EditableAmount from './EditableAmount';

interface FinancialFieldsProps {
  originalAmount: number;
  supplementAmount: number;
  onSave: (field: string, value: number) => Promise<void>;
}

const FinancialFields = ({ 
  originalAmount, 
  supplementAmount, 
  onSave 
}: FinancialFieldsProps) => {
  return (
    <div className="space-y-4">
      <EditableAmount 
        label="Original Estimate" 
        amount={originalAmount} 
        field="originalEstimate" 
        onSave={onSave} 
      />
      <EditableAmount 
        label="Supplement Total" 
        amount={supplementAmount} 
        field="supplemental" 
        onSave={onSave} 
      />
    </div>
  );
};

export default FinancialFields;
