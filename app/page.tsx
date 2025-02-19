import { Hero } from '@/components/marketing/Hero';
import { FAQ } from '@/components/marketing/FAQ';
import { WhyHealthshare } from '@/components/marketing/WhyHealthshare';
import { ProgressiveLearning } from '@/components/marketing/ProgressiveLearning';
import { SafetyNet } from '@/components/marketing/SafetyNet';
import { SocialProof } from '@/components/marketing/SocialProof';
import { RealTalk } from '@/components/marketing/RealTalk';
import { ComparisonTable } from '@/components/marketing/ComparisonTable';

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <WhyHealthshare />
      <ProgressiveLearning />
      <SafetyNet />
      <SocialProof />
      <RealTalk />
      <ComparisonTable />
      <FAQ />
    </div>
  );
}
