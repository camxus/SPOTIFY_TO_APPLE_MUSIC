import { Track } from "@/app/utils/spotify/types"
import React from "react"
import Image from "next/image"
import style from "./BigImageBackDrop.module.css"

function BigImageBackDrop({ track }: { track: Track | undefined }) {
  return (
    <div className={style.image}>
      <Image fill alt="backdrop" src={track?.album.images[0].url ?? ""} />
    </div>
  )
}

export default BigImageBackDrop
