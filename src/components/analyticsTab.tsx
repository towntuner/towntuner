import { Button, Card } from "@tremor/react";
import AnalyticalMCCard from "./analyMCCard";
import AnalyticalTextCard from "./analyTextCard";
import { Question } from "@/types/questions";
import { useEffect, useState } from "react";
import { QuestionCounts } from "@/types/analytics";
import { RiTable2 } from "@remixicon/react";
import { useRouter } from "next/router";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function AnalyticsTab({
  answersPerUser,
  questions,
  views,
}: {
  answersPerUser: string[][];
  questions: Question[];
  views: number;
}) {
  const router = useRouter();
  const campaignId = router.query.campaignId;

  const [noAnswers, setNoAnswers] = useState(false);
  const questionCounts: QuestionCounts = {};

  useEffect(() => {
    console.log({ questionCounts });
  }, [questionCounts]);

  if (!answersPerUser) {
    setNoAnswers(true);
  }

  if (answersPerUser && questions) {
    answersPerUser.forEach((answers: string[]) => {
      answers.forEach((answer: string, index: number) => {
        const question = questions[index]?.question ?? "No question";
        const type = questions[index]?.type ?? "text";

        if (!questionCounts[type]) {
          questionCounts[type] = {};
        }
        if (!questionCounts[type][question]) {
          questionCounts[type][question] = {};
        }

        questionCounts[type][question][answer] =
          (questionCounts[type][question][answer] || 0) + 1;
      });
    });
  }

  return (
    <div>
      <div>
        {noAnswers ? (
          <>
            <div>No answers</div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Card className="" decoration="top" decorationColor="indigo">
                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
                  Views
                </p>
                <div className="mt-2 flex items-baseline space-x-2.5">
                  <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    {views}
                  </p>
                </div>
              </Card>
              <Card className="" decoration="top" decorationColor="indigo">
                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
                  Answers
                </p>
                <div className="mt-2 flex items-baseline space-x-2.5">
                  <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    {answersPerUser.length}
                  </p>
                </div>
              </Card>
              <div>
                <a href={`/api/csv-export?campaignId=${campaignId}`}>
                  <Button
                    icon={RiTable2}
                    size="xl"
                    type="button"
                    variant="light"
                    iconPosition="right"
                  >
                    Export as CSV
                  </Button>
                </a>
              </div>
            </div>
            <h3 className="text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong my-4 ">
              Single-select Questions
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(questionCounts).map(([type, questions]) => {
                if (type === "single-select") {
                  return Object.entries(questions).map(
                    ([question, answers]) => (
                      <AnalyticalMCCard
                        key={question}
                        question={question}
                        answers={answers}
                      />
                    )
                  );
                } else {
                  return null;
                }
              })}
            </div>

            <h3 className="my-4 text-tremor-title font-bold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              Text Questions
            </h3>
            {Object.entries(questionCounts).map(([type, questions]) => {
              if (type === "text") {
                return Object.entries(questions).map(([question, answers]) => (
                  <AnalyticalTextCard
                    key={question}
                    question={question}
                    answers={answers}
                  />
                ));
              } else {
                return null;
              }
            })}
          </>
        )}
      </div>
    </div>
  );
}
