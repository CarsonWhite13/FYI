
import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import OrderCard from '@/components/dashboard/OrderCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Order, DashboardStats } from '@/lib/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, ClipboardCheck, ClipboardList, Clock, TrendingUp } from 'lucide-react';

// Mock data for orders
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
  }
];

// Mock data for the chart
const chartData = [
  { name: 'Jan', orders: 4 },
  { name: 'Feb', orders: 6 },
  { name: 'Mar', orders: 8 },
  { name: 'Apr', orders: 10 },
  { name: 'May', orders: 12 },
  { name: 'Jun', orders: 9 },
];

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    pendingOrders: 0,
    inProgressOrders: 0,
    completedOrders: 0,
  });
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userRole, setUserRole] = useState<string>('consultant');
  
  useEffect(() => {
    // Get user role from localStorage (in a real app this would come from an auth system)
    const role = localStorage.getItem('userRole') || 'consultant';
    setUserRole(role);
    
    // Load orders
    const loadOrders = () => {
      // In a real app, we would fetch from an API
      const filteredOrders = role === 'admin' 
        ? mockOrders 
        : mockOrders.filter(order => 
            order.assignedTo === 'consultant-1' || 
            order.status === 'pending'
          );
      
      setOrders(filteredOrders);
      
      // Calculate stats
      setStats({
        totalOrders: filteredOrders.length,
        pendingOrders: filteredOrders.filter(o => o.status === 'pending').length,
        inProgressOrders: filteredOrders.filter(o => o.status === 'in_progress' || o.status === 'review').length,
        completedOrders: filteredOrders.filter(o => o.status === 'completed').length,
        averageCompletionTime: 4.5, // In days (would calculate from actual data)
      });
    };
    
    loadOrders();
  }, []);
  
  const handleStatusChange = (orderId: string, newStatus: string) => {
    // Update order status - in a real app this would be an API call
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus as any, updatedAt: new Date() } 
        : order
    );
    
    setOrders(updatedOrders);
    
    // Update stats
    setStats({
      totalOrders: updatedOrders.length,
      pendingOrders: updatedOrders.filter(o => o.status === 'pending').length,
      inProgressOrders: updatedOrders.filter(o => o.status === 'in_progress' || o.status === 'review').length,
      completedOrders: updatedOrders.filter(o => o.status === 'completed').length,
      averageCompletionTime: stats.averageCompletionTime,
    });
  };
  
  const filteredOrders = orders.filter(order => 
    order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get recent orders
  const recentOrders = [...filteredOrders]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 3);
  
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your work orders.
          </p>
        </div>
        
        {/* Stats cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard 
            title="Total Orders" 
            value={stats.totalOrders} 
            icon={<ClipboardList className="h-4 w-4" />}
            trend={{ value: 12, positive: true }}
          />
          <StatsCard 
            title="Pending" 
            value={stats.pendingOrders} 
            icon={<Clock className="h-4 w-4" />}
          />
          <StatsCard 
            title="In Progress" 
            value={stats.inProgressOrders} 
            icon={<ClipboardCheck className="h-4 w-4" />}
          />
          <StatsCard 
            title="Completed" 
            value={stats.completedOrders} 
            icon={<TrendingUp className="h-4 w-4" />}
            trend={{ value: 8, positive: true }}
          />
        </div>
        
        {/* Analytics chart (admin only) */}
        {userRole === 'admin' && (
          <div className="bg-card rounded-lg p-4 shadow">
            <h2 className="text-lg font-medium mb-4">Orders Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      borderRadius: '0.5rem', 
                      border: 'none', 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="orders" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {/* Recent orders */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Recent Orders</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8 w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={() => window.location.href = '/orders'}>View All</Button>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentOrders.length > 0 ? (
              recentOrders.map(order => (
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
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
