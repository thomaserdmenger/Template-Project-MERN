import { google } from "googleapis"
import nodemailer from "nodemailer"

const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS
const GMAIL_CLIENT_ID = process.env.GMAIL_CLIENT_ID
const GMAIL_CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET
const GMAIL_REDIRECT_URI = process.env.GMAIL_REDIRECT_URI
const GMAIL_REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN

const oAuth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REDIRECT_URI
)

oAuth2Client.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN })

export const sendEmail = async ({ to, subject, text }) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GMAIL_ADDRESS,
        clientId: GMAIL_CLIENT_ID,
        clientSecret: GMAIL_CLIENT_SECRET,
        refreshToken: GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    })

    const sentMessageInfo = await transporter.sendMail({
      from: "Hello from TemplateMERN",
      to,
      subject,
      text,
      html: text.replaceAll("\n", "<br/>"),
    })

    const success = sentMessageInfo.accepted.includes(to)
    return success
  } catch (error) {
    console.log(error)
    return false
  }
}
