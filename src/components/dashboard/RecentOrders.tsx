
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentOrders() {
  return (
    <div className="space-y-8">
      {orderData.map((order) => (
        <div className="flex items-center" key={order.id}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={order.avatarSrc} alt="Avatar" />
            <AvatarFallback>{order.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order.name}</p>
            <p className="text-sm text-muted-foreground">{order.email}</p>
          </div>
          <div className="ml-auto font-medium">{order.amount}</div>
        </div>
      ))}
    </div>
  );
}

const orderData = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    amount: "+$350",
    avatarSrc: "/placeholder.svg",
    initials: "JD",
  },
  {
    id: "2",
    name: "Alice Smith",
    email: "alice@example.com",
    amount: "+$420",
    avatarSrc: "/placeholder.svg",
    initials: "AS",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    amount: "+$290",
    avatarSrc: "/placeholder.svg",
    initials: "BJ",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    amount: "+$550",
    avatarSrc: "/placeholder.svg",
    initials: "ED",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael@example.com",
    amount: "+$380",
    avatarSrc: "/placeholder.svg",
    initials: "MW",
  },
];
