import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";

import { Button } from "@tremor/react";

import Banner from "@/components/Banner";
import { nanoid } from "nanoid";
import { getResponseStore } from "@/blobs";
import { getStore } from "@netlify/blobs";
import { Campaign } from "@/types/campaign";

async function updateResponse({
  surveyId,
  respondentId,
  questionNumber,
  response,
}: {
  surveyId: string;
  respondentId: string;
  questionNumber: number;
  response: string;
}) {
  const store = getResponseStore(surveyId);
  const currentResponse =
    (await store.get(respondentId, { type: "json" })) ?? [];
  currentResponse[questionNumber] = response;
  await store.setJSON(respondentId, currentResponse);
}

function getRespondentId(context: GetServerSidePropsContext) {
  const existingCookie = context.req.cookies["townturner_id"];
  if (existingCookie) {
    return existingCookie;
  }

  const assignedId = nanoid();
  context.res.setHeader("Set-Cookie", `townturner_id=${assignedId}`);
  return assignedId;
}

export async function getSurvey(surveyId: string): Promise<Campaign | undefined> {
  const store = getStore("campaigns");
  const survey: Campaign = await store.get(surveyId, { type: "json" });
  if (!survey) {
    return;
  }

  survey.location = "Potsdam Griebnitzsee";

  // mock until question builder works
  survey.questions = [
    {
      question: "Finden Sie es gut wenn der Fahrradweg gebaut wird?",
      type: "single-select",
      options: [{ value: "Ja" }, { value: "Nein" }, { value: "Vielleicht" }],
    },
    {
      question:
        "Haben Sie Sorgen oder Bedenken, wenn dieses Projekt umgesetzt wird?",
      type: "single-select",
      options: [{ value: "Ja" }, { value: "Nein" }, { value: "Vielleicht" }],
    },
  ];

  return survey;
}

export const getServerSideProps = (async (context) => {
  const surveyId = context.params!.id as string;
  const survey = await getSurvey(surveyId);
  if (!survey) {
    return {
      notFound: true,
    };
  }

  const respondentId = getRespondentId(context);

  const response = context.query.response;

  // Fetch data from external API
  if (typeof response === "string") {
    const questionNumber = Number.parseInt(context.query.question as string);
    await updateResponse({
      surveyId,
      respondentId,
      questionNumber,
      response,
    });

    const nextQuestion = questionNumber + 1;
    const isFinished = nextQuestion >= survey.questions.length;
    const destination = isFinished
      ? "/end"
      : `/submit/${surveyId}/feedback?question=${nextQuestion}`;
    return {
      redirect: {
        destination: destination,
        statusCode: 303,
      },
    };
  }

  return { props: { survey } };
}) satisfies GetServerSideProps<{ survey: Campaign }>;

export default function SubmissionPage({
  survey,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const question_number = Number.parseInt(
    (router.query.question as string) ?? "0"
  );

  return (
    <main>
      <Banner title={survey.title}></Banner>
      <div className="grid justify-items-center">
        <p className=" grid justify-items-center my-10 mx-20 border-4 p-5 border-sky-600 rounded-lg bg-sky-50">
          {survey.description}
        </p>
        <div className="grid justify-items-center m-10">
          {survey.questions[question_number].question}
          <div>
            {survey.questions[question_number].options?.map((option) => (
              <form key={option.value}>
                <input
                  name="response"
                  value={option.value}
                  hidden
                  readOnly
                ></input>
                <input
                  name="question"
                  value={question_number}
                  hidden
                  readOnly
                ></input>
                <Button type="submit" className="m-5">
                  {option.value}
                </Button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
