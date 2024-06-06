import jwt from "jsonwebtoken"
import { config } from "dotenv"

config({ path: "../.env" })

const jwtSecret = process.env.JWT_SECRET

export const doUserAuth = (req, res, next) => {
  try {
    const { accessToken } = req.cookies
    if (!accessToken) throw new Error("Not authorized")

    const verifiedToken = jwt.verify(accessToken, jwtSecret)

    req.authenticatedUser = {
      _id: verifiedToken.sub,
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error, message: error.message || "Not authorized" })
  }
}
