
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  BarChart2,
  Plus,
  MessageSquare,
  FileText,
  ChevronDown
} from "lucide-react";
import { clients, clientTasks, clientActivities, clientNotes } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ClientDetails = () => {
  const { id } = useParams();
  const clientId = parseInt(id || "0");
  const client = clients.find(c => c.id === clientId);
  
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-2xl font-bold mb-4">Client not found</h1>
        <Link to="/clients">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Clients
          </Button>
        </Link>
      </div>
    );
  }
  
  const filteredTasks = clientTasks.filter(task => task.clientId === clientId);
  const completedTasks = filteredTasks.filter(task => task.status === "Completed").length;
  const completionRate = filteredTasks.length > 0 
    ? Math.round((completedTasks / filteredTasks.length) * 100) 
    : 0;
  
  const filteredActivities = clientActivities.filter(activity => activity.clientId === clientId);
  const filteredNotes = clientNotes.filter(note => note.clientId === clientId);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
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
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Link to="/clients" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft size={18} />
            </Link>
            <h1 className="text-2xl font-bold">{client.name}</h1>
            <span className={`badge ${
              client.status === "Active" 
                ? "bg-green-100 text-green-800" 
                : client.status === "Inactive"
                ? "bg-gray-100 text-gray-800" 
                : "bg-crm-yellow-light text-crm-yellow"
            }`}>
              {client.status}
            </span>
          </div>
          <p className="text-gray-500 mt-1">{client.industry}</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex items-center">
            <Mail className="mr-2 h-4 w-4" /> Email
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Phone className="mr-2 h-4 w-4" /> Call
          </Button>
          <Button size="sm" className="flex items-center bg-crm-yellow hover:bg-crm-yellow-hover text-black">
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Client Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Contact Person</p>
                      <p className="font-medium">{client.contactPerson}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium">{client.email}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium">{client.phone}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{client.address}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Client Since</p>
                      <p className="font-medium">{formatDate(client.since)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Last Activity</p>
                      <p className="font-medium">{formatRelativeTime(client.lastActivity)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="font-semibold mb-3">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Total Projects</p>
                      <p className="text-xl font-semibold">{client.totalProjects}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Revenue</p>
                      <p className="text-xl font-semibold">${client.revenue.toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Tasks Completed</p>
                      <p className="text-xl font-semibold">{client.tasksCompleted}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Client Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-500">Task Completion</p>
                      <p className="text-sm font-semibold">{completionRate}%</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-crm-yellow h-2 rounded-full" 
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-crm-yellow-light/30 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <DollarSign size={18} className="text-crm-yellow" />
                          <span className="text-xs text-gray-500">Total Value</span>
                        </div>
                        <p className="text-lg font-semibold">${client.revenue.toLocaleString()}</p>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <CheckCircle size={18} className="text-green-600" />
                          <span className="text-xs text-gray-500">Tasks Done</span>
                        </div>
                        <p className="text-lg font-semibold">{completedTasks}/{filteredTasks.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">Client Health</p>
                        <p className="font-semibold text-green-600">Good</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle size={16} className="text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Tasks */}
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Tasks</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/tasks">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-start justify-between p-3 border border-gray-100 rounded-lg">
                        <div>
                          <div className="flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${
                              task.priority === "High" ? "bg-red-500" : 
                              task.priority === "Medium" ? "bg-crm-yellow" : "bg-blue-500"
                            }`} />
                            <h4 className="font-medium">{task.title}</h4>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                          <div className="flex items-center text-xs text-gray-500 mt-2">
                            <Calendar size={12} className="mr-1" />
                            <span>Due: {formatDate(task.dueDate)}</span>
                          </div>
                        </div>
                        <span className={`badge ${
                          task.status === "Completed" 
                            ? "bg-green-100 text-green-800" 
                            : task.status === "In Progress"
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-crm-yellow-light text-crm-yellow"
                        }`}>
                          {task.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <p>No tasks found for this client</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Activities */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Activities</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/clients">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredActivities.length > 0 ? (
                    filteredActivities.slice(0, 4).map((activity) => (
                      <div key={activity.id} className="flex gap-3">
                        <div className="shrink-0">
                          <div className="w-8 h-8 rounded-full bg-crm-yellow-light flex items-center justify-center">
                            {activity.type === "email" && <Mail size={16} className="text-crm-yellow" />}
                            {activity.type === "call" && <Phone size={16} className="text-crm-yellow" />}
                            {activity.type === "meeting" && <Calendar size={16} className="text-crm-yellow" />}
                            {activity.type === "task" && <CheckCircle size={16} className="text-crm-yellow" />}
                            {activity.type === "note" && <BarChart2 size={16} className="text-crm-yellow" />}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm">{activity.description}</p>
                          <p className="text-xs text-gray-500">{formatRelativeTime(activity.timestamp)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <p>No recent activities</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Tasks</CardTitle>
              <Button size="sm" className="bg-crm-yellow hover:bg-crm-yellow-hover text-black">
                <Plus className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <div key={task.id} className="flex items-start justify-between p-4 border border-gray-100 rounded-lg">
                      <div>
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${
                            task.priority === "High" ? "bg-red-500" : 
                            task.priority === "Medium" ? "bg-crm-yellow" : "bg-blue-500"
                          }`} />
                          <h4 className="font-medium">{task.title}</h4>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                          <div className="flex items-center">
                            <Calendar size={12} className="mr-1" />
                            <span>Due: {formatDate(task.dueDate)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            <span>Assigned to: {task.assignedTo}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`badge ${
                        task.status === "Completed" 
                          ? "bg-green-100 text-green-800" 
                          : task.status === "In Progress"
                          ? "bg-blue-100 text-blue-800" 
                          : "bg-crm-yellow-light text-crm-yellow"
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>No tasks found for this client</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Plus className="mr-2 h-4 w-4" /> Create First Task
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Activities Tab */}
        <TabsContent value="activities">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Client Activities</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Filter <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
                <Button size="sm" className="bg-crm-yellow hover:bg-crm-yellow-hover text-black">
                  <Plus className="mr-2 h-4 w-4" /> Log Activity
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((activity) => (
                    <div key={activity.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-0">
                      <div className="shrink-0">
                        <div className="w-10 h-10 rounded-full bg-crm-yellow-light flex items-center justify-center">
                          {activity.type === "email" && <Mail size={18} className="text-crm-yellow" />}
                          {activity.type === "call" && <Phone size={18} className="text-crm-yellow" />}
                          {activity.type === "meeting" && <Calendar size={18} className="text-crm-yellow" />}
                          {activity.type === "task" && <CheckCircle size={18} className="text-crm-yellow" />}
                          {activity.type === "note" && <BarChart2 size={18} className="text-crm-yellow" />}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{activity.title}</h4>
                          <span className={`badge ${
                            activity.type === "email" ? "bg-blue-100 text-blue-800" :
                            activity.type === "call" ? "bg-green-100 text-green-800" :
                            activity.type === "meeting" ? "bg-purple-100 text-purple-800" :
                            activity.type === "task" ? "bg-crm-yellow-light text-crm-yellow" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock size={12} className="mr-1" />
                          <span>{formatRelativeTime(activity.timestamp)}</span>
                          <span className="mx-2">•</span>
                          <span>{activity.user}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>No activities found for this client</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Plus className="mr-2 h-4 w-4" /> Log First Activity
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notes Tab */}
        <TabsContent value="notes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Client Notes</CardTitle>
              <Button size="sm" className="bg-crm-yellow hover:bg-crm-yellow-hover text-black">
                <Plus className="mr-2 h-4 w-4" /> Add Note
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredNotes.length > 0 ? (
                  filteredNotes.map((note) => (
                    <div key={note.id} className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{note.title}</h4>
                        <span className="text-xs text-gray-500">{formatRelativeTime(note.createdAt)}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{note.content}</p>
                      <div className="flex items-center mt-4 text-xs text-gray-500">
                        <span>Created by: {note.createdBy}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>No notes found for this client</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      <Plus className="mr-2 h-4 w-4" /> Create First Note
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetails;
