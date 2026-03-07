"use client";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <section className="font-inter relative flex h-dvh flex-col items-center pt-40">
                <h1 className="text-5xl font-bold tracking-widest sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                    EVROOMA
                </h1>
                <p className="font-inria-sans mt-20 w-[80%] text-center text-3xl">
                    <strong>Find</strong> Available Classrooms{" "}
                    <strong>Instantly</strong>
                </p>
                <br />
                <p className="opacity-30">(wait wala pa to)</p>
                <button
                    onClick={() => (window.location.href = "#roles")}
                    className="inset-x-0 bottom-0 mt-5 flex cursor-pointer items-center gap-3 rounded-full bg-black px-20 py-3 font-bold tracking-wider text-white"
                >
                    Continue <ArrowDown />
                </button>
            </section>
            <section id="roles" className="bg-black-400 relative h-dvh">
                <Image
                    src={"/wave.svg"}
                    alt={""}
                    width={200}
                    height={200}
                    loading="eager"
                    className="pointer-events-none absolute bottom-full w-full sm:translate-y-1/12 md:translate-y-1/8 lg:translate-y-1/7"
                />
            </section>
        </>
    );
}
