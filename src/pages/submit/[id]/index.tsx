import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import mock_location from "./mock_location.png";

export interface Survey {
  title: string;
  description: string;
  location: string;
  image?: Blob;
  deadline: string;
  questions: {
    question: string;
    type: "multiple choice" | "text";
  }[];
}

export const getServerSideProps = (async () => {
  // Fetch data from external API
  console.log("hello from getServerSideProps");
  const survey: Survey = {
    title: "Fahrradweg auf der Stahnsdorfer Straße",
    description:
      "Wir freuen uns, Ihnen mitteilen zu können, dass ein neuer Fahrradweg entlang der Stahnsdorfer Straße geplant ist, um die Mobilität und Sicherheit für alle Verkehrsteilnehmer zu verbessern. Dieses Projekt zielt darauf ab, den Radverkehr zu fördern und die Lebensqualität der Anwohner zu erhöhen. Der Fahrradweg wird eine sichere Route für Radfahrer bieten, die die Stahnsdorfer Straße nutzen möchten, sei es für den täglichen Pendelverkehr, den Schulweg oder Freizeitaktivitäten. Durch die Schaffung eines separaten Radwegs wird die Sicherheit für Radfahrer und Fußgänger erhöht, indem Konflikte mit dem motorisierten Verkehr reduziert werden. Das Projekt umfasst die Gestaltung eines breiten, gut beleuchteten und gut markierten Fahrradwegs, der den aktuellen Standards entspricht. Es wird auch Grünflächen und Bäume entlang des Weges integrieren, um eine angenehme Umgebung zu schaffen. Wir laden alle Anwohner ein, sich über das Projekt zu informieren und ihre Rückmeldungen zu geben, um sicherzustellen, dass der Fahrradweg die Bedürfnisse der Gemeinschaft bestmöglich erfüllt. Wir freuen uns darauf, gemeinsam zu einer sichereren und nachhaltigeren Verkehrslösung beizutragen.",
    location: "Potsdam Griebnitzsee",
    deadline: "24.12.2024",
    questions: [
      {
        question: "Finden Sie es gut wenn der Fahrradweg gebaut wird?",
        type: "multiple choice",
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


export function Banner(props: { title: string }) {

  return (
    <div className="relative isolate  gap-x-6 overflow-hidden bg-blue-200 px-6 py-2.5 ">
      <h1 className="text-lg leading-10 text-gray-900 text-center">
        <strong className="font-semibold">{props.title}</strong>
      </h1>
    </div>
  );
}

export default function SubmissionPage({
  survey,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("hello from SubmissionPage");
  return (
    <main>
      <Banner title={survey.title}></Banner>
      <div className="grid justify-items-center">
        <p className="text-xl m-5">Sind Sie häufig in {survey.location}?</p>
        <Image
          src={mock_location}
          height={300}
          alt="location mock"
          className="m-5"
        />
      </div>
    </main>
  );
}
