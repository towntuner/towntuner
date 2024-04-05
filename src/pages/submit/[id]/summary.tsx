import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import mock_project_image from "./mock_radweg_stahnsdorfer.jpg";

import { RiArrowRightLine } from "@remixicon/react";
import { Button } from "@tremor/react";

import { Banner } from "../../../components/Banner";
import { Survey } from "./index";


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

function projectSummary(survey: Survey) {
    return <div className="grid justify-items-center">
        <Image
            src={mock_project_image}
            height={300}
            alt="project image"
            className="m-5" />
        <p className="mx-40">{survey.description}</p>
    </div>;
}

export default function ProjectSummaryPage({
  survey,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log("hello from SubmissionPage");
  const router = useRouter();
  return (
    <main>
      <Banner title={survey.title}></Banner>
      <div className="grid justify-items-center">
        {projectSummary(survey)}
        <div className="flex justify-center">
          <Link href={`/submit/${router.query.id}/feedback`}>
            <Button
              icon={RiArrowRightLine}
              iconPosition="right"
              variant="light"
            >
              Feedback geben
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}


