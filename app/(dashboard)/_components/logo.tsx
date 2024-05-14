import Image from "next/image";

export const Logo = () => {
    return (
        <Image
        height={"130"}
        width={130}
        priority={false}
        alt="logo"
        src="/1234.svg"/>
    )
}