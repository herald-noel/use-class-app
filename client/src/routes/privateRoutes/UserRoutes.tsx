import AuthLoginViewModel from '@/viewModels/AuthLoginViewModel'
import { observer } from 'mobx-react'
import { Outlet, Navigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

const PrivateUserRoutes = observer(() => {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const auth = getAuth()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthenticated(true)
                AuthLoginViewModel.setUser(user) // Optionally store the user in the ViewModel
            } else {
                setAuthenticated(false)
            }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [auth])

    if (loading) {
        return <div>Loading...</div>
    }
    return authenticated ? <Outlet /> : <Navigate to="/" replace />
})

export default PrivateUserRoutes
