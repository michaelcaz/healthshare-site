interface Window {
  gtag?: (
    command: string,
    action: string,
    params: Record<string, any>
  ) => void
  fbq?: (
    action: string,
    event?: string,
    params?: Record<string, any>
  ) => void
  _fbq?: any
} 