import { getStore } from "@netlify/blobs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function deleteCampaign(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { campaignId } = req.query;

  await getStore("campaigns").delete(campaignId as string);
  res.end();
}
