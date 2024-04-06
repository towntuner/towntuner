import { RiEdit2Fill, RiInstagramFill } from "@remixicon/react";
import { Button } from "@tremor/react";
import Script from "next/script";
import { useState } from "react";

declare global {
  interface Window {
    CCEverywhere: any;
  }
}

function AdobeExpress(props: { campaignId: string }) {
  return (
    <Script
      src="https://cc-embed.adobe.com/sdk/v4/CCEverywhere.js"
      onLoad={async () => {
        const ccEverywhere = await window.CCEverywhere.initialize(
          {
            clientId: process.env.NEXT_PUBLIC_ADOBE_EXPRESS_KEY,
            appName: "towntuner",
          },
          {
            locale: "de_DE",
          }
        );

        const imageResponse = await fetch(
          `/api/generate-social-image?campaignId=${props.campaignId}`
        );
        let string = "";
        new Uint8Array(await imageResponse.arrayBuffer()).forEach((byte) => {
          string += String.fromCharCode(byte);
        });
        string = btoa(string);

        ccEverywhere.editor.create(
          {},
          {
            callbacks: {
              onPublish({ projectId }: { projectId: string }) {
                // TODO: store this somewhere, so project can be re-opened later
                console.log("Adobe Project ID: ", projectId);
              },
            },
          }
        );
      }}
    />
  );
}

export function SocialsTab(props: { campaignId: string }) {
  const [showExpress, setShowExpress] = useState(false);
  return (
    <div className="flex space-x-4">
      <a href={`/api/generate-social-image?campaignId=${props.campaignId}`}>
        <Button icon={RiInstagramFill} size="xl" type="button">
          Instagram Ad
        </Button>
      </a>

      <Button
        icon={RiEdit2Fill}
        size="xl"
        type="button"
        onClick={() => setShowExpress(true)}
      >
        Adobe Express öffnen
      </Button>
      {showExpress && <AdobeExpress campaignId={props.campaignId} />}
    </div>
  );
}
