import Head from 'next/head'
import SignIn from '../components/SignIn'

type Props = {
  title: string
}

export default function Home({ title = 'Rick and Morty App' }: Props) {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <div style={{ marginTop: '1rem' }}>
        <SignIn />
      </div>
    </div>
  )
}
