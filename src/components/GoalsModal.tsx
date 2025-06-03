
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Plus, Target, Edit, Trash2 } from "lucide-react";
import { dataService } from "@/services/dataService";
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  deadline: string;
}

interface GoalsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GoalsModal = ({ open, onOpenChange }: GoalsModalProps) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    deadline: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      const data = dataService.getData();
      setGoals(data.goals);
    }
  }, [open]);

  const addGoal = () => {
    if (!newGoal.title.trim() || !newGoal.target) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      current: 0,
      target: parseInt(newGoal.target),
      deadline: newGoal.deadline || "No deadline"
    };

    const data = dataService.getData();
    data.goals.push(goal);
    dataService.saveData(data);
    setGoals(data.goals);
    setNewGoal({ title: "", target: "", deadline: "" });
    
    toast({
      title: "Goal added",
      description: "Your new goal has been created.",
    });
  };

  const updateGoalProgress = (id: string, newCurrent: number) => {
    const data = dataService.getData();
    const goalIndex = data.goals.findIndex(g => g.id === id);
    if (goalIndex !== -1) {
      data.goals[goalIndex].current = Math.max(0, Math.min(newCurrent, data.goals[goalIndex].target));
      dataService.saveData(data);
      setGoals(data.goals);
    }
  };

  const deleteGoal = (id: string) => {
    const data = dataService.getData();
    data.goals = data.goals.filter(g => g.id !== id);
    dataService.saveData(data);
    setGoals(data.goals);
    
    toast({
      title: "Goal deleted",
      description: "Goal has been removed.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Goals Management
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Add New Goal */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Add New Goal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Goal title..."
                value={newGoal.title}
                onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Target number"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                />
                <Input
                  placeholder="Deadline (optional)"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                />
              </div>
              <Button onClick={addGoal} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add Goal
              </Button>
            </CardContent>
          </Card>

          {/* Goals List */}
          <div className="space-y-4">
            {goals.map((goal) => (
              <Card key={goal.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{goal.title}</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteGoal(goal.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span>Progress: {goal.current}/{goal.target}</span>
                      <span className="text-slate-600">{goal.deadline}</span>
                    </div>
                    <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                    
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateGoalProgress(goal.id, goal.current - 1)}
                        disabled={goal.current <= 0}
                      >
                        -
                      </Button>
                      <span className="text-sm font-medium w-16 text-center">
                        {goal.current}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateGoalProgress(goal.id, goal.current + 1)}
                        disabled={goal.current >= goal.target}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
