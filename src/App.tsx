import { Route, Routes } from "react-router-dom"
import Home from "@pages/Home"
import { getAuthToken } from "./utils/auth"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { ToastContainer } from "react-toastify"

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["bearer"])

  useEffect(() => {
    getAuthToken().then((token) => {
      setCookie("bearer", token)
    })
  }, [setCookie])

  return (
    <>
      <ToastContainer
        hideProgressBar
        position="top-center"
        closeButton={false}
      />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
