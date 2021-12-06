import { NextApiRequest, NextApiResponse } from 'next'
import { users } from '../../../db.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  if (method === 'GET') {
    res.status(200).json(users)
  }
}
