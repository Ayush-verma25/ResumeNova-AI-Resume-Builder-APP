const Footer = () => {
  return (
    <footer className="mt-40 flex flex-wrap items-center justify-between gap-8 bg-linear-to-r from-white via-orange-200/60 to-white px-6 py-12 text-sm text-gray-500 md:px-16 lg:px-24 xl:px-32">
      <a href="/" aria-label="ResumeNova home">
        <img
          src="/resumenova-logo.svg"
          alt="ResumeNova"
          className="h-11 w-auto"
        />
      </a>
      <nav aria-label="Footer">
        <ul className="flex flex-wrap gap-6">
          <li>
            <a href="/" className="transition hover:text-orange-600">
              Home
            </a>
          </li>
          <li>
            <a href="/#features" className="transition hover:text-orange-600">
              Features
            </a>
          </li>
          <li>
            <a
              href="/#how-it-works"
              className="transition hover:text-orange-600"
            >
              How it works
            </a>
          </li>
          <li>
            <a href="/#cta" className="transition hover:text-orange-600">
              Get started
            </a>
          </li>
        </ul>
      </nav>
      <p>© {new Date().getFullYear()} ResumeNova AI Resume Builder.</p>
    </footer>
  );
};

export default Footer;
