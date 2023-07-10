import React, { useState } from "react"
import { AppleTrack } from "@src/utils/apple/types"
import style from "./AppleResult.module.css"
import { X } from "react-feather"
import { Track } from "@src/utils/spotify/types"

type CopiedState = boolean | "error"

function AppleResult({
  track,
  setTrack,
  spotify,
}: {
  track: AppleTrack
  setTrack
  spotify: Track
}) {
  const [copied, setCopied] = useState<CopiedState>(false)
  return (
    <>
      {track && (
        <X
          className={style.close_button}
          onClick={() => {
            setCopied(false)
            setTrack(null)
          }}
        />
      )}
      <div data-open={!!track} className={style.apple_result_modal}>
        {track && (
          <div className={style.apple_result_container}>
            <img
              className={style.album_image}
              alt="Result Album Cover"
              src={spotify.album.images[0].url}
            />
            <p className={style.track_name}>{track.trackName}</p>
            <p className={style.artist_name}>{track.artistName}</p>
            <div className={style.buttons}>
              <button
                className={style.copy_to_clipboard}
                onClick={() => {
                  try {
                    setCopied(false)
                    navigator.clipboard.writeText(track.trackViewUrl)
                    setCopied(true)
                  } catch (e) {
                    setCopied("error")
                  }
                }}
                data-copied={copied}
              >
                Copy Link to Clipboard
              </button>
              <a
                href={spotify.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
              >
                <button className={style.spotify}>Play on Spotify</button>
              </a>
              <a href={track.trackViewUrl} target="_blank" rel="noreferrer">
                <button className={style.apple_music}>
                  Play on AppleMusic
                </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AppleResult
