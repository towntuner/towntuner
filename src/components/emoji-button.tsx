import { Dialog, Menu } from "@headlessui/react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface EmojiButtonProps {
  children: React.ReactNode;
}

export default function EmojiButton({ children }: EmojiButtonProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="z-10">{children}</Menu.Button>
      <Menu.Items className="absolute left-0 mt-2">
        <Menu.Item>
          <Picker data={data} noCountryFlags theme="light" />
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
