/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockFindOneByEmail = jest.fn()

jest.mock('../UserRepository', () => {
  const actualModule = jest.requireActual('../UserRepository')

  return {
    ...actualModule,
    findOneByEmail: mockFindOneByEmail
  }
})

jest.mock('mongodb')
jest.mock('../../../utils/mongodb')

import { UserRepository } from '../UserRepository'
import { Db } from 'mongodb'
import { TextEncoder } from 'util'

const defaultErrorMessage = 'There is no user'

describe('UserRepository', () => {
  beforeAll(() => {
    global.TextEncoder = TextEncoder
    jest.clearAllMocks()
  })

  it("doesn't find a user", () => {
    mockFindOneByEmail.mockResolvedValueOnce({ error: defaultErrorMessage })

    const classMock = new UserRepository(Promise.resolve({} as Db))

    classMock.findOneByEmail('foo@email.com')

    expect(mockFindOneByEmail).toHaveBeenCalledTimes(1)
    expect(mockFindOneByEmail.mock.results[0]).toEqual({
      error: defaultErrorMessage
    })
  })
})
