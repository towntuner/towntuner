import { ReactNode } from "react";
import Header from "./header";
import Image from "next/image";
import { Campaign } from "@/types/campaign";

interface CampaignShellProps {
  children: ReactNode;
  campaign: Campaign;
}

export default function CampaignShell({
  campaign,
  children,
}: CampaignShellProps) {
  return (
    <div className="flex flex-col">
      <Header backHref="/app" />
      <div className="flex flex-col items-stretch">
        <div aria-hidden="true" className="relative h-52">
          <Image
            src={`https://images.unsplash.com/photo-1485381771061-e2cbd5317d9c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            alt=""
            fill
            quality={80}
            sizes="100vw"
            className="h-52 w-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
