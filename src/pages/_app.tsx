import { AppProps } from "next/app"
import Head from "next/head"

import Layout from "@/components/layouts"
import "@/styles/globals.scss"

function PathOfGenshinApp({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <>
      <Head>
        <title>Path of Genshin</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default PathOfGenshinApp
