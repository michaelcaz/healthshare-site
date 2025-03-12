import { PlanDetailsData } from '@/types/plan-details';

/**
 * Plan-specific details for each healthshare plan
 * This file should be updated with accurate information for each plan
 */
export const planDetailsData: Record<string, PlanDetailsData> = {
  // Zion Health plans
  'zion-direct': {
    overview: {
      whatWeLove: [
        "Strong community focus with excellent member satisfaction",
        "Transparent pricing with no hidden fees",
        "Quick processing times for eligible medical expenses"
      ],
      keyFeatures: [
        "No network restrictions - see any provider",
        "Simple sharing process with dedicated member support",
        "Mobile app for easy access to your membership"
      ],
      providerInfo: "Zion Health is a healthsharing community founded in 2019 with a focus on simplicity and transparency."
    },
    coverageDetails: {
      iuaExplanation: "Your Initial Unshared Amount is the amount you pay before the community begins sharing your eligible medical expenses. Zion Health offers three IUA options: $1,000, $2,500, or $5,000 per incident.",
      networkInfo: "Zion Health members can see any provider they choose. There are no network restrictions, but you may receive better pricing by using providers experienced with healthshare plans.",
      includedServices: [
        {
          title: "Preventive Care",
          description: "Annual check-ups and preventive screenings"
        },
        {
          title: "Telemedicine",
          description: "24/7 access to virtual doctor visits through DialCare"
        },
        {
          title: "Member Support",
          description: "Dedicated support team to help navigate your healthcare needs"
        }
      ]
    },
    medicalServices: {
      emergencyCare: "Emergency room visits and ambulance services are eligible for sharing after your IUA. For true emergencies, seek care immediately.",
      surgeryAndTreatment: "Medically necessary surgeries and treatments are eligible for sharing after your IUA. Pre-existing conditions may have waiting periods or limitations.",
      prescriptionDrugs: "Zion Health includes a prescription discount program. Maintenance medications are typically not shared, but medications related to eligible medical incidents may be shareable.",
      pregnancy: "Maternity expenses are eligible for sharing after a 6-month waiting period. Conception must occur after the waiting period for maternity expenses to be eligible."
    }
  },
  
  // Zion Essential plan with updated data - accessible via both keys
  'zion-essential': {
    overview: {
      whatWeLove: [
        "Zion is the MOST affordable health share plan on the market with **monthly contributions starting at $82/mo for individuals.** Add RX Share for $10/mo (deep discounts on prescription meds) and/or Virtual Care for only $5/mo",
        "**Zero lifetime sharing limits** - unlike many competitors that cap at $1M",
        "**Direct provider partnerships** help members access deeper discounts"
      ],
      keyFeatures: [
        "**Telemedicine included** with $0 consult fees through Amwell",
        "**Guaranteed Acceptance** for applicants under age 65",
        "**No denomination requirements** - open to all faiths"
      ],
      providerInfo: "Founded in 2019, Zion HealthShare is a **501(c)(3) nonprofit** organization operating under revised 2024 guidelines. They emphasize **price transparency** by publishing exact reimbursement rates for 300+ common procedures."
    },
    coverageDetails: {
      iuaExplanation: "**Annual** Initial Unshared Amount (IUA) resets every membership year.",
      networkInfo: "**Direct Contracting Program** offers 20-60% discounts at 900K+ providers nationwide. Members receive a Zion ID card for instant self-pay pricing.",
      includedServices: [
        {
          title: "Preventive Services",
          description: "**$0 sharing** for annual physicals, 57 CDC-recommended screenings, and routine vaccinations when using in-network providers"
        },
        {
          title: "Chronic Condition Support",
          description: "**Diabetes/hypertension management** programs with 50% shared costs after IUA"
        },
        {
          title: "Alternative Medicine",
          description: "**$500 annual allowance** for chiropractic care, acupuncture, and naturopathic medicine"
        }
      ]
    },
    medicalServices: {
      emergencyCare: "**$250 member responsibility** per ER visit (waived if admitted). Air ambulance **capped at $25K** per incident.",
      surgeryAndTreatment: "**Pre-negotiated rates** for 300+ common procedures (e.g., $12K for knee replacement vs $35K national average)",
      prescriptionDrugs: "**Tiered formulary**: Generic ($10), Preferred Brand ($50), Non-Preferred Brand ($100). **90-day mail order** available.",
      pregnancy: "**$4,500 global maternity fee** (normal delivery) or **$7,500** (C-section). **10-month waiting period** before conception."
    },
    providerDetails: {
      yearEstablished: 2019,
      memberCount: "**50,000+**",
      memberSatisfaction: "4.7/5",
      averageTenure: "2.8 years",
      ratings: {
        overall: 4.8,
        reviewCount: 246,
        bbbRating: "**NR** (Not Rated)"
      },
      processingTime: "**7-10 business days**",
      costTransparency: {
        medicalCostSharing: 84,
        administrativeCosts: 12,
        operationalReserves: 4
      },
      savingsVsInsurance: {
        averageMonthlySavings: "**37%** (per 2023 member survey)"
      }
    },
    testimonials: [
      {
        text: "**Saved $8,200 on my appendectomy** compared to my old insurance. Zion's pre-negotiated rates made all the difference.",
        author: "Emily T.",
        highlight: "Surgical savings",
        tenure: "Member for 2 years",
        avatar: "E",
        rating: 5
      },
      {
        text: "**$135/month vs $489 for ACA plan**. The preventive care coverage is better than my old PPO.",
        author: "Carlos M.",
        highlight: "Affordable premiums",
        tenure: "Member for 1 year",
        avatar: "C",
        rating: 5
      }
    ],
    keyPlanFeatures: [
      {
        text: "Pre-Existing Conditions: **24-month waiting period**",
        isPositive: false,
        icon: "AlertCircle",
        tooltip: "Conditions treated in past 24 months not shareable until 24 months of continuous membership"
      },
      {
        text: "Mental Health: **$2,500 annual cap**",
        isPositive: false,
        icon: "AlertCircle",
        tooltip: "Limited to 12 therapy sessions/year at 50% sharing after IUA"
      },
      {
        text: "Wellness Incentives: **$200 annual credit**",
        isPositive: true,
        icon: "Heart",
        tooltip: "For completing health assessments and biometric screenings"
      }
    ]
  },
  
  // Map the same data to the ID used in provider-plans.ts
  'zion-healthshare-essential-membership': {
    overview: {
      whatWeLove: [
        "Zion is the MOST affordable health share plan on the market with **monthly contributions starting at $82/mo for individuals.** Add RX Share for $10/mo (deep discounts on prescription meds) and/or Virtual Care for only $5/mo",
        "**Zero lifetime sharing limits** - unlike many competitors that cap at $1M",
        "**Direct provider partnerships** help members access deeper discounts"
      ],
      keyFeatures: [
        "**Telemedicine included** with $0 consult fees through Amwell",
        "**Guaranteed Acceptance** for applicants under age 65",
        "**No denomination requirements** - open to all faiths"
      ],
      providerInfo: "Founded in 2019, Zion HealthShare is a **501(c)(3) nonprofit** organization operating under revised 2024 guidelines. They emphasize **price transparency** by publishing exact reimbursement rates for 300+ common procedures."
    },
    coverageDetails: {
      iuaExplanation: "**Annual** Initial Unshared Amount (IUA) resets every membership year.",
      networkInfo: "**Direct Contracting Program** offers 20-60% discounts at 900K+ providers nationwide. Members receive a Zion ID card for instant self-pay pricing.",
      includedServices: [
        {
          title: "Preventive Services",
          description: "**$0 sharing** for annual physicals, 57 CDC-recommended screenings, and routine vaccinations when using in-network providers"
        },
        {
          title: "Chronic Condition Support",
          description: "**Diabetes/hypertension management** programs with 50% shared costs after IUA"
        },
        {
          title: "Alternative Medicine",
          description: "**$500 annual allowance** for chiropractic care, acupuncture, and naturopathic medicine"
        }
      ]
    },
    medicalServices: {
      emergencyCare: "**$250 member responsibility** per ER visit (waived if admitted). Air ambulance **capped at $25K** per incident.",
      surgeryAndTreatment: "**Pre-negotiated rates** for 300+ common procedures (e.g., $12K for knee replacement vs $35K national average)",
      prescriptionDrugs: "**Tiered formulary**: Generic ($10), Preferred Brand ($50), Non-Preferred Brand ($100). **90-day mail order** available.",
      pregnancy: "**$4,500 global maternity fee** (normal delivery) or **$7,500** (C-section). **10-month waiting period** before conception."
    },
    providerDetails: {
      yearEstablished: 2019,
      memberCount: "**50,000+**",
      memberSatisfaction: "4.7/5",
      averageTenure: "2.8 years",
      ratings: {
        overall: 4.8,
        reviewCount: 246,
        bbbRating: "**NR** (Not Rated)"
      },
      processingTime: "**7-10 business days**",
      costTransparency: {
        medicalCostSharing: 84,
        administrativeCosts: 12,
        operationalReserves: 4
      },
      savingsVsInsurance: {
        averageMonthlySavings: "**37%** (per 2023 member survey)"
      }
    },
    testimonials: [
      {
        text: "**Saved $8,200 on my appendectomy** compared to my old insurance. Zion's pre-negotiated rates made all the difference.",
        author: "Emily T.",
        highlight: "Surgical savings",
        tenure: "Member for 2 years",
        avatar: "E",
        rating: 5
      },
      {
        text: "**$135/month vs $489 for ACA plan**. The preventive care coverage is better than my old PPO.",
        author: "Carlos M.",
        highlight: "Affordable premiums",
        tenure: "Member for 1 year",
        avatar: "C",
        rating: 5
      }
    ],
    keyPlanFeatures: [
      {
        text: "Pre-Existing Conditions: **24-month waiting period**",
        isPositive: false,
        icon: "AlertCircle",
        tooltip: "Conditions treated in past 24 months not shareable until 24 months of continuous membership"
      },
      {
        text: "Mental Health: **$2,500 annual cap**",
        isPositive: false,
        icon: "AlertCircle",
        tooltip: "Limited to 12 therapy sessions/year at 50% sharing after IUA"
      },
      {
        text: "Wellness Incentives: **$200 annual credit**",
        isPositive: true,
        icon: "Heart",
        tooltip: "For completing health assessments and biometric screenings"
      }
    ]
  },
  
  // CrowdHealth plans
  'crowdhealth-standard': {
    overview: {
      whatWeLove: [
        "Innovative approach to healthcare sharing",
        "Transparent and predictable pricing",
        "Strong focus on member experience"
      ],
      keyFeatures: [
        "Fixed monthly contribution with predictable costs",
        "Simple $500 Initial Unshared Amount",
        "Access to negotiated rates with providers"
      ],
      providerInfo: "CrowdHealth is a modern approach to healthcare sharing that leverages technology to create a better member experience."
    },
    coverageDetails: {
      iuaExplanation: "CrowdHealth has a simple $500 Initial Unshared Amount per medical need. This is the amount you pay before the community begins sharing your eligible medical expenses.",
      networkInfo: "CrowdHealth members can see any provider they choose. There are no network restrictions, and CrowdHealth can help negotiate better rates with your providers.",
      includedServices: [
        {
          title: "Preventive Care",
          description: "Annual check-ups and preventive screenings"
        },
        {
          title: "Telemedicine",
          description: "24/7 access to virtual doctor visits"
        },
        {
          title: "Care Coordination",
          description: "Dedicated team to help coordinate your care and negotiate prices"
        }
      ]
    },
    medicalServices: {
      emergencyCare: "Emergency room visits and ambulance services are eligible for sharing after your $500 Initial Unshared Amount.",
      surgeryAndTreatment: "Medically necessary surgeries and treatments are eligible for sharing after your Initial Unshared Amount. CrowdHealth can help negotiate better rates for planned procedures.",
      prescriptionDrugs: "CrowdHealth includes access to prescription discounts. Additionally, medications related to eligible medical needs may be shareable.",
      pregnancy: "Maternity expenses are eligible for sharing after a 10-month waiting period. Conception must occur after the waiting period for maternity expenses to be eligible."
    }
  },
  
  // Add more plans as needed...
}; 