import { ReactNode, useMemo, useRef, useState } from "react";
import Header from "./header";
import Image from "next/image";
import { Campaign } from "@/types/campaign";
import { RawInput } from "./raw-input";
import EmojiButton from "./emoji-button";
import { Button, Textarea } from "@tremor/react";
import clsx from "clsx";
import { useRouter } from "next/router";

interface CampaignShellProps {
  children: ReactNode;
  campaign: Campaign;
}

export default function CampaignShell({
  campaign,
  children,
}: CampaignShellProps) {
  const [emoji, setEmoji] = useState(campaign.icon);
  const [title, setTitle] = useState(campaign.title);
  const [desc, setDesc] = useState(campaign.description);

  const router = useRouter();

  const canSave = useMemo(() => {
    if (emoji !== campaign.icon) return true;
    if (title !== campaign.title) return true;
    if (desc !== campaign.description) return true;

    return false;
  }, [emoji, title, desc]);

  async function handleSave() {
    if (!canSave) return;

    const url = new URL(router.pathname);
    url.searchParams.set("save", "true");

    url.searchParams.set("emoji", emoji);
    url.searchParams.set("title", title);
    url.searchParams.set("desc", desc);

    await fetch(url.toString(), {
      method: "POST",
    });

    router.reload();
  }

  return (
    <form className="flex flex-col">
      <Header backHref="/app" />
      <div className="flex flex-col items-stretch">
        <div aria-hidden="true" className="relative h-52">
          <Image
            src={`https://images.unsplash.com/photo-1485381771061-e2cbd5317d9c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            alt=""
            fill
            quality={80}
            sizes="100vw"
            className="h-52 w-full object-cover object-center"
          />
        </div>
      </div>
      <div className="flex flex-col w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-start gap-3">
          <EmojiButton onEmojiSelect={setEmoji}>
            <div className="rounded-2xl bg-white -mt-10 z-10 text-5xl p-3 border-tremor-border border hover:bg-tremor-background-muted transition duration-100">
              {emoji}
            </div>
          </EmojiButton>
          <RawInput
            placeholder="Add a title"
            defaultValue={campaign.title}
            onChange={(elem) => setTitle(elem.target.value)}
          />
          <Textarea
            placeholder="Add a description..."
            className="font-sans !text-lg"
            defaultValue={campaign.description}
            onValueChange={setDesc}
          />
        </div>
      </div>
      <div
        className={clsx(
          "fixed left-0 w-full bg-white border-gray-100 border pt-4 pb-6 shadow-[rgba(0,0,0,0.1)_0px_0px_10px_0px] transition-all duration-500",
          canSave ? "bottom-0" : "-bottom-28"
        )}
      >
        <div className="max-w-4xl flex justify-end items-start mx-auto w-full">
          <Button onClick={handleSave}>Publish</Button>
        </div>
      </div>
    </form>
  );
}
