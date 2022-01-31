import { NextApiRequest, NextApiResponse } from 'next'
import { userRepository } from './UserRepository'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  try {
    if (method === 'GET') {
      await getUsers(req, res)
    }

    if (method === 'PATCH') {
      await updateUser(req, res)
    }

    if (method === 'DELETE') {
      await deleteUser(req, res)
    }
  } catch (error) {
    if (error instanceof ErrorAplication) {
      res.status(error.statusHTTP).json({ error: error.message })
    }
  }
}

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.query

  if (!email) {
    const users = await userRepository().findAll()
    res.status(200).json(users)
  }

  const user = await userRepository().findOneByEmail(email as string)
  res.status(200).json(user)
  res.end()
}

async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  const { _id } = req.body

  const user = await userRepository().findOneById(_id)

  if (!user) {
    res.status(404).json({ message: 'User not found' })
    return
  }
  if (user.role.toLowerCase() === 'admin') {
    res.status(401).json({ message: 'You can not delete an admin' })
    return
  }

  await userRepository().deleteOne(_id)
  res.status(200).json({ message: 'User deleted' })
}

async function updateUser(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, role } = req.body
  if (name && email && role) {
    updateUserData(req.body._id, name, email, role, res)
  }

  if (!req.body.action) {
    throw new ErrorAplication('You should pass an action in parameters', 400)
  }

  if (!req.body.favoriteCharacters) {
    throw new ErrorAplication(
      'Invalid id, it is not possible to add the character',
      400
    )
  }

  if (req.body.action === 'add') {
    await addFavoriteCharacter(req.body._id, req.body.favoriteCharacters, res)
  }

  if (req.body.action === 'delete') {
    removeFavoriteCharacter(req.body._id, req.body.favoriteCharacters, res)
  }
}

async function updateUserData(
  id: string,
  name: string,
  email: string,
  role: string,
  res: NextApiResponse
) {
  const user = await userRepository().findOneById(id)

  if (!user) {
    throw new ErrorAplication('User not found', 404)
  }
  user.name = name
  user.email = email
  user.role = role

  await userRepository().updateOne(user)
  res.status(200).json({ message: 'User updated', user: user })
}

async function addFavoriteCharacter(
  id: string,
  favoriteCharacter: number,
  res: NextApiResponse
) {
  await userRepository().addFavoriteCharacter(id, favoriteCharacter)

  res
    .status(201)
    .json(`Character ${favoriteCharacter} was inserted in favorites`)
}

async function removeFavoriteCharacter(
  id: string,
  favoriteCharacter: number,
  res: NextApiResponse
) {
  await userRepository().removeFavoriteCharacter(id, favoriteCharacter)
  res
    .status(200)
    .json(`Character ${favoriteCharacter} was removed from favorites`)
}

class ErrorAplication {
  message: string
  statusHTTP: number

  constructor(message: string, statusHTTP: number) {
    this.message = message
    this.statusHTTP = statusHTTP
  }
}
