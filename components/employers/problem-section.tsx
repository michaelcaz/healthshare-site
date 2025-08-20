import { AlertTriangle, DollarSign, TrendingDown } from 'lucide-react'

export function ProblemSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-6">
            Why You're Overpaying Today
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            You're spending thousands per employee every year whether they use their benefits or not.
          </p>
        </div>
        
        <div className="mb-12">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto text-center mb-8">
            For a large portion of your workforce, it's an expensive benefit they barely touch. 
            These low utilization employees:
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Rarely hit their deductible
              </h3>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Could often pay less for care out-of-pocket with cash
              </h3>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cost you thousands for coverage they don't fully use
              </h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto text-center">
          <p className="text-xl font-medium text-gray-900 mb-4">
            It's not wasteful employees. It's an outdated plan design.
          </p>
        </div>
      </div>
    </section>
  )
}
