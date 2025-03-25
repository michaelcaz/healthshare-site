import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts Markdown-style bold syntax (**text**) to HTML bold tags
 * @param text The text containing Markdown bold syntax
 * @returns HTML formatted text with <strong> tags
 */
export function markdownToBold(text: string): string {
  if (!text) return '';
  
  // Replace **text** with <strong>text</strong>
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}
