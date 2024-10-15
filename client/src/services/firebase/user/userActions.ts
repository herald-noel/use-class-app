import { get, onValue, push, ref, remove, set, update } from 'firebase/database'
import { database } from '../firebase'
import AuthLoginViewModel from '../../../viewModels/AuthLoginViewModel'
import dayjs from 'dayjs'

interface UserCredential {
    firstname: string
    lastname: string
    email: string
}

export const addUserInfo = async (
    userCredential: UserCredential,
    userId: string
) => {
    try {
        const userRef = ref(database, `users/${userId}`)
        set(userRef, {
            firstname: userCredential.firstname,
            lastname: userCredential.lastname,
            email: userCredential.email,
        })
    } catch (error) {
        console.error('Error updating profile:', error)
    }
}

export const saveDiagram = async (
    title: string,
    plantUMLCode: string,
    mermaidCode: string
) => {
    try {
        const user = AuthLoginViewModel.user
        if (user !== null) {
            const userId = user['uid']

            const userMermaidCodesRef = ref(
                database,
                `users/${userId}/mermaidCodes`
            )

            const newEntryRef = push(userMermaidCodesRef)

            const today = dayjs()
            const dateCreated = today.format('YYYY-MM-DD')

            const value = {
                title: title,
                plantUMLCode: plantUMLCode,
                mermaidCode: mermaidCode,
                dateCreated: dateCreated,
            }

            await update(newEntryRef, value)
            return true
        }
    } catch (error) {
        console.error('Error saving mermaide code:', error)
        return false
    }
}

export const updateDiagram = async (
    diagramId: string,
    title: string,
    plantUMLCode: string,
    mermaidCode: string
) => {
    try {
        const user = AuthLoginViewModel.user
        if (user !== null) {
            const userId = user['uid']

            const diagramRef = ref(
                database,
                `users/${userId}/mermaidCodes/${diagramId}`
            )

            const value = {
                title: title,
                plantUMLCode: plantUMLCode,
                mermaidCode: mermaidCode,
            }

            await update(diagramRef, value)
            return true
        }
    } catch (error) {
        console.error('Error updating mermaid code:', error)
        return false
    }
}

export const getUserMermaidCodes = async () => {
    const user = AuthLoginViewModel.user
    try {
        if (user !== null) {
            const userId = user['uid']
            const userMermaidCodesRef = ref(
                database,
                `users/${userId}/mermaidCodes`
            )

            const snapshot = await get(userMermaidCodesRef)
            if (snapshot.exists()) {
                return snapshot.val()
            } else {
                return []
            }
        }
    } catch (e) {
        console.error(e)
        return []
    }
}

export const deleteMermaidCode = async (diagramId: string) => {
    const user = AuthLoginViewModel.user
    try {
        if (user !== null) {
            const userId = user['uid']
            const userMermaidCodesRef = ref(
                database,
                `users/${userId}/mermaidCodes/${diagramId}`
            )

            await remove(userMermaidCodesRef)
        }
    } catch (e) {
        console.error(e)
        return []
    }
}
