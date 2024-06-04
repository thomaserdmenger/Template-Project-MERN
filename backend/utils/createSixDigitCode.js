import crypto from "crypto"

export const createSixDigitCode = () => crypto.randomInt(100000, 999999)
