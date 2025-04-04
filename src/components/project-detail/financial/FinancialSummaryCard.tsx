
import React from 'react';
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <FinancialFields 
            originalAmount={project.totalAmount}
            supplementAmount={totalSupplementAmount}
            onSave={handleSave}
          />
          <TotalDisplay amount={totalWithSupplements} />
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(FinancialSummaryCard);
