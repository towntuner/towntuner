import { getStore } from "@netlify/blobs";

export function getResponseStore(campaignId: string) {
  return getStore(`responses:${campaignId}`);
}