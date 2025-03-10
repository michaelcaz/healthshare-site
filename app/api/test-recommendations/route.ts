import { NextResponse } from 'next/server';
import { providerPlans } from '@/data/provider-plans';
import { getRecommendations } from '@/lib/recommendation/recommendations';
import { getPlanCost } from '@/lib/utils/plan-costs';
import { getAgeBracket, isAgeInBracket } from '@/lib/plan-matching/age-brackets';
import { type QuestionnaireResponse } from '@/types/questionnaire';
import { type CoverageType } from '@/types/provider-plans';

export async function GET() {
  // Create a test questionnaire response
  const questionnaire: QuestionnaireResponse = {
    age: 34,
    coverage_type: 'family' as CoverageType,
    iua_preference: '5000',
    expense_preference: 'lower_monthly',
    visit_frequency: 'just_checkups',
    financial_capacity: '5000',
    risk_preference: 'higher_risk',
    pregnancy: 'false',
    pre_existing: 'false',
    zip_code: '12345'
  };

  // Debug: Log detailed information about Zion plans
  console.log('Detailed analysis of Zion plans for test user:');
  console.log(`- Age: ${questionnaire.age}`);
  console.log(`- Coverage type: ${questionnaire.coverage_type}`);
  
  // Find Zion plans
  const zionPlans = providerPlans.filter(p => p.id.includes('zion'));
  console.log(`Found ${zionPlans.length} Zion plans`);
  
  // Check age brackets for each Zion plan
  zionPlans.forEach(plan => {
    console.log(`\nAnalyzing plan: ${plan.id}`);
    const ageBracket = getAgeBracket(questionnaire.age, plan.ageRules);
    console.log(`- Age bracket for age ${questionnaire.age}: ${ageBracket}`);
    
    // Check if plan has matrices for this age bracket and coverage type
    const matchingMatrices = plan.planMatrix.filter(matrix => 
      matrix.ageBracket === ageBracket && 
      (matrix.householdType === 'Member & Family' || matrix.householdType.includes('Family'))
    );
    
    console.log(`- Found ${matchingMatrices.length} matching matrices for family coverage`);
    
    // Log all available matrices for this plan
    console.log(`- All available matrices for plan ${plan.id}:`);
    plan.planMatrix.forEach((matrix, index) => {
      console.log(`  Matrix ${index + 1}: ${matrix.ageBracket}/${matrix.householdType} with ${matrix.costs.length} cost options`);
    });
    
    // Check if any matrices match our age
    const ageMatchingMatrices = plan.planMatrix.filter(matrix => 
      isAgeInBracket(questionnaire.age, matrix.ageBracket)
    );
    console.log(`- Matrices matching age ${questionnaire.age} regardless of coverage type: ${ageMatchingMatrices.length}`);
    
    // Get plan cost
    const planCost = getPlanCost(plan.id, questionnaire.age, questionnaire.coverage_type, questionnaire.iua_preference);
    if (planCost) {
      console.log(`- Plan cost found: $${planCost.monthlyPremium}/month with $${planCost.initialUnsharedAmount} IUA`);
    } else {
      console.log(`- No valid cost found for plan ${plan.id}`);
    }
  });

  // Get recommendations
  const recommendations = await getRecommendations(providerPlans, questionnaire);
  
  // Find positions of specific plans
  const zionDirectPosition = recommendations.findIndex(rec => rec.plan.id === 'zion-healthshare-direct-membership');
  const zionEssentialPosition = recommendations.findIndex(rec => rec.plan.id === 'zion-healthshare-essential-membership');
  const sederaDpcPosition = recommendations.findIndex(rec => rec.plan.id.includes('sedera') && rec.plan.id.includes('dpc'));
  
  // Get all Zion plans for comparison
  const allZionPlans = zionPlans.map(plan => {
    const cost = getPlanCost(plan.id, questionnaire.age, questionnaire.coverage_type, questionnaire.iua_preference);
    return {
      id: plan.id,
      premium: cost?.monthlyPremium || 0,
      iua: cost?.initialUnsharedAmount || 0
    };
  });
  
  // Sort plans by premium for comparison
  const topPlansByPremium = [...allZionPlans].sort((a, b) => a.premium - b.premium);
  
  // Find the rank of the lowest premium plan
  const lowestPremiumPlan = topPlansByPremium[0];
  const lowestPremiumPlanRank = recommendations.findIndex(rec => 
    rec.plan.id === lowestPremiumPlan.id
  );
  
  // Map recommendations to a simpler format for the response
  const topRecommendations = recommendations.slice(0, 5).map((rec, index) => {
    // Find the monthly premium and IUA for this plan
    let monthlyPremium, iua;
    
    if (rec.plan.id.includes('zion')) {
      const zionPlan = allZionPlans.find(p => p.id === rec.plan.id);
      monthlyPremium = zionPlan?.premium;
      iua = zionPlan?.iua;
    } else {
      const planCost = getPlanCost(rec.plan.id, questionnaire.age, questionnaire.coverage_type, questionnaire.iua_preference);
      monthlyPremium = planCost?.monthlyPremium;
      iua = planCost?.initialUnsharedAmount;
    }
    
    return {
      rank: index + 1,
      id: rec.plan.id,
      score: rec.score,
      originalScore: rec.originalScore,
      monthlyPremium,
      iua,
      isDpcPlan: rec.plan.id.includes('dpc') || rec.plan.id.includes('vpc'),
      topFactors: rec.factors.slice(0, 3).map(f => ({
        factor: f.factor,
        impact: f.impact
      }))
    };
  });
  
  return NextResponse.json({
    questionnaire,
    topRecommendations,
    zionDirectPosition: zionDirectPosition >= 0 ? zionDirectPosition + 1 : null,
    zionEssentialPosition: zionEssentialPosition >= 0 ? zionEssentialPosition + 1 : null,
    zionEssentialInRecs: zionEssentialPosition >= 0,
    sederaDpcPosition: sederaDpcPosition >= 0 ? sederaDpcPosition + 1 : null,
    zionDirectRankedHigherThanSedera: zionDirectPosition >= 0 && sederaDpcPosition >= 0 && zionDirectPosition < sederaDpcPosition,
    zionEssentialRankedHigherThanSedera: zionEssentialPosition >= 0 && sederaDpcPosition >= 0 && zionEssentialPosition < sederaDpcPosition,
    allZionPlans,
    topPlansByPremium,
    lowestPremiumPlanRank: lowestPremiumPlanRank >= 0 ? lowestPremiumPlanRank + 1 : 0,
    lowestPremiumPlanInTop3: lowestPremiumPlanRank >= 0 && lowestPremiumPlanRank < 3
  });
} 