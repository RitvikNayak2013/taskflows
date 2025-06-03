
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckSquare, 
  FileText, 
  StickyNote, 
  Calendar,
  Clock,
  TrendingUp,
  Target,
  Activity,
  Zap,
  Plus
} from "lucide-react";
import { dataService } from "@/services/dataService";
import { QuickNotes } from "@/components/QuickNotes";
import { GoalsModal } from "@/components/GoalsModal";

export const Dashboard = () => {
  const [stats, setStats] = useState(dataService.getStats());
  const [activityLog, setActivityLog] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [goalsModalOpen, setGoalsModalOpen] = useState(false);

  useEffect(() => {
    const data = dataService.getData();
    setStats(dataService.getStats());
    setActivityLog(data.activityLog.slice(0, 5));
    setGoals(data.goals.slice(0, 3));
    setEvents(data.events.slice(0, 3));
  }, []);

  const refreshData = () => {
    const data = dataService.getData();
    setStats(dataService.getStats());
    setActivityLog(data.activityLog.slice(0, 5));
    setGoals(data.goals.slice(0, 3));
    setEvents(data.events.slice(0, 3));
  };

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl"></div>
        <div className="relative p-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Dashboard
          </h2>
          <p className="text-slate-600 text-lg">Welcome back! Here's your productivity overview.</p>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white transform hover:scale-105 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-medium opacity-90">Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <CheckSquare className="h-8 w-8" />
              </div>
              <div>
                <span className="text-3xl font-bold">{stats.completedTasks}</span>
                <span className="text-lg opacity-75">/{stats.totalTasks}</span>
              </div>
            </div>
            <p className="text-xs opacity-75 mt-2">
              {stats.totalTasks > 0 ? `${Math.round((stats.completedTasks / stats.totalTasks) * 100)}% completion rate` : "No tasks yet"}
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white transform hover:scale-105 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-medium opacity-90">Notes & Documents</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <FileText className="h-8 w-8" />
              </div>
              <span className="text-3xl font-bold">{stats.totalNotes + stats.totalDocuments}</span>
            </div>
            <p className="text-xs opacity-75 mt-2">
              {stats.totalNotes} notes, {stats.totalDocuments} documents
            </p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white transform hover:scale-105 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-medium opacity-90">Quick Notes</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <StickyNote className="h-8 w-8" />
              </div>
              <span className="text-3xl font-bold">{stats.totalQuickNotes}</span>
            </div>
            <p className="text-xs opacity-75 mt-2">Ready for quick capture</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white transform hover:scale-105 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-medium opacity-90">Productivity</CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <TrendingUp className="h-8 w-8" />
              </div>
              <span className="text-3xl font-bold">{stats.productivity}%</span>
            </div>
            <p className="text-xs opacity-75 mt-2">Based on task completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-xl border-0 bg-gradient-to-br from-slate-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800">
              <Activity className="h-5 w-5 text-blue-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activityLog.length > 0 ? (
              activityLog.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Zap className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{activity.title}</p>
                    <p className="text-xs text-slate-600">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500">
                <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No recent activity. Start using the app to see your activity here!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Notes */}
        <QuickNotes />
      </div>

      {/* Goals and Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Goals */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-emerald-50 to-green-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Target className="h-5 w-5" />
                Today's Goals
              </CardTitle>
              <Button 
                onClick={() => setGoalsModalOpen(true)}
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 gap-2"
              >
                <Plus className="h-4 w-4" />
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.length > 0 ? (
              goals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-emerald-900">{goal.title}</span>
                    <span className="text-sm text-emerald-700">{goal.current}/{goal.target}</span>
                  </div>
                  <Progress 
                    value={(goal.current / goal.target) * 100} 
                    className="h-3 bg-emerald-100" 
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-emerald-600">
                <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No goals set yet. Click Manage to add some!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="shadow-xl border-0 bg-gradient-to-br from-violet-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-violet-800">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="p-4 bg-white rounded-xl border border-violet-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-violet-100 rounded-lg">
                      <Clock className="h-4 w-4 text-violet-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-violet-900">{event.title}</p>
                      <p className="text-sm text-violet-600">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <GoalsModal 
        open={goalsModalOpen} 
        onOpenChange={setGoalsModalOpen}
      />
    </div>
  );
};
