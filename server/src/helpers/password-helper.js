import bcrypt from 'bcrypt';

export async function hashPassword(password) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function passwordMatches(userPassword, enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, userPassword);
  return isMatch;
}
