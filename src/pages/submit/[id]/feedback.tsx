import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import mock_location from "./mock_location.png";

import { RiArrowRightLine } from "@remixicon/react";
import { Button } from "@tremor/react";

import { Survey } from "../[id]";
import Banner from "@/components/Banner";

export const getServerSideProps = (async (context) => {
  // Fetch data from external API
  if (context.req.method === "POST") {
    const response = context.query.response;
    const question_number = context.query.question_number;
  }
  console.log("Frage Nummer:" + context.query.question_number);
  console.log("Antwort:" + context.query.response);
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
        type: "text",
      },
    ],
  };
  // Pass data to the page via props
  return { props: { survey } };
}) satisfies GetServerSideProps<{ survey: Survey }>;

export default function SubmissionPage({
  survey,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const question_count = survey.questions.length;
  const question_number = 0; //hier muss man dann die Fragen nummer dynmaisch berechnen
  const router = useRouter();
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
                  name="question_number"
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
