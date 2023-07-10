import React, { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { searchSong } from "@src/utils/spotify"
import { useDebounce } from "usehooks-ts"
import { Track } from "@src/utils/spotify/types"
import style from "./Results.module.css"

function Results({ setTrack }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Track[]>([])
  const [cookies, setCookie, removeCookie] = useCookies(["bearer"])
  const debouncedValue = useDebounce<string>(query, 500)

  useEffect(() => {
    if (debouncedValue)
      searchSong(debouncedValue, cookies.bearer).then((tracks) =>
        setResults(tracks)
      )
  }, [debouncedValue, cookies])
  return (
    <div className={style.search_container}>
      <input
        value={query}
        className={style.search_field}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Song..."
        autoFocus
      />
      {results.length > 0 && !!query && (
        <table className={style.results_table}>
          {results.slice(0, 5).map((track, i) => (
            <tr
              key={i}
              onClick={() => {
                setTrack(results[i])
                setResults([])
                setQuery("")
              }}
            >
              <td>
                <img
                  alt={track.name + "Album Cover"}
                  src={track.album.images[0].url}
                />
              </td>
              <td className={style.track_details}>
                <p className={style.track_name}>{track.name}</p>
                <p className={style.album_name}>{track.album.name}</p>
              </td>
              <td>
                <p>{track.artists[0].name}</p>
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  )
}

export default Results
