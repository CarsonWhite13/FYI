
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <Button>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>
              Manage your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Change Avatar
            </Button>
            <div className="space-y-1 text-center">
              <h3 className="font-medium">Jane Cooper</h3>
              <p className="text-sm text-muted-foreground">Senior Consultant</p>
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
              <Badge variant="outline">Marketing</Badge>
              <Badge variant="outline">Strategy</Badge>
              <Badge variant="outline">Business Development</Badge>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="w-full">
              Sign Out
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>
              Update your account information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="expertise">Expertise</TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Jane Cooper" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="jane@fosteryoung.fyi" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    className="min-h-32"
                    defaultValue="Senior marketing consultant with 10+ years of experience in digital marketing, brand strategy, and market research. Specialized in helping B2B companies improve their marketing ROI."
                  />
                </div>
              </TabsContent>
              <TabsContent value="expertise" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="skills">Skills & Expertise</Label>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Marketing</Badge>
                      <Badge>Strategy</Badge>
                      <Badge>Business Development</Badge>
                      <Badge variant="outline">+ Add More</Badge>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rate">Hourly Rate</Label>
                    <Input id="rate" defaultValue="$150" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Input
                      id="availability"
                      defaultValue="20 hours/week"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
