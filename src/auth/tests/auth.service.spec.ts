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


describe('The AuthService', () => {
  let authService: AuthService

  beforeEach( async () => {
    const module = await Test.createTestingModule({
      // imports: [
      //   // ConfigModule.forRoot({
      //   //   isGlobal: true,
      //   //   load: [
      //   //     mysqlConfig, postgresConfig
      //   //   ],
      //   //   validationSchema
      //   // }),

      //   // // TypeOrmModule.forRootAsync({
      //   // //   name: 'project2',
      //   // //   imports: [ ConfigModule ],
      //   // //   useFactory: (configService: ConfigService) => configService.get<ConnectionOptions>('postgres'),
      //   // //   inject: [ ConfigService ]
      //   // // }),
      //   // UsersModule,
      //   // AuthModule,
      //   // PostsModule,
      //   // CategoriesModule
      // ],

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
          useValue: {}
        }
      ]
    }).compile()

    authService = await module.get<AuthService>(AuthService)

  })

  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const userId = 1
      expect(
        typeof authService.getCookieWithJwtToken(userId)
      ).toEqual('string')
    })
  })

})