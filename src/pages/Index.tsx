import { useState } from "react";
import { Header } from "@/components/Header";
import { UploadZone } from "@/components/UploadZone";
import { AnalysisResults } from "@/components/AnalysisResults";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Target, Zap, Shield } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const { toast } = useToast();

  // Mock analysis data for demo
  const mockAnalysisData = {
    overallScore: 78,
    atsScore: 85,
    skillsScore: 72,
    semanticScore: 76,
    matchedSkills: [
      { name: "Python", matched: true, importance: "high" as const },
      { name: "Machine Learning", matched: true, importance: "high" as const },
      { name: "SQL", matched: true, importance: "medium" as const },
      { name: "Data Analysis", matched: true, importance: "high" as const },
    ],
    missingSkills: [
      { name: "TensorFlow", matched: false, importance: "high" as const },
      { name: "AWS", matched: false, importance: "medium" as const },
      { name: "Docker", matched: false, importance: "low" as const },
    ],
    recommendedSkills: [
      { name: "PyTorch", matched: false, importance: "medium" as const },
      { name: "Kubernetes", matched: false, importance: "low" as const },
    ],
    atsIssues: [
      "Consider using standard section headings like 'Work Experience' instead of 'Professional Background'",
      "Avoid using tables for layout - use simple bullet points instead",
      "Some dates are inconsistently formatted"
    ],
    recommendations: [
      "Add more quantifiable achievements with specific metrics",
      "Include keywords from the job description naturally in your experience section",
      "Consider adding a 'Technical Skills' section for better ATS parsing"
    ]
  };

  const handleAnalyze = async () => {
    if (!jobRole || !jobDescription || !resumeFile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and upload your resume",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      setAnalysisResults(mockAnalysisData);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed successfully",
      });
    }, 3000);
  };

  const handleReanalyze = () => {
    setAnalysisResults(null);
    handleAnalyze();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `url(${heroBanner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative container py-16 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
                Optimize Your Resume for Success
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get AI-powered insights to match your resume perfectly with any job description. 
                Boost your ATS compatibility and land more interviews.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-background/50 backdrop-blur border border-border/50">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold">Skills Matching</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Identify gaps and optimize your skills section
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-background/50 backdrop-blur border border-border/50">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold">ATS Optimization</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Ensure your resume passes automated screening
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-background/50 backdrop-blur border border-border/50">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold">Smart Recommendations</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Get personalized suggestions for improvement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12 space-y-8">
        {!analysisResults ? (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Input Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span>Resume Analysis Setup</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobRole">Target Job Role</Label>
                    <Input
                      id="jobRole"
                      placeholder="e.g., Data Scientist, Software Engineer"
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      placeholder="e.g., Google, Microsoft"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste the complete job description here..."
                    rows={8}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Resume Upload</Label>
                  <UploadZone 
                    onFileUpload={setResumeFile}
                    label="Upload Your Resume"
                    description="Upload your resume in PDF, DOC, or DOCX format"
                  />
                </div>
                
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !jobRole || !jobDescription || !resumeFile}
                  className="w-full"
                  variant="gradient"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Analyze Resume
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <AnalysisResults 
              data={analysisResults}
              isLoading={isAnalyzing}
              onReanalyze={handleReanalyze}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
