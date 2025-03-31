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
        "Zion is the **MOST affordable health share plan** on the market with **monthly contributions starting at $82/mo for individuals**. Add RX Share for $10/mo (deep discounts on prescription meds) and/or Virtual Care for only $5/mo",
        "**Zero lifetime sharing limits** - unlike many competitors that cap at $1M or lower",
        "One of the **best avg. ratings (over 4.7/5 out of hundreds of reviews)** in the health share industry. No insurance company has ratings anywhere close.",
        "They have a **HUGE reserve** to protect their community in the event of some major nationwide health catastrophe - over 3x their yearly contribution amount.",
        "They have been very **transparent in all communications** with us, and as a non-profit are required to post their financials publicly on their site."
      ],
      keyFeatures: [
        "**Preventative Services included**:",
        "Annual Provider Visit",
        "Colorectal Cancer Screening",
        "Mammograms",
        "Youth Immunizations",
        "Well Child Visits",
        "We recommend reading through the membership guidelines to ensure you know the details of each of these as well as what's in the rest of the plan"
      ],
      providerInfo: "Founded in 2019, Zion HealthShare is a **501(c)(3) nonprofit** organization. They emphasize **price transparency** by publishing exact reimbursement rates for 300+ common procedures."
    },
    coverageDetails: {
      iuaExplanation: "The **Initial Unshared Amount (IUA)** is the amount you pay before your health share plan kicks in. For example, if you have a $1000 IUA and get an injury that results in $2300 of medical bills, you pay the first $1000, and the health share community pays the other $1300. Members are only required to pay their IUA a maximum of up to three times per rolling 12 month period.",
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
          description: "If you're injured or have any other eligible medical need, **therapeutic Treatments** prescribed and performed by a licensed medical professional are shareable for an eligible request, up to **$7,500 or 35 treatments per medical need**. Once either limit is reached, further treatments are no longer shareable. Therapeutic services include, but are not limited to:<br/><br/>• Alternative and/or integrative therapies such as acupuncture, craniosacral therapy, dry needling, ozone treatments, prolotherapy, and alternative infusion therapies.<br/>• Chiropractic treatments and services provided by licensed chiropractors.<br/>• Massage therapy and services provided by licensed massage therapists.<br/>• Physical therapy and services performed by licensed physical therapists."
        }
      ],
      pregnancy: "You must be a member for 6 months before conceiving, for your pregnancy related needs to be eligible for sharing. Services available for sharing include pre-natal, delivery (including birthing centers and home-births), post-natal, and miscarriage.",
      preExistingConditions: "Starting from the membership start date, there is a one-year waiting period before pre-membership medical conditions are eligible for sharing. After the waiting period, the amount eligible for sharing increases with each membership year:\n\n- **Year One**: $0 (waiting period)\n- **Year Two**: $25,000 maximum per sharing request\n- **Year Three**: $50,000 maximum per sharing request\n- **Year Four**: $125,000 maximum per sharing request"
    },
    medicalServices: {
      emergencyCare: "**ER visits are generally eligible for sharing**, whether or not they are in conjunction with an eligible medical need. The first ER visit for a medical condition is treated as a normal sharing request. Each additional visit related to the same condition requires the member to take on a personal responsibility of $500 in addition to the member's IUA.",
      surgeryAndTreatment: "**Covered for eligible medical needs**. For any non-emergency surgery, you can get prior authorization to ensure that your surgery will be fully shared.",
      prescriptionDrugs: "**Prescription medications** are considered eligible for sharing under the following conditions: 1. The prescription is related to the treatment of an eligible sharing request. 2. The prescription is ordered by a licensed provider. 3. The prescription is approved by Zion HealthShare. When these conditions are met, the member will be reimbursed for the cost or given a one-time use credit card for the exact cost of the prescription to take to the pharmacy and pay for their prescription. For all other medications, you can subscribe to **Zion RX Share** to order heavily discounted medications online or to pick up at your local pharmacy."
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
        text: "Wellness Incentives: **Preventative services included**",
        isPositive: true,
        icon: "Heart",
        tooltip: "Annual provider visits, screenings, and other preventative care"
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
      iuaExplanation: "The **Initial Unshared Amount (IUA)** is the amount you pay before your health share plan kicks in. For example, if you have a $1000 IUA and get an injury that results in $2300 of medical bills, you pay the first $1000, and the health share community pays the other $1300. Members are only required to pay their IUA a maximum of up to three times per rolling 12 month period.",
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
          description: "If you're injured or have any other eligible medical need, **therapeutic Treatments** prescribed and performed by a licensed medical professional are shareable for an eligible request, up to **$7,500 or 35 treatments per medical need**. Once either limit is reached, further treatments are no longer shareable. Therapeutic services include, but are not limited to:<br/><br/>• Alternative and/or integrative therapies such as acupuncture, craniosacral therapy, dry needling, ozone treatments, prolotherapy, and alternative infusion therapies.<br/>• Chiropractic treatments and services provided by licensed chiropractors.<br/>• Massage therapy and services provided by licensed massage therapists.<br/>• Physical therapy and services performed by licensed physical therapists."
        }
      ],
      pregnancy: "You must be a member for 6 months before conceiving, for your pregnancy related needs to be eligible for sharing. Services available for sharing include pre-natal, delivery (including birthing centers and home-births), post-natal, and miscarriage.",
      preExistingConditions: "Starting from the membership start date, there is a one-year waiting period before pre-membership medical conditions are eligible for sharing. After the waiting period, the amount eligible for sharing increases with each membership year:\n\n- **Year One**: $0 (waiting period)\n- **Year Two**: $25,000 maximum per sharing request\n- **Year Three**: $50,000 maximum per sharing request\n- **Year Four**: $125,000 maximum per sharing request"
    },
    medicalServices: {
      emergencyCare: "**ER visits are generally eligible for sharing**, whether or not they are in conjunction with an eligible medical need. The first ER visit for a medical condition is treated as a normal sharing request. Each additional visit related to the same condition requires the member to take on a personal responsibility of $500 in addition to the member's IUA.",
      surgeryAndTreatment: "**Covered for eligible medical needs**. For any non-emergency surgery, you can get prior authorization to ensure that your surgery will be fully shared.",
      prescriptionDrugs: "**Prescription medications** are considered eligible for sharing under the following conditions: 1. The prescription is related to the treatment of an eligible sharing request. 2. The prescription is ordered by a licensed provider. 3. The prescription is approved by Zion HealthShare. When these conditions are met, the member will be reimbursed for the cost or given a one-time use credit card for the exact cost of the prescription to take to the pharmacy and pay for their prescription. For all other medications, you can subscribe to **Zion RX Share** to order heavily discounted medications online or to pick up at your local pharmacy."
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
        text: "Wellness Incentives: **Preventative services included**",
        isPositive: true,
        icon: "Heart",
        tooltip: "Annual provider visits, screenings, and other preventative care"
      }
    ]
  },
  
  // CrowdHealth plans
  'crowdhealth-membership': {
    overview: {
      whatWeLove: [
        "They have THE HIGHEST average customer satisfaction of any health share organization (4.8 avg. with 450 reviews on TrustPilot and Google)",
        "They have one of the most innovative pricing models (that could make it one of, if not the, safest). You make two payments per month. 1. You pay a $55 fee per member, and that goes towards them running their business. Member advocacy, price negotiation team, customer support, etc. and anything left over is their profit.  2. Then you pay a second, variable amount, based on the needs of the community that goes into the community \"pot.\" This fee is up to $140/mo for members under 55, and up to $280/mo for members 55 and older, and up to $420 for families of four or more. The community pot is ONLY to cover the needs of members.",
        "Their platform is the most intuitive and easiest to use."
      ],
      keyFeatures: [
        "**CrowdNegotiate™ team** that helps members challenge medical bills",
        "**Price Transparency Dashboard** showing fair pricing for 500+ common procedures",
        "**24/7 telemedicine** included in all plans"
      ],
      providerInfo: "Founded in 2021, Crowd Health combines medical cost sharing with proactive bill negotiation technology. Their model empowers members to fight healthcare inflation through community support and direct price negotiation tools."
    },
    coverageDetails: {
      iuaExplanation: "With CrowdHealth, your IUA is set at **$500**. Preventive care visits are shareable immediately, while other expenses become shareable after meeting your Initial Unshared Amount (IUA). The IUA is the amount you pay before your health share plan kicks in. For example, if you get an injury that results in $2300 of medical bills, you pay the first $500, and the CrowdHealth community pays the other $1800.",
      networkInfo: "**No network restrictions**. You can see who you want. Members are encouraged to use CrowdHealth's negotiation tools with any provider. Higher savings typically achieved with Crowd-verified providers.",
      includedServices: [
        {
          title: "Wellness Checks",
          description: "CrowdHealth Members can submit up to **$300 for ONE basic wellness event** per year per member to be crowdfunded. This wellness event can be utilized for any one preventative or screening exam or test, performed by a licensed or board-certified practitioner"
        },
        {
          title: "Care Coordination",
          description: "**Dedicated team** helps coordinate care and negotiate prices"
        },
        {
          title: "Telemedicine",
          description: "**24/7 access** to virtual doctor visits"
        }
      ],
      pregnancy: "**10 Month Waiting Period and $3,000 IUA**: You, or your partner, must be a member for 10 months BEFORE conceiving, for your pregnancy related needs to be eligible for crowdfunding. Services available for sharing include pre-natal, delivery (including birthing centers and home-births), post-natal, and miscarriage. For pregnancy related needs, you will pay the first $3,000, and the rest will be eligible for crowd-funding.",
      preExistingConditions: "There are limitations on funding health events related to conditions that have been Previously Documented, Diagnosed, or Symptomatic.  This includes conditions such as asthma, congenital conditions (except for children who become CrowdHealth Members at birth), diabetes, genetic disorders, heart conditions, sleep apnea, and any other medical condition which was Previously Diagnosed, Documented, or Symptomatic.  This is not an exhaustive list.\n\nThose conditions that have been Previously Documented, Diagnosed, or Symptomatic within five (5) years of joining CrowdHealth are eligible for limited funding starting in the third year of Membership. This includes any condition that was diagnosed, symptomatic, suspected, or has required treatment. Specifically, any condition, illness, or injury that was Previously Documented, Diagnosed, or Symptomatic is not eligible for funding in years one and two of Membership, and a maximum crowdfunding limit of $25,000 per year related to these conditions applies in years three and following.\n\nHigh cholesterol and high blood pressure are not subject to these Previously Documented, Diagnosed, or Symptomatic Condition limitations."
    },
    medicalServices: {
      emergencyCare: "Emergency room visits, including medically necessary ambulance transport, are **eligible for full crowdfunding** after the IUA is met.",
      surgeryAndTreatment: "Surgeries are **eligible for full crowdfunding** after the IUA is met. For planned surgeries (like a knee replacement), it is recommended that you use CrowdHealth's negotiation tools before scheduling to ensure you get the highest value: highest quality + fairest price.",
      prescriptionDrugs: "For your prescriptions to be eligible for crowdfunding, you must use your prescription discount and choose a generic option if available when purchasing. You will show your RX discount card (accessible through your Member profile in the CrowdHealth app) at the pharmacy to get the best price, pay at checkout, and submit the prescription receipt through the app for crowdfunding. Maintenance prescription drug costs are eligible for crowdfunding are generally limited to a **120-day supply per valid health event**.",
      pregnancy: "**10 Month Waiting Period and $3,000 IUA**: You, or your partner, must be a member for 10 months BEFORE conceiving, for your pregnancy related needs to be eligible for crowdfunding."
    },
    providerDetails: {
      yearEstablished: 2021,
      memberCount: "**10,000+**",
      memberSatisfaction: "**97%**",
      averageTenure: "1.5 years",
      ratings: {
        overall: 4.8,
        reviewCount: 450,
        bbbRating: "**A-**"
      },
      processingTime: "**5-10 business days**",
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
        text: "**Crowd Health's negotiation team saved me $12,000** on an unexpected surgery bill. Their dashboard makes tracking contributions effortless.",
        author: "Jason W.",
        highlight: "Bill negotiation success",
        tenure: "Member for 1 year",
        avatar: "J",
        rating: 4.5
      },
      {
        text: "**I love controlling where my money goes each month**. The tiered plans let me choose coverage that matches my family's needs.",
        author: "Maria S.",
        highlight: "Flexible contributions",
        tenure: "Member for 3 years",
        avatar: "M",
        rating: 5
      },
      {
        text: "**I only paid $500 to be able to have my knee replaced**. The only thing I had to deal with was my physical therapy afterward, which was reimbursed in full.",
        author: "C. Street.",
        highlight: "Life-changing care",
        tenure: "Member for 4 years",
        avatar: "C",
        rating: 5
      }
    ],
    keyPlanFeatures: [
      {
        text: "Pre-Existing Conditions: **2-year waiting period**",
        isPositive: false,
        icon: "AlertCircle",
        tooltip: "Pre-existing conditions not eligible for funding in years 1-2, limited to $25,000/year in year 3+"
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
      networkInfo: "Sedera HealthShare is not health insurance, and they have no network limitations. However, wherever possible, it is suggested that you find a provider with fair-market prices. Their Medical Advocacy team can also assist you in identifying a provider in your area and making prepayments, or you can use their online portal to find a provider in your area.",
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
      ],
      pregnancy: "Maternity expenses eligible for sharing after 10-month waiting period."
    },
    medicalServices: {
      emergencyCare: "**Eligible for sharing** after Initial Unshared Amount. Includes emergency room visits and ambulance services.",
      surgeryAndTreatment: "**Eligible for sharing** after Initial Unshared Amount. Includes surgeries, hospital stays, and follow-up care.",
      prescriptionDrugs: "**Prescription discount program** included. Medications for eligible medical needs shareable for 120 days.",
      pregnancy: "Maternity expenses eligible for sharing after 10-month waiting period."
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
        "Sedera is one of the most affordable health share plans on the market with **monthly contributions starting at $132/mo for individuals**.",
        "**Zero lifetime sharing limits** - unlike many competitors that cap at $1M or lower",
        "**0% denial rate for eligible needs to date**. Incredible!",
        "They have been very **transparent in all communications** with us."
      ],
      keyFeatures: [
        "**No network restrictions** with price negotiation support through MDsave partnership",
        "**24/7 telemedicine services** included at no extra cost",
        "**Comprehensive maternity support** after 12-month waiting period"
      ],
      providerInfo: "Founded in 2014, Sedera is a membership-based non-insurance Community of like-minded individuals established for the purpose of sharing legitimate healthcare expenses between Members."
    },
    coverageDetails: {
      iuaExplanation: "The **Initial Unshared Amount (IUA)** is the amount you pay before your health share plan kicks in. For example, if you have a $1000 IUA and get an injury that results in $2300 of medical bills, you pay the first $1000, and the health share community pays the other $1300.",
      networkInfo: "Sedera HealthShare is not health insurance, and they have no network limitations. However, wherever possible, it is suggested that you find a provider with fair-market prices. Their Medical Advocacy team can also assist you in identifying a provider in your area and making prepayments, or you can use their online portal to find a provider in your area.",
      includedServices: [
        {
          title: "Preventive Care",
          description: "• **Annual Provider Visit**<br/>• **Colorectal Cancer Screening**<br/>• **Mammograms**<br/>• **Youth Immunizations**<br/>• **Adult Flu Shots**<br/><br/>Some of these are only available in certain circumstances. We highly recommend reading through the membership guidelines to ensure you know the details of each of these as well as what's in the rest of the plan"
        },
        {
          title: "Medical Advocacy",
          description: "The Sedera **Medical Advocacy team** is there to help you find high quality, fair-market providers in your area for anything from a primary care visit to a serious surgery. And if you ever get a huge bill, they are there to help negotiate the price down on your behalf."
        },
        {
          title: "Telemedicine",
          description: "**24/7 access** to virtual doctor visits included at no extra cost with your membership"
        }
      ],
      pregnancy: "You must be a member for 12 months before conceiving, for your pregnancy related needs to be eligible for sharing. Services available for sharing include pre-natal, delivery (including birthing centers and home-births), post-natal, and miscarriage. Regardless of your chosen IUA, there is a $5,000 IUA applied to normal vaginal deliveries and emergency C-Section deliveries. There is a $7,500 IUA applied to elective/planned C-Section deliveries.",
      preExistingConditions: "Starting from the membership start date, there is a one-year waiting period before pre-membership medical conditions are eligible for sharing. After the waiting period, the amount eligible for sharing increases with each membership year:<br/><br/>**Year One**: $0 (waiting period)<br/>**Year Two**: $15,000 maximum per sharing request<br/>**Year Three**: $30,000 maximum per sharing request<br/>**Year Four**: Fully Shareable"
    },
    medicalServices: {
      emergencyCare: "**ER visits, including medically necessary ambulance rides are generally eligible for sharing**. Air ambulance rides are eligible for sharing for up to $25,000.",
      surgeryAndTreatment: "**Surgical procedures are generally shareable after a 60-day waiting period**. Pre-authorization is required for non-emergency procedures over $3,000.",
      prescriptionDrugs: "**Acute condition medications shareable for 120-day supply**. Chronic medications require prior authorization. Maintenance medications for chronic conditions require prior authorization and are shareable for up to a 120-day supply. You also get access to Sedera's Rx Marketplace and GoodRx for additional prescription discounts for prescriptions related to eligible needs as well as those not related to an eligible need."
    },
    providerDetails: {
      yearEstablished: 2014,
      memberCount: "**30,000+**",
      memberSatisfaction: "4.5/5",
      averageTenure: "3.0 years",
      ratings: {
        overall: 4.48,
        reviewCount: 200,
        bbbRating: "**A+**"
      },
      processingTime: "**14-60 business days**",
      costTransparency: {
        medicalCostSharing: 85,
        administrativeCosts: 15,
        operationalReserves: 0
      },
      savingsVsInsurance: {
        averageMonthlySavings: "**30%** (per 2023 member survey)"
      }
    },
    testimonials: [
      {
        text: "**Sedera's price negotiation helped me save $8,000** on an MRI and surgery. The process was surprisingly smooth",
        author: "Michael R.",
        highlight: "Substantial procedure savings",
        tenure: "Member for 4 years",
        avatar: "M",
        rating: 5
      },
      {
        text: "**The telemedicine service has been a lifesaver** for our family's routine care needs",
        author: "Sarah L.",
        highlight: "Convenient telehealth access",
        tenure: "Member for 2 years",
        avatar: "S",
        rating: 4.5
      },
      {
        text: "**I have been a Sedera member for a little over a year**. Just recently I tore my ACL, resulting in a need for surgery. I was anxious about approaching surgery without traditional insurance. Thankfully, Sedera has made it a very positive experience!",
        author: "Lindsey D.",
        highlight: "I am confident in utilizing Sedera for my family's healthcare needs",
        tenure: "Member for 2 years",
        avatar: "L",
        rating: 5
      }
    ],
    keyPlanFeatures: [
      {
        text: "Pre-Existing Conditions: **Graduated sharing**",
        isPositive: true,
        icon: "Clock",
        tooltip: "Pre-existing conditions fully shareable after 3 years of membership"
      },
      {
        text: "Telemedicine: **Included at no extra cost**",
        isPositive: true,
        icon: "Phone",
        tooltip: "24/7 access to virtual doctor visits included with membership"
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
        "Sedera is one of the most affordable health share plans on the market with **monthly contributions starting at $132/mo for individuals**.",
        "**Zero lifetime sharing limits** - unlike many competitors that cap at $1M or lower",
        "**0% denial rate for eligible needs to date**. Incredible!",
        "They have been very **transparent in all communications** with us."
      ],
      keyFeatures: [
        "**Comprehensive maternity support** after 12-month waiting period",
        "**24/7 telemedicine services** included at no extra cost"
      ],
      providerInfo: "Founded in 2014, Sedera is a membership-based non-insurance Community of like-minded individuals established for the purpose of sharing legitimate healthcare expenses between Members."
    },
    coverageDetails: {
      iuaExplanation: "The **Initial Unshared Amount (IUA)** is the amount you pay before your health share plan kicks in. For example, if you have a $1000 IUA and get an injury that results in $2300 of medical bills, you pay the first $1000, and the health share community pays the other $1300.",
      networkInfo: "Sedera HealthShare is not health insurance, and they have no network limitations. However, wherever possible, it is suggested that you find a provider with fair-market prices. Their Medical Advocacy team can also assist you in identifying a provider in your area and making prepayments, or you can use their online portal to find a provider in your area.",
      includedServices: [
        {
          title: "Preventive Care",
          description: "• **Annual Provider Visit**<br/>• **Colorectal Cancer Screening**<br/>• **Mammograms**<br/>• **Youth Immunizations**<br/>• **Adult Flu Shots**<br/><br/>Some of these are only available in certain circumstances. We highly recommend reading through the membership guidelines to ensure you know the details of each of these as well as what's in the rest of the plan"
        },
        {
          title: "Medical Advocacy",
          description: "The Sedera **Medical Advocacy team** is there to help you find high quality, fair-market providers in your area for anything from a primary care visit to a serious surgery. And if you ever get a huge bill, they are there to help negotiate the price down on your behalf."
        },
        {
          title: "Telemedicine",
          description: "**24/7 access** to virtual doctor visits included at no extra cost with your membership"
        }
      ],
      pregnancy: "You must be a member for 12 months before conceiving, for your pregnancy related needs to be eligible for sharing. Services available for sharing include pre-natal, delivery (including birthing centers and home-births), post-natal, and miscarriage. Regardless of your chosen IUA, there is a $5,000 IUA applied to normal vaginal deliveries and emergency C-Section deliveries. There is a $7,500 IUA applied to elective/planned C-Section deliveries.",
      preExistingConditions: "Starting from the membership start date, there is a one-year waiting period before pre-membership medical conditions are eligible for sharing. After the waiting period, the amount eligible for sharing increases with each membership year:<br/><br/>**Year One**: $0 (waiting period)<br/>**Year Two**: $15,000 maximum per sharing request<br/>**Year Three**: $30,000 maximum per sharing request<br/>**Year Four**: Fully Shareable"
    },
    medicalServices: {
      emergencyCare: "**ER visits, including medically necessary ambulance rides are generally eligible for sharing**. Air ambulance rides are eligible for sharing for up to $25,000.",
      surgeryAndTreatment: "**Surgical procedures are generally shareable after a 60-day waiting period**. Pre-authorization is required for non-emergency procedures over $3,000.",
      prescriptionDrugs: "**Acute condition medications shareable for 120-day supply**. Chronic medications require prior authorization. Maintenance medications for chronic conditions require prior authorization and are shareable for up to a 120-day supply. You also get access to Sedera's Rx Marketplace and GoodRx for additional prescription discounts for prescriptions related to eligible needs as well as those not related to an eligible need."
    },
    providerDetails: {
      yearEstablished: 2014,
      memberCount: "**30,000+**",
      memberSatisfaction: "4.7/5",
      averageTenure: "3.2 years",
      ratings: {
        overall: 4.48,
        reviewCount: 200,
        bbbRating: "**A+**"
      },
      processingTime: "**14-60 business days**",
      costTransparency: {
        medicalCostSharing: 85,
        administrativeCosts: 15,
        operationalReserves: 0
      },
      savingsVsInsurance: {
        averageMonthlySavings: "**30%** (per 2023 member survey)"
      }
    },
    testimonials: [
      {
        text: "**The telemedicine service has been a lifesaver** for our family's routine care needs",
        author: "Sarah L.",
        highlight: "Convenient telehealth access",
        tenure: "Member for 2 years",
        avatar: "S",
        rating: 4.5
      },
      {
        text: "**I have been a Sedera member for a little over a year**. Just recently I tore my ACL, resulting in a need for surgery. I was anxious about approaching surgery without traditional insurance. Thankfully, Sedera has made it a very positive experience!",
        author: "Lindsey D.",
        highlight: "I am confident in utilizing Sedera for my family's healthcare needs",
        tenure: "Member for 2 years",
        avatar: "L",
        rating: 5
      }
    ],
    keyPlanFeatures: [
      {
        text: "Telemedicine: **Included at no extra cost**",
        isPositive: true,
        icon: "Phone",
        tooltip: "24/7 access to virtual doctor visits included with membership"
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
  'knew-health': {
    overview: {
      whatWeLove: [
        "They focus on holistic health with coverage for alternative therapies like acupuncture and chiropractic care",
        "They put a strong emphasis on preventive care and wellness incentives to reduce long-term costs",
        "Transparent pricing model with no lifetime sharing limits for eligible expenses"
      ],
      keyFeatures: [
        "Covers preventative services including annual physicals, well-woman visits, well-child visits from birth through age 18, standard screenings like mammograms, colonoscopies, and STD/STI screenings, birth control, and no cost or low cost lab work. You will not be limited in your choice of healthcare practitioner for preventive care and these costs will not be subject to your Initial Unshareable Amount (IUA).",
        "Loads of preventative care services like membership to a huge digital wellness provider, complimentary fitness and life coaching sessions and telemedicine."
      ],
      providerInfo: "Founded in 2017, Knew Health combines medical cost sharing with preventive care support. Their model emphasizes member education and holistic health approaches while maintaining affordability through community-based cost sharing."
    },
    coverageDetails: {
      iuaExplanation: "The Initial Unshared Amount (IUA) is the amount you pay before your health share plan kicks in. For example, if you have a $1000 IUA and get an injury that results in $2300 of medical bills, you pay the first $1000, and the health share community pays the other $1300.",
      networkInfo: "Knew Health is not health insurance, they have no network limitations. However, wherever possible, it is suggested that you find a provider with fair-market prices. Their Concierge Care team can also assist you in identifying a provider in your area and making prepayments, or you can use their online portal to find a provider in your area.",
      includedServices: [
        {
          title: "Two No Cost Personalized Health or Life Coaching Sessions",
          description: "Their one-on-one health coaching service helps you identify and reach your wellness goals, like improving sleep quality and diet, developing effective exercise habits, and supporting your mental health. Each year members can schedule with one of their health & life coaches, and receive two complimentary sessions."
        },
        {
          title: "Alternative Medicine",
          description: "Knew Health covers things like acupuncture, chiropractic care, and naturopathic medicine after you hit your IUA. Some alternative medicines may be used related to an eligible need, but you need to submit a decent amount of information to show why it's going to be more effective than a \"traditional medicine\" approach to even request that they be eligible for sharing. They also give every member a $200/yr allowance to use on preventative alternative medicine."
        },
        {
          title: "Access to FitOnHealth.com",
          description: "As a Knew Health member you get access to a digital wellness platform with the following services: Yoga, Meditation, Celebrity Workouts, Peloton Digital, Premium Workouts- Cardio, Pilates, Dance, HIIT, Barre, Strength, and more! Mindfulness & Sleep, Recipes & Nutrition- Gluten Free, Keto, Intermittent Fasting, Mediterranean Diet and more! Step Tracker & Challenges"
        },
        {
          title: "Telemedicine",
          description: "Knew Health offers complimentary, 24/7 unlimited access to help with urgent health concerns, like strep throat or urinary tract infection(UTI), from the comfort of your own home."
        },
        {
          title: "Urgent/Emergency Care",
          description: "Shares costs for emergency room visits and urgent care after IUA met."
        }
      ]
    },
    medicalServices: {
      emergencyCare: "Emergency care, ambulances, and airlifts eligible for sharing after meeting the IUA.",
      surgeryAndTreatment: "Surgeries and major treatments are generally shareable. Elective surgeries require pre-approval. Prior medical review and approval is required for non-emergent surgical procedures to be eligible to share. Chronic conditions have 12-month waiting period.",
      prescriptionDrugs: "Covers generic medications for acute conditions. Specialty drugs require prior authorization.",
      pregnancy: "12 Month Waiting Period: You must be a member for 12 months before conceiving, for your pregnancy related needs to be eligible for sharing. Services available for sharing include pre-natal, delivery (including birthing centers and home-births), post-natal, and miscarriage."
    },
    providerDetails: {
      yearEstablished: 2017,
      memberCount: "10,000+",
      memberSatisfaction: "94%",
      averageTenure: "3 years",
      ratings: {
        overall: 4.7,
        reviewCount: 137,
        bbbRating: "A"
      },
      processingTime: "7-14 business days",
      savingsVsInsurance: {
        averageMonthlySavings: "30-50%"
      }
    },
    testimonials: [
      {
        text: "Knew Health's wellness program helped me save on both healthcare costs and gym memberships. I'm paying half what I did for insurance.",
        author: "Sarah P.",
        highlight: "Wellness incentives",
        tenure: "Member for 4 years",
        avatar: "S",
        rating: 5
      },
      {
        text: "The acupuncture coverage was a game-changer for my chronic pain. Traditional insurance never covered this.",
        author: "Michael R.",
        highlight: "Alternative therapy coverage",
        tenure: "Member for 2 years",
        avatar: "M",
        rating: 4.5
      },
      {
        text: "My son had a knee injury in the summer that required surgery. Knew Health helped navigate the medical process and covered all expenses after we met the UIA. Communication and reimbursements were very timely and appreciated! I feel confident knowing Knew Health is there for my family when accidents happen.",
        author: "Gina H.",
        highlight: "Excellent support",
        tenure: "Member for 1 year",
        avatar: "G",
        rating: 5
      }
    ],
    keyPlanFeatures: [
      {
        text: "Holistic Health Focus",
        isPositive: true,
        icon: "Activity",
        tooltip: "Coverage for alternative therapies and preventive wellness care"
      },
      {
        text: "Comprehensive Wellness Platform",
        isPositive: true,
        icon: "Heart",
        tooltip: "Access to FitOnHealth.com with workouts, meditation, nutrition plans and more"
      },
      {
        text: "Health Coaching Sessions",
        isPositive: true,
        icon: "User",
        tooltip: "Two complimentary health coaching sessions per year"
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