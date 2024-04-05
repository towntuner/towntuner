import { Campaign } from "@/types/campaign";
import { getStore } from "@netlify/blobs";
import { nanoid } from "nanoid";
import { GetServerSideProps, GetServerSidePropsResult } from "next";

export default function CreateProject() {}

export const getServerSideProps: GetServerSideProps = async () => {
  const store = getStore("campaigns");

  const campaignId = nanoid();
  await store.setJSON(campaignId, {
    createdAt: new Date().toISOString(),
    title: "New Campaign",
    description: "",
    icon: "💬",
    questions: [],
    deadline: new Date().toISOString(),
    location: "",
  } satisfies Campaign);

  return {
    redirect: {
      destination: `/app/${campaignId}`,
      statusCode: 307,
    },
  };
};
