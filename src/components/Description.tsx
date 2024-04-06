export default function Description(props: { title: string; text: string }) {
  return (
    <main className=" w-full grid justify-items-center my-5 pt-5 pb-10 px-20 bg-blue-200 ">
      <h1 className="text-2xl font-medium px-100">{props.title}</h1>
      <p className="text-s font-thin">
        <br></br>
        {props.text}
      </p>
    </main>
  );
}
