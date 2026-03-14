import { NextRequest, NextResponse, ProxyConfig } from "next/server";

export async function proxy(_: NextRequest) {
    // await new Promise((resolve) => setTimeout(resolve, 500)); // simulate a lag
    return NextResponse.next();
}

export const config: ProxyConfig = {};
