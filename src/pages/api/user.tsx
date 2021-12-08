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
  const data = await db.collection('users').find({}).toArray()

  if (method === 'GET') {
    res.status(200).json(data)
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
        .json(`Personagem ${favoriteCharacterToPush} excluído dos favoritos`)
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
        .json(`Personagem ${favoriteCharacterToPush} excluído dos favoritos`)
    }
  }

  if (method === 'POST') {
    const { name, email, password, cpf, birthDate, role, avatar }: IUser =
      req.body

    const newUser = { name, cpf, email, birthDate, role, password, avatar }

    if (!name || !email || !role || !password) {
      res.status(400).json({ error: 'Is missing required fields' })
      return
    }

    const { db } = await connectToDatabase()

    const response = await db
      .collection('users')
      .insertOne({ ...newUser, avatar: avatar || '', favoriteCharacters: [] })

    res.status(201).json({
      success: `The user ${newUser.name} was created sucessfully`,
      response
    })
  }
}
