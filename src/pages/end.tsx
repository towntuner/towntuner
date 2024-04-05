import Banner from "@/components/Banner";

export default function end() {
  return (
    <main>
      <Banner title="Vielen Dank!"></Banner>
      <div className="grid justify-items-center">
        <p className="text-xl m-5">
          Möchten Sie Information zu Projekten in Ihrem Kiez zu geschickt
          bekommen?
        </p>
      </div>
    </main>
  );
}
