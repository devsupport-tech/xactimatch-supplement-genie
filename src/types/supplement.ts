
export interface Supplement {
  id: string;
  projectId: string;
  projectName?: string;
  name: string;
  status: 'pending' | 'approved' | 'denied';
  dateCreated: string;
  amount: number;
  description: string;
}
