/**
 * Data structure for plan-specific details displayed in the plan details modal
 */
export interface PlanDetailsData {
  overview: {
    whatWeLove: string[];
    keyFeatures: string[];
    providerInfo?: string;
  };
  coverageDetails: {
    iuaExplanation: string;
    networkInfo: string;
    includedServices: Array<{
      title: string;
      description: string;
    }>;
    pregnancy?: string;
    preExistingConditions?: string;
  };
  medicalServices: {
    emergencyCare: string;
    surgeryAndTreatment: string;
    prescriptionDrugs: string;
    pregnancy?: string;
    preExistingConditions?: string;
  };
  // Additional fields for hero section and trust elements
  providerDetails?: {
    yearEstablished: number;
    memberCount: string;
    memberSatisfaction: string;
    averageTenure: string;
    ratings: {
      overall: number;
      reviewCount: number;
      bbbRating?: string;
    };
    processingTime: string;
    costTransparency?: {
      medicalCostSharing: number;
      administrativeCosts: number;
      operationalReserves: number;
    };
    savingsVsInsurance?: {
      averageMonthlySavings: string;
    };
  };
  testimonials?: Array<{
    text: string;
    author: string;
    highlight: string;
    tenure: string;
    avatar: string;
    rating: number;
  }>;
  keyPlanFeatures?: Array<{
    text: string;
    isPositive: boolean;
    icon: string;
    tooltip?: string;
  }>;
}

/**
 * Default fallback data for when plan-specific data is not available
 */
export const defaultPlanDetailsData: PlanDetailsData = {
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
    ]
  },
  coverageDetails: {
    iuaExplanation: "Your Initial Unshared Amount is the amount you pay before the community begins sharing your eligible medical expenses. Most healthshare plans offer multiple IUA options to fit your budget and needs.",
    networkInfo: "Most healthshare plans allow you to see any provider you choose. There are no network restrictions, but you may receive better pricing by using providers experienced with healthshare plans.",
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
        title: "Member Support",
        description: "Dedicated support team to help navigate your healthcare needs"
      }
    ],
    pregnancy: "Most healthshare plans have waiting periods for maternity coverage, typically 6-10 months from enrollment. Conception must occur after the waiting period for maternity expenses to be eligible for sharing.",
    preExistingConditions: "Pre-existing conditions typically have waiting periods before becoming eligible for sharing. Most healthshare plans use a graduated approach where conditions become eligible for limited sharing after 1-2 years and may become fully eligible after 2-3 years of continuous membership."
  },
  medicalServices: {
    emergencyCare: "Emergency room visits and ambulance services are typically eligible for sharing after your IUA. For true emergencies, seek care immediately. For non-emergencies, urgent care centers are often a more cost-effective option.",
    surgeryAndTreatment: "Medically necessary surgeries and treatments are typically eligible for sharing after your IUA. Pre-existing conditions may have waiting periods or limitations.",
    prescriptionDrugs: "Most healthshare plans include prescription discount programs rather than traditional prescription coverage. Maintenance medications are typically not shared, but medications related to eligible medical incidents may be shareable.",
    preExistingConditions: "Pre-existing conditions typically have waiting periods before becoming eligible for sharing. Most healthshare plans use a graduated approach where conditions become eligible for limited sharing after 1-2 years and may become fully eligible after 2-3 years of continuous membership."
  },
  // Default values for the new fields
  providerDetails: {
    yearEstablished: 2015,
    memberCount: "100K+",
    memberSatisfaction: "95%",
    averageTenure: "3.5 years",
    ratings: {
      overall: 4.5,
      reviewCount: 150,
      bbbRating: "A"
    },
    processingTime: "5-7 business days",
    costTransparency: {
      medicalCostSharing: 80,
      administrativeCosts: 15,
      operationalReserves: 5
    },
    savingsVsInsurance: {
      averageMonthlySavings: "25%"
    }
  },
  testimonials: [
    {
      text: "This healthshare plan has been a great fit for my family. The monthly costs are reasonable and we've had positive experiences with sharing medical expenses.",
      author: "John D.",
      highlight: "Great family option",
      tenure: "Member for 2 years",
      avatar: "J",
      rating: 5
    },
    {
      text: "I was hesitant at first, but I'm glad I joined. The customer service has been excellent and the sharing process is straightforward.",
      author: "Sarah M.",
      highlight: "Excellent service",
      tenure: "Member for 1 year",
      avatar: "S",
      rating: 4
    },
    {
      text: "The prescription program has saved me a lot of money. Very satisfied with my membership.",
      author: "Robert K.",
      highlight: "Cost savings",
      tenure: "Member for 3 years",
      avatar: "R",
      rating: 5
    }
  ],
  keyPlanFeatures: [
    {
      text: "No network restrictions",
      isPositive: true,
      icon: "Globe",
      tooltip: "Freedom to choose any healthcare provider"
    },
    {
      text: "Quick sharing process",
      isPositive: true,
      icon: "Clock",
      tooltip: "Eligible medical expenses are typically processed within 5-7 business days"
    },
    {
      text: "Prescription discounts included",
      isPositive: true,
      icon: "Pill",
      tooltip: "Access to prescription discount programs to help reduce medication costs"
    }
  ]
}; 