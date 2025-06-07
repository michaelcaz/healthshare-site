import { Hero } from '@/components/marketing/Hero';
import { FAQ } from '@/components/marketing/FAQ';
import { ProgressiveLearning } from '@/components/marketing/ProgressiveLearning';
import { SafetyNet } from '@/components/marketing/SafetyNet';
import { ComparisonTable } from '@/components/marketing/ComparisonTable';
import { RealTalk } from '@/components/marketing/RealTalk';
import { MobileBottomCTAHome } from '@/components/ui/MobileBottomCTA'
import { TransparencySection } from '@/components/marketing/TransparencySection';
import { HealthcarePioneers } from '@/components/home/healthcare-pioneers';

export default function Home() {
  return (
    <div className="pt-[calc(var(--announcement-bar-height,40px)+56px)] md:pt-[calc(var(--announcement-bar-height,40px)+64px)]">
      <Hero />
      <TransparencySection />
      <ComparisonTable />
      <ProgressiveLearning />
      <RealTalk />
      <SafetyNet />
      <HealthcarePioneers />
      <FAQ />
      <MobileBottomCTAHome />
    </div>
  );
}
