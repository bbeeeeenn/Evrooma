export default function ErrorFallback({ error }: { error: unknown }) {
    return (
        <div className="text-text-primary font-semibold">
            {error instanceof Error ? error.message : "Unexpected Error."}
        </div>
    );
}
