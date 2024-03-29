import dotenv from 'dotenv'


export const getVariables = (options) => {

const persistence = options.opts().persistence
dotenv.config()

return{
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_EMAIL,
    adminPassword: process.env.ADMIN_PASSWORD,
    secret: process.env.SECRET,
    persistence : persistence
}

}