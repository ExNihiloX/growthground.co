'use client';

import { useState, useEffect } from 'react';
import { Menu, Search, Bell, User, BookOpen, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppStore } from '@/lib/store-db';
import { useSession } from '@/components/providers/session-provider';
import { logout } from '@/app/auth/actions';
import { SearchResult } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Header() {
  const { user } = useSession();
  const router = useRouter();
  const {
    sidebarOpen,
    setSidebarOpen,
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    modules,
    fetchModules
  } = useAppStore();
  
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (modules.length === 0) {
      fetchModules(true);
    }
  }, [modules.length, fetchModules]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results: SearchResult[] = [];
    
    // Search through modules from the database
    modules.forEach(module => {
      if (module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          module.category.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.push({
          id: module.id,
          title: module.title,
          description: module.description,
          type: 'module',
          category: module.category,
          thumbnail: module.thumbnail,
          url: `/modules/${module.id}`,
        });
      }

      // Search through lessons within modules
      module.lessons.forEach(lesson => {
        // Use title, coreConcepts, or hook (if available) for searching lessons
        const titleMatch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase());
        const conceptsMatch = lesson.coreConcepts?.some(concept => 
          concept.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const hookMatch = lesson.content?.hook?.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (titleMatch || conceptsMatch || hookMatch) {
          results.push({
            id: lesson.id,
            title: lesson.title,
            description: lesson.content?.hook || lesson.coreConcepts?.join(', ') || '',
            type: 'lesson',
            category: module.category,
            url: `/modules/${module.id}/lessons/${lesson.id}`,
          });
        }
      });
    });

    setSearchResults(results.slice(0, 8)); // Limit to 8 results
    setShowSearchResults(true);
  }, [searchQuery, setSearchResults, modules]);

  const handleSearchFocus = () => {
    if (searchQuery.trim() !== '') {
      setShowSearchResults(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow clicking on them
    setTimeout(() => setShowSearchResults(false), 200);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const handleSignOut = async () => {
    try {
      // Call the server action to handle logout
      const response = await logout();
      
      // Force a full page reload instead of using router.push
      if (response.success) {
        // Clear any client-side storage
        localStorage.clear();
        sessionStorage.clear();
        
        // Force a complete page reload to the home page
        window.location.href = response.redirectTo || '/';
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left side - Logo and menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-xl">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              GrowthGround
            </span>
          </Link>
        </div>

        {/* Center - Search */}
        <div className="hidden md:flex items-center max-w-md w-full mx-8 relative">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search courses, lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <Card className="absolute top-full left-0 right-0 mt-2 shadow-lg border border-gray-200 z-50">
              <CardContent className="p-0">
                <div className="max-h-96 overflow-y-auto">
                  {searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        // Handle navigation to result
                        clearSearch();
                      }}
                    >
                      <div className="flex items-start gap-3">
                        {result.thumbnail && (
                          <img
                            src={result.thumbnail}
                            alt={result.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900 truncate">
                              {result.title}
                            </h4>
                            <Badge variant="secondary" className="text-xs">
                              {result.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {result.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {result.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {searchResults.length === 8 && (
                  <div className="p-3 text-center border-t border-gray-100">
                    <p className="text-sm text-gray-500">
                      Showing first 8 results. Refine your search for more specific results.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* No Results */}
          {showSearchResults && searchQuery && searchResults.length === 0 && (
            <Card className="absolute top-full left-0 right-0 mt-2 shadow-lg border border-gray-200 z-50">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-gray-500">
                  No results found for "{searchQuery}"
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Try searching for courses, lessons, or topics
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right side - User actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 ml-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.name || user?.email} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}