import { getPlanComparison } from '@/utils/plan-utils';

describe('Performance Tests', () => {
  test('plan comparison completes within 100ms', () => {
    const start = performance.now();
    
    getPlanComparison('30-39', 'Member Only');
    
    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100);
  });

  test('handles large number of comparisons efficiently', () => {
    const iterations = 1000;
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      getPlanComparison('30-39', 'Member Only');
    }
    
    const duration = performance.now() - start;
    expect(duration / iterations).toBeLessThan(1); // Less than 1ms per iteration
  });
}); 