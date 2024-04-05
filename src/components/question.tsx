import { Question } from "@/types/questions";
import { clsx } from "clsx";

interface QuestionProps {
  className?: string;
  question: Question;
  dragHandle?: React.ReactNode;
  children?: React.ReactNode;
}

export default function QuestionBlock({
  className,
  question,
  dragHandle,
}: QuestionProps) {
  return (
    <div
      className={clsx(
        "items-strech flex flex-col rounded-lg border border-border/50",
        className
      )}
    >
      <div className="flex items-center rounded-t-lg bg-light-blue/40 px-1 py-3">
        {dragHandle}
        <div className="flex flex-1 items-center justify-between px-1">
          <h3 className="">{question.title}</h3>
        </div>
      </div>
      <div className="flex flex-col gap-y-3"></div>
    </div>
  );
}
