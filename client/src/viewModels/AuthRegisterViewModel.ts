import { UserCredential } from 'firebase/auth'
import AuthRegisterModel from '../models/AuthRegisterModel'
import { action } from 'mobx'

class AuthRegisterViewModel {
    get firstName(): string {
        return AuthRegisterModel.firstName
    }

    get lastName(): string {
        return AuthRegisterModel.lastName
    }

    get email(): string {
        return AuthRegisterModel.email
    }

    get password(): string {
        return AuthRegisterModel.password
    }

    get confirmPassword(): string {
        return AuthRegisterModel.confirmPassword
    }

    get emailError(): boolean {
        return AuthRegisterModel.emailError
    }

    get emailErrorMsg(): string {
        return AuthRegisterModel.emailErrorMsg
    }

    get passwordError(): boolean {
        return AuthRegisterModel.passwordError
    }

    get passwordErrorMsg(): string {
        return AuthRegisterModel.passwordErrorMsg
    }

    setFirstName = (value: string): void => {
        AuthRegisterModel.setFirstName(value)
    }

    setLastName = (value: string): void => {
        AuthRegisterModel.setLastName(value)
    }

    setEmail = (value: string): void => {
        AuthRegisterModel.setEmail(value)
    }

    setPassword = (value: string): void => {
        AuthRegisterModel.setPassword(value)
    }

    setConfirmPassword = (value: string): void => {
        AuthRegisterModel.setConfirmPassword(value)
    }

    setEmailError = action((value: boolean): void => {
        AuthRegisterModel.setEmailError(value)
    })

    setEmailErrorMsg = action((value: string): void => {
        AuthRegisterModel.setEmailErrorMsg(value)
    })

    setPasswordError = action((value: boolean): void => {
        AuthRegisterModel.setPasswordError(value)
    })

    setPasswordErrorMsg = action((value: string): void => {
        AuthRegisterModel.setPasswordErrorMsg(value)
    })

    signUp = async (): Promise<UserCredential> => {
        return await AuthRegisterModel.signUp()
    }

    validatePassword = (): boolean => {
        return AuthRegisterModel.validatePassword()
    }

    handleError = (error: any): void => {
        AuthRegisterModel.handleError(error)
    }
}

export default new AuthRegisterViewModel()
