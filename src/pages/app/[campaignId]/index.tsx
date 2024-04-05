import { getResponseStore } from "@/blobs";
import AnalyticsTab from "@/components/analyticsTab";
import EmojiButton from "@/components/emoji-button";
import Header from "@/components/header";
import QuestionBlock from "@/components/question";
import { RawInput } from "@/components/raw-input";
import SettingsTab from "@/components/settingsTab";
import { SocialsTab } from "@/components/socialsTab";
import { Campaign } from "@/types/campaign";
import { Question } from "@/types/questions";
import {
  ChartBarIcon,
  Cog6ToothIcon,
  PlusIcon,
  WrenchIcon,
} from "@heroicons/react/16/solid";
import { getStore } from "@netlify/blobs";
import { RiExternalLinkFill, RiShare2Fill } from "@remixicon/react";
import {
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Textarea,
} from "@tremor/react";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

interface CampaignHomeProps {
  campaign: Campaign;
  answersPerUser: string[][];
  views: number;
}

export default function CampaignHome({
  campaign,
  answersPerUser,
  views,
  ...rest
}: CampaignHomeProps) {
  const router = useRouter();
  const [emoji, setEmoji] = useState(campaign.icon);
  const [title, setTitle] = useState(campaign.title);
  const [desc, setDesc] = useState(campaign.description);

  const [questions, setQuestions] = useState(campaign.questions ?? []);

  const canSave =
    emoji !== campaign.icon ||
    title !== campaign.title ||
    desc !== campaign.description ||
    questions.length !== (campaign.questions ?? []).length ||
    questions.some((q, index) => {
      console.log(q.question, "vs", campaign.questions[index].question);

      return (
        (campaign.questions.length > index &&
          q !== campaign.questions[index]) ||
        q.question !== campaign.questions[index].question
      );
    });

  function addSingleChoice() {
    setQuestions([
      ...questions,
      {
        type: "single-select",
        question: "",
        options: [],
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  function addTextField() {
    setQuestions([
      ...questions,
      {
        type: "text",
        question: "",
        options: [],
        createdAt: new Date().toISOString(),
      },
    ]);
  }

  function handleQuestionChange(question: Question) {
    const index = questions.findIndex(
      (q) => q.createdAt === question.createdAt
    );

    const updatedQuestions = [...questions];
    updatedQuestions[index] = question;

    setQuestions(updatedQuestions);
  }

  const campaignId = router.query.campaignId as string;

  return (
    <form className="flex flex-col">
      <Header backHref="/app" />
      <div className="flex flex-col items-stretch">
        <div aria-hidden="true" className="relative h-52">
          <Image
            src={`https://images.unsplash.com/photo-1485381771061-e2cbd5317d9c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            alt=""
            fill
            quality={80}
            sizes="100vw"
            className="h-52 w-full object-cover object-center"
          />
        </div>
      </div>
      <div className="flex flex-col w-full max-w-4xl mx-auto mb-20">
        <div className="flex flex-col items-start gap-3">
          <EmojiButton onEmojiSelect={setEmoji}>
            <div className="rounded-2xl bg-white -mt-10 text-5xl p-3 border-tremor-border border hover:bg-tremor-background-muted transition duration-100">
              {emoji}
            </div>
          </EmojiButton>
          <input name="emoji" className="hidden" value={emoji} readOnly />
          <RawInput
            name="title"
            placeholder="Add a title"
            defaultValue={campaign.title}
            onChange={(elem) => setTitle(elem.target.value)}
            value={title}
          />
          <Textarea
            name="desc"
            placeholder="Add a description..."
            className="font-sans !text-lg"
            defaultValue={campaign.description}
            value={desc}
            onValueChange={setDesc}
          />
        </div>

        <Link href={`/submit/${campaignId}`}>
          <Button
            icon={RiExternalLinkFill}
            className="mt-12"
            iconPosition="right"
            variant="light"
          >
            Open Survey
          </Button>
        </Link>

        <div className="mt-12 mb-8">
          <TabGroup>
            <TabList variant="line" defaultValue="1">
              <Tab icon={WrenchIcon} value="1">
                Form Builder
              </Tab>
              <Tab icon={RiShare2Fill} value="2">
                Socials
              </Tab>
              <Tab icon={ChartBarIcon} value="2">
                Analytics
              </Tab>
              <Tab icon={Cog6ToothIcon} value="3">
                General
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel className="mt-5">
                <div className="flex flex-col gap-2 mb-5">
                  {questions.map((question, index) => (
                    <QuestionBlock
                      question={question}
                      key={question.question}
                      onChange={(data) => handleQuestionChange(data)}
                      index={index}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={addSingleChoice}
                    type="button"
                    className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none"
                  >
                    <PlusIcon className="w-8 h-8 mx-auto" />
                    <span className="mt-2 block text-sm font-semibold text-gray-900">
                      Add single choice question
                    </span>
                  </button>
                  <button
                    onClick={addTextField}
                    type="button"
                    className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none"
                  >
                    <PlusIcon className="w-8 h-8 mx-auto" />
                    <span className="mt-2 block text-sm font-semibold text-gray-900">
                      Add text question
                    </span>
                  </button>
                </div>
              </TabPanel>
              <TabPanel className="mt-5">
                <SocialsTab campaignId={campaignId} />
              </TabPanel>
              <TabPanel>
                <AnalyticsTab
                  views={views}
                  answersPerUser={answersPerUser}
                  questions={campaign.questions}
                />
              </TabPanel>
              <TabPanel>
                <SettingsTab />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
      <div
        className={clsx(
          "fixed left-0 w-full bg-white border-gray-100 border pt-4 pb-6 shadow-[rgba(0,0,0,0.1)_0px_0px_10px_0px] transition-all duration-500",
          canSave ? "bottom-0" : "-bottom-28"
        )}
      >
        <div className="max-w-4xl flex justify-end items-start mx-auto w-full">
          <Button type="submit">Publish</Button>
        </div>
      </div>
    </form>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  query,
}) => {
  if (!params || typeof params["campaignId"] !== "string") {
    return {
      notFound: true,
    };
  }

  const campaignId = params["campaignId"];

  const store = getStore("campaigns");
  const campaign = await store.get(campaignId, { type: "json" });

  if (!campaign) {
    return {
      notFound: true,
    };
  }

  const { title, desc, emoji, ...rest } = query;

  const questions = Object.entries(rest)
    .filter(([key]) => key.startsWith("question/"))
    .reduce<Record<string, Question>>((prev, curr) => {
      const current = curr[0].split("/");
      const previous = prev[current[1] as any];

      return {
        ...prev,
        [current[1]]: {
          ...previous,
          createdAt: current[1],
          question: current.includes("title")
            ? curr[1]?.toString() ?? ""
            : previous.question,
          options: current.includes("option")
            ? [...(previous as any).options, { value: curr[1] }]
            : previous
            ? (previous as any).options
            : [],
          type: current.includes("option")
            ? "single-select"
            : previous
            ? previous.type
            : "text",
        },
      };
    }, {} as Record<string, Question>);

  console.log({ soenke: Object.values(questions) });

  const updatedCampaign = {
    ...campaign,
    title: title ?? campaign.title,
    description: desc ?? campaign.description,
    icon: emoji ?? campaign.icon,
    questions:
      Object.values(questions).length > 0
        ? Object.values(questions)
        : campaign.questions,
  };

  const responseStore = getResponseStore(campaignId);
  const answersPerUser: string[][] = [];

  for await (const submissions of responseStore.list({ paginate: true })) {
    for (const submission of submissions.blobs) {
      const content = await responseStore.get(submission.key, { type: "json" });
      answersPerUser.push(content);
    }
  }

  const viewsStore = await getStore("views");
  const views = await viewsStore.get(campaignId, { type: "json" });

  if (JSON.stringify(updatedCampaign) !== JSON.stringify(campaign)) {
    await store.setJSON(campaignId, updatedCampaign);

    console.log(JSON.stringify(updatedCampaign));

    return {
      redirect: {
        destination: `/app/${campaignId}`,
        permanent: false,
      },
    };
  }

  return {
    props: { campaign, answersPerUser, views },
  };
};
