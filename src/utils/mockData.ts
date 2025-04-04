
// Client data
export const clients = [
  {
    id: 1,
    name: "Acme Corporation",
    contact: "John Smith",
    email: "john@acmecorp.com",
    phone: "(555) 123-4567",
    industry: "Technology",
    status: "Active",
    revenue: 750000,
    createdAt: "2023-01-15",
    lastActivity: "2024-03-28",
    logo: "AC"
  },
  {
    id: 2,
    name: "Global Industries",
    contact: "Sarah Johnson",
    email: "sarah@globalind.com",
    phone: "(555) 234-5678",
    industry: "Manufacturing",
    status: "Active",
    revenue: 1250000,
    createdAt: "2022-09-03",
    lastActivity: "2024-03-25",
    logo: "GI"
  },
  {
    id: 3,
    name: "Summit Financial",
    contact: "Robert Chen",
    email: "robert@summitfin.com",
    phone: "(555) 345-6789",
    industry: "Finance",
    status: "Inactive",
    revenue: 2100000,
    createdAt: "2023-03-21",
    lastActivity: "2024-02-10",
    logo: "SF"
  },
  {
    id: 4,
    name: "Harmony Healthcare",
    contact: "Maria Garcia",
    email: "maria@harmonyhc.com",
    phone: "(555) 456-7890",
    industry: "Healthcare",
    status: "Active",
    revenue: 980000,
    createdAt: "2022-11-08",
    lastActivity: "2024-03-15",
    logo: "HH"
  },
  {
    id: 5,
    name: "Elite Marketing",
    contact: "David Wilson",
    email: "david@elitemark.com",
    phone: "(555) 567-8901",
    industry: "Marketing",
    status: "Active",
    revenue: 650000,
    createdAt: "2023-02-14",
    lastActivity: "2024-03-22",
    logo: "EM"
  }
];

// Task data
export const tasks = [
  {
    id: 1,
    title: "Follow up on proposal",
    description: "Send follow-up email regarding the proposal sent last week",
    status: "Pending",
    priority: "High",
    dueDate: "2024-04-10T15:00:00",
    clientId: 1,
    assignedTo: "John Doe"
  },
  {
    id: 2,
    title: "Schedule product demo",
    description: "Schedule a product demonstration with the client's team",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2024-04-12T13:30:00",
    clientId: 2,
    assignedTo: "Jane Smith"
  },
  {
    id: 3,
    title: "Prepare contract",
    description: "Draft the service contract for new client",
    status: "Completed",
    priority: "High",
    dueDate: "2024-04-01T10:00:00",
    clientId: 3,
    assignedTo: "Robert Johnson"
  },
  {
    id: 4,
    title: "Invoice payment reminder",
    description: "Send a friendly reminder about the outstanding invoice",
    status: "Pending",
    priority: "Medium",
    dueDate: "2024-04-08T09:00:00",
    clientId: 1,
    assignedTo: "John Doe"
  },
  {
    id: 5,
    title: "Quarterly review meeting",
    description: "Prepare and conduct quarterly review meeting with client",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-04-15T14:00:00",
    clientId: 4,
    assignedTo: "Jane Smith"
  }
];

// Recent activities data
export const recentActivities = [
  {
    id: 1,
    type: "email",
    description: "Sent proposal to Acme Corporation",
    timestamp: "2024-04-03T10:23:00",
    user: "John Doe"
  },
  {
    id: 2,
    type: "call",
    description: "Phone call with Global Industries regarding new requirements",
    timestamp: "2024-04-02T15:45:00",
    user: "Jane Smith"
  },
  {
    id: 3,
    type: "meeting",
    description: "Kickoff meeting with Harmony Healthcare",
    timestamp: "2024-04-02T13:00:00",
    user: "Robert Johnson"
  },
  {
    id: 4,
    type: "task",
    description: "Completed contract preparation for Summit Financial",
    timestamp: "2024-04-01T11:30:00",
    user: "Jane Smith"
  },
  {
    id: 5,
    type: "note",
    description: "Added notes from client feedback session with Elite Marketing",
    timestamp: "2024-03-31T16:15:00",
    user: "John Doe"
  },
  {
    id: 6,
    type: "email",
    description: "Sent meeting minutes to Harmony Healthcare",
    timestamp: "2024-03-31T09:20:00",
    user: "Robert Johnson"
  }
];

// Revenue data for charts
export const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
  { month: "Jul", revenue: 72000 }
];

// Task status data for charts
export const taskStatusData = [
  { status: "Completed", count: 12 },
  { status: "In Progress", count: 8 },
  { status: "Pending", count: 5 }
];

// Client acquisition data for charts
export const clientAcquisitionData = [
  { month: "Jan", count: 3 },
  { month: "Feb", count: 2 },
  { month: "Mar", count: 4 },
  { month: "Apr", count: 3 },
  { month: "May", count: 5 },
  { month: "Jun", count: 7 },
  { month: "Jul", count: 4 }
];

// Dashboard stats
export const dashboardStats = {
  totalClients: 24,
  tasksCompleted: 45,
  totalRevenue: 1250000,
  revenueGrowth: 16.8,
  avgResponseTime: 3.2
};

// Current user data
export const currentUser = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  role: "Sales Manager",
  department: "Sales",
  joinDate: "2022-05-15",
  avatar: "JD"
};

// Notifications
export const notifications = [
  {
    id: 1,
    title: "New task assigned",
    description: "You have been assigned a new task: 'Follow up with Acme Corp'",
    timestamp: "2024-04-03T09:30:00",
    read: false
  },
  {
    id: 2,
    title: "Meeting reminder",
    description: "Reminder: Client meeting with Global Industries in 30 minutes",
    timestamp: "2024-04-02T14:30:00",
    read: false
  },
  {
    id: 3,
    title: "Task due soon",
    description: "The task 'Prepare quarterly report' is due tomorrow",
    timestamp: "2024-04-01T16:45:00",
    read: true
  },
  {
    id: 4,
    title: "Comment on task",
    description: "Jane Smith commented on task 'Schedule product demo'",
    timestamp: "2024-03-31T11:20:00",
    read: true
  }
];
