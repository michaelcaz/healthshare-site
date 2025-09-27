import Image from 'next/image'

export function DomStory() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dom's Healthcare Journey */}
        <div className="mt-12 lg:mt-16">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-primary mb-4">
              How it Works
            </h2>
            <p className="text-lg text-gray-700">
              Let's follow Dom, a self-employed health nut, through his healthcare year...
            </p>
          </div>

          {/* Character Introduction */}
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-xl mx-auto mb-8 text-center">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/dom.svg"
                alt="Dom - Marketing Manager"
                width={80}
                height={80}
                className="w-20 h-20"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Meet Dom</h3>
            <div className="space-y-1 text-gray-600 text-sm">
              <p>36, Founder of PlungeDr.com</p>
              <p>Active lifestyle, rarely gets sick</p>
              <p>Got a high-deductible plan off of healthcare.gov</p>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-5 shadow-lg text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">💰</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-2">Premium</h4>
              <div className="text-xl font-bold text-green-600 mb-1">$450/month</div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-5 shadow-lg text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🏥</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-2">His Real Healthcare Usage</h4>
              <div className="text-xs text-gray-600 space-y-0.5 mb-2">
                <div>1 dermatology visit ($200)</div>
                <div>1 urgent care visit ($450)</div>
                <div>Annual physical (covered)</div>
                <div>Prescriptions ($50)</div>
              </div>
              <div className="text-base font-bold text-blue-600">Dom spent $700</div>
              <p className="text-xs text-gray-500 mt-1">Typical for a healthy 36-year-old</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-5 shadow-lg text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">📊</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-2">His $7,000 Deductible</h4>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
              <div className="text-xs text-gray-600 mb-1">Used $700 of $7,000 deductible</div>
              <p className="text-xs font-medium text-orange-600">Never reached his deductible</p>
              <p className="text-xs text-gray-500 mt-1">Paid inflated rates for care compared to cash pay prices</p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-5 shadow-lg text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">💸</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-2">Money Down the Drain</h4>
              <div className="text-xs text-gray-600 space-y-0.5 mb-2">
                <div>Premium paid: $4,800</div>
                <div>Healthcare used: $700</div>
                <div className="text-base font-bold text-red-600">Wasted: $4,100</div>
              </div>
              <p className="text-xs font-medium text-red-600">85% of premium unused</p>
            </div>
          </div>

          {/* Alternative Solution */}
          <div className="bg-gradient-to-br from-primary/5 to-green-50 rounded-2xl p-6 shadow-lg max-w-4xl mx-auto">
            <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
              What if Dom had a healthshare membership instead?
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly cost:</span>
                  <span className="font-semibold text-right">$120</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Annual cost:</span>
                  <span className="font-semibold">$1,440</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Routine care:</span>
                  <span className="font-semibold">$450 (cash prices)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Major medical:</span>
                  <span className="font-semibold">Fully protected</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-sm">
                  <span className="text-gray-600">Total annual cost:</span>
                  <span className="font-bold">$1,890</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 text-center">
                <h5 className="text-base font-bold text-gray-900 mb-3">Annual Savings</h5>
                <div className="space-y-1">
                  <div className="text-xl font-bold text-green-600">$4,210</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-base font-medium text-gray-900 mb-1">
                That's significant money back in his pocket, and he's still got full protection for major medical events.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
