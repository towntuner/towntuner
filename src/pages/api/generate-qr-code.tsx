import { ImageResponse } from "@vercel/og";
import { getCampaign } from "../submit/[id]/feedback";
import { getStore } from "@netlify/blobs";
import qrcode from "yaqrcode";
import { Style } from "util";
import { CSSProperties } from "react";

export const config = {
  runtime: "edge",
};

export function generateQRCode(campaignId: string, size: number, url: URL) {
  const surveyUrl = new URL(`/submit/${campaignId}`, url);
  const base64 = qrcode(surveyUrl.toString(), {
    size: size,
  });
  return base64;
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

  return new ImageResponse(
    <img alt="qr code" height={size} src={generateQRCode(campaignId, size, url)} width={size} />,
    {
      width: size,
      height: size,
      headers: {
        "Content-Disposition": 'attachment; filename="qr_code.png"',
      },
    }
  );
}
