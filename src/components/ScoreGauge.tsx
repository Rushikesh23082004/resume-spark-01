import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  label?: string;
}

export const ScoreGauge = ({ score, size = "md", label }: ScoreGaugeProps) => {
  const radius = size === "sm" ? 35 : size === "lg" ? 55 : 45;
  const strokeWidth = size === "sm" ? 4 : size === "lg" ? 6 : 5;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "stroke-success";
    if (score >= 60) return "stroke-warning";
    return "stroke-destructive";
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={cn(
              "transition-all duration-1000 ease-out opacity-20",
              "stroke-muted-foreground"
            )}
          />
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className={cn(
              "transition-all duration-1000 ease-out",
              scoreColor
            )}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={cn(
              "font-bold",
              size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl"
            )}>
              {score}%
            </div>
            {label && (
              <div className={cn(
                "text-muted-foreground",
                size === "sm" ? "text-xs" : "text-sm"
              )}>
                {label}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};