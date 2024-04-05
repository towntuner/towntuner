import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

async function fetchImageAsCSSRule(url: string) {
  const response = await fetch(url);
  const base64 = Buffer.from(await response.arrayBuffer()).toString("base64");
  const dataURL = `data:image/png;base64,${base64}`;
  const cssRule = `url(${dataURL})`;
  return cssRule;
}

export default async function handler(request: Request) {
  const url = new URL(request.url);
  const title =
    url.searchParams.get("title") ??
    "Sollte hier ein Fahrradweg hindurchführen?";
  const image =
    url.searchParams.get("image") ?? "https://i.wfcdn.de/teaser/1920/67538.png";

  const socialMediaPost = (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundImage: await fetchImageAsCSSRule(image),
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

  return new ImageResponse(socialMediaPost, targetResolution);
}
