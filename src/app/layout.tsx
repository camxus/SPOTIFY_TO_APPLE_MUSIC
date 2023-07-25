"use client"

import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { getAuthToken } from "./utils/auth"

export const fetchCache = "force-no-store"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [cookies, setCookie, removeCookie] = useCookies(["bearer"])

  useEffect(() => {
    removeCookie("bearer")
    getAuthToken().then((token) => {
      setCookie("bearer", token)
    })
  }, [])

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
