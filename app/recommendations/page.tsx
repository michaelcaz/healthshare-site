import { SelectedPlansProvider } from '@/components/recommendations/SelectedPlansContext'
import { RecommendationsLayout } from '@/components/recommendations/RecommendationsLayout'
import { getQuestionnaireResponse } from '@/lib/questionnaire'
import { getRecommendations } from '@/lib/recommendation/recommendations'
import { providerPlans } from '@/data/provider-plans'

export default async function RecommendationsPage() {
  const questionnaire = await getQuestionnaireResponse();
  const recommendations = await getRecommendations(providerPlans, questionnaire);

  if (!recommendations || recommendations.length === 0) {
    // You can either redirect to an error page or show a message
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900">
          No matching plans found
        </h2>
        <p className="mt-2 text-gray-600">
          We couldn't find any plans matching your criteria. Please try adjusting your preferences.
        </p>
      </div>
    );
  }

  return (
    <SelectedPlansProvider>
      <RecommendationsLayout 
        recommendations={recommendations}
        questionnaire={questionnaire}
      />
    </SelectedPlansProvider>
  )
} 