import { makeObservable, observable, action } from 'mobx'
import {
    browserLocalPersistence,
    sendPasswordResetEmail,
    setPersistence,
    signInWithEmailAndPassword,
    UserCredential,
} from 'firebase/auth'
import { auth } from '@/services/firebase/firebase'
import { credentials } from '@/types/types'

class AuthLoginModel {
    user = null
    email = ''
    emailError = false
    emailErrorMsg = ''
    password = ''
    passwordError = false
    passwordErrorMsg = ''

    constructor() {
        makeObservable(this, {
            user: observable,

            // String
            email: observable,
            emailError: observable,
            emailErrorMsg: observable,
            password: observable,
            passwordError: observable,
            passwordErrorMsg: observable,
            // Function
            login: action,
            logout: action,
            resetPassword: action,

            setEmail: action,
            setEmailError: action,
            setEmailErrorMsg: action,
            setPassword: action,
            setPasswordError: action,
            setPasswordErrorMsg: action,
        })
    }

    login = async (credentials: credentials): Promise<UserCredential> => {
        try {
            await setPersistence(auth, browserLocalPersistence)
            const response = await signInWithEmailAndPassword(
                auth,
                credentials.email,
                credentials.password
            )
            return response
        } catch (error) {
            throw new Error(error.code)
        }
    }

    logout = async (): Promise<void> => {
        try {
            await auth.signOut()
            this.user = null
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    resetPassword = async (): Promise<void> => {
        try {
            await sendPasswordResetEmail(auth, this.email)
        } catch (error) {
            throw new Error(error.code)
        }
    }

    setEmail = (value: string): void => {
        this.email = value
    }

    setEmailError = (value: boolean): void => {
        this.emailError = value
    }

    setEmailErrorMsg = (value: string): void => {
        this.emailErrorMsg = value
    }

    setPassword = (value: string): void => {
        this.password = value
    }

    setPasswordError = (value: boolean): void => {
        this.passwordError = value
    }

    setPasswordErrorMsg = (value: string): void => {
        this.passwordErrorMsg = value
    }

    handleError = (error): void => {
        const errorCode = error.message
        let errorMessage = 'An error occurred during login.'
        console.log('the error is ', error)

        switch (errorCode) {
            case 'auth/invalid-credential':
                errorMessage = 'Incorrect email or password.'
                this.setEmailError(true)
                this.setPasswordError(true)
                this.setPasswordErrorMsg(errorMessage)
                break
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password.'
                this.setPasswordError(true)
                this.setPasswordErrorMsg(errorMessage)
                break
            case 'auth/user-not-found':
                errorMessage = 'This email is not associated with an account.'
                this.setEmailError(true)
                this.setEmailErrorMsg(errorMessage)
                break
            case 'auth/invalid-email':
            case 'auth/missing-email':
                errorMessage = 'Please enter a valid email address.'
                this.setEmailError(true)
                this.setEmailErrorMsg(errorMessage)
                break
            case 'auth/too-many-requests':
                errorMessage =
                    'Too many login attempts. Please try again later.'
                this.setPasswordError(true)
                this.setPasswordErrorMsg(errorMessage)
                break
            case 'auth/weak-password':
                errorMessage =
                    'Your password is too weak. Please choose a stronger password.'
                this.setPasswordError(true)
                this.setPasswordErrorMsg(errorMessage)
                break
            default:
                // For unknown errors, log details for debugging
                errorMessage = 'Unexpected error'
                this.setPasswordError(true)
                this.setPasswordErrorMsg(errorMessage)
        }
    }
}

export default new AuthLoginModel()
