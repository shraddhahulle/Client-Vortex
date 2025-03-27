
// Mock data for the CRM application

// Client data
export const clients = [
  {
    id: 1,
    name: "Acme Corporation",
    logo: "A",
    industry: "Technology",
    status: "Active",
    contact: "John Smith",
    email: "john@acme.com",
    phone: "(555) 123-4567",
    revenue: 120000,
    address: "123 Business Ave, Tech City",
    lastActivity: "2023-07-15T10:30:00",
    createdAt: "2022-01-10T09:00:00"
  },
  {
    id: 2,
    name: "Globex Solutions",
    logo: "G",
    industry: "Finance",
    status: "Active",
    contact: "Jane Doe",
    email: "jane@globex.com",
    phone: "(555) 987-6543",
    revenue: 245000,
    address: "456 Finance St, Money City",
    lastActivity: "2023-07-20T14:15:00",
    createdAt: "2022-02-15T11:00:00"
  },
  {
    id: 3,
    name: "Initech Inc",
    logo: "I",
    industry: "Manufacturing",
    status: "Inactive",
    contact: "Michael Johnson",
    email: "michael@initech.com",
    phone: "(555) 567-8901",
    revenue: 89000,
    address: "789 Factory Rd, Industry Town",
    lastActivity: "2023-06-05T09:45:00",
    createdAt: "2022-03-22T10:30:00"
  },
  {
    id: 4,
    name: "Umbrella Corp",
    logo: "U",
    industry: "Pharmaceutical",
    status: "Active",
    contact: "Sarah Williams",
    email: "sarah@umbrella.com",
    phone: "(555) 234-5678",
    revenue: 350000,
    address: "101 Health Blvd, Medicine City",
    lastActivity: "2023-07-18T16:20:00",
    createdAt: "2022-04-05T13:45:00"
  },
  {
    id: 5,
    name: "Stark Industries",
    logo: "S",
    industry: "Defense",
    status: "Active",
    contact: "Tony Clark",
    email: "tony@stark.com",
    phone: "(555) 345-6789",
    revenue: 500000,
    address: "202 Innovation Way, Future City",
    lastActivity: "2023-07-21T11:10:00",
    createdAt: "2022-05-12T15:20:00"
  }
];

// Task data
export const tasks = [
  {
    id: 1,
    title: "Follow up with Acme Corporation",
    description: "Discuss the new project proposal and timeline",
    status: "Completed",
    priority: "High",
    dueDate: "2023-07-15T17:00:00",
    assignedTo: "Alice Johnson",
    clientId: 1,
    createdAt: "2023-07-10T09:30:00",
    completedAt: "2023-07-15T16:45:00"
  },
  {
    id: 2,
    title: "Prepare quarterly report for Globex",
    description: "Compile Q2 performance metrics and growth analysis",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2023-07-25T12:00:00",
    assignedTo: "Bob Smith",
    clientId: 2,
    createdAt: "2023-07-12T11:15:00",
    completedAt: null
  },
  {
    id: 3,
    title: "Schedule meeting with Initech",
    description: "Discuss contract renewal and new terms",
    status: "Pending",
    priority: "Low",
    dueDate: "2023-07-30T10:00:00",
    assignedTo: "Charlie Brown",
    clientId: 3,
    createdAt: "2023-07-14T14:45:00",
    completedAt: null
  },
  {
    id: 4,
    title: "Product demo for Umbrella Corp",
    description: "Showcase new features and collect feedback",
    status: "In Progress",
    priority: "High",
    dueDate: "2023-07-22T15:30:00",
    assignedTo: "Diana Prince",
    clientId: 4,
    createdAt: "2023-07-15T10:00:00",
    completedAt: null
  },
  {
    id: 5,
    title: "Contract review with Stark Industries",
    description: "Legal team to review terms and conditions",
    status: "Pending",
    priority: "Medium",
    dueDate: "2023-07-28T11:00:00",
    assignedTo: "Edward Blake",
    clientId: 5,
    createdAt: "2023-07-16T09:20:00",
    completedAt: null
  },
  {
    id: 6,
    title: "Send proposal to Acme Corporation",
    description: "Finalize pricing and service details",
    status: "Completed",
    priority: "High",
    dueDate: "2023-07-05T16:00:00",
    assignedTo: "Alice Johnson",
    clientId: 1,
    createdAt: "2023-07-01T13:30:00",
    completedAt: "2023-07-05T15:45:00"
  },
  {
    id: 7,
    title: "Customer satisfaction survey for Globex",
    description: "Send out quarterly satisfaction survey to key stakeholders",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2023-07-23T14:00:00",
    assignedTo: "Bob Smith",
    clientId: 2,
    createdAt: "2023-07-17T11:00:00",
    completedAt: null
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
  { month: "Jan", count: 2 },
  { month: "Feb", count: 3 },
  { month: "Mar", count: 1 },
  { month: "Apr", count: 4 },
  { month: "May", count: 2 },
  { month: "Jun", count: 5 },
  { month: "Jul", count: 3 }
];

// Recent activities
export const recentActivities = [
  {
    id: 1,
    type: "email",
    description: "Sent follow-up email to Acme Corporation",
    timestamp: "2023-07-21T11:30:00",
    user: "Alice Johnson"
  },
  {
    id: 2,
    type: "meeting",
    description: "Virtual meeting with Globex Solutions team",
    timestamp: "2023-07-20T15:00:00",
    user: "Bob Smith"
  },
  {
    id: 3,
    type: "call",
    description: "Phone call with Stark Industries about new contract",
    timestamp: "2023-07-19T14:20:00",
    user: "Charlie Brown"
  },
  {
    id: 4,
    type: "task",
    description: "Completed product demo preparation for Umbrella Corp",
    timestamp: "2023-07-18T10:45:00",
    user: "Diana Prince"
  },
  {
    id: 5,
    type: "note",
    description: "Added notes from Initech Inc meeting about requirements",
    timestamp: "2023-07-17T16:15:00",
    user: "Edward Blake"
  }
];

// User data
export const currentUser = {
  id: 1,
  name: "Alice Johnson",
  email: "alice@nexuscrm.com",
  role: "Sales Manager",
  avatar: "AJ",
  department: "Sales",
  phone: "(555) 123-4567",
  joinDate: "2022-03-15T09:00:00"
};

// Notifications
export const notifications = [
  {
    id: 1,
    title: "Task Assigned",
    description: "You've been assigned a new task: Client follow-up",
    timestamp: "2023-07-21T09:45:00",
    read: false
  },
  {
    id: 2,
    title: "Meeting Reminder",
    description: "Upcoming meeting with Globex in 30 minutes",
    timestamp: "2023-07-20T14:30:00",
    read: true
  },
  {
    id: 3,
    title: "Contract Approved",
    description: "Stark Industries contract has been approved",
    timestamp: "2023-07-19T16:15:00",
    read: false
  },
  {
    id: 4,
    title: "Report Ready",
    description: "Monthly analytics report is ready for review",
    timestamp: "2023-07-18T11:00:00",
    read: true
  }
];

// Dashboard stats
export const dashboardStats = {
  totalClients: 42,
  activeClients: 35,
  tasksCompleted: 128,
  tasksPending: 23,
  totalRevenue: 1304000,
  revenueGrowth: 12.5,
  leadConversionRate: 24.8,
  avgResponseTime: 3.2 // hours
};
