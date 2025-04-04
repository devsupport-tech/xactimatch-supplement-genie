import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, PlusCircle, FileText, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import SupplementsList from '@/components/supplements/SupplementsList';
import SupplementDetail from '@/components/supplements/SupplementDetail';
import SupplementalForm from '@/components/SupplementalForm';
import ComparisonView from '@/components/ComparisonView';
import { mockProjects } from '@/mock/projects';
import { mockSupplements } from '@/mock/supplements';
import { Supplement } from '@/types/supplement';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

const enhancedSupplements = mockSupplements.map(supplement => {
  const project = mockProjects.find(p => p.id === supplement.projectId);
  return {
    ...supplement,
    projectName: project?.title
  };
});

const Supplements = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedSupplement, setSelectedSupplement] = useState<Supplement | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedLineItems, setSelectedLineItems] = useState([]);
  const [createTabValue, setCreateTabValue] = useState<string>("changes");
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    const statusFromUrl = searchParams.get('status');
    if (statusFromUrl) {
      setStatusFilter(statusFromUrl);
      
      const matchingSupplements = enhancedSupplements.filter(s => s.status === statusFromUrl);
      if (matchingSupplements.length > 0 && !selectedSupplement) {
        setSelectedSupplement(matchingSupplements[0]);
      }
    }

    if (location.state) {
      if (location.state.createMode) {
        setIsCreating(true);
        if (location.state.projectId) {
          setSelectedProjectId(location.state.projectId);
        }
      }
      
      if (location.state.selectedSupplementId) {
        const supplement = enhancedSupplements.find(s => s.id === location.state.selectedSupplementId);
        if (supplement) {
          setSelectedSupplement(supplement);
        }
      }
    }
  }, [location.state, searchParams, selectedSupplement]);

  const getSelectedProject = () => {
    if (!selectedProjectId) return null;
    return mockProjects.find(p => p.id === selectedProjectId);
  };

  const handleCreateSupplement = () => {
    setIsCreating(true);
    setSelectedSupplement(null);
  };

  const handleSupplementSubmit = (formData: any) => {
    toast({
      title: "Supplement Created",
      description: "Your supplement has been successfully created.",
    });
    
    setIsCreating(false);
    navigate('/supplements', { replace: true });
  };

  const handleCancelCreate = () => {
    setIsCreating(false);
  };

  const handleSelectLineItems = (items: any[]) => {
    setSelectedLineItems(items);
    
    const totalAmount = items.reduce((total, item) => {
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
    
    if (items.length > 0) {
      toast({
        title: `${items.length} Items Selected`,
        description: `Total supplement amount: ${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(totalAmount)}`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8 mt-14">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              {statusFilter !== 'all' ? 
                `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Supplements` : 
                'Supplemental Requests'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {statusFilter !== 'all' ? 
                `Viewing all ${statusFilter} supplemental requests` : 
                'Manage and review all supplemental requests across projects'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleCreateSupplement}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Supplement
            </Button>
          </div>
        </div>

        {isCreating ? (
          <div className="mb-6">
            <Button 
              variant="outline" 
              className="mb-4"
              onClick={handleCancelCreate}
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
                  onSubmit={handleSupplementSubmit}
                  items={selectedLineItems}
                  totalAmount={selectedLineItems.reduce((total, item) => {
                    if (item.changeType === 'added') {
                      return total + item.totalPrice;
                    } else if (item.changeType === 'removed') {
                      return total - item.totalPrice;
                    } else if (item.changeType === 'modified') {
                      const previousTotal = item.previousTotalPrice || 0;
                      return total + (item.totalPrice - previousTotal);
                    }
                    return total;
                  }, 0)}
                />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SupplementsList
              supplements={enhancedSupplements}
              selectedSupplement={selectedSupplement}
              onSelectSupplement={setSelectedSupplement}
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
                    <Button variant="outline" onClick={handleCreateSupplement}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Supplement
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Supplements;
