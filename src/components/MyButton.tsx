export default function MyButton(props: { text: string }) {
  return (
    <button
      type="submit"
      className="font-merri text-justify text-center inline-block bg-[#86a3b3] text-white mx-2 p-2 text-xl leading-normal rounded-lg hover:scale-110  active:scale-90 transition-all max-w-32 max-h-24"
    >
      {props.text}
    </button>
  );
}

//type="submit" size="xl" className="m-5"
