import { Check, Palette } from "lucide-react";
import { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Navy", color: "#1E3A5F" },
    { name: "Slate", color: "#475569" },
    { name: "Blue", color: "#1D4ED8" },
    { name: "Teal", color: "#0F766E" },
    { name: "Forest", color: "#166534" },
    { name: "Burgundy", color: "#9F1239" },
    { name: "Charcoal", color: "#374151" },
    { name: "Brown", color: "#7C2D12" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-slate-700 bg-slate-50 ring-slate-300 hover:ring transition-all px-3 py-2 rounded-lg"
        aria-expanded={isOpen}
        aria-label="Choose accent color"
      >
        <Palette size={16} /> <span className="max-sm:hidden">Accent</span>
      </button>
      {isOpen && (
        <div className="grid grid-cols-4  w-60 gap-2 absolute top-full left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {colors.map((color) => (
            <button
              key={color.color}
              type="button"
              className="relative cursor-pointer group flex flex-col items-center"
              onClick={() => {
                onChange(color.color);
                setIsOpen(false);
              }}
              aria-label={`Choose ${color.name}`}
              aria-pressed={selectedColor === color.color}
            >
              <div
                className="w-12 h-12 rounded-full border-2 border-transparent group-hover:border-black/25 transition-colors"
                style={{ backgroundColor: color.color }}
              ></div>
              {selectedColor === color.color && (
                <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-center">
                  <Check className="size-5 text-white" />
                </div>
              )}
              <p className="text-xs text-center mt-1 text-gray-600">
                {color.name}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
