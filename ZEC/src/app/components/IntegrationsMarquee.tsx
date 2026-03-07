"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type IntegrationItem = {
  name: string;
  logoSrc?: string;
};

export function IntegrationsMarquee({ items }: { items: IntegrationItem[] }) {
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const row = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="integrations-marquee-shell relative pb-1">
      <div className="integrations-marquee-track">
        {row.map((item, index) => {
          const key = `${item.name}-${index}`;
          const failKey = item.logoSrc ?? item.name;
          const showLogo = item.logoSrc && !failed[failKey];
          return (
            <div
              key={key}
              className="flex h-11 min-w-[160px] shrink-0 items-center gap-2 rounded-xl border border-edge bg-panel/60 px-4 py-2 text-xs text-muted"
            >
              {showLogo ? (
                <div className="media-zoom-shell flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-edge bg-white/80">
                  <Image
                    src={item.logoSrc!}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="media-zoom object-contain"
                    onError={() =>
                      setFailed((prev) => ({ ...prev, [failKey]: true }))
                    }
                  />
                </div>
              ) : null}
              <span className="whitespace-nowrap">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
