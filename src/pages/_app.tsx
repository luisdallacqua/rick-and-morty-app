import { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import theme from '../styles/theme'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/styles'
import Layout from '../components/Layout'

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles)
    }
  }, [])

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <>
      <Head>
        <title>Rick and Morty App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Layout>
          <CssBaseline />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp