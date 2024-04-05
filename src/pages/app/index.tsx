// 'use client';
import Header from "@/components/Header";
import { RiArrowRightUpLine } from "@remixicon/react";
import { Card, Divider } from "@tremor/react";
import { getStore } from "@netlify/blobs";
import { useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface CampaignProps {
  title: string;
  icons: string;
  color: string;
  href: string;
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const getServerSideProps: GetServerSideProps = async () => {
  const campaignsStore = getStore("campaigns");
  const { blobs } = await campaignsStore.list();
  let campaigns: any = [];
  await Promise.all(
    blobs.map(async (blob) => {
      campaigns.push(await campaignsStore.get(blob.key, { type: "json" }));
    })
  );
  console.log(campaigns);
  return { props: { campaigns: blobs } };
};

export default function App({
  campaigns,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Header />
      <div className="m-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Projects
          </h3>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-tremor-full bg-tremor-background-subtle text-tremor-label font-medium text-tremor-content-strong dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-strong">
            {campaigns.length}
          </span>
        </div>
        <Divider className="my-4" />
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign: any) => (
            <Card key={campaign.title} className="group">
              <div className="flex items-center space-x-4">
                <span
                  className={classNames(
                    campaign.color,
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-tremor-default font-medium"
                  )}
                  aria-hidden={true}
                >
                  {campaign.icons}
                </span>
                <div className="truncate">
                  <p className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                    <a href={campaign.href} className="focus:outline-none">
                      {/* Extend link to entire card */}
                      <span className="absolute inset-0" aria-hidden={true} />
                      {campaign.title}
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
