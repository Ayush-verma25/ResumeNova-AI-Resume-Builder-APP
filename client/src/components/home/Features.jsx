import { Palette, Share2, Sparkles, Zap } from "lucide-react";
import Title from "./Title";

const features = [
  {
    icon: Sparkles,
    title: "AI writing assistance",
    description:
      "Improve your professional summary and experience descriptions with AI.",
  },
  {
    icon: Palette,
    title: "Customizable templates",
    description:
      "Choose a resume layout and accent color that fit your personal style.",
  },
  {
    icon: Share2,
    title: "Share and download",
    description:
      "Share a public resume link or print your finished resume to PDF.",
  },
];

const Features = () => {
  return (
    <section id="features" className="my-16 scroll-mt-12 px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <div className="flex items-center gap-2 rounded-full bg-orange-400/10 px-6 py-1.5 text-sm text-orange-800">
          <Zap className="size-4 stroke-orange-600" />
          <span>Simple, fast, and easy to use</span>
        </div>
        <Title
          title="Build a resume that fits your next step"
          description="Create, refine, and share your resume with tools designed for job seekers."
        />
        <div className="mt-10 grid w-full gap-5 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
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

export default Features;
