import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";

import { Button, Textarea } from "@tremor/react";
import MyButton from "@/components/MyButton";
import Description from "@/components/Description";

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
    (await store.get(respondentId, { type: "json", consistency: "strong" })) ??
    [];
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
  console.log("REAL", campaign);

  //TODO: mock until question builder works
  /*
  campaign.questions = [
    {
      question: "Finden Sie es gut wenn der Fahrradweg gebaut wird?",
      type: "single-select",
      options: [{ value: "Ja" }, { value: "Nein" }, { value: "Vielleicht" }],
      createdAt: "2021-10-01",
    },
    {
      question:
        "Haben Sie Sorgen oder Bedenken, wenn dieses Projekt umgesetzt wird?",
      type: "text",
      createdAt: "2021-10-01",
      options: [],
    },
  ];
  */
  return campaign;
}

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

  const question = campaign.questions[question_number];

  return (
    <main className="font-merri  text-[#072448]">
      <Banner title={campaign.title}></Banner>
      <div className="grid justify-items-center">
        <Description title={campaign.title} text={campaign.description} />
        <div className="grid justify-items-center mb-16 text-xl font-extrabold w-full">
          {question.question}
          <div className="w-full my-5 grid grid-cols-1 gap-5 p-10">
            {question.type === "single-select" ? (
              question.options?.map((option) => (
                <form key={option.value} className="content-evenly">
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
              ))
            ) : (
              <form className="w-full">
                <div className="grid grid-cols-1 gap-2">
                  <Textarea
                    name="response"
                    placeholder="I think this is a great idea because..."
                    rows={6}
                  />
                  <input
                    name="question"
                    value={question_number}
                    hidden
                    readOnly
                  ></input>
                </div>
                <div className="mt-6 flex w-full justify-center">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
