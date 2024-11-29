import { FC } from 'react'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'
import ArrowPathIcon from './icons/ArrowPathIcon'
import HelpIcon from './icons/HelpIcon'

const TOOLTIP_OFFSET = 8
const TOOLTIP_CONTENT_STYLES =
  'z-50 max-w-80 overflow-hidden rounded-md bg-[rgba(255,255,255,0.75)] text-gray-900 px-3 py-1.5 text-sm animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'

type Props = {
  refetch: () => void
}

const Buttons: FC<Props> = ({ refetch }) => {
  return (
    <div className="absolute top-0 right-0 flex items-center gap-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <button
              onClick={() => refetch()}
              className="bg-[rgba(255,255,255,0.08)] rounded-lg flex items-center justify-center p-2 border hover:bg-[rgba(255,255,255,0.12)]"
            >
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
          <TooltipTrigger>
            <div className="bg-[rgba(255,255,255,0.08)] rounded-lg flex items-center justify-center p-2 border hover:bg-[rgba(255,255,255,0.12)]">
              <HelpIcon />
            </div>
          </TooltipTrigger>
          <TooltipContent align="end" sideOffset={TOOLTIP_OFFSET} className={TOOLTIP_CONTENT_STYLES}>
            <p>This site shows the +1 area code associated with the current time (ex. 2:12 → NYC)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default Buttons
