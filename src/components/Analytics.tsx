
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Target,
  Activity,
  Calendar,
  CheckSquare,
  FileText
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

export const Analytics = () => {
  const weeklyData = [
    { day: "Mon", tasks: 8, documents: 3, notes: 5 },
    { day: "Tue", tasks: 12, documents: 5, notes: 8 },
    { day: "Wed", tasks: 6, documents: 2, notes: 3 },
    { day: "Thu", tasks: 15, documents: 7, notes: 12 },
    { day: "Fri", tasks: 10, documents: 4, notes: 6 },
    { day: "Sat", tasks: 4, documents: 1, notes: 2 },
    { day: "Sun", tasks: 3, documents: 1, notes: 1 }
  ];

  const productivityData = [
    { time: "9 AM", focus: 75 },
    { time: "10 AM", focus: 85 },
    { time: "11 AM", focus: 90 },
    { time: "12 PM", focus: 70 },
    { time: "1 PM", focus: 60 },
    { time: "2 PM", focus: 80 },
    { time: "3 PM", focus: 95 },
    { time: "4 PM", focus: 85 },
    { time: "5 PM", focus: 75 }
  ];

  const categoryData = [
    { name: "Work", value: 45, color: "#3b82f6" },
    { name: "Personal", value: 25, color: "#10b981" },
    { name: "Learning", value: 20, color: "#8b5cf6" },
    { name: "Health", value: 10, color: "#f59e0b" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Analytics</h2>
        <p className="text-slate-600">Track your productivity and performance metrics.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckSquare className="h-8 w-8" />
              <div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm opacity-90">Task Completion</p>
              </div>
            </div>
            <div className="mt-3">
              <Progress value={87} className="h-2 bg-blue-400" />
              <p className="text-xs opacity-75 mt-1">+5% from last week</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8" />
              <div>
                <p className="text-2xl font-bold">6.5h</p>
                <p className="text-sm opacity-90">Daily Focus Time</p>
              </div>
            </div>
            <div className="mt-3">
              <Progress value={81} className="h-2 bg-green-400" />
              <p className="text-xs opacity-75 mt-1">+0.5h from yesterday</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8" />
              <div>
                <p className="text-2xl font-bold">12/15</p>
                <p className="text-sm opacity-90">Weekly Goals</p>
              </div>
            </div>
            <div className="mt-3">
              <Progress value={80} className="h-2 bg-purple-400" />
              <p className="text-xs opacity-75 mt-1">3 goals remaining</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8" />
              <div>
                <p className="text-2xl font-bold">+15%</p>
                <p className="text-sm opacity-90">Productivity Growth</p>
              </div>
            </div>
            <div className="mt-3">
              <Progress value={92} className="h-2 bg-orange-400" />
              <p className="text-xs opacity-75 mt-1">Best month so far</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Weekly Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="#3b82f6" name="Tasks" />
                <Bar dataKey="documents" fill="#10b981" name="Documents" />
                <Bar dataKey="notes" fill="#8b5cf6" name="Notes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Focus Time Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Daily Focus Pattern
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="focus" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  name="Focus Level %" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* More detailed insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Task Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <Target className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Goal Achiever</p>
                <p className="text-xs text-slate-600">Completed all weekly goals</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Focus Master</p>
                <p className="text-xs text-slate-600">Maintained 8+ hours focus time</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-full">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Productivity Pro</p>
                <p className="text-xs text-slate-600">15% improvement this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-blue-600" />
                <span className="text-sm">Tasks Completed</span>
              </div>
              <span className="text-lg font-bold">247</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-green-600" />
                <span className="text-sm">Documents Created</span>
              </div>
              <span className="text-lg font-bold">18</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span className="text-sm">Active Days</span>
              </div>
              <span className="text-lg font-bold">22/30</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-sm">Total Focus Time</span>
              </div>
              <span className="text-lg font-bold">143h</span>
            </div>

            <div className="pt-4 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">A+</p>
                <p className="text-xs text-slate-600">Productivity Grade</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
