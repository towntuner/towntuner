import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import mock_location from "./mock_location.png";
import { Button } from "@tremor/react";
import Banner from "../../../components/Banner";
import Link from "next/link";
import { useRouter } from "next/router";
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

export default function SubmissionPage({
  campaign,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <main>
      <Banner title={campaign.title}></Banner>
      <div className="grid justify-items-center">
        <p className="text-xl m-5">Sind Sie häufig in {campaign.location}?</p>
        <Image
          src={mock_location}
          height={300}
          alt="location mock"
          className="m-5"
        />
        <div className="content-center space-x-10">
          <Link href={`/submit/${router.query.id}/summary`}>
            <Button variant="primary" color="green">
              Ja
            </Button>{" "}
          </Link>
          <Link href="/end">
            <Button variant="primary" color="red">
              Nein
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
