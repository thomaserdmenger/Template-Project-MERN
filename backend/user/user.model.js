import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    verificationCode: { type: String, required: true },
    isVerified: { type: Boolean, required: true, default: false },
  },
  { collection: "users", timestamps: true }
)

export const User = mongoose.model("User", userSchema)
