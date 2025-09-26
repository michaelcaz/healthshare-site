import { CheckCircle } from 'lucide-react'

export function ComparisonTable() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl mb-4">
            The Numbers Your CFO Cares About
          </h2>
        </div>
        
        {/* Mobile-First Card Layout */}
        <div className="space-y-6 lg:hidden">
          {/* Traditional Insurance Card */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Traditional Insurance</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Annual cost/<br/>employee</span>
                <span className="text-lg font-semibold text-gray-900">$5,000-$12,000</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Utilization</span>
                <span className="text-sm text-gray-600">Deductible rarely met</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm font-medium text-gray-700">Your savings potential</span>
                <span className="text-lg text-gray-400">—</span>
              </div>
            </div>
          </div>

          {/* Healthshare Card */}
          <div className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-2xl p-6 border border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl"></div>
            <h3 className="text-lg font-bold text-primary mb-4 text-center relative z-10">Healthshare Membership</h3>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center py-3 border-b border-primary/20">
                <span className="text-sm font-medium text-gray-700">Annual cost/<br/>employee</span>
                <span className="text-lg font-bold text-primary">$1,000–$5,000</span>
              </div>
              <div className="flex justify-between items-start py-3 border-b border-primary/20">
                <span className="text-sm font-medium text-gray-700">Utilization</span>
                <span className="text-sm font-semibold text-primary text-right">Cost-sharing only for major medical</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-sm font-medium text-gray-700">Your savings potential</span>
                <span className="text-sm font-bold text-green-600 text-right">$4,000–$11,000<br/>per employee annually</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-3 gap-0">
              {/* Headers */}
              <div className="bg-gray-50 p-6 border-r border-gray-200">
                <div className="h-8"></div> {/* Spacer for alignment */}
              </div>
              <div className="bg-gray-50 p-6 border-r border-gray-200 text-center">
                <h3 className="text-lg font-bold text-gray-900">Traditional Insurance</h3>
              </div>
              <div className="bg-gray-50 p-6 text-center">
                <h3 className="text-lg font-bold text-primary">Healthshare Membership</h3>
              </div>

              {/* Row 1: Cost */}
              <div className="p-6 border-r border-gray-200 border-t border-gray-100">
                <span className="font-semibold text-gray-900">Typical annual cost/employee</span>
              </div>
              <div className="p-6 border-r border-gray-200 border-t border-gray-100 text-center">
                <span className="text-xl font-semibold text-gray-700">$5,000-$12,000</span>
              </div>
              <div className="p-6 border-t border-gray-100 text-center bg-gradient-to-r from-primary/5 to-blue-50">
                <span className="text-xl font-bold text-primary">$1,000–$5,000</span>
              </div>

              {/* Row 2: Utilization */}
              <div className="p-6 border-r border-gray-200 border-t border-gray-100">
                <span className="font-semibold text-gray-900">Utilization</span>
              </div>
              <div className="p-6 border-r border-gray-200 border-t border-gray-100 text-center">
                <span className="text-gray-600">Deductible rarely met</span>
              </div>
              <div className="p-6 border-t border-gray-100 text-center bg-gradient-to-r from-primary/5 to-blue-50">
                <span className="font-semibold text-primary">Cost-sharing only for major medical</span>
              </div>

              {/* Row 3: Savings */}
              <div className="p-6 border-r border-gray-200 border-t border-gray-100">
                <span className="font-semibold text-gray-900">Your savings potential</span>
              </div>
              <div className="p-6 border-r border-gray-200 border-t border-gray-100 text-center">
                <span className="text-2xl text-gray-300">—</span>
              </div>
              <div className="p-6 border-t border-gray-100 text-center bg-gradient-to-r from-green-50 to-emerald-50">
                <span className="text-lg font-bold text-green-600">$4,000–$11,000<br/>per participating employee annually</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Employee Benefits Section */}
        <div className="mt-16 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">
            What your healthiest employees get:
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Cash-pay rates for routine care</p>
                <p className="text-sm text-gray-600">40–60% less than insurance rates</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Full reimbursement</p>
                <p className="text-sm text-gray-600">For qualifying major expenses</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">No network restrictions</p>
                <p className="text-sm text-gray-600">Choose any provider</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Thousands back annually</p>
                <p className="text-sm text-gray-600">Money in their pocket each year</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
