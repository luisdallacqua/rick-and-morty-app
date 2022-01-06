import { NextApiRequest, NextApiResponse } from 'next'
import { authenticated } from './auth/authentication'

export default authenticated(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({ message: 'ok ok' })
})
