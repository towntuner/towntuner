import formidable from "formidable";
import * as fs from "fs";

export default async function handler(req: any, res: any) {
  const form = new formidable.IncomingForm();

  const uploadFile = async () => {
    // eslint-disable-next-line
    return new Promise((resolve, reject) => {
      form.parse(req, async function (err, fields, files: any) {
        const now = new Date().getTime();
        let filepath = `${fields.offerId || "dummy"}/${
          now + "_" + files.file.originalFilename
        }`;
        filepath = filepath.replace(/\s/g, "-"); // IN CASE YOU NEED TO REPLACE SPACE OF THE IMAGE NAME
        const rawData = fs.readFileSync(files.file.filepath);

        console.log(rawData);
        console.log("Have raw data");

        if (err) {
          console.log(err);
          return reject({ success: false });
        }
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
    res.status(400).send({ success: false });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired value here
    },
  },
};
