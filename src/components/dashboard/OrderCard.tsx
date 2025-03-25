
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Order } from '@/lib/types';
import StatusBadge from '@/components/ui/StatusBadge';
import { toast } from 'sonner';

type OrderCardProps = {
  order: Order;
  userRole: string;
  onStatusChange?: (orderId: string, newStatus: string) => void;
};

const OrderCard: React.FC<OrderCardProps> = ({ order, userRole, onStatusChange }) => {
  const formatDate = (date: Date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };
  
  const handleStatusChange = (newStatus: string) => {
    if (onStatusChange) {
      onStatusChange(order.id, newStatus);
      toast.success(`Order status updated to ${newStatus.replace('_', ' ')}`);
    }
  };
  
  const renderActionButtons = () => {
    if (userRole === 'admin') {
      // Admin sees different action buttons based on status
      switch (order.status) {
        case 'pending':
          return (
            <>
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => handleStatusChange('assigned')}
              >
                Assign Order
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleStatusChange('cancelled')}
              >
                Cancel
              </Button>
            </>
          );
        case 'assigned':
        case 'in_progress':
          return (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleStatusChange('review')}
            >
              Move to Review
            </Button>
          );
        case 'review':
          return (
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => handleStatusChange('completed')}
            >
              Complete Order
            </Button>
          );
        case 'completed':
          return (
            <Button 
              variant="outline" 
              size="sm"
              disabled
            >
              Archived
            </Button>
          );
        default:
          return null;
      }
    } else {
      // Consultant sees different action buttons
      switch (order.status) {
        case 'pending':
        case 'assigned':
          return (
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => handleStatusChange('in_progress')}
            >
              Accept Order
            </Button>
          );
        case 'in_progress':
          return (
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => handleStatusChange('review')}
            >
              Submit for Review
            </Button>
          );
        case 'review':
        case 'completed':
          return (
            <Button 
              variant="outline" 
              size="sm" 
              disabled
            >
              {order.status === 'review' ? 'In Review' : 'Completed'}
            </Button>
          );
        default:
          return null;
      }
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{order.title}</CardTitle>
          <StatusBadge status={order.status} />
        </div>
        <div className="flex items-center text-sm text-muted-foreground mt-1 space-x-4">
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{formatDate(order.createdAt)}</span>
          </div>
          {order.dueDate && (
            <div className="flex items-center">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>Due: {formatDate(order.dueDate)}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="text-sm space-y-2">
          <p><span className="font-medium">Client:</span> {order.clientName}</p>
          <p className="line-clamp-2">{order.description}</p>
          <div className="flex flex-wrap gap-1 mt-2">
            {order.expertise.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex gap-2">
          {renderActionButtons()}
        </div>
        {order.priority === 'high' && (
          <Badge variant="destructive" className="ml-auto">High Priority</Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
