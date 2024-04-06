export default function MyButton(props: { text: string }) {
  return (
    <button
      type="submit"
      className="font-merri inline-block bg-[#86a3b3] text-white mx-2 p-20 text-xl leading-normal rounded-lg hover:scale-110  active:scale-90 transition-all"
    >
      {props.text}
    </button>
  );
}

//type="submit" size="xl" className="m-5"
