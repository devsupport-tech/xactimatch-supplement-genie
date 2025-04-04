
import { Invoice } from '@/types/invoice';

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    projectId: '1',
    projectName: 'Smith Residence Renovation',
    clientName: 'John Smith',
    clientEmail: 'john.smith@example.com',
    status: 'paid',
    dateCreated: '2023-05-20T14:30:00Z',
    dueDate: '2023-06-19T23:59:59Z',
    subtotal: 674.50,
    taxRate: 7.5,
    tax: 50.59,
    amount: 725.09,
    notes: 'Payment for the approved Roof Damage Extension supplement.',
    lineItems: [
      {
        description: 'Base Estimate Fee',
        details: 'Standard processing fee',
        amount: 350.00
      },
      {
        description: 'Supplement Percentage Fee',
        details: '10% of $3,245.00',
        amount: 324.50
      }
    ]
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    projectId: '2',
    projectName: 'Jones Office Remodel',
    clientName: 'Sarah Jones',
    clientEmail: 'sarah.jones@example.com',
    status: 'pending',
    dateCreated: '2023-06-10T09:15:00Z',
    dueDate: '2023-07-10T23:59:59Z',
    subtotal: 447.53,
    taxRate: 7.5,
    tax: 33.56,
    amount: 481.09,
    notes: 'Payment for the approved Bathroom Fixture Upgrade supplement.',
    lineItems: [
      {
        description: 'Base Estimate Fee',
        details: 'Standard processing fee',
        amount: 350.00
      },
      {
        description: 'Supplement Percentage Fee',
        details: '10% of $975.25',
        amount: 97.53
      }
    ]
  },
  {
    id: '3',
    invoiceNumber: 'INV-003',
    projectId: '4',
    projectName: 'Garcia Kitchen Renovation',
    clientName: 'Miguel Garcia',
    clientEmail: 'miguel.garcia@example.com',
    status: 'overdue',
    dateCreated: '2023-04-05T11:20:00Z',
    dueDate: '2023-05-05T23:59:59Z',
    subtotal: 530.00,
    taxRate: 7.5,
    tax: 39.75,
    amount: 569.75,
    notes: 'Payment for the approved Kitchen Flooring supplement.',
    lineItems: [
      {
        description: 'Base Estimate Fee',
        details: 'Standard processing fee',
        amount: 350.00
      },
      {
        description: 'Supplement Percentage Fee',
        details: '10% of $1,800.00',
        amount: 180.00
      }
    ]
  }
];
