import AuthLoginViewModel from '@/viewModels/AuthLoginViewModel'
import { observer } from 'mobx-react'
import { Outlet, Navigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const PrivateUserRoutes = observer(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            AuthLoginViewModel.setUser(user)
        }
    })
    const isAuthenticated = AuthLoginViewModel.user !== null
    return isAuthenticated != null ? <Outlet /> : <Navigate to="/" replace />
})

export default PrivateUserRoutes
