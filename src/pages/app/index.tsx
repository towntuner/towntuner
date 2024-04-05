import Header from "@/components/header";
import { RiArrowRightUpLine } from "@remixicon/react";
import { Card, Divider } from "@tremor/react";
import { getStore } from "@netlify/blobs";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Campaign } from "@/types/campaign";
import { generatePalette } from "emoji-palette";
import { useEffect } from "react";

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
  let campaigns: CampaignCardProps[] = [];
  campaigns = await Promise.all(
    blobs.map(async (blob) => {
      let campaignCard: CampaignCardProps = {} as CampaignCardProps;
      campaignCard.campaign = await campaignsStore.get(blob.key, {
        type: "json",
      });
      campaignCard.key = blob.key;
      console.log(campaignCard);
      return campaignCard;
    })
  );
  console.log(campaigns);
  return { props: { campaigns } };
};

export default function App({
  campaigns,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    campaigns.forEach((campaign: CampaignCardProps) => {
      campaign.color = generatePalette(campaign.campaign.icon)[
        Math.floor(generatePalette(campaign.campaign.icon).length / 2)
      ];
      console.log(campaign.color);
    });
  }, []);

  return (
    <>
      <Header />
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
                    {
                      // TODO: adjust link
                    }
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
        </div>
      </div>
    </>
  );
}
