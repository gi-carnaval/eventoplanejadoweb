const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const ROUTER_HISTORY = 'lastLocation'

export interface RefreshTokenProps {
  "id": string,
  "expiresIn": number,
  "userId": string
}

export const setToken = (key: string, token: string | RefreshTokenProps) => {
  localStorage.setItem(key, JSON.stringify(token))
}

export const getToken = (key = ACCESS_TOKEN_KEY) => {
  return localStorage.getItem(key)
}

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(ROUTER_HISTORY)
}

export const setAccessToken = (token: string) => {
  setToken(ACCESS_TOKEN_KEY, token)
}

export const setRefreshToken = (token: string) => {
  setToken(REFRESH_TOKEN_KEY, token)
}

export const getAccessToken = () => {
  const accessToken = getToken(ACCESS_TOKEN_KEY)
  if(accessToken){
    return JSON.parse(accessToken)
  }
  return null
}

export const getRefreshToken = (): RefreshTokenProps | null => {
  const refreshToken = getToken(REFRESH_TOKEN_KEY)
  if (refreshToken) {
    return JSON.parse(refreshToken)
  }
  return null
}

export const setRouterHistory = (token: string) => {
  setToken(ROUTER_HISTORY, token)
}

export const getRouterHistory = () => {
  return getToken(ROUTER_HISTORY)
}
