
export const clients = [
  {
    id: 1,
    name: "TechVision Inc",
    contact: "John Smith",
    email: "john@techvision.com",
    phone: "(555) 123-4567",
    industry: "Technology",
    status: "Active",
    revenue: 1250000,
    createdAt: "2023-01-15T08:30:00Z",
    lastActivity: "2023-05-10T15:45:00Z",
    logo: "T"
  },
  {
    id: 2,
    name: "HealthCare Solutions",
    contact: "Sarah Johnson",
    email: "sarah@healthcare.com",
    phone: "(555) 987-6543",
    industry: "Healthcare",
    status: "Active",
    revenue: 850000,
    createdAt: "2023-02-20T10:15:00Z",
    lastActivity: "2023-05-12T11:30:00Z",
    logo: "H"
  },
  {
    id: 3,
    name: "EduLearn Academy",
    contact: "Michael Brown",
    email: "michael@edulearn.com",
    phone: "(555) 456-7890",
    industry: "Education",
    status: "Inactive",
    revenue: 420000,
    createdAt: "2023-03-05T09:45:00Z",
    lastActivity: "2023-04-28T14:20:00Z",
    logo: "E"
  },
  {
    id: 4,
    name: "FinPro Services",
    contact: "Emma Wilson",
    email: "emma@finpro.com",
    phone: "(555) 234-5678",
    industry: "Finance",
    status: "Active",
    revenue: 1750000,
    createdAt: "2023-01-30T11:00:00Z",
    lastActivity: "2023-05-15T09:10:00Z",
    logo: "F"
  },
  {
    id: 5,
    name: "RetailMax Group",
    contact: "Daniel Lee",
    email: "daniel@retailmax.com",
    phone: "(555) 876-5432",
    industry: "Retail",
    status: "Active",
    revenue: 980000,
    createdAt: "2023-02-10T13:20:00Z",
    lastActivity: "2023-05-08T10:45:00Z",
    logo: "R"
  },
  {
    id: 6,
    name: "ConstructBuild Ltd",
    contact: "Olivia Martin",
    email: "olivia@constructbuild.com",
    phone: "(555) 345-6789",
    industry: "Construction",
    status: "Inactive",
    revenue: 650000,
    createdAt: "2023-03-15T14:30:00Z",
    lastActivity: "2023-04-20T16:15:00Z",
    logo: "C"
  },
  {
    id: 7,
    name: "FoodDelights Co",
    contact: "James Wilson",
    email: "james@fooddelights.com",
    phone: "(555) 765-4321",
    industry: "Food",
    status: "Active",
    revenue: 520000,
    createdAt: "2023-02-25T08:45:00Z",
    lastActivity: "2023-05-14T13:50:00Z",
    logo: "F"
  },
  {
    id: 8,
    name: "TravelJoy Vacations",
    contact: "Sophia Garcia",
    email: "sophia@traveljoy.com",
    phone: "(555) 432-1098",
    industry: "Travel",
    status: "Active",
    revenue: 890000,
    createdAt: "2023-01-10T15:10:00Z",
    lastActivity: "2023-05-11T08:30:00Z",
    logo: "T"
  }
];

export const tasks = [
  {
    id: 1,
    title: "Follow up with TechVision Inc",
    description: "Schedule a call to discuss the new proposal and address any concerns",
    dueDate: "2023-05-20T15:00:00Z",
    priority: "High",
    status: "Pending",
    assignedTo: "Alex Johnson",
    clientId: 1
  },
  {
    id: 2,
    title: "Send contract to HealthCare Solutions",
    description: "Finalize and send the service contract for their review",
    dueDate: "2023-05-18T12:00:00Z",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "Maria Garcia",
    clientId: 2
  },
  {
    id: 3,
    title: "Onboarding call with FinPro Services",
    description: "Introduction call to set up their account and explain our services",
    dueDate: "2023-05-19T10:30:00Z",
    priority: "High",
    status: "Pending",
    assignedTo: "David Smith",
    clientId: 4
  },
  {
    id: 4,
    title: "Prepare quarterly report for RetailMax",
    description: "Compile performance metrics and ROI for Q1 2023",
    dueDate: "2023-05-25T16:00:00Z",
    priority: "Medium",
    status: "Not Started",
    assignedTo: "Alex Johnson",
    clientId: 5
  },
  {
    id: 5,
    title: "Update CRM data for EduLearn",
    description: "Review and update contact information and service history",
    dueDate: "2023-05-17T13:00:00Z",
    priority: "Low",
    status: "Completed",
    assignedTo: "Maria Garcia",
    clientId: 3
  },
  {
    id: 6,
    title: "Send proposal to TravelJoy",
    description: "Prepare and send the marketing campaign proposal",
    dueDate: "2023-05-22T11:00:00Z",
    priority: "High",
    status: "In Progress",
    assignedTo: "David Smith",
    clientId: 8
  },
  {
    id: 7,
    title: "Schedule product demo for FoodDelights",
    description: "Coordinate team for a virtual product demonstration",
    dueDate: "2023-05-24T14:30:00Z",
    priority: "Medium",
    status: "Not Started",
    assignedTo: "Lisa Wong",
    clientId: 7
  },
  {
    id: 8,
    title: "Invoice follow-up with ConstructBuild",
    description: "Check payment status for invoice #INV-2023-056",
    dueDate: "2023-05-16T09:00:00Z",
    priority: "High",
    status: "Completed",
    assignedTo: "Alex Johnson",
    clientId: 6
  }
];

export const recentActivities = [
  {
    id: 1,
    type: "email",
    description: "Sent proposal to TechVision Inc",
    timestamp: "2023-05-15T14:30:00Z",
    user: "Alex Johnson"
  },
  {
    id: 2,
    type: "call",
    description: "30-minute call with HealthCare Solutions",
    timestamp: "2023-05-15T11:15:00Z",
    user: "Maria Garcia"
  },
  {
    id: 3,
    type: "meeting",
    description: "Virtual meeting with FinPro Services team",
    timestamp: "2023-05-14T15:00:00Z",
    user: "David Smith"
  },
  {
    id: 4,
    type: "task",
    description: "Completed quarterly report for RetailMax",
    timestamp: "2023-05-14T10:45:00Z",
    user: "Alex Johnson"
  },
  {
    id: 5,
    type: "note",
    description: "Added notes from EduLearn feedback session",
    timestamp: "2023-05-13T16:20:00Z",
    user: "Lisa Wong"
  },
  {
    id: 6,
    type: "email",
    description: "Sent follow-up email to TravelJoy regarding proposal",
    timestamp: "2023-05-13T13:10:00Z",
    user: "Maria Garcia"
  },
  {
    id: 7,
    type: "call",
    description: "Product inquiry call from FoodDelights",
    timestamp: "2023-05-12T14:50:00Z",
    user: "David Smith"
  },
  {
    id: 8,
    type: "meeting",
    description: "Onboarding session with ConstructBuild team",
    timestamp: "2023-05-12T09:30:00Z",
    user: "Alex Johnson"
  }
];

export const revenueData = [
  { month: "Jan", revenue: 185000 },
  { month: "Feb", revenue: 210000 },
  { month: "Mar", revenue: 195000 },
  { month: "Apr", revenue: 240000 },
  { month: "May", revenue: 225000 },
  { month: "Jun", revenue: 275000 },
  { month: "Jul", revenue: 290000 },
  { month: "Aug", revenue: 310000 },
  { month: "Sep", revenue: 325000 },
  { month: "Oct", revenue: 315000 },
  { month: "Nov", revenue: 340000 },
  { month: "Dec", revenue: 365000 }
];

export const taskStatusData = [
  { status: "Completed", count: 24 },
  { status: "In Progress", count: 18 },
  { status: "Not Started", count: 12 }
];

export const dashboardStats = {
  totalClients: 32,
  tasksCompleted: 24,
  totalRevenue: 2850000,
  revenueGrowth: 18.5,
  avgResponseTime: 2.4
};

export const notifications = [
  {
    id: 1,
    title: "New Client",
    description: "TechFusion Ltd has been added as a new client",
    timestamp: "2023-05-15T14:30:00Z",
    read: false
  },
  {
    id: 2,
    title: "Task Due",
    description: "Follow-up call with HealthCare Solutions due in 3 hours",
    timestamp: "2023-05-15T12:15:00Z",
    read: false
  },
  {
    id: 3,
    title: "Meeting Reminder",
    description: "Quarterly review with RetailMax starts in 30 minutes",
    timestamp: "2023-05-15T09:30:00Z",
    read: true
  },
  {
    id: 4,
    title: "Contract Signed",
    description: "FinPro Services has signed the service agreement",
    timestamp: "2023-05-14T16:45:00Z",
    read: true
  },
  {
    id: 5,
    title: "Payment Received",
    description: "Invoice #INV-2023-056 has been paid by ConstructBuild",
    timestamp: "2023-05-14T11:20:00Z",
    read: true
  }
];
