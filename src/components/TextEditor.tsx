
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Bold, 
  Italic, 
  Underline, 
  Save, 
  Download, 
  FileText,
  Plus,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  title: string;
  content: string;
  lastModified: Date;
}

export const TextEditor = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "Welcome Document",
      content: "Welcome to TaskFlows text editor! Start typing here...",
      lastModified: new Date()
    }
  ]);
  
  const [activeDoc, setActiveDoc] = useState<string>("1");
  const [title, setTitle] = useState("Welcome Document");
  const editorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const currentDoc = documents.find(doc => doc.id === activeDoc);

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleSave = () => {
    if (editorRef.current && currentDoc) {
      const content = editorRef.current.innerHTML;
      setDocuments(docs => 
        docs.map(doc => 
          doc.id === activeDoc 
            ? { ...doc, title, content, lastModified: new Date() }
            : doc
        )
      );
      
      toast({
        title: "Document saved",
        description: "Your changes have been saved successfully.",
      });
    }
  };

  const handleDownload = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerText;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Document downloaded",
        description: "Your document has been downloaded successfully.",
      });
    }
  };

  const createNewDocument = () => {
    const newDoc: Document = {
      id: Date.now().toString(),
      title: "Untitled Document",
      content: "",
      lastModified: new Date()
    };
    
    setDocuments(prev => [...prev, newDoc]);
    setActiveDoc(newDoc.id);
    setTitle(newDoc.title);
    
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
  };

  const deleteDocument = (docId: string) => {
    if (documents.length === 1) {
      toast({
        title: "Cannot delete",
        description: "You need at least one document.",
        variant: "destructive"
      });
      return;
    }
    
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    
    if (activeDoc === docId) {
      const remainingDocs = documents.filter(doc => doc.id !== docId);
      if (remainingDocs.length > 0) {
        setActiveDoc(remainingDocs[0].id);
        setTitle(remainingDocs[0].title);
      }
    }
    
    toast({
      title: "Document deleted",
      description: "The document has been removed.",
    });
  };

  const switchDocument = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
      setActiveDoc(docId);
      setTitle(doc.title);
      if (editorRef.current) {
        editorRef.current.innerHTML = doc.content;
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Text Editor</h2>
        <p className="text-slate-600">Create and edit your documents with rich formatting.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Document List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Documents</CardTitle>
              <Button onClick={createNewDocument} size="sm" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeDoc === doc.id 
                    ? "bg-blue-100 border-blue-300 border-2" 
                    : "bg-slate-50 hover:bg-slate-100 border border-slate-200"
                }`}
                onClick={() => switchDocument(doc.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{doc.title}</p>
                    <p className="text-xs text-slate-500">
                      {doc.lastModified.toLocaleDateString()}
                    </p>
                  </div>
                  {documents.length > 1 && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDocument(doc.id);
                      }}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Editor */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-semibold bg-transparent border-none p-0 h-auto focus:ring-0"
                placeholder="Document title..."
              />
              <div className="flex items-center gap-2">
                <Button onClick={handleSave} size="sm" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                <Button onClick={handleDownload} variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Formatting Toolbar */}
            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => executeCommand('bold')}
                className="h-8 w-8 p-0"
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => executeCommand('italic')}
                className="h-8 w-8 p-0"
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => executeCommand('underline')}
                className="h-8 w-8 p-0"
                title="Underline"
              >
                <Underline className="h-4 w-4" />
              </Button>
              
              <div className="w-px h-6 bg-slate-300 mx-2" />
              
              <select
                onChange={(e) => executeCommand('fontSize', e.target.value)}
                className="text-sm bg-transparent border-none focus:outline-none"
              >
                <option value="1">Small</option>
                <option value="3" selected>Normal</option>
                <option value="5">Large</option>
                <option value="7">Extra Large</option>
              </select>
              
              <select
                onChange={(e) => executeCommand('foreColor', e.target.value)}
                className="text-sm bg-transparent border-none focus:outline-none"
              >
                <option value="black">Black</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
              </select>
            </div>

            {/* Editor Area */}
            <div
              ref={editorRef}
              contentEditable
              className="min-h-96 p-4 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ 
                lineHeight: '1.6',
                fontSize: '16px',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
              dangerouslySetInnerHTML={{ __html: currentDoc?.content || "" }}
              onInput={handleSave}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
