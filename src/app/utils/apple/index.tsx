import axios from "axios"
import { Artist } from "../spotify/types"
import { AppleTrack } from "./types"
import qs from "qs"

export const getTrackFromApple = async (
  title: string,
  artistsList: Artist[],
  album: string
) => {
  try {
    console.log(album)
    const artists = artistsList.map((artist) => artist.name).join("+")
    const {
      data: { results },
    } = await axios.get<{ results: AppleTrack[] }>(
      `https://itunes.apple.com/search?term=${title}+${artists}+${album}`
    )
    if (results.length === 0) {
      throw new Error("NO_TRACKS_FOUND")
    }
    return (
      results.find(
        (track) =>
          track.trackName.includes(title) &&
          track.artistName.includes(artists[0]) &&
          album &&
          track.collectionName.includes(album)
      ) ??
      results.find((track) => track.trackName === title) ??
      results.find((track) => track.trackName.includes(title)) ??
      results[0]
    )
  } catch (err) {
    window.alert("Failed to find in Apple Music")
  }
}
