import { Check, Layout } from "lucide-react";
import React from "react";

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean, modern design with a focus on readability and simplicity.",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "A sleek, contemporary design with a focus on functionality and efficiency.",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview:
        "A minimalistic design with a focus on minimalism and simplicity.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview:
        "Ultra-clean and minimalistic design with a focus on simplicity and elegance.",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-orange-600 bg-linear-to-br from-orange-50 to-orange-100 ring-orange-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} /> <span className="max-sm:hidden">Template</span>
      </button>
      {isOpen && (
        <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-md cursor-pointer transition-all ${selectedTemplate === template.id ? "border-orange-400 bg-orange-100" : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"}`}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-orange-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <div className="mt-2 p-2 bg-orange-50 rounded text-xs text-gray-500 italic">
                  {template.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
