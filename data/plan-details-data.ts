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