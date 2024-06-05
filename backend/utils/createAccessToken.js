import jwt from "jsonwebtoken"
import { config } from "dotenv"

config()

const jwtSecret = process.env.JWT_SECRET

export const createAccessToken = ({ _id }) => {
  const payload = {
    sub: _id,
    type: "access",
  }

  const accessToken = jwt.sign(payload, jwtSecret, { expiresIn: "1w" })

  return accessToken
}
