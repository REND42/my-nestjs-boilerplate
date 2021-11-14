import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { User } from "../../users/user.entity"
import { UsersService } from "../../users/users.service"
import { ConnectionOptions, Repository } from "typeorm"
import { AuthService } from "../auth.service"
import { Test } from "@nestjs/testing"
import { UsersModule } from "../../users/users.module"
import { mysqlConfig, postgresConfig } from "../../config/database.config"
import { validationSchema } from "../../config/validation"
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from "../auth.module"
import { PostsModule } from "../../posts/posts.module"
import { CategoriesModule } from "../../categories/categories.module"
import mockedJwtService from '../../utils/mocks/jwt.service'
import mockedConfigService from '../../utils/mocks/config.service'
import * as bcrypt from 'bcrypt'
import mockedUser from "./user.mock"

jest.mock('bcrypt')

describe('The AuthService', () => {
  let authService: AuthService
  let usersService: UsersService
  let bcryptCompare: jest.Mock
  let userData: User
  let findUser: jest.Mock

  beforeEach( async () => {
    userData = {
      ...mockedUser
    }
    findUser = jest.fn().mockResolvedValue(userData)
    const userRepository = {
      findOne: findUser
    }

    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare

    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        {
          provide: ConfigService,
          useValue: mockedConfigService
        },
        {
          provide: JwtService,
          useValue: mockedJwtService
        },
        {
          provide: getRepositoryToken(User, 'project2'),
          useValue: userRepository
        }
      ]
    }).compile()

    authService = await module.get<AuthService>(AuthService)
    usersService = await module.get(UsersService)
  })

  describe('when accessing the data of authenticating user', () => {
    it('should attempt to get the user by email', async () => {
      // const userId = 1
      const findByEmialSpy = jest.spyOn(usersService, 'findByEmail')
      await authService.getAuthenticatedUser('user@email.com', 'strongPassword')
      expect(
        findByEmialSpy
      ).toBeCalledTimes(1)
    })

    describe('and the provided password is not valid', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(false)
      })
      it('should throw an error', async () => {
        await expect(
          authService.getAuthenticatedUser('user@emial.com', 'strongPassword')
        ).rejects.toThrow()
      })
    })

    describe('and the provided password is valid', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(true)
      })
      describe('and the user is found in the database', () => {
        beforeEach(() => {
          findUser.mockResolvedValue(userData)
        })
        it('should return the user data', async () => {
          const user = await authService.getAuthenticatedUser('user@email.com', 'strongPassword')
          expect(user).toBe(userData)
        })
      })
      describe('and the user is not found in the database', () => {
        beforeEach(() => {
          findUser.mockResolvedValue(undefined)
        })
        it('should throw an error', async () => {
          await expect(
            authService.getAuthenticatedUser('user@email.com', 'strongPassword')
          ).rejects.toThrow()
        })
      })
    })
  })

})