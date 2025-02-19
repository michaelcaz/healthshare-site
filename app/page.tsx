import { Hero } from '@/components/marketing/Hero';
import { FAQ } from '@/components/marketing/FAQ';
import { SafetyNet } from '@/components/marketing/SafetyNet';
import { WhyHealthshare } from '@/components/marketing/WhyHealthshare';

export default function Home() {
  return (
    <div className="pt-16">
      <Hero />
      <WhyHealthshare />
      <FAQ />
      <SafetyNet />
    </div>
  );
}
