
export default function Description(props: { text: string }) {

    return (
        <p className=" grid justify-items-center my-10 px-20 py-20 bg-[#eff9ff]  text-s font-thin">
            {props.text}
        </p>
    )
}