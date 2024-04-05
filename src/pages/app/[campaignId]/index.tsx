import CampaignShell from "@/components/campaign-shell";
import { Campaign } from "@/types/campaign";
import { getStore } from "@netlify/blobs";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

interface CampaignHomeProps {
  campaign: Campaign;
}

export default function CampaignHome({ campaign, ...rest }: CampaignHomeProps) {
  return (
    <CampaignShell campaign={campaign}>
      <h1>{campaign.createdAt}</h1>
    </CampaignShell>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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

  return {
    props: { campaign },
  };
};
