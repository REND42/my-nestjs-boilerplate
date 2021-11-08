import { registerAs } from "@nestjs/config";
import { User } from "src/users/user.entity";

const defaultOptions = {

  migrationsTableName: 'migrations',
  migrations: [
    "dist/src/migrations/*{.ts,.js}"
  ],
  cli: {
    migrationsDir: "src/migrations"
  }
}

export const mysqlConfig = registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: process.env.DB_SYNCHRONIZE || false,
  // entities: [
  //   "dist/**/*.entity{.ts,.js}"
  // ],
  ...defaultOptions
}))

export const postgresConfig = registerAs('postgres', () => ({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  synchronize: process.env.PG_SYNCHRONIZE || false,
  entities: [
    // "dist/users/*.entity{.ts,.js}"
    User
  ],
  ...defaultOptions
}))

// const DatabaseConfig = () => ({
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT),
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   entities: [
//     "dist/**/*.entity{.ts,.js}"
//   ],
//   synchronize: process.env.DB_SYNCHRONIZE || false,
//   migrationsTableName: 'migrations',
//   migrations: [
//     "dist/src/migrations/*{.ts,.js}"
//   ],
//   cli: {
//     migrationsDir: "src/migrations"
//   }
// })

// export default DatabaseConfig