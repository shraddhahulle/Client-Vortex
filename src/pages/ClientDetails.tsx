
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Trash, FileText, PlusCircle, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { clients, tasks } from "../utils/mockData";
import { toast } from "@/lib/toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ClientDetails = () => {
  const { id } = useParams();
  const clientId = parseInt(id || "0");
  
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  
  // Find client by ID
  const client = clients.find(c => c.id === clientId);
  
  // Get client tasks
  const clientTasks = tasks.filter(task => task.clientId === clientId);
  
  // Handle if client not found
  if (!client) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="pt-20 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="py-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Client Not Found</h2>
            <p className="text-gray-600 mb-4">The client you're looking for doesn't exist or has been removed.</p>
            <Link to="/clients" className="btn-primary">
              Return to Clients
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  const handleEdit = () => {
    toast.success("Client updated successfully");
    setIsEditModalOpen(false);
  };
  
  const handleDelete = () => {
    toast.success("Client deleted successfully");
    setIsDeleteModalOpen(false);
    // In a real app, we would redirect to /clients here
  };
  
  const handleAddNote = () => {
    toast.success("Note added successfully");
    setIsAddNoteModalOpen(false);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calculate client value
  const clientValue = client.revenue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
  
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className="pt-16 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="py-6">
          {/* Back button */}
          <div className="mb-6">
            <Link 
              to="/clients" 
              className="flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              <span>Back to Clients</span>
            </Link>
          </div>
          
          {/* Client header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex items-center">
              <div 
                className="w-16 h-16 rounded-full bg-crm-yellow flex items-center justify-center text-2xl font-bold mr-4"
              >
                {client.logo}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{client.name}</h1>
                <p className="text-gray-600">{client.industry}</p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <Badge variant="outline" className="bg-crm-yellow-light text-crm-yellow border-crm-yellow">
                {client.status}
              </Badge>
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Edit client"
              >
                <Edit size={16} />
              </button>
              <button 
                onClick={() => setIsDeleteModalOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Delete client"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
          
          {/* Client content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Client info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Mail size={16} className="text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href={`mailto:${client.email}`} className="text-crm-yellow hover:underline">
                        {client.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone size={16} className="text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a href={`tel:${client.phone}`} className="hover:underline">
                        {client.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin size={16} className="text-gray-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p>123 Business St</p>
                      <p>Suite 456</p>
                      <p>New York, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <h2 className="text-lg font-semibold mb-4">Client Details</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Client Since</p>
                    <p>{formatDate(client.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Primary Contact</p>
                    <p>{client.contact}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Client Value</p>
                    <p className="font-semibold">{clientValue}</p>
                  </div>
                </div>
              </div>
              
              <div className="card">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Tags</h2>
                  <button className="text-xs text-crm-yellow hover:underline">
                    Manage Tags
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{client.industry}</Badge>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">VIP</Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Enterprise</Badge>
                </div>
              </div>
            </div>
            
            {/* Right column - Tabs content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full mb-6 bg-gray-100">
                  <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                  <TabsTrigger value="tasks" className="flex-1">Tasks ({clientTasks.length})</TabsTrigger>
                  <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
                  <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  {/* Activity summary card */}
                  <div className="card">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Activity Summary</h2>
                      <span className="text-xs text-gray-500">Last 30 days</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="p-4 border border-gray-100 rounded-lg text-center">
                        <p className="text-2xl font-bold text-crm-yellow">3</p>
                        <p className="text-sm text-gray-600">Meetings</p>
                      </div>
                      <div className="p-4 border border-gray-100 rounded-lg text-center">
                        <p className="text-2xl font-bold text-crm-yellow">12</p>
                        <p className="text-sm text-gray-600">Emails</p>
                      </div>
                      <div className="p-4 border border-gray-100 rounded-lg text-center">
                        <p className="text-2xl font-bold text-crm-yellow">5</p>
                        <p className="text-sm text-gray-600">Tasks</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notes card */}
                  <div className="card">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Notes</h2>
                      <button 
                        onClick={() => setIsAddNoteModalOpen(true)}
                        className="flex items-center text-xs text-crm-yellow hover:underline"
                      >
                        <PlusCircle size={14} className="mr-1" />
                        Add Note
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border-b border-gray-100 pb-4">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-medium">Client Meeting Notes</h3>
                          <span className="text-xs text-gray-500">March 15, 2025</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Met with {client.contact} to discuss the upcoming project timeline. They expressed 
                          interest in additional services that we should follow up on next month.
                        </p>
                      </div>
                      
                      <div className="border-b border-gray-100 pb-4">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-medium">Contract Renewal Discussion</h3>
                          <span className="text-xs text-gray-500">February 28, 2025</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Discussed contract renewal terms. Client is considering the premium package 
                          upgrade. Need to send a formal proposal by next week.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Upcoming activities */}
                  <div className="card">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Upcoming Activities</h2>
                      <a href="#" className="text-xs text-crm-yellow hover:underline">View Calendar</a>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="bg-crm-yellow-light p-2 rounded mr-3">
                          <Calendar size={16} className="text-crm-yellow" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">Quarterly Review Meeting</h3>
                            <Badge className="ml-2 bg-blue-100 text-blue-800">Meeting</Badge>
                          </div>
                          <p className="text-sm text-gray-500">April 12, 2025 at 10:00 AM</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Virtual meeting to review Q1 performance and discuss Q2 goals.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="bg-crm-yellow-light p-2 rounded mr-3">
                          <CheckCircle size={16} className="text-crm-yellow" />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">Contract Renewal Deadline</h3>
                            <Badge className="ml-2 bg-red-100 text-red-800">Deadline</Badge>
                          </div>
                          <p className="text-sm text-gray-500">April 30, 2025</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Current contract expires. New proposal must be signed by this date.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="tasks" className="space-y-6">
                  <div className="card">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Client Tasks</h2>
                      <button className="flex items-center text-xs text-crm-yellow hover:underline">
                        <PlusCircle size={14} className="mr-1" />
                        Add Task
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {clientTasks.length > 0 ? (
                        clientTasks.map((task) => (
                          <div key={task.id} className="border-b border-gray-100 pb-4 last:border-0">
                            <div className="flex justify-between mb-1">
                              <div className="flex items-center">
                                <h3 className="font-medium">{task.title}</h3>
                                <Badge 
                                  className={`ml-2 ${
                                    task.priority === "High" 
                                      ? "bg-red-100 text-red-800" 
                                      : task.priority === "Medium"
                                      ? "bg-crm-yellow-light text-crm-yellow" 
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {task.priority}
                                </Badge>
                              </div>
                              <Badge 
                                className={`${
                                  task.status === "Completed" 
                                    ? "bg-green-100 text-green-800" 
                                    : task.status === "In Progress"
                                    ? "bg-blue-100 text-blue-800" 
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {task.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm">{task.description}</p>
                            <div className="flex justify-between mt-2 text-xs text-gray-500">
                              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                              <span>Assigned to: {task.assignedTo}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No tasks found for this client</p>
                          <button className="btn-primary mt-4">Create First Task</button>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-6">
                  <div className="card">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">Documents</h2>
                      <button className="flex items-center text-xs text-crm-yellow hover:underline">
                        <PlusCircle size={14} className="mr-1" />
                        Upload Document
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center p-3 border border-gray-100 rounded-lg">
                        <div className="bg-gray-100 p-2 rounded mr-3">
                          <FileText size={20} className="text-gray-500" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">Client Contract 2025.pdf</h3>
                          <p className="text-xs text-gray-500">Added March 1, 2025</p>
                        </div>
                        <button className="text-crm-yellow hover:underline text-sm">Download</button>
                      </div>
                      
                      <div className="flex items-center p-3 border border-gray-100 rounded-lg">
                        <div className="bg-gray-100 p-2 rounded mr-3">
                          <FileText size={20} className="text-gray-500" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">Quarterly Report Q1 2025.pdf</h3>
                          <p className="text-xs text-gray-500">Added April 2, 2025</p>
                        </div>
                        <button className="text-crm-yellow hover:underline text-sm">Download</button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="space-y-6">
                  <div className="card">
                    <h2 className="text-lg font-semibold mb-4">Activity History</h2>
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-1.5 top-1 bottom-0 w-0.5 bg-gray-200"></div>
                      
                      <div className="space-y-6">
                        <div className="relative pl-8">
                          <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-crm-yellow"></div>
                          <div className="flex justify-between">
                            <h3 className="font-medium">Contract Updated</h3>
                            <span className="text-xs text-gray-500">April 3, 2025</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Contract was updated to include additional services.
                          </p>
                        </div>
                        
                        <div className="relative pl-8">
                          <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-crm-yellow"></div>
                          <div className="flex justify-between">
                            <h3 className="font-medium">Meeting Completed</h3>
                            <span className="text-xs text-gray-500">March 15, 2025</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Quarterly review meeting with client stakeholders.
                          </p>
                        </div>
                        
                        <div className="relative pl-8">
                          <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-crm-yellow"></div>
                          <div className="flex justify-between">
                            <h3 className="font-medium">Email Campaign Sent</h3>
                            <span className="text-xs text-gray-500">February 28, 2025</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Promotional email sent to client contacts about new services.
                          </p>
                        </div>
                        
                        <div className="relative pl-8">
                          <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-crm-yellow"></div>
                          <div className="flex justify-between">
                            <h3 className="font-medium">Payment Received</h3>
                            <span className="text-xs text-gray-500">January 15, 2025</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Invoice #2025-001 payment received.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      {/* Edit Client Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Client Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={client.name} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Industry</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue={client.industry} 
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option value="Active" selected={client.status === "Active"}>Active</option>
                  <option value="Inactive" selected={client.status === "Inactive"}>Inactive</option>
                  <option value="Lead" selected={client.status === "Lead"}>Lead</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Primary Contact</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={client.contact} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue={client.email} 
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Phone</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue={client.phone} 
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm">
                Cancel
              </button>
            </DialogClose>
            <button 
              onClick={handleEdit} 
              className="bg-crm-yellow text-black px-4 py-2 rounded-md text-sm font-medium"
            >
              Save Changes
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Client Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Client</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete client "{client.name}"? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm">
                Cancel
              </button>
            </DialogClose>
            <button 
              onClick={handleDelete} 
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Delete Client
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Note Modal */}
      <Dialog open={isAddNoteModalOpen} onOpenChange={setIsAddNoteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Note title" 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Content</label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 rounded-md min-h-[100px]"
                placeholder="Enter note content here..." 
              ></textarea>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm">
                Cancel
              </button>
            </DialogClose>
            <button 
              onClick={handleAddNote} 
              className="bg-crm-yellow text-black px-4 py-2 rounded-md text-sm font-medium"
            >
              Add Note
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <style>
        {`
          .card {
            @apply bg-white p-6 rounded-lg border border-gray-100 shadow-sm;
          }
          
          .btn-primary {
            @apply bg-crm-yellow text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-crm-yellow/80 transition-colors;
          }
        `}
      </style>
    </div>
  );
};

export default ClientDetails;
