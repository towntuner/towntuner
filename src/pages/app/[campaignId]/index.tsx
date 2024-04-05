import AnalyticsTab from "@/components/analyticsTab";
import CampaignShell from "@/components/campaign-shell";
import SettingsTab from "@/components/settingsTab";
import { Campaign } from "@/types/campaign";
import {
  ChartBarIcon,
  Cog6ToothIcon,
  WrenchIcon,
} from "@heroicons/react/16/solid";
import { getStore } from "@netlify/blobs";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";
import { GetServerSideProps } from "next";
import { useEffect } from "react";

interface CampaignHomeProps {
  campaign: Campaign;
}

export default function CampaignHome({ campaign, ...rest }: CampaignHomeProps) {
  return (
    <CampaignShell campaign={campaign}>
      <h1>{campaign.createdAt}</h1>
      <div className="max-w-lg">
        <TabGroup>
          <TabList variant="line" defaultValue="1">
            <Tab icon={WrenchIcon} value="1">
              Form Builder
            </Tab>
            <Tab icon={ChartBarIcon} value="2">
              Analytics
            </Tab>
            <Tab icon={Cog6ToothIcon} value="3">
              General
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat.
              </p>
            </TabPanel>
            <TabPanel>
              <AnalyticsTab />
            </TabPanel>
            <TabPanel>
              <SettingsTab />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
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
