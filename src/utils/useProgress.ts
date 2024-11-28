import { useEffect, useState } from 'react'

export const useProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date()
      const seconds = date.getSeconds()
      const milliseconds = date.getMilliseconds()
      setProgress((seconds + milliseconds / 1000) / 60)
    }, 16)

    return () => clearInterval(timer)
  }, [])

  return { progress }
}
