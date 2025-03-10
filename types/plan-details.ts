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
  };
  medicalServices: {
    emergencyCare: string;
    surgeryAndTreatment: string;
    prescriptionDrugs: string;
    pregnancy: string;
  };
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
    ]
  },
  medicalServices: {
    emergencyCare: "Emergency room visits and ambulance services are typically eligible for sharing after your IUA. For true emergencies, seek care immediately. For non-emergencies, urgent care centers are often a more cost-effective option.",
    surgeryAndTreatment: "Medically necessary surgeries and treatments are typically eligible for sharing after your IUA. Pre-existing conditions may have waiting periods or limitations.",
    prescriptionDrugs: "Most healthshare plans include prescription discount programs rather than traditional prescription coverage. Maintenance medications are typically not shared, but medications related to eligible medical incidents may be shareable.",
    pregnancy: "Most healthshare plans have waiting periods for maternity coverage, typically 6-10 months from enrollment. Conception must occur after the waiting period for maternity expenses to be eligible for sharing."
  }
}; 