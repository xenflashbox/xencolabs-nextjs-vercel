import React from 'react';

type Props = {
  className?: string;
  compact?: boolean;
};

export function SonomaWashShowcase({ className = '', compact = false }: Props) {
  return (
    <div className={`relative overflow-hidden bg-[#2f3329] ${className}`} aria-label="Sonoma Wash Co. live website showcase">
      <img
        src="https://media.sonomawashco.com/img/hero-desktop-natural-poster.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
      <div className="relative z-10 flex h-full min-h-[260px] flex-col p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4 text-[#f6efe0]">
          <div className="font-display text-lg font-semibold leading-[0.88] sm:text-xl">
            <span className="block text-sm font-normal">Sonoma</span>
            <span className="block text-xl font-black tracking-tight sm:text-2xl">WASH</span>
            <span className="block text-sm font-normal text-right">Co.</span>
          </div>
          {!compact && (
            <div className="hidden items-center gap-4 text-[10px] font-medium lg:flex">
              <span>Services</span>
              <span>Problems</span>
              <span>Pricing</span>
              <span>Commercial</span>
              <span>Service Area</span>
              <span>Advice</span>
              <span>Shop</span>
              <span>Book</span>
            </div>
          )}
          <div className="rounded bg-[#f6efe0] px-3 py-2 text-[10px] font-semibold text-[#8b1115]">
            Get a quote
          </div>
        </div>

        <div className="mt-auto max-w-[68%] pb-2 text-[#f6efe0] sm:max-w-[64%]">
          {!compact && (
            <p className="mb-3 text-[9px] font-medium uppercase tracking-[0.24em] sm:text-[10px]">
              Est. 2026 · Sonoma Valley
            </p>
          )}
          <p className={`font-display font-bold leading-[0.95] tracking-[-0.03em] ${compact ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl lg:text-5xl'}`}>
            Your property is wearing a year of weather. We&apos;ll get it off.
          </p>
          {!compact && (
            <>
              <p className="mt-4 max-w-xl text-[11px] leading-relaxed text-white/85 sm:text-sm">
                Soft-wash and pressure-wash service for estates, vacation rentals, and businesses across Sonoma Valley.
              </p>
              <div className="mt-5 flex gap-2">
                <span className="rounded bg-[#8b1115] px-4 py-2 text-[10px] font-semibold text-white sm:text-xs">
                  Get instant quote →
                </span>
                <span className="rounded border border-white/70 bg-black/15 px-4 py-2 text-[10px] font-semibold text-white sm:text-xs">
                  See what we clean
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
