
import { Suspense, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, Building, Mail, Phone, Calendar, DollarSign, 
  Tag, Activity, FileText, MessageSquare, Users, Clock 
} from "lucide-react";
import { clients, tasks, recentActivities } from "../utils/mockData";
import { toast } from "@/lib/toast";
import Header from "@/components/Header";

const ClientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const clientId = parseInt(id || "0");
  const [client, setClient] = useState<any>(null);
  const [clientTasks, setClientTasks] = useState<any[]>([]);
  const [clientActivities, setClientActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch client data
    const fetchClientData = () => {
      setIsLoading(true);
      
      setTimeout(() => {
        const foundClient = clients.find(c => c.id === clientId);
        if (foundClient) {
          setClient(foundClient);
          
          // Get related tasks for this client
          const relatedTasks = tasks.filter(task => task.clientId === clientId);
          setClientTasks(relatedTasks);
          
          // In a real app, we would fetch activities related to this client
          // For now, we'll just use a subset of the activities
          setClientActivities(recentActivities.slice(0, 4));
          
          setIsLoading(false);
        } else {
          toast.error("Client not found", {
            description: "The requested client could not be found."
          });
          setIsLoading(false);
        }
      }, 800); // Simulate network delay
    };
    
    fetchClientData();
  }, [clientId]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="pt-16 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="py-12 flex justify-center items-center">
            <div className="animate-spin h-8 w-8 border-4 border-crm-yellow border-t-transparent rounded-full"></div>
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
          <div className="py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Client Not Found</h2>
            <p className="text-gray-600 mb-6">The client you're looking for doesn't exist or may have been removed.</p>
            <Link
              to="/clients"
              className="btn-primary inline-flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Clients
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const getTaskPriorityClass = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-crm-yellow-light text-crm-yellow";
      case "Low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="pt-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="py-6">
          <div className="mb-6">
            <Link
              to="/clients"
              className="text-gray-600 hover:text-gray-900 inline-flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Clients
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Client Info Card */}
            <div className="card lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="rounded-full bg-crm-yellow w-16 h-16 flex items-center justify-center font-bold text-2xl text-black">
                  {client.logo}
                </div>
                <div className="ml-4">
                  <h1 className="text-2xl font-bold">{client.name}</h1>
                  <div className="flex items-center text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>Client since {formatDate(client.createdAt)}</span>
                  </div>
                </div>
                <div className="ml-auto">
                  <span className={`badge ${
                    client.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {client.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Users size={18} className="mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">{client.contact}</p>
                        <p className="text-sm text-gray-500">Primary Contact</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail size={18} className="mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <a href={`mailto:${client.email}`} className="font-medium text-blue-600 hover:underline">
                          {client.email}
                        </a>
                        <p className="text-sm text-gray-500">Email</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone size={18} className="mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <a href={`tel:${client.phone}`} className="font-medium text-blue-600 hover:underline">
                          {client.phone}
                        </a>
                        <p className="text-sm text-gray-500">Phone</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Business Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Building size={18} className="mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">{client.industry}</p>
                        <p className="text-sm text-gray-500">Industry</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <DollarSign size={18} className="mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">{formatCurrency(client.revenue)}</p>
                        <p className="text-sm text-gray-500">Annual Revenue</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock size={18} className="mr-3 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">{formatDate(client.lastActivity)}</p>
                        <p className="text-sm text-gray-500">Last Activity</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-3">Recent Tasks</h3>
                {clientTasks.length > 0 ? (
                  <div className="space-y-4">
                    {clientTasks.map(task => (
                      <div key={task.id} className="p-4 border border-gray-100 rounded-lg">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{task.title}</h4>
                          <span className={`badge ${getTaskPriorityClass(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                        <div className="flex items-center justify-between mt-3 text-sm">
                          <div className="flex items-center text-gray-500">
                            <Calendar size={14} className="mr-1" />
                            <span>Due: {formatDate(task.dueDate)}</span>
                          </div>
                          <div className="flex items-center">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              task.status === "Completed" 
                                ? "bg-green-100 text-green-800" 
                                : task.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                              {task.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 border border-dashed border-gray-200 rounded-lg">
                    <p>No tasks associated with this client</p>
                    <button className="btn-secondary mt-2">
                      Create New Task
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold mb-3">Recent Activities</h3>
                <div className="space-y-4">
                  {clientActivities.map(activity => (
                    <div key={activity.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-start">
                        <div className="bg-crm-yellow-light p-2 rounded-full mr-3">
                          <Activity size={14} className="text-crm-yellow" />
                        </div>
                        <div>
                          <p className="text-sm">{activity.description}</p>
                          <div className="flex items-center mt-1 text-xs text-gray-500">
                            <Clock size={12} className="mr-1" />
                            <span>{formatDate(activity.timestamp)}</span>
                            <span className="mx-2">•</span>
                            <span>{activity.user}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="btn-action">
                    <MessageSquare size={16} className="mr-2" />
                    Send Email
                  </button>
                  <button className="btn-action">
                    <Phone size={16} className="mr-2" />
                    Log Call
                  </button>
                  <button className="btn-action">
                    <FileText size={16} className="mr-2" />
                    Create Task
                  </button>
                  <button className="btn-action">
                    <Calendar size={16} className="mr-2" />
                    Schedule Meeting
                  </button>
                </div>
              </div>
              
              <div className="card">
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <Tag size={12} className="mr-1" />
                    <span>{client.industry}</span>
                  </div>
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <Tag size={12} className="mr-1" />
                    <span>Key Account</span>
                  </div>
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <Tag size={12} className="mr-1" />
                    <span>Enterprise</span>
                  </div>
                  <button className="text-sm text-crm-yellow hover:underline">
                    + Add Tag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDetails;
