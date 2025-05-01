import { type PricingPlan } from '@/types/provider-plans'
import { calculatePlanScore } from './scoring'
import { type QuestionnaireResponse } from '@/types/questionnaire'
import { getPlanCost as getPlanCostUtil } from '@/lib/utils/plan-costs'

/**
 * Plan Recommendation Engine
 * 
 * This module handles generating recommendations based on user questionnaire responses.
 * 
 * IMPORTANT NOTES:
 * - Plans with IDs starting with '_deprecated_' are filtered out from recommendations
 *   to prevent duplicates in the UI while maintaining backward compatibility
 * - The recommendations are ordered by score, with the highest scoring plan first
 * - Scores are transformed for display purposes (see step 3 in getRecommendations)
 */

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
  questionnaire?: QuestionnaireResponse // Added to store questionnaire data with each plan
}

export async function getRecommendations(
  plans: PricingPlan[],
  questionnaire: QuestionnaireResponse
): Promise<PlanRecommendation[]> {
  console.log('getRecommendations called from lib/recommendation/recommendations.ts');
  console.log('Questionnaire:', JSON.stringify(questionnaire, null, 2));
  
  // Filter out deprecated plans (those with IDs starting with "_deprecated_")
  const activePlans = plans.filter(plan => !plan.id.startsWith('_deprecated_'));
  console.log(`Filtered out ${plans.length - activePlans.length} deprecated plans`);
  
  // Filter out specific plans based on preventative services preference
  let filteredPlans = activePlans;
  
  // Check if Sedera Access+ is in active plans
  const sederaAccessPlan = activePlans.find(plan => 
    plan.id.toLowerCase() === 'sedera-access+' && 
    !plan.planName.toLowerCase().includes('dpc') && 
    !plan.planName.toLowerCase().includes('vpc')
  );
  console.log('Is Sedera Access+ in active plans?', !!sederaAccessPlan);
  if (sederaAccessPlan) {
    console.log('Sedera Access+ plan details:', {
      id: sederaAccessPlan.id,
      planName: sederaAccessPlan.planName,
      providerName: sederaAccessPlan.providerName
    });
  } else {
    console.log('No Sedera Access+ plan found in active plans. Note: sedera-access-plus has been removed from the codebase as it was a duplicate.');
  }
  
  if (questionnaire.preventative_services === 'yes') {
    // Filter out Zion Essential and Sedera Access+ +DPC/VPC plans when user wants preventative services
    // The regular Sedera Access+ plan should not be filtered out since it provides preventative services
    filteredPlans = activePlans.filter(plan => {
      const isZionEssential = plan.id.toLowerCase().includes('zion') && 
                              plan.id.toLowerCase().includes('essential');
      
      // Check specifically for the Sedera Access+ +DPC/VPC plan
      // This condition checks for both 'dpc' and 'vpc' in the plan name to identify the DPC/VPC variant
      const isSederaDpcVpc = plan.id.toLowerCase().includes('sedera') && 
                            plan.id.toLowerCase().includes('access+') &&
                            (plan.planName.toLowerCase().includes('dpc') || 
                             plan.planName.toLowerCase().includes('vpc'));
      
      // Log detailed info about Sedera Access+ plans
      if (plan.id.toLowerCase().includes('sedera') && plan.id.toLowerCase().includes('access+')) {
        console.log(`Filtering decision for ${plan.id} (${plan.planName}):`, {
          isZionEssential,
          isSederaDpcVpc,
          keepPlan: !(isZionEssential || isSederaDpcVpc)
        });
      }
      
      // Return true to keep plans that are NOT Zion Essential or Sedera Access+ +DPC/VPC
      return !(isZionEssential || isSederaDpcVpc);
    });
    
    console.log(`Filtered out ${activePlans.length - filteredPlans.length} plans that don't include preventative services`);
    if (activePlans.length !== filteredPlans.length) {
      console.log('Filtered plans:', activePlans.filter(p => !filteredPlans.includes(p)).map(p => p.id));
    }
  }
  
  // Check if Sedera Access+ passed the preventative services filter
  const sederaAccessAfterFilter = filteredPlans.find(plan => 
    plan.id.toLowerCase() === 'sedera-access+' && 
    !plan.planName.toLowerCase().includes('dpc') && 
    !plan.planName.toLowerCase().includes('vpc')
  );
  console.log('Is Sedera Access+ plan in filtered plans?', !!sederaAccessAfterFilter);

  // Add a log before calculating scores
  console.log('Plans before calculating scores:', filteredPlans.map(p => ({ id: p.id, name: p.planName })));

  // Additional debugging for all Sedera plans
  const allSederaPlans = filteredPlans.filter(plan => plan.id.toLowerCase().includes('sedera'));
  console.log('All Sedera plans before scoring:', allSederaPlans.map(p => ({ 
    id: p.id, 
    name: p.planName,
    hasPlanMatrix: Array.isArray(p.planMatrix) && p.planMatrix.length > 0
  })));
  
  // Log all available plans before scoring
  console.log(`Total plans before scoring: ${filteredPlans.length}`);
  console.log('Available plans:', filteredPlans.map(p => p.id));
  
  // Check specifically for Knew Health plans
  const knewHealthPlans = filteredPlans.filter(p => p.id.includes('knew-health'));
  console.log(`Found ${knewHealthPlans.length} Knew Health plans:`, knewHealthPlans.map(p => p.id));
  
  // Check specifically for CrowdHealth plans
  const crowdHealthPlans = filteredPlans.filter(p => p.id.includes('crowdhealth'));
  console.log(`Found ${crowdHealthPlans.length} CrowdHealth plans:`, crowdHealthPlans.map(p => p.id));
  
  // Step 1: Calculate raw scores for all plans using the existing scoring algorithm
  // This determines the actual ranking of plans based on how well they match the user's needs
  const scores = await Promise.all(
    filteredPlans.map(plan => calculatePlanScore(plan, questionnaire))
  );

  // Check scores for Sedera Access+ plan
  const sederaScores = scores.filter(s => 
    s.plan.id.toLowerCase() === 'sedera-access+' && 
    !s.plan.planName.toLowerCase().includes('dpc') && 
    !s.plan.planName.toLowerCase().includes('vpc')
  );
  if (sederaScores.length > 0) {
    console.log('Sedera Access+ scores:', sederaScores.map(s => ({
      id: s.plan.id,
      planName: s.plan.planName,
      score: s.total_score,
      factors: s.factors.map(f => ({ factor: f.factor, score: f.score }))
    })));
  } else {
    console.log('No scores found for Sedera Access+ plan');
  }

  // Log all raw scores for debugging
  console.log('All raw scores before filtering:', scores.map(s => ({
    id: s.plan.id,
    planName: s.plan.planName,
    score: s.total_score
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
      })),
      questionnaire: questionnaire
    }));
  
  // Check if any Sedera Access+ plans were filtered out due to zero scores
  const sederaPlansWithZeroScores = scores.filter(s => 
    s.plan.id.toLowerCase() === 'sedera-access+' && 
    s.total_score <= 0 && 
    !s.plan.planName.toLowerCase().includes('dpc') && 
    !s.plan.planName.toLowerCase().includes('vpc')
  );
  if (sederaPlansWithZeroScores.length > 0) {
    console.log('Found Sedera Access+ plans with zero scores that were filtered out:', 
      sederaPlansWithZeroScores.map(s => ({
        id: s.plan.id, 
        planName: s.plan.planName,
        score: s.total_score,
        factors: s.factors.map(f => ({ factor: f.factor, score: f.score }))
      }))
    );
  }
  
  // Check if Sedera Access+ is in the final recommendations
  const sederaInRecommendations = recommendations.some(r => 
    r.plan.id.toLowerCase() === 'sedera-access+' && 
    !r.plan.planName.toLowerCase().includes('dpc') && 
    !r.plan.planName.toLowerCase().includes('vpc')
  );
  console.log('Is Sedera Access+ in final recommendations?', sederaInRecommendations);
  
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
      ],
      questionnaire: questionnaire
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
  
  // Check for Sedera Access+ plan
  // Add a special debug section to check all Sedera plans in detail
  console.log("\n=== DETAILED SEDERA PLAN DEBUG ===");
  const sederaPlans = activePlans.filter(plan => 
    plan.id.toLowerCase().includes('sedera')
  );
  console.log(`Found ${sederaPlans.length} Sedera plans:`);
  sederaPlans.forEach(plan => {
    console.log(`- Plan ID: ${plan.id}, Plan Name: ${plan.planName}`);
    console.log(`  Matrix entries: ${plan.planMatrix.length}`);
    if (plan.planMatrix.length > 0) {
      console.log(`  First matrix entry: ${plan.planMatrix[0].ageBracket}/${plan.planMatrix[0].householdType}`);
      console.log(`  Cost options: ${plan.planMatrix[0].costs.length}`);
      console.log(`  First cost option: $${plan.planMatrix[0].costs[0].monthlyPremium}/${plan.planMatrix[0].costs[0].initialUnsharedAmount}`);
    } else {
      console.log(`  WARNING: Empty planMatrix - this plan will not be scored properly`);
      
      // Special test: try to find the plan in raw provider-plans.ts data
      console.log(`  Checking if plan exists in provider-plans.ts with correct data...`);
      try {
        // This is a workaround to access the data programmatically - in production we'd structure this better
        const { providerPlans } = require('@/data/provider-plans');
        const rawPlan = providerPlans.find((p: PricingPlan) => p.id.toLowerCase() === plan.id.toLowerCase());
        if (rawPlan) {
          console.log(`  FOUND in provider-plans.ts with ID: ${rawPlan.id}`);
          console.log(`  Has pricing data: ${rawPlan.planMatrix.length > 0 ? 'YES' : 'NO'}`);
          if (rawPlan.planMatrix.length > 0) {
            console.log(`  First price entry: $${rawPlan.planMatrix[0].costs[0].monthlyPremium}/${rawPlan.planMatrix[0].costs[0].initialUnsharedAmount}`);
          }
        } else {
          console.log(`  NOT FOUND in provider-plans.ts - this is a serious data inconsistency`);
        }
      } catch (error: unknown) {
        console.error(`  Error checking provider-plans.ts: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  });
  console.log("=== END SEDERA PLAN DEBUG ===\n");
  
  return recommendations;
} 