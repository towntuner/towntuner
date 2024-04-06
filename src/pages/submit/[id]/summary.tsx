import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import mock_project_image from "./mock_radweg_stahnsdorfer.jpg";

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

export function ProjectSummary(props: { campaign: Campaign }) {
  return (
    <div className="grid justify-items-center">
      <Image
        src={mock_project_image}
        height={300}
        alt="project image"
        className="m-5"
      />
      <Description title={props.campaign.title} text={props.campaign.description}></Description>
    </div>
  );
}

export default function ProjectSummaryPage({
  campaign,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <main>
      <Banner title={campaign.title}></Banner>
      <div className="grid justify-items-center">
        <ProjectSummary campaign={campaign} />
        <div className="flex justify-center">
          <Link href={`/submit/${router.query.id}/feedback`}>
            <Button
              icon={RiArrowRightLine}
              iconPosition="right"
              variant="light"
              className="text-[#86a3b3]"
            >
              Feedback geben
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
