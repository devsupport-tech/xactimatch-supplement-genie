
import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ProjectCardProps } from '@/components/ProjectCard';
import FinancialFields from './FinancialFields';
import TotalDisplay from './TotalDisplay';
import { useFinancialData } from './useFinancialData';

interface FinancialSummaryCardProps {
  project: ProjectCardProps;
}

const FinancialSummaryCard = ({ project }: FinancialSummaryCardProps) => {
  const { 
    totalSupplementAmount, 
    totalWithSupplements, 
    handleSave 
  } = useFinancialData(project);

  // Memoize expensive calculations
  const financialSummary = useMemo(() => {
    return {
      originalAmount: project.totalAmount,
      supplementAmount: totalSupplementAmount,
      totalAmount: totalWithSupplements
    };
  }, [project.totalAmount, totalSupplementAmount, totalWithSupplements]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <FinancialFields 
            originalAmount={financialSummary.originalAmount}
            supplementAmount={financialSummary.supplementAmount}
            onSave={handleSave}
          />
          <TotalDisplay amount={financialSummary.totalAmount} />
        </div>
      </CardContent>
    </Card>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(FinancialSummaryCard);
