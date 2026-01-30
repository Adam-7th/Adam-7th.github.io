"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export type IntegrationItem = {
  name: string;
  logoSrc?: string;
};

export function IntegrationsMarquee({ items }: { items: IntegrationItem[] }) {
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const row = useMemo(() => items, [items]);

  return (
    <div className="relative overflow-x-auto pb-3">
      <div className="flex min-w-max items-center gap-3 pr-6">
        {row.map((item, index) => {
          const key = `${item.name}-${index}`;
          const showLogo = item.logoSrc && !failed[item.name];
          return (
            <div
              key={key}
              className="flex h-11 min-w-[180px] shrink-0 items-center gap-2 rounded-xl border border-edge bg-panel/60 px-4 py-2 text-xs text-muted"
            >
              {showLogo ? (
                <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-edge bg-white/80">
                  <Image
                    src={item.logoSrc!}
                    alt={item.name}
                    width={20}
                    height={20}
                    className="object-contain"
                    onError={() =>
                      setFailed((prev) => ({ ...prev, [item.name]: true }))
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
