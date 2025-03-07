import { ProviderAgeRules, AgeBracket, StandardAgeBracket } from '@/types/provider-plans';

/**
 * Determines the standard age bracket for a given age
 */
export function getStandardAgeBracket(age: number): StandardAgeBracket | null {
  if (age >= 18 && age <= 29) return '18-29';
  if (age >= 30 && age <= 39) return '30-39';
  if (age >= 40 && age <= 49) return '40-49';
  if (age >= 50 && age <= 64) return '50-64';
  return null;
}

/**
 * Parses an age bracket string (e.g., "30-49") and checks if the given age falls within that range
 */
export function isAgeInBracket(age: number, bracketStr: string): boolean {
  console.log(`Checking if age ${age} is in bracket ${bracketStr}`);
  
  // Handle special case for brackets that might not follow the standard format
  if (bracketStr === 'all' || bracketStr === 'any') return true;
  
  const match = bracketStr.match(/^(\d+)-(\d+)$/);
  if (!match) {
    console.log(`Invalid bracket format: ${bracketStr}`);
    return false;
  }
  
  const minAge = parseInt(match[1], 10);
  const maxAge = parseInt(match[2], 10);
  
  const result = age >= minAge && age <= maxAge;
  console.log(`Age ${age} in range ${minAge}-${maxAge}? ${result}`);
  
  return result;
}

/**
 * Gets the appropriate age bracket for a given age based on the provider's age rules
 */
export function getAgeBracket(age: number, ageRules: ProviderAgeRules): AgeBracket | null {
  console.log(`Getting age bracket for age ${age} with rules:`, JSON.stringify(ageRules));
  
  // For custom age rules, use the defined ranges
  if (ageRules.type === 'custom' && ageRules.customBrackets) {
    console.log(`Using custom age brackets:`, JSON.stringify(ageRules.customBrackets));
    
    const customRange = ageRules.customBrackets.ranges.find(
      range => age >= range.min && age <= range.max
    );
    
    if (customRange) {
      console.log(`Found custom range: ${customRange.min}-${customRange.max} => ${customRange.bracket}`);
    } else {
      console.log(`No matching custom range found for age ${age}`);
    }
    
    return customRange?.bracket || null;
  }
  
  // For standard age rules, use the standard brackets
  const standardBracket = getStandardAgeBracket(age);
  console.log(`Using standard age bracket: ${standardBracket}`);
  
  return standardBracket;
}

/**
 * Finds all matching age brackets from a plan matrix for a given age
 */
export function findMatchingAgeBrackets(age: number, ageBrackets: string[]): string[] {
  console.log(`Finding matching age brackets for age ${age} from options:`, ageBrackets);
  
  const matches = ageBrackets.filter(bracket => isAgeInBracket(age, bracket));
  console.log(`Found ${matches.length} matching brackets:`, matches);
  
  return matches;
} 