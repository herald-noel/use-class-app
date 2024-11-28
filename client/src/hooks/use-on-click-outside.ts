import { useEffect, RefObject } from 'react'

type Handler = (event: MouseEvent) => void

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
    refs: RefObject<T>[] | RefObject<T>,
    handler: Handler,
    mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            const refsArray = Array.isArray(refs) ? refs : [refs]
            const shouldTriggerHandler = refsArray.every((ref) => {
                return (
                    !ref.current || !ref.current.contains(event.target as Node)
                )
            })

            if (shouldTriggerHandler) {
                handler(event)
            }
        }

        document.addEventListener(mouseEvent, listener)

        return () => {
            document.removeEventListener(mouseEvent, listener)
        }
    }, [refs, handler, mouseEvent])
}
