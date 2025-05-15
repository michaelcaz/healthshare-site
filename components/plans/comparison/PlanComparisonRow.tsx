import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface PlanComparisonRowProps {
  label: string;
  values: string[];
}

export const PlanComparisonRow: React.FC<PlanComparisonRowProps> = ({ label, values }) => (
  <tr className="transition-colors duration-150 hover:bg-blue-50/40 focus-within:bg-blue-50/60">
    <th scope="row" className="text-left font-medium py-2 px-4 align-top w-1/4 text-xs text-gray-600">{label}</th>
    {values.map((value, idx) => (
      <td key={idx} className="text-center py-2 px-4">
        {value === 'check' ? (
          <CheckCircle className="inline-block text-emerald-500 w-5 h-5 align-middle" aria-label="Included" />
        ) : value === 'x' ? (
          <XCircle className="inline-block text-gray-300 w-5 h-5 align-middle" aria-label="Not included" />
        ) : (
          <span className="font-semibold text-gray-800 text-sm">{value}</span>
        )}
      </td>
    ))}
  </tr>
);

export default PlanComparisonRow; 