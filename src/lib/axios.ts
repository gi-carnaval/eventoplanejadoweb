import axios from 'axios'
import { getAccessToken, getRefreshToken, RefreshTokenProps, removeTokens, setAccessToken } from './tokenService'

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_SERVER
})

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        return console.error("There's no refresh token")
      }

      const newAccessToken = await refreshAccessToken(refreshToken);

      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
        return api(originalRequest)
      }
    }
    return Promise.reject(error)
  }
)

const refreshAccessToken = async (refreshToken: RefreshTokenProps) => {

  try {
    const response = await api.post('/refresh-token', {
      refresh_token: refreshToken.id
    })
    setAccessToken(response.data.accessToken)
    return response.data.accessToken;
  } catch (error) {
    console.error("Refresh token expired or invalid", error)
    removeTokens();
    return null;
  }
}