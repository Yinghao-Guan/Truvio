import type { Metadata } from 'next';
import { ShieldCheck, Database, Globe, Sparkles, PenLine, BookOpen, ArrowRight, Github, Zap, CheckCircle } from 'lucide-react';
import WaitlistForm from '../../components/WaitlistForm';
import PageViewTracker from '../../components/PageViewTracker';
import SurveyWidget from '../../components/SurveyWidget';

export const metadata: Metadata = {
  title: 'About',
  description: 'Veru is a free AI-powered academic tool that verifies citations and detects AI hallucinations. Learn about our mission and upcoming features.',
  openGraph: {
    title: 'About Veru — AI Citation Checker & Academic Tools',
    description: 'Veru helps researchers, students, and writers verify AI-generated citations against 250M+ real academic papers — for free.',
    url: 'https://veru.app/about',
  },
};


export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 font-sans flex flex-col">

      <PageViewTracker event="veru_about_page_visit" />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src="/v_logo.svg" alt="Veru logo" className="w-8 h-8 mr-2" />
            <span className="text-xl font-bold tracking-tight text-slate-900">Veru</span>
          </a>
          <nav className="flex items-center space-x-3">
            <a
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors hidden sm:block"
            >
              Try the Tool
            </a>
            <div className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 hidden sm:block">
              Free Preview
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-to-b from-white to-[#F8F9FA] pt-20 pb-24 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 mb-8">
              <ShieldCheck className="w-3.5 h-3.5" />
              Building trust in AI-assisted research
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
              Making AI-generated research{' '}
              <span className="text-blue-600">verifiable</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto mb-14">
              Veru is a free suite of academic tools designed to close the trust gap between AI-generated content
              and real scholarly work.
            </p>

            {/* Two product cards */}
            <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">

              {/* Veru Audit */}
              <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all p-7 text-left flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center mb-5 text-blue-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">Available now</div>
                <h2 className="text-xl font-extrabold text-slate-900 mb-2">Veru Audit</h2>
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-6">
                  Paste any AI-generated text and verify every citation against 250M+ real academic papers.
                  Catch fake references in seconds — free, no account needed.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm group-hover:shadow-md active:scale-95 self-start"
                >
                  Try it free
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Veru Write */}
              <div className="group bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl border border-white/10 shadow-sm hover:shadow-xl transition-all p-7 text-left flex flex-col relative overflow-hidden">
                {/* glow */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" aria-hidden />
                <div className="w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center mb-5 text-blue-400 relative z-10">
                  <PenLine className="w-5 h-5" />
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 relative z-10 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Coming soon
                </div>
                <h2 className="text-xl font-extrabold text-white mb-2 relative z-10">Veru Write</h2>
                <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6 relative z-10">
                  An AI academic writing assistant that drafts with real, verified sources baked in from the start —
                  zero hallucinated citations.
                </p>
                <div className="relative z-10">
                  <WaitlistForm location="hero_card" />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* What is Veru */}
        <section className="bg-white border-t border-slate-200 py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-5">What is Veru?</h2>
                <p className="text-slate-500 leading-relaxed mb-5">
                  Every day, AI tools like ChatGPT and Claude generate millions of academic citations — many of which
                  are completely fabricated. Plausible-sounding paper titles, realistic author names, real journal
                  names, wrong years. Hallucinations that are almost impossible to spot without verification.
                </p>
                <p className="text-slate-500 leading-relaxed mb-5">
                  Veru was built to fix that. Paste any block of text with citations and we verify each one against{' '}
                  <strong className="text-slate-700">OpenAlex</strong>, a database of 250 million+ real academic papers.
                  We surface what&apos;s real, what&apos;s fake, and what&apos;s a mismatch — in seconds.
                </p>
                <p className="text-slate-500 leading-relaxed">
                  It&apos;s free. No account required. Works in English and Chinese.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: Database, color: 'blue', title: '250M+ papers indexed', desc: 'Backed by OpenAlex, the largest open scholarly graph.' },
                  { icon: ShieldCheck, color: 'emerald', title: 'Four verdict types', desc: 'REAL, FAKE, MISMATCH, and MINOR ERROR — with AI confidence scores.' },
                  { icon: Globe, color: 'amber', title: 'Multilingual', desc: 'Interface and results available in English and Simplified Chinese.' },
                  { icon: Zap, color: 'violet', title: 'Streaming results', desc: 'Citations are verified in parallel and stream to your screen in real time.' },
                ].map(({ icon: Icon, color, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-${color}-100 text-${color}-600`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm mb-1">{title}</div>
                      <div className="text-slate-500 text-sm">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon: Veru Write */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-24 px-6 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20 mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                Coming soon
              </div>
              <h2 className="text-4xl font-extrabold text-white mb-5 tracking-tight">
                Introducing{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Veru Write
                </span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
                An AI academic writing assistant that doesn&apos;t just write — it writes with citations you can trust,
                grounded in real research from the start.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-14">
              {[
                {
                  icon: PenLine,
                  title: 'Write with real sources',
                  desc: 'Veru Write retrieves actual papers as it drafts, so every claim comes with a verified reference baked in.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Zero hallucinated citations',
                  desc: 'We run every generated citation through our audit pipeline before it ever reaches your document.',
                },
                {
                  icon: BookOpen,
                  title: 'Built for academics',
                  desc: 'Literature reviews, research proposals, thesis sections — Veru Write understands academic register and structure.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/8 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center mb-5 text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            {/* What makes it different */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-white font-bold text-lg mb-6">Why Veru Write is different</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Cites papers that actually exist',
                  'Retrieves sources before generating prose',
                  'Shows you the real abstract, not a paraphrase',
                  'Flags uncertainty rather than filling gaps with fiction',
                  'Seamlessly integrates with Veru Audit for a final check',
                  'Designed around open-access scholarship',
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3 text-slate-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 max-w-xl mx-auto">
              <p className="text-slate-400 text-sm mb-5 text-center">
                Veru Write is in active development. Be the first to know when it launches.
              </p>
              <div className="flex justify-center">
                <WaitlistForm location="write_section" />
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-white border-t border-slate-200 py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our mission</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-6">
              AI is making it easier than ever to produce text that looks scholarly — complete with authors, journals,
              and DOIs that don&apos;t exist. We believe researchers shouldn&apos;t have to choose between the
              productivity benefits of AI and the integrity of their work.
            </p>
            <p className="text-slate-500 text-lg leading-relaxed">
              Veru exists to keep AI and academic honesty on the same side of the table.
              Every tool we build starts from a simple question: how do we make AI-generated academic content
              something you can actually stake your reputation on?
            </p>
          </div>
        </section>

      </main>

      <SurveyWidget lang="en" />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img src="/v_logo.svg" alt="Veru logo" className="w-6 h-6" />
            <span className="font-bold text-slate-100 tracking-tight">Veru</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="mailto:hello@veru.app" className="text-slate-400 hover:text-white transition-colors text-sm">
              hello@veru.app
            </a>
            <a
              href="https://github.com/Yinghao-Guan/Veru"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="View Source on GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <div className="text-sm border-l border-slate-700 pl-6">
              &copy; {new Date().getFullYear()} Veru. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
