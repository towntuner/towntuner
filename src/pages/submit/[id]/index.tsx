import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import mock_location from "./mock_location.png";
import { Button } from "@tremor/react";
import Banner from "../../../components/Banner";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCampaign } from "./feedback";
import { Campaign } from "@/types/campaign";
import AreaPreview from "@/components/areaPreview";
import MyButton from "@/components/MyButton";
import { getStore } from "@netlify/blobs";

export const getServerSideProps = (async (context) => {
  const campaignId = context.params!.id as string;

  const campaign = await getCampaign(campaignId);
  if (!campaign) {
    return {
      notFound: true,
    };
  }

  const viewsStore = await getStore("views");
  const views = await viewsStore.get(campaignId, { type: "json" });
  if (!views) {
    await viewsStore.setJSON(campaignId, 1);
  }
  await viewsStore.setJSON(campaignId, Number(views) + 1);

  return { props: { campaign } };
}) satisfies GetServerSideProps<{ campaign: Campaign }>;

export default function SubmissionPage({
  campaign,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <main>
      <Banner title={campaign.title}></Banner>
      <div className="grid justify-items-center">
        <p className="text-xl m-5">Are you often in {campaign.location}?</p>
        {/*
          TODO: Replace this with a real map
          */}
        <AreaPreview
          latitude={52.39170852631827}
          longitude={13.126965482312585}
        />
        <div className="content-center m-5 flex flex-col gap-5 p-5">
          <Link href={`/submit/${router.query.id}/summary`}>
            <MyButton text="Yes!"></MyButton>{" "}
          </Link>
          <Link href="/end">
            <MyButton text="No."></MyButton>
          </Link>
        </div>
      </div>
    </main >
  );
}
