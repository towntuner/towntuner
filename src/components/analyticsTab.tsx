import { Card } from "@tremor/react";
import AnalyticalMCCard from "./analyMCCard";
import AnalyticalTextCard from "./analyTextCard";
import { Question, QuestionMC, QuestionText } from "@/types/questions";
import { useEffect, useState } from "react";
import { QuestionCounts } from "@/types/analytics";
import { create } from "domain";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function AnalyticsTab({
  answersPerUser,
  questions,
}: {
  answersPerUser: string[][];
  questions: Question[];
}) {
  const [noAnswers, setNoAnswers] = useState(false);
  const questionCounts: QuestionCounts = {};

  console.log("QUESTIONS", questions);

  if (!answersPerUser) {
    setNoAnswers(true);
  }

  // TODO: Remove this
  answersPerUser = [
    ["Yes", "Yes", "Freitext"],
    ["Yes", "Yes", "andere Freitext"],
    ["No", "Yes", "Hier steht meine Meinung"],
    ["Maybe", "No", "This is super useful"],
    ["Maybe", "No", "Hallo :)"],
  ];

  if (!questions) {
    // TODO: Remove this -> show that you need to create Answers to see analytics
    questions = [
      {
        type: "single-select",
        question: "What is your favorite color?",
        options: [
          { value: "Red" },
          { value: "Blue" },
          { value: "Green" },
          { value: "Yellow" },
        ],
        createdAt: new Date().toISOString(),
      },
      {
        type: "single-select",
        question: "What is your favorite animal?",
        options: [
          { value: "Dog" },
          { value: "Cat" },
          { value: "Bird" },
          { value: "Fish" },
        ],
        createdAt: new Date().toISOString(),
      },
      {
        type: "text",
        question: "Answer this with freetext?",
        options: [],
        createdAt: new Date().toISOString(),
      },
    ];
  }

  if (answersPerUser && questions) {
    answersPerUser.forEach((answers: string[]) => {
      answers.forEach((answer: string, index: number) => {
        const question = questions[index].question;
        const type = questions[index].type;

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

  console.log(questionCounts);

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
              <Card className="mb-5" decoration="top" decorationColor="indigo">
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
              <Card className="mb-5" decoration="top" decorationColor="indigo">
                <p className="text-tremor-default font-medium text-tremor-content dark:text-dark-tremor-content">
                  Answers
                </p>
                <div className="mt-2 flex items-baseline space-x-2.5">
                  <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    {answersPerUser.length}
                  </p>
                  {/*
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
                    */}
                </div>
              </Card>
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
