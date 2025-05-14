import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelectedPlans } from '@/components/recommendations/SelectedPlansContext';

interface CompareSnackbarProps {
  compareCount: number;
  onClose: () => void;
  isVisible: boolean;
}

export const CompareSnackbar: FC<CompareSnackbarProps> = ({ compareCount, onClose, isVisible }) => {
  const { openComparisonModal } = useSelectedPlans();
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="hidden md:flex mx-auto mt-12 mb-8"
          role="status"
          aria-live="polite"
        >
          <div className="rounded-xl shadow-2xl bg-white border border-gray-200 px-6 py-4 flex items-center gap-4">
            <button
              className="bg-amber-500 text-white px-6 py-2 rounded-lg font-medium text-base transition-all duration-200 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
              onClick={openComparisonModal}
              aria-label={`Compare ${compareCount} plans`}
            >
              Compare {compareCount} Plan{compareCount !== 1 ? 's' : ''}
            </button>
            <button
              className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={onClose}
              aria-label="Dismiss compare snackbar"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 