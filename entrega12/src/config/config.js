import dotenv from 'dotenv'

dotenv.config()

export default{
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    secret: process.env.SECRET,
    persistence: process.env.PERSISTENCE
}