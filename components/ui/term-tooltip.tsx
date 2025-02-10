'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'
import { HelpCircle } from 'lucide-react'
import { terminology } from '@/lib/terminology'

interface TermTooltipProps {
  term: string
  children: React.ReactNode
  showIcon?: boolean
}

export function TermTooltip({ term, children, showIcon = true }: TermTooltipProps) {
  const definition = terminology.find(t => 
    t.term.toLowerCase() === term.toLowerCase()
  )

  if (!definition) return <>{children}</>

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger className="cursor-help inline-flex items-center gap-1">
          {children}
          {showIcon && <HelpCircle className="h-4 w-4 text-gray-400" />}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-2">
            <p className="font-medium">{definition.shortDefinition}</p>
            {definition.example && (
              <p className="text-sm text-gray-500">{definition.example}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 