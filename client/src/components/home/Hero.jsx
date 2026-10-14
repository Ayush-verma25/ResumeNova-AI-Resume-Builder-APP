import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Hero = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const appPath = user ? "/app" : "/app?state=register";

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="min-h-screen pb-20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm md:px-12">
        <Link to="/" aria-label="ResumeNova home">
          <img
            src="/resumenova-logo.svg"
            alt="ResumeNova"
            className="h-11 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-8 text-slate-800 md:flex">
          <a href="/" className="transition hover:text-orange-600">
            Home
          </a>
          <a href="#features" className="transition hover:text-orange-600">
            Features
          </a>
          <a
            href="#how-it-works"
            className="transition hover:text-orange-600"
          >
            How it works
          </a>
          <a href="#cta" className="transition hover:text-orange-600">
            Get started
          </a>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <Link
              to="/app"
              className="rounded-full bg-orange-500 px-7 py-2 text-white transition hover:bg-orange-700"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/app?state=login"
                className="rounded-full border border-slate-300 px-6 py-2 text-slate-700 transition hover:bg-slate-50"
              >
                Login
              </Link>
              <Link
                to="/app?state=register"
                className="rounded-full bg-orange-500 px-6 py-2 text-white transition hover:bg-orange-700"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
          className="rounded p-2 text-slate-700 transition hover:bg-orange-50 md:hidden"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="absolute inset-x-0 z-50 flex flex-col items-center gap-6 bg-white px-6 py-8 text-lg shadow-lg md:hidden"
        >
          <a href="/" onClick={closeMenu}>
            Home
          </a>
          <a href="#features" onClick={closeMenu}>
            Features
          </a>
          <a href="#how-it-works" onClick={closeMenu}>
            How it works
          </a>
          <a href="#cta" onClick={closeMenu}>
            Get started
          </a>
          <Link to={appPath} onClick={closeMenu}>
            {user ? "Dashboard" : "Create your resume"}
          </Link>
        </nav>
      )}

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pt-24 text-center md:pt-32">
        <div className="absolute left-1/3 top-24 -z-10 size-72 rounded-full bg-orange-300 opacity-30 blur-[100px] sm:size-96" />
        <p className="rounded-full bg-orange-400/10 px-5 py-2 text-sm font-medium text-orange-800">
          AI tools for a more polished resume
        </p>
        <h1 className="mt-8 max-w-5xl text-5xl font-semibold leading-tight text-slate-900 md:text-6xl">
          Land your dream job with an{" "}
          <span className="bg-linear-to-r from-orange-700 to-orange-500 bg-clip-text text-transparent">
            AI-powered resume builder.
          </span>
        </h1>
        <p className="my-7 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
          Create, edit, and download professional resumes with AI-powered
          assistance.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to={appPath}
            className="flex h-12 items-center gap-2 rounded-full bg-orange-500 px-8 text-white ring-1 ring-orange-400 ring-offset-2 transition-colors hover:bg-orange-600"
          >
            {user ? "Open dashboard" : "Get started"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <a
            href="#features"
            className="flex h-12 items-center rounded-full border border-slate-300 px-7 text-slate-700 transition hover:bg-orange-50"
          >
            Explore features
          </a>
        </div>
      </div>
    </header>
  );
};

export default Hero;
