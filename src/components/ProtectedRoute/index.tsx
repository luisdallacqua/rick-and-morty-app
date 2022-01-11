/* eslint-disable react-hooks/rules-of-hooks */
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Layout from '../Layout'

const authRoute = (Component: React.ComponentType) => {
  return function withProtected(props: any) {
    const router = useRouter()
    const [session, loading] = useSession()

    console.log('sessão do protected', session?.user)

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
