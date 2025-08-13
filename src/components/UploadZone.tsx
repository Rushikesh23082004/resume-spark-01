import { useState, useCallback } from "react";
import { Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileUpload: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
  description?: string;
}

export const UploadZone = ({ 
  onFileUpload, 
  accept = ".pdf,.docx,.doc", 
  maxSize = 10,
  label = "Upload Resume",
  description = "Drag and drop your resume here, or click to browse"
}: UploadZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleFile = useCallback((file: File) => {
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `File size must be less than ${maxSize}MB`,
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const allowedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: `Please upload a file with one of these extensions: ${accept}`,
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    onFileUpload(file);
    
    toast({
      title: "File uploaded successfully",
      description: `${file.name} has been uploaded`,
    });
  }, [accept, maxSize, onFileUpload, toast]);

  const removeFile = useCallback(() => {
    setUploadedFile(null);
  }, []);

  if (uploadedFile) {
    return (
      <div className="border border-border rounded-lg p-6 bg-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="font-medium text-card-foreground">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer",
        isDragOver 
          ? "border-primary bg-primary/5 shadow-glow" 
          : "border-border hover:border-primary/50 hover:bg-accent/50"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload')?.click()}
    >
      <input
        id="file-upload"
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="flex flex-col items-center space-y-4">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
          isDragOver ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}>
          <Upload className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{label}</h3>
          <p className="text-muted-foreground">{description}</p>
          <p className="text-sm text-muted-foreground">
            Supported formats: {accept} (Max {maxSize}MB)
          </p>
        </div>
        
        <Button variant="outline" className="mt-4">
          Choose File
        </Button>
      </div>
    </div>
  );
};