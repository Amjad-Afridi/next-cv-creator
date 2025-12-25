// components/builder/HTMLPreview.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HTMLPreviewProps {
  htmlContent: string;
  className?: string;
}

export function HTMLPreview({ htmlContent, className = '' }: HTMLPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(50); // Start at 50% for better fit

  // Letter size in pixels at 96 DPI
  const PAGE_WIDTH = 816; // 8.5 inches * 96 DPI
  const PAGE_HEIGHT = 1056; // 11 inches * 96 DPI

  const zoomLevels = [40, 50, 60, 70, 80 ,90, 100, 110, 120, 130, 140, 150];

  useEffect(() => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    if (!iframeDoc) return;

    // Write the HTML content to iframe
    iframeDoc.open();
    iframeDoc.write(htmlContent);
    iframeDoc.close();

    // Wait for content to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [htmlContent]);

  const handleZoomIn = () => {
    const currentIndex = zoomLevels.indexOf(zoom);
    if (currentIndex < zoomLevels.length - 1) {
      setZoom(zoomLevels[currentIndex + 1]);
    }
  };

  const handleZoomOut = () => {
    const currentIndex = zoomLevels.indexOf(zoom);
    if (currentIndex > 0) {
      setZoom(zoomLevels[currentIndex - 1]);
    }
  };

  const handleZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const handleReset = () => {
    setZoom(60);
  };

  return (
    <div className={`relative flex flex-col ${className}`}>
      {/* Zoom Controls */}
      <div className="flex items-center justify-between gap-2 px-2 py-2 bg-slate-50 border-b">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= zoomLevels[0]}
            className="h-7 w-7 p-0"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          
          <select
            value={zoom}
            onChange={(e) => handleZoomChange(Number(e.target.value))}
            className="h-7 px-2 text-xs border rounded-md bg-white min-w-[70px]"
          >
            {zoomLevels.map((level) => (
              <option key={level} value={level}>
                {level}%
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= zoomLevels[zoomLevels.length - 1]}
            className="h-7 w-7 p-0"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleReset}
            className="h-7 px-2"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>

        <span className="text-[10px] text-slate-500">
          8.5" × 11"
        </span>
      </div>

      {/* Preview Container */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto bg-slate-100"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
              <p className="text-sm text-slate-600">Loading preview...</p>
            </div>
          </div>
        )}

        <div className="flex justify-center py-4">
          {/* Fixed PDF-like Page */}
          <div
            className="bg-white shadow-lg"
            style={{
              width: `${PAGE_WIDTH}px`,
              minHeight: `${PAGE_HEIGHT}px`,
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease-in-out',
              marginBottom: `${Math.max(0, PAGE_HEIGHT * (zoom / 100 - 1))}px`,
            }}
          >
            <iframe
              ref={iframeRef}
              className="border-0"
              style={{
                width: `${PAGE_WIDTH}px`,
                height: `${PAGE_HEIGHT}px`,
                display: 'block',
              }}
              title="Resume Preview"
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}