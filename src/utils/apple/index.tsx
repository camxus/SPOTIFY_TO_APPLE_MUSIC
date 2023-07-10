import axios from "axios"
import { Artist } from "../spotify/types"
import { AppleTrack } from "./types"

export const getTrackFromApple = async (
  title: string,
  artistsList: Artist[]
) => {
  const artists = artistsList.map((artist) => artist.name).join("+")
  const {
    data: { results },
  } = await axios.get<{ results: AppleTrack[] }>(
    `https://itunes.apple.com/search?term=${title}+${artists})}`
  )
  return results
}
