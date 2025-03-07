import { PlanMatchingService } from '@/lib/services/plan-matching';
import { PlanScoringService } from '@/lib/services/plan-scoring';
import { providerPlans } from '@/data/provider-plans';

export async function POST(request: Request) {
  console.log('API route /api/recommendations called');
  
  try {
    const questionnaire = await request.json();
    console.log('API received questionnaire:', JSON.stringify(questionnaire, null, 2));
    
    const matcher = new PlanMatchingService(providerPlans);
    const scorer = new PlanScoringService();

    // If the user has a financial capacity of $500, we should include CrowdHealth
    // which only has a $500 IUA option
    let iuaPreference = questionnaire.financial_capacity || '1000';
    
    // For users with higher financial capacity, adjust based on expense preference
    if (questionnaire.financial_capacity && parseInt(questionnaire.financial_capacity) > 1000) {
      iuaPreference = questionnaire.expense_preference === 'lower_monthly' ? '5000' : '1000';
    }
    
    const questionnaireWithIUA = {
      ...questionnaire,
      iua_preference: iuaPreference
    };
    console.log('Modified questionnaire with IUA preference:', JSON.stringify(questionnaireWithIUA, null, 2));

    const eligiblePlans = matcher.findEligiblePlans(questionnaireWithIUA);
    console.log(`Found ${eligiblePlans.length} eligible plans`);
    
    if (eligiblePlans.length === 0) {
      console.log('No eligible plans found');
      return Response.json({ 
        error: "No eligible plans found for your criteria" 
      }, { status: 404 });
    }

    const scoredPlans = scorer.scorePlans(eligiblePlans, questionnaireWithIUA);
    console.log(`Returning ${scoredPlans.length} scored plans`);

    return Response.json({ 
      recommendations: scoredPlans.map(plan => ({
        ...plan,
        providerName: providerPlans.find(p => p.id === plan.id)?.providerName,
        planName: providerPlans.find(p => p.id === plan.id)?.planName
      }))
    });
  } catch (error) {
    console.error('Error processing recommendations:', error);
    return Response.json({ 
      error: "Failed to process recommendations" 
    }, { status: 500 });
  }
}