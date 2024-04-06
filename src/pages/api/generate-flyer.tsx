import { ImageResponse } from "@vercel/og";
import { getCampaign } from "../submit/[id]/feedback";
import { getStore } from "@netlify/blobs";
import Image from "next/image";
import { generateQRCode } from "./generate-qr-code";

export const config = {
  runtime: "edge",
};

async function fetchImageAsCSSRule(campaignId: string) {
  let campaignImage = await getStore("campaign-images").get(campaignId, {
    type: "arrayBuffer",
  });
  if (!campaignImage) {
    const fallback = await fetch("https://i.wfcdn.de/teaser/1920/67538.png");
    campaignImage = await fallback.arrayBuffer();
  }
  const base64 = Buffer.from(campaignImage).toString("base64");
  const dataURL = `data:image/png;base64,${base64}`;
  const cssRule = `url(${dataURL})`;
  return cssRule;
}

export default async function handler(request: Request) {
  const url = new URL(request.url);
  const campaignId = url.searchParams.get("campaignId");
  if (!campaignId)
    return new Response("please provide campaignId as query param", {
      status: 400,
    });
  const campaign = await getCampaign(campaignId);
  if (!campaign) return new Response(null, { status: 404 });

  const title = campaign.title;

  let campaignImage = await getStore("campaign-images").get(campaignId, {
    type: "arrayBuffer",
  });

  const qrCodeSize = 600;

  const flyer = (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: await fetchImageAsCSSRule(campaignId),
        backgroundRepeat: "no-repeat",
        backgroundSize: "1080px 1080px",
        fontWeight: 600,
        color: "white",
      }}
    >
      <h1
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          margin: 0,
          fontSize: 50,
          fontFamily: "NYT Cheltenham",
          maxWidth: 900,
          whiteSpace: "pre-wrap",
          letterSpacing: -1,
          color: "black",
          background: "#f8aa4b",
        }}
      >
        {title}
      </h1>
      <img
        alt="qr code"
        height={qrCodeSize}
        src={generateQRCode(campaignId, qrCodeSize, url)}
        width={qrCodeSize}
      />
    </div>
  );

  const targetResolution = {
    width: 1080,
    height: 1080,
  };

  return new ImageResponse(flyer, {
    ...targetResolution,
    headers: {
      "Content-Disposition": 'attachment; filename="flyer.png"',
    },
  });
}
