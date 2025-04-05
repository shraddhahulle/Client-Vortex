// Example mock data for the CRM dashboard

export const dashboardStats = {
  totalClients: 24,
  tasksCompleted: 187,
  totalRevenue: 712000,
  revenueGrowth: 18.5,
  avgResponseTime: 2.4
};

// Client Data
export const clients = [
  {
    id: 1,
    name: "Acme Corporation",
    industry: "Technology",
    logo: "AC",
    status: "Active",
    email: "contact@acmecorp.com",
    phone: "555-123-4567",
    address: "123 Tech Lane, San Francisco, CA 94107",
    contactPerson: "John Smith",
    since: "2022-01-15",
    lastActivity: "2025-04-01T15:30:00",
    totalProjects: 8,
    revenue: 125000,
    tasksCompleted: 42,
    contact: "John Smith",
    createdAt: "2022-01-15"
  },
  {
    id: 2,
    name: "Globex Industries",
    industry: "Manufacturing",
    logo: "GI",
    status: "Active",
    email: "info@globex.com",
    phone: "555-987-6543",
    address: "456 Factory Dr, Chicago, IL 60601",
    contactPerson: "Jane Doe",
    since: "2021-03-22",
    lastActivity: "2025-04-03T09:15:00",
    totalProjects: 5,
    revenue: 89500,
    tasksCompleted: 27,
    contact: "Jane Doe",
    createdAt: "2021-03-22"
  },
  {
    id: 3,
    name: "Oceanic Airlines",
    industry: "Transportation",
    logo: "OA",
    status: "Inactive",
    email: "support@oceanic.com",
    phone: "555-456-7890",
    address: "789 Airport Way, Los Angeles, CA 90045",
    contactPerson: "David Johnson",
    since: "2023-06-10",
    lastActivity: "2025-03-28T11:45:00",
    totalProjects: 3,
    revenue: 67000,
    tasksCompleted: 14,
    contact: "David Johnson",
    createdAt: "2023-06-10"
  },
  {
    id: 4,
    name: "Stark Enterprises",
    industry: "Energy",
    logo: "SE",
    status: "Lead",
    email: "info@stark.com",
    phone: "555-789-0123",
    address: "1 Energy Plaza, New York, NY 10001",
    contactPerson: "Tony Stark",
    since: "2024-02-05",
    lastActivity: "2025-04-02T14:00:00",
    totalProjects: 2,
    revenue: 250000,
    tasksCompleted: 8,
    contact: "Tony Stark",
    createdAt: "2024-02-05"
  },
  {
    id: 5,
    name: "Wayne Enterprises",
    industry: "Technology",
    logo: "WE",
    status: "Active",
    email: "contact@wayne.com",
    phone: "555-234-5678",
    address: "1007 Mountain Dr, Gotham, NJ 07307",
    contactPerson: "Bruce Wayne",
    since: "2021-11-18",
    lastActivity: "2025-04-01T10:30:00",
    totalProjects: 7,
    revenue: 175000,
    tasksCompleted: 36,
    contact: "Bruce Wayne",
    createdAt: "2021-11-18"
  }
];

// Tasks Data
export const tasks = [
  {
    id: 1,
    title: "Review proposal",
    description: "Review and approve the new project proposal for Acme Corp.",
    status: "Completed",
    priority: "High",
    dueDate: "2025-04-01T17:00:00",
    assignedTo: "Alex Johnson",
    clientId: 1
  },
  {
    id: 2,
    title: "Send invoice",
    description: "Send the monthly invoice to Globex Industries.",
    status: "Pending",
    priority: "Medium",
    dueDate: "2025-04-07T12:00:00",
    assignedTo: "Sarah Williams",
    clientId: 2
  },
  {
    id: 3,
    title: "Client meeting",
    description: "Discuss new requirements with Oceanic Airlines.",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2025-04-06T14:30:00",
    assignedTo: "Michael Brown",
    clientId: 3
  },
  {
    id: 4,
    title: "Contract renewal",
    description: "Prepare contract renewal documents for Stark Enterprises.",
    status: "Pending",
    priority: "High",
    dueDate: "2025-04-15T09:00:00",
    assignedTo: "Emily Davis",
    clientId: 4
  },
  {
    id: 5,
    title: "Follow-up call",
    description: "Schedule a follow-up call with Wayne Enterprises to discuss project progress.",
    status: "In Progress",
    priority: "Low",
    dueDate: "2025-04-08T11:00:00",
    assignedTo: "Alex Johnson",
    clientId: 5
  },
  {
    id: 6,
    title: "Project update",
    description: "Send weekly project update to Acme Corporation.",
    status: "Pending",
    priority: "Medium",
    dueDate: "2025-04-05T16:00:00",
    assignedTo: "Sarah Williams",
    clientId: 1
  },
  {
    id: 7,
    title: "Feedback review",
    description: "Review feedback from Globex Industries on the latest delivery.",
    status: "Completed",
    priority: "High",
    dueDate: "2025-04-02T13:00:00",
    assignedTo: "Michael Brown",
    clientId: 2
  }
];

// Client Tasks - specific tasks associated with clients
export const clientTasks = [
  {
    id: 101,
    title: "Initial consultation",
    description: "Schedule initial consultation to understand client needs",
    status: "Completed",
    priority: "High",
    dueDate: "2025-03-28T10:00:00",
    assignedTo: "Alex Johnson",
    clientId: 1
  },
  {
    id: 102,
    title: "Proposal development",
    description: "Create comprehensive proposal based on client requirements",
    status: "Completed",
    priority: "High",
    dueDate: "2025-03-30T14:00:00",
    assignedTo: "Sarah Williams",
    clientId: 1
  },
  {
    id: 103,
    title: "Contract signing",
    description: "Finalize and sign contract with Acme Corporation",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2025-04-08T11:00:00",
    assignedTo: "Michael Brown",
    clientId: 1
  },
  {
    id: 104,
    title: "Project kickoff",
    description: "Schedule and conduct project kickoff meeting",
    status: "Pending",
    priority: "Medium",
    dueDate: "2025-04-12T09:30:00",
    assignedTo: "Alex Johnson",
    clientId: 1
  },
  {
    id: 201,
    title: "Manufacturing review",
    description: "Review manufacturing processes for efficiency improvements",
    status: "In Progress",
    priority: "High",
    dueDate: "2025-04-07T13:00:00",
    assignedTo: "Emily Davis",
    clientId: 2
  },
  {
    id: 202,
    title: "Supply chain analysis",
    description: "Analyze supply chain for possible cost reductions",
    status: "Pending",
    priority: "Medium",
    dueDate: "2025-04-14T15:00:00",
    assignedTo: "Michael Brown",
    clientId: 2
  }
];

// Client Activities
export const clientActivities = [
  {
    id: 1001,
    clientId: 1,
    type: "email",
    title: "Follow-up Email",
    description: "Sent follow-up email about new service offerings",
    timestamp: "2025-04-01T15:30:00",
    user: "Alex Johnson"
  },
  {
    id: 1002,
    clientId: 1,
    type: "call",
    title: "Client Call",
    description: "Discussed project timeline and deliverables",
    timestamp: "2025-03-30T11:20:00",
    user: "Sarah Williams"
  },
  {
    id: 1003,
    clientId: 1,
    type: "meeting",
    title: "Strategy Meeting",
    description: "Conducted quarterly strategy meeting with client",
    timestamp: "2025-03-28T14:00:00",
    user: "Michael Brown"
  },
  {
    id: 1004,
    clientId: 1,
    type: "task",
    title: "Task Completed",
    description: "Completed website redesign proposal",
    timestamp: "2025-03-25T16:45:00",
    user: "Emily Davis"
  },
  {
    id: 2001,
    clientId: 2,
    type: "email",
    title: "Project Update",
    description: "Sent monthly project update report",
    timestamp: "2025-04-03T09:15:00",
    user: "Alex Johnson"
  },
  {
    id: 2002,
    clientId: 2,
    type: "meeting",
    title: "Product Demo",
    description: "Demonstrated new product features to client team",
    timestamp: "2025-04-01T13:30:00",
    user: "Sarah Williams"
  }
];

// Client Notes
export const clientNotes = [
  {
    id: 10001,
    clientId: 1,
    title: "Initial Meeting Notes",
    content: "Client expressed interest in our premium package. They need a solution implemented by Q3. Main contact prefers email communication over phone calls.",
    createdAt: "2025-03-20T10:15:00",
    createdBy: "Alex Johnson"
  },
  {
    id: 10002,
    clientId: 1,
    title: "Budget Discussion",
    content: "Client has a budget of $75,000 - $100,000 for the initial phase. Potential for expanded scope in Phase 2 depending on results.",
    createdAt: "2025-03-25T14:30:00",
    createdBy: "Sarah Williams"
  },
  {
    id: 10003,
    clientId: 1,
    title: "Technical Requirements",
    content: "Client uses AWS for their infrastructure and prefers React for frontend. They need integration with their existing CRM system (Salesforce).",
    createdAt: "2025-03-28T11:45:00",
    createdBy: "Michael Brown"
  },
  {
    id: 20001,
    clientId: 2,
    title: "Manufacturing Challenges",
    content: "Client facing challenges with their current manufacturing process. Looking for 15-20% efficiency improvements through automation.",
    createdAt: "2025-03-22T09:20:00",
    createdBy: "Emily Davis"
  },
  {
    id: 20002,
    clientId: 2,
    title: "Competitor Analysis",
    content: "Client concerned about new competitor entering the market. Would like us to include comparative analysis in our recommendation.",
    createdAt: "2025-03-30T16:10:00",
    createdBy: "Alex Johnson"
  }
];

// Recent Activities
export const recentActivities = [
  {
    id: 1,
    type: "email",
    description: "Sent proposal to Acme Corporation",
    timestamp: "2025-04-01T15:30:00",
    user: "Alex Johnson"
  },
  {
    id: 2,
    type: "call",
    description: "Call with Globex Industries about project timeline",
    timestamp: "2025-04-01T14:20:00",
    user: "Sarah Williams"
  },
  {
    id: 3,
    type: "meeting",
    description: "Client meeting with Oceanic Airlines",
    timestamp: "2025-04-01T11:00:00",
    user: "Michael Brown"
  },
  {
    id: 4,
    type: "task",
    description: "Completed contract draft for Stark Enterprises",
    timestamp: "2025-04-01T09:45:00",
    user: "Emily Davis"
  },
  {
    id: 5,
    type: "note",
    description: "Added notes from Wayne Enterprises meeting",
    timestamp: "2025-03-31T16:15:00",
    user: "Alex Johnson"
  },
  {
    id: 6,
    type: "email",
    description: "Sent invoice reminder to Globex Industries",
    timestamp: "2025-03-31T14:50:00",
    user: "Sarah Williams"
  },
  {
    id: 7,
    type: "call",
    description: "Follow-up call with Acme Corporation",
    timestamp: "2025-03-31T13:30:00",
    user: "Michael Brown"
  },
  {
    id: 8,
    type: "meeting",
    description: "Product demo for Stark Enterprises",
    timestamp: "2025-03-31T10:00:00",
    user: "Emily Davis"
  }
];

// Revenue Data for Chart
export const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 78000 },
  { month: "Sep", revenue: 69000 },
  { month: "Oct", revenue: 74000 },
  { month: "Nov", revenue: 82000 },
  { month: "Dec", revenue: 94000 }
];

// Task Status Data for Chart
export const taskStatusData = [
  { status: "Completed", count: 42 },
  { status: "In Progress", count: 18 },
  { status: "Pending", count: 27 }
];

// Notifications for Header
export const notifications = [
  {
    id: 1,
    title: "New task assigned",
    description: "You've been assigned to the project kickoff meeting with Acme Corporation",
    time: "10 minutes ago",
    read: false
  },
  {
    id: 2,
    title: "Task completed",
    description: "Sarah Williams completed the contract draft for Stark Enterprises",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    title: "Meeting reminder",
    description: "Client meeting with Oceanic Airlines in 30 minutes",
    time: "2 hours ago",
    read: true
  },
  {
    id: 4,
    title: "Invoice paid",
    description: "Globex Industries has paid invoice #INV-2025-042",
    time: "Yesterday",
    read: true
  }
];
