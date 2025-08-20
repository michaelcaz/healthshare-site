import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative bg-white pt-20 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl mb-6">
            How Innovative Employers Are Cutting Healthcare Spend by{' '}
            <span className="text-primary">Up to 40%</span>{' '}
            Without Cutting Benefits
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your employees aren't one-size-fits-all. Your healthcare strategy shouldn't be either.
          </p>
          
          <div className="mb-12">
            <p className="text-lg text-gray-700 mb-6">
              Sharewize helps you layer smarter options into your benefits package:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-gray-50 rounded-xl p-6 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Traditional insurance
                </h3>
                <p className="text-gray-600">
                  for employees with ongoing or complex medical needs
                </p>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 text-left border border-primary/20">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Healthshare memberships
                </h3>
                <p className="text-gray-600">
                  for employees who rarely use care but still want protection and flexibility
                </p>
              </div>
            </div>
            
            <p className="text-lg font-medium text-gray-700 mb-8">
              Serving teams of 50 and up.
            </p>
          </div>
          
          <Button 
            size="lg" 
            className="bg-primary text-white hover:bg-primary-dark px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            See If This Fits Your Workforce
          </Button>
        </div>
      </div>
    </section>
  )
}
