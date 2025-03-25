
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import OrderCard from '@/components/dashboard/OrderCard';
import { Order } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Search, Filter, CalendarIcon } from 'lucide-react';

// Mock data for orders (same as Dashboard)
const mockOrders: Order[] = [
  {
    id: '1',
    title: 'Market Research for Software Startup',
    clientName: 'TechVision Inc.',
    clientEmail: 'contact@techvision.com',
    description: 'Need comprehensive market research for a new software product in the productivity space.',
    expertise: ['Market Research', 'Software'],
    status: 'pending',
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2023-06-01'),
    priority: 'high',
    dueDate: new Date('2023-06-15')
  },
  {
    id: '2',
    title: 'Financial Projection Review',
    clientName: 'GrowthCapital LLC',
    clientEmail: 'finance@growthcapital.com',
    description: 'Review of 5-year financial projections for an e-commerce business seeking funding.',
    expertise: ['Financial Analysis', 'E-commerce'],
    status: 'in_progress',
    createdAt: new Date('2023-05-25'),
    updatedAt: new Date('2023-05-28'),
    assignedTo: 'consultant-1',
    priority: 'medium',
    dueDate: new Date('2023-06-10'),
    progress: 45
  },
  {
    id: '3',
    title: 'Marketing Strategy Development',
    clientName: 'Bloom Brands',
    clientEmail: 'marketing@bloombrands.com',
    description: 'Development of comprehensive digital marketing strategy for a beauty brand launch.',
    expertise: ['Marketing', 'Digital Strategy'],
    status: 'review',
    createdAt: new Date('2023-05-20'),
    updatedAt: new Date('2023-05-31'),
    assignedTo: 'consultant-1',
    priority: 'medium',
    dueDate: new Date('2023-06-05'),
    progress: 90
  },
  {
    id: '4',
    title: 'Supply Chain Optimization',
    clientName: 'GlobalGoods Inc.',
    clientEmail: 'operations@globalgoods.com',
    description: 'Analysis and recommendations for optimizing international supply chain with focus on cost reduction.',
    expertise: ['Supply Chain', 'Operations'],
    status: 'completed',
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date('2023-05-30'),
    assignedTo: 'consultant-2',
    priority: 'low',
    progress: 100
  },
  {
    id: '5',
    title: 'HR Policy Development',
    clientName: 'Talent Solutions Co.',
    clientEmail: 'hr@talentsolutions.com',
    description: 'Create comprehensive HR policies for a growing technology company with 50+ employees.',
    expertise: ['Human Resources', 'Policy Development'],
    status: 'pending',
    createdAt: new Date('2023-06-02'),
    updatedAt: new Date('2023-06-02'),
    priority: 'medium',
    dueDate: new Date('2023-06-20')
  },
  {
    id: '6',
    title: 'Product Pricing Strategy',
    clientName: 'InnovateTech',
    clientEmail: 'product@innovatetech.com',
    description: 'Develop optimal pricing strategy for a new SaaS product targeting enterprise customers.',
    expertise: ['Pricing Strategy', 'SaaS'],
    status: 'pending',
    createdAt: new Date('2023-06-03'),
    updatedAt: new Date('2023-06-03'),
    priority: 'high',
    dueDate: new Date('2023-06-18')
  },
];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [userRole, setUserRole] = useState<string>('consultant');
  
  useEffect(() => {
    // Get user role from localStorage
    const role = localStorage.getItem('userRole') || 'consultant';
    setUserRole(role);
    
    // Load orders
    const loadOrders = () => {
      // In a real app, this would be an API call
      const filteredData = role === 'admin' 
        ? mockOrders 
        : mockOrders.filter(order => 
            order.assignedTo === 'consultant-1' || 
            order.status === 'pending'
          );
      
      setOrders(filteredData);
      setFilteredOrders(filteredData);
    };
    
    loadOrders();
  }, []);
  
  // Filter orders when tab, search or priority filter changes
  useEffect(() => {
    let result = [...orders];
    
    // Filter by tab (status)
    if (activeTab !== 'all') {
      result = result.filter(order => {
        if (activeTab === 'in_progress_review') {
          return order.status === 'in_progress' || order.status === 'review';
        }
        return order.status === activeTab;
      });
    }
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(order => 
        order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by priority
    if (priorityFilter !== 'all') {
      result = result.filter(order => order.priority === priorityFilter);
    }
    
    setFilteredOrders(result);
  }, [activeTab, searchTerm, priorityFilter, orders]);
  
  const handleStatusChange = (orderId: string, newStatus: string) => {
    // Update order status (in a real app this would be an API call)
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as any, updatedAt: new Date() } 
        : order
    );
    
    setOrders(updatedOrders);
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Work Orders</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all client work orders.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Tabs 
            defaultValue="all" 
            className="w-full sm:w-auto"
            onValueChange={setActiveTab}
          >
            <TabsList>
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in_progress_review">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8 min-w-[200px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  <span>{priorityFilter === 'all' ? 'All Priorities' : `${priorityFilter.charAt(0).toUpperCase() + priorityFilter.slice(1)} Priority`}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuRadioGroup 
                  value={priorityFilter} 
                  onValueChange={setPriorityFilter}
                >
                  <DropdownMenuRadioItem value="all">All Priorities</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="low">Low Priority</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="medium">Medium Priority</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="high">High Priority</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                userRole={userRole} 
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No orders found</p>
              {activeTab !== 'all' && (
                <Button 
                  variant="link" 
                  onClick={() => setActiveTab('all')}
                  className="mt-2"
                >
                  View all orders
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
