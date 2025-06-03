
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, StickyNote } from "lucide-react";
import { dataService } from "@/services/dataService";
import { useToast } from "@/hooks/use-toast";

interface QuickNote {
  id: string;
  content: string;
  createdAt: Date;
}

export const QuickNotes = () => {
  const [quickNotes, setQuickNotes] = useState<QuickNote[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const data = dataService.getData();
    setQuickNotes(data.quickNotes);
  }, []);

  const addQuickNote = () => {
    if (!newNote.trim()) return;

    const note: QuickNote = {
      id: Date.now().toString(),
      content: newNote,
      createdAt: new Date()
    };

    const data = dataService.getData();
    data.quickNotes.unshift(note);
    dataService.saveData(data);
    dataService.addActivity({
      type: "created",
      title: "Added quick note",
      timestamp: new Date()
    });

    setQuickNotes(data.quickNotes);
    setNewNote("");
    setIsAdding(false);
    
    toast({
      title: "Quick note added",
      description: "Your note has been saved successfully.",
    });
  };

  const deleteQuickNote = (id: string) => {
    const data = dataService.getData();
    data.quickNotes = data.quickNotes.filter(note => note.id !== id);
    dataService.saveData(data);
    setQuickNotes(data.quickNotes);
    
    toast({
      title: "Note deleted",
      description: "Quick note has been removed.",
    });
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-yellow-50 to-orange-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <StickyNote className="h-5 w-5" />
          Quick Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {isAdding && (
          <div className="space-y-2">
            <Textarea
              placeholder="Type your quick note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
              className="border-orange-200 focus:border-orange-400"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={addQuickNote} className="bg-orange-500 hover:bg-orange-600">
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {quickNotes.slice(0, 5).map((note) => (
            <div key={note.id} className="p-3 bg-white rounded-lg border border-orange-200 group hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start gap-2">
                <p className="text-sm text-slate-700 flex-1">{note.content}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteQuickNote(note.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 text-red-500 hover:text-red-700"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <p className="text-xs text-orange-600 mt-1">
                {new Date(note.createdAt).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
        
        {!isAdding && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsAdding(true)}
            className="w-full border-orange-300 text-orange-700 hover:bg-orange-100 gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Quick Note
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
