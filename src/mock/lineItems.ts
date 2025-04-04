
import { LineItem } from '@/components/LineItemTable';

export const mockLineItems: LineItem[] = [
  {
    id: 'li-001',
    code: 'DRY-01',
    description: 'Drywall repair - 1/2" thick',
    category: 'Interior',
    quantity: 450,
    unit: 'SF',
    unitPrice: 1.85,
    totalPrice: 832.5
  },
  {
    id: 'li-002',
    code: 'PNT-03',
    description: 'Paint two coats - walls',
    category: 'Interior',
    quantity: 1200,
    unit: 'SF',
    unitPrice: 0.58,
    totalPrice: 696
  },
  {
    id: 'li-003',
    code: 'FLR-05',
    description: 'Engineered hardwood flooring',
    category: 'Flooring',
    quantity: 320,
    unit: 'SF',
    unitPrice: 7.25,
    totalPrice: 2320
  },
  {
    id: 'li-004',
    code: 'PLM-02',
    description: 'Replace bathroom sink faucet',
    category: 'Plumbing',
    quantity: 1,
    unit: 'EA',
    unitPrice: 145.75,
    totalPrice: 145.75
  },
  {
    id: 'li-005',
    code: 'CAB-01',
    description: 'Kitchen base cabinet',
    category: 'Cabinetry',
    quantity: 12,
    unit: 'LF',
    unitPrice: 210.50,
    totalPrice: 2526
  },
  {
    id: 'li-006',
    code: 'ELE-04',
    description: 'Light fixture installation',
    category: 'Electrical',
    quantity: 8,
    unit: 'EA',
    unitPrice: 75.25,
    totalPrice: 602
  },
  {
    id: 'li-007',
    code: 'ROF-01',
    description: 'Shingle roof - 3-tab',
    category: 'Roofing',
    quantity: 25,
    unit: 'SQ',
    unitPrice: 350.00,
    totalPrice: 8750
  },
  {
    id: 'li-008',
    code: 'INS-02',
    description: 'Batt insulation - R19',
    category: 'Insulation',
    quantity: 1200,
    unit: 'SF',
    unitPrice: 1.15,
    totalPrice: 1380
  },
  {
    id: 'li-009',
    code: 'CLN-01',
    description: 'Final cleaning',
    category: 'Cleanup',
    quantity: 1,
    unit: 'EA',
    unitPrice: 450.00,
    totalPrice: 450
  },
  {
    id: 'li-010',
    code: 'WDW-03',
    description: 'Vinyl window replacement',
    category: 'Windows',
    quantity: 6,
    unit: 'EA',
    unitPrice: 325.75,
    totalPrice: 1954.5
  }
];
