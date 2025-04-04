
import { Supplement } from '@/types/supplement';

// Mock supplemental data
export const mockSupplements: Supplement[] = [
  {
    id: '1',
    projectId: '1',
    name: 'Roof Damage Extension',
    status: 'approved',
    dateCreated: '2023-04-15T10:30:00Z',
    amount: 3245.00,
    description: 'Additional damage discovered after initial assessment'
  },
  {
    id: '2',
    projectId: '1',
    name: 'Kitchen Cabinet Upgrade',
    status: 'pending',
    dateCreated: '2023-04-28T14:45:00Z',
    amount: 1850.75,
    description: 'Upgraded cabinet materials due to unavailability of original specified materials'
  },
  {
    id: '3',
    projectId: '2',
    name: 'Window Frame Replacements',
    status: 'pending',
    dateCreated: '2023-05-10T09:15:00Z',
    amount: 2150.50,
    description: 'Additional window frames found to be damaged beyond repair'
  },
  {
    id: '4',
    projectId: '3',
    name: 'Foundation Repair Extension',
    status: 'denied',
    dateCreated: '2023-05-05T11:20:00Z',
    amount: 4500.00,
    description: 'Further foundation damage discovered requiring additional work'
  },
  {
    id: '5',
    projectId: '2',
    name: 'Bathroom Fixture Upgrade',
    status: 'approved',
    dateCreated: '2023-05-18T15:30:00Z',
    amount: 975.25,
    description: 'Upgraded fixtures due to discontinued models specified in original estimate'
  }
];
