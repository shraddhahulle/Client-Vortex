
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ProfileSection = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Profile</h1>
      
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="text-3xl bg-yellow-400">JS</AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="text-2xl font-bold">John Smith</h2>
            <p className="text-gray-500">Sales Manager</p>
            <div className="mt-2 flex gap-2">
              <Badge variant="secondary">Sales</Badge>
              <Badge variant="outline">Member since Jan 2023</Badge>
            </div>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <div className="space-y-4">
          <div className="flex items-center border-b border-gray-100 pb-4">
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium">John Smith</p>
            </div>
          </div>
          
          <div className="flex items-center border-b border-gray-100 pb-4">
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium">john.smith@example.com</p>
            </div>
          </div>
          
          <div className="flex items-center border-b border-gray-100 pb-4">
            <div>
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-medium">(555) 123-4567</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium">Sales</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileSection;
