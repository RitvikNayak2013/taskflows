
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  StickyNote, 
  Calendar, 
  Settings, 
  FolderOpen, 
  BarChart3
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "editor", label: "Text Editor", icon: FileText },
    { id: "todos", label: "To-Do Lists", icon: CheckSquare },
    { id: "notes", label: "Notes", icon: StickyNote },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "files", label: "File Manager", icon: FolderOpen },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-white/90 backdrop-blur-sm border-r border-slate-200 p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start gap-3 transition-all duration-200 ${
                activeTab === item.id 
                  ? "bg-blue-600 text-white shadow-lg" 
                  : "hover:bg-slate-100 text-slate-700"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
