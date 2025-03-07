import { describe, it, expect } from 'vitest';
import { 
  getAgeBracket, 
  getStandardAgeBracket, 
  isAgeInBracket,
  findMatchingAgeBrackets
} from '@/lib/plan-matching/age-brackets';
import { ProviderAgeRules } from '@/types/provider-plans';

describe('Age Bracket Mapping', () => {
  describe('getStandardAgeBracket', () => {
    it('maps ages to correct standard brackets', () => {
      expect(getStandardAgeBracket(18)).toEqual('18-29');
      expect(getStandardAgeBracket(29)).toEqual('18-29');
      expect(getStandardAgeBracket(30)).toEqual('30-39');
      expect(getStandardAgeBracket(39)).toEqual('30-39');
      expect(getStandardAgeBracket(40)).toEqual('40-49');
      expect(getStandardAgeBracket(49)).toEqual('40-49');
      expect(getStandardAgeBracket(50)).toEqual('50-64');
      expect(getStandardAgeBracket(64)).toEqual('50-64');
    });

    it('returns null for out-of-range ages', () => {
      expect(getStandardAgeBracket(17)).toEqual(null);
      expect(getStandardAgeBracket(65)).toEqual(null);
    });
  });

  describe('getAgeBracket', () => {
    const standardRules: ProviderAgeRules = {
      type: 'standard'
    };

    const crowdHealthRules: ProviderAgeRules = {
      type: 'custom',
      customBrackets: {
        ranges: [
          { min: 18, max: 54, bracket: '18-54' },
          { min: 55, max: 64, bracket: '55-64' }
        ]
      }
    };

    test('handles standard age brackets correctly', () => {
      expect(getAgeBracket(25, standardRules)).toBe('18-29');
      expect(getAgeBracket(35, standardRules)).toBe('30-39');
      expect(getAgeBracket(45, standardRules)).toBe('40-49');
      expect(getAgeBracket(55, standardRules)).toBe('50-64');
    });

    test('handles CrowdHealth custom age brackets correctly', () => {
      // Test boundary conditions for 18-54 bracket
      expect(getAgeBracket(18, crowdHealthRules)).toBe('18-54');
      expect(getAgeBracket(35, crowdHealthRules)).toBe('18-54');
      expect(getAgeBracket(54, crowdHealthRules)).toBe('18-54');

      // Test boundary conditions for 55-64 bracket
      expect(getAgeBracket(55, crowdHealthRules)).toBe('55-64');
      expect(getAgeBracket(60, crowdHealthRules)).toBe('55-64');
      expect(getAgeBracket(64, crowdHealthRules)).toBe('55-64');
    });

    test('returns null for out-of-range ages', () => {
      expect(getAgeBracket(17, crowdHealthRules)).toBeNull();
      expect(getAgeBracket(65, crowdHealthRules)).toBeNull();
    });
  });
  
  describe('isAgeInBracket', () => {
    it('correctly determines if an age is within a bracket range', () => {
      // Standard brackets
      expect(isAgeInBracket(25, '18-29')).toBe(true);
      expect(isAgeInBracket(30, '18-29')).toBe(false);
      expect(isAgeInBracket(35, '30-39')).toBe(true);
      
      // Custom brackets
      expect(isAgeInBracket(45, '30-49')).toBe(true);
      expect(isAgeInBracket(50, '30-49')).toBe(false);
      expect(isAgeInBracket(55, '50-65')).toBe(true);
      expect(isAgeInBracket(60, '60-64')).toBe(true);
      expect(isAgeInBracket(59, '60-64')).toBe(false);
      
      // Edge cases
      expect(isAgeInBracket(18, '18-54')).toBe(true);
      expect(isAgeInBracket(54, '18-54')).toBe(true);
      expect(isAgeInBracket(17, '18-54')).toBe(false);
      expect(isAgeInBracket(55, '18-54')).toBe(false);
    });
    
    it('handles special bracket values', () => {
      expect(isAgeInBracket(25, 'all')).toBe(true);
      expect(isAgeInBracket(65, 'any')).toBe(true);
    });
    
    it('returns false for invalid bracket formats', () => {
      expect(isAgeInBracket(25, 'invalid')).toBe(false);
      expect(isAgeInBracket(25, '18+')).toBe(false);
      expect(isAgeInBracket(25, '')).toBe(false);
    });
  });
  
  describe('findMatchingAgeBrackets', () => {
    it('finds all brackets that match a given age', () => {
      const brackets = ['18-29', '30-39', '40-49', '50-64', '18-54', '55-64', '30-49', '50-65'];
      
      // Test with age 25
      const age25Brackets = findMatchingAgeBrackets(25, brackets);
      expect(age25Brackets).toContain('18-29');
      expect(age25Brackets).toContain('18-54');
      expect(age25Brackets.length).toBe(2);
      
      // Test with age 35
      const age35Brackets = findMatchingAgeBrackets(35, brackets);
      expect(age35Brackets).toContain('30-39');
      expect(age35Brackets).toContain('18-54');
      expect(age35Brackets).toContain('30-49');
      expect(age35Brackets.length).toBe(3);
      
      // Test with age 55
      const age55Brackets = findMatchingAgeBrackets(55, brackets);
      expect(age55Brackets).toContain('50-64');
      expect(age55Brackets).toContain('55-64');
      expect(age55Brackets).toContain('50-65');
      expect(age55Brackets.length).toBe(3);
    });
    
    it('returns empty array when no brackets match', () => {
      const brackets = ['18-29', '30-39', '40-49', '50-64'];
      expect(findMatchingAgeBrackets(17, brackets)).toEqual([]);
      expect(findMatchingAgeBrackets(65, brackets)).toEqual([]);
    });
  });
}); 