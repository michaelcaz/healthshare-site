"use client";

import { useEffect, useState } from "react";

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("announcementBarDismissed");
    if (dismissed === "true") setIsVisible(false);
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.documentElement.style.setProperty('--announcement-bar-height', '40px');
    } else {
      document.documentElement.style.setProperty('--announcement-bar-height', '0px');
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("announcementBarDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="w-full bg-primary text-white px-4 py-2 flex items-center justify-center text-center text-sm md:text-base fixed top-0 left-0 right-0 z-[60] h-[40px] shadow">
      <span className="flex-1 text-center">
        Interested? Hop on the phone with a team member now – call us at{' '}
        <a href="tel:2257188977" className="underline font-medium hover:text-white/90 transition-colors">(225) 718-8977</a>
        {' '}or{' '}
        <a
          href="https://calendly.com/michaelcaz/sharewize"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium hover:text-white/90 transition-colors"
        >
          book a time here
        </a>
      </span>
      <button
        aria-label="Dismiss announcement"
        onClick={handleClose}
        className="ml-4 text-white hover:text-white/90 transition-colors text-lg font-bold focus:outline-none"
      >
        ×
      </button>
    </div>
  );
}; 