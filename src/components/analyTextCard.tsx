import { QuestionText } from "@/types/questions";
import { Card } from "@tremor/react";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AnalyticalTextCard({
  question,
  answers,
}: {
  question: string;
  answers: Record<string, number>; // this number should always be 1
}) {
  return (
    <div>
      <p className="my-2 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
        {question}
      </p>

      <div className="grid grid-cols-3 gap-4">
        {Object.entries(answers).map(([answer, count]) => {
          return (
            <Card className="group w-full" style={{ padding: "12px" }}>
              <div className="flex items-center">
                <p className=" text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content-strong">
                  {answer}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
