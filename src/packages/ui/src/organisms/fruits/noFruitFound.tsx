"use client";

import React from "react";

function NoFruitFound() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="text-slate-400">
        <svg
          className="w-8 h-8 mx-auto mb-2 opacity-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
      </div>
      <p className="text-slate-500 font-medium">No fruits found</p>
      <p className="text-slate-400 text-sm">
        Try adding a new item to your inventory.
      </p>
    </div>
  );
}

export default NoFruitFound;
