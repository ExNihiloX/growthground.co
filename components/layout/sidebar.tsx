'use client';

import { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Award, 
  Settings, 
  HelpCircle, 
  BarChart3,
  Calendar,
  Users,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

const navigationItems = [
  { id: 'dashboard', title: 'Dashboard', icon: Home, href: '/' },
  { id: 'modules', title: 'All Modules', icon: BookOpen, href: '/modules' },
  { id: 'progress', title: 'Progress', icon: BarChart3, href: '/progress' },
  { id: 'achievements', title: 'Achievements', icon: Award, href: '/achievements' },
  { id: 'schedule', title: 'Schedule', icon: Calendar, href: '/schedule' },
  { id: 'community', title: 'Community', icon: Users, href: '/community' },
  { id: 'settings', title: 'Settings', icon: Settings, href: '/settings' },
  { id: 'help', title: 'Help', icon: HelpCircle, href: '/help' },
];

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen, currentPage, setCurrentPage } = useAppStore();

  const handleNavigation = (itemId: string) => {
    setCurrentPage(itemId);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-gray-200 w-64 transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:z-auto",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-xl">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">GrowthGround</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                    isActive 
                      ? "bg-blue-50 text-blue-700 border border-blue-200" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className={cn(
                    "h-5 w-5",
                    isActive ? "text-blue-600" : "text-gray-500"
                  )} />
                  <span className="font-medium">{item.title}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Upgrade to Pro</h3>
              <p className="text-sm text-gray-600 mb-3">
                Unlock advanced modules and 1-on-1 mentoring
              </p>
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}