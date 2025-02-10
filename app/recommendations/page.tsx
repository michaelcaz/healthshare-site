import { SelectedPlansProvider } from '@/components/recommendations/SelectedPlansContext'
import { RecommendationsLayout } from '@/components/recommendations/RecommendationsLayout'
import { getQuestionnaireResponse } from '@/lib/questionnaire'
import { getRecommendations } from '@/lib/recommendation/recommendations'
import { samplePlans } from '@/data/sample-plans'
import { QuestionnaireResponse } from '@/lib/types'

export default async function RecommendationsPage() {
  const questionnaire = await getQuestionnaireResponse();

  const recommendations = await getRecommendations(samplePlans, questionnaire);

  return (
    <SelectedPlansProvider>
      <RecommendationsLayout 
        recommendations={recommendations}
        questionnaire={questionnaire}
      />
    </SelectedPlansProvider>
  )
} 