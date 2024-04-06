import { Button } from "@tremor/react";

export default function MyButton(props: { text: string }) {
  return (
    <>
      {/*}
    <button
    type="submit"
    className="w-full font-merri inline-block bg-[#86a3b3] text-white mx-2 p-2 text-xl leading-normal rounded-lg hover:scale-110  active:scale-90 transition-all"
    >
      {props.text}
    </button>
*/}
      <Button
        variant="light"
        className="w-full text-white rounded-full px-10 py-3 bg-tremor-brand hover:bg-tremor-brand-emphasis hover:text-white"
      >
        {props.text}
      </Button>
    </>
  );
}

//type="submit" size="xl" className="m-5"
