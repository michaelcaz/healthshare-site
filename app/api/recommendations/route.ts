import { PlanMatchingService } from '@/lib/services/plan-matching';
import { PlanScoringService } from '@/lib/services/plan-scoring';
import { providerPlans } from '@/data/provider-plans';

export async function POST(request: Request) {
  try {
    const questionnaire = await request.json();
    
    const matcher = new PlanMatchingService(providerPlans);
    const scorer = new PlanScoringService();

    // Apply IUA preference based on expense_preference
    const iuaPreference = questionnaire.expense_preference === 'lower_monthly' ? '5000' : '1000';
    const questionnaireWithIUA = {
      ...questionnaire,
      iua_preference: iuaPreference
    };

    const eligiblePlans = matcher.findEligiblePlans(questionnaireWithIUA);
    
    if (eligiblePlans.length === 0) {
      return Response.json({ 
        error: "No eligible plans found for your criteria" 
      }, { status: 404 });
    }

    const scoredPlans = scorer.scorePlans(eligiblePlans, questionnaireWithIUA);

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