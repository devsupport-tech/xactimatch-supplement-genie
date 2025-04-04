
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter, SlidersHorizontal, Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProjectCard from '@/components/ProjectCard';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useFilteredProjects } from '@/hooks/use-projects';

type FilterStatus = 'all' | 'pending' | 'in-progress' | 'approved' | 'denied';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');

  const { data: filteredProjects, isLoading, error } = useFilteredProjects(searchTerm, statusFilter);

  const getStatusLabel = (status: FilterStatus) => {
    switch (status) {
      case 'all': return 'All Projects';
      case 'pending': return 'Pending';
      case 'in-progress': return 'In Progress';
      case 'approved': return 'Approved';
      case 'denied': return 'Denied';
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your projects and supplemental requests
          </p>
        </div>
        <Button asChild>
          <Link to="/projects/new">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search projects..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              {getStatusLabel(statusFilter)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem 
                onClick={() => setStatusFilter('all')}
                className="cursor-pointer"
              >
                All Projects
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setStatusFilter('pending')}
                className="cursor-pointer"
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setStatusFilter('in-progress')}
                className="cursor-pointer"
              >
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setStatusFilter('approved')}
                className="cursor-pointer"
              >
                Approved
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setStatusFilter('denied')}
                className="cursor-pointer"
              >
                Denied
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Sort Projects</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                Date (Newest First)
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Date (Oldest First)
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Name (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Name (Z-A)
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Amount (High to Low)
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Amount (Low to High)
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="bg-destructive/10 text-destructive w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium mb-2">Error loading projects</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            There was an error loading your projects. Please try again later.
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-secondary/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            We couldn't find any projects matching your current filters. Try adjusting your search or create a new project.
          </p>
          <Button asChild>
            <Link to="/projects/new">
              <Plus className="mr-2 h-4 w-4" /> Create New Project
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Projects;
