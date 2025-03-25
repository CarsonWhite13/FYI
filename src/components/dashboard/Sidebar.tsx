
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  ClipboardList,
  User,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarProps = {
  userRole: string;
};

const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(true);
    }
  }, [isMobile]);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    toast.success('Logged out successfully');
    window.location.href = '/';
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };
  
  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link to={to}>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start mb-1 transition-all',
            isActive ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5',
            isCollapsed && !isMobileOpen ? 'px-2' : 'px-4'
          )}
        >
          <Icon className={cn('h-5 w-5', isCollapsed && !isMobileOpen ? 'mr-0' : 'mr-2')} />
          {(!isCollapsed || isMobileOpen) && <span>{label}</span>}
        </Button>
      </Link>
    );
  };
  
  const renderSidebarContent = () => (
    <>
      <div className="px-4 py-6 flex justify-between items-center">
        {(!isCollapsed || isMobileOpen) ? (
          <div className="flex items-center gap-2">
            <div className="bg-primary h-8 w-8 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <span className="font-bold text-xl">Foster Young</span>
          </div>
        ) : (
          <div className="bg-primary h-8 w-8 rounded-md flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-xl">F</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8">
          {isMobileOpen ? <X size={18} /> : isCollapsed ? <Menu size={18} /> : <X size={18} />}
        </Button>
      </div>
      
      <div className="px-3 py-2">
        <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/orders" icon={ClipboardList} label="Work Orders" />
        <NavItem to="/profile" icon={User} label="Profile" />
        {userRole === 'admin' && <NavItem to="/settings" icon={Settings} label="Settings" />}
      </div>
      
      <div className="mt-auto px-3 py-4">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50',
            isCollapsed && !isMobileOpen ? 'px-2' : 'px-4'
          )}
          onClick={handleLogout}
        >
          <LogOut className={cn('h-5 w-5', isCollapsed && !isMobileOpen ? 'mr-0' : 'mr-2')} />
          {(!isCollapsed || isMobileOpen) && <span>Log Out</span>}
        </Button>
      </div>
      
      <div className="border-t px-3 py-4">
        {(!isCollapsed || isMobileOpen) ? (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                {userRole === 'admin' ? 'AD' : 'CO'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">
                {userRole === 'admin' ? 'Admin User' : 'Consultant'}
              </p>
              <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
            </div>
          </div>
        ) : (
          <Avatar className="mx-auto">
            <AvatarImage src="" />
            <AvatarFallback>
              {userRole === 'admin' ? 'AD' : 'CO'}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </>
  );
  
  // Mobile sidebar overlay
  if (isMobile) {
    return (
      <>
        <div className="fixed left-4 top-4 z-50">
          <Button variant="outline" size="icon" onClick={toggleSidebar} className="h-10 w-10 shadow-md">
            <Menu size={20} />
          </Button>
        </div>
        
        {/* Mobile sidebar */}
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/50 transition-opacity",
            isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={() => setIsMobileOpen(false)}
        />
        
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r shadow-xl transition-transform duration-300 flex flex-col",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {renderSidebarContent()}
        </div>
      </>
    );
  }
  
  // Desktop sidebar
  return (
    <div
      className={cn(
        "relative h-screen bg-card border-r transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {renderSidebarContent()}
    </div>
  );
};

export default Sidebar;
