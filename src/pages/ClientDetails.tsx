
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  User, Mail, Phone, MapPin, Calendar, 
  FileText, BarChart2, Clock, ArrowLeft, 
  ChevronRight, Edit2, Trash2, PlusCircle,
  CheckCircle 
} from "lucide-react";
import { clients, tasks, recentActivities } from "@/utils/mockData";
import Header from "@/components/Header";
import { toast } from "@/lib/toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger
} from "@/components/ui/dialog";

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const clientId = parseInt(id || "0");
  const [client, setClient] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Get client's related tasks
  const clientTasks = tasks.filter(task => task.clientId === clientId);
  
  // Get client's related activities
  const clientActivities = recentActivities.filter(
    activity => activity.clientId === clientId
  ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundClient = clients.find(c => c.id === clientId);
      
      if (foundClient) {
        setClient(foundClient);
      } else {
        toast.error("Client not found", {
          description: "The client you're looking for doesn't exist."
        });
        navigate("/clients");
      }
      
      setIsLoading(false);
    }, 300);
  }, [clientId, navigate]);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="pt-16 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="py-20 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-crm-yellow"></div>
            <p className="mt-4">Loading client information...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="pt-16 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold mb-2">Client Not Found</h2>
            <p className="text-gray-600 mb-6">The client you're looking for doesn't exist.</p>
            <button 
              onClick={() => navigate("/clients")}
              className="bg-crm-yellow hover:bg-crm-yellow-hover text-black px-4 py-2 rounded-md flex items-center mx-auto"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Clients
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="pt-16 px-4 md:px-6 max-w-7xl mx-auto pb-16">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </button>
        
        {/* Client header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center">
            <div className="rounded-full bg-crm-yellow w-16 h-16 flex items-center justify-center font-bold text-black text-2xl">
              {client.logo}
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{client.name}</h1>
              <p className="text-gray-600">{client.industry}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              client.status === "Active" ? "bg-green-100 text-green-800" : 
              client.status === "Inactive" ? "bg-gray-100 text-gray-800" : 
              "bg-crm-yellow-light text-crm-yellow"
            }`}>
              {client.status}
            </span>
            
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Edit2 size={16} className="text-gray-600" />
            </button>
            
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Trash2 size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Client tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="animate-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                {/* Client info card */}
                <div className="card">
                  <h2 className="text-lg font-semibold mb-4">Client Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex">
                        <User size={18} className="text-gray-400 mr-2 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Contact Person</p>
                          <p>{client.contactPerson || "Not specified"}</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <Mail size={18} className="text-gray-400 mr-2 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p>{client.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <Phone size={18} className="text-gray-400 mr-2 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p>{client.phone}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex">
                        <MapPin size={18} className="text-gray-400 mr-2 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p>{client.address || "Not specified"}</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <Calendar size={18} className="text-gray-400 mr-2 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Since</p>
                          <p>{client.since ? formatDate(client.since) : "Not specified"}</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <Clock size={18} className="text-gray-400 mr-2 mt-1" />
                        <div>
                          <p className="text-sm text-gray-600">Last Activity</p>
                          <p>{formatRelativeTime(client.lastActivity)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Recent tasks */}
                <div className="card">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Recent Tasks</h2>
                    <button 
                      onClick={() => setActiveTab("tasks")}
                      className="text-sm text-crm-yellow hover:underline flex items-center"
                    >
                      View All
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                  
                  {clientTasks.length > 0 ? (
                    <div className="space-y-4">
                      {clientTasks.slice(0, 3).map(task => (
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
                                Due: {formatDate(task.dueDate)}
                              </span>
                            </div>
                            <span>Assigned to: {task.assignedTo}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <p>No tasks for this client</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right column */}
              <div className="space-y-6">
                {/* Client statistics */}
                <div className="card">
                  <h2 className="text-lg font-semibold mb-4">Client Statistics</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="rounded-full bg-crm-yellow-light p-2 mr-3">
                          <FileText size={16} className="text-crm-yellow" />
                        </div>
                        <span>Total Projects</span>
                      </div>
                      <span className="font-bold">{client.totalProjects || 0}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="rounded-full bg-blue-100 p-2 mr-3">
                          <BarChart2 size={16} className="text-blue-600" />
                        </div>
                        <span>Revenue</span>
                      </div>
                      <span className="font-bold">${client.revenue?.toLocaleString() || "0"}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="rounded-full bg-green-100 p-2 mr-3">
                          <CheckCircle size={16} className="text-green-600" />
                        </div>
                        <span>Tasks Completed</span>
                      </div>
                      <span className="font-bold">{client.tasksCompleted || 0}</span>
                    </div>
                  </div>
                </div>
                
                {/* Recent activities */}
                <div className="card">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Recent Activities</h2>
                    <button 
                      onClick={() => setActiveTab("activities")}
                      className="text-sm text-crm-yellow hover:underline flex items-center"
                    >
                      View All
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                  
                  {clientActivities.length > 0 ? (
                    <div className="space-y-4">
                      {clientActivities.slice(0, 4).map(activity => (
                        <div key={activity.id} className="flex border-b border-crm-light-gray pb-4 last:border-0">
                          <div className="mr-4">
                            <div className="bg-crm-yellow-light p-2 rounded-full">
                              {activity.type === "email" && <Mail size={16} className="text-crm-yellow" />}
                              {activity.type === "call" && <Phone size={16} className="text-crm-yellow" />}
                              {activity.type === "meeting" && <Calendar size={16} className="text-crm-yellow" />}
                              {activity.type === "task" && <CheckCircle size={16} className="text-crm-yellow" />}
                              {activity.type === "note" && <FileText size={16} className="text-crm-yellow" />}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm">{activity.description}</p>
                            <div className="flex items-center mt-1 text-xs text-gray-500">
                              <Clock size={12} className="mr-1" />
                              <span>{formatRelativeTime(activity.timestamp)}</span>
                              <span className="mx-2">•</span>
                              <span>{activity.user}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <p>No activities recorded</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tasks" className="animate-in">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">All Tasks</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="bg-crm-yellow hover:bg-crm-yellow-hover text-black px-4 py-2 rounded-md flex items-center">
                      <PlusCircle size={16} className="mr-2" />
                      Add Task
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      {/* Task form fields would go here */}
                      <p>Task creation form will appear here</p>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Cancel</button>
                      </DialogClose>
                      <button className="bg-crm-yellow hover:bg-crm-yellow-hover text-black px-4 py-2 rounded-md">Add Task</button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              {clientTasks.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left pb-3 font-medium text-gray-600">Title</th>
                        <th className="text-left pb-3 font-medium text-gray-600">Priority</th>
                        <th className="text-left pb-3 font-medium text-gray-600">Due Date</th>
                        <th className="text-left pb-3 font-medium text-gray-600">Status</th>
                        <th className="text-left pb-3 font-medium text-gray-600">Assigned To</th>
                        <th className="text-right pb-3 font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientTasks.map(task => (
                        <tr key={task.id} className="border-b border-gray-100 last:border-0">
                          <td className="py-4">{task.title}</td>
                          <td className="py-4">
                            <span className={`badge ${
                              task.priority === "High" 
                                ? "bg-red-100 text-red-800" 
                                : task.priority === "Medium"
                                ? "bg-crm-yellow-light text-crm-yellow" 
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {task.priority}
                            </span>
                          </td>
                          <td className="py-4">{formatDate(task.dueDate)}</td>
                          <td className="py-4">
                            <span className={`badge ${
                              task.status === "Completed" 
                                ? "bg-green-100 text-green-800" 
                                : task.status === "In Progress"
                                ? "bg-blue-100 text-blue-800" 
                                : "bg-crm-yellow-light text-crm-yellow"
                            }`}>
                              {task.status}
                            </span>
                          </td>
                          <td className="py-4">{task.assignedTo}</td>
                          <td className="py-4 text-right">
                            <button className="p-2 rounded-full hover:bg-gray-100">
                              <Edit2 size={16} className="text-gray-600" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-100">
                              <Trash2 size={16} className="text-gray-600" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-4">No tasks found for this client</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="bg-crm-yellow hover:bg-crm-yellow-hover text-black px-4 py-2 rounded-md flex items-center mx-auto">
                        <PlusCircle size={16} className="mr-2" />
                        Add First Task
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Add New Task</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        {/* Task form fields would go here */}
                        <p>Task creation form will appear here</p>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Cancel</button>
                        </DialogClose>
                        <button className="bg-crm-yellow hover:bg-crm-yellow-hover text-black px-4 py-2 rounded-md">Add Task</button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="activities" className="animate-in">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Activity History</h2>
                <div className="flex gap-2">
                  <button className="bg-crm-yellow hover:bg-crm-yellow-hover text-black px-4 py-2 rounded-md flex items-center">
                    <PlusCircle size={16} className="mr-2" />
                    Log Activity
                  </button>
                </div>
              </div>
              
              {clientActivities.length > 0 ? (
                <div className="space-y-4">
                  {clientActivities.map(activity => (
                    <div key={activity.id} className="flex border-b border-crm-light-gray pb-4 last:border-0">
                      <div className="mr-4">
                        <div className="bg-crm-yellow-light p-2 rounded-full">
                          {activity.type === "email" && <Mail size={16} className="text-crm-yellow" />}
                          {activity.type === "call" && <Phone size={16} className="text-crm-yellow" />}
                          {activity.type === "meeting" && <Calendar size={16} className="text-crm-yellow" />}
                          {activity.type === "task" && <CheckCircle size={16} className="text-crm-yellow" />}
                          {activity.type === "note" && <FileText size={16} className="text-crm-yellow" />}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p>{activity.description}</p>
                          <div className="flex">
                            <button className="p-1 rounded-full hover:bg-gray-100">
                              <Edit2 size={14} className="text-gray-500" />
                            </button>
                            <button className="p-1 rounded-full hover:bg-gray-100">
                              <Trash2 size={14} className="text-gray-500" />
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <Clock size={12} className="mr-1" />
                          <span>{formatDate(activity.timestamp)} at {new Date(activity.timestamp).toLocaleTimeString()}</span>
                          <span className="mx-2">•</span>
                          <span>{activity.user}</span>
                          {activity.type && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="capitalize">{activity.type}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-4">No activities recorded for this client</p>
                  <button className="bg-crm-yellow hover:bg-crm-yellow-hover text-black px-4 py-2 rounded-md flex items-center mx-auto">
                    <PlusCircle size={16} className="mr-2" />
                    Log First Activity
                  </button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="animate-in">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Client Notes</h2>
                <button className="bg-crm-yellow hover:bg-crm-yellow-hover text-black px-4 py-2 rounded-md flex items-center">
                  <PlusCircle size={16} className="mr-2" />
                  Add Note
                </button>
              </div>
              
              <div className="text-center py-12 text-gray-500">
                <p className="mb-4">No notes found for this client</p>
                <button className="bg-crm-yellow hover:bg-crm-yellow-hover text-black px-4 py-2 rounded-md flex items-center mx-auto">
                  <PlusCircle size={16} className="mr-2" />
                  Add First Note
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ClientDetails;
