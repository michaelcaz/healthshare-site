'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function HealthcarePioneers() {
  const router = useRouter();

  const handleJoinRevolution = () => {
    router.push('/questionnaire');
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-white via-[#818CF8] to-[#6366F1]">
      {/* White overlay to soften background */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none" />
      {/* Subtle SVG background accent */}
      <svg className="absolute -top-32 -right-32 w-[40rem] h-[40rem] opacity-20 blur-2xl pointer-events-none" viewBox="0 0 700 700" fill="none">
        <circle cx="350" cy="350" r="350" fill="url(#indigoGradient)" />
        <defs>
          <radialGradient id="indigoGradient" cx="0.5" cy="0.5" r="0.5" gradientTransform="rotate(90 0.5 0.5) scale(1 1)">
            <stop stopColor="#6366F1" />
            <stop offset="1" stopColor="#818CF8" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-tight tracking-tight text-balance text-center mb-4 text-gray-warm" style={{ wordBreak: 'keep-all', hyphens: 'none' }}>
            Why Haven't I Heard of This <span className="text-gray-warm">Before?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Because <span className="text-[#6366F1] font-semibold">Healthcare</span> <span className="text-[#6366F1] font-semibold">Pioneers</span> discover things before they go mainstream
          </p>
          <p className="text-lg text-gray-600 italic">
            "Sounds like a scam," your friends will say.
          </p>
        </div>

        {/* Insight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="backdrop-blur-md bg-white/90 rounded-2xl p-8 border border-[#6366F1]/30 shadow-lg shadow-[#6366F1]/10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Remember Airbnb?</h3>
            <p className="text-gray-800">
              "You're letting strangers sleep in your house?!" Now millions trust it daily. Every innovation faces skeptics first.
            </p>
          </div>
          {/* Card 2 */}
          <div className="backdrop-blur-md bg-white/90 rounded-2xl p-8 border border-[#6366F1]/30 shadow-lg shadow-[#6366F1]/10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Quietly Working Since the 1980s</h3>
            <p className="text-gray-800">
              Health sharing started in Christian communities, then opened to everyone in the last decade. Proven track record, growing awareness.
            </p>
          </div>
          {/* Card 3 */}
          <div className="backdrop-blur-md bg-white/90 rounded-2xl p-8 border border-[#6366F1]/30 shadow-lg shadow-[#6366F1]/10">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why No Super Bowl Commercials?</h3>
            <p className="text-gray-800">
              Insurance companies spend billions on ads. Health shares are much smaller and rely on word-of-mouth from happy members.
            </p>
          </div>
        </div>

        {/* Stats section */}
        <div className="backdrop-blur-md bg-white/95 rounded-2xl p-8 border border-[#6366F1]/30 mb-16 shadow-lg shadow-[#6366F1]/10">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">The Numbers Don't Lie</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6366F1] mb-2">1.7M+</div>
              <p className="text-gray-700">Americans Participating</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6366F1] mb-2">98%+</div>
              <p className="text-gray-700">Approval on Eligible Claims</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#6366F1] mb-2">40+</div>
              <p className="text-gray-700">Years of Track Record</p>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="text-center">
          <p className="text-xl text-gray-700 mb-8">
            Join 1.7 million healthcare pioneers to finally get health care designed for you.
          </p>
          <button
            onClick={handleJoinRevolution}
            className="bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:scale-105 transition"
          >
            See My Savings in 60 Seconds
          </button>
        </div>
      </div>
    </section>
  );
} 