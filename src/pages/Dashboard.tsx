
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/dashboard/Overview";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import { BarChart, DollarSign, Users, ClipboardCheck } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatsCard
                    title="Total Revenue"
                    value="$45,231.89"
                    description="+20.1% from last month"
                    icon={<DollarSign className="h-4 w-4" />}
                    trend={{ value: 20.1, positive: true }}
                  />
                  <StatsCard
                    title="Active Orders"
                    value="235"
                    description="+180.1% from last month"
                    icon={<ClipboardCheck className="h-4 w-4" />}
                    trend={{ value: 180.1, positive: true }}
                  />
                  <StatsCard
                    title="Completed Orders"
                    value="1,223"
                    description="+19% from last month"
                    icon={<ClipboardCheck className="h-4 w-4" />}
                    trend={{ value: 19, positive: true }}
                  />
                  <StatsCard
                    title="Active Consultants"
                    value="57"
                    description="+201 since last quarter"
                    icon={<Users className="h-4 w-4" />}
                    trend={{ value: 5, positive: true }}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Revenue Overview</CardTitle>
                      <CardDescription>Monthly revenue from consulting services</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>
                        You have 12 new orders this week
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentOrders />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
