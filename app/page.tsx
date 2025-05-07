import { Hero } from '@/components/marketing/Hero';
import { FAQ } from '@/components/marketing/FAQ';
import { WhyHealthshare } from '@/components/marketing/WhyHealthshare';
import { ProgressiveLearning } from '@/components/marketing/ProgressiveLearning';
import { SafetyNet } from '@/components/marketing/SafetyNet';
import { ComparisonTable } from '@/components/marketing/ComparisonTable';
import { RealTalk } from '@/components/marketing/RealTalk';

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <ComparisonTable />
      <WhyHealthshare />
      <ProgressiveLearning />
      <RealTalk />
      <SafetyNet />
      <FAQ />
    </div>
  );
}
