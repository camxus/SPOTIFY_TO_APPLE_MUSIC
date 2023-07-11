"use client"

import React, { useEffect, useState } from "react"
import { useDebounce } from "usehooks-ts"
import style from "./Results.module.css"
import { searchSong } from "@/app/utils/spotify"
import { Track } from "@/app/utils/spotify/types"
import { getAuthToken } from "@/app/utils/auth"
import Image from "next/image"

function Results({
  setTrack,
}: {
  setTrack: React.Dispatch<React.SetStateAction<Track | undefined>>
}) {
  const [token, setToken] = useState("")
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Track[]>([])
  const debouncedValue = useDebounce<string>(query, 500)

  useEffect(() => {
    getAuthToken().then((token) => {
      setToken(token)
    })
  }, [])

  useEffect(() => {
    console.log(token)
    if (debouncedValue && token)
      searchSong(debouncedValue, token).then((tracks) =>
        setResults(tracks)
      )
  }, [debouncedValue, token])

  return (
    <div className={style.search_container}>
      <input
        value={query}
        className={style.search_field}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Song..."
        autoFocus
        aria-haspopup="true"
        tabIndex={0}
      />
      {results.length > 0 && !!query && (
        <table className={style.results_table} aria-expanded="true">
          {results.slice(0, 5).map((track, i) => (
            <tr
              key={i}
              onClick={() => {
                setTrack(results[i])
                setResults([])
                setQuery("")
              }}
            >
              <button tabIndex={0}>
                <td>
                  <div className={style.results_image}>
                    <Image
                      fill
                      objectFit="contain"
                      alt={track.name + "Album Cover"}
                      src={track.album.images[0].url}
                    />
                  </div>
                </td>
                <td className={style.track_details}>
                  <p className={style.track_name}>{track.name}</p>
                  <p className={style.album_name}>{track.album.name}</p>
                </td>
                <td>
                  <p>{track.artists[0].name}</p>
                </td>
              </button>
            </tr>
          ))}
        </table>
      )}
    </div>
  )
}

export default Results
