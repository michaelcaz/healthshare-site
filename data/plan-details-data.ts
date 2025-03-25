import { PlanDetailsData } from '@/types/plan-details';

/**
 * Plan-specific details for each healthshare plan
 * This file should be updated with accurate information for each plan
 */
export const planDetailsData: Record<string, PlanDetailsData> = {
  // Zion Health plans - using official IDs from provider-plans.ts
  'zion-healthshare-direct-membership': {
    overview: {
      whatWeLove: [
        "Zion Direct offers comprehensive health sharing with **flexible options for individuals and families**",
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
      iuaExplanation: "**Per-incident** Initial Unshared Amount (IUA) applies to each medical incident.",
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
  
  // Zion Essential plan with updated data
  'zion-healthshare-essential-membership': {
    overview: {
      whatWeLove: [
        "Zion is the MOST affordable health share plan on the market with **monthly contributions starting at $82/mo for individuals**. Add RX Share for $10/mo (deep discounts on prescription meds) and/or Virtual Care for only $5/mo",
        "**Zero lifetime sharing limits** - unlike many competitors that cap at $1M or lower",
        "One of the **best avg. ratings (over 4.7/5 out of hundreds of reviews)** in the health share industry. No insurance company has ratings anywhere close.",
        "They have a **HUGE reserve** to protect their community in the event of some major nationwide health catastrophe - over 3x their yearly contribution amount.",
        "They have been very **transparent in all communications** with us, and as a non-profit are required to post their financials publicly on their site."
      ],
      keyFeatures: [
        "**Telemedicine included** for $5-$15/mo",
        "**Guaranteed Acceptance** for applicants under age 65",
        "**Essential membership** is great to pair with Direct Primary Care (subscription based primary care in your city)"
      ],
      providerInfo: "Founded in 2019, Zion HealthShare is a **501(c)(3) nonprofit** organization. They emphasize **price transparency** by publishing exact reimbursement rates for 300+ common procedures."
    },
    coverageDetails: {
      iuaExplanation: "The **Initial Unshared Amount (IUA)** is the amount you pay before your health share plan kicks in. For example, if you have a $1000 IUA and get an injury that results in $2300 of medical bills, you pay the first $1000, and the health share community pays the other $1300.",
      networkInfo: "Zion HealthShare is **not health insurance**, they have **no network limitations**. However, wherever possible, it is suggested that you find a provider with fair-market prices. Their Medical Advocacy team can also assist you in identifying a provider in your area and making prepayments, or you can use their online portal to find a provider in your area.",
      includedServices: [
        {
          title: "Medical Advocacy",
          description: "The Zion **Medical Advocacy team** is there to help you find high quality, fair-market providers in your area for anything from a primary care visit to a serious surgery. And if you ever get a huge bill, they are there to help negotiate the price down on your behalf."
        },
        {
          title: "Chronic Condition Support",
          description: "**High blood pressure, high cholesterol, and diabetes** (types 1 and 2) are not considered pre-membership medical conditions as long as\n1. the member has not been hospitalized for the condition in the 12 months prior to joining, and\n2. the member is able to control the condition through medication or diet.\n\n**Any medical expenses related to supplies, testing, medication, or other implements used to treat diabetes are not shareable.**"
        },
        {
          title: "Alternative Medicine",
          description: "If you're injured or have any other eligible medical need, **therapeutic Treatments** prescribed and performed by a licensed medical professional are shareable for an eligible request, up to **$7,500 or 35 treatments per medical need**. Once either limit is reached, further treatments are no longer shareable. Therapeutic services include, but are not limited to:\n• Alternative and/or integrative therapies such as acupuncture, craniosacral therapy, dry needling, ozone treatments, prolotherapy, and alternative infusion therapies.\n• Chiropractic treatments and services provided by licensed chiropractors.\n• Massage therapy and services provided by licensed massage therapists.\n• Physical therapy and services performed by licensed physical therapists."
        }
      ]
    },
    medicalServices: {
      emergencyCare: "**ER visits are generally eligible for sharing**, whether or not they are in conjunction with an eligible medical need. The first ER visit for a medical condition is treated as a normal sharing request. Each additional visit related to the same condition requires the member to take on a personal responsibility of $500 in addition to the member's IUA.",
      surgeryAndTreatment: "**Covered for eligible medical needs**. For any non-emergency surgery, you can get prior authorization to ensure that your surgery will be fully shared.",
      prescriptionDrugs: "**Prescription medications** are considered eligible for sharing under the following conditions: 1. The prescription is related to the treatment of an eligible sharing request. 2. The prescription is ordered by a licensed provider. 3. The prescription is approved by Zion HealthShare. When these conditions are met, the member will be reimbursed for the cost or given a one-time use credit card for the exact cost of the prescription to take to the pharmacy and pay for their prescription. For all other medications, you can subscribe to **Zion RX Share** to order heavily discounted medications online or to pick up at your local pharmacy.",
      pregnancy: "**6 Month Waiting Period**: You must be a member for 6 months before conceiving, for your pregnancy related needs to be eligible for sharing. Services available for sharing include pre-natal, delivery (including birthing centers and home-births), post-natal, and miscarriage."
    },
    providerDetails: {
      yearEstablished: 2019,
      memberCount: "**60,000+**",
      memberSatisfaction: "4.7/5",
      averageTenure: "2.8 years",
      ratings: {
        overall: 4.7,
        reviewCount: 952,
        bbbRating: "**A+**"
      },
      processingTime: "**typically 3-5 business days**",
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
  'crowdhealth-essential-membership-(basic,-no-additional-services)': {
    overview: {
      whatWeLove: [
        "CrowdHealth offers a modern approach to healthcare sharing with **transparent pricing**",
        "**Innovative crowdfunding model** for medical expenses",
        "**Simple, predictable costs** with no complicated sharing rules"
      ],
      keyFeatures: [
        "**Fixed monthly contribution** regardless of age or family size",
        "**Simple $500 Initial Unshared Amount** per medical need",
        "**Care coordination team** helps negotiate prices with providers"
      ],
      providerInfo: "Founded in 2021, CrowdHealth is a modern healthcare sharing community that uses technology to simplify the healthcare experience."
    },
    coverageDetails: {
      iuaExplanation: "**$500 per medical need** - simple and straightforward Initial Unshared Amount.",
      networkInfo: "**No network restrictions** - see any provider you choose. CrowdHealth helps negotiate fair prices.",
      includedServices: [
        {
          title: "Preventive Care",
          description: "**Annual check-ups** and preventive screenings included"
        },
        {
          title: "Care Coordination",
          description: "**Dedicated team** helps coordinate care and negotiate prices"
        },
        {
          title: "Telemedicine",
          description: "**24/7 access** to virtual doctor visits"
        }
      ]
    },
    medicalServices: {
      emergencyCare: "**$500 member responsibility** per emergency room visit. Ambulance services eligible for sharing.",
      surgeryAndTreatment: "**Negotiated rates** for planned procedures. CrowdHealth helps members find fair prices.",
      prescriptionDrugs: "**Prescription discount program** included. Medications related to eligible medical needs may be shareable.",
      pregnancy: "**Maternity expenses** eligible for sharing after 10-month waiting period."
    },
    providerDetails: {
      yearEstablished: 2021,
      memberCount: "**10,000+**",
      memberSatisfaction: "4.6/5",
      averageTenure: "1.5 years",
      ratings: {
        overall: 4.6,
        reviewCount: 120,
        bbbRating: "**A-**"
      },
      processingTime: "**5-7 business days**",
      costTransparency: {
        medicalCostSharing: 85,
        administrativeCosts: 10,
        operationalReserves: 5
      },
      savingsVsInsurance: {
        averageMonthlySavings: "**40%** (per 2023 member survey)"
      }
    },
    testimonials: [
      {
        text: "**CrowdHealth negotiated my hospital bill down by 60%**. The process was simple and transparent.",
        author: "Mark R.",
        highlight: "Bill negotiation",
        tenure: "Member for 1 year",
        avatar: "M",
        rating: 5
      },
      {
        text: "**I love the predictable costs**. No surprises with CrowdHealth.",
        author: "Sarah L.",
        highlight: "Predictable costs",
        tenure: "Member for 2 years",
        avatar: "S",
        rating: 4
      }
    ],
    keyPlanFeatures: [
      {
        text: "Pre-Existing Conditions: **12-month waiting period**",
        isPositive: true,
        icon: "Clock",
        tooltip: "Shorter waiting period than many competitors"
      },
      {
        text: "Mental Health: **Included after IUA**",
        isPositive: true,
        icon: "Heart",
        tooltip: "Mental health services eligible for sharing after Initial Unshared Amount"
      },
      {
        text: "Prescription Drugs: **Discount program included**",
        isPositive: true,
        icon: "Pill",
        tooltip: "Access to prescription discount program for all members"
      }
    ]
  },
  
  // Sedera plans
  'sedera-select+': {
    overview: {
      whatWeLove: [
        "Sedera offers a **well-established healthcare sharing community** with strong member satisfaction",
        "**Transparent sharing guidelines** make it easy to understand what's eligible",
        "**Excellent member support** throughout the medical need process"
      ],
      keyFeatures: [
        "**Flexible Initial Unshared Amount** options to fit your budget",
        "**Unlimited sharing** for eligible medical needs",
        "**Medical bill negotiation** services included"
      ],
      providerInfo: "Founded in 2014, Sedera is a healthcare sharing community that has helped thousands of members share millions in medical expenses."
    },
    coverageDetails: {
      iuaExplanation: "**Per-need Initial Unshared Amount** with options ranging from $500 to $5,000.",
      networkInfo: "**No network restrictions** - see any provider you choose. Sedera helps negotiate fair prices.",
      includedServices: [
        {
          title: "Medical Cost Sharing",
          description: "**Unlimited sharing** for eligible medical needs after IUA"
        },
        {
          title: "Expert Medical Opinion",
          description: "**Second opinion service** for complex medical conditions"
        },
        {
          title: "Bill Negotiation",
          description: "**Professional negotiators** work to reduce your medical bills"
        }
      ]
    },
    medicalServices: {
      emergencyCare: "**Eligible for sharing** after Initial Unshared Amount. Includes emergency room visits and ambulance services.",
      surgeryAndTreatment: "**Eligible for sharing** after Initial Unshared Amount. Includes surgeries, hospital stays, and follow-up care.",
      prescriptionDrugs: "**Prescription discount program** included. Medications for eligible medical needs shareable for 120 days.",
      pregnancy: "**Maternity expenses** eligible for sharing after 10-month waiting period."
    },
    providerDetails: {
      yearEstablished: 2014,
      memberCount: "**70,000+**",
      memberSatisfaction: "4.8/5",
      averageTenure: "3.2 years",
      ratings: {
        overall: 4.8,
        reviewCount: 320,
        bbbRating: "**A+**"
      },
      processingTime: "**10-14 business days**",
      costTransparency: {
        medicalCostSharing: 82,
        administrativeCosts: 13,
        operationalReserves: 5
      },
      savingsVsInsurance: {
        averageMonthlySavings: "**35%** (per 2023 member survey)"
      }
    },
    testimonials: [
      {
        text: "**Sedera helped me navigate a complex surgery** and negotiated my bills down by 45%. Their support was incredible.",
        author: "James T.",
        highlight: "Excellent support",
        tenure: "Member for 3 years",
        avatar: "J",
        rating: 5
      },
      {
        text: "**I've saved over $12,000** compared to my previous insurance plan. The process is simple and transparent.",
        author: "Rebecca M.",
        highlight: "Significant savings",
        tenure: "Member for 2 years",
        avatar: "R",
        rating: 5
      }
    ],
    keyPlanFeatures: [
      {
        text: "Pre-Existing Conditions: **36-month waiting period**",
        isPositive: false,
        icon: "AlertCircle",
        tooltip: "Conditions treated in past 36 months have graduated sharing eligibility"
      },
      {
        text: "Mental Health: **Limited sharing**",
        isPositive: false,
        icon: "AlertCircle",
        tooltip: "Limited to $3,000 per need"
      },
      {
        text: "Unlimited Sharing: **No annual or lifetime caps**",
        isPositive: true,
        icon: "Check",
        tooltip: "No maximum limits on eligible medical needs"
      }
    ]
  },
  
  'sedera-access+': {
    overview: {
      whatWeLove: [
        "Sedera ACCESS+ offers **enhanced benefits** over the standard Sedera membership",
        "**Expanded sharing eligibility** for certain medical needs",
        "**Excellent member support** throughout the medical need process"
      ],
      keyFeatures: [
        "**Flexible Initial Unshared Amount** options to fit your budget",
        "**Unlimited sharing** for eligible medical needs",
        "**Enhanced preventive care** options"
      ],
      providerInfo: "Founded in 2014, Sedera is a healthcare sharing community that has helped thousands of members share millions in medical expenses."
    },
    coverageDetails: {
      iuaExplanation: "**Per-need Initial Unshared Amount** with options ranging from $500 to $5,000.",
      networkInfo: "**No network restrictions** - see any provider you choose. Sedera helps negotiate fair prices.",
      includedServices: [
        {
          title: "Medical Cost Sharing",
          description: "**Unlimited sharing** for eligible medical needs after IUA"
        },
        {
          title: "Expert Medical Opinion",
          description: "**Second opinion service** for complex medical conditions"
        },
        {
          title: "Enhanced Preventive Care",
          description: "**Expanded preventive services** compared to SELECT+"
        }
      ]
    },
    medicalServices: {
      emergencyCare: "**Eligible for sharing** after Initial Unshared Amount. Includes emergency room visits and ambulance services.",
      surgeryAndTreatment: "**Eligible for sharing** after Initial Unshared Amount. Includes surgeries, hospital stays, and follow-up care.",
      prescriptionDrugs: "**Enhanced prescription program** included. Medications for eligible medical needs shareable for 180 days.",
      pregnancy: "**Maternity expenses** eligible for sharing after 10-month waiting period with enhanced benefits."
    },
    providerDetails: {
      yearEstablished: 2014,
      memberCount: "**70,000+**",
      memberSatisfaction: "4.8/5",
      averageTenure: "3.2 years",
      ratings: {
        overall: 4.8,
        reviewCount: 320,
        bbbRating: "**A+**"
      },
      processingTime: "**10-14 business days**",
      costTransparency: {
        medicalCostSharing: 82,
        administrativeCosts: 13,
        operationalReserves: 5
      },
      savingsVsInsurance: {
        averageMonthlySavings: "**35%** (per 2023 member survey)"
      }
    },
    testimonials: [
      {
        text: "**Sedera helped me navigate a complex surgery** and negotiated my bills down by 45%. Their support was incredible.",
        author: "James T.",
        highlight: "Excellent support",
        tenure: "Member for 3 years",
        avatar: "J",
        rating: 5
      },
      {
        text: "**I've saved over $12,000** compared to my previous insurance plan. The process is simple and transparent.",
        author: "Rebecca M.",
        highlight: "Significant savings",
        tenure: "Member for 2 years",
        avatar: "R",
        rating: 5
      }
    ],
    keyPlanFeatures: [
      {
        text: "Pre-Existing Conditions: **36-month waiting period**",
        isPositive: false,
        icon: "AlertCircle",
        tooltip: "Conditions treated in past 36 months have graduated sharing eligibility"
      },
      {
        text: "Mental Health: **Enhanced sharing**",
        isPositive: true,
        icon: "Heart",
        tooltip: "Up to $5,000 per need"
      },
      {
        text: "Unlimited Sharing: **No annual or lifetime caps**",
        isPositive: true,
        icon: "Check",
        tooltip: "No maximum limits on eligible medical needs"
      }
    ]
  },
  
  'sedera-access+-+dpc/vpc': {
    overview: {
      whatWeLove: [
        "Sedera ACCESS+ with DPC/VPC offers **comprehensive healthcare** combining sharing with direct primary care",
        "**Unlimited primary care access** through DPC/VPC membership",
        "**Reduced Initial Unshared Amount** for needs referred by your DPC/VPC provider"
      ],
      keyFeatures: [
        "**Direct Primary Care** membership included",
        "**Unlimited sharing** for eligible medical needs",
        "**Enhanced preventive care** through your DPC/VPC provider"
      ],
      providerInfo: "Founded in 2014, Sedera is a healthcare sharing community that has helped thousands of members share millions in medical expenses."
    },
    coverageDetails: {
      iuaExplanation: "**Per-need Initial Unshared Amount** with options ranging from $500 to $5,000. **50% reduction** for needs referred by your DPC/VPC provider.",
      networkInfo: "**No network restrictions** for specialists - see any provider you choose. Primary care provided through your DPC/VPC membership.",
      includedServices: [
        {
          title: "Direct Primary Care",
          description: "**Unlimited access** to your primary care provider with no per-visit fees"
        },
        {
          title: "Medical Cost Sharing",
          description: "**Unlimited sharing** for eligible medical needs after IUA"
        },
        {
          title: "Enhanced Preventive Care",
          description: "**Comprehensive preventive services** through your DPC/VPC provider"
        }
      ]
    },
    medicalServices: {
      emergencyCare: "**Eligible for sharing** after Initial Unshared Amount. Includes emergency room visits and ambulance services.",
      surgeryAndTreatment: "**Eligible for sharing** after Initial Unshared Amount. Includes surgeries, hospital stays, and follow-up care.",
      prescriptionDrugs: "**Enhanced prescription program** included. Medications for eligible medical needs shareable for 180 days. Additional discounts through DPC/VPC provider.",
      pregnancy: "**Maternity expenses** eligible for sharing after 10-month waiting period with enhanced benefits."
    },
    providerDetails: {
      yearEstablished: 2014,
      memberCount: "**70,000+**",
      memberSatisfaction: "4.9/5",
      averageTenure: "3.5 years",
      ratings: {
        overall: 4.9,
        reviewCount: 320,
        bbbRating: "**A+**"
      },
      processingTime: "**10-14 business days**",
      costTransparency: {
        medicalCostSharing: 82,
        administrativeCosts: 13,
        operationalReserves: 5
      },
      savingsVsInsurance: {
        averageMonthlySavings: "**30%** (per 2023 member survey)"
      }
    },
    testimonials: [
      {
        text: "**Having unlimited access to my doctor** through DPC plus Sedera for larger medical needs is the perfect combination.",
        author: "Michael S.",
        highlight: "Perfect combination",
        tenure: "Member for 2 years",
        avatar: "M",
        rating: 5
      },
      {
        text: "**My DPC doctor caught a health issue early** that could have been much more serious. The value is incredible.",
        author: "Jennifer K.",
        highlight: "Preventive care value",
        tenure: "Member for 3 years",
        avatar: "J",
        rating: 5
      }
    ],
    keyPlanFeatures: [
      {
        text: "Direct Primary Care: **Unlimited access included**",
        isPositive: true,
        icon: "User",
        tooltip: "No per-visit fees for primary care visits"
      },
      {
        text: "Reduced IUA: **50% reduction for referred needs**",
        isPositive: true,
        icon: "DollarSign",
        tooltip: "Initial Unshared Amount reduced by 50% for needs referred by your DPC/VPC provider"
      },
      {
        text: "Unlimited Sharing: **No annual or lifetime caps**",
        isPositive: true,
        icon: "Check",
        tooltip: "No maximum limits on eligible medical needs"
      }
    ]
  },
  
  // Knew Health plans
  'knew-health-premium-hsa': {
    overview: {
      whatWeLove: [
        "Knew Health offers a **modern approach to healthcare sharing** with a focus on wellness",
        "**HSA-compatible** plan structure",
        "**Holistic health** approach with wellness incentives"
      ],
      keyFeatures: [
        "**HSA compatibility** for tax advantages",
        "**Wellness program** included",
        "**Telemedicine** access included"
      ],
      providerInfo: "Knew Health is a healthcare sharing community that emphasizes preventive care and wellness."
    },
    coverageDetails: {
      iuaExplanation: "**Annual Initial Unshared Amount** with options to fit your budget.",
      networkInfo: "**No network restrictions** - see any provider you choose.",
      includedServices: [
        {
          title: "Medical Cost Sharing",
          description: "**Sharing for eligible medical needs** after IUA"
        },
        {
          title: "Wellness Program",
          description: "**Comprehensive wellness resources** included"
        },
        {
          title: "Telemedicine",
          description: "**24/7 access** to virtual doctor visits"
        }
      ]
    },
    medicalServices: {
      emergencyCare: "**Eligible for sharing** after Initial Unshared Amount. Includes emergency room visits and ambulance services.",
      surgeryAndTreatment: "**Eligible for sharing** after Initial Unshared Amount. Includes surgeries, hospital stays, and follow-up care.",
      prescriptionDrugs: "**Prescription discount program** included. Medications for eligible medical needs may be shareable.",
      pregnancy: "**Maternity expenses** eligible for sharing after waiting period."
    },
    providerDetails: {
      yearEstablished: 2018,
      memberCount: "**15,000+**",
      memberSatisfaction: "4.5/5",
      averageTenure: "2.0 years",
      ratings: {
        overall: 4.5,
        reviewCount: 150,
        bbbRating: "**A-**"
      },
      processingTime: "**7-10 business days**",
      costTransparency: {
        medicalCostSharing: 80,
        administrativeCosts: 15,
        operationalReserves: 5
      },
      savingsVsInsurance: {
        averageMonthlySavings: "**35%** (per 2023 member survey)"
      }
    },
    testimonials: [
      {
        text: "**The HSA compatibility was a game-changer** for our family finances. We love the tax advantages.",
        author: "Michael R.",
        highlight: "HSA benefits",
        tenure: "Member for 2 years",
        avatar: "M",
        rating: 5
      },
      {
        text: "**The wellness program has helped me make positive changes** in my health habits.",
        author: "Jennifer T.",
        highlight: "Wellness focus",
        tenure: "Member for 1 year",
        avatar: "J",
        rating: 4
      }
    ],
    keyPlanFeatures: [
      {
        text: "HSA Compatible: **Tax advantages**",
        isPositive: true,
        icon: "DollarSign",
        tooltip: "Use pre-tax dollars for healthcare expenses"
      },
      {
        text: "Wellness Program: **Included with membership**",
        isPositive: true,
        icon: "Heart",
        tooltip: "Resources to improve your health and wellness"
      },
      {
        text: "Pre-Existing Conditions: **Waiting period applies**",
        isPositive: false,
        icon: "AlertCircle",
        tooltip: "Graduated sharing for pre-existing conditions"
      }
    ]
  },
  
  // MPB Health plans
  'mpb-health-care+': {
    overview: {
      whatWeLove: [
        "MPB Health Care+ offers **comprehensive healthcare sharing** with enhanced benefits",
        "**Strong Christian values** foundation",
        "**Excellent member support** throughout the medical need process"
      ],
      keyFeatures: [
        "**Enhanced sharing eligibility** for many medical needs",
        "**Maternity sharing** included",
        "**Prescription sharing** for eligible medications"
      ],
      providerInfo: "MPB Health is a Christian healthcare sharing ministry founded on biblical principles of sharing one another's burdens."
    },
    coverageDetails: {
      iuaExplanation: "**Annual Unshared Amount** options to fit your budget.",
      networkInfo: "**No network restrictions** - see any provider you choose.",
      includedServices: [
        {
          title: "Medical Cost Sharing",
          description: "**Sharing for eligible medical needs** after Annual Unshared Amount"
        },
        {
          title: "Maternity",
          description: "**Maternity sharing** included after waiting period"
        },
        {
          title: "Prescription Medications",
          description: "**Prescription sharing** for eligible medications"
        }
      ]
    },
    medicalServices: {
      emergencyCare: "**Eligible for sharing** after Annual Unshared Amount. Includes emergency room visits and ambulance services.",
      surgeryAndTreatment: "**Eligible for sharing** after Annual Unshared Amount. Includes surgeries, hospital stays, and follow-up care.",
      prescriptionDrugs: "**Prescription sharing** for eligible medications related to shareable medical needs.",
      pregnancy: "**Maternity expenses** eligible for sharing after waiting period."
    },
    providerDetails: {
      yearEstablished: 1995,
      memberCount: "**60,000+**",
      memberSatisfaction: "4.7/5",
      averageTenure: "4.5 years",
      ratings: {
        overall: 4.7,
        reviewCount: 280,
        bbbRating: "**A+**"
      },
      processingTime: "**10-14 business days**",
      costTransparency: {
        medicalCostSharing: 85,
        administrativeCosts: 10,
        operationalReserves: 5
      },
      savingsVsInsurance: {
        averageMonthlySavings: "**40%** (per 2023 member survey)"
      }
    },
    testimonials: [
      {
        text: "**MPB Health has been a blessing** for our family. The maternity sharing was excellent for our recent pregnancy.",
        author: "Sarah J.",
        highlight: "Maternity sharing",
        tenure: "Member for 3 years",
        avatar: "S",
        rating: 5
      },
      {
        text: "**I appreciate the Christian values** that guide this ministry. It's more than just healthcare.",
        author: "David M.",
        highlight: "Christian values",
        tenure: "Member for 5 years",
        avatar: "D",
        rating: 5
      }
    ],
    keyPlanFeatures: [
      {
        text: "Christian Values: **Biblical foundation**",
        isPositive: true,
        icon: "Heart",
        tooltip: "Founded on biblical principles of sharing one another's burdens"
      },
      {
        text: "Maternity: **Included after waiting period**",
        isPositive: true,
        icon: "User",
        tooltip: "Maternity expenses eligible for sharing after waiting period"
      },
      {
        text: "Pre-Existing Conditions: **Graduated sharing**",
        isPositive: false,
        icon: "AlertCircle",
        tooltip: "Graduated sharing schedule for pre-existing conditions"
      }
    ]
  },
  
  'mpb-health-direct': {
    overview: {
      whatWeLove: [
        "MPB Health Direct offers **straightforward healthcare sharing** with simple guidelines",
        "**Strong Christian values** foundation",
        "**Affordable monthly share** amounts"
      ],
      keyFeatures: [
        "**Simple sharing guidelines** that are easy to understand",
        "**Maternity sharing** included",
        "**Prescription discount program** included"
      ],
      providerInfo: "MPB Health is a Christian healthcare sharing ministry founded on biblical principles of sharing one another's burdens."
    },
    coverageDetails: {
      iuaExplanation: "**Annual Unshared Amount** options to fit your budget.",
      networkInfo: "**No network restrictions** - see any provider you choose.",
      includedServices: [
        {
          title: "Medical Cost Sharing",
          description: "**Sharing for eligible medical needs** after Annual Unshared Amount"
        },
        {
          title: "Maternity",
          description: "**Maternity sharing** included after waiting period"
        },
        {
          title: "Prescription Discount Program",
          description: "**Prescription discounts** for all medications"
        }
      ]
    },
    medicalServices: {
      emergencyCare: "**Eligible for sharing** after Annual Unshared Amount. Includes emergency room visits and ambulance services.",
      surgeryAndTreatment: "**Eligible for sharing** after Annual Unshared Amount. Includes surgeries, hospital stays, and follow-up care.",
      prescriptionDrugs: "**Prescription discount program** included. Medications for eligible medical needs may be shareable.",
      pregnancy: "**Maternity expenses** eligible for sharing after waiting period."
    },
    providerDetails: {
      yearEstablished: 1995,
      memberCount: "**60,000+**",
      memberSatisfaction: "4.6/5",
      averageTenure: "4.5 years",
      ratings: {
        overall: 4.6,
        reviewCount: 280,
        bbbRating: "**A+**"
      },
      processingTime: "**10-14 business days**",
      costTransparency: {
        medicalCostSharing: 85,
        administrativeCosts: 10,
        operationalReserves: 5
      },
      savingsVsInsurance: {
        averageMonthlySavings: "**45%** (per 2023 member survey)"
      }
    },
    testimonials: [
      {
        text: "**The simplicity of MPB Health Direct** is what I appreciate most. No complicated rules or fine print.",
        author: "Robert K.",
        highlight: "Simple guidelines",
        tenure: "Member for 2 years",
        avatar: "R",
        rating: 5
      },
      {
        text: "**We've saved thousands** compared to traditional insurance, and the Christian community is wonderful.",
        author: "Lisa P.",
        highlight: "Cost savings",
        tenure: "Member for 3 years",
        avatar: "L",
        rating: 5
      }
    ],
    keyPlanFeatures: [
      {
        text: "Christian Values: **Biblical foundation**",
        isPositive: true,
        icon: "Heart",
        tooltip: "Founded on biblical principles of sharing one another's burdens"
      },
      {
        text: "Simplicity: **Easy to understand guidelines**",
        isPositive: true,
        icon: "Check",
        tooltip: "Straightforward sharing guidelines without complicated rules"
      },
      {
        text: "Affordability: **Lower monthly shares**",
        isPositive: true,
        icon: "DollarSign",
        tooltip: "More affordable monthly share amounts compared to traditional insurance"
      }
    ]
  },
  
  'mpb-health-secure-hsa': {
    overview: {
      whatWeLove: [
        "MPB Health Secure HSA offers **HSA-compatible healthcare sharing**",
        "**Strong Christian values** foundation",
        "**Tax advantages** through HSA compatibility"
      ],
      keyFeatures: [
        "**HSA compatibility** for tax advantages",
        "**Higher Annual Unshared Amount** for lower monthly shares",
        "**Christian community** of like-minded members"
      ],
      providerInfo: "MPB Health is a Christian healthcare sharing ministry founded on biblical principles of sharing one another's burdens."
    },
    coverageDetails: {
      iuaExplanation: "**Higher Annual Unshared Amount** options for HSA compatibility.",
      networkInfo: "**No network restrictions** - see any provider you choose.",
      includedServices: [
        {
          title: "Medical Cost Sharing",
          description: "**Sharing for eligible medical needs** after Annual Unshared Amount"
        },
        {
          title: "HSA Compatibility",
          description: "**Structure allows for HSA contributions** with tax advantages"
        },
        {
          title: "Prescription Discount Program",
          description: "**Prescription discounts** for all medications"
        }
      ]
    },
    medicalServices: {
      emergencyCare: "**Eligible for sharing** after Annual Unshared Amount. Includes emergency room visits and ambulance services.",
      surgeryAndTreatment: "**Eligible for sharing** after Annual Unshared Amount. Includes surgeries, hospital stays, and follow-up care.",
      prescriptionDrugs: "**Prescription discount program** included. Medications for eligible medical needs may be shareable.",
      pregnancy: "**Maternity expenses** eligible for sharing after waiting period."
    },
    providerDetails: {
      yearEstablished: 1995,
      memberCount: "**60,000+**",
      memberSatisfaction: "4.7/5",
      averageTenure: "4.5 years",
      ratings: {
        overall: 4.7,
        reviewCount: 280,
        bbbRating: "**A+**"
      },
      processingTime: "**10-14 business days**",
      costTransparency: {
        medicalCostSharing: 85,
        administrativeCosts: 10,
        operationalReserves: 5
      },
      savingsVsInsurance: {
        averageMonthlySavings: "**40%** (per 2023 member survey)"
      }
    },
    testimonials: [
      {
        text: "**The HSA compatibility has been a financial blessing** for our family. We love the tax advantages.",
        author: "Thomas W.",
        highlight: "HSA benefits",
        tenure: "Member for 3 years",
        avatar: "T",
        rating: 5
      },
      {
        text: "**We've been able to save for future medical expenses** while having the security of healthcare sharing.",
        author: "Rebecca L.",
        highlight: "Financial planning",
        tenure: "Member for 2 years",
        avatar: "R",
        rating: 5
      }
    ],
    keyPlanFeatures: [
      {
        text: "HSA Compatible: **Tax advantages**",
        isPositive: true,
        icon: "DollarSign",
        tooltip: "Use pre-tax dollars for healthcare expenses"
      },
      {
        text: "Christian Values: **Biblical foundation**",
        isPositive: true,
        icon: "Heart",
        tooltip: "Founded on biblical principles of sharing one another's burdens"
      },
      {
        text: "Higher AUA: **Lower monthly shares**",
        isPositive: true,
        icon: "TrendingDown",
        tooltip: "Higher Annual Unshared Amount results in lower monthly share amounts"
      }
    ]
  },
  
  'mpb-health-premium-care': {
    overview: {
      whatWeLove: [
        "MPB Health Premium Care offers **comprehensive healthcare sharing** with premium benefits",
        "**Strong Christian values** foundation",
        "**Enhanced sharing eligibility** for many medical needs"
      ],
      keyFeatures: [
        "**Lower Annual Unshared Amount** options",
        "**Expanded sharing eligibility** for many medical needs",
        "**Christian community** of like-minded members"
      ],
      providerInfo: "MPB Health is a Christian healthcare sharing ministry founded on biblical principles of sharing one another's burdens."
    },
    coverageDetails: {
      iuaExplanation: "**Lower Annual Unshared Amount** options available.",
      networkInfo: "**No network restrictions** - see any provider you choose.",
      includedServices: [
        {
          title: "Medical Cost Sharing",
          description: "**Enhanced sharing for eligible medical needs** after Annual Unshared Amount"
        },
        {
          title: "Maternity",
          description: "**Comprehensive maternity sharing** included after waiting period"
        },
        {
          title: "Prescription Medications",
          description: "**Enhanced prescription sharing** for eligible medications"
        }
      ]
    },
    medicalServices: {
      emergencyCare: "**Eligible for sharing** after Annual Unshared Amount. Includes emergency room visits and ambulance services.",
      surgeryAndTreatment: "**Eligible for sharing** after Annual Unshared Amount. Includes surgeries, hospital stays, and follow-up care.",
      prescriptionDrugs: "**Enhanced prescription sharing** for eligible medications related to shareable medical needs.",
      pregnancy: "**Comprehensive maternity sharing** eligible after waiting period."
    },
    providerDetails: {
      yearEstablished: 1995,
      memberCount: "**60,000+**",
      memberSatisfaction: "4.8/5",
      averageTenure: "4.5 years",
      ratings: {
        overall: 4.8,
        reviewCount: 280,
        bbbRating: "**A+**"
      },
      processingTime: "**10-14 business days**",
      costTransparency: {
        medicalCostSharing: 85,
        administrativeCosts: 10,
        operationalReserves: 5
      },
      savingsVsInsurance: {
        averageMonthlySavings: "**30%** (per 2023 member survey)"
      }
    },
    testimonials: [
      {
        text: "**The premium benefits have given our family peace of mind** knowing we have comprehensive sharing available.",
        author: "Elizabeth C.",
        highlight: "Comprehensive benefits",
        tenure: "Member for 4 years",
        avatar: "E",
        rating: 5
      },
      {
        text: "**When I needed surgery, MPB Health was there** every step of the way with excellent support.",
        author: "James B.",
        highlight: "Excellent support",
        tenure: "Member for 3 years",
        avatar: "J",
        rating: 5
      }
    ],
    keyPlanFeatures: [
      {
        text: "Enhanced Benefits: **Comprehensive sharing**",
        isPositive: true,
        icon: "Plus",
        tooltip: "More comprehensive sharing eligibility compared to other plans"
      },
      {
        text: "Christian Values: **Biblical foundation**",
        isPositive: true,
        icon: "Heart",
        tooltip: "Founded on biblical principles of sharing one another's burdens"
      },
      {
        text: "Member Support: **Excellent service**",
        isPositive: true,
        icon: "Users",
        tooltip: "Dedicated member support throughout the medical need process"
      }
    ]
  },
  
  'mpb-health-premium-hsa': {
    overview: {
      whatWeLove: [
        "MPB Health Premium HSA offers **HSA-compatible healthcare sharing** with premium benefits",
        "**Strong Christian values** foundation",
        "**Tax advantages** through HSA compatibility"
      ],
      keyFeatures: [
        "**HSA compatibility** for tax advantages",
        "**Premium benefits** with expanded sharing eligibility",
        "**Christian community** of like-minded members"
      ],
      providerInfo: "MPB Health is a Christian healthcare sharing ministry founded on biblical principles of sharing one another's burdens."
    },
    coverageDetails: {
      iuaExplanation: "**HSA-compatible Annual Unshared Amount** structure.",
      networkInfo: "**No network restrictions** - see any provider you choose.",
      includedServices: [
        {
          title: "Medical Cost Sharing",
          description: "**Premium sharing for eligible medical needs** after Annual Unshared Amount"
        },
        {
          title: "HSA Compatibility",
          description: "**Structure allows for HSA contributions** with tax advantages"
        },
        {
          title: "Enhanced Benefits",
          description: "**Premium benefits** with expanded sharing eligibility"
        }
      ]
    },
    medicalServices: {
      emergencyCare: "**Eligible for sharing** after Annual Unshared Amount. Includes emergency room visits and ambulance services.",
      surgeryAndTreatment: "**Eligible for sharing** after Annual Unshared Amount. Includes surgeries, hospital stays, and follow-up care.",
      prescriptionDrugs: "**Enhanced prescription sharing** for eligible medications related to shareable medical needs.",
      pregnancy: "**Comprehensive maternity sharing** eligible after waiting period."
    },
    providerDetails: {
      yearEstablished: 1995,
      memberCount: "**60,000+**",
      memberSatisfaction: "4.8/5",
      averageTenure: "4.5 years",
      ratings: {
        overall: 4.8,
        reviewCount: 280,
        bbbRating: "**A+**"
      },
      processingTime: "**10-14 business days**",
      costTransparency: {
        medicalCostSharing: 85,
        administrativeCosts: 10,
        operationalReserves: 5
      },
      savingsVsInsurance: {
        averageMonthlySavings: "**35%** (per 2023 member survey)"
      }
    },
    testimonials: [
      {
        text: "**The combination of HSA benefits and premium sharing** is perfect for our family's healthcare strategy.",
        author: "William H.",
        highlight: "Perfect combination",
        tenure: "Member for 3 years",
        avatar: "W",
        rating: 5
      },
      {
        text: "**We've been able to save thousands in taxes** while having excellent healthcare sharing available.",
        author: "Katherine M.",
        highlight: "Tax savings",
        tenure: "Member for 2 years",
        avatar: "K",
        rating: 5
      }
    ],
    keyPlanFeatures: [
      {
        text: "HSA Compatible: **Tax advantages**",
        isPositive: true,
        icon: "DollarSign",
        tooltip: "Use pre-tax dollars for healthcare expenses"
      },
      {
        text: "Premium Benefits: **Enhanced sharing**",
        isPositive: true,
        icon: "Plus",
        tooltip: "More comprehensive sharing eligibility compared to other HSA plans"
      },
      {
        text: "Christian Values: **Biblical foundation**",
        isPositive: true,
        icon: "Heart",
        tooltip: "Founded on biblical principles of sharing one another's burdens"
      }
    ]
  },
  
  // Add more plans as needed...
}; 