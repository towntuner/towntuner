import Image from "next/image";

export default function Header() {
  return (
    <div className="m-4">
      <div className="flex justify-between items-center h-full">
        <div></div>
        <div>
          <Image alt="logo" src="/logo.png" width={160} height={160} />
        </div>
        <div>
          <Image
            className="rounded-full"
            alt="user"
            src="/user.jpg"
            width={32}
            height={32}
          />{" "}
        </div>
      </div>
    </div>
  );
}
