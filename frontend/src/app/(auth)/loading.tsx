import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className="
          relative
          h-16 w-16           /* default for very small phones */
          sm:h-20 sm:w-20     /* ≥640px (small tablets / large phones) */
          md:h-24 md:w-24     /* ≥768px (tablets & up) */
        "
      >
        {/* Rotating border */}
        <div className="absolute inset-0 animate-spin rounded-full border-t-4 border-b-4 border-[#94a3b8]" />

        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/brand/W_logo.png"
            alt="Maxy Logo"
            className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
