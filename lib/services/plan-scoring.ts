import { EligiblePlan } from '@/types/provider-plans';
import { QuestionnaireResponse } from '@/types/questionnaire';

interface ScoredPlan extends EligiblePlan {
  score: number;
  explanation: string[];
  factors: Array<{
    factor: string;
    score: number;
    explanation: string;
  }>;
}

export class PlanScoringService {
  scorePlans(plans: EligiblePlan[], response: QuestionnaireResponse): ScoredPlan[] {
    return plans
      .map(plan => this.calculateScore(plan, response))
      .sort((a, b) => b.score - a.score);
  }

  private calculateScore(plan: EligiblePlan, response: QuestionnaireResponse): ScoredPlan {
    const factors = [];
    
    // Monthly cost scoring
    const monthlyPremium = plan.eligiblePrices[0].monthlyPremium;
    const monthlyScore = this.scoreMonthlyPremium(monthlyPremium);
    factors.push({
      factor: 'Monthly Cost',
      score: monthlyScore,
      explanation: `Monthly premium: $${monthlyPremium}`
    });

    // Initial Unshared Amount scoring
    const iua = plan.eligiblePrices[0].initialUnsharedAmount;
    const iuaScore = this.scoreIUA(iua, response.expense_preference);
    factors.push({
      factor: 'Initial Unshared Amount',
      score: iuaScore,
      explanation: `Initial unshared amount: $${iua}`
    });

    // Expected annual healthcare spend impact
    const annualScore = this.scoreAnnualCosts(plan, response.annual_healthcare_spend);
    factors.push({
      factor: 'Expected Annual Costs',
      score: annualScore,
      explanation: `Based on your expected healthcare usage`
    });

    const totalScore = factors.reduce((sum, f) => sum + f.score, 0) / factors.length;

    return {
      ...plan,
      score: totalScore,
      explanation: factors.map(f => f.explanation),
      factors
    };
  }

  private scoreMonthlyPremium(premium: number): number {
    // Implement scoring logic based on premium ranges
    if (premium < 200) return 100;
    if (premium < 400) return 80;
    if (premium < 600) return 60;
    if (premium < 800) return 40;
    return 20;
  }

  private scoreIUA(iua: number, preference: string): number {
    // Score based on user's expense preference
    if (preference === 'lower_monthly') {
      return iua <= 2500 ? 60 : 100;
    }
    return iua >= 2500 ? 100 : 60;
  }

  private scoreAnnualCosts(plan: EligiblePlan, spend: string): number {
    const expectedCosts: Record<string, number> = {
      'less_1000': 500,
      '1000_5000': 3000,
      'more_5000': 7500
    } as const;
    
    const annualPremium = plan.eligiblePrices[0].monthlyPremium * 12;
    const totalCost = annualPremium + (expectedCosts[spend] || 500); // Default to 500 if invalid spend value
    
    // Score based on total expected annual costs
    if (totalCost < 5000) return 100;
    if (totalCost < 10000) return 80;
    if (totalCost < 15000) return 60;
    return 40;
  }
}