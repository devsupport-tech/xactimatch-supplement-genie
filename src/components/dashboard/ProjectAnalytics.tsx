
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { mockProjects } from '@/mock/projects';
import { mockSupplements } from '@/mock/supplements';
import { Separator } from "@/components/ui/separator";

// Calculate analytics data
const calculateAnalytics = () => {
  // Status distribution
  const statusCounts = {
    'pending': mockProjects.filter(p => p.status === 'pending').length,
    'in-progress': mockProjects.filter(p => p.status === 'in-progress').length,
    'approved': mockProjects.filter(p => p.status === 'approved').length,
    'denied': mockProjects.filter(p => p.status === 'denied').length,
  };

  // Project value by status
  const valueByStatus = [
    { name: 'Pending', value: mockProjects.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.totalAmount, 0) },
    { name: 'In Progress', value: mockProjects.filter(p => p.status === 'in-progress').reduce((sum, p) => sum + p.totalAmount, 0) },
    { name: 'Approved', value: mockProjects.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.totalAmount, 0) },
    { name: 'Denied', value: mockProjects.filter(p => p.status === 'denied').reduce((sum, p) => sum + p.totalAmount, 0) },
  ];

  // Supplement stats
  const supplementByProject = mockProjects.map(project => {
    const projectSupplements = mockSupplements.filter(s => s.projectId === project.id);
    const supplementValue = projectSupplements.reduce((sum, s) => sum + s.amount, 0);
    return {
      name: project.title.length > 20 ? project.title.substring(0, 20) + '...' : project.title,
      originalValue: project.totalAmount - supplementValue,
      supplementValue: supplementValue
    };
  }).sort((a, b) => (b.originalValue + b.supplementValue) - (a.originalValue + a.supplementValue)).slice(0, 5);

  // Supplement status distribution
  const supplementStatus = [
    { name: 'Approved', value: mockSupplements.filter(s => s.status === 'approved').length },
    { name: 'Pending', value: mockSupplements.filter(s => s.status === 'pending').length },
    { name: 'Denied', value: mockSupplements.filter(s => s.status === 'denied').length },
  ];

  return {
    statusCounts,
    valueByStatus,
    supplementByProject,
    supplementStatus,
    totalOriginalValue: mockProjects.reduce((sum, p) => sum + p.totalAmount, 0),
    totalSupplementValue: mockSupplements.reduce((sum, s) => sum + s.amount, 0),
  };
};

const ProjectAnalytics = () => {
  const analytics = calculateAnalytics();
  
  // Colors for charts
  const COLORS = ['#8B5CF6', '#EC4899', '#F97316', '#10B981', '#3B82F6', '#6B7280'];
  const STATUS_COLORS = {
    'Approved': '#10B981',
    'Pending': '#F59E0B',
    'In Progress': '#3B82F6',
    'Denied': '#EF4444',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Project Value Breakdown</CardTitle>
            <CardDescription>Comparing original estimates vs supplements</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analytics.supplementByProject}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip 
                    formatter={(value) => `$${Number(value).toLocaleString()}`} 
                    labelFormatter={(label) => `Project: ${label}`}
                  />
                  <Legend />
                  <Bar 
                    dataKey="originalValue" 
                    stackId="a" 
                    fill="#8B5CF6" 
                    name="Original Estimate" 
                  />
                  <Bar 
                    dataKey="supplementValue" 
                    stackId="a" 
                    fill="#EC4899" 
                    name="Supplement Value" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border/60 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Original Estimates</p>
                <p className="text-2xl font-semibold">
                  ${analytics.totalOriginalValue.toLocaleString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Supplement Value</p>
                <p className="text-2xl font-semibold text-primary">
                  ${analytics.totalSupplementValue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Project Distribution</CardTitle>
            <CardDescription>Status and value distribution across projects</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80 flex justify-center">
              <ChartContainer 
                className="w-full" 
                config={{
                  pending: { color: '#F59E0B' },
                  inProgress: { color: '#3B82F6' },
                  approved: { color: '#10B981' },
                  denied: { color: '#EF4444' },
                }}
              >
                <PieChart>
                  <Pie
                    data={analytics.valueByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {analytics.valueByStatus.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Legend 
                    formatter={(value, entry, index) => {
                      return `${value}: $${analytics.valueByStatus[index].value.toLocaleString()}`;
                    }}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                  />
                  <ChartTooltip 
                    content={({active, payload}) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="font-medium">{data.name}</div>
                            <div>
                              Value: ${data.value.toLocaleString()}
                            </div>
                            <div>
                              {((data.value / analytics.totalOriginalValue) * 100).toFixed(1)}% of total
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ChartContainer>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border/60">
              <p className="text-sm font-medium mb-2">Status distribution</p>
              <div className="grid grid-cols-4 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <p className="text-xs font-medium">Pending</p>
                  </div>
                  <p className="font-semibold">{analytics.statusCounts.pending}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                    <p className="text-xs font-medium">In Progress</p>
                  </div>
                  <p className="font-semibold">{analytics.statusCounts["in-progress"]}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <p className="text-xs font-medium">Approved</p>
                  </div>
                  <p className="font-semibold">{analytics.statusCounts.approved}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <p className="text-xs font-medium">Denied</p>
                  </div>
                  <p className="font-semibold">{analytics.statusCounts.denied}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Supplement Analysis</CardTitle>
          <CardDescription>Breakdown of supplements by status and impact on projects</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Supplement Value Distribution</h4>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analytics.supplementStatus}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => 
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {analytics.supplementStatus.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || COLORS[index % COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Supplement Stats</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-md space-y-1">
                    <div className="text-xs text-muted-foreground">Total Supplements</div>
                    <div className="text-2xl font-semibold">{mockSupplements.length}</div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md space-y-1">
                    <div className="text-xs text-muted-foreground">Avg. Value</div>
                    <div className="text-2xl font-semibold">
                      ${(analytics.totalSupplementValue / mockSupplements.length).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Approval Rate</h4>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ 
                        width: `${(analytics.supplementStatus.find(s => s.name === 'Approved')?.value || 0) / mockSupplements.length * 100}%` 
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      {((analytics.supplementStatus.find(s => s.name === 'Approved')?.value || 0) / mockSupplements.length * 100).toFixed(0)}% approved
                    </span>
                    <span className="font-medium">
                      {analytics.supplementStatus.find(s => s.name === 'Approved')?.value || 0} of {mockSupplements.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectAnalytics;
