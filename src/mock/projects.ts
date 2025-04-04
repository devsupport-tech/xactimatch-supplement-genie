
import { ProjectCardProps } from '@/components/ProjectCard';

export const mockProjects: ProjectCardProps[] = [
  {
    id: '1',
    title: 'Northside Residential Roof',
    clientName: 'John Smith',
    claimNumber: 'CL-2023-0042',
    status: 'approved',
    dateCreated: '2023-09-15',
    lastUpdated: '2023-10-12',
    totalAmount: 12450.75,
    supplements: 2
  },
  {
    id: '2',
    title: 'Downtown Office Water Damage',
    clientName: 'Franklin Business Group',
    claimNumber: 'CL-2023-0087',
    status: 'in-progress',
    dateCreated: '2023-11-03',
    lastUpdated: '2023-12-01',
    totalAmount: 28750.50,
    supplements: 1
  },
  {
    id: '3',
    title: 'Westview Mall Hail Damage',
    clientName: 'Westview Properties LLC',
    claimNumber: 'CL-2023-0125',
    status: 'pending',
    dateCreated: '2023-12-10',
    lastUpdated: '2023-12-15',
    totalAmount: 45980.00,
    supplements: 0
  },
  {
    id: '4',
    title: 'Parkside Apartment Fire Restoration',
    clientName: 'City Housing Authority',
    claimNumber: 'CL-2024-0012',
    status: 'denied',
    dateCreated: '2024-01-05',
    lastUpdated: '2024-01-20',
    totalAmount: 67435.25,
    supplements: 3
  },
  {
    id: '5',
    title: 'Lakeview Home Flood Damage',
    clientName: 'Sarah Johnson',
    claimNumber: 'CL-2024-0028',
    status: 'approved',
    dateCreated: '2024-02-03',
    lastUpdated: '2024-02-18',
    totalAmount: 18750.60,
    supplements: 1
  },
  {
    id: '6',
    title: 'Hillside Church Restoration',
    clientName: 'Hillside Community Church',
    claimNumber: 'CL-2024-0045',
    status: 'in-progress',
    dateCreated: '2024-03-01',
    lastUpdated: '2024-03-15',
    totalAmount: 124580.75,
    supplements: 2
  }
];
