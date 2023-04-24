export default async function getEmail(){

  const response = await fetch('http://localhost:3000/users/getAllUsers/')
  const users = await response.json()
  return users
}
