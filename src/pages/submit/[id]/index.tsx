import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import mock_location from "./mock_location.png";
import { Button } from "@tremor/react";
import Banner from "../../../components/Banner";
import { Sono } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";

export interface Survey {
  title: string;
  description: string;
  location: string;
  image?: Blob;
  deadline: string;
  questions: {
    question: string;
    type: "single-select" | "text";
    options?: { value: string }[];
  }[];
}

export const getServerSideProps = (async () => {
  // Fetch data from external API
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
        options: [{ value: "Ja" }, { value: "Nein" }],
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
  const router = useRouter();
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
        <div className="content-center space-x-10">
          <Link href={`/submit/${router.query.id}/summary`}>
            <Button variant="primary" color="green">
              Ja
            </Button>{" "}
          </Link>
          <Link href="/end">
            <Button variant="primary" color="red">
              Nein
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
