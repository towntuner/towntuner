import { getStore } from "@netlify/blobs";
import { nanoid } from "nanoid";
import { GetServerSideProps, GetServerSidePropsResult } from "next";

export default function CreateProject() {}

export const getServerSideProps: GetServerSideProps = async () => {
  const store = getStore("campaigns");

  const campaignId = nanoid();
  await store.setJSON(campaignId, {
    createdAt: new Date(),
  });

  return {
    props: {},
    redirect: {
      destination: "/app",
      statusCode: 307,
    },
  };
};
