import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Photo } from 'pexels'
import './App.css'
import ArrowPath from './icons/ArrowPath'
import PuzzleIcon from './icons/PuzzleIcon'
import { AREA_CODES_MAP, EXTRAS } from './utils/data'
import { randomElement } from './utils/randomElement'

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY
const PEXELS_BASE_ENDPOINT = 'https://api.pexels.com/v1/search'

const App = () => {
  const [time, setTime] = useState(new Date())

  const formatTime = (date: Date) => {
    const hours = date.getHours() % 12 || 12
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    const period = hours < 12 ? 'AM' : 'PM'

    return { hours: hours.toString(), minutes, seconds, period }
  }

  const { hours, minutes, seconds, period } = formatTime(time)

  const { data, refetch } = useQuery({
    queryKey: ['image', hours, minutes],
    queryFn: async () => {
      const place = AREA_CODES_MAP[hours + minutes] || EXTRAS[Number(hours + minutes) % EXTRAS.length]

      const QUERY = `wallpaper of ${place} city`
      const ORIENTATION = 'landscape'
      const PER_PAGE = 15

      const response = await fetch(
        `${PEXELS_BASE_ENDPOINT}?query=${QUERY}&orientation=${ORIENTATION}&per_page=${PER_PAGE}`,
        {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        },
      )

      const data = await response.json()
      console.log(data)

      return {
        name: place,
        image: randomElement(data.photos as Photo[]),
      }
    },
  })

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-dvh w-full flex items-center justify-center">
      {data?.image && (
        <img
          src={data.image.src.original}
          alt={data.image.alt ?? 'Image of current area code'}
          draggable={false}
          className="object-cover h-full w-full absolute inset-0 opacity-45"
        />
      )}

      <div className="absolute top-4 left-4">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <PuzzleIcon />
          GeoClock
        </h2>
      </div>

      <div className="relative z-10 select-none">
        <h1 className="text-9xl font-bold tabular-nums [text-shadow:_0_4px_0_rgba(0,0,0,0.4)]">
          {`${hours}:${minutes}`}

          <span className="text-4xl text-[#bcbcbc] font-medium">{` ${seconds} ${period}`}</span>
        </h1>
      </div>

      {data?.name && (
        <div className="absolute bottom-4 right-4 p-4 bg-[rgba(255,255,255,0.08)] rounded-xl border backdrop-blur-sm backdrop-saturate-150 flex items-center gap-4">
          {data.name}
          <button
            onClick={() => refetch()}
            className="bg-[rgba(255,255,255,0.08)] rounded-lg flex items-center justify-center p-2 border hover:bg-[rgba(255,255,255,0.12)]"
          >
            <ArrowPath />
          </button>
        </div>
      )}
    </div>
  )
}

export default App
