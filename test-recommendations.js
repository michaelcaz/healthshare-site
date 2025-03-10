// Test script to verify recommendation algorithm changes
const { getRecommendations } = require('./lib/recommendation/recommendations');
const { providerPlans } = require('./data/provider-plans');
const { getPlanCost } = require('./lib/utils/plan-costs');

// Create a questionnaire response with the user's specific inputs
const questionnaire = {
  age: 34,
  coverage_type: 'family',
  iua_preference: '5000',
  expense_preference: 'lower_monthly',
  visit_frequency: 'just_checkups',
  financial_capacity: '5000',
  risk_preference: 'higher_risk',
  pregnancy: 'false',
  pre_existing: 'false',
  zip_code: '12345'
};

// Run the recommendation algorithm
async function testRecommendations() {
  console.log('Testing recommendation algorithm with user inputs:');
  console.log(JSON.stringify(questionnaire, null, 2));
  
  try {
    const recommendations = await getRecommendations(providerPlans, questionnaire);
    
    // Log the top 5 recommendations
    console.log('\nTop 5 Recommendations:');
    recommendations.slice(0, 5).forEach((rec, index) => {
      const planCost = getPlanCost(rec.plan.id, questionnaire.age, questionnaire.coverage_type, questionnaire.iua_preference);
      console.log(`${index + 1}. ${rec.plan.id}`);
      console.log(`   - Score: ${rec.score}`);
      console.log(`   - Original Score: ${rec.originalScore?.toFixed(2)}`);
      console.log(`   - Monthly Premium: $${planCost?.monthlyPremium}`);
      console.log(`   - IUA: $${planCost?.initialUnsharedAmount}`);
      console.log(`   - Is DPC Plan: ${rec.plan.id.includes('dpc') || rec.plan.id.includes('vpc')}`);
      console.log(`   - Top Factors: ${JSON.stringify(rec.factors.slice(0, 3))}`);
      console.log('');
    });
    
    // Check if Zion Essential is in the top recommendations
    const zionEssentialIndex = recommendations.findIndex(r => 
      r.plan.id.includes('zion') && r.plan.id.includes('essential')
    );
    
    if (zionEssentialIndex !== -1) {
      console.log(`✅ Zion Essential found at position ${zionEssentialIndex + 1}`);
    } else {
      console.log('❌ Zion Essential not found in recommendations');
    }
    
    // Check if Sedera Access+ DPC is in the top recommendations
    const sederaDpcIndex = recommendations.findIndex(r => 
      r.plan.id.includes('sedera') && r.plan.id.includes('dpc')
    );
    
    if (sederaDpcIndex !== -1) {
      console.log(`Sedera Access+ DPC found at position ${sederaDpcIndex + 1}`);
      
      // Check if Zion Essential is ranked higher than Sedera Access+ DPC
      if (zionEssentialIndex !== -1 && zionEssentialIndex < sederaDpcIndex) {
        console.log('✅ Zion Essential is ranked higher than Sedera Access+ DPC');
      } else if (zionEssentialIndex !== -1) {
        console.log('❌ Sedera Access+ DPC is still ranked higher than Zion Essential');
      }
    } else {
      console.log('Sedera Access+ DPC not found in recommendations');
    }
    
    // Compare monthly premiums
    const allPlans = recommendations.map(rec => {
      const cost = getPlanCost(rec.plan.id, questionnaire.age, questionnaire.coverage_type, questionnaire.iua_preference);
      return {
        id: rec.plan.id,
        premium: cost?.monthlyPremium || 0,
        iua: cost?.initialUnsharedAmount || 0
      };
    });
    
    // Sort by monthly premium
    const sortedByPremium = [...allPlans].sort((a, b) => a.premium - b.premium);
    
    console.log('\nPlans sorted by monthly premium:');
    sortedByPremium.slice(0, 5).forEach((plan, index) => {
      console.log(`${index + 1}. ${plan.id} - $${plan.premium} monthly / $${plan.iua} IUA`);
    });
    
    // Check if the lowest premium plan is ranked highly
    const lowestPremiumPlan = sortedByPremium[0];
    const lowestPremiumRank = recommendations.findIndex(r => r.plan.id === lowestPremiumPlan.id);
    
    if (lowestPremiumRank !== -1) {
      console.log(`\nLowest premium plan (${lowestPremiumPlan.id}) is ranked #${lowestPremiumRank + 1}`);
      if (lowestPremiumRank <= 2) {
        console.log('✅ Lowest premium plan is in the top 3 recommendations');
      } else {
        console.log('❌ Lowest premium plan is not in the top 3 recommendations');
      }
    }
    
  } catch (error) {
    console.error('Error testing recommendations:', error);
  }
}

// Run the test
testRecommendations(); 