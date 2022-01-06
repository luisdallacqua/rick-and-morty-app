import { verify } from 'jsonwebtoken'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { KEY } from '../login'

export const authenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    verify(req.cookies.auth!, KEY, async function (err, decoded) {
      if (!err && decoded) {
        return await fn(req, res)
      }

      res.status(401).json({ error: 'You are not authenticated' })
    })
  }
