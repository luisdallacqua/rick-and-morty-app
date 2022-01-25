import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../utils/mongodb'
import { IUser } from '../../components/RegisterForm/types'
import { ObjectId } from 'mongodb'
import { getSession } from 'next-auth/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' })
  }
  const { method } = req
  const { db } = await connectToDatabase()

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

    const { name, email, role } = req.body
    const action = req.body.action
    const id = req.body._id
    const favoriteCharacterToPush = req.body.favoriteCharacters

    if (name && email && role) {
      const user = await db
        .collection('users')
        .findOne({ _id: new ObjectId(id) })

      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      }
      user.name = name
      user.email = email
      user.role = role
      await db
        .collection('users')
        .updateOne({ _id: new ObjectId(id) }, { $set: user })

      res.status(200).json({ message: 'User updated', user: user })
    }

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
