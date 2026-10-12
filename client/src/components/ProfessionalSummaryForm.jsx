import { Sparkles } from "lucide-react";

const ProfessionalSummaryForm = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            {" "}
            Professional Summary{" "}
          </h3>
          <p className="text-sm text-gray-500">
            Add summary of your professional experience here.
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors disabled:opacity-50">
          <Sparkles className="size-4" />
          AI Enhance
        </button>
      </div>

      <div className="mt-6">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors resize-none"
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
        />
        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
          Tip: Keep it concise (3-4 sentences) and use bullet points to
          highlight your achievements.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
