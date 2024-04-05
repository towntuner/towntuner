import { Card } from "@tremor/react";
import AnalyticalMCCard from "./analyMCCard";
import AnalyticalTextCard from "./analyTextCard";
import { Question, QuestionMC, QuestionText } from "@/types/questions";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const questionMC = {
  title: "Eine Frage?",
  type: "single-select" as const,
  options: [{ value: "Antwort A" }, { value: "Antwort B" }],
};

const question = {
  title: "Eine Frage?",
  type: "text" as const,
};

const questions: Question[] = [questionMC, question, questionMC, question];

export default function AnalyticsTab() {
  return (
    <div>
      <div>
        <Card className="mb-5">
          <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
            Einwände
          </p>
          <div className="mt-2 flex items-baseline space-x-2.5">
            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              2
            </p>
            <span
              className={classNames(
                "positive" == "positive"
                  ? "text-emerald-700 dark:text-emerald-500"
                  : "text-red-700 dark:text-red-500",
                "text-tremor-default font-medium"
              )}
            >
              +12,3%
            </span>
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-4">
          {questions.map((question, index) =>
            question.type === "single-select" ? (
              <AnalyticalMCCard key={index} question={question as QuestionMC} />
            ) : (
              <AnalyticalTextCard
                key={index}
                question={question as QuestionText}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
