import axios from "axios"

export const getAuthToken = async () => {
  const {
    data: { access_token },
  } = await axios.get<{ access_token: string }>("/api/token")
  return access_token
}
