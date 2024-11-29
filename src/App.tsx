import { useState } from 'react'
import './App.css'
import Buttons from './Buttons'
import { cn } from './utils/cn'
import { useClock } from './utils/useClock'
import { useFetchImage } from './utils/useFetchImage'
import { useProgress } from './utils/useProgress'

const App = () => {
  const [hasImgLoaded, setHasImgLoaded] = useState(false)

  const { hours, minutes, meridiem } = useClock()
  const { progress } = useProgress()
  const { data, prevImage, refetch } = useFetchImage(hours, minutes)

  return (
    <div className="h-dvh w-full flex items-center justify-center p-4">
      {(data?.image || prevImage) && (
        <img
          src={data?.image?.src.original || prevImage?.src.original}
          alt={prevImage?.alt || data?.image?.alt || 'Image of current area code'}
          draggable={false}
          className={cn('object-cover h-full w-full absolute inset-0', hasImgLoaded ? 'opacity-45' : 'opacity-0')}
          onLoad={() => setHasImgLoaded(true)}
        />
      )}

      <div className="h-full w-full z-10 flex items-center justify-center relative">
        <h1 className="text-[clamp(4rem,25vw,9rem)] font-bold [text-shadow:_0_4px_0_rgba(0,0,0,0.4)] select-none">
          {`${hours}:${minutes}`}

          <span className="text-4xl text-[#dcdcdc] font-medium">{` ${meridiem}`}</span>
        </h1>

        {data?.name && (
          <div className="absolute bottom-0 flex items-center justify-center flex-col gap-8 w-full">
            <div className="px-6 py-3 bg-[rgba(255,255,255,0.08)] text-sm sm:text-lg rounded-full border backdrop-blur-sm backdrop-saturate-150 relative overflow-hidden flex items-center justify-center text-center">
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
    </div>
  )
}

export default App
