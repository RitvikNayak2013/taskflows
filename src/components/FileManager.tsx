
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  FolderOpen, 
  File, 
  Upload, 
  Download, 
  Trash2,
  Search,
  Grid,
  List,
  Plus,
  FileText,
  Image,
  Video,
  Music
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: number;
  mimeType?: string;
  createdAt: Date;
  modifiedAt: Date;
  parent?: string;
}

export const FileManager = () => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: "1",
      name: "Documents",
      type: "folder",
      createdAt: new Date(2024, 0, 10),
      modifiedAt: new Date(2024, 0, 10)
    },
    {
      id: "2",
      name: "Images",
      type: "folder",
      createdAt: new Date(2024, 0, 11),
      modifiedAt: new Date(2024, 0, 12)
    },
    {
      id: "3",
      name: "project-plan.pdf",
      type: "file",
      size: 2048000,
      mimeType: "application/pdf",
      createdAt: new Date(2024, 0, 12),
      modifiedAt: new Date(2024, 0, 12)
    },
    {
      id: "4",
      name: "presentation.pptx",
      type: "file",
      size: 5120000,
      mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      createdAt: new Date(2024, 0, 13),
      modifiedAt: new Date(2024, 0, 14)
    }
  ]);
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const { toast } = useToast();

  const getFileIcon = (file: FileItem) => {
    if (file.type === "folder") return FolderOpen;
    
    if (file.mimeType?.startsWith("image/")) return Image;
    if (file.mimeType?.startsWith("video/")) return Video;
    if (file.mimeType?.startsWith("audio/")) return Music;
    if (file.mimeType?.includes("pdf") || file.mimeType?.includes("document")) return FileText;
    
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const filteredFiles = files.filter(file => 
    file.parent === currentFolder &&
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createFolder = () => {
    if (!newFolderName.trim()) {
      toast({
        title: "Invalid name",
        description: "Please enter a folder name.",
        variant: "destructive"
      });
      return;
    }

    const newFolder: FileItem = {
      id: Date.now().toString(),
      name: newFolderName,
      type: "folder",
      createdAt: new Date(),
      modifiedAt: new Date(),
      parent: currentFolder || undefined
    };

    setFiles(prev => [...prev, newFolder]);
    setNewFolderName("");
    setShowCreateFolder(false);
    
    toast({
      title: "Folder created",
      description: `Folder "${newFolderName}" has been created.`,
    });
  };

  const deleteFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    toast({
      title: "File deleted",
      description: "The file has been removed.",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    Array.from(uploadedFiles).forEach(file => {
      const newFile: FileItem = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: "file",
        size: file.size,
        mimeType: file.type,
        createdAt: new Date(),
        modifiedAt: new Date(),
        parent: currentFolder || undefined
      };

      setFiles(prev => [...prev, newFile]);
    });

    toast({
      title: "Files uploaded",
      description: `${uploadedFiles.length} file(s) uploaded successfully.`,
    });
  };

  const totalFiles = files.filter(f => f.type === "file").length;
  const totalFolders = files.filter(f => f.type === "folder").length;
  const totalSize = files
    .filter(f => f.type === "file" && f.size)
    .reduce((acc, f) => acc + (f.size || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">File Manager</h2>
        <p className="text-slate-600">Organize and manage your files and folders.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <File className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalFiles}</p>
                <p className="text-sm text-slate-600">Files</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FolderOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalFolders}</p>
                <p className="text-sm text-slate-600">Folders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Upload className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatFileSize(totalSize)}</p>
                <p className="text-sm text-slate-600">Total Size</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Upload className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-orange-600">Upload Files</p>
                  <p className="text-xs text-slate-600">Click to select</p>
                </div>
              </div>
            </label>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search files and folders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              {currentFolder && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentFolder(null)}
                >
                  Back to Root
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCreateFolder(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                New Folder
              </Button>
              
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {showCreateFolder && (
            <div className="mt-4 flex items-center gap-2">
              <Input
                placeholder="Folder name..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && createFolder()}
                className="max-w-xs"
              />
              <Button onClick={createFolder} size="sm">Create</Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setShowCreateFolder(false);
                  setNewFolderName("");
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* File List */}
      <Card>
        <CardContent className="p-4">
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <FolderOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">No files found</p>
              <p className="text-sm">
                {searchTerm ? "Try adjusting your search terms" : "Upload files or create folders to get started"}
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredFiles.map((file) => {
                const Icon = getFileIcon(file);
                return (
                  <div
                    key={file.id}
                    className="p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors cursor-pointer"
                    onDoubleClick={() => file.type === "folder" && setCurrentFolder(file.id)}
                  >
                    <div className="text-center">
                      <Icon className={`h-12 w-12 mx-auto mb-2 ${
                        file.type === "folder" ? "text-blue-500" : "text-slate-500"
                      }`} />
                      <p className="text-sm font-medium truncate" title={file.name}>
                        {file.name}
                      </p>
                      {file.size && (
                        <p className="text-xs text-slate-500 mt-1">
                          {formatFileSize(file.size)}
                        </p>
                      )}
                      <div className="flex justify-center mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFile(file.id);
                          }}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => {
                const Icon = getFileIcon(file);
                return (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-3 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors cursor-pointer"
                    onDoubleClick={() => file.type === "folder" && setCurrentFolder(file.id)}
                  >
                    <Icon className={`h-8 w-8 ${
                      file.type === "folder" ? "text-blue-500" : "text-slate-500"
                    }`} />
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-slate-500">
                        {file.modifiedAt.toLocaleDateString()}
                        {file.size && ` • ${formatFileSize(file.size)}`}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {file.type === "file" && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteFile(file.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
