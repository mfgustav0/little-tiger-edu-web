"use client";

import { Category, categoryList } from "@/lib/questions";
import { Card } from "../ui/card";

interface CategorySelectorProps {
  activeCategories: Category[];
  onToggleCategory: (category: Category) => void;
}

export function CategorySelector({
  activeCategories,
  onToggleCategory,
}: CategorySelectorProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-5">
      <h3 className="font-bold mb-3 text-white">Categorias Ativas</h3>
      <div className="flex flex-wrap gap-2">
        {categoryList.map((category: Category, index: number) => (
          <button
            key={`category-${index}`}
            onClick={() => onToggleCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeCategories.includes(category)
                ? "bg-blue-500 text-white"
                : "bg-slate-700 text-slate-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </Card>
  );
}
