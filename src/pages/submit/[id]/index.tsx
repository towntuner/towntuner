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

export default function SubmissionPage({
  campaign,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <main>
      <Banner title={campaign.title}></Banner>
      <div className="grid justify-items-center">
        <p className="text-xl m-5">Sind Sie häufig in {campaign.location}?</p>
        <div className="mb-5">
          <AreaPreview
            latitude={52.39170852631827}
            longitude={13.126965482312585}
          />
        </div>
        <div className="content-center space-x-10">
          <Link href={`/submit/${router.query.id}/summary`}>
            <MyButton text="Ja">
            </MyButton>{" "}
          </Link>
          <Link href="/end">
            <MyButton text="Nein">
    
            </MyButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
