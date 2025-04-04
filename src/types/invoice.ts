
export interface InvoiceLineItem {
  description: string;
  details: string;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  projectName: string;
  clientName: string;
  clientEmail?: string;
  status: 'pending' | 'paid' | 'overdue';
  dateCreated: string;
  dueDate: string;
  subtotal: number;
  taxRate: number;
  tax: number;
  amount: number;
  notes?: string;
  lineItems: InvoiceLineItem[];
  // New contractor payment tracking fields
  supplementId?: string;
  originalEstimate?: number;
  supplementAmount?: number;
  difference?: number;
  paidAmount?: number;
  remainingBalance?: number;
}
