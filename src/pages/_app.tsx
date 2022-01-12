import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../styles/theme'
import createEmotionCache from '../createEmotionCache'
import Layout from '../components/Layout'
import { AuthProvider } from '../context/AuthProvider'

import { Provider } from 'next-auth/client'
import { NextPageContext } from 'next'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <Provider session={pageProps.session}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CacheProvider value={emotionCache}>
            <Head>
              <title>Rick and Morty app</title>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <CssBaseline />
            <Component {...pageProps} />
          </CacheProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  )
}
