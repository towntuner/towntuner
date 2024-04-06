import { getStore } from "@netlify/blobs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function loadCampaignImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { campaignId } = req.query;

  const file = await getStore("campaign-images").get(campaignId as string, {
    type: "stream",
  });

  if (!file) {
    res.status(500).send("Not found");
    return;
  }

  res.setHeader("Content-Type", "image/png");
  const reader = file.getReader();

  while (true) {
    const result = await reader.read();
    if (result.done) {
      res.end();
      return;
    }

    res.write(result.value);
  }
}

export const config = {
  api: {
    responseLimit: false,
    bodyParser: false,
  },
};
