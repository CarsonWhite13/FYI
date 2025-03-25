// Type definitions for the project

export type OrderStatus = 'pending' | 'assigned' | 'in_progress' | 'review' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  description: string;
  expertise: string[];
  status: OrderStatus;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high';
  progress?: number;
  dueDate: Date;
}

// Add more types as needed
