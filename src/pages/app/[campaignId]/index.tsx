import { getResponseStore } from "@/blobs";
import AnalyticsTab from "@/components/analyticsTab";
import EmojiButton from "@/components/emoji-button";
import Header from "@/components/header";
import { RawInput } from "@/components/raw-input";
import SettingsTab from "@/components/settingsTab";
import { QuestionCounts } from "@/types/analytics";
import { Campaign } from "@/types/campaign";
import {
  ChartBarIcon,
  Cog6ToothIcon,
  WrenchIcon,
} from "@heroicons/react/16/solid";
import { getStore } from "@netlify/blobs";
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
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

interface CampaignHomeProps {
  campaign: Campaign;
}

export default function CampaignHome({ campaign, ...rest }: CampaignHomeProps) {
  const [emoji, setEmoji] = useState(campaign.icon);
  const [title, setTitle] = useState(campaign.title);
  const [desc, setDesc] = useState(campaign.description);

  const canSave = useMemo(() => {
    if (emoji !== campaign.icon) return true;
    if (title !== campaign.title) return true;
    if (desc !== campaign.description) return true;

    return false;
  }, [emoji, title, desc]);

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
      <div className="flex flex-col w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-start gap-3">
          <EmojiButton onEmojiSelect={setEmoji}>
            <div className="rounded-2xl bg-white -mt-10 z-10 text-5xl p-3 border-tremor-border border hover:bg-tremor-background-muted transition duration-100">
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
        <div className="mt-12 mb-8">
          <TabGroup>
            <TabList variant="line" defaultValue="1">
              <Tab icon={WrenchIcon} value="1">
                Form Builder
              </Tab>
              <Tab icon={ChartBarIcon} value="2">
                Analytics
              </Tab>
              <Tab icon={Cog6ToothIcon} value="3">
                General
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat.
                </p>
              </TabPanel>
              <TabPanel>
                <AnalyticsTab />
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

  const { title, desc, emoji } = query;

  const updatedCampaign = {
    ...campaign,
    title: title ?? campaign.title,
    description: desc ?? campaign.description,
    icon: emoji ?? campaign.icon,
  };

  const responseStore = getResponseStore(campaignId);

  const answersPerUser: string[][] = [
    ["Yes", "No", "Yes"],
    ["Yes", "Yes", "No"],
    ["Yes", "Maybe", "Yes"],
  ];

  for await (const submissions of responseStore.list({ paginate: true })) {
    for (const submission of submissions.blobs) {
      const content = await responseStore.get(submission.key, { type: "json" });
      answersPerUser.push(content);
    }
  }

  const questionCounts: QuestionCounts = {};

  answersPerUser.forEach((answers: string[]) => {
    answers.forEach((answer: string, index: number) => {
      const question = `Question ${index + 1}`;
      if (!questionCounts[question]) {
        questionCounts[question] = {};
      }
      questionCounts[question][answer] =
        (questionCounts[question][answer] || 0) + 1;
    });
  });

  console.log(questionCounts);

  console.log({ updatedCampaign, campaign });

  if (JSON.stringify(updatedCampaign) !== JSON.stringify(campaign)) {
    await store.setJSON(campaignId, updatedCampaign);

    return {
      redirect: {
        destination: `/app/${campaignId}`,
        permanent: false,
      },
    };
  }

  return {
    props: { campaign },
  };
};
