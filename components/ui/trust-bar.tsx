'use client';

interface TrustBarProps {
  className?: string;
}

export function TrustBar({ className = '' }: TrustBarProps) {
  return (
    <div className={`flex flex-col sm:flex-row items-start gap-8 sm:gap-8 ${className}`}>
      {/* 1.7M Americans Section */}
      <div className="flex gap-4">
        {/* Text Content */}
        <div className="flex flex-col">
          <div className="text-xl sm:text-2xl font-bold text-gray-warm leading-tight flex items-center gap-3">
            1.7M
            {/* Overlapping Avatars - 4 custom images - inline with number */}
            <div className="flex -space-x-1.5">
              <div className="relative w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-300">
                <img
                  src="/images/social-photo-1.jpg"
                  alt="Healthshare Member"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="relative w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-300">
                <img
                  src="/images/social-photo-2.jpg"
                  alt="Healthshare Member"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="relative w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-300">
                <img
                  src="/images/social-photo-3.jpg"
                  alt="Healthshare Member"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="relative w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-300">
                <img
                  src="/images/social-photo-4.jpg"
                  alt="Healthshare Member"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-warm/80 leading-relaxed text-left">
            <div>Americans have ditched</div>
            <div>insurance for healthshares</div>
          </div>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="hidden sm:block w-px h-12 bg-gray-300 self-start mt-1"></div>

      {/* Top 4% Section */}
      <div className="text-left">
        <div className="text-xl sm:text-2xl font-bold text-gray-warm leading-tight">Top 4%</div>
        <div className="text-sm text-gray-warm/80 leading-relaxed">
          <div>of healthshare providers</div>
          <div>curated for you</div>
        </div>
      </div>
    </div>
  );
}
