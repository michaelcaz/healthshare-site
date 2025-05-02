import { type PricingPlan } from '@/types/provider-plans'
import { calculatePlanScore } from './scoring'
import { type QuestionnaireResponse } from '@/types/questionnaire'
import { getPlanCost as getPlanCostUtil } from '@/lib/utils/plan-costs'
import { debugPlanSelection, debugPlanCosts } from './debug'

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
  
  // Log questionnaire data for debugging
  console.log(`Getting recommendations for questionnaire:`, JSON.stringify(questionnaire, null, 2));
  
  // Filter out deprecated plans
  const activePlans = plans.filter(plan => !plan.id.startsWith('_deprecated_'));
  console.log(`Starting with ${activePlans.length} active plans after filtering out deprecated plans`);
  
  // New: Add special logging for the preventative_services preference
  console.log(`\n========== PREVENTATIVE SERVICES PREFERENCE: ${questionnaire.preventative_services} ==========\n`);

  // Track plans for debugging
  let filteredPlans = [...activePlans];
  
  // Check specifically for Sedera plans
  // Improved matching for Sedera Access+ plan
  const sederaAccessPlan = activePlans.find(plan => 
    plan.id.toLowerCase() === 'sedera-access+' && 
    (!plan.planName.toLowerCase().includes('dpc') && !plan.planName.toLowerCase().includes('vpc'))
  );
  
  // Improved matching for Sedera Access+ +DPC/VPC plan
  const sederaDpcVpcPlan = activePlans.find(plan => 
    plan.id.toLowerCase() === 'sedera-access+-+dpc/vpc' || 
    (plan.id.toLowerCase().includes('sedera') && 
     plan.id.toLowerCase().includes('access+') && 
     (plan.planName.toLowerCase().includes('dpc') || plan.planName.toLowerCase().includes('vpc')))
  );
  
  // Enhanced debugging for both Sedera plans
  console.log('Checking for Sedera plans in active plans:');
  console.log('- Sedera Access+ found:', !!sederaAccessPlan);
  console.log('- Sedera Access+ +DPC/VPC found:', !!sederaDpcVpcPlan);
  
  if (sederaAccessPlan) {
    console.log('Sedera Access+ plan details:', {
      id: sederaAccessPlan.id,
      planName: sederaAccessPlan.planName,
      providerName: sederaAccessPlan.providerName
    });
  } else {
    console.log('No Sedera Access+ plan found in active plans. Note: sedera-access-plus has been removed from the codebase as it was a duplicate.');
  }
  
  if (sederaDpcVpcPlan) {
    console.log('Sedera Access+ +DPC/VPC plan details:', {
      id: sederaDpcVpcPlan.id,
      planName: sederaDpcVpcPlan.planName,
      providerName: sederaDpcVpcPlan.providerName
    });
  } else {
    console.log('No Sedera Access+ +DPC/VPC plan found in active plans.');
  }
  
  // Use our new debug utility to check the specific Sedera plans
  if (sederaAccessPlan) {
    debugPlanSelection(sederaAccessPlan.id, activePlans, filteredPlans, questionnaire);
    debugPlanCosts(sederaAccessPlan, questionnaire.age, questionnaire.coverage_type, questionnaire.iua_preference);
  }
  
  if (sederaDpcVpcPlan) {
    debugPlanSelection(sederaDpcVpcPlan.id, activePlans, filteredPlans, questionnaire);
    debugPlanCosts(sederaDpcVpcPlan, questionnaire.age, questionnaire.coverage_type, questionnaire.iua_preference);
  }
  
  // Filter out specific plans based on preventative services preference
  if (questionnaire.preventative_services === 'yes') {
    // Filter out Zion Essential and Sedera Access+ +DPC/VPC plans when user wants preventative services
    // The regular Sedera Access+ plan should not be filtered out since it provides preventative services
    filteredPlans = activePlans.filter(plan => {
      const isZionEssential = plan.id.toLowerCase().includes('zion') && 
                              plan.id.toLowerCase().includes('essential');
      
      // Improved check for Sedera Access+ +DPC/VPC plan
      // This condition checks for both 'dpc' and 'vpc' in the plan name or ID to identify the DPC/VPC variant
      const isSederaDpcVpc = 
        plan.id.toLowerCase() === 'sedera-access+-+dpc/vpc' ||
        (plan.id.toLowerCase().includes('sedera') && 
         plan.id.toLowerCase().includes('access+') &&
         (plan.id.toLowerCase().includes('dpc') || 
          plan.id.toLowerCase().includes('vpc') || 
          plan.planName.toLowerCase().includes('dpc') || 
          plan.planName.toLowerCase().includes('vpc')));
      
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
      console.log('Filtered plans:', activePlans.filter(p => !filteredPlans.includes(p)).map(p => ({ id: p.id, name: p.planName })));
    }
  } else {
    // Enhanced: When preventative_services is 'no', specifically check if we're keeping Sedera DPC/VPC
    console.log('\n=== PREVENTATIVE SERVICES: NO - CHECKING SEDERA DPC/VPC ===');
    // No filtering needed for 'no' - all plans should remain
    console.log('No plans filtered out - all plans should be considered when preventative_services is "no"');
    
    // Double-check that Sedera DPC/VPC is still in the filteredPlans
    const dpcVpcInFilteredPlans = filteredPlans.some(plan => 
      plan.id.toLowerCase() === 'sedera-access+-+dpc/vpc' || 
      (plan.id.toLowerCase().includes('sedera') && 
       plan.id.toLowerCase().includes('access+') && 
       (plan.planName.toLowerCase().includes('dpc') || plan.planName.toLowerCase().includes('vpc')))
    );
    console.log('Is Sedera Access+ +DPC/VPC in filtered plans?', dpcVpcInFilteredPlans);
    console.log('=== END PREVENTATIVE SERVICES: NO CHECK ===\n');
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
  
  // Enhanced: Check for Sedera Access+ +DPC/VPC in recommendations and ensure it has a minimum score
  if (questionnaire.preventative_services === 'no') {
    // Find the Sedera Access+ +DPC/VPC plan if present
    const sederaDpcVpcIndex = recommendations.findIndex(rec => 
      rec.plan.id.toLowerCase() === 'sedera-access+-+dpc/vpc' || 
      (rec.plan.id.toLowerCase().includes('sedera') && 
       rec.plan.id.toLowerCase().includes('access+') && 
       (rec.plan.planName.toLowerCase().includes('dpc') || 
        rec.plan.planName.toLowerCase().includes('vpc')))
    );
    
    if (sederaDpcVpcIndex >= 0) {
      console.log(`Found Sedera Access+ +DPC/VPC plan at position ${sederaDpcVpcIndex + 1} with score ${recommendations[sederaDpcVpcIndex].score}`);
      
      // Ensure it has a minimum score to appear properly
      if (recommendations[sederaDpcVpcIndex].score < 20) {
        console.log(`Boosting Sedera Access+ +DPC/VPC plan score from ${recommendations[sederaDpcVpcIndex].score} to 35`);
        recommendations[sederaDpcVpcIndex].score = 35;
        recommendations[sederaDpcVpcIndex].originalScore = 35;
      }
    } else {
      console.log(`Sedera Access+ +DPC/VPC plan not found in recommendations - checking if it can be added from scores`);
      
      // Find it in all scores to see if it had a zero score
      const sederaDpcVpcScore = scores.find(s => 
        s.plan.id.toLowerCase() === 'sedera-access+-+dpc/vpc' || 
        (s.plan.id.toLowerCase().includes('sedera') && 
         s.plan.id.toLowerCase().includes('access+') && 
         (s.plan.planName.toLowerCase().includes('dpc') || 
          s.plan.planName.toLowerCase().includes('vpc')))
      );
      
      if (sederaDpcVpcScore) {
        console.log(`Found Sedera Access+ +DPC/VPC in scores with score ${sederaDpcVpcScore.total_score}`);
        
        // Only add it if the user doesn't need preventative services
        if (questionnaire.preventative_services === 'no') {
          // Add it with a minimal score
          console.log(`Adding Sedera Access+ +DPC/VPC plan to recommendations with minimum score`);
          recommendations.push({
            plan: sederaDpcVpcScore.plan,
            score: 35,
            originalScore: 35,
            explanation: [
              'This plan combines Sedera health sharing with Direct Primary Care benefits.',
              'Direct Primary Care provides unlimited access to a dedicated doctor with no per-visit charges.',
              'Sedera health sharing covers medical needs beyond primary care.'
            ],
            ranking: recommendations.length + 1,
            factors: [
              { factor: 'DPC Value', impact: 60 },
              { factor: 'Monthly Cost', impact: 45 },
              { factor: 'Annual Cost', impact: 50 }
            ],
            questionnaire: questionnaire
          });
        }
      }
    }
  }
  
  // Re-sort the recommendations to ensure proper order
  recommendations.sort((a, b) => b.score - a.score);
  
  // Apply position-based boost for clearer differentiation
  recommendations = recommendations.map((rec, index) => {
    // Scale the original score to a baseline (0-92 range)
    // Increase the baseline multiplier to start from a higher base value
    const baselineScore = (rec.originalScore || rec.score) * 0.92; // Increased from 0.85 to 0.92
    
    // Apply position-based boost for clearer differentiation
    // Use a more gradual scaling for position boosts
    let positionBoost = 0;
    if (index === 0) positionBoost = 15; // Top recommendation gets a significant boost
    else if (index === 1) positionBoost = 10; // Second recommendation gets a strong boost
    else if (index === 2) positionBoost = 7; // Third recommendation gets a medium boost
    else positionBoost = Math.max(4, 12 - (index * 2)); // Gradually decreasing boost
    
    // Calculate display score with cap at 99%
    const displayScore = Math.min(baselineScore + positionBoost, 99);
    
    // Create a sliding scale for minimum scores
    // This ensures higher-ranked plans always have higher scores
    // while maintaining the 80% minimum
    let minimumScore;
    if (index === 0) minimumScore = 90; // Top plan: minimum 90%
    else if (index === 1) minimumScore = 86; // Second plan: minimum 86%
    else if (index === 2) minimumScore = 83; // Third plan: minimum 83%
    else if (index === 3) minimumScore = 82; // Fourth plan: minimum 82%
    else minimumScore = 80; // All others: minimum 80%
    
    const finalScore = Math.max(Math.round(displayScore), minimumScore);
    
    console.log(`Plan ${rec.plan.id} - Transformation: Original=${rec.originalScore?.toFixed(2)}, Baseline=${baselineScore.toFixed(2)}, Boost=${positionBoost}, Display=${displayScore.toFixed(2)}, Minimum=${minimumScore}, Final=${finalScore}`);
    
    // Add explanation about the match percentage
    let matchExplanation = '';
    if (finalScore >= 95) {
      matchExplanation = 'This plan is an excellent match for your needs based on your questionnaire responses.';
    } else if (finalScore >= 90) {
      matchExplanation = 'This plan is a very good match for your needs based on your questionnaire responses.';
    } else if (finalScore >= 85) {
      matchExplanation = 'This plan is a strong match for your needs based on your questionnaire responses.';
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
  
  // Special log for tracking Sedera ACCESS+ throughout the recommendation process
  console.log("\n=== TRACKING SEDERA ACCESS+ DETAILS ===");
  // 1. Check if it's in the active plans
  console.log("1. Found in active plans:", !!sederaAccessPlan);
  if (sederaAccessPlan) {
    console.log("Details:", {
      id: sederaAccessPlan.id,
      planName: sederaAccessPlan.planName,
      hasPlanMatrix: sederaAccessPlan.planMatrix.length > 0
    });
  }
  
  // 2. Check if it passed the preventative services filter
  const sederaAccessFilteredTracking = filteredPlans.find(plan => 
    plan.id.toLowerCase() === 'sedera-access+');
  console.log("2. Passed preventative services filter:", !!sederaAccessFilteredTracking);
  
  // 3. Check its score
  const sederaScoreTracking = scores.find(s => 
    s.plan.id.toLowerCase() === 'sedera-access+');
  console.log("3. Score information:", sederaScoreTracking ? {
    totalScore: sederaScoreTracking.total_score,
    factors: sederaScoreTracking.factors.map(f => ({ factor: f.factor, score: f.score }))
  } : "No score found");
  
  // 4. Check its position in recommendations
  const sederaRecommendationIndex = recommendations.findIndex(r => 
    r.plan.id.toLowerCase() === 'sedera-access+');
  console.log("4. Position in recommendations:", 
    sederaRecommendationIndex >= 0 ? sederaRecommendationIndex + 1 : "Not in recommendations");
  
  // 5. If it's not in recommendations but has a score, explain why
  if (sederaScoreTracking && sederaRecommendationIndex < 0) {
    console.log("5. Reason for exclusion:", 
      sederaScoreTracking.total_score <= 0 ? 
        "Score is zero or negative" : 
        "Unknown reason - possibly filtered in a later step");
  }
  
  // 6. Log all scores for comparison
  console.log("6. All plan scores for comparison:");
  scores.sort((a, b) => b.total_score - a.total_score).forEach(s => {
    console.log(`- ${s.plan.id}: ${s.total_score.toFixed(2)}`);
  });
  console.log("=== END TRACKING SEDERA ACCESS+ ===\n");
  
  // Add similar tracking for Sedera ACCESS+ +DPC/VPC plan
  console.log("\n=== TRACKING SEDERA ACCESS+ +DPC/VPC DETAILS ===");
  // 1. Check if it's in the active plans
  const sederaDpcVpcPlanTracking = activePlans.find(plan => 
    plan.id.toLowerCase() === 'sedera-access+-+dpc/vpc' || 
    (plan.id.toLowerCase().includes('sedera') && 
     plan.id.toLowerCase().includes('access+') && 
     (plan.planName.toLowerCase().includes('dpc') || plan.planName.toLowerCase().includes('vpc')))
  );
  
  console.log("1. Found in active plans:", !!sederaDpcVpcPlanTracking);
  if (sederaDpcVpcPlanTracking) {
    console.log("Details:", {
      id: sederaDpcVpcPlanTracking.id,
      planName: sederaDpcVpcPlanTracking.planName,
      hasPlanMatrix: sederaDpcVpcPlanTracking.planMatrix.length > 0
    });
  } else {
    console.log("WARNING: No Sedera ACCESS+ +DPC/VPC plan found in active plans. This is likely the root cause of the issue.");
  }
  
  // 2. Check if it's in filtered plans (it should be there when preventative_services = 'no')
  const sederaDpcVpcFilteredTracking = filteredPlans.find(plan => 
    plan.id.toLowerCase() === 'sedera-access+-+dpc/vpc' || 
    (plan.id.toLowerCase().includes('sedera') && 
     plan.id.toLowerCase().includes('access+') && 
     (plan.planName.toLowerCase().includes('dpc') || plan.planName.toLowerCase().includes('vpc')))
  );
  console.log("2. In filtered plans:", !!sederaDpcVpcFilteredTracking);
  console.log("Preventative services preference:", questionnaire.preventative_services);
  
  // 3. Check its score
  const sederaDpcVpcScoreTracking = scores.find(s => 
    s.plan.id.toLowerCase() === 'sedera-access+-+dpc/vpc' || 
    (s.plan.id.toLowerCase().includes('sedera') && 
     s.plan.id.toLowerCase().includes('access+') && 
     (s.plan.planName.toLowerCase().includes('dpc') || s.plan.planName.toLowerCase().includes('vpc')))
  );
  console.log("3. Score information:", sederaDpcVpcScoreTracking ? {
    id: sederaDpcVpcScoreTracking.plan.id,
    planName: sederaDpcVpcScoreTracking.plan.planName,
    totalScore: sederaDpcVpcScoreTracking.total_score,
    factors: sederaDpcVpcScoreTracking.factors.map(f => ({ factor: f.factor, score: f.score }))
  } : "No score found");
  
  // 4. Check its position in recommendations
  const sederaDpcVpcRecommendationIndex = recommendations.findIndex(r => 
    r.plan.id.toLowerCase() === 'sedera-access+-+dpc/vpc' || 
    (r.plan.id.toLowerCase().includes('sedera') && 
     r.plan.id.toLowerCase().includes('access+') && 
     (r.plan.planName.toLowerCase().includes('dpc') || r.plan.planName.toLowerCase().includes('vpc')))
  );
  console.log("4. Position in recommendations:", 
    sederaDpcVpcRecommendationIndex >= 0 ? sederaDpcVpcRecommendationIndex + 1 : "Not in recommendations");
  
  // 5. If it's not in recommendations but has a score, explain why
  if (sederaDpcVpcScoreTracking && sederaDpcVpcRecommendationIndex < 0) {
    console.log("5. Reason for exclusion:", 
      sederaDpcVpcScoreTracking.total_score <= 0 ? 
        "Score is zero or negative" : 
        "Unknown reason - possibly filtered in a later step");
  }
  console.log("=== END TRACKING SEDERA ACCESS+ +DPC/VPC ===\n");
  
  return recommendations;
} 