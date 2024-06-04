export const userToView = (user) => {
  return {
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,
  }
}
