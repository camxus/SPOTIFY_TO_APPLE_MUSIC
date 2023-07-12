import axios from "axios"
import qs from "qs"
import { Track } from "./types"

export type Search = {
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  total: number
  items: Track[]
}

export const searchSong = async (query: string, token: string) => {
  try {
    const {
      data: {
        tracks: { items },
      },
    } = await axios.get<{ tracks: Search }>(
      `https://api.spotify.com/v1/search?${qs.stringify({
        q: query,
        type: "track",
      })}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    return items
  } catch (e) {
    window.alert("Failed to Search Tracks")
    return []
  }
}
