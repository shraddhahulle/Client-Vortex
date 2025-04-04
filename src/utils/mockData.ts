
// User data
export const currentUser = {
  id: 1,
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "(555) 123-4567",
  role: "Sales Manager",
  department: "Sales",
  avatar: "JS",
  joinDate: "2023-01-15"
};

// Notification data
export const notifications = [
  {
    id: 1,
    title: "New Task Assigned",
    description: "You have been assigned a new task: Contact new leads",
    timestamp: "2025-04-03T10:30:00",
    read: false
  },
  {
    id: 2,
    title: "Task Due Soon",
    description: "Task 'Quarterly Report' is due in 2 days",
    timestamp: "2025-04-02T16:45:00",
    read: true
  },
  {
    id: 3,
    title: "Meeting Reminder",
    description: "Team meeting tomorrow at 10:00 AM",
    timestamp: "2025-04-02T09:15:00",
    read: false
  }
];

// Client data
export const clients = [
  {
    id: 1,
    name: "Acme Corporation",
    contact: "Jane Doe",
    email: "jane@acme.com",
    phone: "(555) 111-2222",
    industry: "Technology",
    status: "Active",
    revenue: 250000,
    createdAt: "2023-01-15T08:30:00",
    logo: "A"
  },
  {
    id: 2,
    name: "Globex Industries",
    contact: "John Johnson",
    email: "john@globex.com",
    phone: "(555) 333-4444",
    industry: "Manufacturing",
    status: "Active",
    revenue: 175000,
    createdAt: "2023-02-20T10:15:00",
    logo: "G"
  },
  {
    id: 3,
    name: "Umbrella Corp",
    contact: "Alice Smith",
    email: "alice@umbrella.com",
    phone: "(555) 555-6666",
    industry: "Healthcare",
    status: "Inactive",
    revenue: 320000,
    createdAt: "2023-03-10T14:45:00",
    logo: "U"
  },
  {
    id: 4,
    name: "Stark Industries",
    contact: "Tony Stark",
    email: "tony@stark.com",
    phone: "(555) 777-8888",
    industry: "Technology",
    status: "Active",
    revenue: 500000,
    createdAt: "2023-04-05T09:30:00",
    logo: "S"
  },
  {
    id: 5,
    name: "Wayne Enterprises",
    contact: "Bruce Wayne",
    email: "bruce@wayne.com",
    phone: "(555) 999-0000",
    industry: "Finance",
    status: "Active",
    revenue: 450000,
    createdAt: "2023-05-12T11:20:00",
    logo: "W"
  }
];

// Task data
export const tasks = [
  {
    id: 1,
    title: "Contact new leads",
    description: "Reach out to newly identified potential clients",
    assignedTo: "John Smith",
    clientId: 1,
    priority: "High",
    status: "In Progress",
    dueDate: "2025-04-15",
    createdAt: "2025-04-01"
  },
  {
    id: 2,
    title: "Prepare quarterly report",
    description: "Compile and analyze Q1 performance data",
    assignedTo: "John Smith",
    clientId: null,
    priority: "Medium",
    status: "Pending",
    dueDate: "2025-04-20",
    createdAt: "2025-04-02"
  },
  {
    id: 3,
    title: "Client follow-up call",
    description: "Schedule follow-up with Acme Corporation",
    assignedTo: "Sarah Johnson",
    clientId: 1,
    priority: "High",
    status: "Completed",
    dueDate: "2025-04-01",
    createdAt: "2025-03-25"
  },
  {
    id: 4,
    title: "Update CRM database",
    description: "Clean up and update client contact information",
    assignedTo: "John Smith",
    clientId: null,
    priority: "Low",
    status: "Pending",
    dueDate: "2025-04-25",
    createdAt: "2025-04-02"
  },
  {
    id: 5,
    title: "Team meeting preparation",
    description: "Prepare agenda and materials for weekly team meeting",
    assignedTo: "John Smith",
    clientId: null,
    priority: "Medium",
    status: "In Progress",
    dueDate: "2025-04-10",
    createdAt: "2025-04-03"
  }
];

// Chart data
export const revenueData = [
  { month: "January", revenue: 45000 },
  { month: "February", revenue: 52000 },
  { month: "March", revenue: 48000 },
  { month: "April", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "June", revenue: 67000 },
  { month: "July", revenue: 72000 }
];

export const taskStatusData = [
  { status: "Completed", count: 28 },
  { status: "In Progress", count: 15 },
  { status: "Pending", count: 12 },
  { status: "Cancelled", count: 5 }
];

export const clientAcquisitionData = [
  { month: "January", count: 3 },
  { month: "February", count: 2 },
  { month: "March", count: 4 },
  { month: "April", count: 3 },
  { month: "May", count: 5 },
  { month: "June", count: 7 },
  { month: "July", count: 4 }
];
