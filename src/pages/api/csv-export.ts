import { getResponseStore } from "@/blobs";
import type { NextApiRequest, NextApiResponse } from "next";

function writeAsCsvLine(row: string[]): string {
  return row
    .map((cell) => cell.replace(/"/g, '"'))
    .map((cell) => `"${cell}"`)
    .join(",");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const campaignId = req.query.campaignId;
  if (typeof campaignId !== "string") {
    return res.status(400).json({ error: "campaignId must be a string" });
  }

  res.setHeader("Content-Type", "text/csv");
  const store = getResponseStore(campaignId);
  for await (const submissions of store.list({ paginate: true })) {
    for (const submission of submissions.blobs) {
      const content = await store.get(submission.key, { type: "json" });
      res.write(writeAsCsvLine(content) + "\n");
    }
  }
  res.end();
}
