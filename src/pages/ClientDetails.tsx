
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Building, FileText, Plus, Edit, Trash, User, Clock } from "lucide-react";
import Header from "@/components/Header";
import { clients, tasks, recentActivities } from "../utils/mockData";
import { toast } from "@/lib/toast";

const ClientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<any>(null);
  const [clientTasks, setClientTasks] = useState<any[]>([]);
  const [clientActivities, setClientActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const fetchData = () => {
      try {
        const clientData = clients.find(c => c.id.toString() === id);
        if (clientData) {
          setClient(clientData);
          
          // Get client-related tasks
          const relatedTasks = tasks.filter(task => task.clientId === clientData.id);
          setClientTasks(relatedTasks);
          
          // Get client-related activities
          const relatedActivities = recentActivities.filter(
            activity => activity.clientId === clientData.id
          );
          setClientActivities(relatedActivities);
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
        toast.error("Failed to load client data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Format relative time
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
          <div className="py-8 text-center">Loading client details...</div>
        </main>
      </div>
    );
  }
  
  if (!client) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="pt-16 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="py-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Client Not Found</h2>
            <p>The client you are looking for does not exist.</p>
            <Link to="/clients" className="text-crm-yellow hover:underline mt-4 inline-block">
              <ArrowLeft className="inline mr-2" size={16} />
              Back to Clients
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="pt-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="py-6">
          <Link to="/clients" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} className="mr-2" />
            Back to Clients
          </Link>
          
          {/* Client Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 pb-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="rounded-full bg-crm-yellow w-16 h-16 flex items-center justify-center font-bold text-black text-2xl">
                {client.logo}
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{client.name}</h1>
                <p className="text-gray-500">{client.industry}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                <Edit size={16} />
                Edit
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-md text-red-600 hover:bg-red-100">
                <Trash size={16} />
                Delete
              </button>
            </div>
          </div>
          
          {/* Client Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Client Info */}
            <div className="card md:col-span-1">
              <h2 className="font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <User size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">{client.contact}</p>
                    <p className="text-sm text-gray-500">Primary Contact</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <a href={`mailto:${client.email}`} className="font-medium text-blue-600 hover:underline">
                      {client.email}
                    </a>
                    <p className="text-sm text-gray-500">Email</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <a href={`tel:${client.phone}`} className="font-medium text-blue-600 hover:underline">
                      {client.phone}
                    </a>
                    <p className="text-sm text-gray-500">Phone</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin size={18} className="text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">123 Business Ave, Suite 200</p>
                    <p className="font-medium">New York, NY 10001</p>
                    <p className="text-sm text-gray-500">Address</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <h2 className="font-semibold mb-4">Business Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Building size={18} className="text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">{client.industry}</p>
                      <p className="text-sm text-gray-500">Industry</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText size={18} className="text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">{formatCurrency(client.revenue)}</p>
                      <p className="text-sm text-gray-500">Annual Revenue</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock size={18} className="text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">{formatDate(client.createdAt)}</p>
                      <p className="text-sm text-gray-500">Client Since</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Client Tasks */}
            <div className="card md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold">Tasks</h2>
                <button className="flex items-center text-sm text-crm-yellow hover:underline">
                  <Plus size={16} className="mr-1" />
                  Add Task
                </button>
              </div>
              
              <div className="space-y-4">
                {clientTasks.length > 0 ? (
                  clientTasks.map((task) => (
                    <div key={task.id} className="border-b border-gray-200 pb-4 last:border-0">
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
                      <p className="text-sm text-gray-600 mt-2">{task.description}</p>
                      <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          <span>Due: {formatDate(task.dueDate)}</span>
                        </div>
                        <span>Assigned to: {task.assignedTo}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No tasks assigned to this client yet
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Recent Activities */}
          <div className="card mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Recent Activities</h2>
              <button className="flex items-center text-sm text-crm-yellow hover:underline">
                <Plus size={16} className="mr-1" />
                Log Activity
              </button>
            </div>
            
            <div className="space-y-4">
              {clientActivities.length > 0 ? (
                clientActivities.map((activity) => (
                  <div key={activity.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex">
                      <div className="mr-4">
                        <div className="bg-crm-yellow-light p-2 rounded-full">
                          {activity.type === "email" && <Mail size={16} className="text-crm-yellow" />}
                          {activity.type === "call" && <Phone size={16} className="text-crm-yellow" />}
                          {activity.type === "meeting" && <User size={16} className="text-crm-yellow" />}
                          {activity.type === "task" && <FileText size={16} className="text-crm-yellow" />}
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
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No recent activities for this client
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDetails;
