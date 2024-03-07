import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"

type Props = {
  title?: string
  children?: React.ReactNode
  maxWidth?: number
}
const Layout: BlitzLayout<Props> = ({ title, children, maxWidth = 800 }) => {
  return (
    <>
      <Head>
        <title>{title || "eventio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback="Loading...">
        <div
          style={{
            width: "100%",
            maxWidth: maxWidth,
          }}
        >
          {children}
        </div>
      </Suspense>
    </>
  )
}

export default Layout
