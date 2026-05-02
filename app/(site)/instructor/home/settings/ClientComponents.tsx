"use client";

import { useActionState, useState } from "react";

export function ChangeName({
    userId,
    oldName,
}: {
    userId: string;
    oldName: string;
}) {
    const [originalName, setOriginalName] = useState(oldName);
    const [name, setName] = useState(oldName);

    const onAction = async () => {};

    const [_, formAction, isPending] = useActionState(onAction, null);

    return (
        <form action={formAction}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" />
        </form>
    );
}
