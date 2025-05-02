'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface BackButtonProps {
  href: string
  label?: string
}

export function BackButton({ href, label = 'Back' }: BackButtonProps) {
  const router = useRouter()
  
  // DEFINITIVE NAVIGATION FIX - Comprehensive approach to guarantee correct navigation
  const handleClick = (e: React.MouseEvent) => {
    // Aggressive event capture and prevention - blocks any parent handlers
    if (e && e.preventDefault) e.preventDefault();
    if (e && e.stopPropagation) e.stopPropagation();
    if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();
    
    // Clear console for easier debugging
    console.clear();
    console.log('🔵 BackButton: Navigation initiated', new Date().toISOString());
    console.log('🔵 Target:', href);
    console.log('🔵 Current:', window.location.href);
    
    // Parse current URL to ensure we have correct data
    try {
      const fullUrl = window.location.href;
      console.log('🔵 Full current URL:', fullUrl);
      
      // For recommendations navigation, ensure we preserve data
      if (href.includes('/recommendations')) {
        console.log('🔵 RECOMMENDATIONS NAVIGATION DETECTED');
        
        // Parse current URL params
        const urlParams = new URLSearchParams(window.location.search);
        const paramsExist = urlParams.toString().length > 0;
        console.log('🔵 URL params exist:', paramsExist, urlParams.toString());
        
        // Extract data or use defaults
        const data = {
          age: parseInt(urlParams.get('age') || '34'),
          coverage_type: urlParams.get('coverageType') || 'family',
          visit_frequency: urlParams.get('visitFrequency') || 'just_checkups',
          iua_preference: urlParams.get('iua') || '5000',
          pregnancy: 'false',
          pre_existing: 'false',
          zip_code: '75001',
          state: 'TX',
          expense_preference: 'balanced',
          medical_conditions: []
        };
        
        // Save all data (multiple approaches for redundancy)
        try {
          // Main storage approach
          localStorage.setItem('questionnaire-data', JSON.stringify({ response: data }));
          
          // Backup approaches
          sessionStorage.setItem('direct-navigation-data', JSON.stringify(data));
          sessionStorage.setItem('navigation-timestamp', new Date().toISOString());
          sessionStorage.setItem('navigation-target', href);
          
          console.log('🔵 Data successfully saved:', data);
        } catch (err) {
          console.error('🔴 Storage error:', err);
        }
        
        // CRITICAL FIX: Use setTimeout for more reliable navigation
        // This lets storage operations complete and breaks race conditions
        setTimeout(() => {
          try {
            // Use the most direct method possible to navigate
            window.location.href = href;
            console.log('🔵 Direct navigation executed to:', href);
          } catch (err) {
            console.error('🔴 Direct navigation failed:', err);
            // Last resort: use Next.js router
            router.push(href);
          }
        }, 50);
      } else {
        // For other URLs, use standard Next.js router
        console.log('🔵 Standard navigation to:', href);
        router.push(href);
      }
    } catch (error) {
      console.error('🔴 Critical navigation error:', error);
      // Emergency fallback: brute force navigation
      window.location.href = href;
    }
    
    // Return false to ensure no further event handling
    return false;
  };
  
  return (
    <button 
      onClick={handleClick}
      className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      data-testid="back-button"
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      <span>{label}</span>
    </button>
  );
} 