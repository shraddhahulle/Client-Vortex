
// Example mock data for the CRM dashboard

export const dashboardStats = {
  totalClients: 128,
  tasksCompleted: 324,
  totalRevenue: 542000,
  revenueGrowth: 14.5,
  avgResponseTime: 1.8
};

// Sample clients data with more complete information
export const clients = [
  {
    id: 1,
    name: "Acme Corporation",
    industry: "Technology",
    logo: "A",
    status: "Active",
    email: "contact@acmecorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Avenue, San Francisco, CA 94107",
    contactPerson: "John Smith",
    since: "2023-01-15",
    lastActivity: "2025-04-03T14:32:00",
    totalProjects: 7,
    revenue: 128000,
    tasksCompleted: 42
  },
  {
    id: 2,
    name: "Global Innovations",
    industry: "Manufacturing",
    logo: "G",
    status: "Active",
    email: "info@globalinnovations.com",
    phone: "+1 (555) 987-6543",
    address: "456 Industry Parkway, Detroit, MI 48226",
    contactPerson: "Sarah Johnson",
    since: "2022-08-21",
    lastActivity: "2025-04-01T09:15:00",
    totalProjects: 4,
    revenue: 85000,
    tasksCompleted: 28
  },
  {
    id: 3,
    name: "EcoSolutions",
    industry: "Environmental",
    logo: "E",
    status: "Lead",
    email: "contact@ecosolutions.org",
    phone: "+1 (555) 456-7890",
    address: "789 Green Street, Portland, OR 97205",
    contactPerson: "Michael Green",
    since: "2023-11-05",
    lastActivity: "2025-04-02T16:45:00",
    totalProjects: 2,
    revenue: 34000,
    tasksCompleted: 12
  },
  {
    id: 4,
    name: "Finance Pro",
    industry: "Finance",
    logo: "F",
    status: "Active",
    email: "support@financepro.com",
    phone: "+1 (555) 789-0123",
    address: "10 Wall Street, New York, NY 10005",
    contactPerson: "Amanda Williams",
    since: "2022-03-18",
    lastActivity: "2025-03-28T11:20:00",
    totalProjects: 9,
    revenue: 215000,
    tasksCompleted: 56
  },
  {
    id: 5,
    name: "MediCare Plus",
    industry: "Healthcare",
    logo: "M",
    status: "Inactive",
    email: "info@medicareplus.com",
    phone: "+1 (555) 234-5678",
    address: "567 Hospital Drive, Boston, MA 02114",
    contactPerson: "Dr. Robert Chen",
    since: "2021-06-12",
    lastActivity: "2025-03-15T13:45:00",
    totalProjects: 5,
    revenue: 78000,
    tasksCompleted: 37
  }
];

// Sample tasks data with client IDs
export const tasks = [
  {
    id: 1,
    title: "Website Redesign",
    description: "Redesign the client's website to improve user experience and mobile compatibility.",
    priority: "High",
    dueDate: "2025-04-15T16:00:00",
    status: "In Progress",
    assignedTo: "Jessica Chen",
    clientId: 1
  },
  {
    id: 2,
    title: "Quarterly Review",
    description: "Conduct quarterly review meeting to discuss progress and next steps.",
    priority: "Medium",
    dueDate: "2025-04-10T10:00:00",
    status: "Scheduled",
    assignedTo: "Michael Rodriguez",
    clientId: 1
  },
  {
    id: 3,
    title: "Contract Renewal",
    description: "Prepare and send contract renewal documents before expiration date.",
    priority: "High",
    dueDate: "2025-04-30T12:00:00",
    status: "Not Started",
    assignedTo: "David Johnson",
    clientId: 2
  },
  {
    id: 4,
    title: "SEO Optimization",
    description: "Implement SEO improvements to increase organic traffic.",
    priority: "Medium",
    dueDate: "2025-04-20T15:00:00",
    status: "In Progress",
    assignedTo: "Sarah Lee",
    clientId: 3
  },
  {
    id: 5,
    title: "Social Media Campaign",
    description: "Design and launch Q2 social media campaign across all platforms.",
    priority: "Medium",
    dueDate: "2025-04-12T09:00:00",
    status: "In Progress",
    assignedTo: "Jessica Chen",
    clientId: 4
  },
  {
    id: 6,
    title: "Data Analysis",
    description: "Analyze customer data and prepare insights report.",
    priority: "Low",
    dueDate: "2025-04-25T17:00:00",
    status: "Not Started",
    assignedTo: "Alex Martinez",
    clientId: 5
  },
  {
    id: 7,
    title: "Content Creation",
    description: "Create blog content for next month's marketing push.",
    priority: "Medium",
    dueDate: "2025-04-18T12:00:00",
    status: "Not Started",
    assignedTo: "Emily Wong",
    clientId: 1
  },
  {
    id: 8,
    title: "Budget Review",
    description: "Review and approve marketing budget for Q3.",
    priority: "High",
    dueDate: "2025-04-08T14:00:00",
    status: "Completed",
    assignedTo: "David Johnson",
    clientId: 2
  }
];

// Sample recent activities data with client IDs
export const recentActivities = [
  {
    id: 1,
    type: "email",
    description: "Sent proposal for website redesign project",
    timestamp: "2025-04-03T14:32:00",
    user: "Jessica Chen",
    clientId: 1
  },
  {
    id: 2,
    type: "call",
    description: "Discussed contract renewal options",
    timestamp: "2025-04-03T11:15:00",
    user: "David Johnson",
    clientId: 2
  },
  {
    id: 3,
    type: "meeting",
    description: "Initial consultation for environmental assessment",
    timestamp: "2025-04-02T16:45:00",
    user: "Michael Rodriguez",
    clientId: 3
  },
  {
    id: 4,
    type: "task",
    description: "Completed Q1 financial analysis report",
    timestamp: "2025-04-02T09:30:00",
    user: "Sarah Lee",
    clientId: 4
  },
  {
    id: 5,
    type: "note",
    description: "Updated client contact information",
    timestamp: "2025-04-01T15:20:00",
    user: "Emily Wong",
    clientId: 5
  },
  {
    id: 6,
    type: "email",
    description: "Followed up on project timeline",
    timestamp: "2025-04-01T13:45:00",
    user: "Michael Rodriguez",
    clientId: 1
  },
  {
    id: 7,
    type: "call",
    description: "Addressed concerns about delivery timeline",
    timestamp: "2025-03-31T10:20:00",
    user: "Jessica Chen",
    clientId: 3
  },
  {
    id: 8,
    type: "meeting",
    description: "Quarterly review with leadership team",
    timestamp: "2025-03-30T14:00:00",
    user: "David Johnson",
    clientId: 1
  },
  {
    id: 9,
    type: "task",
    description: "Updated website content as requested",
    timestamp: "2025-03-30T11:30:00",
    user: "Emily Wong",
    clientId: 2
  },
  {
    id: 10,
    type: "note",
    description: "Client expressed interest in additional services",
    timestamp: "2025-03-29T15:45:00",
    user: "Sarah Lee",
    clientId: 4
  }
];

// Sample revenue data for charts
export const revenueData = [
  { month: "Jan", revenue: 42000 },
  { month: "Feb", revenue: 38000 },
  { month: "Mar", revenue: 45000 },
  { month: "Apr", revenue: 52000 },
  { month: "May", revenue: 48000 },
  { month: "Jun", revenue: 57000 },
  { month: "Jul", revenue: 63000 },
  { month: "Aug", revenue: 59000 },
  { month: "Sep", revenue: 68000 },
  { month: "Oct", revenue: 72000 },
  { month: "Nov", revenue: 81000 },
  { month: "Dec", revenue: 89000 }
];

// Sample task status data for the pie chart
export const taskStatusData = [
  { status: "Completed", count: 42 },
  { status: "In Progress", count: 28 },
  { status: "Not Started", count: 18 }
];
