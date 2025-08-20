import { TrendingUp, Users, Shield } from 'lucide-react'

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
          <p className="text-lg text-gray-700 max-w-4xl mx-auto text-center mb-8">
            While you've been managing rising premiums, over{' '}
            <span className="font-bold text-primary">2 million Americans</span>{' '}
            have quietly moved to healthshare memberships saving an average of{' '}
            <span className="font-bold text-primary">$4,200 per person, per year</span>.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
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
          
          <div className="grid gap-6">
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900">
                  2+ Million Members
                </h4>
              </div>
              <p className="text-gray-700">
                Americans have already made the switch to healthshare memberships
              </p>
            </div>
            
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
    </section>
  )
}
