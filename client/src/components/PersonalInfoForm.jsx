import { useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  Globe,
  LinkIcon,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

const PersonalInfoForm = ({
  data = {},
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const formData = data || {};

  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      type: "text",
      icon: User,
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      type: "email",
      icon: Mail,
      required: true,
    },
    { key: "phone", label: "Phone Number", type: "tel", icon: Phone },
    { key: "location", label: "Location", type: "text", icon: MapPin },
    {
      key: "profession",
      label: "Profession",
      type: "text",
      icon: BriefcaseBusiness,
    },
    { key: "linkedin", label: "LinkedIn Profile", type: "url", icon: LinkIcon },
    { key: "website", label: "Personal Website", type: "url", icon: Globe },
  ];

  const imageValue = formData.image;
  const previewUrlRef = useRef("");
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const imageSrc = typeof imageValue === "string" ? imageValue : imagePreview;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600">
        Get started by adding your personal information.
      </p>
      <div className="flex items-center gap-2">
        <label>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="user-image"
              className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            <div className="inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer">
              <User className="size-10 p-2.5 border rounded-full" />
              upload user image
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                if (previewUrlRef.current) {
                  URL.revokeObjectURL(previewUrlRef.current);
                }
                previewUrlRef.current = URL.createObjectURL(selectedFile);
                setImagePreview(previewUrlRef.current);
                handleChange("image", selectedFile);
              }
            }}
          />
        </label>
        {imageValue instanceof Blob && (
          <div className="flex flex-col gap-1 pl-4 text-sm">
            <p>Remove Background</p>
            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={Boolean(removeBackground)}
              />
              <div className="relative w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-orange-600 transition-colors duration-200">
                <span
                  className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                    removeBackground ? "translate-x-4" : ""
                  }`}
                ></span>
              </div>
            </label>
          </div>
        )}
      </div>

      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              value={formData[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;
