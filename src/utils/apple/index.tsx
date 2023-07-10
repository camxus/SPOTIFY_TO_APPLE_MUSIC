import axios from "axios"
import { Artist } from "../spotify/types"
import { AppleTrack } from "./types"

export const getTrackFromApple = async (
  title: string,
  artistsList: Artist[]
) => {
  try {
    const artists = artistsList.map((artist) => artist.name).join("+")
    const {
      data: { results },
    } = await axios.get<{ results: AppleTrack[] }>(
      `https://itunes.apple.com/search?term=${title}+${artists})}`
    )
    if (results.length === 0) {
      throw new Error("NO_TRACKS_FOUND")
    }
    return results
  } catch (err) {
    window.alert("Failed to find in Apple Music")
  }
}
