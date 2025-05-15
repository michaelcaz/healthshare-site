import React from 'react';

interface PlanComparisonRowProps {
  label: string;
  values: string[];
}

export const PlanComparisonRow: React.FC<PlanComparisonRowProps> = ({ label, values }) => (
  <tr>
    <th scope="row" className="text-left font-medium py-2 px-4 align-top w-1/4">{label}</th>
    {values.map((value, idx) => (
      <td key={idx} className="text-center py-2 px-4">
        {value === 'check' ? (
          <span role="img" aria-label="Included" className="text-lg">✅</span>
        ) : value === 'x' ? (
          <span role="img" aria-label="Not included" className="text-lg">❌</span>
        ) : (
          <span>{value}</span>
        )}
      </td>
    ))}
  </tr>
);

export default PlanComparisonRow; 