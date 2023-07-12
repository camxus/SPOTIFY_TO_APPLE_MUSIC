import axios from "axios"
import { encode } from "base-64"
import qs from "qs"

// export const getAuthToken = async () => {
//   const {
//     data: { access_token },
//   } = await axios.get<{ access_token: string }>("/api/token")
//   return access_token
// }


export const getAuthToken = async () => {
  const {
    data: { access_token },
  } = await axios.post<{ access_token: string }>(
    "https://accounts.spotify.com/api/token",
    qs.stringify({ grant_type: "client_credentials" }),
    {
      headers: {
        Authorization:
          `Basic ${encode(
            `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET}`
          )}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  )
  return access_token
}
