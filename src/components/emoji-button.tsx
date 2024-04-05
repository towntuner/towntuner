import { Menu, Transition } from "@headlessui/react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Fragment } from "react";

interface EmojiButtonProps {
  children: React.ReactNode;
  onEmojiSelect: (emoji: string) => void;
}

export default function EmojiButton({
  children,
  onEmojiSelect,
}: EmojiButtonProps) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="z-10 relative">{children}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 z-10">
          <Menu.Item>
            {({ close }) => (
              <Picker
                data={data}
                noCountryFlags
                theme="light"
                onEmojiSelect={(emoji: any) => {
                  onEmojiSelect(emoji.native);
                  close();
                }}
              />
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
