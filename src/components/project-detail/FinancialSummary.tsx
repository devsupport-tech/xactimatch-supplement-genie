
import { ProjectCardProps } from '@/components/ProjectCard';
import FinancialSummaryCard from './financial/FinancialSummaryCard';

interface FinancialSummaryProps {
  project: ProjectCardProps;
}

const FinancialSummary = ({ project }: FinancialSummaryProps) => {
  return <FinancialSummaryCard project={project} />;
};

export default FinancialSummary;
