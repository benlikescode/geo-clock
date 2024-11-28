import './App.css'
import Buttons from './Buttons'
import { useClock } from './utils/useClock'
import { useFetchImage } from './utils/useFetchImage'
import { useProgress } from './utils/useProgress'

const App = () => {
  const { hours, minutes, meridiem } = useClock()
  const { progress } = useProgress()
  const { data, refetch } = useFetchImage(hours, minutes)

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

      <div className="relative z-10 select-none flex items-center flex-col">
        <h1 className="text-[8rem] font-bold [text-shadow:_0_4px_0_rgba(0,0,0,0.4)]">
          {`${hours}:${minutes}`}

          <span className="text-4xl text-[#dcdcdc] font-medium">{` ${meridiem}`}</span>
        </h1>
      </div>

      {data?.name && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 grid gap-8">
          <div className="px-6 py-3 bg-[rgba(255,255,255,0.08)] text-lg rounded-full border backdrop-blur-sm backdrop-saturate-150 relative overflow-hidden flex items-center justify-center">
            <div
              className="absolute inset-0 bottom-0 bg-[rgba(255,255,255,0.08)] origin-top"
              style={{
                transform: `scaleY(${progress})`,
                transition: 'transform 16ms linear',
              }}
            />

            {data.name}
          </div>

          <p className="text-[#bcbcbc] text-sm text-center">
            <a href={data.image?.photographer_url}>&copy; {data.image?.photographer}</a>
          </p>
        </div>
      )}

      <Buttons refetch={refetch} />
    </div>
  )
}

export default App
