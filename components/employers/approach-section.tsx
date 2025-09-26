'use client'

export function ApproachSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:pr-8">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Unlike traditional brokers who are limited to off-the-shelf insurance plans, Sharewize creates{' '}
                <span className="font-semibold text-primary">custom funding arrangements</span>{' '}
                that give us the flexibility to design benefits around your actual workforce needs - often resulting in{' '}
                <span className="font-semibold text-primary">year-over-year cost reductions</span>{' '}
                instead of the typical 10-20% annual increases.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                This approach allows us to tap into the{' '}
                <span className="font-semibold text-gray-900">fair market healthcare system</span>{' '}
                - where providers compete on quality and price rather than hiding behind complex network contracts.{' '}
                <span className="font-semibold text-primary">The result: your employees get better care at lower costs.</span>
              </p>
            </div>
          </div>

          {/* Right Cards */}
          <div className="space-y-4">
            {/* Traditional Insurance Card */}
            <div className="flex items-start space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-md">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Familiar insurance options
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  for employees with ongoing or complex medical needs
                </p>
              </div>
            </div>

            {/* Zero Out-of-Pocket Card */}
            <div className="flex items-start space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-md">
              <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Zero out-of-pocket coverage
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  for employees who can't afford high deductibles but need reliable access to care
                </p>
              </div>
            </div>

            {/* Cost-Effective Major Medical Card */}
            <div className="flex items-start space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-md">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Cost-effective major medical protection
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  for employees who rarely use care but want comprehensive coverage, better access, and higher quality providers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
