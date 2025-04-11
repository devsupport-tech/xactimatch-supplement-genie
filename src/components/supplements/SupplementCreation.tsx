
import { useState } from 'react';
import { ArrowLeft, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import SupplementalForm from '@/components/SupplementalForm';
import ComparisonView from '@/components/ComparisonView';
import { mockProjects } from '@/mock/projects';

interface SupplementCreationProps {
  selectedProjectId: string | null;
  onCancel: () => void;
  onSubmit: (formData: any) => void;
}

const mockOriginalItems = [
  {
    id: "1",
    code: "RFG-100",
    description: "Asphalt Shingles Installation",
    category: "Roofing",
    quantity: 24,
    unit: "SQ",
    unitPrice: 325.50,
    totalPrice: 7812.00
  },
  {
    id: "2",
    code: "PLB-200",
    description: "Bathroom Sink Replacement",
    category: "Plumbing",
    quantity: 1,
    unit: "EA",
    unitPrice: 450.00,
    totalPrice: 450.00
  },
  {
    id: "3",
    code: "ELC-300",
    description: "Kitchen Light Fixture",
    category: "Electrical",
    quantity: 2,
    unit: "EA",
    unitPrice: 125.00,
    totalPrice: 250.00
  }
];

const mockNewItems = [
  {
    id: "1",
    code: "RFG-100",
    description: "Asphalt Shingles Installation",
    category: "Roofing",
    quantity: 32,
    unit: "SQ",
    unitPrice: 345.75,
    totalPrice: 11064.00
  },
  {
    id: "2",
    code: "PLB-200",
    description: "Bathroom Sink Replacement",
    category: "Plumbing",
    quantity: 1,
    unit: "EA",
    unitPrice: 450.00,
    totalPrice: 450.00
  },
  {
    id: "4",
    code: "GUT-400",
    description: "Gutter Installation",
    category: "Exterior",
    quantity: 150,
    unit: "LF",
    unitPrice: 12.50,
    totalPrice: 1875.00
  },
  {
    id: "5",
    code: "DRY-500",
    description: "Drywall Repair",
    category: "Interior",
    quantity: 450,
    unit: "SF",
    unitPrice: 3.25,
    totalPrice: 1462.50
  }
];

const SupplementCreation = ({ selectedProjectId, onCancel, onSubmit }: SupplementCreationProps) => {
  const [createTabValue, setCreateTabValue] = useState<string>("changes");
  const [selectedLineItems, setSelectedLineItems] = useState<any[]>([]);
  
  const getSelectedProject = () => {
    if (!selectedProjectId) return null;
    return mockProjects.find(p => p.id === selectedProjectId);
  };

  const handleSelectLineItems = (items: any[]) => {
    setSelectedLineItems(items);
  };

  const calculateTotalAmount = () => {
    return selectedLineItems.reduce((total, item) => {
      if (item.changeType === 'added') {
        return total + item.totalPrice;
      } else if (item.changeType === 'removed') {
        return total - item.totalPrice;
      } else if (item.changeType === 'modified') {
        const previousTotal = item.previousTotalPrice || 0;
        return total + (item.totalPrice - previousTotal);
      }
      return total;
    }, 0);
  };

  return (
    <div className="mb-6">
      <Button 
        variant="outline" 
        className="mb-4"
        onClick={onCancel}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Supplements
      </Button>
      
      <Tabs value={createTabValue} onValueChange={setCreateTabValue} className="mb-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="changes">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Select Changes
          </TabsTrigger>
          <TabsTrigger value="form">
            <FileText className="mr-2 h-4 w-4" />
            Complete Form
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="changes" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Line Item Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Select the changed line items you want to include in your supplemental request
              </p>
              
              <ComparisonView 
                originalItems={mockOriginalItems}
                newItems={mockNewItems}
                onSelectItems={handleSelectLineItems}
              />
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => setCreateTabValue("form")}
                  disabled={selectedLineItems.length === 0}
                >
                  Continue to Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="form" className="mt-4">
          <SupplementalForm 
            projectName={getSelectedProject()?.title || ''}
            onSubmit={onSubmit}
            items={selectedLineItems}
            totalAmount={calculateTotalAmount()}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplementCreation;
