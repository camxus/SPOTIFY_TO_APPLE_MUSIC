export type ExternalUrls = {
  spotify: string
}

export type Followers = {
  href: string
  total: number
}

export type Image = {
  url: string
  height: number
  width: number
}

export type Artist = {
  external_urls: ExternalUrls
  followers: Followers
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: "artist"
  uri: string
}

export type Album = {
  album_type: string
  total_tracks: number
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  restrictions: {
    reason: string
  }
  type: "album"
  uri: string
  copyrights: {
    text: string
    type: string
  }[]
  external_ids: {
    isrc: string
    ean: string
    upc: string
  }
  genres: string[]
  label: string
  popularity: number
  album_group: string
  artists: Artist[]
}

export type Track = {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: {
    isrc: string
    ean: string
    upc: string
  }
  external_urls: ExternalUrls
  href: string
  id: string
  is_playable: boolean
  linked_from: {}
  restrictions: {
    reason: string
  }
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: "track"
  uri: string
  is_local: boolean
}
