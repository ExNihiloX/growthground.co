'use client';

import { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, HelpCircle, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAppStore } from '@/lib/store';

export function SettingsPage() {
  const { user, setUser } = useAppStore();
  const [hasChanges, setHasChanges] = useState(false);

  const handleSave = () => {
    // In a real app, this would save to backend
    setHasChanges(false);
    // Show success toast
  };

  const updateUserPreference = (key: string, value: any) => {
    if (user) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          [key]: value,
        },
      });
      setHasChanges(true);
    }
  };

  const updateNestedPreference = (category: string, key: string, value: any) => {
    if (user) {
      setUser({
        ...user,
        preferences: {
          ...user.preferences,
          [category]: {
            ...user.preferences?.[category as keyof typeof user.preferences],
            [key]: value,
          },
        },
      });
      setHasChanges(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your account preferences and learning settings
          </p>
        </div>
        {hasChanges && (
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        )}
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Learning
          </TabsTrigger>
          <TabsTrigger value="help" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Help
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="text-lg">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">Change Photo</Button>
                  <p className="text-sm text-gray-500 mt-2">
                    JPG, GIF or PNG. Max size of 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={user?.name || ''}
                    onChange={(e) => {
                      if (user) {
                        setUser({ ...user, name: e.target.value });
                        setHasChanges(true);
                      }
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    onChange={(e) => {
                      if (user) {
                        setUser({ ...user, email: e.target.value });
                        setHasChanges(true);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Receive course updates and announcements via email
                    </p>
                  </div>
                  <Switch
                    checked={user?.preferences?.notifications?.email || false}
                    onCheckedChange={(checked) => 
                      updateNestedPreference('notifications', 'email', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-gray-500">
                      Get notified about new lessons and achievements
                    </p>
                  </div>
                  <Switch
                    checked={user?.preferences?.notifications?.push || false}
                    onCheckedChange={(checked) => 
                      updateNestedPreference('notifications', 'push', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Learning Reminders</h3>
                    <p className="text-sm text-gray-500">
                      Daily reminders to keep up with your learning goals
                    </p>
                  </div>
                  <Switch
                    checked={user?.preferences?.notifications?.reminders || false}
                    onCheckedChange={(checked) => 
                      updateNestedPreference('notifications', 'reminders', checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Public Profile</h3>
                    <p className="text-sm text-gray-500">
                      Make your profile visible to other learners
                    </p>
                  </div>
                  <Switch
                    checked={user?.preferences?.privacy?.profileVisible || false}
                    onCheckedChange={(checked) => 
                      updateNestedPreference('privacy', 'profileVisible', checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Show Learning Progress</h3>
                    <p className="text-sm text-gray-500">
                      Display your course progress and achievements publicly
                    </p>
                  </div>
                  <Switch
                    checked={user?.preferences?.privacy?.progressVisible || false}
                    onCheckedChange={(checked) => 
                      updateNestedPreference('privacy', 'progressVisible', checked)
                    }
                  />
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="font-medium mb-4">Data Management</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={user?.preferences?.theme || 'light'}
                    onValueChange={(value) => updateUserPreference('theme', value)}
                  >
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Learning Settings */}
        <TabsContent value="learning">
          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dailyGoal">Daily Learning Goal (minutes)</Label>
                  <Input
                    id="dailyGoal"
                    type="number"
                    value={user?.preferences?.learning?.dailyGoal || 60}
                    onChange={(e) => 
                      updateNestedPreference('learning', 'dailyGoal', parseInt(e.target.value))
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="reminderTime">Daily Reminder Time</Label>
                  <Input
                    id="reminderTime"
                    type="time"
                    value={user?.preferences?.learning?.reminderTime || '19:00'}
                    onChange={(e) => 
                      updateNestedPreference('learning', 'reminderTime', e.target.value)
                    }
                    className="mt-2"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-play Videos</h3>
                    <p className="text-sm text-gray-500">
                      Automatically play the next video in a lesson
                    </p>
                  </div>
                  <Switch
                    checked={user?.preferences?.learning?.autoplay || false}
                    onCheckedChange={(checked) => 
                      updateNestedPreference('learning', 'autoplay', checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Help Settings */}
        <TabsContent value="help">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Contact Support
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Report a Bug
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Feature Request
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About GrowthGround</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Version:</strong> 1.0.0</p>
                  <p><strong>Last Updated:</strong> January 2024</p>
                  <p><strong>Terms of Service:</strong> <a href="#" className="text-blue-600 hover:underline">View</a></p>
                  <p><strong>Privacy Policy:</strong> <a href="#" className="text-blue-600 hover:underline">View</a></p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}