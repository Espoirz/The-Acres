import { cn } from "@/lib/utils";

interface StatBarProps {
  value: number;
  className?: string;
}

export function StatBar({ value, className }: StatBarProps) {
  return (
    <div className={cn("w-full bg-[hsl(25,30%,80%)] rounded-full h-2", className)}>
      <div 
        className="h-2 rounded-full bg-gradient-to-r from-[hsl(40,80%,50%)] to-[hsl(35,70%,55%)]"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}
