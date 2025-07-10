import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Calendar, TrendingUp } from "lucide-react";

interface TrainingScheduleProps {
  activeSessions: any[];
}

export function TrainingSchedule({ activeSessions }: TrainingScheduleProps) {
  if (activeSessions.length === 0) {
    return (
      <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg">
        <CardHeader>
          <CardTitle className="text-[hsl(25,60%,20%)] flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Training Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="w-16 h-16 text-[hsl(25,40%,60%)] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[hsl(25,60%,20%)] mb-2">No Active Training</h3>
            <p className="text-[hsl(25,45%,35%)]">
              Schedule training sessions to see them here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[hsl(45,50%,96%)] border-2 border-[hsl(25,30%,70%)] shadow-lg">
      <CardHeader>
        <CardTitle className="text-[hsl(25,60%,20%)] flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Active Training Sessions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeSessions.map((session) => {
            const endTime = new Date(session.endTime);
            const now = new Date();
            const totalDuration = session.duration * 60 * 1000; // Convert to milliseconds
            const elapsed = now.getTime() - new Date(session.startTime).getTime();
            const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
            const timeRemaining = Math.max(0, Math.ceil((endTime.getTime() - now.getTime()) / (1000 * 60)));
            
            return (
              <div key={session.id} className="p-4 border-2 border-[hsl(25,30%,70%)] rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-[hsl(25,60%,20%)]">
                      {session.animal?.name}
                    </h4>
                    <p className="text-sm text-[hsl(25,45%,35%)] capitalize">
                      {session.trainingType} Training
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {timeRemaining > 0 ? `${timeRemaining}m remaining` : "Complete!"}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[hsl(25,60%,35%)]">Progress</span>
                    <span className="text-[hsl(25,50%,40%)] font-semibold">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  
                  <div className="flex justify-between text-xs text-[hsl(25,45%,35%)]">
                    <span>Expected improvement: +{session.statImprovement}%</span>
                    <span>Cost: ${session.cost}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
