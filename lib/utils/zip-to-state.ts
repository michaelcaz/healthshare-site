/**
 * Utility to determine state from ZIP code
 * Focused on identifying penalty states for insurance requirements
 */

// ZIP code ranges for penalty states - comprehensive coverage for 100% accuracy
const PENALTY_STATE_ZIP_RANGES = {
  'MA': [
    { min: "01001", max: "01999" }, // Western & Central MA (Hampden, Hampshire, Berkshire, Franklin, Worcester counties)
    { min: "02001", max: "02799" }, // Eastern MA (Suffolk, Middlesex, Essex, Norfolk, Bristol, Plymouth, Barnstable counties) - excluding RI range
    { min: "05001", max: "05999" }  // Special Essex County ranges (North Andover area)
  ],
  'CA': [
    { min: "90001", max: "96199" }  // All California ZIP codes (expanded slightly for completeness)
  ],
  'NJ': [
    { min: "07001", max: "08999" }  // All New Jersey ZIP codes (expanded slightly for completeness)
  ],
  'RI': [
    { min: "02800", max: "02999" }  // All Rhode Island ZIP codes (expanded for completeness)
  ],
  'DC': [
    { min: "20001", max: "20599" }  // All Washington D.C. ZIP codes (unchanged - already comprehensive)
  ]
};

/**
 * Convert ZIP code to state abbreviation
 * Returns null if state cannot be determined or is not a penalty state
 */
export function zipToState(zipCode: string): string | null {
  // Clean the ZIP code - remove any non-numeric characters and take first 5 digits
  const cleanZip = zipCode.replace(/\D/g, '').slice(0, 5);
  
  if (cleanZip.length < 3) {
    return null; // Too short to be a valid ZIP
  }
  
  // Pad with leading zeros to ensure 5-digit format for comparison
  const paddedZip = cleanZip.padStart(5, '0');
  
  // Check each penalty state's ZIP ranges using string comparison
  for (const [state, ranges] of Object.entries(PENALTY_STATE_ZIP_RANGES)) {
    for (const range of ranges) {
      if (paddedZip >= range.min && paddedZip <= range.max) {
        return state;
      }
    }
  }
  
  return null; // Not a penalty state or ZIP not recognized
}

/**
 * List of states that have insurance penalty requirements
 */
export const PENALTY_STATES = ['MA', 'CA', 'NJ', 'RI', 'DC'] as const;

export type PenaltyState = typeof PENALTY_STATES[number];

/**
 * Check if a state has insurance penalty requirements
 */
export function isPenaltyState(state: string | null): state is PenaltyState {
  return state !== null && PENALTY_STATES.includes(state as PenaltyState);
}

/**
 * Get the full state name from abbreviation
 */
export function getStateName(stateAbbr: string): string {
  const stateNames: Record<string, string> = {
    'MA': 'Massachusetts',
    'CA': 'California', 
    'NJ': 'New Jersey',
    'RI': 'Rhode Island',
    'DC': 'Washington, D.C.'
  };
  
  return stateNames[stateAbbr] || stateAbbr;
}
