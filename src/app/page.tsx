"use client"

import React, { useEffect, useState } from "react"
import style from "./Home.module.css"

import Shortcuts from "./assets/icons/shortcuts.svg"
import { AppleTrack } from "./utils/apple/types"
import { Track } from "./utils/spotify/types"
import { getTrackFromApple } from "./utils/apple"
import Results from "./components/Results"
import AppleResult from "./components/AppleResult"

function Home() {
  const [spotifyResult, setSpotifyResult] = useState<Track>()
  const [appleResult, setAppleResult] = useState<AppleTrack>()

  useEffect(() => {
    if (spotifyResult)
      getTrackFromApple(spotifyResult.name, spotifyResult.artists).then((res) =>
        setAppleResult(res)
      )
  }, [spotifyResult])

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h1>Spotify to Apple Music</h1>
        <p>by Cam K</p>
      </div>
      <Results {...{ setTrack: setSpotifyResult }} />
      <AppleResult
        {...{
          track: appleResult,
          setTrack: setAppleResult,
          spotify: spotifyResult,
        }}
      />
      <a
        href="https://www.icloud.com/shortcuts/f51d38f4c6594fe8be747e1dc15ef468"
        className={style.shortcuts}
      >
        <button>
          <Shortcuts />
          Try Apple Shortcut
        </button>
      </a>
    </div>
  )
}

export default Home