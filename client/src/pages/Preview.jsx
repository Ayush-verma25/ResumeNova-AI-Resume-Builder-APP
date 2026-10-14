import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../configs/api";
import ResumePreview from "../components/ResumePreview";
import Loader from "../components/Loader";
import { ArrowLeftIcon } from "lucide-react";

const Preview = () => {
  const { resumeId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    const loadResume = async () => {
      try {
        const { data } = await api.get(`/api/resumes/public/${resumeId}`);
        if (isCurrent) {
          setResumeData(data.resume);
        }
      } catch (error) {
        if (isCurrent) {
          setLoadError(
            error.response?.status === 404
              ? "Resume not found"
              : "Unable to load this resume. Please try again later.",
          );
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    };

    void loadResume();
    return () => {
      isCurrent = false;
    };
  }, [resumeId]);

  return resumeData ? (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-center text-3xl sm:text-6xl text-slate-400 font-medium">
            {loadError || "Resume not found"}
          </p>
          <Link
            to="/"
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-orange-400 flex items-center transition-colors"
          >
            <ArrowLeftIcon className="mr-2 size-4" />
            Go to home page
          </Link>
        </div>
      )}
    </div>
  );
};

export default Preview;
