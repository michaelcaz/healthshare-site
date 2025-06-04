"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.touches[0].clientY;
    const diff = touchStart - currentTouch;

    // If swiped up more than 50px, dismiss the bar
    if (diff > 50) {
      handleClose();
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        exit={{ y: -40 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full bg-primary text-white px-2 py-1 min-h-[40px] flex items-center justify-center text-center text-xs md:text-sm md:px-4 md:py-2 fixed top-0 left-0 right-0 z-[60] shadow"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <span className="flex-1 text-center break-words">
          Interested? Hop on the phone with a team member now – call us at{' '}
          <a href="tel:7372371055" className="underline font-medium hover:text-white/90 transition-colors">(737) 237-1055</a>
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
          className="ml-2 md:ml-4 p-1.5 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          <X className="h-5 w-5 text-white" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}; 