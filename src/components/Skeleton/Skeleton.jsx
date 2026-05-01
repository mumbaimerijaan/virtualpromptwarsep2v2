import React from 'react';

/**
 * A simple skeleton loader component for perceived performance.
 * @param {string} className Additional CSS classes.
 * @param {object} style Inline styles.
 */
export const Skeleton = ({ className = '', style = {} }) => {
  return (
    <div 
      className={`animate-pulse bg-slate-200 rounded ${className}`} 
      style={{ ...style }}
      aria-hidden="true"
    />
  );
};

export const FAQCardSkeleton = () => (
  <div className="bg-white rounded-3xl p-6 mb-4 shadow-sm border border-slate-100">
    <div className="flex gap-4 items-center mb-4">
      <Skeleton className="w-8 h-8 rounded-full" />
      <Skeleton className="h-6 w-3/4" />
    </div>
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-5/6" />
  </div>
);
