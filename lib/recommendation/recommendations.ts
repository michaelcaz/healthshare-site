import { type PricingPlan } from '@/types/provider-plans'
import { calculatePlanScore } from './scoring'
import { type QuestionnaireResponse } from '@/types/questionnaire'

export interface PlanRecommendation {
  plan: PricingPlan
  score: number
  explanation: string[]
  ranking: number
  factors: Array<{
    factor: string
    impact: number
  }>
}

export async function getRecommendations(
  plans: PricingPlan[],
  questionnaire: QuestionnaireResponse
): Promise<PlanRecommendation[]> {
  console.log('getRecommendations called from lib/recommendation/recommendations.ts');
  console.log('Questionnaire:', JSON.stringify(questionnaire, null, 2));
  
  const scores = await Promise.all(
    plans.map(plan => calculatePlanScore(plan, questionnaire))
  );

  const recommendations = scores
    .filter(score => score.total_score > 0)
    .sort((a, b) => b.total_score - a.total_score)
    .map((score, i) => ({
      plan: score.plan,
      score: score.total_score,
      explanation: score.explanation,
      ranking: i + 1,
      factors: score.factors.map(f => ({
        factor: f.factor,
        impact: f.score
      }))
    }));
    
  console.log('Top 3 recommendations:');
  recommendations.slice(0, 3).forEach((rec, index) => {
    console.log(`${index + 1}. ${rec.plan.id} - Score: ${rec.score.toFixed(2)}`);
  });
  
  return recommendations;
} 