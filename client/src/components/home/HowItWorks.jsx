import { FileText, PencilLine, Share2 } from "lucide-react";
import Title from "./Title";

const steps = [
  {
    icon: FileText,
    title: "Start with your experience",
    description:
      "Add your contact details, work history, education, projects, and skills.",
  },
  {
    icon: PencilLine,
    title: "Refine your content",
    description:
      "Edit every section and use AI assistance to improve your writing.",
  },
  {
    icon: Share2,
    title: "Share your resume",
    description:
      "Choose a template, then print a PDF or share a public link when ready.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="my-16 scroll-mt-12 px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <Title
          title="Your resume, your way"
          description="A straightforward workflow to create and share a resume you are proud of."
        />
        <div className="mt-10 grid w-full gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <Icon className="size-6 text-orange-600" aria-hidden="true" />
              <h3 className="mt-4 font-semibold text-slate-800">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
