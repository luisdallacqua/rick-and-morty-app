/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React from 'react'
import Navbar from '../Navbar'
import Layout from '../Layout'

const authRoute = (Component: React.ComponentType) => {
  return function withProtected(props: any) {
    const router = useRouter()
    const [session, loading] = useSession()

    if (loading) <p>LOADING...</p>

    if (!loading && !session) {
      router.replace('/login')
    }

    return (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  }
}

export default authRoute

export const PublicRoute = (Component: React.ComponentType) => {
  return function withPublic(props: any) {
    const router = useRouter()
    const [session, loading] = useSession()

    if (loading) <p>LOADING...</p>

    if (!loading && session) {
      router.replace('/')
    }

    return (
      <>
        <Navbar />
        <Component {...props} />
      </>
    )
  }
}
