// Update the interface if it includes any review-related types
interface ProgressIndicatorProps {
  currentPage: number;
  totalPages: number;
  steps: {
    label: string;
    route: string;
  }[];
} 