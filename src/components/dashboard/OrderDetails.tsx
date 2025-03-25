
import React from "react";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Order } from "@/lib/types";

interface OrderDetailsProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetails({ order, open, onOpenChange }: OrderDetailsProps) {
  if (!order) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{order.title}</SheetTitle>
          <SheetDescription>Order ID: {order.id}</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <Badge
              variant={
                order.status === "completed"
                  ? "default"
                  : order.status === "cancelled"
                  ? "destructive"
                  : "outline"
              }
            >
              {order.status.replace("_", " ").toUpperCase()}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {order.priority} Priority
            </Badge>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium">Client Information</h4>
            <p className="text-sm">{order.clientName}</p>
            <p className="text-sm text-muted-foreground">{order.clientEmail}</p>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium">Description</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {order.description}
            </p>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium">Expertise Required</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {order.expertise.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Timeline</h4>
              {order.progress !== undefined && (
                <span className="text-xs text-muted-foreground">
                  {order.progress}% Complete
                </span>
              )}
            </div>
            {order.progress !== undefined && (
              <Progress value={order.progress} className="h-2" />
            )}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Created</p>
                <p>{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Due Date</p>
                <p>{order.dueDate ? formatDate(order.dueDate) : "Not set"}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex space-x-2">
            {order.status === "pending" && (
              <>
                <Button className="flex-1">Accept</Button>
                <Button variant="outline" className="flex-1">
                  Decline
                </Button>
              </>
            )}
            {["assigned", "in_progress"].includes(order.status) && (
              <>
                <Button className="flex-1">Update Progress</Button>
                <Button variant="outline" className="flex-1">
                  Message Client
                </Button>
              </>
            )}
            {order.status === "review" && (
              <>
                <Button className="flex-1">Submit Final</Button>
                <Button variant="outline" className="flex-1">
                  Request Changes
                </Button>
              </>
            )}
            {order.status === "completed" && (
              <Button variant="outline" className="flex-1">
                View Details
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
