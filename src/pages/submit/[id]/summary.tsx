import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { RiArrowRightLine } from "@remixicon/react";
import { Button } from "@tremor/react";

import Banner from "../../../components/Banner";
import Description from "@/components/Description";
import { getCampaign } from "./feedback";
import { Campaign } from "@/types/campaign";

export const getServerSideProps = (async (context) => {
  const campaignId = context.params!.id as string;

  const campaign = await getCampaign(campaignId);
  if (!campaign) {
    return {
      notFound: true,
    };
  }

  return { props: { campaign } };
}) satisfies GetServerSideProps<{ campaign: Campaign }>;

export function ProjectSummary(props: {
  campaign: Campaign;
  campaignId: string;
}) {
  return (
    <div className="grid justify-items-center">
      <img
        src={`/api/${props.campaignId}/load-campaign-image`}
        style={{ height: 300 }}
        alt="project image"
        className="m-5"
      />
      <Description
        title={props.campaign.title}
        text={props.campaign.description}
      ></Description>
    </div>
  );
}

export default function ProjectSummaryPage({
  campaign,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const campaignId = router.query.id as string;
  return (
    <main>
      <Banner title={campaign.title}></Banner>
      <div className="grid justify-items-center">
        <ProjectSummary campaign={campaign} campaignId={campaignId} />
        <div className="flex justify-center">
          <Link href={`/submit/${campaignId}/feedback`}>
            <Button
              icon={RiArrowRightLine}
              iconPosition="right"
              variant="light"
              className="text-white m-5 mb-20 rounded-full px-10 py-3 bg-tremor-brand hover:bg-tremor-brand-emphasis hover:text-white"
            >
              I want to participate!
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
