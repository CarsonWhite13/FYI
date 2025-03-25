
import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { OrderStatus } from '@/lib/types';

type StatusBadgeProps = {
  status: OrderStatus;
  className?: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          variant: 'outline' as const,
          className: 'bg-yellow-50 text-yellow-700 border-yellow-200'
        };
      case 'assigned':
        return {
          label: 'Assigned',
          variant: 'outline' as const,
          className: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      case 'in_progress':
        return {
          label: 'In Progress',
          variant: 'outline' as const,
          className: 'bg-indigo-50 text-indigo-700 border-indigo-200'
        };
      case 'review':
        return {
          label: 'In Review',
          variant: 'outline' as const,
          className: 'bg-purple-50 text-purple-700 border-purple-200'
        };
      case 'completed':
        return {
          label: 'Completed',
          variant: 'outline' as const,
          className: 'bg-green-50 text-green-700 border-green-200'
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          variant: 'outline' as const,
          className: 'bg-red-50 text-red-700 border-red-200'
        };
      default:
        return {
          label: 'Unknown',
          variant: 'outline' as const,
          className: 'bg-gray-50 text-gray-700 border-gray-200'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      variant={config.variant} 
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
};

export default StatusBadge;
