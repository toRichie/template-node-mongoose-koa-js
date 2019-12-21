module.exports = {
  name: process.env.APP_NAME || 'kubex',
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 3000,
  src: "./app/index"
}