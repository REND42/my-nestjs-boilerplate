import { INestApplication, ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { Test } from "@nestjs/testing"
import { getRepositoryToken } from "@nestjs/typeorm"
import * as request from 'supertest'
import { UsersService } from "../../users/users.service"
import mockedConfigService from "../../utils/mocks/config.service"
import mockedJwtService from "../../utils/mocks/jwt.service"
import { User } from "../../users/user.entity"
import { AuthController } from "../auth.controller"
import { AuthService } from "../auth.service"
import mockedUser from "./user.mock"
import { plainToClass } from "class-transformer"

describe('The AuthController', () => {
  let app: INestApplication
  let userData: User

  beforeEach(async () => {
    userData = {
      ...mockedUser
    }

    const usersRepository = {
      create: jest.fn().mockResolvedValue( plainToClass(User, userData)),
      save: jest.fn().mockReturnValue(Promise.resolve())
    }

    const module = await Test.createTestingModule({
      controllers: [AuthController],
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
          useValue: usersRepository
        }
      ]
    }).compile()

    app = module.createNestApplication()
    app.useGlobalPipes(new ValidationPipe())
    await app.init()
  })

  describe('when registering', () => {
    describe('and using valid data', () => {
      it('should respond with the data of the user without the password', () => {
        const expectedData = {
          ...userData
        }
        delete expectedData.password

        return request(app.getHttpServer())
          .post('/auth/register')
          .send({
            email: mockedUser.email,
            username: mockedUser.username,
            password: 'strongPassword'
          })
          .expect(201)
          .expect(expectedData)
          // .expect(expectedData)
      })
    })

    describe('and using invalid data', () => {
      it('should throw an error', () => {
        return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          username: mockedUser.username
        })
        .expect(400)
      })
    })
  })
})