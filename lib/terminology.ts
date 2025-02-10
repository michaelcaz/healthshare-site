export interface TermDefinition {
  term: string
  shortDefinition: string
  longDefinition: string
  example?: string
  category: 'cost' | 'coverage' | 'medical' | 'healthshare'
}

export const terminology: TermDefinition[] = [
  {
    term: 'IUA',
    shortDefinition: 'Initial Unshared Amount',
    longDefinition: 'The amount you pay before the healthshare ministry begins sharing your medical expenses. Similar to a deductible in traditional insurance.',
    example: 'With a $1,000 IUA, you pay the first $1,000 of eligible medical expenses before cost sharing begins.',
    category: 'cost'
  },
  {
    term: 'Pre-existing Condition',
    shortDefinition: 'A health condition that existed before joining',
    longDefinition: 'Any medical condition that was present, diagnosed, or treated before becoming a member of the healthshare ministry. These conditions may have waiting periods or limited sharing.',
    example: 'Diabetes diagnosed 2 years ago would be considered a pre-existing condition.',
    category: 'medical'
  },
  {
    term: 'Sharing Percentage',
    shortDefinition: 'Portion of medical costs shared by members',
    longDefinition: 'The percentage of eligible medical expenses that are shared by the healthshare community after your IUA is met.',
    example: 'With 100% sharing, all eligible expenses are shared after meeting your IUA.',
    category: 'cost'
  },
  {
    term: 'Eligible Medical Expenses',
    shortDefinition: 'Medical costs that qualify for sharing',
    longDefinition: 'Healthcare expenses that meet the ministry\'s guidelines for sharing among members. These typically include medically necessary treatments and procedures.',
    category: 'healthshare'
  },
  {
    term: 'Monthly Share',
    shortDefinition: 'Monthly contribution amount',
    longDefinition: 'The amount you contribute each month to participate in the healthshare ministry. This is similar to a premium but is not insurance.',
    category: 'cost'
  },
  {
    term: 'Waiting Period',
    shortDefinition: 'Time before certain conditions are eligible',
    longDefinition: 'A specified time period that must pass before certain medical conditions or treatments become eligible for sharing.',
    example: 'Many plans have a 10-month waiting period for maternity expenses.',
    category: 'coverage'
  },
  {
    term: 'Annual Maximum',
    shortDefinition: 'Maximum sharing limit per year',
    longDefinition: 'The maximum amount of eligible medical expenses that can be shared in a 12-month period.',
    category: 'cost'
  },
  {
    term: 'Provider Network',
    shortDefinition: 'Group of healthcare providers',
    longDefinition: 'A group of doctors, hospitals, and other healthcare providers who may offer discounted rates to healthshare members. Unlike insurance, you can typically see any provider.',
    category: 'coverage'
  },
  {
    term: 'Statement of Beliefs',
    shortDefinition: 'Ministry\'s core values and beliefs',
    longDefinition: 'A document outlining the religious or ethical beliefs that members agree to abide by when joining the healthshare ministry.',
    category: 'healthshare'
  },
  {
    term: 'Sharing Guidelines',
    shortDefinition: 'Rules for medical cost sharing',
    longDefinition: 'The detailed rules and policies that govern what medical expenses are eligible for sharing and how the sharing process works.',
    category: 'healthshare'
  }
] 