export default {
  name: 'db',
  connector: 'mysql',
  host: process.env.DB_INSTANCE_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
} as object;
