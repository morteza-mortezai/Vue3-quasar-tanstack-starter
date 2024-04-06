import { api } from 'src/boot/axios'
import { LoginBody, LoginResponse } from 'src/types/Login'

export default function useAuth() {

    const login = async (body: LoginBody) => {
        const { data } = await api.post<LoginResponse>(`/auth/sign-in`,body)
        return data
    }
    return { login }
}
