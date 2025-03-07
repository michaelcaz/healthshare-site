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
    console.log('PlanScoringService.scorePlans called with', plans.length, 'plans');
    console.log('Questionnaire response:', JSON.stringify(response, null, 2));
    
    const scoredPlans = plans
      .map(plan => {
        const scoredPlan = this.calculateScore(plan, response);
        console.log(`Plan ${plan.id} scored ${scoredPlan.score.toFixed(2)}`);
        console.log(`Factors:`, JSON.stringify(scoredPlan.factors, null, 2));
        return scoredPlan;
      })
      .sort((a, b) => b.score - a.score);
    
    console.log('Top 3 plans:');
    scoredPlans.slice(0, 3).forEach((plan, index) => {
      console.log(`${index + 1}. ${plan.id} - Score: ${plan.score.toFixed(2)}`);
    });
    
    return scoredPlans;
  }

  private calculateScore(plan: EligiblePlan, response: QuestionnaireResponse): ScoredPlan {
    const factors = [];
    
    // 1. Monthly cost scoring
    const monthlyPremium = plan.eligiblePrices[0].monthlyPremium;
    // Score based on a scale from 10-100, with lower premiums getting higher scores
    let monthlyScore = 0;
    if (monthlyPremium < 200) monthlyScore = 100;
    else if (monthlyPremium < 300) monthlyScore = 85;
    else if (monthlyPremium < 400) monthlyScore = 70;
    else if (monthlyPremium < 500) monthlyScore = 55;
    else if (monthlyPremium < 600) monthlyScore = 40;
    else if (monthlyPremium < 800) monthlyScore = 25;
    else monthlyScore = 10;
    
    factors.push({
      factor: 'Monthly Cost',
      score: monthlyScore,
      explanation: `Monthly premium: $${monthlyPremium}`
    });

    // 2. Initial Unshared Amount (IUA) scoring
    const iua = plan.eligiblePrices[0].initialUnsharedAmount;
    // Base score with bonus for very low IUAs
    let iuaScore = 0;
    if (iua <= 500) iuaScore = 100; // Significant bonus for extremely low IUA
    else if (iua <= 1000) iuaScore = 85;
    else if (iua <= 1500) iuaScore = 70;
    else if (iua <= 2500) iuaScore = 55;
    else if (iua <= 5000) iuaScore = 40;
    else iuaScore = 25;
    
    // Check if IUA exceeds financial capacity
    if (response.financial_capacity && iua > parseInt(response.financial_capacity)) {
      iuaScore *= 0.5; // Heavily penalize plans with IUAs above stated financial capacity
    }
    
    factors.push({
      factor: 'Initial Unshared Amount',
      score: iuaScore,
      explanation: `Initial unshared amount: $${iua}`
    });

    // 3. Expected annual healthcare costs
    // Derive annual healthcare spend from visit frequency
    let annualHealthcareSpend = 500; // Default to low spend
    
    if (response.visit_frequency) {
      if (response.visit_frequency === 'just_checkups') {
        annualHealthcareSpend = 500;
      } else if (response.visit_frequency === 'few_months') {
        annualHealthcareSpend = 3000;
      } else if (response.visit_frequency === 'monthly_plus') {
        annualHealthcareSpend = 7500;
      }
    }
    
    // Calculate total annual cost (premium + expected healthcare spend)
    const annualPremium = monthlyPremium * 12;
    const totalAnnualCost = annualPremium + annualHealthcareSpend;
    
    // Score based on total annual cost
    let annualScore = 0;
    if (totalAnnualCost < 3000) annualScore = 100;
    else if (totalAnnualCost < 5000) annualScore = 85;
    else if (totalAnnualCost < 7500) annualScore = 70;
    else if (totalAnnualCost < 10000) annualScore = 55;
    else if (totalAnnualCost < 15000) annualScore = 40;
    else annualScore = 25;
    
    factors.push({
      factor: 'Expected Annual Costs',
      score: annualScore,
      explanation: `Total annual cost: $${totalAnnualCost} based on your expected healthcare usage`
    });

    // 4. Apply preference-based weighting
    const weights: { [key: string]: number } = {
      'Monthly Cost': response.expense_preference === 'lower_monthly' ? 1.5 : 0.8,
      'Initial Unshared Amount': response.expense_preference === 'higher_monthly' ? 1.5 : 0.8,
      'Expected Annual Costs': 1.2 // Increased weight for annual cost since it incorporates visit frequency
    };
    
    // Apply additional risk preference adjustments
    if (response.risk_preference === 'higher_risk') {
      weights['Monthly Cost'] *= 1.2; // Higher risk users care more about monthly costs
    } else if (response.risk_preference === 'lower_risk') {
      weights['Initial Unshared Amount'] *= 1.2; // Lower risk users care more about incident costs
    }
    
    // Calculate weighted average score
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
    const weightedScore = factors.reduce((sum, factor) => {
      const weight = weights[factor.factor] || 1.0;
      return sum + (factor.score * weight);
    }, 0) / totalWeight;

    return {
      ...plan,
      score: weightedScore,
      explanation: factors.map(f => f.explanation),
      factors
    };
  }
}