
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/lib/types";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, MoreVertical, Filter } from "lucide-react";

const dummyOrders: Order[] = [
  {
    id: "ORD-001",
    title: "Market Research Analysis",
    clientName: "Acme Corporation",
    clientEmail: "contact@acmecorp.com",
    description: "Comprehensive market analysis for new product launch",
    expertise: ["Market Research", "Data Analysis"],
    status: "pending",
    createdAt: new Date("2023-09-15"),
    updatedAt: new Date("2023-09-15"),
    priority: "high",
    dueDate: new Date("2023-10-15"),
  },
  {
    id: "ORD-002",
    title: "Social Media Strategy",
    clientName: "TechStart Inc",
    clientEmail: "marketing@techstart.io",
    description: "Develop a social media strategy for Q4",
    expertise: ["Digital Marketing", "Social Media"],
    status: "assigned",
    assignedTo: "user-123",
    createdAt: new Date("2023-09-10"),
    updatedAt: new Date("2023-09-12"),
    priority: "medium",
    dueDate: new Date("2023-10-01"),
  },
  {
    id: "ORD-003",
    title: "Financial Forecast Model",
    clientName: "Global Finance Ltd",
    clientEmail: "planning@globalfinance.com",
    description: "Create a 5-year financial forecast model",
    expertise: ["Financial Analysis", "Modeling"],
    status: "in_progress",
    assignedTo: "user-456",
    createdAt: new Date("2023-09-05"),
    updatedAt: new Date("2023-09-07"),
    priority: "high",
    progress: 45,
    dueDate: new Date("2023-09-30"),
  },
  {
    id: "ORD-004",
    title: "HR Policy Review",
    clientName: "Northwest Services",
    clientEmail: "hr@northwest.org",
    description: "Review and update employee handbook and policies",
    expertise: ["HR", "Policy Development"],
    status: "review",
    assignedTo: "user-789",
    createdAt: new Date("2023-08-28"),
    updatedAt: new Date("2023-09-14"),
    priority: "low",
    progress: 90,
    dueDate: new Date("2023-09-20"),
  },
  {
    id: "ORD-005",
    title: "Supply Chain Optimization",
    clientName: "Manufacturing Plus",
    clientEmail: "operations@mfgplus.com",
    description: "Analyze and optimize supply chain processes",
    expertise: ["Supply Chain", "Operations"],
    status: "completed",
    assignedTo: "user-123",
    createdAt: new Date("2023-08-15"),
    updatedAt: new Date("2023-09-10"),
    priority: "medium",
    progress: 100,
    dueDate: new Date("2023-09-15"),
  },
];

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(dummyOrders);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { label: string; variant: "default" | "secondary" | "destructive" | "outline" } } = {
      pending: { label: "Pending", variant: "outline" },
      assigned: { label: "Assigned", variant: "secondary" },
      in_progress: { label: "In Progress", variant: "default" },
      review: { label: "Review", variant: "secondary" },
      completed: { label: "Completed", variant: "default" },
      cancelled: { label: "Cancelled", variant: "destructive" },
    };

    const statusInfo = statusMap[status] || { label: status, variant: "outline" };
    
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Status</DropdownMenuItem>
              <DropdownMenuItem>Priority</DropdownMenuItem>
              <DropdownMenuItem>Date</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog>
            <DialogTrigger asChild>
              <Button>New Order</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>
                  Create a new work order for a client.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Form fields would go here */}
                <p className="text-sm text-muted-foreground">Order form fields (title, client info, details, etc.)</p>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.title}</TableCell>
                  <TableCell>{order.clientName}</TableCell>
                  <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="capitalize">{order.priority}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Order</DropdownMenuItem>
                        <DropdownMenuItem>Change Status</DropdownMenuItem>
                        <DropdownMenuItem>Assign Consultant</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
