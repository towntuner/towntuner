import { getStore } from "@netlify/blobs";

export function getResponseStore(surveyId: string) {
  return getStore(`responses:${surveyId}`);
}