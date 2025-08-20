export function ComparisonTable() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">
            The Numbers Your CFO Cares About
          </h2>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-lg font-semibold text-gray-900">
                    {/* Empty header cell */}
                  </th>
                  <th className="px-6 py-4 text-center text-lg font-semibold text-gray-900">
                    Traditional Insurance
                  </th>
                  <th className="px-6 py-4 text-center text-lg font-semibold text-primary">
                    Healthshare Membership
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6 text-left font-medium text-gray-900">
                    Typical annual cost/employee
                  </td>
                  <td className="px-6 py-6 text-center text-lg text-gray-700">
                    $8,000–$12,000
                  </td>
                  <td className="px-6 py-6 text-center text-lg font-semibold text-primary">
                    $1,000–$5,000
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6 text-left font-medium text-gray-900">
                    Utilization
                  </td>
                  <td className="px-6 py-6 text-center text-lg text-gray-700">
                    Deductible rarely met
                  </td>
                  <td className="px-6 py-6 text-center text-lg font-semibold text-primary">
                    Cost-sharing only for major medical
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6 text-left font-medium text-gray-900">
                    Your savings potential
                  </td>
                  <td className="px-6 py-6 text-center text-lg text-gray-700">
                    —
                  </td>
                  <td className="px-6 py-6 text-center text-lg font-bold text-green-600">
                    $3,000–$11,000 per participating employee annually
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-12 bg-white rounded-xl p-8 shadow-md">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            What your healthiest employees get:
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-700">
                Cash-pay rates for routine care (40–60% less than insurance rates)
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-700">
                Full reimbursement for qualifying major expenses
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-700">
                No network restrictions
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-gray-700">
                Thousands back in their pocket each year
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
