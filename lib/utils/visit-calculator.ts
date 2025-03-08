import { CoverageType } from '@/types/provider-plans';

// Updated costs based on more realistic healthcare pricing
const VISIT_COST = 175; // Base cost for a primary care visit
const SPECIALIST_VISIT_COST = 350; // Cost for a specialist visit
const URGENT_CARE_COST = 200; // Cost for an urgent care visit
const EMERGENCY_ROOM_COST = 1500; // Cost for an emergency room visit
const PRESCRIPTION_MONTHLY_COST = 50; // Monthly cost for prescriptions
const IMAGING_COST = 500; // Cost for basic imaging (X-ray, ultrasound)
const LAB_TEST_COST = 100; // Cost for basic lab tests

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
 * Calculates the expected annual healthcare costs based on visit frequency and coverage type
 * Enhanced with more realistic healthcare cost modeling
 */
export function calculateAnnualHealthcareCosts(
  coverageType: CoverageType,
  visitFrequency?: string,
  age?: number,
  hasPreExistingConditions?: boolean
): number {
  // Base costs by visit frequency
  let primaryCareCost = 0;
  let specialistCost = 0;
  let urgentCareCost = 0;
  let emergencyRoomCost = 0;
  let prescriptionCost = 0;
  let imagingCost = 0;
  let labTestCost = 0;
  
  // Calculate costs based on visit frequency
  if (visitFrequency === 'just_checkups') {
    // Annual checkups only
    primaryCareCost = VISIT_COST; // 1 primary care visit per year
    specialistCost = 0; // No specialist visits
    urgentCareCost = 0.2 * URGENT_CARE_COST; // 20% chance of needing urgent care
    emergencyRoomCost = 0.05 * EMERGENCY_ROOM_COST; // 5% chance of ER visit
    prescriptionCost = 0.3 * PRESCRIPTION_MONTHLY_COST * 12; // 30% chance of needing prescriptions
    imagingCost = 0.1 * IMAGING_COST; // 10% chance of needing imaging
    labTestCost = LAB_TEST_COST; // Basic lab tests with annual checkup
  } else if (visitFrequency === 'few_months') {
    // Every few months (moderate usage)
    primaryCareCost = 3 * VISIT_COST; // 3 primary care visits per year
    specialistCost = 1 * SPECIALIST_VISIT_COST; // 1 specialist visit
    urgentCareCost = 0.5 * URGENT_CARE_COST; // 50% chance of needing urgent care
    emergencyRoomCost = 0.1 * EMERGENCY_ROOM_COST; // 10% chance of ER visit
    prescriptionCost = 0.6 * PRESCRIPTION_MONTHLY_COST * 12; // 60% chance of needing prescriptions
    imagingCost = 0.3 * IMAGING_COST; // 30% chance of needing imaging
    labTestCost = 2 * LAB_TEST_COST; // Lab tests twice a year
  } else if (visitFrequency === 'monthly_plus') {
    // Monthly or more (high usage)
    primaryCareCost = 12 * VISIT_COST; // 12 primary care visits per year
    specialistCost = 4 * SPECIALIST_VISIT_COST; // 4 specialist visits
    urgentCareCost = 1 * URGENT_CARE_COST; // 100% chance of needing urgent care
    emergencyRoomCost = 0.2 * EMERGENCY_ROOM_COST; // 20% chance of ER visit
    prescriptionCost = PRESCRIPTION_MONTHLY_COST * 12; // Ongoing prescriptions
    imagingCost = 0.8 * IMAGING_COST; // 80% chance of needing imaging
    labTestCost = 4 * LAB_TEST_COST; // Quarterly lab tests
  } else {
    // Default to annual checkups if not specified
    primaryCareCost = VISIT_COST;
    labTestCost = LAB_TEST_COST;
  }
  
  // Calculate base total
  let baseCost = primaryCareCost + specialistCost + urgentCareCost + 
                emergencyRoomCost + prescriptionCost + imagingCost + labTestCost;
  
  // Adjust for coverage type (number of people)
  const coverageMultiplier = coverageType === 'just_me' ? 1 :
                           coverageType === 'me_spouse' ? 2 :
                           coverageType === 'me_kids' ? 2.5 : // Slightly higher for kids
                           coverageType === 'family' ? 3.5 : 1; // Family has more potential for healthcare needs
  
  // Apply coverage multiplier
  let totalCost = baseCost * coverageMultiplier;
  
  // Age-based adjustments
  if (age) {
    if (age >= 60) {
      totalCost *= 1.5; // 50% increase for seniors
    } else if (age >= 50) {
      totalCost *= 1.3; // 30% increase for 50+
    } else if (age >= 40) {
      totalCost *= 1.15; // 15% increase for 40+
    }
  }
  
  // Pre-existing condition adjustment
  if (hasPreExistingConditions) {
    totalCost *= 1.25; // 25% increase for pre-existing conditions
  }
  
  return Math.round(totalCost);
} 