
import React, { useState } from "react";
import { Plus, Search, Filter, ArrowDown, ArrowUp, Calendar, Check, X } from "lucide-react";
import { tasks } from "../utils/mockData";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/lib/toast";

const TasksSection = () => {
  const [sortField, setSortField] = useState<string>("dueDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (filterStatus !== "all" && task.status !== filterStatus) {
      return false;
    }
    
    // Filter by priority
    if (filterPriority !== "all" && task.priority !== filterPriority) {
      return false;
    }
    
    // Search by title or description
    if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !task.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    if (sortField === "dueDate") {
      return sortDirection === "asc" 
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
    } else if (sortField === "priority") {
      const priorityOrder = { "High": 3, "Medium": 2, "Low": 1 };
      return sortDirection === "asc"
        ? priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]
        : priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
    } else {
      // Default to title
      return sortDirection === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
  });
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const getTaskStatusClass = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const getTaskPriorityClass = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handleStatusChange = (taskId: number, newStatus: string) => {
    toast.success(`Task status updated to ${newStatus}`, {
      description: "The task status has been successfully updated."
    });
  };
  
  const handleAddTask = () => {
    toast.info("Add Task Feature", {
      description: "This feature will be implemented soon."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <button 
          onClick={handleAddTask}
          className="btn-primary flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add New Task
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search tasks..."
              className="form-input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <select
              className="form-input"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          
          <div>
            <select
              className="form-input"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Tasks List */}
      <div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="p-4 text-left font-medium text-gray-500">
                <button 
                  className="flex items-center"
                  onClick={() => handleSort("title")}
                >
                  Title
                  {sortField === "title" && (
                    sortDirection === "asc" ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </button>
              </th>
              <th className="p-4 text-left font-medium text-gray-500 hidden md:table-cell">
                <button 
                  className="flex items-center"
                  onClick={() => handleSort("priority")}
                >
                  Priority
                  {sortField === "priority" && (
                    sortDirection === "asc" ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </button>
              </th>
              <th className="p-4 text-left font-medium text-gray-500 hidden md:table-cell">Status</th>
              <th className="p-4 text-left font-medium text-gray-500">
                <button 
                  className="flex items-center"
                  onClick={() => handleSort("dueDate")}
                >
                  Due Date
                  {sortField === "dueDate" && (
                    sortDirection === "asc" ? <ArrowUp size={14} className="ml-1" /> : <ArrowDown size={14} className="ml-1" />
                  )}
                </button>
              </th>
              <th className="p-4 text-left font-medium text-gray-500 hidden lg:table-cell">Assigned To</th>
              <th className="p-4 text-left font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{task.description}</p>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <Badge className={getTaskPriorityClass(task.priority)}>
                      {task.priority}
                    </Badge>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <Badge className={getTaskStatusClass(task.status)}>
                      {task.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2 text-gray-400" />
                      <span>{formatDate(task.dueDate)}</span>
                    </div>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    {task.assignedTo}
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      {task.status !== "Completed" && (
                        <button 
                          onClick={() => handleStatusChange(task.id, "Completed")}
                          className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200" 
                          title="Mark as Completed"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button 
                        className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200" 
                        title="Edit Task"
                      >
                        <Filter size={16} />
                      </button>
                      <button 
                        className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200" 
                        title="Delete Task"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  No tasks found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TasksSection;
