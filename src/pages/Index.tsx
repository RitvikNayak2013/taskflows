
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  StickyNote, 
  Calendar, 
  Settings, 
  FolderOpen, 
  BarChart3,
  Search,
  Bell,
  User,
  RefreshCw
} from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
import { TextEditor } from "@/components/TextEditor";
import { TodoList } from "@/components/TodoList";
import { Notes } from "@/components/Notes";
import { CalendarView } from "@/components/CalendarView";
import { FileManager } from "@/components/FileManager";
import { Analytics } from "@/components/Analytics";
import { SettingsPage } from "@/components/SettingsPage";
import { Logo } from "@/components/Logo";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [refreshKey, setRefreshKey] = useState(0);

  const renderContent = () => {
    const key = `${activeTab}-${refreshKey}`;
    switch (activeTab) {
      case "dashboard":
        return <Dashboard key={key} />;
      case "editor":
        return <TextEditor key={key} />;
      case "todos":
        return <TodoList key={key} />;
      case "notes":
        return <Notes key={key} />;
      case "calendar":
        return <CalendarView key={key} />;
      case "files":
        return <FileManager key={key} />;
      case "analytics":
        return <Analytics key={key} />;
      case "settings":
        return <SettingsPage key={key} />;
      default:
        return <Dashboard key={key} />;
    }
  };

  const refreshCurrentTab = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Header */}
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/60 px-8 py-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Logo size="lg" />
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search everything..."
                  className="pl-10 pr-4 py-3 bg-slate-100/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-72 text-sm transition-all"
                />
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={refreshCurrentTab}
                className="relative hover:bg-blue-50 transition-colors rounded-xl p-3"
                title="Refresh current view"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" size="sm" className="relative hover:bg-blue-50 transition-colors rounded-xl p-3">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">3</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-colors rounded-xl p-3">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
