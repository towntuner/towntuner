export default function MyButton(props: { text: string }) {
  return (
    <button
      type="submit"
      className="font-merri inline-block bg-[#ff6150] mx-2 my-20 p-20 text-xl leading-normal rounded-lg">
      {props.text}
    </button>
  );
}

//type="submit" size="xl" className="m-5"
