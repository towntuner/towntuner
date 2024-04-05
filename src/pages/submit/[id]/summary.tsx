import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import mock_project_image from "./mock_radweg_stahnsdorfer.jpg";

import { RiArrowRightLine } from "@remixicon/react";
import { Button } from "@tremor/react";

import Banner from "../../../components/Banner";
import { Survey } from "./index";
import { getSurvey } from "./feedback";

export const getServerSideProps = (async (context) => {
  const surveyId = context.params!.id as string;

  const survey = await getSurvey(surveyId);
  if (!survey) {
    return {
      notFound: true,
    };
  }

  return { props: { survey } };
}) satisfies GetServerSideProps<{ survey: Survey }>;

export function ProjectSummary(props: { survey: Survey }) {
  return (
    <div className="grid justify-items-center">
      <Image
        src={mock_project_image}
        height={300}
        alt="project image"
        className="m-5"
      />
      <p className="mx-40">{props.survey.description}</p>
    </div>
  );
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
        <ProjectSummary survey={survey} />
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
