import { AlertTriangle, DollarSign, TrendingDown } from 'lucide-react'

export function ProblemSection() {
  return (
    <section className="py-12 lg:py-16 bg-gray-50 relative overflow-hidden">
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        {/* Primary gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5"></div>
        
        {/* Healthcare-themed dot pattern */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.15) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        ></div>
        
        {/* Subtle cross pattern for healthcare theme */}
        <div 
          className="absolute inset-0 opacity-40" 
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 15px, rgba(99, 102, 241, 0.03) 16px, rgba(99, 102, 241, 0.03) 17px, transparent 18px),
              linear-gradient(0deg, transparent 15px, rgba(99, 102, 241, 0.03) 16px, rgba(99, 102, 241, 0.03) 17px, transparent 18px)
            `,
            backgroundSize: '64px 64px'
          }}
        ></div>
        
        {/* Floating geometric elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-indigo-500/8 to-primary/8 rounded-full blur-lg"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl mb-6 max-w-4xl mx-auto leading-tight" style={{textWrap: 'balance'}}>
            Why You're Overpaying Today
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed" style={{textWrap: 'balance'}}>
            You're spending thousands per employee every year whether they use their benefits or not.
          </p>
        </div>
        
        <div className="mb-8">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center mb-8 leading-relaxed" style={{textWrap: 'balance'}}>
            For a large portion of your workforce, it's an expensive benefit they barely touch. 
            These low utilization employees:
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 text-center relative overflow-hidden group hover:bg-white/95 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-rose-600"></div>
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-red-500/10 to-rose-600/10 rounded-full blur-xl"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-red-50 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg">
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Rarely hit their deductible
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Most healthy employees never reach their high deductible, paying full price for all care
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 text-center relative overflow-hidden group hover:bg-white/95 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-600"></div>
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-amber-600/10 rounded-full blur-xl"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg">
                <DollarSign className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Could often pay less for care out-of-pocket with cash
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Cash prices are often 40-60% lower than insurance-negotiated rates for routine services
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 text-center relative overflow-hidden group hover:bg-white/95 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-amber-500"></div>
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-full blur-xl"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Cost you thousands for coverage they don't fully use
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                You're paying premium rates for employees who use minimal healthcare services
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/30 max-w-3xl mx-auto text-center relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-br from-primary/8 to-blue-500/8 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-indigo-500/8 to-primary/8 rounded-full blur-xl"></div>
          <p className="text-xl font-semibold text-gray-900 relative z-10 leading-relaxed" style={{textWrap: 'balance'}}>
            It's not wasteful employees. It's an outdated plan design.
          </p>
        </div>
      </div>
    </section>
  )
}
