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
console.log("token", token)
  try {
    if (token) {const {
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
} else { throw new Error("NO_TOKEN")}
    
  } catch (e) {
    console.log(e.message)
    return []
  }
}
