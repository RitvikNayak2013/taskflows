
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Trash2, 
  Calendar,
  Flag,
  Filter,
  CheckSquare,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: string;
  dueDate?: string;
  createdAt: Date;
}

export const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete project proposal",
      completed: false,
      priority: "high",
      category: "Work",
      dueDate: "2024-01-15",
      createdAt: new Date()
    },
    {
      id: "2",
      title: "Review design mockups",
      completed: true,
      priority: "medium",
      category: "Design",
      createdAt: new Date()
    },
    {
      id: "3",
      title: "Schedule team meeting",
      completed: false,
      priority: "low",
      category: "Management",
      createdAt: new Date()
    }
  ]);
  
  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState<"low" | "medium" | "high">("medium");
  const [newCategory, setNewCategory] = useState("Work");
  const [newDueDate, setNewDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  const categories = ["Work", "Personal", "Design", "Development", "Management", "Health"];

  const addTask = () => {
    if (!newTask.trim()) {
      toast({
        title: "Invalid task",
        description: "Please enter a task title.",
        variant: "destructive"
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      priority: newPriority,
      category: newCategory,
      dueDate: newDueDate || undefined,
      createdAt: new Date()
    };

    setTasks(prev => [task, ...prev]);
    setNewTask("");
    setNewDueDate("");
    
    toast({
      title: "Task added",
      description: "Your new task has been created successfully.",
    });
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed from your list.",
    });
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case "completed":
        return task.completed;
      case "pending":
        return !task.completed;
      case "high":
        return task.priority === "high";
      case "medium":
        return task.priority === "medium";
      case "low":
        return task.priority === "low";
      default:
        return true;
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityBadgeVariant = (priority: string): "default" | "secondary" | "destructive" => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">To-Do Lists</h2>
        <p className="text-slate-600">Organize your tasks and boost your productivity.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalCount}</p>
                <p className="text-sm text-slate-600">Total Tasks</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedCount}</p>
                <p className="text-sm text-slate-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalCount - completedCount}</p>
                <p className="text-sm text-slate-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Task */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Task
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Enter task title..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
            />
            
            <Select value={newCategory} onValueChange={setNewCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={newPriority} onValueChange={(value: "low" | "medium" | "high") => setNewPriority(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>
            
            <Input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
            />
            
            <Button onClick={addTask} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filter and Task List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Tasks</CardTitle>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <CheckSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No tasks found matching your filter.</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 ${
                    task.completed 
                      ? "bg-green-50 border-green-200" 
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                  />
                  
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                  
                  <div className="flex-1">
                    <p className={`font-medium ${task.completed ? "line-through text-slate-500" : "text-slate-800"}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {task.category}
                      </Badge>
                      <Badge variant={getPriorityBadgeVariant(task.priority)} className="text-xs">
                        {task.priority}
                      </Badge>
                      {task.dueDate && (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Calendar className="h-3 w-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
