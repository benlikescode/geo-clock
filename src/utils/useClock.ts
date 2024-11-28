import { useState, useEffect } from 'react'

export const useClock = () => {
  const [time, setTime] = useState(new Date())

  const hours = (time.getHours() % 12 || 12).toString()
  const minutes = time.getMinutes().toString().padStart(2, '0')
  const seconds = time.getSeconds().toString().padStart(2, '0')
  const meridiem = time.getHours() < 12 ? 'AM' : 'PM'

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)

    return () => clearInterval(timer)
  }, [])

  return { hours, minutes, seconds, meridiem }
}
