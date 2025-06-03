
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  User
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

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "editor":
        return <TextEditor />;
      case "todos":
        return <TodoList />;
      case "notes":
        return <Notes />;
      case "calendar":
        return <CalendarView />;
      case "files":
        return <FileManager />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">TaskFlows</h1>
              <p className="text-slate-600 text-sm">Your productivity workspace</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search everything..."
                  className="pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </Button>
              
              <Button variant="ghost" size="sm">
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
