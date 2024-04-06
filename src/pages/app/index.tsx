import Header from "@/components/header";
import { RiArrowRightUpLine } from "@remixicon/react";
import { Card, Divider } from "@tremor/react";
import { getStore } from "@netlify/blobs";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Campaign } from "@/types/campaign";
import { generatePalette } from "emoji-palette";
import { useEffect } from "react";
import { PlusIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";

interface CampaignCardProps {
  campaign: Campaign;
  key: string;
  color: string;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const getServerSideProps: GetServerSideProps = async () => {
  const campaignsStore = getStore("campaigns");
  const { blobs } = await campaignsStore.list();
  const campaigns: CampaignCardProps[] = await Promise.all(
    blobs.map(async (blob) => {
      const campaignCard: CampaignCardProps = {
        campaign: await campaignsStore.get(blob.key, {
          type: "json",
        }),
        key: blob.key,
        color: ""
      };
      return campaignCard;
    })
  );
  return { props: { campaigns } };
};

function Hero() {
  return (
    <div className="mx-auto max-w-4xl py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Tune into the public opinion
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Host your survey on TownTuner within a minute. We help getting it to
          all your citizens by generating marketing material for you: Flyers, QR
          Code Stickers, Instagram Ads, whatever you need. Analyze results
          directly in TownTuner or export them to Excel.
        </p>
      </div>
    </div>
  );
}

export default function App({
  campaigns,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    campaigns.forEach((campaign: CampaignCardProps) => {
      campaign.color = generatePalette(campaign.campaign.icon)[
        Math.floor(generatePalette(campaign.campaign.icon).length / 2)
      ];
    });
  }, []);

  const router = useRouter();

  return (
    <>
      <Header />
      <Hero />
      <div className="m-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Campaigns
          </h3>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-tremor-full bg-tremor-background-subtle text-tremor-label font-medium text-tremor-content-strong dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-strong">
            {campaigns.length}
          </span>
        </div>
        <Divider className="my-4" />
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign: CampaignCardProps) => (
            <Card key={campaign.campaign.title} className="group">
              <div className="flex items-center space-x-4">
                <span
                  className={classNames(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-tremor-default font-medium"
                  )}
                  aria-hidden={true}
                  style={{ backgroundColor: campaign.color }}
                >
                  {campaign.campaign.icon}
                </span>
                <div className="truncate">
                  <p className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    <a
                      href={"/app/" + campaign.key}
                      className="focus:outline-none"
                    >
                      <span className="absolute inset-0" aria-hidden={true} />
                      {campaign.campaign.title}
                    </a>
                  </p>
                </div>
              </div>
              <span
                className="pointer-events-none absolute right-4 top-4 text-tremor-content-subtle group-hover:text-tremor-content dark:text-dark-tremor-content-subtle group-hover:dark:text-dark-tremor-content"
                aria-hidden={true}
              >
                <RiArrowRightUpLine className="h-4 w-4" aria-hidden={true} />
              </span>
            </Card>
          ))}
          <button
            onClick={() => {
              router.push("/app/new");
            }}
            type="button"
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-gray-400 focus:outline-none"
          >
            <PlusIcon className="w-8 h-8 mx-auto" />
            <span className="mt-2 block text-sm font-semibold text-gray-900">
              Add campaign
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
