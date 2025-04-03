import { useState } from "react";
import { Filter, PlusCircle, ArrowUpDown, MoreHorizontal, Phone, Mail, Trash, Edit, Eye } from "lucide-react";
import { clients as initialClients } from "../utils/mockData";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/lib/toast";
import { AddClientDialog } from "./AddClientDialog";
import { Link } from "react-router-dom";

const ClientsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [clients, setClients] = useState(initialClients);
  const clientsPerPage = 5;
  
  // Handle adding a new client
  const handleClientAdded = (newClient: any) => {
    setClients(prevClients => [newClient, ...prevClients]);
    // After adding, make sure we're on the first page to see the new client
    setCurrentPage(1);
  };
  
  // Filter and sort clients
  const filteredClients = clients.filter(client => {
    if (filterStatus !== "all" && client.status.toLowerCase() !== filterStatus.toLowerCase()) {
      return false;
    }
    
    return client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           client.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
           client.industry.toLowerCase().includes(searchTerm.toLowerCase());
  }).sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortField === "industry") {
      return sortDirection === "asc" 
        ? a.industry.localeCompare(b.industry) 
        : b.industry.localeCompare(a.industry);
    } else if (sortField === "revenue") {
      return sortDirection === "asc" 
        ? a.revenue - b.revenue 
        : b.revenue - a.revenue;
    } else {
      return 0;
    }
  });
  
  // Pagination
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  
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
  
  // Handle sort
  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  // Add new client
  const handleAddClient = () => {
    setIsAddClientModalOpen(true);
  };
  
  // Handle view client - updated to navigate to client details page
  const handleViewClient = (clientId: number) => {
    // Now handled by the Link component in the dropdown menu
    const client = clients.find(c => c.id === clientId);
    if (client) {
      toast.info(`Viewing details for ${client.name}`);
      // Navigation is handled by the Link component
    }
  };
  
  // Handle edit client
  const handleEditClient = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
      setIsEditModalOpen(true);
      toast.info(`Editing ${client.name}`);
    }
  };
  
  // Handle delete client
  const handleDeleteClient = (clientId: number) => {
    const clientToDelete = clients.find(c => c.id === clientId);
    if (clientToDelete) {
      // Show confirmation dialog in a real app, but for now we'll just delete
      setClients(prevClients => prevClients.filter(client => client.id !== clientId));
      toast.success(`${clientToDelete.name} has been deleted`);
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Client Management</h1>
        <button 
          onClick={handleAddClient}
          className="btn-primary flex items-center"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Client
        </button>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search clients..."
            className="form-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-crm-light-gray bg-white hover:bg-crm-light-gray transition-colors">
                <Filter size={18} />
                <span>Filter</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2 text-sm font-medium">Filter by Status</div>
                <DropdownMenuItem 
                  className={`${filterStatus === "all" ? "bg-crm-yellow-light" : ""}`}
                  onClick={() => setFilterStatus("all")}
                >
                  All
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`${filterStatus === "active" ? "bg-crm-yellow-light" : ""}`}
                  onClick={() => setFilterStatus("active")}
                >
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className={`${filterStatus === "inactive" ? "bg-crm-yellow-light" : ""}`}
                  onClick={() => setFilterStatus("inactive")}
                >
                  Inactive
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-crm-light-gray bg-white hover:bg-crm-light-gray transition-colors">
              <ArrowUpDown size={18} />
              <span>Sort</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2 text-sm font-medium">Sort by</div>
              <DropdownMenuItem 
                className={`${sortField === "name" ? "bg-crm-yellow-light" : ""}`}
                onClick={() => handleSort("name")}
              >
                Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`${sortField === "industry" ? "bg-crm-yellow-light" : ""}`}
                onClick={() => handleSort("industry")}
              >
                Industry {sortField === "industry" && (sortDirection === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`${sortField === "revenue" ? "bg-crm-yellow-light" : ""}`}
                onClick={() => handleSort("revenue")}
              >
                Revenue {sortField === "revenue" && (sortDirection === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Clients table */}
      <div className="table-container overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="table-header">
              <th className="table-cell text-left">Company</th>
              <th className="table-cell text-left">Contact</th>
              <th className="table-cell text-left">Industry</th>
              <th className="table-cell text-left">Status</th>
              <th className="table-cell text-right">Revenue</th>
              <th className="table-cell text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.length > 0 ? (
              currentClients.map((client) => (
                <tr key={client.id} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className="rounded-full bg-crm-yellow w-8 h-8 flex items-center justify-center font-bold text-black">
                        {client.logo}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">{client.name}</div>
                        <div className="text-xs text-gray-500">Added on {formatDate(client.createdAt)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div>
                      <div>{client.contact}</div>
                      <div className="flex items-center gap-3 mt-1">
                        <a href={`mailto:${client.email}`} className="text-xs text-blue-500 hover:underline flex items-center">
                          <Mail size={12} className="mr-1" />
                          Email
                        </a>
                        <a href={`tel:${client.phone}`} className="text-xs text-blue-500 hover:underline flex items-center">
                          <Phone size={12} className="mr-1" />
                          Call
                        </a>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">{client.industry}</td>
                  <td className="table-cell">
                    <span className={`badge ${
                      client.status === "Active" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="table-cell text-right">{formatCurrency(client.revenue)}</td>
                  <td className="table-cell text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2 rounded-full hover:bg-crm-light-gray transition-colors">
                        <MoreHorizontal size={16} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-md rounded-md z-50">
                        <DropdownMenuItem asChild>
                          <Link 
                            to={`/clients/${client.id}`}
                            className="cursor-pointer hover:bg-gray-100 flex items-center text-blue-600"
                          >
                            <Eye size={14} className="mr-2" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleEditClient(client.id)}
                          className="cursor-pointer hover:bg-gray-100 flex items-center text-amber-600"
                        >
                          <Edit size={14} className="mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteClient(client.id)}
                          className="cursor-pointer hover:bg-gray-100 flex items-center text-red-600"
                        >
                          <Trash size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="table-cell text-center py-8">
                  <p className="text-gray-500">No clients found</p>
                  <button 
                    onClick={handleAddClient}
                    className="btn-primary mt-4 inline-flex items-center"
                  >
                    <PlusCircle size={18} className="mr-2" />
                    Add Client
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {filteredClients.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {Math.min(currentClients.length, clientsPerPage)} of {filteredClients.length} clients
          </div>
          <div className="flex gap-2">
            <button 
              className="btn-secondary" 
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button 
              className="btn-secondary" 
              onClick={goToNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </div>
      )}
      
      {/* Add Client Dialog */}
      <AddClientDialog 
        open={isAddClientModalOpen} 
        onOpenChange={setIsAddClientModalOpen}
        onClientAdded={handleClientAdded}
      />
    </div>
  );
};

export default ClientsSection;
