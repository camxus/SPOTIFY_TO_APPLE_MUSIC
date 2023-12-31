"use client"

import React, { useState } from "react"
import style from "./AppleResult.module.css"
import { X } from "react-feather"
import { Track } from "@/app/utils/spotify/types"
import { AppleTrack } from "@/app/utils/apple/types"
import Image from "next/image"
import classnames from "classnames"
import BigImageBackDrop from "../BigImageBackDrop"

type CopiedState = boolean | "error"

function AppleResult({
  track,
  setTrack,
  spotify,
}: {
  track: AppleTrack | undefined
  setTrack: React.Dispatch<React.SetStateAction<AppleTrack | undefined>>
  spotify: Track | undefined
}) {
  const [copied, setCopied] = useState<CopiedState>(false)
  return (
    <>
      {track && (
        <button
          className={style.close_button}
          onClick={() => {
            setCopied(false)
            setTrack(undefined)
          }}
        >
          <X />
        </button>
      )}
      <div data-open={!!track} className={style.apple_result_modal}>
        {track && (
          <div className={style.apple_result_container}>
            <BigImageBackDrop track={spotify} />
            <div className={style.album_image}>
              <Image
                layout="fill"
                objectFit="contain"
                alt="Result Album Cover"
                src={spotify?.album.images[0].url ?? ""}
              />
            </div>
            <p className={style.track_name}>{track.trackName}</p>
            <p className={style.artist_name}>{track.artistName}</p>
            <div className={style.buttons}>
              <a
                tabIndex={0}
                className={classnames(style.button, style.copy_to_clipboard)}
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
                {copied === true ? "Copied" : "Copy"} AppleMusic Link to
                Clipboard
              </a>
              <a
                tabIndex={0}
                className={classnames(style.button, style.spotify)}
                href={spotify?.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
              >
                Play on Spotify
              </a>
              <a
                tabIndex={0}
                href={track.trackViewUrl}
                className={classnames(style.button, style.apple_music)}
                target="_blank"
                rel="noreferrer"
              >
                Play on AppleMusic
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AppleResult
