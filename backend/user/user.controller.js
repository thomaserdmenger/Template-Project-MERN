import bcrypt from "bcrypt"
import { User } from "./user.model.js"
import { userToView } from "../utils/userToView.js"
import { createSixDigitCode } from "../utils/createSixDigitCode.js"

export const postRegisterUserCtrl = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      res.status(400).json({ message: "User with this email exists" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const sixDigitCode = createSixDigitCode()

    const result = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: passwordHash,
      verificationCode: sixDigitCode,
    })

    res.json(userToView(result))
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}