import { Hero } from '@/components/marketing/Hero';
import { HealthshareExplainer } from '@/components/marketing/HealthshareExplainer';
import { HowItWorks } from '@/components/marketing/HowItWorks';
import { ComparisonTable } from '@/components/marketing/ComparisonTable';
import { RealTalk } from '@/components/marketing/RealTalk';
import { SocialProof } from '@/components/marketing/SocialProof';
import { FAQ } from '@/components/marketing/FAQ';
import { Feature } from '@/components/marketing/Feature';
import { SafetyNet } from '@/components/marketing/SafetyNet';

export default function Home() {
  return (
    <main className="relative">
      <div className="pt-16">
        <Hero />
        <Feature />
        <HealthshareExplainer />
        <HowItWorks />
        <SafetyNet />
        <ComparisonTable />
        <RealTalk />
        <SocialProof />
        <FAQ />
      </div>
    </main>
  );
}
