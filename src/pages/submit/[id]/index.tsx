import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import mock_location from "./mock_location.png";
import { Button } from "@tremor/react";
import Banner from "../../../components/Banner";
import { Sono } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSurvey } from "./feedback";

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
