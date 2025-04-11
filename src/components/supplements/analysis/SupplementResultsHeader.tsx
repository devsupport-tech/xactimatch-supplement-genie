
import { Button } from '@/components/ui/button';
import { Clipboard, FileText } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface SupplementResultsHeaderProps {
  fileName: string;
}

const SupplementResultsHeader = ({ fileName }: SupplementResultsHeaderProps) => {
  const handleCopyToClipboard = () => {
    toast({
      title: "Copied to clipboard",
      description: "The analysis results have been copied to your clipboard.",
    });
  };
  
  const handleExportPDF = () => {
    toast({
      title: "Exporting PDF",
      description: "Your analysis is being exported to PDF format.",
    });
  };

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Analysis Results: {fileName}</h2>
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleCopyToClipboard}>
          <Clipboard className="mr-2 h-4 w-4" />
          Copy
        </Button>
        <Button variant="outline" onClick={handleExportPDF}>
          <FileText className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default SupplementResultsHeader;
