
export type UserRole = 'consultant' | 'manager' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileImage?: string;
  expertise?: string[];
  bio?: string;
  joinedAt: Date;
}

export type OrderStatus = 'pending' | 'assigned' | 'in_progress' | 'review' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  description: string;
  expertise: string[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  progress?: number;
}

export interface Message {
  id: string;
  orderId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  attachments?: string[];
}

export interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  inProgressOrders: number;
  completedOrders: number;
  averageCompletionTime?: number;
}
