interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'archived'
  size?: 'small' | 'medium'
}

const statusStyles = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
  archived: 'bg-red-100 text-red-800',
}

const sizeStyles = {
  small: 'px-2 py-0.5 text-xs',
  medium: 'px-2.5 py-1 text-sm',
}

export function StatusBadge({ status, size = 'medium' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium
        ${statusStyles[status]}
        ${sizeStyles[size]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current mr-1.5" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
