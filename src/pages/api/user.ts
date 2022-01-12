import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'
import { IUser } from '../../components/RegisterForm/types'
import { ObjectId } from 'mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  const { db } = await connectToDatabase()
  console.log(req.query)
  if (method === 'GET') {
    const { email } = req.query

    if (!email) {
      const data = await db.collection('users').find({}).toArray()
      res.status(200).json(data)
    }

    const user = await db.collection('users').findOne({ email })
    res.status(200).json(user)
    res.end()
  }

  if (method === 'PATCH') {
    let userId: ObjectId

    const action = req.body.action
    const id = req.body._id
    const favoriteCharacterToPush = req.body.favoriteCharacters

    if (!action) {
      res.status(400).json({ error: 'You should pass an action in parameters' })
    }

    if (!favoriteCharacterToPush) {
      res
        .status(400)
        .json({ error: 'Invalid id, it is not possible to add the character' })
      return
    }

    try {
      userId = new ObjectId(id)
    } catch {
      res.status(400).json({ error: 'Invalid id' })
      return
    }

    if (action === 'add') {
      await db
        .collection('users')
        .updateOne(
          { _id: userId },
          { $push: { favoriteCharacters: favoriteCharacterToPush } }
        )
      res
        .status(201)
        .json(`Character ${favoriteCharacterToPush} was inserted in favorites`)
    }

    if (action === 'delete') {
      await db
        .collection('users')
        .updateOne(
          { _id: userId },
          { $pull: { favoriteCharacters: favoriteCharacterToPush } }
        )
      res
        .status(200)
        .json(`Character ${favoriteCharacterToPush} was removed from favorites`)
    }
  }
}
