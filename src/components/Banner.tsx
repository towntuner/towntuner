export default function Banner(props: { title: string }) {
  return (
    <div className="relative isolate  gap-x-6 overflow-hidden bg-[#BFDBFF] px-6 py-2.5 font-merri">
      <h1 className="text-lg leading-10 text-gray-900 text-center">
        <strong className="font-bold text-xl">{props.title}</strong>
      </h1>
    </div>
  );
}
