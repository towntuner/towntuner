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
  MapPinIcon,
  PlusIcon,
  WrenchIcon,
} from "@heroicons/react/16/solid";
import { getStore } from "@netlify/blobs";
import { RiExternalLinkFill, RiShare2Fill } from "@remixicon/react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
  Button,
  DatePicker,
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
import React, { LegacyRef, useMemo, useRef, useState } from "react";
import Map, { MapRef, Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

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
  const [deadline, setDeadline] = useState(campaign.deadline);

  const [questions, setQuestions] = useState(campaign.questions ?? []);

  const [lat, setLat] = useState<number>(
    Number(campaign.location?.split(",")?.[0])
  );
  const [lng, setLng] = useState<number>(
    Number(campaign.location?.split(",")?.[1])
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<MapRef>(null);

  const canSave =
    emoji !== campaign.icon ||
    title !== campaign.title ||
    desc !== campaign.description ||
    questions.length !== (campaign.questions ?? []).length ||
    questions.some((q, index) => {
      return (
        (campaign.questions.length > index &&
          q !== campaign.questions[index]) ||
        q.question !== campaign.questions[index].question
      );
    }) ||
    deadline !== campaign.deadline ||
    lat !== Number(campaign.location?.split(",")?.[0]) ||
    lng !== Number(campaign.location?.split(",")?.[1]);

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

  async function handleUploadFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    console.log(file);

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    await fetch(`/api/${router.query.campaignId}/upload-campaign-image`, {
      method: "POST",
      body: formData,
    });

    router.reload();
  }

  const campaignId = router.query.campaignId as string;

  const handleMapClick = (event: any) => {
    console.log(event.lngLat.lat, event.lngLat.lng);

    mapRef.current?.flyTo({
      center: [event.lngLat.lng, event.lngLat.lat],
      zoom: 14,
    });

    setLat(event.lngLat.lat);
    setLng(event.lngLat.lng);
  };

  return (
    <form className="flex flex-col">
      <Header backHref="/app" />
      <div className="flex flex-col items-stretch">
        {campaign.hasImage ? (
          <div aria-hidden="true" className="relative h-52">
            <img
              src={`/api/${campaignId}/load-campaign-image`}
              className="h-52 w-full object-cover object-center"
            />
          </div>
        ) : (
          <div className="mt-20" />
        )}
      </div>
      <div className="flex flex-col w-full max-w-4xl mx-auto mb-20">
        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-row justify-between w-full">
            <EmojiButton onEmojiSelect={setEmoji}>
              <div className="rounded-2xl bg-white -mt-10 text-5xl p-3 border-tremor-border border hover:bg-tremor-background-muted transition duration-100">
                {emoji}
              </div>
            </EmojiButton>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              accept="image/png"
              onChange={handleUploadFile}
            />
            <div className="flex flex-row ml-auto -translate-y-1/2 gap-2 relative z-10">
              <DatePicker
                defaultValue={new Date(campaign.deadline)}
                onValueChange={(val) => val && setDeadline(val.toISOString())}
                enableClear={false}
              />
              <input
                name="deadline"
                className="hidden"
                value={deadline}
                readOnly
              />
              <Link href={`/submit/${campaignId}`} passHref target="_blank">
                <Button
                  className="relative bg-white hover:!bg-white shadow-tremor-input border-tremor-border"
                  type="button"
                  variant="secondary"
                  icon={RiExternalLinkFill}
                  color="gray"
                  iconPosition="right"
                >
                  Open survey
                </Button>
              </Link>
              <Button
                className="relative"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload image
              </Button>
            </div>
          </div>
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
          <AccordionList className="w-full">
            <Accordion className="w-full">
              <AccordionHeader>Location</AccordionHeader>
              <AccordionBody>
                <Map
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  style={{
                    width: "100%",
                    height: "400px",
                    position: "relative",
                  }}
                  initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 13,
                  }}
                  onClick={handleMapClick}
                  ref={mapRef}
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                >
                  {lat && lng && (
                    <Marker
                      longitude={lng}
                      latitude={lat}
                      anchor="bottom"
                      key="marker"
                    >
                      <MapPinIcon className="w-16 h-16" color="blue" />
                    </Marker>
                  )}
                </Map>
              </AccordionBody>
            </Accordion>
          </AccordionList>
        </div>

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
            <input
              name="location"
              className="hidden"
              value={`${lat},${lng}`}
              readOnly
            />
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

  const { title, desc, emoji, deadline, location, ...rest } = query;

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

  const updatedCampaign = {
    ...campaign,
    title: title ?? campaign.title,
    description: desc ?? campaign.description,
    icon: emoji ?? campaign.icon,
    deadline: deadline ?? campaign.deadline,
    location: location ?? campaign.location,
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

  console.log({ answersPerUser });

  return {
    props: { campaign, answersPerUser, views },
  };
};
