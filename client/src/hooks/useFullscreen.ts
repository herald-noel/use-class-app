import { useCallback } from 'react'

export const useFullscreen = (elementRef) => {
    const toggleFullscreen = useCallback(() => {
        if (elementRef.current) {
            if (!document.fullscreenElement) {
                elementRef.current.style.backgroundColor = 'white'
                elementRef.current.requestFullscreen().catch((err) => {
                    console.error(
                        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
                    )
                })
            } else {
                document.exitFullscreen()
            }
        }
    }, [elementRef])

    return toggleFullscreen
}
