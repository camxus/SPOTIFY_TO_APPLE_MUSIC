export const getAuthToken = async () => {
  try {
    const { access_token } = await(
      await fetch("api/token", {
        headers: { "Cache-Control": "no-store" },
        cache: "no-store",
      })
    ).json()
    return access_token
  } catch (e: any) {
    console.log(e.message)
  }
}
