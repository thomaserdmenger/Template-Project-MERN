import bcrypt from "bcrypt"
import { User } from "./user.model.js"
import { userToView } from "../utils/userToView.js"
import { sendEmail } from "../utils/sendEmail.js"
import { createSixDigitCode } from "../utils/createSixDigitCode.js"

export const postRegisterUserCtrl = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      res.status(400).json({ message: "User with this email exists" })
      return
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const sixDigitCode = createSixDigitCode()

    const registerdUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: passwordHash,
      verificationCode: sixDigitCode,
    })

    await sendEmail({
      to: registerdUser.email,
      subject: "Welcome to my App",
      text: `Hi ${registerdUser.firstname} ${registerdUser.lastname},
        Welcome to your registration.
        Please enter your 6 Digit Code to verify your E-Mail: ${registerdUser.verificationCode}`,
    })

    res.json(userToView(registerdUser))
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}
