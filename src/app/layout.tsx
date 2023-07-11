"use client"

import "./globals.css"
import type { GetStaticProps } from "next"
import { Inter } from "next/font/google"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { getAuthToken } from "./utils/auth"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// }

export default function RootLayout({
  children,
  token,
}: {
  children: React.ReactNode
  token: string
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["bearer"])

  useEffect(() => {
    setCookie("bearer", token)
  }, [setCookie, token])

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export const getInitialProps = async () => {
  const token = await getAuthToken()
  return { props: { token } }
}
 