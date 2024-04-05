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
const singleSelectQuestions = questions.filter(
  (question) => question.type === "single-select"
);
const textQuestions = questions.filter((question) => question.type === "text");

export default function AnalyticsTab() {
  return (
    <div>
      <div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="mb-5">
            <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
              Views
            </p>
            <div className="mt-2 flex items-baseline space-x-2.5">
              <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                12,506
              </p>
              <span
                className={classNames(
                  "positive" == "positive"
                    ? "text-emerald-700 dark:text-emerald-500"
                    : "text-red-700 dark:text-red-500",
                  "text-tremor-default font-medium"
                )}
              >
                +14,3%
              </span>
            </div>
          </Card>
          <Card className="mb-5">
            <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
              Answers
            </p>
            <div className="mt-2 flex items-baseline space-x-2.5">
              <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                1,506
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
        </div>
        <h3 className="text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong my-4 ">
          Single-select Questions
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {singleSelectQuestions.map((question) => (
            <AnalyticalMCCard question={question as QuestionMC} />
          ))}
        </div>

        <h3 className="my-4 text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Text Questions
        </h3>
        <div>
          {textQuestions.map((question) => (
            <AnalyticalTextCard question={question as QuestionText} />
          ))}
        </div>
      </div>
    </div>
  );
}
