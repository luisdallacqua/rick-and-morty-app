/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires

var mockFindOneByEmail = jest.fn()

jest.mock('mongodb')

jest.mock('../UserRepository', () => {
  const actualModule = jest.requireActual('../UserRepository')

  return {
    ...actualModule,
    userRepository: () => {
      // @ts-ignore
      return new actualModule.UserRepository({
        // @ts-ignore
        collection: (arg: string) => ({ findOne: mockFindOneByEmail })
      })
    }
  }
})

import { userRepository } from '../UserRepository'

const defaultErrorMessage = 'There is no user'

describe('UserRepository', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it("doesn't find a user", async () => {
    mockFindOneByEmail.mockResolvedValueOnce({ error: defaultErrorMessage })

    const classMock = userRepository()
    
    await classMock.findOneByEmail('foo@email.com')

    expect(mockFindOneByEmail).toHaveBeenCalledTimes(1)
    expect(await classMock.findOneByEmail('foo@email.com')).resolves.toEqual({
      error: defaultErrorMessage
    })
  })
})
