
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  User, 
  Bell, 
  Palette, 
  Shield,
  Download,
  Trash2,
  Save
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SettingsPage = () => {
  const [settings, setSettings] = useState({
    // Profile
    name: "John Doe",
    email: "john.doe@example.com",
    timezone: "UTC-5",
    
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    taskReminders: true,
    weeklyReports: true,
    
    // Appearance
    theme: "light",
    compactMode: false,
    animations: true,
    
    // Privacy
    dataSharing: false,
    analyticsTracking: true,
    
    // Productivity
    autoSave: true,
    workingHours: "9-17",
    breakReminders: true
  });

  const { toast } = useToast();

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    // In a real app, this would save to backend/localStorage
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const exportData = () => {
    // Mock data export
    const data = {
      settings,
      exportDate: new Date().toISOString(),
      version: "1.0"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'taskflows-data.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data exported",
      description: "Your data has been downloaded successfully.",
    });
  };

  const clearAllData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      toast({
        title: "Data cleared",
        description: "All your data has been removed.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Settings</h2>
        <p className="text-slate-600">Customize your TaskFlows experience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={settings.name}
                onChange={(e) => updateSetting("name", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => updateSetting("email", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                  <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                  <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-slate-600">Receive updates via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-slate-600">Browser notifications</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Task Reminders</Label>
                <p className="text-sm text-slate-600">Get reminded about due tasks</p>
              </div>
              <Switch
                checked={settings.taskReminders}
                onCheckedChange={(checked) => updateSetting("taskReminders", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Reports</Label>
                <p className="text-sm text-slate-600">Productivity summaries</p>
              </div>
              <Switch
                checked={settings.weeklyReports}
                onCheckedChange={(checked) => updateSetting("weeklyReports", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={settings.theme} onValueChange={(value) => updateSetting("theme", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Compact Mode</Label>
                <p className="text-sm text-slate-600">Reduce spacing and padding</p>
              </div>
              <Switch
                checked={settings.compactMode}
                onCheckedChange={(checked) => updateSetting("compactMode", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Animations</Label>
                <p className="text-sm text-slate-600">Enable smooth transitions</p>
              </div>
              <Switch
                checked={settings.animations}
                onCheckedChange={(checked) => updateSetting("animations", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Data Sharing</Label>
                <p className="text-sm text-slate-600">Share anonymous usage data</p>
              </div>
              <Switch
                checked={settings.dataSharing}
                onCheckedChange={(checked) => updateSetting("dataSharing", checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Analytics Tracking</Label>
                <p className="text-sm text-slate-600">Help improve our service</p>
              </div>
              <Switch
                checked={settings.analyticsTracking}
                onCheckedChange={(checked) => updateSetting("analyticsTracking", checked)}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Button onClick={exportData} variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Export My Data
              </Button>
              
              <Button onClick={clearAllData} variant="destructive" className="w-full gap-2">
                <Trash2 className="h-4 w-4" />
                Clear All Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Productivity Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Productivity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Save</Label>
                <p className="text-sm text-slate-600">Automatically save changes</p>
              </div>
              <Switch
                checked={settings.autoSave}
                onCheckedChange={(checked) => updateSetting("autoSave", checked)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Working Hours</Label>
              <Select value={settings.workingHours} onValueChange={(value) => updateSetting("workingHours", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8-16">8 AM - 4 PM</SelectItem>
                  <SelectItem value="9-17">9 AM - 5 PM</SelectItem>
                  <SelectItem value="10-18">10 AM - 6 PM</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Break Reminders</Label>
                <p className="text-sm text-slate-600">Remind me to take breaks</p>
              </div>
              <Switch
                checked={settings.breakReminders}
                onCheckedChange={(checked) => updateSetting("breakReminders", checked)}
              />
            </div>
            
            <Separator />
            
            <Button onClick={saveSettings} className="w-full gap-2">
              <Save className="h-4 w-4" />
              Save All Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
