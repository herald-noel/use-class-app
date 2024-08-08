import { credentials } from '@/types/types'
import AuthLoginModel from '../models/AuthLoginModel'
import { action } from 'mobx'
import { UserCredential } from 'firebase/auth'

class AuthLoginViewModel {
    get user() {
        return AuthLoginModel.user
    }

    get email(): string {
        return AuthLoginModel.email
    }

    get emailError(): boolean {
        return AuthLoginModel.emailError
    }

    get emailErrorMsg(): string {
        return AuthLoginModel.emailErrorMsg
    }

    get password(): string {
        return AuthLoginModel.password
    }

    get passwordError(): boolean {
        return AuthLoginModel.passwordError
    }

    get passwordErrorMsg(): string {
        return AuthLoginModel.passwordErrorMsg
    }

    setUser = action((value: any): void => {
        AuthLoginModel.user = value
    })

    setEmail = (value: string): void => {
        AuthLoginModel.setEmail(value)
    }

    setEmailError = (value: boolean): void => {
        AuthLoginModel.setEmailError(value)
    }

    setEmailErrorMsg = (value: string): void => {
        AuthLoginModel.setEmailErrorMsg(value)
    }

    setPassword = (value: string): void => {
        AuthLoginModel.setPassword(value)
    }

    setPasswordError = (value: boolean): void => {
        AuthLoginModel.setPasswordError(value)
    }

    setPasswordErrorMsg = (value: string): void => {
        AuthLoginModel.setPasswordErrorMsg(value)
    }

    login = async (credentials: credentials): Promise<UserCredential> => {
        return await AuthLoginModel.login(credentials)
    }

    logout = async (): Promise<void> => {
        await AuthLoginModel.logout()
    }

    resetPassword = async () => {
        await AuthLoginModel.resetPassword()
    }

    handleError = (error: any): void => {
        AuthLoginModel.handleError(error)
    }
}

export default new AuthLoginViewModel()
