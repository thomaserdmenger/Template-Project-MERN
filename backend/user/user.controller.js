import bcrypt from "bcrypt"
import { User } from "./user.model.js"
import { userToView } from "../utils/userToView.js"
import { sendEmail } from "../utils/sendEmail.js"
import { createSixDigitCode } from "../utils/createSixDigitCode.js"
import { createAccessToken } from "../utils/createAccessToken.js"

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

    res.json({ user: userToView(registerdUser) })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export const postVerifyEmailCtrl = async (req, res) => {
  try {
    const { email, sixDigitCode } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json("User not found. Please register.")
    if (user.isVerified) return res.status(400).json("E-Mail already verified.")
    if (user.verificationCode !== sixDigitCode)
      return res.status(500).json("Wrong 6 Digit Code. Try again.")

    const verifiedUser = await User.findOneAndUpdate(
      { email },
      { $set: { isVerified: true } },
      { new: true }
    )

    res.json({ user: userToView(verifiedUser) })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export const postLoginUserCtrl = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json("User does not exist. Please register.")
    }

    if (!user.isVerified) {
      return res.status(400).json("User cannot login. Please verify your E-Mail.")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(400).json("Incorrect password. Please try again.")
    }

    const accessToken = createAccessToken(user)

    res.cookie("accessToken", accessToken, { maxAge: 7 * 24 * 3600 * 1000, httpOnly: true })

    res.json({ user: userToView(user) })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export const postLogoutUserCtrl = async (_req, res) => {
  try {
    res.clearCookie("accessToken")
    res.json({ message: "Logout successful!" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export const getShowAllUsersCtrl = async (_req, res) => {
  try {
    const users = await User.find({})
    if (!users) res.status(400).json("Could not find users")

    res.json({ users })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export const getOneUsersCtrl = async (req, res) => {
  try {
    const user = await User.findById(req.authenticatedUser._id)
    if (!user) res.status(400).json("Could not find users")

    res.json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}
