import { TrendingUp, Users, Shield } from 'lucide-react'
import Image from 'next/image'

export function MarketShiftSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-6">
            The Multi-Billion Dollar Shift Already Underway
          </h2>
        </div>
        
        <div className="mb-12">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto text-center mb-12">
            While you've been managing rising premiums, over{' '}
            <span className="font-bold text-primary">2 million Americans</span>{' '}
            have quietly moved to healthshare memberships saving an average of{' '}
            <span className="font-bold text-primary">$4,200 per person, per year</span>.
          </p>

          {/* Image and Stats Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side - Image */}
            <div className="relative">
              <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                <Image
                  src="/images/bird-wave-2.jpg"
                  alt="Massive crowd representing 2+ million Americans who have switched to healthshare memberships"
                  width={600}
                  height={400}
                  className="rounded-xl object-cover w-full h-[300px] lg:h-[400px]"
                />
              </div>
              {/* Overlay stat */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-white px-6 py-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">2+ Million</div>
                <div className="text-sm opacity-90">Americans</div>
              </div>
            </div>
            
            {/* Right side - Stats Cards */}
            <div className="grid gap-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    $4,200 Average Savings
                  </h4>
                </div>
                <p className="text-gray-700">
                  Per person, per year compared to traditional insurance
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    Full Protection
                  </h4>
                </div>
                <p className="text-gray-700">
                  Major medical expenses covered without regulatory overhead
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Why it works section - moved down */}
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Why it works:
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Healthshares aren't insurance, so they aren't burdened by the regulatory overhead 
            and broken system that drives up traditional plan costs.
          </p>
          <p className="text-lg text-gray-700">
            For healthy, low-utilization employees, this unlocks a{' '}
            <span className="font-bold text-primary">massive opportunity</span>.
          </p>
        </div>

        {/* Dom's Healthcare Journey */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700">
              Let's follow Dom, a typical healthy employee, through his healthcare year...
            </p>
          </div>

          {/* Character Introduction */}
          <div className="bg-white rounded-2xl p-6 shadow-lg max-w-xl mx-auto mb-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👨‍💼</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Meet Dom</h3>
            <div className="space-y-1 text-gray-600 text-sm">
              <p>28, Marketing Manager</p>
              <p>Active lifestyle, rarely gets sick</p>
              <p>Has your company's high-deductible plan</p>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-5 shadow-lg text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">💰</span>
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-2">Company Pays 80% of His Premium</h4>
              <div className="text-xl font-bold text-green-600 mb-1">$400/month</div>
              <div className="text-xs text-gray-600 mb-2">Company pays $3,840/year<br/>Dom pays $960/year</div>
              <p className="text-xs text-gray-500">High-deductible health plan</p>
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
              <p className="text-xs text-gray-500 mt-1">Typical for a healthy 28-year-old</p>
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
              <p className="text-xs text-gray-500 mt-1">Paid full price for everything</p>
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
              <p className="text-xs text-gray-500 mt-1">Could have paid cash for lower prices</p>
            </div>
          </div>

          {/* Alternative Solution */}
          <div className="bg-gradient-to-br from-primary/5 to-green-50 rounded-2xl p-6 shadow-lg max-w-4xl mx-auto">
            <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">
              What if Dom had a healthshare plan instead?
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly cost:</span>
                  <span className="font-semibold">$120 (company pays $96, Dom pays $24)</span>
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
                  <span className="font-semibold">Fully covered</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-sm">
                  <span className="text-gray-600">Total annual cost:</span>
                  <span className="font-bold">$1,890</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 text-center">
                <h5 className="text-base font-bold text-gray-900 mb-3">Annual Savings</h5>
                <div className="space-y-1">
                  <div className="text-xl font-bold text-green-600">Company saves: $2,688</div>
                  <div className="text-lg font-bold text-blue-600">Dom saves: $922</div>
                </div>
                <p className="text-xs text-gray-600 mt-3">
                  Dom is still protected for major medical events
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-base font-medium text-gray-900 mb-1">
                That's significant money back in both pockets, and Dom's still protected for major medical events.
              </p>
              <p className="text-sm text-gray-600">
                For employees with families, the annual savings can be in the thousands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
