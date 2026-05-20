import clsx from "clsx";

export function Divider({ text, center }: { text?: string; center?: boolean }) {
    return (
        <div
            className={clsx(
                "relative my-10 flex items-center justify-center font-semibold",
                !center && "sm:justify-start",
            )}
        >
            <div className="absolute inset-0 m-auto h-px rounded-full bg-green-100/50"></div>
            {text && (
                <p className="bg-green-primary text-md absolute w-fit px-2 text-center tracking-wide text-green-100 sm:ml-10 sm:text-lg">
                    {text}
                </p>
            )}
        </div>
    );
}
