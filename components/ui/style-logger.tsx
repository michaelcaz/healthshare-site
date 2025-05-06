'use client';

import React, { useEffect, useState } from 'react';

type LogEntry = {
  timestamp: string;
  type: string;
  message: string;
  details?: Record<string, any>;
}

export function StyleLogger({ enable = false }: { enable?: boolean }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    if (!enable) return;
    setIsClient(true);
    
    const logEntries: LogEntry[] = [];
    
    // Function to add a log entry
    const addLog = (type: string, message: string, details?: Record<string, any>) => {
      const entry = {
        timestamp: new Date().toISOString(),
        type,
        message,
        details
      };
      
      // Log to console with distinctive styling
      console.log(
        `%c[StyleLogger] %c${type}%c: ${message}`, 
        'color: purple; font-weight: bold;', 
        'color: orange;', 
        'color: black;', 
        details
      );
      
      logEntries.push(entry);
      setLogs(prev => [...prev, entry].slice(-50)); // Keep last 50 logs
    };
    
    // Expose logger globally for use in other components
    (window as any).styleLogger = {
      log: (message: string, details?: Record<string, any>) => addLog('INFO', message, details),
      warn: (message: string, details?: Record<string, any>) => addLog('WARNING', message, details),
      error: (message: string, details?: Record<string, any>) => addLog('ERROR', message, details)
    };
    
    // Log initial style information
    addLog('INFO', 'Style logger initialized', {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: window.devicePixelRatio
      },
      userAgent: navigator.userAgent
    });
    
    // Log stylesheet loading
    document.querySelectorAll('link[rel="stylesheet"]').forEach(stylesheet => {
      addLog('INFO', `External stylesheet: ${(stylesheet as HTMLLinkElement).href}`);
    });
    
    document.querySelectorAll('style').forEach((style, index) => {
      addLog('INFO', `Inline style block #${index + 1}`, {
        size: style.textContent?.length || 0
      });
    });
    
    // Monitor layout shifts using Performance API
    if ('PerformanceObserver' in window) {
      try {
        const layoutShiftObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
              const entryAny = entry as any;
              addLog('WARNING', `Layout shift detected: ${entryAny.value.toFixed(4)}`, {
                score: entryAny.value,
                sources: entryAny.sources?.map((s: any) => ({
                  node: s.node?.nodeName,
                  previousRect: s.previousRect,
                  currentRect: s.currentRect
                }))
              });
            }
          }
        });
        layoutShiftObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        addLog('ERROR', 'Failed to initialize PerformanceObserver for layout shifts', { error: e });
      }
    }
    
    // Monitor font loading
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        addLog('INFO', 'All fonts loaded', { 
          fontCount: document.fonts.size 
        });
        
        // Log specific font details
        const loadedFonts = Array.from(document.fonts).map(font => ({
          family: font.family,
          weight: font.weight,
          style: font.style,
          status: font.status
        }));
        
        addLog('INFO', 'Font details', { fonts: loadedFonts });
      });
      
      document.fonts.addEventListener('loadingdone', (event) => {
        const e = event as FontFaceSetLoadEvent;
        addLog('INFO', `Fonts loaded: ${e.fontfaces.length}`);
      });
      
      document.fonts.addEventListener('loadingerror', (event) => {
        const e = event as FontFaceSetLoadEvent;
        addLog('ERROR', `Font loading error: ${e.fontfaces.length} fonts failed`);
      });
    }
    
    // Capture hydration warnings
    const originalConsoleError = console.error;
    console.error = (...args) => {
      originalConsoleError.apply(console, args);
      
      // Check if this is a React hydration warning
      const errorMessage = args.join(' ');
      if (errorMessage.includes('Hydration') || errorMessage.includes('mismatch')) {
        addLog('ERROR', 'React hydration error detected', { 
          message: errorMessage 
        });
      }
    };
    
    // Cleanup
    return () => {
      console.error = originalConsoleError;
      delete (window as any).styleLogger;
    };
  }, [enable]);
  
  if (!enable || !isClient) return null;
  
  return (
    <div 
      className="fixed bottom-0 left-0 p-2 bg-white shadow-lg rounded-tr-md z-50 text-xs font-mono opacity-75 hover:opacity-100 transition-opacity"
      style={{ maxWidth: '50%', maxHeight: '300px', overflow: 'auto' }}
    >
      <div className="flex justify-between items-center mb-2">
        <h5 className="font-bold">Style Logger ({logs.length})</h5>
        <button 
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xs"
          onClick={() => navigator.clipboard.writeText(JSON.stringify(logs, null, 2))}
        >
          Copy Logs
        </button>
      </div>
      <ul className="space-y-1 border-t pt-1">
        {logs.map((log, idx) => (
          <li key={idx} className={`
            text-xs border-l-2 pl-1
            ${log.type === 'ERROR' ? 'border-red-500 text-red-600' : 
              log.type === 'WARNING' ? 'border-yellow-500 text-yellow-600' : 
              'border-blue-500 text-blue-600'}
          `}>
            {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
} 