export default function MyButton(props: { text: string }) {
  return (
    <button
      type="button"
      className="inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xl font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
    >
      {props.text}
    </button>
  );
}

//type="submit" size="xl" className="m-5"
