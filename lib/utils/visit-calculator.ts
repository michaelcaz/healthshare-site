import { CoverageType } from '@/types/provider-plans';

const VISIT_COST = 175; // Base cost for a primary care visit

export const getVisitFrequencyOptions = (coverageType: 'just_me' | 'me_spouse' | 'me_kids' | 'family') => {
  switch(coverageType) {
    case 'just_me':
      return {
        just_checkups: {
          label: "Just for checkups",
          example: "1 annual checkup",
          expectedVisits: 1,
          annualCost: 1 * VISIT_COST,
          question: "Outside of unexpected emergencies, how often do you think you'll visit the doctor in the next year?"
        },
        few_months: {
          label: "Every few months", 
          example: "2-3 visits per year",
          expectedVisits: 3,
          annualCost: 3 * VISIT_COST
        },
        monthly_plus: {
          label: "Monthly or more",
          example: "4+ visits planned",
          expectedVisits: 12,
          annualCost: 12 * VISIT_COST
        }
      };

    case 'me_spouse':
      return {
        just_checkups: {
          label: "Just for checkups",
          example: "2 annual checkups for you and your spouse",
          expectedVisits: 2,
          annualCost: 2 * VISIT_COST,
          question: "Outside of unexpected emergencies, how often do you and your spouse expect to visit the doctor in the next year?"
        },
        few_months: {
          label: "Every few months",
          example: "4-6 visits total for you and your spouse",
          expectedVisits: 6,
          annualCost: 6 * VISIT_COST
        },
        monthly_plus: {
          label: "Monthly or more",
          example: "8+ visits planned for you and your spouse",
          expectedVisits: 24,
          annualCost: 24 * VISIT_COST
        }
      };

    case 'me_kids':
      return {
        just_checkups: {
          label: "Just for checkups",
          example: "Annual checkups for you and your children",
          expectedVisits: 3,
          annualCost: 3 * VISIT_COST,
          question: "Outside of unexpected emergencies, how often do you think your family will visit the doctor in the next year?"
        },
        few_months: {
          label: "Every few months",
          example: "6-9 visits total for your family",
          expectedVisits: 9,
          annualCost: 9 * VISIT_COST
        },
        monthly_plus: {
          label: "Monthly or more",
          example: "12+ visits planned for your family",
          expectedVisits: 36,
          annualCost: 36 * VISIT_COST
        }
      };

    case 'family':
      return {
        just_checkups: {
          label: "Just for checkups",
          example: "Annual checkups for your whole family",
          expectedVisits: 4,
          annualCost: 4 * VISIT_COST,
          question: "Outside of unexpected emergencies, how often do you think your family will visit the doctor in the next year?"
        },
        few_months: {
          label: "Every few months",
          example: "8-12 visits total for your family",
          expectedVisits: 12,
          annualCost: 12 * VISIT_COST
        },
        monthly_plus: {
          label: "Monthly or more",
          example: "16+ visits planned for your family",
          expectedVisits: 48,
          annualCost: 48 * VISIT_COST
        }
      };

    default:
      throw new Error('Invalid coverage type');
  }
};

/**
 * Calculates the expected annual healthcare costs based on visit frequency
 */
export function calculateAnnualHealthcareCosts(
  coverageType: CoverageType,
  visitFrequency?: string
): number {
  // Base cost per visit frequency
  let baseCost = 0;
  
  if (visitFrequency === 'just_checkups') {
    baseCost = 500; // Annual checkups only
  } else if (visitFrequency === 'few_months') {
    baseCost = 500 * 3; // Roughly 3 visits per year
  } else if (visitFrequency === 'monthly_plus') {
    baseCost = 500 * 12; // 12 visits per year (monthly or more)
  } else {
    baseCost = 500; // Default to annual checkups if not specified
  }
  
  // Adjust for coverage type
  const multiplier = coverageType === 'just_me' ? 1 :
                    coverageType === 'me_spouse' ? 2 :
                    coverageType === 'me_kids' ? 2 :
                    coverageType === 'family' ? 3 : 1;
  
  return baseCost * multiplier;
} 