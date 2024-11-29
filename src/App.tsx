import { useState } from 'react'
import './App.css'
import Buttons from './Buttons'
import { cn } from './utils/cn'
import { useClock } from './utils/useClock'
import { useFetchImage } from './utils/useFetchImage'

const App = () => {
  const [hasImgLoaded, setHasImgLoaded] = useState(false)
  const [imageIdx, setImageIdx] = useState(0)

  const { animationProgress, hours, minutes, meridiem } = useClock()
  const { data, prevImages } = useFetchImage(hours, minutes)

  const currImage = data?.images[imageIdx]
  const prevImage = prevImages?.[imageIdx]

  return (
    <div className="h-dvh w-full flex items-center justify-center p-4">
      {(currImage || prevImage) && (
        <img
          src={currImage?.src.original || prevImage?.src.original}
          alt={currImage?.alt || prevImage?.alt || 'Image of current area code'}
          draggable={false}
          onLoadStart={() => setHasImgLoaded(false)}
          onLoad={() => setHasImgLoaded(true)}
          className={cn(
            'object-cover h-full w-full absolute inset-0 transition-opacity duration-500',
            hasImgLoaded ? 'opacity-35' : 'opacity-0',
          )}
        />
      )}

      <div className="h-full w-full z-10 flex items-center justify-center relative">
        <h1 className="text-[clamp(4rem,25vw,9rem)] font-bold [text-shadow:_0_4px_0_rgba(0,0,0,0.4)] select-none">
          {`${hours}:${minutes}`}

          <span className="text-4xl text-[#dcdcdc] font-medium">{` ${meridiem}`}</span>
        </h1>

        <div className={cn('absolute bottom-0 flex items-center justify-center flex-col gap-8 w-full duration-500')}>
          <div
            className={cn(
              'px-6 py-3 bg-[rgba(255,255,255,0.08)] text-sm sm:text-lg rounded-full border backdrop-blur-sm backdrop-saturate-150 relative overflow-hidden flex items-center justify-center text-center',
              data?.name
                ? 'animate-in fade-in-0 zoom-in-95 opacity-100'
                : 'animate-out fade-out-0 zoom-out-95 opacity-0',
            )}
          >
            <div
              className="absolute inset-0 bottom-0 bg-[rgba(255,255,255,0.05)] origin-top transform duration-[16] ease-linear"
              style={{ transform: `scaleY(${animationProgress})` }}
            />

            {data?.name}
          </div>

          <p
            className={cn(
              'text-[#bcbcbc] text-sm text-center',
              currImage?.photographer_url || prevImage?.photographer_url
                ? 'animate-in fade-in-0 zoom-in-95 opacity-100'
                : 'animate-out fade-out-0 zoom-out-95 opacity-0',
            )}
          >
            <a href={currImage?.photographer_url || prevImage?.photographer_url}>
              &copy; {currImage?.photographer || prevImage?.photographer}
            </a>
          </p>
        </div>

        <Buttons toggleNextImage={() => setImageIdx((prev) => (prev + 1) % (data?.images.length ?? 15))} />
      </div>
    </div>
  )
}

export default App
