
export default function Description(props: { title: string, text: string }) {

    return (
        <main className=" w-full grid justify-items-center my-10 pt-10 pb-20 px-20 bg-[#eff9ff] ">
            <h1 className="text-2xl font-medium px-100">{props.title}</h1>
            <p className="text-s font-thin"><br></br>{props.text}</p>
        </main>
    )
}