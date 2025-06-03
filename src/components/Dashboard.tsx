
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
  Activity
} from "lucide-react";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h2>
        <p className="text-slate-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Tasks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckSquare className="h-8 w-8" />
              <span className="text-2xl font-bold">12</span>
            </div>
            <p className="text-xs opacity-75 mt-1">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="h-8 w-8" />
              <span className="text-2xl font-bold">8</span>
            </div>
            <p className="text-xs opacity-75 mt-1">2 edited today</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <StickyNote className="h-8 w-8" />
              <span className="text-2xl font-bold">24</span>
            </div>
            <p className="text-xs opacity-75 mt-1">5 new this week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90">Productivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8" />
              <span className="text-2xl font-bold">87%</span>
            </div>
            <p className="text-xs opacity-75 mt-1">+12% this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <CheckSquare className="h-4 w-4 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Completed "Design Review"</p>
                <p className="text-xs text-slate-600">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <FileText className="h-4 w-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Updated "Project Plan.md"</p>
                <p className="text-xs text-slate-600">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <StickyNote className="h-4 w-4 text-purple-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Created new note</p>
                <p className="text-xs text-slate-600">1 hour ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Today's Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Complete project tasks</span>
                <span className="text-sm text-slate-600">4/6</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Review documents</span>
                <span className="text-sm text-slate-600">2/3</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Team meetings</span>
                <span className="text-sm text-slate-600">1/2</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
            <Button className="w-full mt-4">View All Goals</Button>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Team Standup</span>
              </div>
              <p className="text-xs text-blue-700">Today, 10:00 AM</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Client Review</span>
              </div>
              <p className="text-xs text-green-700">Tomorrow, 2:00 PM</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Sprint Planning</span>
              </div>
              <p className="text-xs text-purple-700">Friday, 9:00 AM</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
