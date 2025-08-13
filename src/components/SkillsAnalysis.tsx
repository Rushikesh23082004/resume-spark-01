import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, TrendingUp } from "lucide-react";

interface Skill {
  name: string;
  matched: boolean;
  importance: "high" | "medium" | "low";
}

interface SkillsAnalysisProps {
  matchedSkills: Skill[];
  missingSkills: Skill[];
  recommendedSkills: Skill[];
}

export const SkillsAnalysis = ({ matchedSkills, missingSkills, recommendedSkills }: SkillsAnalysisProps) => {
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Matched Skills */}
      <Card className="border-success/20 bg-success/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-success">
            <CheckCircle className="w-5 h-5" />
            <span>Matched Skills</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="bg-success/10 text-success border-success/20"
              >
                {skill.name}
              </Badge>
            ))}
          </div>
          {matchedSkills.length === 0 && (
            <p className="text-muted-foreground text-sm">No matched skills found</p>
          )}
        </CardContent>
      </Card>

      {/* Missing Skills */}
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-destructive">
            <XCircle className="w-5 h-5" />
            <span>Missing Skills</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {missingSkills.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <Badge 
                  variant="outline"
                  className="border-destructive/30 text-destructive"
                >
                  {skill.name}
                </Badge>
                <Badge 
                  className={getImportanceColor(skill.importance)}
                  variant="secondary"
                >
                  {skill.importance}
                </Badge>
              </div>
            ))}
          </div>
          {missingSkills.length === 0 && (
            <p className="text-muted-foreground text-sm">All required skills matched!</p>
          )}
        </CardContent>
      </Card>

      {/* Recommended Skills */}
      <Card className="border-info/20 bg-info/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-info">
            <TrendingUp className="w-5 h-5" />
            <span>Recommended</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {recommendedSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="border-info/30 text-info hover:bg-info/10 transition-colors"
              >
                {skill.name}
              </Badge>
            ))}
          </div>
          {recommendedSkills.length === 0 && (
            <p className="text-muted-foreground text-sm">No additional recommendations</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};