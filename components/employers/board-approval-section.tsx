import { Calculator, Award, TrendingUp } from 'lucide-react'

export function BoardApprovalSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
            Why This Gets Board Approval
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Calculator className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Predictable Savings
            </h3>
            <p className="text-gray-700 mb-4">
              Even at 40% workforce participation, a 1,000-person company can save{' '}
              <span className="font-bold text-green-600">~$1.5M annually</span>.
            </p>
            <p className="text-gray-700">
              At 60% participation, savings approach{' '}
              <span className="font-bold text-green-600">$2.3M</span>.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Talent Advantage
            </h3>
            <p className="text-gray-700 mb-4">
              Financially savvy employees feel valued, not trapped.
            </p>
            <p className="text-gray-700">
              Retention and recruiting both improve.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-8 shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Strategic Leadership
            </h3>
            <p className="text-gray-700 mb-4">
              Early adoption signals innovation while competitors wrestle with rising costs.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Bottom line:
          </h3>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            Stop overpaying for employees who don't use expensive coverage.{' '}
            <span className="font-bold">Keep insurance where it's needed.</span>{' '}
            <span className="font-bold text-primary">Add smarter options where it's not.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
