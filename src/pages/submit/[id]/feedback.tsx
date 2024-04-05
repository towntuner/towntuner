import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";

import { Button } from "@tremor/react";
import MyButton from "@/components/MyButton";

import Banner from "@/components/Banner";
import { nanoid } from "nanoid";
import { getResponseStore } from "@/blobs";
import { getStore } from "@netlify/blobs";
import { Campaign } from "@/types/campaign";

async function updateResponse({
  campaignId,
  respondentId,
  questionNumber,
  response,
}: {
  campaignId: string;
  respondentId: string;
  questionNumber: number;
  response: string;
}) {
  const store = getResponseStore(campaignId);
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

export async function getCampaign(
  campaignId: string
): Promise<Campaign | undefined> {
  const store = getStore("campaigns");
  const campaign: Campaign = await store.get(campaignId, { type: "json" });
  if (!campaign) {
    return;
  }

  campaign.location = "Potsdam Griebnitzsee";

  // mock until question builder works
  campaign.questions = [
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

  return campaign;
}

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const getServerSideProps = (async (context) => {
  const campaignId = context.params!.id as string;
  const campaign = await getCampaign(campaignId);
  if (!campaign) {
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
      campaignId,
      respondentId,
      questionNumber,
      response,
    });

    const nextQuestion = questionNumber + 1;
    const isFinished = nextQuestion >= campaign.questions.length;
    const destination = isFinished
      ? "/end"
      : `/submit/${campaignId}/feedback?question=${nextQuestion}`;
    return {
      redirect: {
        destination: destination,
        statusCode: 303,
      },
    };
  }

  return { props: { campaign } };
}) satisfies GetServerSideProps<{ campaign: Campaign }>;

export default function SubmissionPage({
  campaign,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const question_number = Number.parseInt(
    (router.query.question as string) ?? "0"
  );

  return (
    <main className="font-merri">
      <Banner title={campaign.title}></Banner>
      <div className="grid justify-items-center">
        <p className=" grid justify-items-center my-10 px-20 py-20 bg-sky-50 text-s font-thin">
          {campaign.description}
        </p>
        <div className="grid justify-items-center m-10 text-xl font-extrabold">
          {campaign.questions[question_number].question}
          <div className="flex space-x-4">
            {campaign.questions[question_number].options?.map((option) => (
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

                <MyButton text={option.value}></MyButton>
              </form>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
