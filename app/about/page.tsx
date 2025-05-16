import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'About Us | Sharewize Health',
  description: 'Learn about our mission to help families find the right healthshare plans for their needs.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 lg:pt-32">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Why We Exist
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Remember that moment when you realize something you've believed your entire life might not be true?
            That's what happened to me with health insurance.
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-16 space-y-6">
          <p className="text-gray-700">
            Hey, I'm <strong>Michael Caz</strong>, and like many Americans, I spent my entire life assuming traditional health insurance was the only legitimate way to protect my family's health. Then life threw me a curveball.
          </p>
          <p className="text-gray-700">
            <strong>2021 was our first year using the dreaded marketplace.gov to get insurance.</strong> I suddenly had to navigate the maze of health insurance options on my own. My first year was a nightmare: <span className="font-semibold">$1,200 monthly premiums</span> for my family of three, atrocious customer service, and over <span className="font-semibold">$31,400 in combined premiums and max out-of-pocket costs</span>. Of course the plan covered literally nothing because we're health nuts and rarely need to go to the doctor.
          </p>
          <p className="text-gray-700">
            So when renewal time came around, I did what any rational person would do: <em>I poured myself an industrial-sized cup of coffee and prepared to waste another full day of my life comparing terrible options.</em>
          </p>
          <p className="text-gray-700">
            That's when my wife suggested I call our friend Pat.
          </p>
        </div>

        {/* The Moment Everything Changed */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            The Moment Everything Changed
          </h2>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-700">
              Pat had been telling me about something called <strong>"health sharing"</strong> for years. I'd always dismissed it as some kind of snake oil. But here was Pat, paying <span className="font-semibold">less than HALF</span> what I was for his larger family, with years of positive experiences to back it up.
            </p>
            <p className="text-gray-700">
              Desperate and curious, I finally looked into it.
            </p>
            <p className="text-gray-700">
              Today, our family of five spends about <span className="font-semibold">$324 per month</span> on a catastrophic healthshare plan. For everyday care, we combine that with a direct primary care (DPC) membership for our kids, which costs roughly <span className="font-semibold">$100 per child per month</span> at a local pediatrician's office.
            </p>
            <p className="text-gray-700">
              Altogether, this setup saves us around <strong>$10,000 a year</strong> compared to traditional insurance. We now use that savings to pay cash for the providers we choose—often at rates far lower than the inflated <em>"insurance prices."</em>
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">And the care? It's better than ever.</span> Our kids are getting the highest quality care we've found, and it's <span className="font-semibold">10x more convenient</span> than dealing with a big hospital system.
            </p>
          </div>
        </div>

        {/* The Problem We're Solving */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            The Problem We're Solving
          </h2>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-700">
              <span className="font-semibold">Here's what keeps me up at night:</span> it took me over <span className="font-semibold">100 hours of research</span> to figure all this out. Most Americans don't have that kind of time, so they stay trapped in a system that doesn't serve them.
            </p>
            <p className="text-gray-700">
              That's why this marketplace exists.
            </p>
            <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-md">
              <p className="text-gray-700 mb-2 font-semibold">We're building what I wish existed when I was searching – a straightforward, honest platform that helps you:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Understand</strong> how health sharing actually works (and how it differs from insurance)</li>
                <li><strong>Compare</strong> the most legitimate, reputable options side-by-side</li>
                <li><strong>Choose</strong> a plan that aligns with your family's specific needs and values</li>
                <li><strong>Feel confident</strong> in your decision</li>
                <li><strong>Take those thousands in savings</strong> to invest in your actual health and fitness rather than padding corporate profits, or just pocket it to do whatever you want with!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* What This Is (and Isn't) */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Let's Be Crystal Clear About What This Is (and Isn't)
          </h2>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-700">
              <strong>Health sharing isn't traditional insurance.</strong> They're able to keep costs so low by:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Encouraging all members</strong> to pay their smaller medical bills in cash, up front, and then submit their receipt for reimbursement. The cash pay price is almost always astronomically lower than insurance rates.</li>
              <li><strong>Implementing waiting periods</strong> before covering pre-existing conditions.</li>
              <li><strong>Negotiating all big medical bills</strong> directly with the provider, fighting for fair prices, and saving the community thousands, tens of thousands in return.</li>
            </ul>
            <p className="text-gray-700">
              With health share plans there's <span className="font-semibold">no legal contract requiring payment of claims</span>. Instead, these are communities where members voluntarily share each other's medical expenses according to clear guidelines.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
              <p className="text-gray-800 italic">
                When I first discovered this fact, it seemed scary to me. Then I realized how few people that are denied eligible claims by their insurance company actually go all the way to court and win enough to make it worth it. Compared to how many claims are denied, it's almost none. Instead the insurance companies grind people down with their Delay, Deny and Defend system. Most people give up, and for the few that make it to the legal system, most take a low ball settlement to get it over with (since they've already spent 2-3+ years of their life fighting it at this point).
              </p>
            </div>
            <p className="text-gray-700 font-semibold">
              "How safe is insurance, really?" I thought.
            </p>
            <p className="text-gray-700">
              Then I asked myself in reference to these health share plans, <em>"What would I have to see in order to trust that these plans have my back if my wife gets cancer? Or my son gets a rare disease and is in and out of the ER?"</em>
            </p>
            <p className="text-gray-700">
              I decided that I'd need to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>See hundreds, if not thousands,</strong> of positive reviews on third-party review sites and a high avg. rating.</li>
              <li><strong>See loads of testimonials</strong> on these third-party review sites of members that had catastrophic things happen that were covered by their health share plan.</li>
              <li><strong>Understand what measures</strong> they had in place to protect their community against poor business practices (leading to them not having enough funds to cover the needs of their members) or some major national health crisis.</li>
            </ul>
            <p className="text-gray-700">
              It took me some time, but I identified a number of health share providers that fit every one of those criteria, leading me to believe that this is the beginning of a major revolution in healthcare.
            </p>
            <p className="text-gray-700 font-semibold">
              Is it perfect? No. Is it right for everyone? Definitely not.
            </p>
            <p className="text-gray-700">
              But for many self-employed individuals, entrepreneurs, and families caught in the middle (making too much for subsidies but not enough to comfortably afford $17,000 out of pocket maximums + huge monthly premiums), it can be a legitimate alternative worth considering.
            </p>
          </div>
        </div>

        {/* Our Promise */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Promise to You
          </h2>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-700">We promise to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Be transparent.</strong> We'll always be upfront about both the benefits AND limitations of health sharing.</li>
              <li><strong>Be thorough.</strong> We only list organizations with established track records and stellar member experiences (we currently only list companies that have over a 4.5/5 avg review or higher) on the marketplace.</li>
              <li><strong>Be independent.</strong> While we do earn commissions when you enroll (that's how we keep the lights on), we represent multiple organizations and prioritize finding your best fit.</li>
              <li><strong>Be respectful.</strong> Your healthcare decisions are deeply personal. We're here to inform, not pressure.</li>
              <li><strong>Be a little irreverent.</strong> Healthcare is serious, but that doesn't mean the process of finding coverage has to be soul-crushing.</li>
            </ul>
          </div>
        </div>

        {/* Personal Note */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            A Personal Note
          </h2>
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-700">
              The American healthcare system is broken in many ways. <span className="font-semibold">Premiums have outpaced inflation for decades. Networks get narrower each year. Deductibles keep climbing.</span>
            </p>
            <p className="text-gray-700">
              For too long, we've accepted this as <em>"just the way things are."</em>
            </p>
            <p className="text-gray-700">
              I believe we deserve better. Sometimes better solutions don't come from waiting for the system to fix itself, but from communities creating alternatives.
            </p>
            <p className="text-gray-700">
              Health sharing isn't a perfect solution, but for my family and a couple million others, it's provided a path to better care at lower costs.
            </p>
            <p className="text-gray-700 font-semibold">
              I'm excited to help you explore whether it might do the same for yours.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/questionnaire"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Start Here →
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 text-sm text-gray-500 text-center">
          <p>
            Note: This marketplace provides information to help you make educated decisions about health sharing programs. We are not medical providers, insurance brokers, or financial advisors. Always read plan guidelines carefully and consider consulting with a financial professional before making healthcare decisions.
          </p>
        </div>
      </div>
    </div>
  )
} 