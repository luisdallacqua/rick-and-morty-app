import { Db, ObjectId } from 'mongodb'
import { IUser } from '../../components/RegisterForm/types'
import { getConnection } from '../../utils/mongodb'

export class UserRepository {
  private db: Promise<Db>
  constructor(db: Promise<Db>) {
    this.db = db
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    return await (await this.db).collection<IUser>('users').findOne({ email })
  }

  async findAll(): Promise<IUser[]> {
    return await (await this.db).collection<IUser>('users').find({}).toArray()
  }

  async findOneById(_id: string): Promise<IUser | null> {
    return await (await this.db)
      .collection<IUser>('users')
      .findOne({ _id: new ObjectId(_id) })
  }

  async deleteOne(_id: string): Promise<any> {
    await (await this.db)
      .collection<IUser>('users')
      .deleteOne({ _id: new ObjectId(_id) })
  }

  async updateOne(user: IUser): Promise<any> {
    await (await this.db)
      .collection<IUser>('users')
      .updateOne({ _id: new ObjectId(user._id) }, { $set: user })
  }

  async addFavoriteCharacter(id: string, favoriteCharacter: number) {
    await (await this.db)
      .collection<IUser>('users')
      .updateOne(
        { _id: new ObjectId(id) },
        { $push: { favoriteCharacters: favoriteCharacter } }
      )
  }

  async removeFavoriteCharacter(id: string, favoriteCharacter: number) {
    await (await this.db)
      .collection<IUser>('users')
      .updateOne(
        { _id: new ObjectId(id) },
        { $pull: { favoriteCharacters: favoriteCharacter } }
      )
  }
}

export function userRepository() {
  return new UserRepository(getConnection())
}
