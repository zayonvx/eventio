import Head from "next/head"
import React, { Suspense } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { AppShell, Footer, Header, Navbar, Text } from "@mantine/core"
import { Horizontal, Vertical } from "mantine-layout-components"

type Props = {
  title?: string
  children?: React.ReactNode
  maxWidth?: number
}
const Layout: BlitzLayout<Props> = ({ title, children, maxWidth = 800 }) => {
  const thisYear = new Date().getFullYear()
  return (
    <>
      <Head>
        <title>{title || "eventio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell
        padding="md"
        header={
          <Header height={45} p="xs">
            <Horizontal fullH>
              <Text fw="bold">Eventio</Text>
            </Horizontal>
          </Header>
        }
        footer={
          <Footer height={35}>
            <Horizontal fullW fullH center>
              <Text fz="xs" color="dimmed">
                copyright {thisYear}
              </Text>
            </Horizontal>
          </Footer>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        <Vertical fullW fullH>
          <Suspense fallback="Loading...">{children}</Suspense>
        </Vertical>
      </AppShell>
    </>
  )
}

export default Layout
