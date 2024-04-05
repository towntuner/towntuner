import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import mock_location from "./mock_location.png";

import { RiArrowRightLine } from "@remixicon/react";
import { Button } from "@tremor/react";
import MyButton from "@/components/MyButton";

import { Survey } from "../[id]";
import Banner from "@/components/Banner";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

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
    description: `Ein neuer Fahrradweg entlang der Stahnsdorfer Straße ist geplant, um die Mobilität und Sicherheit zu verbessern. Dies fördert den Radverkehr und erhöht die Lebensqualität.
      
      Der Fahrradweg bietet sichere Routen für Pendler, Schüler und Freizeitaktivitäten. Die Sicherheit für Radfahrer und Fußgänger wird durch einen separaten Radweg erhöht.
      
      Der breite, gut beleuchtete und markierte Fahrradweg entspricht aktuellen Standards. Grünflächen und Bäume schaffen eine angenehme Umgebung.
      
      Anwohner sind eingeladen, sich zu informieren und Feedback zu geben, um sicherzustellen, dass der Fahrradweg ihre Bedürfnisse erfüllt. Gemeinsam tragen wir zu einer sicheren und nachhaltigen Verkehrslösung bei.`,
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
    <main className="font-merri">
      <Banner title={survey.title}></Banner>
      <div className="grid justify-items-center">
        <p className=" grid justify-items-center my-10 px-20 py-20 bg-sky-50 text-s font-thin">
          {survey.description}
        </p>
        <div className="grid justify-items-center m-10 text-xl font-extrabold">
          {survey.questions[question_number].question}
          <div className="flex space-x-4">
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

                <MyButton text={option.value}></MyButton>
              </form>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
