import { getStore } from "@netlify/blobs";
import formidable from "formidable";
import * as fs from "fs";

export default async function handler(req: any, res: any) {
  const form = formidable({});

  const { campaignId } = req.query;

  const uploadFile = async () => {
    // eslint-disable-next-line
    return new Promise((resolve, reject) => {
      form.parse(req, async function (err, fields, files: any) {
        if (err) {
          console.log(err);
          return reject({ success: false, message: "Error parsing form" });
        }

        const file = files.file[0];
        if (!file) {
          return reject({ success: false, message: "No file provided" });
        }

        const buffer = fs.readFileSync(file.filepath);
        const blob = new Blob([buffer]);

        await getStore("campaign-images").set(campaignId, blob);

        const campaignStore = getStore("campaigns");
        const currentCampaign = await campaignStore.get(campaignId, {
          type: "json",
        });
        await campaignStore.setJSON(campaignId, {
          ...currentCampaign,
          hasImage: true,
        });

        resolve({ success: true });
      });
    });
  };

  try {
    console.log("beginning upload...");
    const result = await uploadFile();
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
