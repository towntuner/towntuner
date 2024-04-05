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
      <div className="flex justify-center items-center h-full max-w-5xl mx-auto">
        <Image alt="logo" src="/logo.png" width={120} height={140} />
      </div>
    </div>
  );
}
