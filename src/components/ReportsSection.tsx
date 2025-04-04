
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const ReportsSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Analytics & Reports</h1>
        <div className="flex gap-2">
          <Button className="flex items-center">
            <Download size={18} className="mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" className="flex items-center">
            <FileText size={18} className="mr-2" />
            Export CSV
          </Button>
        </div>
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Revenue Reports</h2>
        <p className="text-gray-500 mb-4">View monthly revenue performance and trends.</p>
        
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder</p>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Task Reports</h2>
        <p className="text-gray-500 mb-4">Analyze task completion rates and distribution.</p>
        
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder</p>
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Client Acquisition</h2>
        <p className="text-gray-500 mb-4">Track new client acquisition over time.</p>
        
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder</p>
        </div>
      </Card>
    </div>
  );
};

export default ReportsSection;
