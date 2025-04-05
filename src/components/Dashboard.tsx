import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { 
  ArrowUpRight, Users, CheckCircle, Calendar,
  Clock, DollarSign, BarChart2, PlusCircle, 
  ChevronRight, Mail, Phone, Clock3
} from "lucide-react";
import { 
  clients, tasks, recentActivities, 
  revenueData, taskStatusData, dashboardStats 
} from "../utils/mockData";
import { Link, useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { toast } from "@/lib/toast";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [dateRange, setDateRange] = useState("7months");
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const [newClient, setNewClient] = useState({
    name: "",
    industry: "",
    email: "",
    phone: "",
    status: "Active"
  });
  
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    clientId: "",
    assignedTo: ""
  });
  
  const TASK_COLORS = ["#4CAF50", "#2196F3", "#FFC107"];
  
  const filteredActivities = activeFilter === "all" 
    ? recentActivities 
    : recentActivities.filter(activity => activity.type === activeFilter);
  
  const getFilteredRevenueData = () => {
    switch (dateRange) {
      case "30days":
        return revenueData.slice(-1);
      case "90days":
        return revenueData.slice(-3);
      case "12months":
        return revenueData;
      default:
        return revenueData.slice(-7);
    }
  };
  
  const filteredRevenueData = getFilteredRevenueData();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };
  
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return "just now";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
  };
  
  const recentClients = clients
    .slice()
    .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
    .slice(0, 3);

  const upcomingTasks = tasks
    .filter(task => task.status !== "Completed")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);
  
  const updateNewClient = (field: string, value: string) => {
    setNewClient(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleAddClient = () => {
    toast.success("Client added successfully", {
      description: `${newClient.name} has been added to your clients list.`
    });
    
    setIsAddClientModalOpen(false);
    setNewClient({
      name: "",
      industry: "",
      email: "",
      phone: "",
      status: "Active"
    });
  };
  
  const updateNewTask = (field: string, value: string) => {
    setNewTask(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleAddTask = () => {
    toast.success("Task added successfully", {
      description: `"${newTask.title}" has been added to your tasks.`
    });
    
    setIsAddTaskModalOpen(false);
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      clientId: "",
      assignedTo: ""
    });
  };
  
  const handleClientClick = (clientId: number) => {
    navigate(`/clients/${clientId}`);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card animate-slide-in delay-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Clients</p>
              <h3 className="text-2xl font-bold">{dashboardStats.totalClients}</h3>
            </div>
            <div className="bg-crm-yellow-light p-2 rounded-full">
              <Users size={20} className="text-crm-yellow" />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600">
            <ArrowUpRight size={16} />
            <span>+4.2% from last month</span>
          </div>
        </div>
        
        <div className="stat-card animate-slide-in delay-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Tasks Completed</p>
              <h3 className="text-2xl font-bold">{dashboardStats.tasksCompleted}</h3>
            </div>
            <div className="bg-crm-yellow-light p-2 rounded-full">
              <CheckCircle size={20} className="text-crm-yellow" />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600">
            <ArrowUpRight size={16} />
            <span>+12.8% from last month</span>
          </div>
        </div>
        
        <div className="stat-card animate-slide-in delay-300">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Revenue (YTD)</p>
              <h3 className="text-2xl font-bold">{formatCurrency(dashboardStats.totalRevenue)}</h3>
            </div>
            <div className="bg-crm-yellow-light p-2 rounded-full">
              <DollarSign size={20} className="text-crm-yellow" />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600">
            <ArrowUpRight size={16} />
            <span>+{formatPercentage(dashboardStats.revenueGrowth)} from last year</span>
          </div>
        </div>
        
        <div className="stat-card animate-slide-in delay-400">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Avg. Response Time</p>
              <h3 className="text-2xl font-bold">{dashboardStats.avgResponseTime} hrs</h3>
            </div>
            <div className="bg-crm-yellow-light p-2 rounded-full">
              <Clock size={20} className="text-crm-yellow" />
            </div>
          </div>
          <div className="flex items-center text-sm text-green-600">
            <ArrowUpRight size={16} />
            <span>20% faster than target</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2 animate-slide-in delay-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Revenue Trend</h3>
            <select 
              className="form-input text-sm w-auto"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7months">Last 7 months</option>
              <option value="12months">Last 12 months</option>
              <option value="90days">Last 90 days</option>
              <option value="30days">Last 30 days</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredRevenueData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(value) => `$${value/1000}k`} 
                />
                <Tooltip 
                  formatter={(value) => [`${formatCurrency(value as number)}`, "Revenue"]}
                  contentStyle={{ 
                    backgroundColor: "white", 
                    border: "1px solid #F5F5F5",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="#FFC107" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="card animate-slide-in delay-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Task Status</h3>
            <Link to="/tasks" className="text-sm text-crm-yellow hover:underline">View Details</Link>
          </div>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="count"
                  animationDuration={1500}
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={TASK_COLORS[index % TASK_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} tasks`, "Count"]}
                  contentStyle={{ 
                    backgroundColor: "white", 
                    border: "1px solid #F5F5F5",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {taskStatusData.map((entry, index) => (
              <div key={`legend-${index}`} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: TASK_COLORS[index % TASK_COLORS.length] }}
                />
                <span className="text-sm">{entry.status} ({entry.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card animate-slide-in delay-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Recent Activities</h3>
            <Link to="/reports" className="text-sm text-crm-yellow hover:underline">View All</Link>
          </div>
          
          <div className="flex flex-wrap mb-4 space-x-2">
            <button 
              onClick={() => setActiveFilter("all")}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                activeFilter === "all" 
                  ? "bg-crm-yellow text-black" 
                  : "bg-crm-light-gray text-gray-700 hover:bg-crm-medium-gray"
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveFilter("email")}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                activeFilter === "email" 
                  ? "bg-crm-yellow text-black" 
                  : "bg-crm-light-gray text-gray-700 hover:bg-crm-medium-gray"
              }`}
            >
              Emails
            </button>
            <button 
              onClick={() => setActiveFilter("call")}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                activeFilter === "call" 
                  ? "bg-crm-yellow text-black" 
                  : "bg-crm-light-gray text-gray-700 hover:bg-crm-medium-gray"
              }`}
            >
              Calls
            </button>
            <button 
              onClick={() => setActiveFilter("meeting")}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                activeFilter === "meeting" 
                  ? "bg-crm-yellow text-black" 
                  : "bg-crm-light-gray text-gray-700 hover:bg-crm-medium-gray"
              }`}
            >
              Meetings
            </button>
          </div>
          
          <div className="space-y-4">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <div key={activity.id} className="border-b border-crm-light-gray pb-4 last:border-0">
                  <div className="flex">
                    <div className="mr-4">
                      <div className="bg-crm-yellow-light p-2 rounded-full">
                        {activity.type === "email" && <Mail size={16} className="text-crm-yellow" />}
                        {activity.type === "call" && <Phone size={16} className="text-crm-yellow" />}
                        {activity.type === "meeting" && <Calendar size={16} className="text-crm-yellow" />}
                        {activity.type === "task" && <CheckCircle size={16} className="text-crm-yellow" />}
                        {activity.type === "note" && <BarChart2 size={16} className="text-crm-yellow" />}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm">{activity.description}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <Clock3 size={12} className="mr-1" />
                        <span>{formatRelativeTime(activity.timestamp)}</span>
                        <span className="mx-2">•</span>
                        <span>{activity.user}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No activities match this filter</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="card animate-slide-in delay-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Recent Clients</h3>
              <Link to="/clients" className="text-sm text-crm-yellow hover:underline">View All</Link>
            </div>
            
            <div className="space-y-4">
              {recentClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between border-b border-crm-light-gray pb-4 last:border-0">
                  <div className="flex items-center">
                    <div className="rounded-full bg-crm-yellow w-10 h-10 flex items-center justify-center font-bold text-black">
                      {client.logo}
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">{client.name}</h4>
                      <p className="text-xs text-gray-500">{client.industry}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleClientClick(client.id)}
                    className="p-2 rounded-full hover:bg-crm-light-gray"
                    aria-label={`View details for ${client.name}`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Dialog open={isAddClientModalOpen} onOpenChange={setIsAddClientModalOpen}>
                <DialogTrigger asChild>
                  <button className="flex items-center justify-center w-full py-2 rounded-md border border-crm-light-gray text-sm font-medium hover:bg-crm-light-gray transition-colors">
                    <PlusCircle size={16} className="mr-2" />
                    Add New Client
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Client</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label htmlFor="name" className="form-label">Client Name</label>
                      <input 
                        id="name" 
                        type="text" 
                        className="form-input" 
                        placeholder="Enter client name"
                        value={newClient.name}
                        onChange={(e) => updateNewClient("name", e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="industry" className="form-label">Industry</label>
                      <input 
                        id="industry" 
                        type="text" 
                        className="form-input" 
                        placeholder="Enter industry"
                        value={newClient.industry}
                        onChange={(e) => updateNewClient("industry", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                          id="email" 
                          type="email" 
                          className="form-input" 
                          placeholder="Enter email"
                          value={newClient.email}
                          onChange={(e) => updateNewClient("email", e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input 
                          id="phone" 
                          type="text" 
                          className="form-input" 
                          placeholder="Enter phone number"
                          value={newClient.phone}
                          onChange={(e) => updateNewClient("phone", e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="status" className="form-label">Status</label>
                      <select 
                        id="status" 
                        className="form-input"
                        value={newClient.status}
                        onChange={(e) => updateNewClient("status", e.target.value)}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Lead">Lead</option>
                      </select>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <button className="btn-secondary">Cancel</button>
                    </DialogClose>
                    <button onClick={handleAddClient} className="btn-primary">Add Client</button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="card animate-slide-in delay-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Upcoming Tasks</h3>
              <Link to="/tasks" className="text-sm text-crm-yellow hover:underline">View All</Link>
            </div>
            
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="border-b border-crm-light-gray pb-4 last:border-0">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{task.title}</h4>
                    <span className={`badge ${
                      task.priority === "High" 
                        ? "bg-red-100 text-red-800" 
                        : task.priority === "Medium"
                        ? "bg-crm-yellow-light text-crm-yellow" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {task.description.length > 60 
                      ? task.description.substring(0, 60) + "..." 
                      : task.description}
                  </p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      <span>
                        {new Date(task.dueDate).toLocaleDateString()} at {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <span>{task.assignedTo}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <Dialog open={isAddTaskModalOpen} onOpenChange={setIsAddTaskModalOpen}>
                <DialogTrigger asChild>
                  <button className="flex items-center justify-center w-full py-2 rounded-md border border-crm-light-gray text-sm font-medium hover:bg-crm-light-gray transition-colors">
                    <PlusCircle size={16} className="mr-2" />
                    Add New Task
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label htmlFor="title" className="form-label">Task Title</label>
                      <input 
                        id="title" 
                        type="text" 
                        className="form-input" 
                        placeholder="Enter task title"
                        value={newTask.title}
                        onChange={(e) => updateNewTask("title", e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="form-label">Description</label>
                      <textarea 
                        id="description" 
                        className="form-input min-h-[100px]" 
                        placeholder="Enter task description"
                        value={newTask.description}
                        onChange={(e) => updateNewTask("description", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="priority" className="form-label">Priority</label>
                        <select 
                          id="priority" 
                          className="form-input"
                          value={newTask.priority}
                          onChange={(e) => updateNewTask("priority", e.target.value)}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="dueDate" className="form-label">Due Date</label>
                        <input 
                          id="dueDate" 
                          type="datetime-local" 
                          className="form-input"
                          value={newTask.dueDate}
                          onChange={(e) => updateNewTask("dueDate", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="client" className="form-label">Client</label>
                        <select 
                          id="client" 
                          className="form-input"
                          value={newTask.clientId}
                          onChange={(e) => updateNewTask("clientId", e.target.value)}
                        >
                          <option value="">Select Client</option>
                          {clients.map(client => (
                            <option key={client.id} value={client.id}>{client.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="assignedTo" className="form-label">Assigned To</label>
                        <input 
                          id="assignedTo" 
                          type="text" 
                          className="form-input" 
                          placeholder="Enter assignee name"
                          value={newTask.assignedTo}
                          onChange={(e) => updateNewTask("assignedTo", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <button className="btn-secondary">Cancel</button>
                    </DialogClose>
                    <button onClick={handleAddTask} className="btn-primary">Add Task</button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
