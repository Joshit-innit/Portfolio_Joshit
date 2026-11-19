// Adapted from Watermelon UI "Fluid Tabs" (MIT): https://ui.watermelon.sh/animated-components/fluid-tabs
// Changes: theme tokens instead of fixed greys, count, tab roles, one eased slide instead of spring and blur.
import { useState } from 'react';
import { motion } from 'motion/react';
import { ease } from '../motion.jsx';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface FluidTabsProps {
  tabs: TabItem[];
  defaultActive?: string;
  onChange?: (id: string) => void;
}

export function FluidTabs({ tabs, defaultActive = tabs[0]?.id, onChange }: FluidTabsProps) {
  const [active, setActive] = useState<string>(defaultActive);

  const handleChange = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <div role="tablist" className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-line bg-surface p-1">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleChange(tab.id)}
            className="group relative cursor-pointer rounded-lg px-4 py-2"
          >
            {isActive && (
              <motion.div
                layoutId="fluid-tabs-pill"
                transition={{ duration: 0.25, ease }}
                className="absolute inset-0 rounded-lg border border-line bg-bg shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              />
            )}
            <span
              className={`relative z-10 flex items-center gap-2 text-base font-medium whitespace-nowrap transition-colors duration-150 ${
                isActive ? 'text-fg' : 'text-muted group-hover:text-fg'
              }`}
            >
              {tab.label}
              {tab.count != null && <span className="font-mono text-xs tabular-nums text-muted">{tab.count}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
