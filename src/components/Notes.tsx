import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Trash2, 
  StickyNote,
  Tag,
  Calendar,
  Edit
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { dataService } from "@/services/dataService";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    const data = dataService.getData();
    setNotes(data.notes);
  }, []);

  const createNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast({
        title: "Invalid note",
        description: "Please provide both title and content.",
        variant: "destructive"
      });
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const data = dataService.getData();
    data.notes.unshift(note);
    dataService.saveData(data);
    dataService.addActivity({
      type: "created",
      title: `Created note: ${note.title}`,
      timestamp: new Date()
    });

    setNotes(data.notes);
    setNewNote({ title: "", content: "", tags: "" });
    setIsCreating(false);
    
    toast({
      title: "Note created",
      description: "Your new note has been saved successfully.",
    });
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    const data = dataService.getData();
    const noteIndex = data.notes.findIndex(n => n.id === id);
    if (noteIndex !== -1) {
      data.notes[noteIndex] = { ...data.notes[noteIndex], ...updates, updatedAt: new Date() };
      dataService.saveData(data);
      dataService.addActivity({
        type: "updated",
        title: `Updated note: ${data.notes[noteIndex].title}`,
        timestamp: new Date()
      });
      setNotes(data.notes);
    }
    setEditingId(null);
    
    toast({
      title: "Note updated",
      description: "Your changes have been saved.",
    });
  };

  const deleteNote = (id: string) => {
    const data = dataService.getData();
    const note = data.notes.find(n => n.id === id);
    data.notes = data.notes.filter(n => n.id !== id);
    dataService.saveData(data);
    
    if (note) {
      dataService.addActivity({
        type: "deleted",
        title: `Deleted note: ${note.title}`,
        timestamp: new Date()
      });
    }

    setNotes(data.notes);
    toast({
      title: "Note deleted",
      description: "The note has been removed.",
    });
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const allTags = [...new Set(notes.flatMap(note => note.tags))];

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 rounded-3xl"></div>
        <div className="relative p-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-3">
            Notes
          </h2>
          <p className="text-slate-600 text-lg">Capture your thoughts and ideas instantly.</p>
        </div>
      </div>

      {/* Stats and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{notes.length}</p>
            <p className="text-sm text-slate-600">Total Notes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{allTags.length}</p>
            <p className="text-sm text-slate-600">Tags</p>
          </div>
        </div>
        
        <Button 
          onClick={() => setIsCreating(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search notes by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {allTags.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-slate-600 mb-2">Popular tags:</p>
              <div className="flex flex-wrap gap-2">
                {allTags.slice(0, 8).map(tag => (
                  <Badge 
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-slate-100"
                    onClick={() => setSearchTerm(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create New Note Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Note
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
            />
            
            <Textarea
              placeholder="Write your note content here..."
              value={newNote.content}
              onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
              rows={6}
            />
            
            <Input
              placeholder="Tags (comma separated)..."
              value={newNote.tags}
              onChange={(e) => setNewNote(prev => ({ ...prev, tags: e.target.value }))}
            />
            
            <div className="flex items-center gap-2">
              <Button onClick={createNote}>Save Note</Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsCreating(false);
                  setNewNote({ title: "", content: "", tags: "" });
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-500">
            <StickyNote className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">No notes found</p>
            <p className="text-sm">
              {searchTerm ? "Try adjusting your search terms" : "Create your first note to get started"}
            </p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  {editingId === note.id ? (
                    <Input
                      defaultValue={note.title}
                      onBlur={(e) => updateNote(note.id, { title: e.target.value })}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          updateNote(note.id, { title: e.currentTarget.value });
                        }
                      }}
                      className="text-lg font-semibold border-none p-0 h-auto focus:ring-0"
                      autoFocus
                    />
                  ) : (
                    <h3 
                      className="text-lg font-semibold cursor-pointer hover:text-blue-600"
                      onClick={() => setEditingId(note.id)}
                    >
                      {note.title}
                    </h3>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingId(editingId === note.id ? null : note.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNote(note.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {editingId === note.id ? (
                  <Textarea
                    defaultValue={note.content}
                    onBlur={(e) => updateNote(note.id, { content: e.target.value })}
                    rows={4}
                    className="resize-none"
                  />
                ) : (
                  <p className="text-sm text-slate-600 line-clamp-4">
                    {note.content}
                  </p>
                )}
                
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {note.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {note.createdAt.toLocaleDateString()}
                  </div>
                  {note.updatedAt.getTime() !== note.createdAt.getTime() && (
                    <span>Updated {note.updatedAt.toLocaleDateString()}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
