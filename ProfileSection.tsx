
import { useState } from "react";
import { User, Mail, Phone, Calendar, Building, Bell, Lock, Edit, Save, X } from "lucide-react";
import { currentUser, notifications } from "../utils/mockData";
import { toast } from "@/lib/toast";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProfileSection = () => {
  const [editMode, setEditMode] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    department: currentUser.department
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    taskAssigned: true,
    taskDue: true,
    clientActivity: true,
    reports: false
  });
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // Handle profile update
  const handleUpdateProfile = () => {
    setEditMode(false);
    toast.success("Profile updated successfully");
  };
  
  // Cancel profile edit
  const handleCancelEdit = () => {
    setEditMode(false);
    setUserProfile({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      department: currentUser.department
    });
  };
  
  // Update input field
  const handleInputChange = (field: string, value: string) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Toggle notification setting
  const toggleNotification = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    
    toast.success(`${setting} notifications ${notificationSettings[setting as keyof typeof notificationSettings] ? 'disabled' : 'enabled'}`);
  };
  
  // Handle password change
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password changed successfully");
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold">User Profile</h1>
        {!editMode ? (
          <button 
            onClick={() => setEditMode(true)}
            className="btn-primary flex items-center"
          >
            <Edit size={18} className="mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleCancelEdit}
              className="btn-secondary flex items-center"
            >
              <X size={18} className="mr-2" />
              Cancel
            </button>
            <button 
              onClick={handleUpdateProfile}
              className="btn-primary flex items-center"
            >
              <Save size={18} className="mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        {/* Profile Information Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="card">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="rounded-full bg-crm-yellow w-24 h-24 flex items-center justify-center font-bold text-black text-3xl">
                {currentUser.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{editMode ? userProfile.name : currentUser.name}</h2>
                <p className="text-gray-500">{currentUser.role}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="badge badge-yellow">{currentUser.department}</span>
                  <span className="badge badge-gray">Member since {formatDate(currentUser.joinDate)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            
            <div className="space-y-4">
              {editMode ? (
                <>
                  <div>
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        id="name"
                        type="text"
                        className="form-input pl-10"
                        value={userProfile.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        id="email"
                        type="email"
                        className="form-input pl-10"
                        value={userProfile.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        id="phone"
                        type="text"
                        className="form-input pl-10"
                        value={userProfile.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="department" className="form-label">Department</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        id="department"
                        type="text"
                        className="form-input pl-10"
                        value={userProfile.department}
                        onChange={(e) => handleInputChange("department", e.target.value)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center border-b border-gray-100 pb-4">
                    <User size={20} className="text-gray-500 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{currentUser.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-100 pb-4">
                    <Mail size={20} className="text-gray-500 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium">{currentUser.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-100 pb-4">
                    <Phone size={20} className="text-gray-500 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium">{currentUser.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center border-b border-gray-100 pb-4">
                    <Building size={20} className="text-gray-500 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Department</p>
                      <p className="font-medium">{currentUser.department}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar size={20} className="text-gray-500 mr-4" />
                    <div>
                      <p className="text-sm text-gray-500">Joined</p>
                      <p className="font-medium">{formatDate(currentUser.joinDate)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Notification Channels</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail size={20} className="text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notificationSettings.email} 
                      onCheckedChange={() => toggleNotification("email")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell size={20} className="text-gray-500 mr-3" />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive in-app notifications</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notificationSettings.push} 
                      onCheckedChange={() => toggleNotification("push")} 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Notification Types</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Task Assignments</p>
                      <p className="text-sm text-gray-500">When you are assigned a new task</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.taskAssigned} 
                      onCheckedChange={() => toggleNotification("taskAssigned")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Task Due Reminders</p>
                      <p className="text-sm text-gray-500">When a task deadline is approaching</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.taskDue} 
                      onCheckedChange={() => toggleNotification("taskDue")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Client Activity</p>
                      <p className="text-sm text-gray-500">When there's activity related to your clients</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.clientActivity} 
                      onCheckedChange={() => toggleNotification("clientActivity")} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Report Availability</p>
                      <p className="text-sm text-gray-500">When new reports are generated</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.reports} 
                      onCheckedChange={() => toggleNotification("reports")} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
            
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg ${
                    !notification.read ? "bg-crm-yellow-light/30" : "bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between">
                    <h4 className="font-medium">{notification.title}</h4>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.description}
                  </p>
                  {!notification.read && (
                    <button className="text-xs text-crm-yellow mt-2 hover:underline">
                      Mark as read
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="currentPassword"
                    type="password"
                    className="form-input pl-10"
                    placeholder="Enter your current password"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="newPassword"
                    type="password"
                    className="form-input pl-10"
                    placeholder="Enter new password"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long with at least one uppercase letter, one number, and one special character.</p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    id="confirmPassword"
                    type="password"
                    className="form-input pl-10"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              <button type="submit" className="btn-primary mt-2">Change Password</button>
            </form>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Login Sessions</h3>
            
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-crm-yellow-light/30 border border-crm-yellow-light">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Current Session</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Last access: {new Date().toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      IP Address: 192.168.1.1
                    </p>
                    <p className="text-sm text-gray-600">
                      Device: Chrome on Windows
                    </p>
                  </div>
                  <span className="badge badge-yellow">Active</span>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Previous Session</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Last access: {new Date(Date.now() - 86400000).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      IP Address: 192.168.1.1
                    </p>
                    <p className="text-sm text-gray-600">
                      Device: Safari on macOS
                    </p>
                  </div>
                  <button className="text-xs text-red-500 hover:underline">
                    Revoke
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <button className="btn-secondary">Sign Out From All Devices</button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSection;
