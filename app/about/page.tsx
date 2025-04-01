import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'About | ShareWell',
  description: 'Learn why ShareWell exists and our mission to revolutionize healthcare coverage',
}

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-12 px-5 max-w-4xl">
        <div className="mb-10">
          <Link 
            href="/"
            className="text-primary hover:text-primary/80 transition-colors inline-flex items-center font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-8 text-gray-900">About ShareWell</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Why We Exist</h2>
            <p className="leading-relaxed mb-6">
              Remember that moment when you realize something you've believed your entire life might not be true?
              That's what happened to me with health insurance.
            </p>
            <p className="leading-relaxed mb-6">
              Hey, I'm Michael Caz, and like many Americans, I spent my entire life assuming traditional health insurance 
              was the only legitimate way to protect my family's health. Then life threw me a curveball.
            </p>
            <p className="leading-relaxed mb-6">
              2021 was our first year using the dreaded marketplace.gov to get insurance. I suddenly had to navigate 
              the maze of health insurance options on my own. My first year was a nightmare: $1,200 monthly premiums 
              for my family of three, atrocious customer service, and over $31,400 in combined premiums and max out-of-pocket costs. 
              Of course the plan covered literally nothing because we're health nuts and rarely need to go to the doctor.
            </p>
            <p className="leading-relaxed mb-6">
              So when renewal time came around, I did what any rational person would do: I poured myself an industrial-sized 
              cup of coffee and prepared to waste another full day of my life comparing terrible options.
            </p>
            <p className="leading-relaxed mb-6">
              That's when my wife suggested I call our friend Pat.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">The Moment Everything Changed</h2>
            <p className="leading-relaxed mb-6">
              Pat had been telling me about something called "health sharing" for years. I'd always dismissed it as some kind of snake oil. 
              But here was Pat, paying less than HALF what I was for his larger family, with years of positive experiences to back it up.
            </p>
            <p className="leading-relaxed mb-6">
              Desperate and curious, I finally looked into it.
            </p>
            <p className="leading-relaxed mb-6">
              Fast forward to today: our family of (almost) five pays around $700 monthly for comprehensive coverage through 
              a combination of a catastrophic health share plan that we pair with direct primary care (DPC) membership. 
              That's a savings of thousands each year – money we now use to see the providers WE choose, often at cash prices 
              that are a fraction of the "insurance rate." Plus, with our DPC membership, our kids are getting the best care 
              they've ever gotten, and it's 10x more convenient than seeing someone in a big hospital.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">The Problem We're Solving</h2>
            <p className="leading-relaxed mb-6">
              Here's what keeps me up at night: it took me over 100 hours of research to figure all this out. 
              Most Americans don't have that kind of time, so they stay trapped in a system that doesn't serve them.
            </p>
            <p className="leading-relaxed mb-6">
              That's why this marketplace exists.
            </p>
            <p className="leading-relaxed mb-6">
              We're building what I wish existed when I was searching – a straightforward, honest platform that helps you:
            </p>
            <ul className="list-disc pl-6 mt-4 mb-6 space-y-3">
              <li>Understand how health sharing actually works (and how it differs from insurance)</li>
              <li>Compare legitimate, reputable options side-by-side</li>
              <li>Choose a plan that aligns with your family's specific needs and values</li>
              <li>Feel confident in your decision</li>
              <li>Take those thousands in savings to invest in your actual health and fitness rather than padding corporate profits, or just pocket it to do whatever you want with!</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Let's Be Crystal Clear About What This Is (and Isn't)</h2>
            <p className="leading-relaxed mb-6">
              Health sharing isn't traditional insurance. They're able to keep costs so low by:
            </p>
            <ul className="list-disc pl-6 mt-4 mb-6 space-y-3">
              <li>Encouraging all members to pay their smaller medical bills in cash, up front, and then submit their receipt for reimbursement. The cash pay price is almost always astronomically lower than insurance rates.</li>
              <li>Implementing waiting periods before covering pre-existing conditions.</li>
              <li>Negotiating all big medical bills directly with the provider, fighting for fair prices, and saving the community thousands, tens of thousands in return.</li>
            </ul>
            <p className="leading-relaxed mb-6">
              With health share plans there's no legal contract requiring payment of claims. Instead, these are communities 
              where members voluntarily share each other's medical expenses according to clear guidelines.
            </p>
            <p className="leading-relaxed mb-6">
              When I first discovered this fact, it seemed scary to me. Then I realized how few people that are denied 
              eligible claims by their insurance company actually go all the way to court and win enough to make it worth it. 
              Compared to how many claims are denied, it's almost none. Instead the insurance companies grind people down 
              with their Delay, Deny and Defend system. Most people give up, and for the few that make it to the legal system, 
              most take a low ball settlement to get it over with (since they've already spent 2-3+ years of their life fighting it at this point).
            </p>
            <p className="leading-relaxed mb-6">
              "How safe is insurance, really?" I thought.
            </p>
            <p className="leading-relaxed mb-6">
              Then I asked myself in reference to these health share plans, "What would I have to see in order to trust 
              that these plans have my back if my wife gets cancer? Or my son gets a rare disease and is in and out of the ER?"
            </p>
            <p className="leading-relaxed mb-6">
              I decided that I'd need to:
            </p>
            <ul className="list-disc pl-6 mt-4 mb-6 space-y-3">
              <li>See hundreds, if not thousands, of positive reviews on third-party review sites and a high avg. rating.</li>
              <li>See loads of testimonials on these third-party review sites of members that had catastrophic things happen that were covered by their health share plan.</li>
              <li>Understand what measures they had in place to protect their community against poor business practices (leading to them not having enough funds to cover the needs of their members) or some major national health crisis.</li>
            </ul>
            <p className="leading-relaxed mb-6">
              It took me some time, but I identified a number of health share providers that fit every one of those criteria, 
              leading me to believe that this is the beginning of a major revolution in healthcare.
            </p>
            <p className="leading-relaxed mb-6">
              Is it perfect? No. Is it right for everyone? Definitely not.
            </p>
            <p className="leading-relaxed mb-6">
              But for many self-employed individuals, entrepreneurs, and families caught in the middle 
              (making too much for subsidies but not enough to comfortably afford $17,000 out of pocket maximums + huge monthly premiums), 
              it can be a legitimate alternative worth considering.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Promise to You</h2>
            <p className="leading-relaxed mb-6">
              We promise to:
            </p>
            <ul className="list-disc pl-6 mt-4 mb-6 space-y-3">
              <li><strong>Be transparent.</strong> We'll always be upfront about both the benefits AND limitations of health sharing.</li>
              <li><strong>Be thorough.</strong> We only list organizations with established track records and stellar member experiences (we currently only list companies that have over a 4.5/5 avg review or higher) on the marketplace.</li>
              <li><strong>Be independent.</strong> While we do earn commissions when you enroll (that's how we keep the lights on), we represent multiple organizations and prioritize finding your best fit.</li>
              <li><strong>Be respectful.</strong> Your healthcare decisions are deeply personal. We're here to inform, not pressure.</li>
              <li><strong>Be a little irreverent.</strong> Healthcare is serious, but that doesn't mean the process of finding coverage has to be soul-crushing.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">A Personal Note</h2>
            <p className="leading-relaxed mb-6">
              The American healthcare system is broken in many ways. Premiums have outpaced inflation for decades. 
              Networks get narrower each year. Deductibles keep climbing.
            </p>
            <p className="leading-relaxed mb-6">
              For too long, we've accepted this as "just the way things are."
            </p>
            <p className="leading-relaxed mb-6">
              I believe we deserve better. Sometimes better solutions don't come from waiting for the system to fix itself, 
              but from communities creating alternatives.
            </p>
            <p className="leading-relaxed mb-6">
              Health sharing isn't a perfect solution, but for my family and a couple million others, 
              it's provided a path to better care at lower costs.
            </p>
            <p className="leading-relaxed mb-6">
              I'm excited to help you explore whether it might do the same for yours.
            </p>
            <div className="mt-8 mb-6">
              <Link 
                href="/questionnaire"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Start Here →
              </Link>
            </div>
          </section>

          <div className="mt-16 text-sm text-gray-500 border-t pt-6">
            <p>
              Note: This marketplace provides information to help you make educated decisions about health sharing programs. 
              We are not medical providers, insurance brokers, or financial advisors. Always read plan guidelines carefully 
              and consider consulting with a financial professional before making healthcare decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 