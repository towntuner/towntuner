import { RiInstagramFill } from "@remixicon/react";
import { Button } from "@tremor/react";

export function SocialsTab(props: { campaignId: string }) {
  return (
    <div>
      <a href={`/api/generate-social-image?campaignId=${props.campaignId}`}>
        <Button icon={RiInstagramFill} size="xl" type="button">
          Instagram Ad
        </Button>
      </a>
    </div>
  );
}
