import { useState, useCallback, useMemo } from "react";
import { Search, Filter, PlusCircle, CheckCircle, Clock, Calendar, ChevronRight, MoreHorizontal, Edit, Trash } from "lucide-react";
import { tasks, clients } from "../utils/mockData";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { toast } from "@/lib/toast";
import { useNavigate } from "react-router-dom";

const TasksSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<any>(null);
  
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    clientId: "",
    assignedTo: ""
  });
  
  const [editTask, setEditTask] = useState({
    id: 0,
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    clientId: 0,
    assignedTo: "",
    status: "Pending"
  });
  
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filterPriority !== "all" && task.priority.toLowerCase() !== filterPriority.toLowerCase()) {
        return false;
      }
      
      if (filterStatus !== "all" && task.status.toLowerCase() !== filterStatus.toLowerCase()) {
        return false;
      }
      
      return task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             task.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, filterPriority, filterStatus]);
  
  const pendingTasks = useMemo(() => filteredTasks.filter(task => task.status === "Pending"), [filteredTasks]);
  const inProgressTasks = useMemo(() => filteredTasks.filter(task => task.status === "In Progress"), [filteredTasks]);
  const completedTasks = useMemo(() => filteredTasks.filter(task => task.status === "Completed"), [filteredTasks]);
  
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }, []);
  
  const getDueDateStatus = useCallback((dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    
    if (due < now) {
      return "overdue";
    } else {
      const diffTime = Math.abs(due.getTime() - now.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        return "soon";
      } else {
        return "normal";
      }
    }
  }, []);
  
  const getClientName = useCallback((clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : "Unknown Client";
  }, []);
  
  const handleTaskClick = useCallback((task: any) => {
    setCurrentTask(task);
    setIsTaskDetailOpen(true);
  }, []);
  
  const handleAddTask = useCallback(() => {
    toast.success("Task added successfully", {
      description: "New task has been created"
    });
    setIsAddTaskOpen(false);
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
      clientId: "",
      assignedTo: ""
    });
    
    const shouldNavigate = window.confirm("Task added successfully. View all tasks?");
    if (shouldNavigate) {
      navigate("/tasks");
    }
  }, [navigate]);
  
  const handleCompleteTask = useCallback((taskId: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    const taskToComplete = tasks.find(task => task.id === taskId);
    
    if (taskToComplete) {
      toast.success("Task marked as complete", {
        description: `Task "${taskToComplete.title}" has been completed`
      });
      
      setTimeout(() => {
        const shouldNavigate = window.confirm("Task completed. Go to Completed tasks section?");
        if (shouldNavigate) {
          document.querySelector('.completed-section')?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);
  
  const handleEditTask = useCallback((taskId: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    const taskToEdit = tasks.find(task => task.id === taskId);
    
    if (taskToEdit) {
      setSelectedTask(taskId);
      setEditTask({
        id: taskToEdit.id,
        title: taskToEdit.title,
        description: taskToEdit.description,
        priority: taskToEdit.priority,
        dueDate: taskToEdit.dueDate,
        clientId: taskToEdit.clientId,
        assignedTo: taskToEdit.assignedTo,
        status: taskToEdit.status
      });
      
      setIsEditTaskOpen(true);
    }
  }, []);
  
  const handleDeleteTask = useCallback((taskId: number, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    setTaskToDelete(taskId);
    setIsDeleteConfirmOpen(true);
  }, []);
  
  const confirmDeleteTask = useCallback(() => {
    if (taskToDelete) {
      toast.success(`Task deleted successfully`, {
        description: `Task ID: ${taskToDelete} has been removed`
      });
      
      setIsDeleteConfirmOpen(false);
      setTaskToDelete(null);
      
      setTimeout(() => {
        const shouldNavigate = window.confirm("Task deleted. Return to dashboard?");
        if (shouldNavigate) {
          navigate("/");
        }
      }, 500);
    }
  }, [taskToDelete, navigate]);
  
  const handleSaveEditTask = useCallback(() => {
    toast.success(`Task updated successfully`, {
      description: `Task "${editTask.title}" has been updated`
    });
    
    setIsEditTaskOpen(false);
    setSelectedTask(null);
    
    setTimeout(() => {
      const shouldNavigate = window.confirm("Task updated. View all tasks?");
      if (shouldNavigate) {
        window.location.reload();
      }
    }, 500);
  }, [editTask]);
  
  const updateNewTask = useCallback((field: string, value: string) => {
    setNewTask(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);
  
  const updateEditTask = useCallback((field: string, value: string | number) => {
    setEditTask(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);
  
  const renderTaskDetailDialog = () => (
    <Dialog open={isTaskDetailOpen} onOpenChange={setIsTaskDetailOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{currentTask?.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="border-b pb-3">
            <h3 className="font-semibold mb-1">Description</h3>
            <p className="text-sm">{currentTask?.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-1">Priority</h3>
              <span className={`badge ${
                currentTask?.priority === "High" 
                  ? "bg-red-100 text-red-800" 
                  : currentTask?.priority === "Medium"
                  ? "bg-crm-yellow-light text-crm-yellow" 
                  : "bg-blue-100 text-blue-800"
              }`}>
                {currentTask?.priority}
              </span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Status</h3>
              <span className={`badge ${
                currentTask?.status === "Pending" 
                  ? "bg-crm-yellow-light text-crm-yellow" 
                  : currentTask?.status === "In Progress"
                  ? "bg-blue-100 text-blue-800" 
                  : "bg-green-100 text-green-800"
              }`}>
                {currentTask?.status}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-1">Due Date</h3>
              <span className="text-sm flex items-center">
                <Calendar size={14} className="mr-1" />
                {currentTask ? formatDate(currentTask.dueDate) : ""}
              </span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Client</h3>
              <span className="text-sm">
                {currentTask ? getClientName(currentTask.clientId) : ""}
              </span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-1">Assigned To</h3>
            <span className="text-sm">{currentTask?.assignedTo}</span>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            {currentTask?.status !== "Completed" && (
              <button 
                onClick={() => {
                  handleCompleteTask(currentTask?.id);
                  setIsTaskDetailOpen(false);
                }} 
                className="btn-success"
              >
                <CheckCircle size={16} className="mr-1" />
                Mark Complete
              </button>
            )}
            <button 
              onClick={() => {
                setIsTaskDetailOpen(false);
                handleEditTask(currentTask?.id);
              }} 
              className="btn-secondary"
            >
              <Edit size={16} className="mr-1" />
              Edit
            </button>
          </div>
          <DialogClose asChild>
            <button className="btn-primary">Close</button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
          <DialogTrigger asChild>
            <button className="btn-primary flex items-center">
              <PlusCircle size={18} className="mr-2" />
              Add Task
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
      
      <Dialog open={isEditTaskOpen} onOpenChange={setIsEditTaskOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label htmlFor="edit-title" className="form-label">Task Title</label>
              <input 
                id="edit-title" 
                type="text" 
                className="form-input" 
                placeholder="Enter task title"
                value={editTask.title}
                onChange={(e) => updateEditTask("title", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="edit-description" className="form-label">Description</label>
              <textarea 
                id="edit-description" 
                className="form-input min-h-[100px]" 
                placeholder="Enter task description"
                value={editTask.description}
                onChange={(e) => updateEditTask("description", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="edit-priority" className="form-label">Priority</label>
                <select 
                  id="edit-priority" 
                  className="form-input"
                  value={editTask.priority}
                  onChange={(e) => updateEditTask("priority", e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label htmlFor="edit-dueDate" className="form-label">Due Date</label>
                <input 
                  id="edit-dueDate" 
                  type="datetime-local" 
                  className="form-input"
                  value={editTask.dueDate}
                  onChange={(e) => updateEditTask("dueDate", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="edit-client" className="form-label">Client</label>
                <select 
                  id="edit-client" 
                  className="form-input"
                  value={editTask.clientId}
                  onChange={(e) => updateEditTask("clientId", Number(e.target.value))}
                >
                  <option value="">Select Client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="edit-assignedTo" className="form-label">Assigned To</label>
                <input 
                  id="edit-assignedTo" 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter assignee name"
                  value={editTask.assignedTo}
                  onChange={(e) => updateEditTask("assignedTo", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="edit-status" className="form-label">Status</label>
              <select 
                id="edit-status" 
                className="form-input"
                value={editTask.status}
                onChange={(e) => updateEditTask("status", e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button className="btn-secondary">Cancel</button>
            </DialogClose>
            <button onClick={handleSaveEditTask} className="btn-primary">Save Changes</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete this task? This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <button className="btn-secondary">Cancel</button>
            </DialogClose>
            <button onClick={confirmDeleteTask} className="btn-destructive">Delete</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            className="form-input pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-crm-light-gray bg-white hover:bg-crm-light-gray transition-colors">
              <Filter size={18} />
              <span>Priority</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem 
                className={`${filterPriority === "all" ? "bg-crm-yellow-light" : ""}`}
                onClick={() => setFilterPriority("all")}
              >
                All Priorities
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`${filterPriority === "high" ? "bg-crm-yellow-light" : ""}`}
                onClick={() => setFilterPriority("high")}
              >
                High
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`${filterPriority === "medium" ? "bg-crm-yellow-light" : ""}`}
                onClick={() => setFilterPriority("medium")}
              >
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`${filterPriority === "low" ? "bg-crm-yellow-light" : ""}`}
                onClick={() => setFilterPriority("low")}
              >
                Low
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-crm-light-gray bg-white hover:bg-crm-light-gray transition-colors">
              <Filter size={18} />
              <span>Status</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem 
                className={`${filterStatus === "all" ? "bg-crm-yellow-light" : ""}`}
                onClick={() => setFilterStatus("all")}
              >
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`${filterStatus === "pending" ? "bg-crm-yellow-light" : ""}`}
                onClick={() => setFilterStatus("pending")}
              >
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`${filterStatus === "in progress" ? "bg-crm-yellow-light" : ""}`}
                onClick={() => setFilterStatus("in progress")}
              >
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={`${filterStatus === "completed" ? "bg-crm-yellow-light" : ""}`}
                onClick={() => setFilterStatus("completed")}
              >
                Completed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <span className="inline-block w-3 h-3 bg-crm-yellow rounded-full mr-2"></span>
              Pending
              <span className="ml-2 text-sm text-gray-500">({pendingTasks.length})</span>
            </h3>
          </div>
          <div className="space-y-3">
            {pendingTasks.length > 0 ? (
              pendingTasks.map(task => (
                <div 
                  key={task.id} 
                  className="border border-crm-light-gray rounded-lg p-3 hover:shadow-sm transition-all cursor-pointer bg-white"
                  onClick={() => handleTaskClick(task)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{task.title}</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-1 rounded-full hover:bg-crm-light-gray transition-colors" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={14} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white z-50">
                        <DropdownMenuItem onClick={(e) => handleCompleteTask(task.id, e)}>
                          <CheckCircle size={14} className="mr-2" />
                          Mark Complete
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleEditTask(task.id, e)}>
                          <Edit size={14} className="mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleDeleteTask(task.id, e)}>
                          <Trash size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {task.description.length > 75 
                      ? task.description.substring(0, 75) + "..." 
                      : task.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className={`badge ${
                      task.priority === "High" 
                        ? "bg-red-100 text-red-800" 
                        : task.priority === "Medium"
                        ? "bg-crm-yellow-light text-crm-yellow" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    <span className="block">Client: {getClientName(task.clientId)}</span>
                    <span>Assigned to: {task.assignedTo}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No pending tasks</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              In Progress
              <span className="ml-2 text-sm text-gray-500">({inProgressTasks.length})</span>
            </h3>
          </div>
          <div className="space-y-3">
            {inProgressTasks.length > 0 ? (
              inProgressTasks.map(task => (
                <div 
                  key={task.id} 
                  className="border border-crm-light-gray rounded-lg p-3 hover:shadow-sm transition-all cursor-pointer bg-white"
                  onClick={() => handleTaskClick(task)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{task.title}</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-1 rounded-full hover:bg-crm-light-gray transition-colors" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={14} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white z-50">
                        <DropdownMenuItem onClick={(e) => handleCompleteTask(task.id, e)}>
                          <CheckCircle size={14} className="mr-2" />
                          Mark Complete
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleEditTask(task.id, e)}>
                          <Edit size={14} className="mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleDeleteTask(task.id, e)}>
                          <Trash size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {task.description.length > 75 
                      ? task.description.substring(0, 75) + "..." 
                      : task.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className={`badge ${
                      task.priority === "High" 
                        ? "bg-red-100 text-red-800" 
                        : task.priority === "Medium"
                        ? "bg-crm-yellow-light text-crm-yellow" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {formatDate(task.dueDate)}
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    <span className="block">Client: {getClientName(task.clientId)}</span>
                    <span>Assigned to: {task.assignedTo}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No tasks in progress</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="card completed-section">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Completed
              <span className="ml-2 text-sm text-gray-500">({completedTasks.length})</span>
            </h3>
          </div>
          <div className="space-y-3">
            {completedTasks.length > 0 ? (
              completedTasks.map(task => (
                <div 
                  key={task.id} 
                  className="border border-crm-light-gray rounded-lg p-3 hover:shadow-sm transition-all cursor-pointer bg-white"
                  onClick={() => handleTaskClick(task)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium line-through text-gray-500">{task.title}</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-1 rounded-full hover:bg-crm-light-gray transition-colors" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={14} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white z-50">
                        <DropdownMenuItem onClick={(e) => handleEditTask(task.id, e)}>
                          <Edit size={14} className="mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => handleDeleteTask(task.id, e)}>
                          <Trash size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    {task.description.length > 75 
                      ? task.description.substring(0, 75) + "..." 
                      : task.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="badge bg-green-100 text-green-800">
                      Completed
                    </span>
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {task.completedAt ? formatDate(task.completedAt) : "N/A"}
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-gray-400">
                    <span className="block">Client: {getClientName(task.clientId)}</span>
                    <span>Completed by: {task.assignedTo}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No completed tasks</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {renderTaskDetailDialog()}
    </div>
  );
};

export default TasksSection;
