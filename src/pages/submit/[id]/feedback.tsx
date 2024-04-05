import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";

import { Button } from "@tremor/react";

import { Survey } from "../[id]";
import Banner from "@/components/Banner";
import { nanoid } from "nanoid";
import { getResponseStore } from "@/blobs";

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

export const getServerSideProps = (async (context) => {
  const respondentId = getRespondentId(context);

  const response = context.query.response;

  // Fetch data from external API
  if (typeof response === "string") {
    const surveyId = context.params!.id as string;
    const questionNumber = Number.parseInt(context.query.question as string);
    await updateResponse({
      surveyId,
      respondentId,
      questionNumber,
      response,
    });

    const nextQuestion = questionNumber + 1;
    return {
      redirect: {
        destination: `/submit/${surveyId}/feedback?question=${nextQuestion}`,
        statusCode: 303,
      },
    };
  }

  const survey: Survey = {
    title: "Fahrradweg auf der Stahnsdorfer Straße",
    description:
      "Wir freuen uns, Ihnen mitteilen zu können, dass ein neuer Fahrradweg entlang der Stahnsdorfer Straße geplant ist, um die Mobilität und Sicherheit für alle Verkehrsteilnehmer zu verbessern. Dieses Projekt zielt darauf ab, den Radverkehr zu fördern und die Lebensqualität der Anwohner zu erhöhen. Der Fahrradweg wird eine sichere Route für Radfahrer bieten, die die Stahnsdorfer Straße nutzen möchten, sei es für den täglichen Pendelverkehr, den Schulweg oder Freizeitaktivitäten. Durch die Schaffung eines separaten Radwegs wird die Sicherheit für Radfahrer und Fußgänger erhöht, indem Konflikte mit dem motorisierten Verkehr reduziert werden. Das Projekt umfasst die Gestaltung eines breiten, gut beleuchteten und gut markierten Fahrradwegs, der den aktuellen Standards entspricht. Es wird auch Grünflächen und Bäume entlang des Weges integrieren, um eine angenehme Umgebung zu schaffen. Wir laden alle Anwohner ein, sich über das Projekt zu informieren und ihre Rückmeldungen zu geben, um sicherzustellen, dass der Fahrradweg die Bedürfnisse der Gemeinschaft bestmöglich erfüllt. Wir freuen uns darauf, gemeinsam zu einer sichereren und nachhaltigeren Verkehrslösung beizutragen.",
    location: "Potsdam Griebnitzsee",
    deadline: "24.12.2024",
    questions: [
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
    ],
  };
  // Pass data to the page via props
  return { props: { survey } };
}) satisfies GetServerSideProps<{ survey: Survey }>;

export default function SubmissionPage({
  survey,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const question_number = Number.parseInt(
    (router.query.question as string) ?? "0"
  );

  const isLastQuestion = question_number >= survey.questions.length;
  if (isLastQuestion) {
    return <h1>You're done, thank you.</h1>;
  }

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
