import { Calculator, Award, TrendingUp } from 'lucide-react'
import Image from 'next/image'

export function BoardApprovalSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl mb-4">
            Why This Gets Board Approval
          </h2>
        </div>
        
        {/* Hero Section with Image and Key Stats */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left side - Image */}
          <div className="relative">
            <div className="relative bg-white p-2 rounded-2xl shadow-2xl">
              <Image
                src="/images/boardroom-zoom.jpg"
                alt="Executive boardroom meeting discussing strategic healthcare benefits decisions"
                width={600}
                height={400}
                className="rounded-xl object-cover w-full h-[300px] lg:h-[400px]"
                priority
              />
            </div>
          </div>
          
          {/* Right side - Key Benefits */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calculator className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Predictable Savings
                </h3>
                <p className="text-gray-700 mb-2 text-lg">
                  Even at 40% workforce participation, a 1,000-person company can save{' '}
                  <span className="font-bold text-green-600">~$1.5M annually</span>.
                </p>
                <p className="text-gray-700 text-lg">
                  At 60% participation, savings approach{' '}
                  <span className="font-bold text-green-600">$2.3M</span>.
                </p>
              </div>
            </div>
        
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Talent Advantage
                </h3>
                <p className="text-gray-700 mb-2 text-lg">
                  Financially savvy employees feel valued, not trapped.
                </p>
                <p className="text-gray-700 text-lg">
                  Retention and recruiting both improve.
                </p>
              </div>
            </div>
        
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Strategic Leadership
                </h3>
                <p className="text-gray-700 text-lg">
                  Early adoption signals innovation while competitors wrestle with rising costs.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Line Section */}
        <div className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-2xl p-8 shadow-lg border border-primary/10 text-center relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Bottom line:
            </h3>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Stop overpaying for employees who don't use expensive coverage.{' '}
              <span className="font-bold">Keep insurance where it's needed.</span>{' '}
              <span className="font-bold text-primary">Add smarter options where it's not.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
