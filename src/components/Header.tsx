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
      <div className="flex justify-between items-center h-full max-w-5xl mx-auto">
        {backHref && (
          <Link
            passHref
            href={backHref}
            className="flex items-center justify-center"
          >
            <Button variant="light" icon={ChevronLeftIcon} color="gray">
              Go back
            </Button>
          </Link>
        )}
        <Image alt="logo" src="/logo.png" width={120} height={160} />
        <div className="w-[72px]" />
      </div>
    </div>
  );
}
