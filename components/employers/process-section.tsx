import { MessageCircle, Search, HelpCircle, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ProcessSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl mb-6">
            Clarity First. Let's See If This Is a Fit.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Before we talk about solutions, we start with a call. Not a pitch. Not a pre-packaged playbook. Just questions.
          </p>
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl mb-8 text-center">
            We want to understand:
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                How are you structuring benefits today?
              </h4>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                What's working well?
              </h4>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Where are the pressure points?
              </h4>
              <p className="text-sm text-gray-600">
                (Cost? Coverage gaps? Employee dissatisfaction? Recruiting challenges?)
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                The goal is clarity
              </h4>
            </div>
          </div>
        </div>
        
        <div className="bg-primary/5 rounded-2xl p-8 text-center border border-primary/20 mb-12">
          <p className="text-lg text-gray-700 max-w-4xl mx-auto">
            By the end of our conversation, you'll know exactly where the inefficiencies are 
            in your current approach and whether we can actually help.
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
