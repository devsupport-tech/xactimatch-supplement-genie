import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, DollarSign, Mail, Download, Filter, Printer, FileText, Plus, 
  BarChart4, PieChart, CalendarDays, ArrowDownUp, CreditCard, TrendingUp, Banknote,
  Check, Clock, AlertTriangle, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import { InvoiceTable } from '@/components/accounting/InvoiceTable';
import { InvoiceDetail } from '@/components/accounting/InvoiceDetail';
import { ContractorPaymentTracking } from '@/components/accounting/ContractorPaymentTracking';
import { mockInvoices } from '@/mock/invoices';
import { toast } from '@/hooks/use-toast';

const Accounting = () => {
  const navigate = useNavigate();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [amountFilter, setAmountFilter] = useState('all');
  const [sortField, setSortField] = useState('dateCreated');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [isFullDetailView, setIsFullDetailView] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const totalPaid = mockInvoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = mockInvoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = mockInvoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0);
  const invoiceCountByStatus = {
    paid: mockInvoices.filter(inv => inv.status === 'paid').length,
    pending: mockInvoices.filter(inv => inv.status === 'pending').length,
    overdue: mockInvoices.filter(inv => inv.status === 'overdue').length
  };

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter === 'last30') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      matchesDate = new Date(invoice.dateCreated) >= thirtyDaysAgo;
    } else if (dateFilter === 'last90') {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      matchesDate = new Date(invoice.dateCreated) >= ninetyDaysAgo;
    }
    
    let matchesAmount = true;
    if (amountFilter === 'lt1000') {
      matchesAmount = invoice.amount < 1000;
    } else if (amountFilter === '1000to5000') {
      matchesAmount = invoice.amount >= 1000 && invoice.amount <= 5000;
    } else if (amountFilter === 'gt5000') {
      matchesAmount = invoice.amount > 5000;
    }
    
    return matchesSearch && matchesStatus && matchesDate && matchesAmount;
  });
  
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'amount') {
      comparison = a.amount - b.amount;
    } else if (sortField === 'dateCreated') {
      comparison = new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
    } else if (sortField === 'dueDate') {
      comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    } else if (sortField === 'invoiceNumber') {
      comparison = a.invoiceNumber.localeCompare(b.invoiceNumber);
    } else if (sortField === 'clientName') {
      comparison = a.clientName.localeCompare(b.clientName);
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleInvoiceClick = (invoice) => {
    setSelectedInvoice(invoice);
    setIsFullDetailView(true);
  };

  const handleBackToList = () => {
    setSelectedInvoice(null);
    setIsFullDetailView(false);
  };

  const handleExportInvoices = () => {
    toast({
      title: "Exporting Invoices",
      description: "Your invoices are being exported to CSV format.",
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Invoices have been exported successfully.",
      });
    }, 1500);
  };

  const handleCreateNewInvoice = () => {
    toast({
      title: "Create New Invoice",
      description: "Invoice creation form is being prepared.",
    });
    navigate('/accounting/new-invoice');
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleStatusCardClick = (status) => {
    setActiveTab('invoices');
    setStatusFilter(status);
  };

  const handleReportsClick = () => {
    setActiveTab('reports');
    toast({
      title: "Financial Reports",
      description: "Generating your financial reports...",
    });
  };

  const handlePaymentsClick = () => {
    setActiveTab('payments');
    toast({
      title: "Payment Portal",
      description: "Loading payment transactions...",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8 mt-14">
        {isFullDetailView && selectedInvoice ? (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={handleBackToList}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Invoices
              </Button>
            </div>
            <InvoiceDetail invoice={selectedInvoice} />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold">Accounting</h1>
                <p className="text-muted-foreground mt-1">Manage invoices and financial transactions</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateNewInvoice}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Invoice
                </Button>
                <Button variant="outline" onClick={handleExportInvoices}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="invoices">Invoices</TabsTrigger>
                <TabsTrigger value="contractors">Contractor Payments</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="reports">Financial Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card 
                    className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleStatusCardClick('pending')}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex justify-between">
                        <span>Total Pending</span>
                        <Banknote className="h-5 w-5 text-amber-500" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatCurrency(totalPending)}</div>
                      <p className="text-xs text-muted-foreground mt-1">{invoiceCountByStatus.pending} Invoices</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleStatusCardClick('paid')}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex justify-between">
                        <span>Total Paid</span>
                        <CreditCard className="h-5 w-5 text-green-500" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatCurrency(totalPaid)}</div>
                      <p className="text-xs text-muted-foreground mt-1">{invoiceCountByStatus.paid} Invoices</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleStatusCardClick('overdue')}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-medium flex justify-between">
                        <span>Total Overdue</span>
                        <TrendingUp className="h-5 w-5 text-red-500" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{formatCurrency(totalOverdue)}</div>
                      <p className="text-xs text-muted-foreground mt-1">{invoiceCountByStatus.overdue} Invoices</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setActiveTab('contractors')}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-base">
                        <UserCheck className="mr-2 h-5 w-5 text-purple-500" />
                        Contractor Payments
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Track and manage contractor payments by supplement
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Invoices</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockInvoices.slice(0, 5).map((invoice) => (
                          <div 
                            key={invoice.id} 
                            className="flex justify-between items-center p-3 rounded-md border hover:bg-muted/50 cursor-pointer"
                            onClick={() => handleInvoiceClick(invoice)}
                          >
                            <div>
                              <div className="font-medium">{invoice.invoiceNumber}</div>
                              <div className="text-sm text-muted-foreground">{invoice.clientName}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{formatCurrency(invoice.amount)}</div>
                              <Badge 
                                variant="outline" 
                                className={
                                  invoice.status === 'paid' ? 'bg-green-50 text-green-600 dark:bg-green-900/20' :
                                  invoice.status === 'pending' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20' :
                                  'bg-red-50 text-red-600 dark:bg-red-900/20'
                                }
                              >
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Invoice Status</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center h-[250px]">
                      <div className="flex justify-center items-center gap-8">
                        <div 
                          className="text-center cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => handleStatusCardClick('paid')}
                        >
                          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-500 mb-2">
                            <Check className="h-8 w-8" />
                          </div>
                          <div className="text-xl font-bold">{invoiceCountByStatus.paid}</div>
                          <div className="text-sm text-muted-foreground">Paid</div>
                        </div>
                        
                        <div 
                          className="text-center cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => handleStatusCardClick('pending')}
                        >
                          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 text-amber-500 mb-2">
                            <Clock className="h-8 w-8" />
                          </div>
                          <div className="text-xl font-bold">{invoiceCountByStatus.pending}</div>
                          <div className="text-sm text-muted-foreground">Pending</div>
                        </div>
                        
                        <div 
                          className="text-center cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => handleStatusCardClick('overdue')}
                        >
                          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-500 mb-2">
                            <AlertTriangle className="h-8 w-8" />
                          </div>
                          <div className="text-xl font-bold">{invoiceCountByStatus.overdue}</div>
                          <div className="text-sm text-muted-foreground">Overdue</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-center pt-0">
                      <Button variant="ghost" onClick={() => setActiveTab('invoices')}>View All Invoices</Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card 
                    className="cursor-pointer hover:shadow-md transition-shadow" 
                    onClick={handleReportsClick}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-base">
                        <BarChart4 className="mr-2 h-5 w-5 text-blue-500" />
                        Financial Reports
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Generate financial reports and analytics
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={handlePaymentsClick}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-base">
                        <CreditCard className="mr-2 h-5 w-5 text-green-500" />
                        Payment Processing
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Process payments and manage transactions
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate('/settings/fees')}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center text-base">
                        <DollarSign className="mr-2 h-5 w-5 text-amber-500" />
                        Fee Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Configure your fee structure and pricing
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="invoices" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 flex items-center space-x-2">
                    <Input
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="last30">Last 30 Days</SelectItem>
                        <SelectItem value="last90">Last 90 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      {showAdvancedFilters ? 'Hide Filters' : 'Advanced Filters'}
                    </Button>
                    <Select value={sortField} onValueChange={setSortField}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dateCreated">Date Created</SelectItem>
                        <SelectItem value="dueDate">Due Date</SelectItem>
                        <SelectItem value="amount">Amount</SelectItem>
                        <SelectItem value="invoiceNumber">Invoice Number</SelectItem>
                        <SelectItem value="clientName">Client Name</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      className="px-3"
                      onClick={toggleSortDirection}
                    >
                      {sortDirection === 'asc' ? 
                        <ArrowDownUp className="h-4 w-4 rotate-180" /> : 
                        <ArrowDownUp className="h-4 w-4" />
                      }
                    </Button>
                  </div>
                </div>
                
                {showAdvancedFilters && (
                  <Card className="mb-4">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-md">Advanced Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Amount Range</label>
                          <Select value={amountFilter} onValueChange={setAmountFilter}>
                            <SelectTrigger>
                              <SelectValue placeholder="Filter by amount" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Amounts</SelectItem>
                              <SelectItem value="lt1000">Less than $1,000</SelectItem>
                              <SelectItem value="1000to5000">$1,000 - $5,000</SelectItem>
                              <SelectItem value="gt5000">More than $5,000</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Date Range</label>
                          <div className="grid grid-cols-2 gap-2">
                            <Input type="date" placeholder="Start Date" />
                            <Input type="date" placeholder="End Date" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-1 block">Project Type</label>
                          <Select defaultValue="all">
                            <SelectTrigger>
                              <SelectValue placeholder="All Projects" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Projects</SelectItem>
                              <SelectItem value="supplement">Supplement</SelectItem>
                              <SelectItem value="estimate">Estimate</SelectItem>
                              <SelectItem value="repair">Repair</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-4">
                        <Button 
                          variant="outline" 
                          className="mr-2"
                          onClick={() => {
                            setAmountFilter('all');
                            setDateFilter('all');
                            setStatusFilter('all');
                            setSearchTerm('');
                          }}
                        >
                          Reset Filters
                        </Button>
                        <Button onClick={() => toast({ title: "Filters Applied" })}>
                          Apply Filters
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <div className="grid grid-cols-1 gap-6">
                  <InvoiceTable 
                    invoices={sortedInvoices} 
                    selectedInvoice={selectedInvoice}
                    onSelectInvoice={handleInvoiceClick}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="contractors" className="space-y-4">
                <ContractorPaymentTracking />
              </TabsContent>
              
              <TabsContent value="payments" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                    <CardDescription>Track all payment transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Payment tracking functionality coming soon
                    </p>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button 
                      onClick={() => navigate('/settings/fees')}
                      variant="outline"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Configure Fee Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="reports" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Financial Reports</CardTitle>
                    <CardDescription>View and generate financial reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Financial reporting functionality coming soon
                    </p>
                  </CardContent>
                  <CardFooter className="justify-center">
                    <Button 
                      onClick={() => navigate('/settings/fees')}
                      variant="outline"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Configure Fee Settings
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
};

export default Accounting;
