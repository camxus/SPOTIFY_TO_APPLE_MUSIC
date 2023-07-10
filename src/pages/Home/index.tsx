import React, { useEffect, useState } from "react"
import style from "./Home.module.css"
import Results from "@src/components/Results"
import { Track } from "@src/utils/spotify/types"
import { getTrackFromApple } from "@src/utils/apple"
import { AppleTrack } from "@src/utils/apple/types"
import AppleResult from "@src/components/AppleResult"
import { ReactComponent as Shortcuts } from "@assets/icons/shortcuts.svg"

function Home() {
  const [spotifyResult, setSpotifyResult] = useState<Track>(null)
  const [appleResult, setAppleResult] = useState<AppleTrack>(null)

  useEffect(() => {
    if (spotifyResult)
      getTrackFromApple(spotifyResult.name, spotifyResult.artists).then((res) =>
        setAppleResult(res?.[0])
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
