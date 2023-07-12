import axios from "axios"
import { encode } from "base-64"
import { NextResponse } from "next/server"
import qs from "qs"

export async function GET() {
  try {
    const {
      data: { access_token },
    } = await axios.post<{ access_token: string }>(
      "https://accounts.spotify.com/api/token",
      qs.stringify({ grant_type: "client_credentials" }),
      {
        headers: {
          Authorization:
            `Basic ${encode(
              `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
            )}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    if (!process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || !process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET) throw new Error("env undefined"))
    return NextResponse.json({ access_token }, { status: 200 })
  } catch (e: any) {
    return NextResponse.json(e.message, { status: 500 })
  }
}
