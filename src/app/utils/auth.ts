import axios from "axios"
import { encode } from "base-64"
import qs from "qs"

export const getAuthToken = async () => {
  const {
    data: { access_token },
  } = await axios.get<{ access_token: string }>("/api/token")
  return access_token
}