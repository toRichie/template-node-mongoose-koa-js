module.exports = {
  driver: process.env.MAIL_DRIVER || 'smtp',
  host: process.env.MAIL_DRIVER || 'smtp.mailtrap.io',
  port: process.env.MAIL_DRIVER || 2525,
  username: process.env.MAIL_DRIVER || null,
  password: process.env.MAIL_PASSWORD || null,
  encryption: process.env.MAIL_ENCRYPTION || null  
}