export function PressSection() {
  return (
    <div className="w-full bg-white py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-base font-medium text-gray-500 tracking-wider mb-3 md:mb-6 text-center">
            Our providers have been featured in...
          </h2>
          <div className="grid grid-cols-3 gap-x-4 gap-y-4 md:grid-cols-3 lg:grid-cols-6 items-center justify-items-center w-full max-w-6xl mx-auto">
            <img src="/images/logos/wsj.svg" alt="Wall Street Journal" width={140} height={46} />
            <img src="/images/logos/pbs.svg" alt="PBS" width={96} height={32} />
            <img src="/images/logos/forbes.svg" alt="Forbes" width={96} height={32} />
            <img src="/images/logos/vox.svg" alt="Vox" width={144} height={32} />
            <img src="/images/logos/nbcnews.svg" alt="NBC News" width={200} height={32} />
            <img src="/images/logos/cbsnews.svg" alt="CBS News" width={140} height={46} />
          </div>
        </div>
      </div>
    </div>
  )
}
