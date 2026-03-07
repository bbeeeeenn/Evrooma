"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="font-inter flex h-[200vh] flex-col items-center pt-40">
            <h1 className="text-5xl font-bold tracking-widest sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
                EVROOMA
            </h1>
            <p className="font-inria-sans mt-20 w-[80%] text-center text-3xl">
                <strong>Find</strong> Available Classrooms{" "}
                <strong>Instantly</strong>
            </p>
            <p className="mt-5 w-[80%] max-w-sm text-center text-xl">
                Helps quickly identify available classrooms through a
                centralized monitoring system designed for CCIS.
            </p>
            <br />
            <p>(wait wala pa to)</p>
            <Link
                href={"/home"}
                className="fixed inset-x-0 bottom-0 flex cursor-pointer items-center justify-center gap-3 bg-black px-20 py-5 font-bold tracking-wider text-white"
            >
                Continue <ArrowRight />
            </Link>
        </div>
    );
}
