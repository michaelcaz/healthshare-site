import { Button } from '@/components/ui/button'
import { Scissors, TrendingUp, Lightbulb } from 'lucide-react'

export function FinalCTASection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl mb-6">
            Let's See If This Is a Fit for Your Organization
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            If you're looking to:
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-8 text-center shadow-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Scissors className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Cut costs without cutting corners
            </h3>
          </div>
          
          <div className="bg-white rounded-xl p-8 text-center shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Improve retention with smarter options
            </h3>
          </div>
          
          <div className="bg-white rounded-xl p-8 text-center shadow-md">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Lead on benefits innovation instead of chasing it
            </h3>
          </div>
        </div>
        
        <div className="text-center mb-12">
          <p className="text-xl text-gray-700 mb-2">
            …then let's talk.
          </p>
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-primary text-white hover:bg-primary-dark px-12 py-4 text-xl font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            See If This Fits Your Workforce
          </Button>
        </div>
      </div>
    </section>
  )
}
