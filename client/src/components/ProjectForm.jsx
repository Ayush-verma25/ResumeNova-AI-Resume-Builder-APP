import { Plus, Trash2 } from "lucide-react";

const ProjectForm = ({ data = [], onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = data.map((project, currentIndex) =>
      currentIndex === index ? { ...project, [field]: value } : project,
    );
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            {" "}
            Projects{" "}
          </h3>
          <p className="text-sm text-gray-500">Add your projects here.</p>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      <div className="space-y-4 mt-6">
        {data.map((project, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg space-y-3"
          >
            <div className="flex justify-between items-start">
              <h4>Project #{index + 1}</h4>
              <button
                type="button"
                onClick={() => removeProject(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label={`Remove project ${index + 1}`}
              >
                <Trash2 className="size-4" />
              </button>
            </div>

            <div className="grid gap-3">
              <input
                aria-label="Project name"
                value={project.name || ""}
                onChange={(e) => updateProject(index, "name", e.target.value)}
                type="text"
                placeholder="Project Name"
                className="px-3 py-2 text-sm rounded-lg"
              />

              <input
                aria-label="Project type"
                value={project.type || ""}
                onChange={(e) => updateProject(index, "type", e.target.value)}
                type="text"
                placeholder="Project Type"
                className="px-3 py-2 text-sm rounded-lg"
              />

              <textarea
                aria-label="Project description"
                rows={4}
                value={project.description || ""}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                placeholder="Describe your project..."
                className="px-3 py-2 text-sm rounded-lg resize-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectForm;
