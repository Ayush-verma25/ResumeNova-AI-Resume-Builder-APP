import { PlusIcon, UploadCloudIcon } from "lucide-react";

const Dashboard = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Jon Doe
        </p>

        <div className="flex gap-4">
          <button className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed  border-slate-300 group hover:border-orange-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-orange-300 to-orange-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-orange-600 transition-all duration-300">
              Create Resume
            </p>
          </button>

          <button className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed  border-slate-300 group hover:border-orange-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-orange-300 to-orange-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-orange-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
