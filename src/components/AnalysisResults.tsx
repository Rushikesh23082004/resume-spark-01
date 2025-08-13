import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScoreGauge } from "./ScoreGauge";
import { SkillsAnalysis } from "./SkillsAnalysis";
import { Download, RefreshCw, FileText, Zap } from "lucide-react";

interface AnalysisData {
  overallScore: number;
  atsScore: number;
  skillsScore: number;
  semanticScore: number;
  matchedSkills: Array<{ name: string; matched: boolean; importance: "high" | "medium" | "low" }>;
  missingSkills: Array<{ name: string; matched: boolean; importance: "high" | "medium" | "low" }>;
  recommendedSkills: Array<{ name: string; matched: boolean; importance: "high" | "medium" | "low" }>;
  atsIssues: string[];
  recommendations: string[];
}

interface AnalysisResultsProps {
  data: AnalysisData;
  isLoading?: boolean;
  onReanalyze?: () => void;
}

export const AnalysisResults = ({ data, isLoading = false, onReanalyze }: AnalysisResultsProps) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-pulse-glow">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Analyzing Your Resume</h3>
                <p className="text-muted-foreground">This may take a few moments...</p>
              </div>
              <Progress value={65} className="w-full max-w-xs mx-auto" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <Card className="bg-gradient-to-br from-background to-muted/20 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Analysis Results</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={onReanalyze}>
                <RefreshCw className="w-4 h-4" />
                Re-analyze
              </Button>
              <Button variant="hero" size="sm">
                <Download className="w-4 h-4" />
                Download Report
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 flex justify-center">
              <ScoreGauge 
                score={data.overallScore} 
                size="lg" 
                label="Overall Match" 
              />
            </div>
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <ScoreGauge score={data.atsScore} size="sm" />
                <p className="font-medium">ATS Compatibility</p>
              </div>
              <div className="text-center space-y-2">
                <ScoreGauge score={data.skillsScore} size="sm" />
                <p className="font-medium">Skills Match</p>
              </div>
              <div className="text-center space-y-2">
                <ScoreGauge score={data.semanticScore} size="sm" />
                <p className="font-medium">Content Relevance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Analysis */}
      <SkillsAnalysis 
        matchedSkills={data.matchedSkills}
        missingSkills={data.missingSkills}
        recommendedSkills={data.recommendedSkills}
      />

      {/* Issues and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ATS Issues */}
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader>
            <CardTitle className="text-warning">ATS Formatting Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.atsIssues.map((issue, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm">{issue}</p>
                </div>
              ))}
              {data.atsIssues.length === 0 && (
                <p className="text-muted-foreground text-sm">No ATS issues detected!</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="border-info/20 bg-info/5">
          <CardHeader>
            <CardTitle className="text-info">Improvement Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-info rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
              {data.recommendations.length === 0 && (
                <p className="text-muted-foreground text-sm">No additional recommendations at this time.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="lg" className="flex-1 max-w-xs">
              <FileText className="w-5 h-5" />
              Download Optimized Template
            </Button>
            <Button variant="outline" size="lg" className="flex-1 max-w-xs">
              <Download className="w-5 h-5" />
              Export Detailed Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};