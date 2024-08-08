import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AuthLoginViewModel from '../viewModels/AuthLoginViewModel'
import { useToast } from '@/components/ui/use-toast'

const useSignIn = () => {
    const navigate = useNavigate()
    const { toast } = useToast()

    const [emailError, setEmailError] = useState(AuthLoginViewModel.emailError)
    const [emailErrorMsg, setEmailErrorMsg] = useState(
        AuthLoginViewModel.emailErrorMsg
    )
    const [passwordError, setPasswordError] = useState(
        AuthLoginViewModel.passwordError
    )
    const [passwordErrorMsg, setPasswordErrorMsg] = useState(
        AuthLoginViewModel.passwordErrorMsg
    )
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setEmailErrorMsg(AuthLoginViewModel.emailErrorMsg)
        setEmailError(AuthLoginViewModel.emailError)
    }, [AuthLoginViewModel.emailError, AuthLoginViewModel.emailErrorMsg])

    useEffect(() => {
        setPasswordError(AuthLoginViewModel.passwordError)
        setPasswordErrorMsg(AuthLoginViewModel.passwordErrorMsg)
    }, [AuthLoginViewModel.passwordError, AuthLoginViewModel.passwordErrorMsg])

    const handleSubmit = async (event): Promise<void> => {
        event.preventDefault()
        setIsLoading(true)

        resetErrorStates()
        const credentials = {
            email: AuthLoginViewModel.email,
            password: AuthLoginViewModel.password,
        }

        try {
            const response = await AuthLoginViewModel.login(credentials)
            if (response) {
                AuthLoginViewModel.setEmail('')
                AuthLoginViewModel.setPassword('')
                AuthLoginViewModel.setUser(response.user)
                resetErrorStates()
                navigate('/home')
            }
        } catch (error) {
            AuthLoginViewModel.handleError(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleResetPassword = async (): Promise<void> => {
        resetErrorStates()
        try {
            await AuthLoginViewModel.resetPassword()
            toast({
                title: 'Email sent',
                description: 'Please check your email to reset your password.',
                duration: 3000,
                className: 'bg-green-900 text-white',
            })
        } catch (error) {
            AuthLoginViewModel.handleError(error)
        }
    }

    const resetErrorStates = () => {
        AuthLoginViewModel.setEmailError(false)
        AuthLoginViewModel.setEmailErrorMsg('')
        AuthLoginViewModel.setPasswordError(false)
        AuthLoginViewModel.setPasswordErrorMsg('')
    }

    return {
        handleSubmit,
        handleResetPassword,
        isLoading,
        email: AuthLoginViewModel.email,
        setEmail: AuthLoginViewModel.setEmail,
        password: AuthLoginViewModel.password,
        setPassword: AuthLoginViewModel.setPassword,
        emailError,
        emailErrorMsg,
        passwordError,
        passwordErrorMsg,
    }
}

export default useSignIn
