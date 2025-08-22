import { TrendingUp, Users, Shield } from 'lucide-react'
import Image from 'next/image'

export function MarketShiftSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl mb-6">
            The Quiet Revolution in Benefits Design
          </h2>
        </div>
        
        <div className="mb-12">
          <div className="max-w-4xl mx-auto text-center mb-12 space-y-4">
            <p className="text-lg text-gray-700">
              While premiums rise 10-20% every year, many employers have discovered an overlooked option for some employees: medical cost-sharing memberships. Over{' '}
              <span className="font-bold text-primary">1.7 million Americans</span>{' '}
              now use them, saving an average of{' '}
              <span className="font-bold text-primary">$4,200 per person annually</span>.
            </p>
            <p className="text-lg text-gray-700">
              These programs (commonly called healthshares) are a better alternative to traditional insurance for many employees. They're a modern financial model built for healthy employees who rarely need care. For this segment of your workforce, they're often a smarter fit.
            </p>
          </div>

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
                <div className="text-2xl font-bold">1.7 Million</div>
                <div className="text-sm opacity-90">Americans</div>
              </div>
            </div>
            
            {/* Right side - Info Cards */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Fully compliant
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Healthshares aren't insurance—but they operate legally in every state and are used by millions of Americans today. Employers don't replace insurance; they simply add this as an option for employees who rarely need care and are tired of being ripped off by traditional plans.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Major Medical
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Members get protection against high-cost, unexpected events - hospitalizations, surgeries, emergencies, expensive treatments - without the bloated overhead of insurance. Everyday care is paid in cash (usually 40–60% less than insurance rates) and then submitted to the healthshare community for reimbursement.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Built for Low-Utilization Employees
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Employees who rarely hit their deductible often overpay for insurance they don't use. Healthshare memberships give them a more cost-effective option while those that utilize care more often can stay on traditional plans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Dom's Healthcare Journey */}
        <div className="mt-12 lg:mt-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl mb-4">
              What Happens When You Give Employees a Smarter Choice
            </h2>
            <p className="text-lg text-gray-700">
              Let's follow Dom, a typical healthy employee, through his healthcare year...
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
                  <span className="font-semibold text-right">$120 (company pays $96, Dom pays $24)</span>
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
                  <div className="text-xl font-bold text-green-600">Company saves: $2,688</div>
                  <div className="text-lg font-bold text-blue-600">Dom saves: $922</div>
                </div>
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
