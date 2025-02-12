import { ProviderAgeRules, AgeBracket, StandardAgeBracket } from '@/types/provider-plans';

export function getStandardAgeBracket(age: number): StandardAgeBracket | null {
  if (age >= 18 && age <= 29) return '18-29';
  if (age >= 30 && age <= 39) return '30-39';
  if (age >= 40 && age <= 49) return '40-49';
  if (age >= 50 && age <= 64) return '50-64';
  return null;
}

export function getAgeBracket(age: number, ageRules: ProviderAgeRules): AgeBracket | null {
  if (ageRules.type === 'custom' && ageRules.customBrackets) {
    const customRange = ageRules.customBrackets.ranges.find(
      range => age >= range.min && age <= range.max
    );
    return customRange?.bracket || null;
  }
  return getStandardAgeBracket(age);
} 