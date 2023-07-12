import { encode } from "base-64"
import { NextResponse } from "next/server"
import qs from "qs"

export async function GET() {
  try {
    const { access_token } = await (
      await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          Authorization: `Basic ${encode(
            `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
          )}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: qs.stringify({ grant_type: "client_credentials" }),
        next: { revalidate: 0 },
      })
    ).json()
    if (
      !process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID ||
      !process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
    )
      throw new Error("env undefined")
    return NextResponse.json({ access_token }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json(e.message, { status: 500 })
  }
}
