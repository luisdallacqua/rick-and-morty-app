import Head from 'next/head'
import SignIn from '../components/SignIn'

type Props = {
  title: string
}

export default function Home({ title = 'Rick and Morty App' }: Props) {
  return (
    <div className="container">
      <h1> Home do {title} </h1>
    </div>
  )
}
