import { useCallback, useEffect, useRef } from 'react'

export const useTimer = () => {
  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timerId.current !== null) {
      clearTimeout(timerId.current)
    }
  }, [])

  const resetTimer = useCallback(
    (callback: () => void, duration: number) => {
      clearTimer()
      timerId.current = setTimeout(callback, duration)
    },
    [clearTimer]
  )

  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  return { clearTimer, resetTimer }
}
