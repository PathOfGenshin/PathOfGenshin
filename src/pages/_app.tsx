import "@/styles/globals.scss"

import { AppProps } from "next/app"
import Head from "next/head"
import { QueryClientProvider } from "react-query"
import { Provider } from "react-redux"

import { queryClient } from "@/api/client"
import Layout from "@/components/layouts"
import { store } from "@/store"

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
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </QueryClientProvider>
    </>
  )
}

export default PathOfGenshinApp
