import { ImageResponse } from "@vercel/og";
import { getCampaign } from "../submit/[id]/feedback";
import { getStore } from "@netlify/blobs";
import qrcode from "yaqrcode";

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
  const size = 500;
  const campaignId = url.searchParams.get("campaignId");
  if (!campaignId)
    return new Response("please provide campaignId as query param", {
      status: 400,
    });
  const campaign = await getCampaign(campaignId);
  if (!campaign) return new Response(null, { status: 404 });

  const surveyUrl = new URL(`/submit/${campaignId}`, url);

  const base64 = qrcode(surveyUrl.toString(), {
    size,
  });

  return new ImageResponse(
    <img alt="Vercel" height={size} src={base64} width={size} />,
    {
      width: size,
      height: size,
      headers: {
        "Content-Disposition": 'attachment; filename="qr_code.png"',
      },
    }
  );
}
