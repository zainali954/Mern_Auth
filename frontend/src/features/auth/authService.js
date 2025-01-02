
import apiClient from "../../services/apiClient"

const signup = async (userData)=> {
    const response = await apiClient.post(`auth/signup`, userData)
    return response.data
}
const login = async (userData) => {
    const response = await apiClient.post(`auth/login`, userData)
    return response.data
}
const logout =  async () => {
    const response = await apiClient.post(`/auth/logout`)
    return (response.data)
}

const verifyEmail =  async (token) => {
    const response = await apiClient.post(`auth/verify?token=${token}`)
    return (response.data)
}
const resendLink =  async () => {
    const response = await apiClient.post(`auth/resend-link`)
    return (response.data)
}

const forgotPassword = async (email) => {
    localStorage.setItem('user-email', JSON.stringify(email))
    const response = await apiClient.post('auth/forgot-password', {email})
    return ( response.data )
}

const resetPassword = async (data) => {
    const email = JSON.parse(localStorage.getItem("user-email"))
    const response = await apiClient.post(`auth/reset-password?token=${data.token}`, {email, password: data.password})
    return ( response.data )
}


const googleLogin = async (code) => {
    const response = await apiClient.post(`auth/google-login`, { code });
    return response;
};

const authService = { signup, login, logout, verifyEmail, resendLink,forgotPassword, resetPassword, googleLogin }
export default authService;