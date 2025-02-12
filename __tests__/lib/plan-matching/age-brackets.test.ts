import { describe, it, expect } from 'vitest';
import { getAgeBracket, getStandardAgeBracket } from '@/lib/plan-matching/age-brackets';
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
}); 