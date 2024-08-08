import { doSignOut } from '@/services/firebase/auth/auth'
import { useNavigate } from 'react-router-dom'

const useLogout = () => {
    const navigate = useNavigate()
    const logoutUser = async () => {
        try {
            await doSignOut()
            navigate('/')
        } catch (error) {
            console.error('Error during logout:', error)
        }
    }
    return { logoutUser }
}

export default useLogout
