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
          <span aria-label="Included" title="Included" className="text-green-600" role="img">✔️</span>
        ) : value === 'x' ? (
          <span aria-label="Not included" title="Not included" className="text-red-500" role="img">✖️</span>
        ) : (
          <span>{value}</span>
        )}
      </td>
    ))}
  </tr>
);

export default PlanComparisonRow; 