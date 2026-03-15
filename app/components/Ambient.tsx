"use client";

import { useEffect, useRef } from "react";

export default function BackgroundAudio() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const onEvent = (e: Event) => {
        console.log(e);
    };

    useEffect(() => {
        if (!audioRef.current) return;

        const theAudio = audioRef.current;

        theAudio.volume = 0.2;
        theAudio.addEventListener("change", onEvent);

        return () => {
            if (theAudio) theAudio.removeEventListener("change", onEvent);
        };
    }, []);

    return (
        <audio ref={audioRef} autoPlay loop>
            <source src="/ambient.mp3" type="audio/mpeg" />
        </audio>
    );
}
