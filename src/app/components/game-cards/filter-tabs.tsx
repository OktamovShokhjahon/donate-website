"use client";

import { cn } from "@/lib/utils";

interface FilterTabsProps {
  filters: {
    id: string;
    label: string;
    icon: string;
  }[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

export default function FilterTabs({
  filters,
  activeFilter,
  onFilterChange,
}: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
            activeFilter === filter.id
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          )}
        >
          <span>{filter.icon}</span>
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
}
