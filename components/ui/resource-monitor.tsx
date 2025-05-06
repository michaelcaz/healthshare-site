'use client';

import React, { useEffect, useState } from 'react';

type ResourceType = 'font' | 'image' | 'stylesheet' | 'script';

type ResourceIssue = {
  resource: string;
  type: ResourceType;
  loadTime: number;
  fileSize?: number;
  status: 'loading' | 'loaded' | 'error';
  severity: 'low' | 'medium' | 'high';
  details?: Record<string, any>;
}

export function ResourceMonitor({ enable = false }: { enable?: boolean }) {
  const [resources, setResources] = useState<ResourceIssue[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!enable) return;
    setIsClient(true);
    
    const trackResource = (resource: string, type: ResourceType, status: 'loading' | 'loaded' | 'error', details?: any) => {
      const loadTime = performance.now();
      const severity = status === 'error' ? 'high' : 
                       loadTime > 1000 ? 'medium' : 'low';
      
      setResources(prev => [...prev, {
        resource,
        type,
        loadTime,
        status,
        severity,
        details
      }]);
      
      // Update stats
      setStats(prev => {
        const newStats = { ...prev };
        newStats[`${type}_${status}`] = (newStats[`${type}_${status}`] || 0) + 1;
        return newStats;
      });
    };
    
    // Monitor fonts
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        // Log information about all fonts
        const loadedFonts = Array.from(document.fonts).map(font => ({
          family: font.family,
          weight: font.weight,
          style: font.style,
          status: font.status
        }));
        
        loadedFonts.forEach(font => {
          trackResource(
            `${font.family} (${font.weight} ${font.style})`, 
            'font', 
            font.status === 'loaded' ? 'loaded' : 'error'
          );
        });
      });
      
      document.fonts.addEventListener('loadingdone', (event) => {
        const e = event as FontFaceSetLoadEvent;
        e.fontfaces.forEach(font => {
          trackResource(
            `${font.family} (${font.weight} ${font.style})`, 
            'font', 
            'loaded',
            { timeStamp: event.timeStamp }
          );
        });
      });
      
      document.fonts.addEventListener('loadingerror', (event) => {
        const e = event as FontFaceSetLoadEvent;
        e.fontfaces.forEach(font => {
          trackResource(
            `${font.family} (${font.weight} ${font.style})`, 
            'font', 
            'error',
            { timeStamp: event.timeStamp }
          );
        });
      });
    }
    
    // Monitor image loading
    const observeImageElements = () => {
      document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
          trackResource(img.src, 'image', img.naturalWidth > 0 ? 'loaded' : 'error', {
            width: img.width,
            height: img.height,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            loading: img.loading,
            decoding: img.decoding
          });
        } else {
          const onLoad = () => {
            trackResource(img.src, 'image', 'loaded', {
              width: img.width,
              height: img.height,
              naturalWidth: img.naturalWidth,
              naturalHeight: img.naturalHeight,
              loading: img.loading,
              decoding: img.decoding,
              loadTime: performance.now()
            });
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
          };
          
          const onError = () => {
            trackResource(img.src, 'image', 'error', {
              width: img.width,
              height: img.height,
              loading: img.loading,
              decoding: img.decoding
            });
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);
          };
          
          img.addEventListener('load', onLoad);
          img.addEventListener('error', onError);
        }
      });
    };
    
    // Run initial check
    observeImageElements();
    
    // Setup MutationObserver to track dynamically added images
    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (element.tagName === 'IMG') {
                observeImageElements();
              } else {
                element.querySelectorAll('img').forEach(() => {
                  observeImageElements();
                });
              }
            }
          });
        }
      }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [enable]);
  
  if (!enable || !isClient) return null;
  
  const totalResources = resources.length;
  const loadedResources = resources.filter(r => r.status === 'loaded').length;
  const errorResources = resources.filter(r => r.status === 'error').length;
  
  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case 'font': return '🔤';
      case 'image': return '🖼️';
      case 'stylesheet': return '🎨';
      case 'script': return '📜';
      default: return '📄';
    }
  };
  
  return (
    <div className="fixed right-0 bottom-0 p-4 bg-white shadow-lg rounded-tl-md z-50 text-xs font-mono opacity-75 hover:opacity-100 transition-opacity overflow-auto" style={{ maxHeight: '300px', maxWidth: '400px' }}>
      <h5 className="font-bold mb-2">Resource Monitor ({totalResources})</h5>
      
      <div className="grid grid-cols-3 gap-2 mb-3 text-center text-xs">
        <div className="bg-blue-100 p-1 rounded">
          <div className="font-bold">{totalResources}</div>
          <div>Total</div>
        </div>
        <div className="bg-green-100 p-1 rounded">
          <div className="font-bold">{loadedResources}</div>
          <div>Loaded</div>
        </div>
        <div className="bg-red-100 p-1 rounded">
          <div className="font-bold">{errorResources}</div>
          <div>Errors</div>
        </div>
      </div>
      
      <div className="max-h-48 overflow-y-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-1">Type</th>
              <th className="text-left p-1">Resource</th>
              <th className="text-right p-1">Time (ms)</th>
              <th className="text-center p-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {resources
              .sort((a, b) => b.loadTime - a.loadTime)
              .map((resource, idx) => (
                <tr key={idx} className="border-t border-gray-200">
                  <td className="p-1">{getTypeIcon(resource.type)}</td>
                  <td className="p-1 truncate" style={{ maxWidth: '140px' }}>
                    {resource.resource}
                  </td>
                  <td className="text-right p-1">
                    {Math.round(resource.loadTime)}
                  </td>
                  <td className="text-center p-1">
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      resource.status === 'loaded' ? 'bg-green-500' : 
                      resource.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}></span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 