
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const TasksSection = () => {
  // Sample task data
  const tasks = [
    { id: 1, title: "Contact new leads", priority: "High", status: "In Progress", dueDate: "2025-04-15" },
    { id: 2, title: "Prepare quarterly report", priority: "Medium", status: "Pending", dueDate: "2025-04-20" },
    { id: 3, title: "Client follow-up call", priority: "High", status: "Completed", dueDate: "2025-04-01" },
    { id: 4, title: "Update CRM database", priority: "Low", status: "Pending", dueDate: "2025-04-25" },
    { id: 5, title: "Team meeting preparation", priority: "Medium", status: "In Progress", dueDate: "2025-04-10" }
  ];

  // Get badge variant based on priority
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "default";
      case "Low":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Get badge variant based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "default";
      case "In Progress":
        return "secondary";
      case "Pending":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Tasks Management</h1>
        <Button className="flex items-center">
          <Plus size={18} className="mr-2" />
          Add New Task
        </Button>
      </div>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Current Tasks</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Filter</Button>
            <Button variant="outline" size="sm">Sort</Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="border rounded-lg p-4">
              <div className="flex justify-between">
                <h3 className="font-semibold">{task.title}</h3>
                <div className="flex gap-2">
                  <Badge variant={getPriorityBadge(task.priority)}>{task.priority}</Badge>
                  <Badge variant={getStatusBadge(task.status)}>{task.status}</Badge>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TasksSection;
