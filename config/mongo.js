module.exports= {
  enable: true,
  connection: process.env.DB_CONNECTION,
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
}