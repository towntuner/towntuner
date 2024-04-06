import { RiEdit2Fill, RiInstagramFill, RiQrCodeFill } from "@remixicon/react";
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
          `/api/${props.campaignId}/load-campaign-image`
        );
        let base64 = "";
        new Uint8Array(await imageResponse.arrayBuffer()).forEach((byte) => {
          base64 += String.fromCharCode(byte);
        });
        base64 = btoa(base64);

        ccEverywhere.editor.createWithAsset(
          {
            asset: {
              type: "image",
              dataType: "base64",
              data: `data:image/png;base64,${base64}`,
            },
          },
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
        <Button icon={RiInstagramFill} size="xl" type="button" color="purple">
          Instagram Ad
        </Button>
      </a>

      <a href={`/api/generate-qr-code?campaignId=${props.campaignId}`}>
        <Button icon={RiQrCodeFill} size="xl" type="button" color="lime">
          QR Code
        </Button>
      </a>

      <Button
        icon={RiEdit2Fill}
        size="xl"
        type="button"
        onClick={() => setShowExpress(true)}
        color="orange"
      >
        Adobe Express öffnen
      </Button>
      {showExpress && <AdobeExpress campaignId={props.campaignId} />}
    </div>
  );
}
