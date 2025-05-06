import { Hero } from '@/components/marketing/Hero';
import { FAQ } from '@/components/marketing/FAQ';
import { WhyHealthshare } from '@/components/marketing/WhyHealthshare';
import { ProgressiveLearning } from '@/components/marketing/ProgressiveLearning';
import { SafetyNet } from '@/components/marketing/SafetyNet';
import { ComparisonTable } from '@/components/marketing/ComparisonTable';

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <ComparisonTable />
      <WhyHealthshare />
      <ProgressiveLearning />
      <SafetyNet />
      <FAQ />
    </div>
  );
}
