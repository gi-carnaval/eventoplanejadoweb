import { api } from "@lib/axios";

async function getUserById(userId: string){
  return (await api.get(`/user/${userId}`));
}

const userRepository = {
  getUserById
}

export default userRepository