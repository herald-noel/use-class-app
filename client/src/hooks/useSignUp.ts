import { useNavigate } from 'react-router-dom'
import AuthRegisterViewModel from '../viewModels/AuthRegisterViewModel'
import AuthLoginViewModel from '../viewModels/AuthLoginViewModel'
import { useState } from 'react'

const useSignUp = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const response = await AuthRegisterViewModel.signUp()
            if (response) {
                AuthLoginViewModel.setUser(response.user)
                resetFieldDefault()
                navigate('/home')
            }
        } catch (error) {
            AuthRegisterViewModel.handleError(error)
        } finally {
            setIsLoading(false)
        }
    }

    const resetFieldDefault = () => {
        AuthRegisterViewModel.setFirstName('')
        AuthRegisterViewModel.setLastName('')
        AuthRegisterViewModel.setEmail('')
        AuthRegisterViewModel.setPassword('')
        AuthRegisterViewModel.setConfirmPassword('')
        AuthRegisterViewModel.setEmailError(false)
        AuthRegisterViewModel.setEmailErrorMsg('')
        AuthRegisterViewModel.setPasswordError(false)
        AuthRegisterViewModel.setPasswordErrorMsg('')
    }

    return {
        firstName: AuthRegisterViewModel.firstName,
        setFirstName: AuthRegisterViewModel.setFirstName,
        lastName: AuthRegisterViewModel.lastName,
        setLastName: AuthRegisterViewModel.setLastName,
        email: AuthRegisterViewModel.email,
        setEmail: AuthRegisterViewModel.setEmail,
        password: AuthRegisterViewModel.password,
        setPassword: AuthRegisterViewModel.setPassword,
        confirmPassword: AuthRegisterViewModel.confirmPassword,
        setConfirmPassword: AuthRegisterViewModel.setConfirmPassword,
        emailError: AuthRegisterViewModel.emailError,
        emailErrorMsg: AuthRegisterViewModel.emailErrorMsg,
        passwordError: AuthRegisterViewModel.passwordError,
        passwordErrorMsg: AuthRegisterViewModel.passwordErrorMsg,
        handleSubmit,
        validatePassword: AuthRegisterViewModel.validatePassword,
        isLoading,
    }
}

export default useSignUp
