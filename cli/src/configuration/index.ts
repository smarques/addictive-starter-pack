const dotenv = require('dotenv')
dotenv.config()

export const configuration:any = {
  LOCAL_DEV_DOMAINS: process.env.LOCAL_DEV_DOMAINS,
}
// console.log(configuration)
