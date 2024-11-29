import { useState, useEffect } from 'react'

export const useClock = () => {
  const [time, setTime] = useState(new Date())
  const [animationProgress, setAnimationProgress] = useState(0)

  const hours = (time.getHours() % 12 || 12).toString()
  const minutes = time.getMinutes().toString().padStart(2, '0')
  const meridiem = time.getHours() < 12 ? 'AM' : 'PM'

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date()
      const seconds = date.getSeconds()
      const milliseconds = date.getMilliseconds()

      setTime(date)
      setAnimationProgress((seconds + milliseconds / 1000) / 60)
    }, 16)

    return () => clearInterval(timer)
  }, [])

  return { animationProgress, hours, minutes, meridiem }
}
