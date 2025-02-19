'use client';

import Link from 'next/link';
import Image from 'next/image';

export function NavBar() {
  return (
    <header className="sticky top-0 bg-[#fff8f6]">
      <nav className="border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo.svg" 
                alt="Riff" 
                width={96} 
                height={32} 
                priority
              />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/about" className="text-[#4A4A4A]">About</Link>
              <Link href="/blog" className="text-[#4A4A4A]">Blog</Link>
              <Link href="/whats-a-healthshare" className="text-[#4A4A4A]">What's a Healthshare?</Link>
            </div>
            <Link href="/get-free-quote" className="px-4 py-2 rounded-lg bg-[#FF4F4F] text-white">
              Get Free Quote →
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 