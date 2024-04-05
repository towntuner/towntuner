import { getResponseStore } from "@/blobs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const surveyId = req.query.surveyId;
  if (typeof surveyId !== "string") {
    return res.status(400).json({ error: "surveyId must be a string" });
  }

  res.setHeader("Content-Type", "text/csv");
  const store = getResponseStore(surveyId);
  for await (const submissions of store.list({ paginate: true })) {
    for (const submission of submissions.blobs) {
      const content = await store.get(submission.key, { type: "json" });
      res.write(content.join(",") + "\n");
    }
  }
  res.end();
}
