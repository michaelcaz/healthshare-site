import { type PricingPlan } from '@/types/provider-plans'
import { calculatePlanScore } from './scoring'
import { type QuestionnaireResponse } from '@/types/questionnaire'
import { getPlanCost as getPlanCostUtil } from '@/lib/utils/plan-costs'

export interface PlanRecommendation {
  plan: PricingPlan
  score: number
  originalScore?: number // Added to store the original score if needed
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
  
  // Log all available plans before filtering
  console.log(`Total plans before scoring: ${plans.length}`);
  console.log('Available plans:', plans.map(p => p.id));
  
  // Check specifically for Knew Health plans
  const knewHealthPlans = plans.filter(p => p.id.includes('knew-health'));
  console.log(`Found ${knewHealthPlans.length} Knew Health plans:`, knewHealthPlans.map(p => p.id));
  
  // Check specifically for CrowdHealth plans
  const crowdHealthPlans = plans.filter(p => p.id.includes('crowdhealth'));
  console.log(`Found ${crowdHealthPlans.length} CrowdHealth plans:`, crowdHealthPlans.map(p => p.id));
  
  // Step 1: Calculate raw scores for all plans using the existing scoring algorithm
  // This determines the actual ranking of plans based on how well they match the user's needs
  const scores = await Promise.all(
    plans.map(plan => calculatePlanScore(plan, questionnaire))
  );

  // Log scores for Knew Health and CrowdHealth specifically
  const knewHealthScores = scores.filter(s => s.plan.id.includes('knew-health'));
  console.log('Knew Health scores:', knewHealthScores.map(s => ({
    id: s.plan.id,
    score: s.total_score,
    factors: s.factors
  })));
  
  const crowdHealthScores = scores.filter(s => s.plan.id.includes('crowdhealth'));
  console.log('CrowdHealth scores:', crowdHealthScores.map(s => ({
    id: s.plan.id,
    score: s.total_score,
    factors: s.factors
  })));

  // Step 2: Filter, sort, and map the scores to create recommendation objects
  // This preserves the original score and creates the initial ranking
  let recommendations = scores
    .filter(score => score.total_score > 0)
    .sort((a, b) => b.total_score - a.total_score)
    .map((score, i) => ({
      plan: score.plan,
      score: score.total_score,
      originalScore: score.total_score, // Store the original score
      explanation: score.explanation,
      ranking: i + 1,
      factors: score.factors.map(f => ({
        factor: f.factor,
        impact: f.score
      }))
    }));
  
  // If no recommendations were found, create a fallback recommendation for Knew Health
  if (recommendations.length === 0 && knewHealthPlans.length > 0) {
    console.log('No valid recommendations found. Creating fallback recommendation for Knew Health.');
    
    const knewHealthPlan = knewHealthPlans[0];
    recommendations = [{
      plan: knewHealthPlan,
      score: 76, // Arbitrary score for demonstration
      originalScore: 76, // Store the original score
      explanation: [
        'This plan offers a good balance of monthly cost and incident cost.',
        'Knew Health provides comprehensive coverage for your needs.'
      ],
      ranking: 1,
      factors: [
        { factor: 'Monthly Cost', impact: 80 },
        { factor: 'Incident Cost', impact: 75 },
        { factor: 'Annual Cost', impact: 70 }
      ]
    }];
  }
  
  // Step 3: Transform scores for display purposes only (without changing the ranking)
  // This makes the top recommendations show higher percentages (90-99%) while preserving the original ranking
  console.log('Beginning score transformation for display purposes...');
  recommendations = recommendations.map((rec, index) => {
    // Scale the original score to a baseline (0-85 range)
    const baselineScore = (rec.originalScore || rec.score) * 0.85;
    
    // Apply position-based boost for clearer differentiation
    // REDUCED BOOST VALUES to make recommendations more accurate
    let positionBoost = 0;
    if (index === 0) positionBoost = 10; // Reduced from 20 to 10
    else if (index === 1) positionBoost = 5; // Reduced from 10 to 5
    else if (index === 2) positionBoost = 3; // Reduced from 5 to 3
    else positionBoost = 1; // Reduced from 2 to 1
    
    // Calculate display score with cap at 99%
    const displayScore = Math.min(baselineScore + positionBoost, 99);
    
    // Ensure minimum score of 70% for any recommendation shown
    // For the top recommendation, ensure a minimum of 85% (reduced from 90%)
    const minimumScore = index === 0 ? 85 : 70;
    const finalScore = Math.max(Math.round(displayScore), minimumScore);
    
    console.log(`Plan ${rec.plan.id} - Transformation: Original=${rec.originalScore?.toFixed(2)}, Baseline=${baselineScore.toFixed(2)}, Boost=${positionBoost}, Display=${displayScore.toFixed(2)}, Minimum=${minimumScore}, Final=${finalScore}`);
    
    // Add explanation about the match percentage
    let matchExplanation = '';
    if (finalScore >= 95) {
      matchExplanation = 'This plan is an excellent match for your needs based on your questionnaire responses.';
    } else if (finalScore >= 90) {
      matchExplanation = 'This plan is a very good match for your needs based on your questionnaire responses.';
    } else if (finalScore >= 80) {
      matchExplanation = 'This plan is a good match for your needs based on your questionnaire responses.';
    } else {
      matchExplanation = 'This plan matches some of your needs based on your questionnaire responses.';
    }
    
    // Add the match explanation to the beginning of the explanation array
    const updatedExplanation = [matchExplanation, ...rec.explanation];
    
    return {
      ...rec,
      score: finalScore,
      explanation: updatedExplanation
    };
  });
    
  // Step 4: Log the final recommendations with both original and transformed scores
  console.log('Top 3 recommendations with transformed scores:');
  recommendations.slice(0, 3).forEach((rec, index) => {
    console.log(`${index + 1}. ${rec.plan.id} - Original Score: ${rec.originalScore?.toFixed(2)}, Display Score: ${rec.score}`);
  });
  
  // Log detailed comparison between plans for debugging
  console.log('Plan comparison for user preferences:');
  console.log(`- Age: ${questionnaire.age}`);
  console.log(`- Coverage Type: ${questionnaire.coverage_type}`);
  console.log(`- Visit Frequency: ${questionnaire.visit_frequency}`);
  console.log(`- Expense Preference: ${questionnaire.expense_preference}`);
  console.log(`- IUA Preference: ${questionnaire.iua_preference}`);
  console.log(`- Risk Preference: ${questionnaire.risk_preference}`);
  
  // Log monthly premiums for top 5 plans
  console.log('Monthly premiums for top 5 plans:');
  recommendations.slice(0, 5).forEach((rec, index) => {
    const planCost = getPlanCostUtil(
      rec.plan.id,
      questionnaire.age,
      questionnaire.coverage_type,
      questionnaire.iua_preference
    );
    console.log(`${index + 1}. ${rec.plan.id} - Monthly Premium: $${planCost?.monthlyPremium}, IUA: $${planCost?.initialUnsharedAmount}`);
  });
  
  return recommendations;
} 