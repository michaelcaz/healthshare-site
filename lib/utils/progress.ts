export function calculateProgress(currentStep: number): number {
  return Math.round((currentStep / 4) * 100)  // Changed from 5
} 