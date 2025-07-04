'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/components/providers/session-provider';
import { createClient } from '@/lib/supabase/client';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Sidebar } from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  Bell, 
  Shield, 
  Camera,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

export default function ProfilePage() {
  const { user } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar_url: '',
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    email_notifications: true,
    push_notifications: false,
    reminder_notifications: true,
    profile_visible: true,
    progress_visible: true,
    daily_goal_minutes: 30,
    reminder_time: '09:00',
    autoplay: true,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Redirect unauthenticated users
  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    } else {
      fetchUserProfile();
      loadPreferences();
    }
  }, [user, router]);

  // Fetch user profile data from Supabase
  const fetchUserProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    const supabase = createClient();
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      setProfile(data);
      setFormData({
        name: data?.name || '',
        email: user.email || '',
        avatar_url: data?.avatar_url || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load user preferences
  const loadPreferences = async () => {
    if (!user) return;

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading preferences:', error);
        return;
      }

      if (data) {
        setPreferences({
          theme: data.theme || 'light',
          email_notifications: data.email_notifications ?? true,
          push_notifications: data.push_notifications ?? false,
          reminder_notifications: data.reminder_notifications ?? true,
          profile_visible: data.profile_visible ?? true,
          progress_visible: data.progress_visible ?? true,
          daily_goal_minutes: data.daily_goal_minutes || 30,
          reminder_time: data.reminder_time || '09:00',
          autoplay: data.autoplay ?? true,
        });
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreferenceChange = (field: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    setMessage(null);
    
    const supabase = createClient();
    
    try {
      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          avatar_url: formData.avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
      
      if (profileError) throw profileError;
      
      // Update preferences
      const { error: prefError } = await supabase
        .from('user_preferences')
        .upsert({
          id: user.id,
          ...preferences,
          updated_at: new Date().toISOString(),
        });
      
      if (prefError) throw prefError;
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error saving profile:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!user) return;
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return null;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      setMessage({ type: 'success', text: 'Password updated successfully!' });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      console.error('Error updating password:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to update password' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    setIsSaving(true);
    setMessage(null);

    try {
      const supabase = createClient();
      
      // Delete user data
      await supabase.from('user_preferences').delete().eq('id', user.id);
      await supabase.from('user_progress').delete().eq('user_id', user.id);
      await supabase.from('user_lesson_completions').delete().eq('user_id', user.id);
      await supabase.from('profiles').delete().eq('id', user.id);

      // Sign out and redirect
      await supabase.auth.signOut();
      router.push('/');
    } catch (error: any) {
      console.error('Error deleting account:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to delete account' });
    } finally {
      setIsSaving(false);
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar currentPage="profile" />

        <main className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-4">Profile Settings</h1>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <p className="text-sm text-gray-500">Profile details …</p>
              </TabsContent>

              <TabsContent value="preferences">
                <p className="text-sm text-gray-500">Preferences …</p>
              </TabsContent>

              <TabsContent value="security">
                <p className="text-sm text-gray-500">Security …</p>
              </TabsContent>

              <TabsContent value="notifications">
                <p className="text-sm text-gray-500">Notifications …</p>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}