// import { ConfigService, registerAs } from "@nestjs/config";


// export default registerAs('database', () => {
//   return {
//     // type: 'mysql',
//     // host: process.env.DB_HOST,
//     // port: parseInt(process.env.DB_PORT),
//     // username: process.env.DB_USERNAME,
//     // password: process.env.DB_PASSWORD,
//     // database: process.env.DB_DATABASE,
//     // synchronize: false,
//     // dropSchema: false,
//     // logging: true,
//     // autoLoadEntities: true,
//     // entities: ["src/**/*.entity.ts"],
//     // migrations: ['src/migrations/*{.ts,.js}'],
//     // cli: {
//     //   migrationsDir: 'src/migrations'
//     // }
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT),
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     synchronize: false,
//     dropSchema: false,
//     logging: true,
//     autoLoadEntities: true,
//     entities: ["src/**/*.entity.ts"],
//     migrations: ['src/migrations/*{.ts,.js}'],
//     cli: {
//       migrationsDir: 'src/migrations'
//     }
//   }
// })