import { AlertTriangle, DollarSign, TrendingDown } from 'lucide-react'

export function ProblemSection() {
  return (
    <section className="py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-4">
            Why You're Overpaying Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You're spending thousands per employee every year whether they use their benefits or not.
          </p>
        </div>
        
        <div className="mb-8">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto text-center mb-6">
            For a large portion of your workforce, it's an expensive benefit they barely touch. 
            These low utilization employees:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Rarely hit their deductible
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Most healthy employees never reach their high deductible, paying full price for all care
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Could often pay less for care out-of-pocket with cash
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Cash prices are often 40-60% lower than insurance-negotiated rates for routine services
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-7 h-7 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Cost you thousands for coverage they don't fully use
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                You're paying premium rates for employees who use minimal healthcare services
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg max-w-4xl mx-auto text-center">
          <p className="text-lg font-medium text-gray-900">
            It's not wasteful employees. It's an outdated plan design.
          </p>
        </div>
      </div>
    </section>
  )
}
