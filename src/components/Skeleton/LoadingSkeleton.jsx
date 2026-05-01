import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col p-6 animate-pulse" role="status" aria-label="Loading page content">
      {/* Header Skeleton */}
      <div className="h-16 bg-white rounded-2xl shadow-sm mb-6 flex items-center px-6">
        <div className="w-10 h-10 bg-slate-200 rounded-full mr-4"></div>
        <div className="h-4 bg-slate-200 rounded w-32"></div>
      </div>

      {/* Hero Skeleton */}
      <div className="h-48 bg-white rounded-3xl shadow-sm mb-8 relative overflow-hidden p-8">
        <div className="h-8 bg-slate-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-32 bg-white rounded-2xl shadow-sm p-6 border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
              <div className="h-4 bg-slate-200 rounded w-24"></div>
            </div>
            <div className="h-3 bg-slate-100 rounded w-full"></div>
          </div>
        ))}
      </div>
      
      <span className="sr-only">Please wait while the page loads...</span>
    </div>
  );
};

export default LoadingSkeleton;
