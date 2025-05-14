import bcrypt from "bcrypt"

export const encrypt = async (txt: string) => {
  const salt = await bcrypt.genSalt(8)
  return bcrypt.hash(txt, salt)
}

export const compare = async (txt: string, encryptedTxt: string) => bcrypt.compare(txt, encryptedTxt)
