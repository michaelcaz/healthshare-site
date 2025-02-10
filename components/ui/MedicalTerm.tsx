'use client';

interface MedicalTermProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export function MedicalTerm({ term, definition, children }: MedicalTermProps) {
  return (
    <span 
      className="border-b border-dotted border-gray-400 cursor-help group relative"
      title={definition}
    >
      {children}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {definition}
      </span>
    </span>
  );
} 