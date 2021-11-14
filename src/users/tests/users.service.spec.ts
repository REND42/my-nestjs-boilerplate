import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import { User } from "../user.entity"
import { UsersService } from "../users.service"


describe('The UsersService', () => {
  let usersService: UsersService
  let findOne: jest.Mock
  beforeEach(async () => {
    findOne = jest.fn()
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User, 'project2'),
          useValue: {
            findOne
          }
        }
      ],
    }).compile()

    usersService = await module.get(UsersService)
  })

  describe('when getting a user by email', () => {
    describe('and user is matched', () => {
      let user: User
      beforeEach(() => {
        user = new User()
        findOne.mockReturnValue(Promise.resolve(user))
      })
      it('should return the user', async () => {
        const fetchedUser = await usersService.findByEmail('test@test.com')
        expect(fetchedUser).toEqual(user)
      })
    })
    describe('and the user is not matched', () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined)
      })
      it('should throw an error', async () => {
        await expect(usersService.findByEmail('test@test.com')).rejects.toThrow()
      })
    })
  })
})