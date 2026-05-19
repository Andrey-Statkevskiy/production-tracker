import { useEffect, useState } from 'react'

export const useTimer = (startTime) => {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!startTime) return

    const interval = setInterval(() => {
      const now = new Date()
      const start = new Date(startTime)
      const diff = Math.floor((now - start) / 1000)

      setElapsed(diff)
    }, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  return elapsed
}