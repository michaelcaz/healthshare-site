'use client'

import { Star } from 'lucide-react'

export function PressSection() {
  return (
    <div className="w-full bg-gradient-to-b from-blue-50 via-white to-gray-50 py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          {/* Trust Element */}
          <div className="flex items-center justify-center flex-wrap gap-2 md:gap-4">
            {/* Stars in individual green squares */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="relative p-2 rounded-sm overflow-hidden">
                  {star === 5 ? (
                    // 75% filled green background for the last star
                    <>
                      <div className="absolute inset-0 bg-gray-300 rounded-sm"></div>
                      <div className="absolute inset-0 bg-emerald-500 rounded-sm" style={{ width: '75%' }}></div>
                      <Star className="h-4 w-4 text-white fill-white relative z-10" />
                    </>
                  ) : (
                    // Fully filled green background for the first 4 stars
                    <>
                      <div className="absolute inset-0 bg-emerald-500 rounded-sm"></div>
                      <Star className="h-4 w-4 text-white fill-white relative z-10" />
                    </>
                  )}
                </div>
              ))}
            </div>
            
            {/* Rating and text */}
            <div className="text-center md:text-left">
              <div className="text-sm md:text-base text-gray-700 font-medium">
                Our partner providers avg. <strong>4.7</strong> stars with
              </div>
              <div className="text-sm md:text-base text-gray-700 font-medium">
                <strong>1,739</strong> reviews on Google and Trustpilot
              </div>
            </div>
          </div>

          {/* Press Coverage */}
          <div className="flex flex-col items-center">
            <h2 className="text-base font-medium text-gray-500 tracking-wider mb-3 md:mb-6 text-center">
              They've also been featured in...
            </h2>
            <div className="grid grid-cols-3 gap-x-4 gap-y-4 md:grid-cols-3 lg:grid-cols-6 items-center justify-items-center w-full max-w-6xl mx-auto">
              <img src="/images/logos/wsj.svg" alt="Wall Street Journal" width={96} height={32} className="opacity-60 grayscale" />
              <img src="/images/logos/cbsnews.svg" alt="CBS News" width={240} height={80} className="opacity-60 grayscale" />
              <img src="/images/logos/forbes.svg" alt="Forbes" width={96} height={32} className="opacity-60 grayscale" />
              <img src="/images/logos/vox.svg" alt="Vox" width={144} height={32} className="opacity-70 grayscale" />
              <img src="/images/logos/nbcnews.svg" alt="NBC News" width={200} height={32} className="opacity-70 grayscale" />
              <img src="/images/logos/pbs.svg" alt="PBS" width={96} height={32} className="opacity-60 grayscale" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
