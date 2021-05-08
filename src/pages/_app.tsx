import { ThemeProvider } from "next-themes"
import { AppProps } from "next/app"
import Head from "next/head"

import { QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { queryClient } from "@/api/client"
import Layout from "@/components/layouts"
import { persistor, store } from "@/store"
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
      <ThemeProvider attribute="class">
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}

export default PathOfGenshinApp
