import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { FileText, Download, Filter, Calendar, BarChart2, PieChart as PieChartIcon } from "lucide-react";
import { revenueData, taskStatusData, clientAcquisitionData, clients, tasks } from "../utils/mockData";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "@/lib/toast";

const ReportsSection = () => {
  const [reportType, setReportType] = useState("revenue");
  const [dateRange, setDateRange] = useState("all");
  const [chartType, setChartType] = useState("bar");
  
  // Colors for charts
  const COLORS = ["#FFC107", "#2196F3", "#4CAF50", "#F44336", "#9C27B0"];
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Download PDF report
  const handleDownloadPDF = () => {
    toast.loading("Generating PDF...");
    
    const reportElement = document.getElementById('report-container');
    
    if (reportElement) {
      html2canvas(reportElement, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('landscape', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        
        // Add report metadata
        pdf.setFontSize(10);
        pdf.setTextColor(100);
        pdf.text(`Generated on: ${new Date().toLocaleString()}`, 10, pdfHeight + 10);
        pdf.text('NexusCRM Analytics Report', 10, pdfHeight + 15);
        
        pdf.save(`NexusCRM-${reportType}-report.pdf`);
        
        toast.dismiss();
        toast.success("PDF report downloaded successfully!");
      });
    }
  };
  
  // Download CSV report
  const handleDownloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    let headers = [];
    let rows = [];
    
    if (reportType === "revenue") {
      headers = ["Month", "Revenue"];
      rows = revenueData.map(item => [item.month, item.revenue]);
    } else if (reportType === "tasks") {
      headers = ["Status", "Count"];
      rows = taskStatusData.map(item => [item.status, item.count]);
    } else if (reportType === "clients") {
      headers = ["Month", "New Clients"];
      rows = clientAcquisitionData.map(item => [item.month, item.count]);
    }
    
    csvContent += headers.join(",") + "\r\n";
    rows.forEach(row => {
      csvContent += row.join(",") + "\r\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NexusCRM-${reportType}-report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("CSV report downloaded successfully!");
  };
  
  // Calculate overall client statistics
  const totalClients = clients.length;
  const activeClients = clients.filter(client => client.status === "Active").length;
  const totalRevenue = clients.reduce((sum, client) => sum + client.revenue, 0);
  const averageRevenue = Math.round(totalRevenue / totalClients);
  
  // Calculate overall task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "Completed").length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);
  
  // Render the appropriate chart based on report type and chart type
  const renderChart = () => {
    if (reportType === "revenue") {
      if (chartType === "bar") {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), "Revenue"]}
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "1px solid #F5F5F5",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Legend />
              <Bar dataKey="revenue" name="Monthly Revenue" fill="#FFC107" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      } else {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis 
                tickFormatter={(value) => `$${value/1000}k`}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), "Revenue"]}
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "1px solid #F5F5F5",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" name="Monthly Revenue" stroke="#FFC107" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      }
    } else if (reportType === "tasks") {
      if (chartType === "pie") {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={taskStatusData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                fill="#8884d8"
                dataKey="count"
                nameKey="status"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {taskStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value} tasks`, "Count"]}
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "1px solid #F5F5F5",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      } else {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={taskStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} tasks`, "Count"]}
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "1px solid #F5F5F5",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Legend />
              <Bar dataKey="count" name="Tasks by Status" fill="#2196F3" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      }
    } else if (reportType === "clients") {
      if (chartType === "bar") {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={clientAcquisitionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} new clients`, "Count"]}
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "1px solid #F5F5F5",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Legend />
              <Bar dataKey="count" name="New Clients" fill="#4CAF50" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      } else {
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={clientAcquisitionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} new clients`, "Count"]}
                contentStyle={{ 
                  backgroundColor: "white", 
                  border: "1px solid #F5F5F5",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="count" name="New Clients" stroke="#4CAF50" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      }
    }
    
    return null;
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with title and download buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Analytics & Reports</h1>
        <div className="flex gap-2">
          <button 
            onClick={handleDownloadPDF}
            className="btn-primary flex items-center"
          >
            <Download size={18} className="mr-2" />
            Download PDF
          </button>
          <button 
            onClick={handleDownloadCSV}
            className="btn-secondary flex items-center"
          >
            <FileText size={18} className="mr-2" />
            Export CSV
          </button>
        </div>
      </div>
      
      {/* Filters and controls */}
      <div className="card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="reportType" className="form-label">Report Type</label>
            <select 
              id="reportType" 
              className="form-input" 
              value={reportType} 
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="revenue">Revenue Analysis</option>
              <option value="tasks">Task Status</option>
              <option value="clients">Client Acquisition</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="dateRange" className="form-label">Date Range</label>
            <select 
              id="dateRange" 
              className="form-input" 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="all">Last 7 months</option>
              <option value="quarter">Last Quarter</option>
              <option value="month">Last Month</option>
              <option value="week">Last Week</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="chartType" className="form-label">Chart Type</label>
            <div className="flex gap-2">
              <button 
                className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center ${
                  chartType === "bar" 
                    ? "bg-crm-yellow text-black" 
                    : "bg-crm-light-gray text-gray-700 hover:bg-crm-medium-gray"
                }`}
                onClick={() => setChartType("bar")}
              >
                <BarChart2 size={18} className="mr-2" />
                Bar
              </button>
              <button 
                className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center ${
                  chartType === "line" || chartType === "pie" 
                    ? "bg-crm-yellow text-black" 
                    : "bg-crm-light-gray text-gray-700 hover:bg-crm-medium-gray"
                }`}
                onClick={() => setChartType(reportType === "tasks" ? "pie" : "line")}
              >
                {reportType === "tasks" ? (
                  <>
                    <PieChartIcon size={18} className="mr-2" />
                    Pie
                  </>
                ) : (
                  <>
                    <Filter size={18} className="mr-2 rotate-90" />
                    Line
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Report stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportType === "revenue" && (
          <>
            <div className="stat-card">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">{formatCurrency(totalRevenue)}</h3>
              <p className="text-xs text-gray-500">From all clients</p>
            </div>
            <div className="stat-card">
              <p className="text-sm text-gray-500">Average Revenue</p>
              <h3 className="text-2xl font-bold">{formatCurrency(averageRevenue)}</h3>
              <p className="text-xs text-gray-500">Per client</p>
            </div>
            <div className="stat-card">
              <p className="text-sm text-gray-500">Highest Monthly Revenue</p>
              <h3 className="text-2xl font-bold">
                {formatCurrency(Math.max(...revenueData.map(item => item.revenue)))}
              </h3>
              <p className="text-xs text-gray-500">
                {revenueData.find(item => item.revenue === Math.max(...revenueData.map(d => d.revenue)))?.month}
              </p>
            </div>
            <div className="stat-card">
              <p className="text-sm text-gray-500">Revenue Growth</p>
              <h3 className="text-2xl font-bold">+16.8%</h3>
              <p className="text-xs text-gray-500">Year over year</p>
            </div>
          </>
        )}
        
        {reportType === "tasks" && (
          <>
            <div className="stat-card">
              <p className="text-sm text-gray-500">Total Tasks</p>
              <h3 className="text-2xl font-bold">{totalTasks}</h3>
              <p className="text-xs text-gray-500">All tasks</p>
            </div>
            <div className="stat-card">
              <p className="text-sm text-gray-500">Completed Tasks</p>
              <h3 className="text-2xl font-bold">{completedTasks}</h3>
              <p className="text-xs text-gray-500">Tasks finished</p>
            </div>
            <div className="stat-card">
              <p className="text-sm text-gray-500">Completion Rate</p>
              <h3 className="text-2xl font-bold">{completionRate}%</h3>
              <p className="text-xs text-gray-500">Tasks completed vs total</p>
            </div>
            <div className="stat-card">
              <p className="text-sm text-gray-500">High Priority Tasks</p>
              <h3 className="text-2xl font-bold">
                {tasks.filter(task => task.priority === "High").length}
              </h3>
              <p className="text-xs text-gray-500">Requiring immediate attention</p>
            </div>
          </>
        )}
        
        {reportType === "clients" && (
          <>
            <div className="stat-card">
              <p className="text-sm text-gray-500">Total Clients</p>
              <h3 className="text-2xl font-bold">{totalClients}</h3>
              <p className="text-xs text-gray-500">All time</p>
            </div>
            <div className="stat-card">
              <p className="text-sm text-gray-500">Active Clients</p>
              <h3 className="text-2xl font-bold">{activeClients}</h3>
              <p className="text-xs text-gray-500">Currently active</p>
            </div>
            <div className="stat-card">
              <p className="text-sm text-gray-500">New This Month</p>
              <h3 className="text-2xl font-bold">
                {clientAcquisitionData[clientAcquisitionData.length - 1]?.count || 0}
              </h3>
              <p className="text-xs text-gray-500">Most recent month</p>
            </div>
            <div className="stat-card">
              <p className="text-sm text-gray-500">Retention Rate</p>
              <h3 className="text-2xl font-bold">
                {Math.round((activeClients / totalClients) * 100)}%
              </h3>
              <p className="text-xs text-gray-500">Active vs total clients</p>
            </div>
          </>
        )}
      </div>
      
      {/* Main report chart */}
      <div className="card" id="report-container">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {reportType === "revenue" && "Revenue Performance"}
            {reportType === "tasks" && "Task Status Distribution"}
            {reportType === "clients" && "Client Acquisition Trend"}
          </h2>
          <p className="text-sm text-gray-500">
            {reportType === "revenue" && "Monthly revenue over the last 7 months"}
            {reportType === "tasks" && "Distribution of tasks by their current status"}
            {reportType === "clients" && "New clients acquired over the last 7 months"}
          </p>
        </div>
        
        {renderChart()}
        
        {/* Report insights */}
        <div className="mt-8 p-4 bg-crm-light-gray rounded-lg">
          <h3 className="font-semibold mb-2">Key Insights</h3>
          <ul className="space-y-2 text-sm">
            {reportType === "revenue" && (
              <>
                <li>• Revenue has been consistently growing month over month</li>
                <li>• July saw the highest revenue at {formatCurrency(revenueData[revenueData.length - 1]?.revenue)}</li>
                <li>• Average monthly revenue is {formatCurrency(revenueData.reduce((sum, item) => sum + item.revenue, 0) / revenueData.length)}</li>
                <li>• Q2 growth was stronger than Q1 by 15%</li>
              </>
            )}
            
            {reportType === "tasks" && (
              <>
                <li>• {completionRate}% of all tasks have been successfully completed</li>
                <li>• {taskStatusData.find(item => item.status === "In Progress")?.count} tasks are currently in progress</li>
                <li>• {taskStatusData.find(item => item.status === "Pending")?.count} tasks are pending and need to be started</li>
                <li>• High priority tasks make up {Math.round((tasks.filter(task => task.priority === "High").length / totalTasks) * 100)}% of all tasks</li>
              </>
            )}
            
            {reportType === "clients" && (
              <>
                <li>• Client acquisition has been growing with an average of {(clientAcquisitionData.reduce((sum, item) => sum + item.count, 0) / clientAcquisitionData.length).toFixed(1)} new clients per month</li>
                <li>• June saw the highest number of new clients at {Math.max(...clientAcquisitionData.map(item => item.count))}</li>
                <li>• {activeClients} out of {totalClients} clients are currently active</li>
                <li>• The average revenue per client is {formatCurrency(averageRevenue)}</li>
              </>
            )}
          </ul>
        </div>
      </div>
      
      {/* Download options */}
      <div className="flex justify-end gap-2">
        <button 
          onClick={handleDownloadPDF}
          className="btn-primary flex items-center"
        >
          <Download size={18} className="mr-2" />
          Download PDF
        </button>
        <button 
          onClick={handleDownloadCSV}
          className="btn-secondary flex items-center"
        >
          <FileText size={18} className="mr-2" />
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default ReportsSection;
