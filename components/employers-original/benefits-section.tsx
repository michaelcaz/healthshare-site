import { Target, Users2, Lightbulb } from 'lucide-react'

export function BenefitsSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl mb-6">
            The game-changer for enterprises:
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            You don't replace insurance. You simply add an option.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users2 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Employees with chronic conditions
            </h3>
            <p className="text-gray-700">
              keep their preferred coverage.
            </p>
          </div>
          
          <div className="bg-primary/5 rounded-xl p-8 text-center border border-primary/20">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Healthy employees
            </h3>
            <p className="text-gray-700">
              can pick a smarter financial choice.
            </p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-8 text-center border border-green-200">
            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lightbulb className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              You reduce total benefits spend
            </h3>
            <p className="text-gray-700">
              without reducing care quality.
            </p>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
          <p className="text-lg text-gray-700 mb-4">
            This isn't experimental anymore. Large employers are already running innovative mixed-model benefits.
          </p>
          <p className="text-xl font-bold text-gray-900">
            The question isn't if this shift will happen. It's whether you'll lead it or follow it.
          </p>
        </div>
      </div>
    </section>
  )
}
