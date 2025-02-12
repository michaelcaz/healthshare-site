import { describe, it, expect } from 'vitest';
import { providerPlans } from '@/data/provider-plans';

describe('Provider Plans Data', () => {
  describe('CrowdHealth Plan', () => {
    const crowdHealthPlan = providerPlans.find(p => p.id === 'crowdhealth-basic');

    it('has correct age rules configuration', () => {
      expect(crowdHealthPlan?.ageRules.type).toEqual('custom');
      expect(crowdHealthPlan?.ageRules.customBrackets?.ranges.length).toEqual(2);
    });

    it('has correct pricing for single members', () => {
      const youngSingle = crowdHealthPlan?.planMatrix.find(
        m => m.ageBracket === '18-54' && m.householdType === 'Member Only'
      );
      const olderSingle = crowdHealthPlan?.planMatrix.find(
        m => m.ageBracket === '55-64' && m.householdType === 'Member Only'
      );

      expect(youngSingle?.costs[0].monthlyPremium).toEqual(195);
      expect(olderSingle?.costs[0].monthlyPremium).toEqual(335);
    });

    it('all plans have $500 IUA', () => {
      crowdHealthPlan?.planMatrix.forEach(matrix => {
        matrix.costs.forEach(cost => {
          expect(cost.initialUnsharedAmount).toEqual(500);
        });
      });
    });

    it('has correct household type variations', () => {
      const householdTypes = new Set(
        crowdHealthPlan?.planMatrix.map(m => m.householdType)
      );
      
      expect(householdTypes).toEqual(new Set([
        'Member Only',
        'Member & Spouse',
        'Member & Child(ren)',
        'Member & Family'
      ]));
    });
  });
}); 