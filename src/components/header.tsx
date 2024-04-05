import { ChevronLeftIcon } from "@heroicons/react/16/solid";
import { Button } from "@tremor/react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  backHref?: string;
}

export default function Header({ backHref }: HeaderProps) {
  return (
    <div className="p-4 bg-[#F5F7F6]">
      <div className="flex justify-end flex-row items-center  py-2.5  ">
        <Image alt="logo" src="/logo.png" width={120} height={140} className="pr-5" />
        <Image alt="logo" src="/potsdam.png" width={90} height={100} />
      </div>
    </div>
  );
}
