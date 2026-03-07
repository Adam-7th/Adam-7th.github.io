"use client";

import { AgencyPricingSection } from "./AgencyPricingSection";

export function LocalizedPricing({
  compact = false,
  bookingHref,
}: {
  compact?: boolean;
  bookingHref?: string;
}) {
  return <AgencyPricingSection compact={compact} bookingHref={bookingHref} />;
}
