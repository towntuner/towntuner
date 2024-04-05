import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  const title = "Sollte hier ein Fahrradweg hindurchführen?";
  const imageData = await fetch(
    "https://i.wfcdn.de/teaser/1920/67538.png"
  ).then((res) => res.arrayBuffer());

  const imageBase64 = Buffer.from(imageData).toString("base64");

  const image = (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundImage: `url(data:image/png;base64,${imageBase64})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontWeight: 600,
        color: "white",
      }}
    >
      <h1
        style={{
          position: "absolute",
          bottom: 60,
          left: 80,
          margin: 0,
          fontSize: 50,
          fontFamily: "NYT Cheltenham",
          maxWidth: 900,
          whiteSpace: "pre-wrap",
          letterSpacing: -1,
        }}
      >
        {title}
      </h1>
    </div>
  );

  const targetResolution = {
    width: 1080,
    height: 1080,
  };

  return new ImageResponse(image, targetResolution);
}
