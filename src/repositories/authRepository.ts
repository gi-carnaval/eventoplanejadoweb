import { api } from "@lib/axios";

async function postAuthentication(access_token: string) {
  return (await api.post("/auth", {
    access_token
  }));
}

const authRepository = {
  postAuthentication
}

export { authRepository }