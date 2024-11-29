import { FC } from 'react'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'
import ArrowPathIcon from './icons/ArrowPathIcon'
import HelpIcon from './icons/HelpIcon'

const TOOLTIP_OFFSET = 8
const TOOLTIP_TRIGGER_STYLES =
  'bg-[rgba(255,255,255,0.08)] p-2 rounded-lg flex items-center justify-center border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.12)]'
const TOOLTIP_CONTENT_STYLES =
  'z-50 max-w-80 overflow-hidden rounded-lg bg-[rgba(0,0,0,0.5)] shadow-2xl border backdrop-blur-sm backdrop-saturate-200 text-[#dcdcdc] p-3 text-sm grid gap-4 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'

type Props = {
  toggleNextImage: () => void
}

const Buttons: FC<Props> = ({ toggleNextImage }) => {
  return (
    <div className="absolute top-0 right-0 flex items-center gap-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={() => toggleNextImage()} className={TOOLTIP_TRIGGER_STYLES}>
              <ArrowPathIcon />
            </button>
          </TooltipTrigger>
          <TooltipContent sideOffset={TOOLTIP_OFFSET} className={TOOLTIP_CONTENT_STYLES}>
            <p>Toggle Image</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={TOOLTIP_TRIGGER_STYLES}>
              <HelpIcon />
            </div>
          </TooltipTrigger>
          <TooltipContent align="end" sideOffset={TOOLTIP_OFFSET} className={TOOLTIP_CONTENT_STYLES}>
            <p>GeoClock shows the +1 area code associated with the current time (ex. 2:12 → NYC).</p>
            <p className="text-xs text-[#dcdcdc]">
              Created by{' '}
              <a href="https://www.benhoeg.com" className="text-link">
                Ben Hoeg
              </a>
              . See source on{' '}
              <a href="https://github.com/benlikescode/geo-clock" className="text-link">
                GitHub
              </a>
              .
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default Buttons
