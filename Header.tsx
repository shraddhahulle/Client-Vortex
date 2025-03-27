
import { Bell, User, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { notifications } from "../utils/mockData";

interface NavigationLink {
  path: string;
  label: string;
}

const navigationLinks: NavigationLink[] = [
  { path: "/", label: "Dashboard" },
  { path: "/clients", label: "Clients" },
  { path: "/tasks", label: "Tasks" },
  { path: "/reports", label: "Reports" }
];

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Track scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsNotificationsOpen(false);
  }, [location.pathname]);
  
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 bg-white z-50 transition-all duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <Link 
              to="/" 
              className="text-black font-bold text-xl flex items-center"
            >
              <img 
                src="/lovable-uploads/80305d05-878e-475f-b522-7d2fea708da8.png" 
                alt="ClientVortex Logo" 
                className="h-10" 
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-crm-yellow text-black"
                    : "text-gray-700 hover:bg-crm-yellow-light"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          {/* Right side items */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-2 rounded-full text-gray-700 hover:bg-crm-light-gray transition-colors"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell size={20} />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-crm-yellow rounded-full flex items-center justify-center text-[10px] font-bold">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>
              
              {/* Notifications dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border border-crm-light-gray animate-scale-in">
                  <div className="px-4 py-2 border-b border-crm-light-gray">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`px-4 py-3 border-b border-crm-light-gray hover:bg-crm-light-gray/50 transition-colors ${
                          !notification.read ? "bg-crm-yellow-light/30" : ""
                        }`}
                      >
                        <div className="flex justify-between">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <span className="text-xs text-gray-500">
                            {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 text-center">
                    <button className="text-sm text-crm-yellow hover:underline">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile */}
            <Link to="/profile" className="p-2 rounded-full text-gray-700 hover:bg-crm-light-gray transition-colors">
              <User size={20} />
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-full text-gray-700 hover:bg-crm-light-gray transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-2 border-t border-crm-light-gray animate-slide-in">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? "bg-crm-yellow text-black"
                    : "text-gray-700 hover:bg-crm-yellow-light"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
