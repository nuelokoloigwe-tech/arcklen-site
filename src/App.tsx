import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  FileText,
  Mail,
  MessageCircle,
  MapPin,
  Menu,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  X,
} from 'lucide-react';
const serviceIconMap = [FileText, TrendingUp, ShieldCheck, Sparkles];

const services = [
  {
    title: 'Business Analysis',
    desc: 'Turn business needs into clear requirements, aligned stakeholders, and workable solutions.',
  },
  {
    title: 'Process Improvement',
    desc: 'Understand current processes, remove friction, and create clearer ways of working.',
  },
  {
    title: 'Change & Transformation',
    desc: 'Support people, processes, and technology through structured, delivery-focused change.',
  },
];


const caseStudies: { title: string; desc: string }[] = [];



const blogPosts = [
  {
    title: 'How to Pass a Business Analyst Interview with Confidence',
    category: 'Career Insight',
    readTime: '6 min read',
    desc: 'A practical framework for answering scenario questions, stakeholder questions, and delivery-focused interview prompts.',
  },
  {
    title: 'Why Requirements Quality Decides Project Success',
    category: 'Business Analysis',
    readTime: '5 min read',
    desc: 'How stronger requirements reduce confusion, rework, and delivery risk across change initiatives.',
  },
  {
    title: 'How Better Process Documentation Supports Change Delivery',
    category: 'Process Improvement',
    readTime: '4 min read',
    desc: 'A look at how SOPs, process maps, and structured documentation improve operational clarity.',
  },
  {
    title: 'Stakeholder Management Mistakes That Slow Delivery',
    category: 'Transformation',
    readTime: '7 min read',
    desc: 'Common breakdowns between teams and how stronger business analysis helps close the gap.',
  },
  {
    title: 'How SMEs Can Use Process Design to Scale Better',
    category: 'Operations',
    readTime: '5 min read',
    desc: 'A practical guide to clearer handoffs, documentation, and operating consistency for growing businesses.',
  },
  {
    title: 'Preparing for Workshops and Requirement Sessions',
    category: 'Delivery Support',
    readTime: '6 min read',
    desc: 'A practical guide to turning conversations into useful requirements and clearer action points.',
  },
];


const whyChooseArcklen = [
  'Clear and practical business analysis',
  'Strong documentation and process thinking',
  'Delivery-focused support, not just theory',
  'Professional guidance for business and career growth',
];


const seoKeywords = [
  'Business Analysis Consulting UK',
  'Transformation Support',
  'Process Improvement',
  'Business Analyst Coaching',
  'Requirements Gathering',
  'Change Support UK',
];


type PageKey = 'home' | 'about' | 'services' | 'case-studies' | 'insights' | 'contact' | 'odi';

const businessEmail = 'hello@arcklengroup.com';
const businessPhone = '+447425705787';
const bookingUrl = 'https://calendly.com/hello-arcklengroup/30min';
// TODO: Replace with real Calendly booking link
const formEndpoint = 'https://formspree.io/f/mykbkjdw';
// TODO: Replace with real Formspree or backend endpoint

const pageMeta: Record<PageKey, { title: string; eyebrow: string; description: string; seoTitle: string; seoDescription: string }> = {
  home: {
    title: 'Business Analysis & Transformation Support for Growing UK Businesses',
    eyebrow: 'Business Analysis & Transformation Consulting',
    description:
      'Arcklen Group helps organisations bring structure to change through clear requirements, stronger processes, practical documentation, and delivery-focused support.',
    seoTitle: 'Arcklen Group | Business Analysis & Transformation Consulting UK',
    seoDescription:
      'Arcklen Group provides business analysis, process improvement, and change & transformation support for UK businesses.',
  },
  about: {
    title: 'Clarity for businesses delivering change',
    eyebrow: 'About Arcklen',
    description:
      'Arcklen Group Limited supports organisations that need clearer requirements, better processes, stronger documentation, and practical support delivering change.',
    seoTitle: 'About Arcklen Group | Business Analysis & Transformation Support',
    seoDescription:
      'Learn how Arcklen Group supports UK businesses with business analysis, process improvement, documentation, and change support.',
  },
  services: {
    title: 'Focused support for business analysis, process improvement, and change delivery',
    eyebrow: 'Core Services',
    description:
      'Explore Arcklen’s core offers across business analysis, process improvement, and change & transformation support.',
    seoTitle: 'Services | Business Analysis & Transformation Consulting UK',
    seoDescription:
      'Explore Arcklen services: business analysis, process improvement, and change & transformation support.',
  },
  'case-studies': {
    title: 'Examples of structured support and practical outcomes',
    eyebrow: 'Case Studies',
    description:
      'Explore Arcklen’s approach to structured analysis, process clarity, stakeholder alignment, and transformation delivery.',
    seoTitle: 'Case Studies | Arcklen Group',
    seoDescription:
      'See practical examples of Arcklen’s work across process improvement, documentation, and BA coaching.',
  },
  insights: {
    title: 'Business analysis and change insights for growing organisations',
    eyebrow: 'Insights',
    description:
      'Read practical content on business analysis, process improvement, stakeholder management, and transformation delivery.',
    seoTitle: 'Insights | Arcklen Group',
    seoDescription:
      'Read Arcklen insights on business analysis, documentation, transformation support, and BA interview preparation.',
  },
  odi: {
    title: 'Odi — AI Business Analysis & Career Assistant',
    eyebrow: 'Odi AI Assistant',
    description:
      'Odi helps Business Analysts analyse opportunities, strengthen applications, prepare for interviews, and navigate their next career move.',
    seoTitle: 'Odi | AI Business Analysis & Career Assistant | Arcklen Group',
    seoDescription:
      'Odi is Arcklen Group’s AI Business Analysis & Career Assistant for CV review, job analysis, interview practice, and career preparation.',
  },  contact: {
    title: 'Need clarity on a project, process, or change initiative?',
    eyebrow: 'Contact',
    description:
      'Whether you need business analysis support, stronger documentation, process improvement, or transformation support, Arcklen can help bring structure and clarity to your next step.',
    seoTitle: 'Contact Arcklen Group | Business Analysis Consulting UK',
    seoDescription:
      'Book a consultation or send an enquiry to Arcklen Group for business analysis, change support, process improvement, and BA coaching.',
  },
};

const getPageFromPath = (): PageKey => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  if (path.includes('/about')) return 'about';
  if (path.includes('/services')) return 'services';
  if (path.includes('/case-studies')) return 'case-studies';
  if (path.includes('/insights')) return 'insights';
  if (path.includes('/contact')) return 'contact';
  if (path.includes('/odi')) return 'odi';
  return 'home';
};

function SeoManager({ page }: { page: PageKey }) {
  useEffect(() => {
    const meta = pageMeta[page];
    document.title = meta.seoTitle;

    const ensureMeta = (name: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      return tag;
    };

    const ensurePropertyMeta = (property: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      return tag;
    };

    ensureMeta('description').content = meta.seoDescription;
    ensureMeta('keywords').content = seoKeywords.join(', ');
    ensurePropertyMeta('og:title').content = meta.seoTitle;
    ensurePropertyMeta('og:description').content = meta.seoDescription;
    ensurePropertyMeta('og:type').content = 'website';
  }, [page]);

  return null;
}

function LuxeBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-emerald-500/15 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:90px_90px] opacity-20" />
    </div>
  );
}

function PremiumPageHero({ page }: { page: PageKey }) {
  const meta = pageMeta[page];

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <LuxeBackground />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-8 lg:pb-20 lg:pt-20">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur">
            <Star className="h-4 w-4 text-emerald-300" />
            {meta.eyebrow}
          </div>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {meta.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">{meta.description}</p>
        </motion.div>
      </div>
    </section>
  );
}

function BookingCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 shadow-2xl backdrop-blur-xl">
      <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-slate-900 p-3">
        <CalendarDays className="h-6 w-6 text-emerald-300" />
      </div>
      <h3 className="text-2xl font-semibold text-white">Book a Consultation</h3>
      <p className="mt-3 leading-7 text-slate-300">
        Schedule a discovery call to discuss your project, business analysis needs, or consulting support.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
        >
          Book a Consultation
        </a>
        <a
          href={`mailto:${businessEmail}`}
          className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Send an Enquiry
        </a>
      </div>
    </div>
  );
}

function ContactFormCard() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const response = await fetch(formEndpoint, {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      setSubmitted(true);
      form.reset();
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Send an Enquiry</p>
      <h3 className="mt-3 text-2xl font-semibold text-white">Tell us how Arcklen can help</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">
        Share a few details about your project, process, or business analysis needs and we will get back to you.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <input
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
          placeholder="Your name"
          name="name"
        />
        <input
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
          placeholder="Email address"
          type="email"
          name="email"
        />
        <input
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
          placeholder="Company or business"
          name="company"
        />
        <textarea
          className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500"
          placeholder="Tell us what you need help with"
          name="message"
        />
        <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5" type="submit">
          Send Enquiry
          <Send className="h-4 w-4" />
        </button>
      </form>
      {submitted && (
        <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
          Your enquiry has been captured. We will be in touch shortly.
        </div>
      )}
    </div>
  );
}

function LandingPage() {
  return (
    <>
      {/* Hero */}
<section className="relative min-h-[680px] overflow-hidden bg-slate-950">
  {/* Full-width cinematic background */}
  <img
    src="/images/hero-visual-real.png"
    alt=""
    aria-hidden="true"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Dark left-to-right overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/20" />

  {/* Bottom fade */}
  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/80 to-transparent" />

  {/* Subtle teal glow */}
  <div className="absolute left-[35%] top-1/4 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

  <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-20 lg:px-8">
    <div className="grid w-full gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">

      {/* Hero content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
          Business Analysis & Transformation Consulting
        </p>

        <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
          From complexity
          <br />
          <span className="text-emerald-300">to clarity.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-200 sm:text-xl">
          We help organisations understand problems, improve processes and
          deliver meaningful change.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <button
            onClick={() => {
              window.history.pushState({}, '', '/services');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-200"
          >
            Explore Our Services
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            onClick={() => {
              window.history.pushState({}, '', '/contact');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-slate-950/30 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* Outcomes */}
        <div className="mt-10 grid max-w-3xl grid-cols-2 gap-5 sm:grid-cols-4">
          {[
            ['People aligned', 'People'],
            ['Processes simplified', 'Process'],
            ['Technology enabled', 'Technology'],
            ['Better outcomes', 'Outcomes'],
          ].map(([label]) => (
            <div
              key={label}
              className="border-l border-white/20 pl-3"
            >
              <p className="text-xs leading-5 text-slate-300">
                {label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right-side messaging */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative hidden min-h-[420px] lg:block"
      >
        <div className="absolute right-0 top-8 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.28em] text-white/60">
          <span className="h-px w-8 bg-emerald-300" />
          <span>People</span>
          <span>|</span>
          <span>Processes</span>
          <span>|</span>
          <span>Progress</span>
        </div>

        <div className="absolute bottom-12 right-0 max-w-[220px] border-l-2 border-emerald-300 pl-5">
          <p className="text-xl font-medium uppercase leading-9 tracking-[0.16em] text-white">
            Clearer
            <br />
            Processes.
            <br />
            Brighter
            <br />
            Tomorrow.
          </p>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* Services */}
      <section className="bg-white text-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">Our Services</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Practical solutions for real change.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-slate-600">We provide business analysis, process improvement and transformation support, with a people-focused approach that keeps delivery moving.</p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35, delay: index * 0.06 }} whileHover={{ y: -6 }} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
                <div className="relative h-52 overflow-hidden bg-slate-950">
  {index === 0 ? (
    <>
      <img
        src="/images/service-business-analysis.png"
        alt="Business analysis workshop"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/10" />

      <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200 backdrop-blur-xl">
        Insight • Alignment • Solutions
      </div>
    </>
  ) : index === 1 ? (
    <>
      <img
        src="/images/service-process-improvement.png"
        alt="Team collaborating on process improvement"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

      <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200 backdrop-blur-xl">
        Simplify • Improve • Deliver
      </div>
    </>
) : (
  <>
    <img
      src="/images/service-transformation.png"
      alt="Business transformation and strategic change"
      className="absolute inset-0 h-full w-full object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

    <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200 backdrop-blur-xl">
      Change • Transform • Grow
    </div>
  </>
)}
</div>
                <div className="p-7"><h3 className="text-2xl font-semibold">{service.title}</h3><p className="mt-3 leading-7 text-slate-600">{service.desc}</p><button onClick={() => { window.history.pushState({}, '', '/services'); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-950">Learn more <ArrowRight className="h-4 w-4 text-emerald-600" /></button></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Odi */}
      <section className="overflow-hidden bg-slate-950">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="px-6 py-20 lg:px-8 lg:py-24">
  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
    Meet Odi
  </p>

  <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
    Odi — Arcklen&apos;s AI Assistant.
  </h2>

  <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
    Analyse. Prepare. Progress. Odi helps Business Analysts make sense of
    opportunities, improve their CVs, practise interview scenarios and build
    confidence.
  </p>

  <div className="mt-7 flex flex-wrap gap-3">
    {['CV Review', 'Interview Practice', 'Career Guidance'].map((item) => (
      <div
        key={item}
        className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur-xl"
      >
        {item}
      </div>
    ))}
  </div>
</div>
          <div onClick={() => (window.location.href = "/odi")} role="link" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") window.location.href = "/odi"; }} className="relative min-h-[420px] overflow-hidden border-l border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 p-8 cursor-pointer transition hover:border-emerald-300/30">
  {/* Ambient AI glow */}
  <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
  <div className="absolute bottom-0 left-10 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

  {/* AI network lines */}
  <div className="absolute inset-0 opacity-40">
    <div className="absolute left-[18%] top-[28%] h-px w-[55%] rotate-[18deg] bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />
    <div className="absolute left-[30%] top-[62%] h-px w-[60%] -rotate-[20deg] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
    <div className="absolute right-[20%] top-[18%] h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.8)]" />
    <div className="absolute left-[24%] top-[42%] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.8)]" />
    <div className="absolute right-[30%] bottom-[25%] h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.8)]" />
  </div>

  {/* Odi intelligence core */}
  <div className="relative flex h-full min-h-[360px] items-center justify-center">
    <motion.div
      animate={{
        scale: [1, 1.04, 1],
        boxShadow: [
          '0 0 50px rgba(52,211,153,0.12)',
          '0 0 90px rgba(52,211,153,0.28)',
          '0 0 50px rgba(52,211,153,0.12)',
        ],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative flex h-52 w-52 items-center justify-center rounded-full border border-emerald-300/30 bg-slate-950/80 backdrop-blur-xl"
    >
      <div className="absolute inset-4 rounded-full border border-emerald-300/10" />
      <div className="absolute inset-8 rounded-full border border-cyan-300/10" />

      <div className="text-center">
        <Sparkles className="mx-auto h-8 w-8 text-emerald-300" />
        <p className="mt-3 text-4xl font-semibold text-white">Odi</p>
        <p className="mt-1 text-xs uppercase tracking-[0.24em] text-emerald-300">
          AI Assistant
        </p>
      </div>
    </motion.div>

    {/* Floating capability cards */}
    <div className="absolute left-0 top-8 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-emerald-300" />
        <div>
          <p className="text-xs font-semibold text-white">CV Review</p>
          <p className="text-[11px] text-slate-400">Stronger applications</p>
        </div>
      </div>
    </div>

    <div className="absolute right-0 top-20 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <MessageCircle className="h-5 w-5 text-cyan-300" />
        <div>
          <p className="text-xs font-semibold text-white">Interview Practice</p>
          <p className="text-[11px] text-slate-400">Build confidence</p>
        </div>
      </div>
    </div>

    <div className="absolute bottom-8 left-4 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <TrendingUp className="h-5 w-5 text-emerald-300" />
        <div>
          <p className="text-xs font-semibold text-white">Job Insights</p>
          <p className="text-[11px] text-slate-400">Find better opportunities</p>
        </div>
      </div>
    </div>

    <div className="absolute bottom-16 right-0 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <Sparkles className="h-5 w-5 text-cyan-300" />
        <div>
          <p className="text-xs font-semibold text-white">Career Guidance</p>
          <p className="text-[11px] text-slate-400">Your next step</p>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
      </section>

      {/* Insights */}
      <section className="bg-white text-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-600">Latest Insights</p><h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Ideas, perspectives and practical advice.</h2></div><p className="max-w-xl text-slate-600">Practical perspectives on business analysis, transformation, process improvement and delivery.</p></div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
  {blogPosts.slice(0, 3).map((post, index) => {
    const insightImages = [
      '/images/insight-ba-coaching.png',
      '/images/insight-business-analysis.png',
      '/images/insight-process-improvement.png',
    ];

    return (
      <motion.article
        key={post.title}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.07)]"
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={insightImages[index]}
            alt=""
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4">
            <span className="rounded-full border border-white/20 bg-slate-950/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-xl">
              {post.category}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
              Insight
            </span>

            <span className="text-xs text-slate-400">
              {post.readTime}
            </span>
          </div>

          <h3 className="mt-4 text-xl font-semibold leading-7 text-slate-950">
            {post.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {post.desc}
          </p>

          <button
            onClick={() => {
              window.history.pushState({}, '', '/insights');
              window.dispatchEvent(new PopStateEvent('popstate'));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-slate-950 transition group-hover:text-emerald-600"
          >
            Read more
            <ArrowRight className="h-4 w-4 text-emerald-600 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </motion.article>
    );
  })}
</div>
</div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_45%,rgba(16,185,129,0.16),transparent_34%)]" />
        <div className="absolute -right-24 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-emerald-300/10" />
        <div className="absolute -right-10 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full border border-cyan-300/10" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Let’s work together</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">Create better outcomes.</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">Have a project, process, or change challenge? Let’s bring clarity to the problem and structure to the next step.</p>
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-200">Book a Consultation <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="relative min-h-[300px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-56 w-56 rounded-full border border-emerald-300/20 bg-white/[0.03] shadow-[0_0_80px_rgba(16,185,129,0.12)] backdrop-blur-xl">
                  <div className="absolute inset-6 rounded-full border border-white/10" />
                  <div className="absolute inset-12 rounded-full border border-emerald-300/10" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-300">Arcklen</p>
                      <p className="mt-2 text-2xl font-semibold text-white">Clarity</p>
                      <p className="mt-1 text-sm text-slate-400">→ Action → Outcomes</p>
                    </div>
                  </div>
                </div>
                <div className="absolute left-0 top-8 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">People</p>
                  <p className="mt-1 text-sm text-slate-300">Aligned teams</p>
                </div>
                <div className="absolute right-0 top-10 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">Processes</p>
                  <p className="mt-1 text-sm text-slate-300">Clearer ways of working</p>
                </div>
                <div className="absolute bottom-6 left-10 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">Progress</p>
                  <p className="mt-1 text-sm text-slate-300">Meaningful outcomes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PremiumPageHero page="about" />

      {/* Meet Nuel */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          {/* Founder portrait */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-900 shadow-2xl"
          >
            <div className="aspect-[4/5] w-full lg:aspect-auto lg:h-full lg:min-h-[720px]">
              <img
                src="/nuel-profile.jpg"
                alt="Nuel - Founder & Senior Business Analyst at Arcklen Group"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-6 pt-28">
              <span className="inline-flex rounded-full border border-white/10 bg-slate-950/75 px-4 py-2 text-xs font-medium text-white backdrop-blur">
                Founder, Arcklen Group
              </span>
            </div>
          </motion.div>

          {/* Founder story */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-xl lg:p-10"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
              <Sparkles className="h-4 w-4" />
              The person behind Arcklen
            </div>

            <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Meet Nuel
            </h2>

            <p className="mt-3 text-lg font-medium text-emerald-300">
              Founder & Senior Business Analyst
            </p>

            <div className="mt-7 space-y-5 text-base leading-8 text-slate-300">
              <p>
                I’m Nuel, the founder of Arcklen Group and a Senior Business
                Analyst with 10+ years of experience across banking, financial
                services, business analysis, and transformation.
              </p>

              <p>
                Throughout my career, I’ve worked at the intersection of
                <span className="font-semibold text-white">
                  {" "}
                  people, processes, and technology
                </span>
                — helping organisations understand what needs to change, why it
                matters, and how to turn that understanding into practical
                delivery.
              </p>

              <p>
                My experience spans requirements engineering, stakeholder
                management, process improvement, digital product delivery,
                business transformation, and structured delivery within
                complex and regulated environments.
              </p>

              <p>
                I created Arcklen because I saw a common challenge across
                organisations: good ideas often struggle to become good
                outcomes when requirements are unclear, processes are poorly
                understood, or stakeholders aren’t aligned.
              </p>

              <p>
                <span className="font-semibold text-white">
                  Arcklen exists to close that gap
                </span>{" "}
                — bringing clarity, structure, and practical delivery support
                to change.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
                My philosophy
              </p>

              <h3 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Bring clarity to complexity.
                <br />
                <span className="text-emerald-300">
                  Turn clarity into action.
                </span>
              </h3>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Arcklen is built around a practical approach to consulting. The
                goal is not to add more complexity, but to make problems easier
                to understand, decisions easier to make, and change easier to
                deliver.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-xl lg:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                What I bring
              </p>

              <div className="mt-4 space-y-3">
                {[
                  {
                    title: "Clarity",
                    desc: "Turning complex problems into something teams can understand and act on.",
                  },
                  {
                    title: "Structure",
                    desc: "Creating requirements, processes, and documentation people can actually use.",
                  },
                  {
                    title: "Delivery",
                    desc: "Keeping analysis connected to practical actions and real business outcomes.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-full bg-emerald-400/10 p-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                      </div>

                      <div>
                        <p className="font-semibold text-white">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How I Work */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
              How I work
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Practical thinking. Clear structure. Better delivery.
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              Whether I’m supporting a transformation initiative, improving a
              business process, or helping teams turn complex requirements
              into practical delivery, I keep the approach structured and
              focused on outcomes.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Understand",
                desc: "Understand the business problem, the people involved, and the outcome that needs to be achieved.",
              },
              {
                number: "02",
                title: "Clarify",
                desc: "Turn complexity into clear requirements, processes, decisions, documentation, and priorities.",
              },
              {
                number: "03",
                title: "Deliver",
                desc: "Support teams in turning those decisions into practical actions and measurable outcomes.",
              },
            ].map((item) => (
              <motion.div
                key={item.number}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-[28px] border border-white/10 bg-slate-950/70 p-7"
              >
                <span className="text-sm font-semibold tracking-[0.2em] text-emerald-300">
                  {item.number}
                </span>

                <h3 className="mt-5 text-2xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-300">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.05] p-8 shadow-2xl lg:p-12">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
                Let’s work together
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Have a project, process, or change challenge?
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                Let’s have a conversation about where you need clarity,
                structure, or delivery support.
              </p>
            </div>

            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PremiumPageHero page="services" />
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Core Services</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Support built around business analysis, process improvement, and change delivery</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIconMap[index % serviceIconMap.length];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="group rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-7 shadow-[0_24px_80px_rgba(15,23,42,0.22)] transition"
              >
                <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-lg">
                  <Icon className="h-5 w-5 text-emerald-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <BookingCard />
          <div className="rounded-[34px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-8 shadow-2xl">
            <h3 className="text-2xl font-semibold text-white">Why businesses choose Arcklen</h3>
            <div className="mt-6 space-y-4">
              {whyChooseArcklen.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer"
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
              >
                Book a Consultation
              </a>
              <a
                href={`mailto:${businessEmail}`}
                className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Send an Enquiry
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CaseStudiesPage() {
  return (
    <>
      <PremiumPageHero page="case-studies" />
      <section className="mx-auto max-w-4xl px-6 py-20 text-center lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Coming next</p>
        <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Real challenges. Real work. Real outcomes.</h2>
        <p className="mt-5 text-lg leading-8 text-slate-300">We’re building Arcklen’s case studies from real project experience so every example reflects genuine work, contribution, and outcomes.</p>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-slate-900">Discuss a project <ArrowRight className="h-4 w-4" /></a>
      </section>
    </>
  );
}

function InsightsPage() {
  return (
    <>
      <PremiumPageHero page="insights" />
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {blogPosts.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-white/10 bg-slate-950/80 p-7 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">{item.category}</span>
                <span className="text-xs uppercase tracking-[0.18em] text-slate-500">{item.readTime}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.desc}</p>
              <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Read article <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PremiumPageHero page="contact" />
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[36px] border border-white/10 bg-gradient-to-r from-blue-600/20 via-slate-900 to-emerald-500/20 p-8 shadow-[0_30px_120px_rgba(15,23,42,0.45)] backdrop-blur-xl lg:p-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-200">Need clarity on a project, process, or change initiative?</p>
              <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Let’s discuss your next step</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-200">
                Whether you need clearer requirements, stronger process documentation, change support, or BA interview coaching, Arcklen can help you move from uncertainty to a more structured next step.
              </p>
            </div>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/80 p-7 shadow-xl">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Direct Contact</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Speak to Arcklen</h3>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
                  UK Based
                </div>
              </div>

              <div className="mt-6 space-y-5 text-slate-300">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-emerald-300" />
                  <span>United Kingdom</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-emerald-300" />
                  <span>{businessEmail}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-emerald-300" />
                  <a href={`tel:${businessPhone}`} className="hover:underline">
                    {businessPhone}
                  </a>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-slate-400">
                Best for project enquiries, consulting support, process improvement work, and BA coaching discussions.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5">
                  Book a Consultation
                </a>
                <a href={`mailto:${businessEmail}`} className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">
                  Send an Enquiry
                </a>
              </div>
            </div>
          </div>

          <ContactFormCard />
        </div>
      </section>
    </>
  );
}


function AnimatedServiceStrip() {
  const items = [
    'Business Analysis & Transformation Consulting',
    'Business Analysis',
    'Process Improvement',
    'Change & Transformation',
    'Clearer Processes',
    'Better Outcomes',
  ];

  const trackItems = [...items, ...items];

  return (
    <div className="overflow-hidden border-b border-white/10 bg-slate-900/80">
      <motion.div
        className="flex w-max items-center py-2.5"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {trackItems.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center whitespace-nowrap">
            <span className="px-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400 sm:text-[11px]">
              {item}
            </span>
            <span className="text-emerald-300/70">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function RobChatbot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'welcome' | 'support' | 'result'>('welcome');
  const [selection, setSelection] = useState('');
  const [showNudge, setShowNudge] = useState(true);

  const options = [
    'Business Analysis',
    'Process Improvement',
    'Change & Transformation',
    'BA Career Coaching',
    "I'm not sure",
  ];

  const responses: Record<string, string> = {
    'Business Analysis':
      'Arcklen provides practical Business Analysis support across requirements discovery, stakeholder workshops, process modelling, user stories, acceptance criteria, and delivery support.',
    'Process Improvement':
      'Arcklen can help clarify workflows, map processes, develop SOPs, and create structured documentation that improves operational consistency and clarity.',
    'Change & Transformation':
      'Arcklen supports change initiatives through impact analysis, stakeholder alignment, governance structure, implementation readiness, and delivery-focused analysis.',
    'BA Career Coaching':
      'Arcklen offers focused BA coaching including interview preparation, CV positioning, mock interviews, and practical guidance for career progression.',
    "I'm not sure":
      'That’s completely fine. Tell us about the challenge you’re facing and we can help identify where structured analysis, process improvement, or change support could make the biggest difference.',
  };

  const startConversation = () => {
    setStep('support');
    setSelection('');
    setShowNudge(false);
  };

  const chooseOption = (option: string) => {
    setSelection(option);
    setStep('result');
  };

  const reset = () => {
    setStep('welcome');
    setSelection('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] sm:bottom-6 sm:right-6">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="mb-4 w-[calc(100vw-2.5rem)] max-w-[390px] overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/98 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
          role="dialog"
          aria-label="Rob, Arcklen Website Assistant"
        >
          {/* Header */}
          <div className="border-b border-white/10 bg-gradient-to-r from-white/[0.07] to-emerald-400/[0.05] px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
                  <Sparkles className="h-5 w-5 text-emerald-300" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">Rob</p>
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-200">
                      Online
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">Arcklen Website Assistant</p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close Rob"
                className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Conversation */}
          <div className="max-h-[540px] overflow-y-auto p-5">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
              </div>

              <div className="min-w-0 flex-1 rounded-2xl rounded-tl-md bg-white/[0.06] p-4 text-sm leading-6 text-slate-200">
                {step === 'welcome' && (
                  <>
                    <p className="font-medium text-white">Hi, I’m Rob 👋</p>
                    <p className="mt-2">
                      I can help you find the right Arcklen support for your business, project, or career goals.
                    </p>
                  </>
                )}

                {step === 'support' && (
                  <>
                    <p className="font-medium text-white">What can I help you with?</p>
                    <p className="mt-1 text-slate-400">Choose an option and I’ll point you in the right direction.</p>
                  </>
                )}

                {step === 'result' && (
                  <>
                    <p className="font-medium text-white">Here’s where Arcklen may be able to help.</p>
                    <p className="mt-3">{responses[selection]}</p>
                    <p className="mt-3 text-slate-300">
                      If you’d like, you can discuss the details directly with Nuel.
                    </p>
                  </>
                )}
              </div>
            </div>

            {step === 'support' && (
              <div className="mt-4 space-y-2 pl-10">
                {options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => chooseOption(option)}
                    className="flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-white"
                  >
                    <span>{option}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                  </motion.button>
                ))}
              </div>
            )}

            {step === 'welcome' && (
              <button
                onClick={startConversation}
                className="mt-4 ml-10 inline-flex w-[calc(100%-2.5rem)] items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
              >
                Tell Rob what you need
                <ArrowRight className="h-4 w-4" />
              </button>
            )}

            {step === 'result' && (
              <div className="mt-4 pl-10">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Talk to Nuel
                  <ArrowRight className="h-4 w-4" />
                </a>

                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setStep('support')}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                  >
                    Explore another
                  </button>
                  <button
                    onClick={reset}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
                  >
                    Start again
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 px-5 py-3">
            <p className="text-center text-[11px] text-slate-500">
              Rob provides guided information about Arcklen’s services.
            </p>
          </div>
        </motion.div>
      )}

      {!open && showNudge && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.35 }}
          className="mb-3 mr-1 hidden max-w-[220px] rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-3 text-sm text-slate-200 shadow-xl backdrop-blur-xl sm:block"
        >
          <button onClick={() => setShowNudge(false)} className="float-right ml-3 text-slate-500 hover:text-white" aria-label="Dismiss Rob message">
            <X className="h-3 w-3" />
          </button>
          <p className="pr-2">
            Need help finding the right Arcklen service? <span className="font-medium text-emerald-300">Ask Rob.</span>
          </p>
        </motion.div>
      )}

      <motion.button
        onClick={() => {
          setOpen((previous) => !previous);
          setShowNudge(false);
        }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        aria-label={open ? 'Close Rob' : 'Open Rob'}
        aria-expanded={open}
        className="ml-auto flex items-center gap-3 rounded-full border border-emerald-400/20 bg-slate-950/95 px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl transition hover:border-emerald-400/40"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/10">
          {open ? <X className="h-4 w-4 text-emerald-300" /> : <MessageCircle className="h-4 w-4 text-emerald-300" />}
        </span>
        <span>{open ? 'Close Rob' : 'Ask Rob'}</span>
      </motion.button>
    </div>
  );
}

function OdiPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [cvText, setCvText] = useState('');
  const [cvFileName, setCvFileName] = useState('');
  const [isDraggingCv, setIsDraggingCv] = useState(false);
const [cvReview, setCvReview] = useState('');
const [isReviewing, setIsReviewing] = useState(false);
const [reviewMessageIndex, setReviewMessageIndex] = useState(0);

const reviewMessages = [
  'Reading your CV…',
  'Identifying your strongest experience…',
  'Looking for evidence of impact…',
  'Assessing your Business Analysis capabilities…',
  'Checking your career positioning…',
  'Building your recommendations…',
  'Almost there…',
];
useEffect(() => {
  if (!isReviewing) {
    setReviewMessageIndex(0);
    return;
  }

  const interval = window.setInterval(() => {
    setReviewMessageIndex((current) =>
      (current + 1) % reviewMessages.length,
    );
  }, 2200);

  return () => {
    window.clearInterval(interval);
  };
}, [isReviewing]);
const [reviewError, setReviewError] = useState('');
const [copiedRewrite, setCopiedRewrite] = useState<number | null>(null);
  const tools = [
    {
      title: 'Review my CV',
      description: 'Identify strengths, gaps, clarity issues, and opportunities to improve your CV.',
      icon: FileText,
      active: true,
    },
    {
      title: 'Analyse a job',
      description: 'Break down a job description and understand what the employer is really looking for.',
      icon: TrendingUp,
      active: true,
    },
    {
      title: 'Match CV to role',
      description: 'Compare your CV against a role and see where you are strong and where you need work.',
      icon: CheckCircle2,
      active: false,
    },
    {
      title: 'Practise an interview',
      description: 'Practise realistic Business Analyst interview questions with structured feedback.',
      icon: MessageCircle,
      active: false,
    },
  ];

  const handleCvFile = async (event: FormEvent<HTMLInputElement>) => {
  const file = event.currentTarget.files?.[0];

if (!file) return;

const maxFileSize = 5 * 1024 * 1024;

if (file.size > maxFileSize) {
  setCvFileName('');
  setCvText('');
  setReviewError('Your CV file is too large. Please upload a file smaller than 5 MB.');
  return;
}

setCvFileName(file.name);
  setCvText('');
  setReviewError('');

  const fileName = file.name.toLowerCase();

  if (file.type === 'text/plain' || fileName.endsWith('.txt')) {
    const reader = new FileReader();

    reader.onload = () => {
      setCvText(String(reader.result ?? ''));
    };

    reader.readAsText(file);
    return;
  }

  if (file.type === 'application/pdf' || fileName.endsWith('.pdf')) {
  try {
    const pdfjsLib = await import('pdfjs-dist');
    const pdfWorker = await import(
      'pdfjs-dist/build/pdf.worker.min.mjs?url'
    );

    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker.default;

    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;
      const pageTexts: string[] = [];

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber);
        const content = await page.getTextContent();

        const text = content.items
          .map((item) => ('str' in item ? item.str : ''))
          .join(' ');

        pageTexts.push(text);
      }

      setCvText(pageTexts.join('\n\n'));
    } catch (error) {
      console.error('PDF extraction error:', error);
      setReviewError(
        'Odi could not read this PDF. Please try another PDF or paste your CV text instead.',
      );
    }

    return;
  }

  if (
  file.type ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
  fileName.endsWith('.docx')
) {
  try {
    const mammoth = await import('mammoth');
    const arrayBuffer = await file.arrayBuffer();

    const result = await mammoth.extractRawText({
      arrayBuffer,
    });

      setCvText(result.value);
    } catch (error) {
      console.error('DOCX extraction error:', error);
      setReviewError(
        'Odi could not read this Word document. Please try another DOCX file or paste your CV text instead.',
      );
    }

    return;
  }

  setReviewError(
    'This file type is not supported yet. Please upload a PDF, DOCX or TXT file, or paste your CV text.',
  );
};
const handleCvDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
  event.preventDefault();
  setIsDraggingCv(true);
};

const handleCvDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
  event.preventDefault();
  setIsDraggingCv(false);
};

const handleCvDrop = async (event: React.DragEvent<HTMLLabelElement>) => {
  event.preventDefault();
  setIsDraggingCv(false);

  const file = event.dataTransfer.files?.[0];

  if (!file) return;

  const input = event.currentTarget.querySelector('input[type="file"]');

  if (input instanceof HTMLInputElement) {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    input.files = dataTransfer.files;

    input.dispatchEvent(new Event('change', { bubbles: true }));
  }
};
const handleCopyRewrite = async (rewrite: string, index: number) => {
  try {
    await navigator.clipboard.writeText(
      rewrite.replace(/^>\s*/gm, '').replace(/\*\*/g, '').trim(),
    );

    setCopiedRewrite(index);

    window.setTimeout(() => {
      setCopiedRewrite(null);
    }, 2000);
  } catch (error) {
    console.error('Copy rewrite error:', error);
    setReviewError('Odi could not copy this rewrite. Please select and copy the text manually.');
  }
};
  const handleCvReview = async () => {
    if (!cvText.trim()) {
      setReviewError('Please paste your CV text before starting the review.');
      return;
    }

    setIsReviewing(true);
    setReviewError('');
    setCvReview('');

    try {
      const response = await fetch('/api/review-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cvText: cvText.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Odi could not review the CV.');
      }

      setCvReview(data.review || '');
    } catch (error) {
      console.error('CV review error:', error);
      setReviewError(
        error instanceof Error
          ? error.message
          : 'Odi could not review the CV right now. Please try again.',
      );
    } finally {
      setIsReviewing(false);
    }
  };
  const renderCvRewrites = (review: string) => {
  const rewriteSectionMatch = review.match(
    /(?:#{2,4}\s*)?8\.\s*Suggested CV rewrites([\s\S]*)/i,
  );

  if (!rewriteSectionMatch) return null;

  const rewriteSection = rewriteSectionMatch[1];

  const rewrites = rewriteSection
    .split(/(?:#{2,4}\s*)?Rewrite\s+\d+\s*:?\s*/i)
    .slice(1)
    .map((block) => {
      const currentMatch = block.match(
        /Current CV statement\s*([\s\S]*?)(?=What could be improved|Stronger version)/i,
      );

      const improvementMatch = block.match(
        /What could be improved\s*([\s\S]*?)(?=Stronger version)/i,
      );

      const strongerMatch = block.match(
        /Stronger version\s*([\s\S]*)/i,
      );

      return {
        current: currentMatch?.[1]?.trim() || '',
        improvement: improvementMatch?.[1]?.trim() || '',
        stronger: strongerMatch?.[1]?.trim() || '',
      };
    })
    .filter(
      (rewrite) =>
        rewrite.current ||
        rewrite.improvement ||
        rewrite.stronger,
    );

  if (!rewrites.length) return null;

  return (
    <div className="mt-8">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
          Suggested CV rewrites
        </p>

        <h4 className="mt-2 text-xl font-semibold text-white">
          Stronger versions of your CV statements
        </h4>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Odi has identified areas where your existing experience can be
          presented more clearly and effectively.
        </p>
      </div>

      <div className="space-y-5">
        {rewrites.map((rewrite, index) => (
          <div
            key={index}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-300/10 text-sm font-semibold text-emerald-300">
                {index + 1}
              </div>

              <h5 className="text-base font-semibold text-white">
                CV rewrite
              </h5>
            </div>

            {rewrite.current && (
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Current CV statement
                </p>

                <p className="mt-2 rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm leading-6 text-slate-400">
                  {rewrite.current
                    .replace(/^>\s*/gm, '')
                    .replace(/\*\*/g, '')}
                </p>
              </div>
            )}

            {rewrite.improvement && (
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  What could be improved
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {rewrite.improvement
                    .replace(/^>\s*/gm, '')
                    .replace(/\*\*/g, '')}
                </p>
              </div>
            )}

            {rewrite.stronger && (
              <div className="mt-4 rounded-xl border border-emerald-300/15 bg-emerald-300/[0.04] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                  Stronger version
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-200">
                  {rewrite.stronger
                    .replace(/^>\s*/gm, '')
                    .replace(/\*\*/g, '')}
                </p>

                
                <button
                  type="button"
                  onClick={() =>
                    handleCopyRewrite(rewrite.stronger, index)
                  }
                  className="mt-4 inline-flex items-center rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-semibold text-emerald-200 transition hover:bg-emerald-300/15"
                >
                  {copiedRewrite === index
                    ? 'Copied'
                    : 'Copy rewrite'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const renderCvReview = (review: string) => {
    return review.split('\n').map((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) {
        return <div key={index} className="h-3" />;
      }

      if (trimmedLine === '---') {
        return <div key={index} className="my-5 border-t border-white/10" />;
      }

      if (trimmedLine.startsWith('### ')) {
        return (
          <h4
            key={index}
            className="mt-6 text-lg font-semibold text-white first:mt-0"
          >
            {trimmedLine.replace(/^### /, '').replace(/\*\*/g, '')}
          </h4>
        );
      }

      if (trimmedLine.startsWith('## ')) {
        return (
          <h4
            key={index}
            className="mt-7 text-xl font-semibold text-emerald-200 first:mt-0"
          >
            {trimmedLine.replace(/^## /, '').replace(/\*\*/g, '')}
          </h4>
        );
      }

      if (trimmedLine.startsWith('- ')) {
        return (
          <div key={index} className="flex gap-3 py-1.5 text-slate-300">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" />
            <span>{trimmedLine.slice(2).replace(/\*\*/g, '')}</span>
          </div>
        );
      }

      if (trimmedLine.startsWith('> ')) {
        return (
          <blockquote
            key={index}
            className="my-4 border-l-2 border-emerald-300/40 pl-4 italic text-slate-400"
          >
            {trimmedLine.slice(2).replace(/\*\*/g, '')}
          </blockquote>
        );
      }

      return (
        <p key={index} className="py-1 leading-7 text-slate-300">
          {trimmedLine.replace(/\*\*/g, '')}
        </p>
      );
    });
  };
  return (
    <main className="bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <LuxeBackground />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/5 px-4 py-2 text-sm text-emerald-200">
              <Sparkles className="h-4 w-4" />
              Odi AI Assistant
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Your AI Business Analysis & Career Assistant.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Analyse roles, strengthen your CV, understand your match, and prepare for interviews with a dedicated assistant built for Business Analysts.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {['CV Review', 'Job Analysis', 'CV Matching', 'Interview Practice'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
            Start with Odi
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Choose what you want to work on.
          </h2>

          <p className="mt-4 text-slate-400">
            Odi is being built around the tasks that matter most when you are preparing for your next opportunity.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <button
                key={tool.title}
                type="button"
                disabled={!tool.active}
                onClick={() => {
  if (!tool.active) return;

  const toolKey =
    tool.title === 'Review my CV' ? 'cv-review' : 'job-analysis';

  const sectionId =
    tool.title === 'Review my CV'
      ? 'cv-review-section'
      : 'job-analysis-section';

  setActiveTool(toolKey);

  window.setTimeout(() => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}}
                className={`group rounded-3xl border p-7 text-left transition ${
                  tool.active
                    ? 'border-emerald-300/20 bg-emerald-300/[0.04] hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-300/[0.07]'
                    : 'cursor-default border-white/10 bg-white/[0.04]'
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-300">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  {tool.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {tool.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
                  {tool.active ? 'Start review' : 'Coming next'}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {activeTool === 'cv-review' && (
        <section
  id="cv-review-section"
  className="border-t border-white/10 bg-white/[0.02]"
>
          <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
            <div className="rounded-3xl border border-emerald-300/20 bg-slate-900/70 p-7 shadow-2xl sm:p-10">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
                    CV Review
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                    Give Odi your CV.
                  </h2>

                  <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                    Upload your CV or paste the text below. Odi will use this information to review your experience and help you strengthen your application.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTool(null)}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5"
                >
                  Close
                </button>
              </div>

              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                <label
  onDragOver={handleCvDragOver}
  onDragLeave={handleCvDragLeave}
  onDrop={handleCvDrop}
  className={`flex min-h-64 cursor-pointer flex-col justify-between rounded-2xl border border-dashed p-6 transition ${
    isDraggingCv
      ? 'border-emerald-300 bg-emerald-300/[0.08] scale-[1.01]'
      : 'border-emerald-300/30 bg-emerald-300/[0.03] hover:border-emerald-300/50 hover:bg-emerald-300/[0.05]'
  }`}
>
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/10 text-emerald-300">
                      <FileText className="h-6 w-6" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                      Upload your CV
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      PDF, DOCX or TXT · Maximum 5 MB
                    </p>
                  </div>

                  <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-300 px-5 py-3 text-sm font-semibold text-slate-950">
                    Choose file
                    <ArrowRight className="h-4 w-4" />
                  </div>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleCvFile}
                    className="hidden"
                  />
                </label>

                <div>
                  <label className="text-sm font-semibold text-slate-200">
                    Or paste your CV
                  </label>

                  <textarea
                    value={cvText}
                    onChange={(event) => setCvText(event.target.value)}
                    placeholder="Paste the text from your CV here..."
                    className="mt-3 min-h-64 w-full resize-y rounded-2xl border border-white/10 bg-slate-950 p-5 text-sm leading-7 text-white outline-none placeholder:text-slate-600 focus:border-emerald-300/40"
                  />
                </div>
              </div>

              {cvFileName && (
                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-slate-300">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  Selected: {cvFileName}
                </div>
              )}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Your CV is sent to our AI service to generate your Odi review.
                </p>

                <button
                  type="button"
                  onClick={handleCvReview}
                  disabled={(!cvText.trim() && !cvFileName) || isReviewing}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isReviewing ? (
  <>
    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-slate-950" />
    Odi is analysing your CV...
  </>
) : (
  <>
    Start CV Review
    <ArrowRight className="h-4 w-4" />
  </>
)}
                </button>
              </div>
              {isReviewing && (
  <div className="mt-6 rounded-2xl border border-emerald-300/10 bg-emerald-300/[0.03] p-5">
    <div className="flex items-center gap-3">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-300/20 border-t-emerald-300" />
      <div>
        <p className="font-semibold text-white">
          Odi is analysing your CV
        </p>
        <p className="mt-1 text-sm text-slate-400">
  {reviewMessages[reviewMessageIndex]}
</p>
      </div>
    </div>
  </div>
)}
                            {reviewError && (
                <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/[0.05] p-5 text-sm leading-6 text-red-200">
                  {reviewError}
                </div>
              )}

              {cvReview && (
                <div className="mt-8 rounded-3xl border border-emerald-300/20 bg-slate-950/70 p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                    <div>
  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
    Odi analysis
  </p>
  <h3 className="mt-2 text-2xl font-semibold text-white">
    Your CV Review
  </h3>
</div>
                  </div>

                  <div className="mt-6 text-sm">
  {renderCvReview(cvReview)}
</div>
{renderCvRewrites(cvReview)}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="rounded-3xl border border-emerald-300/10 bg-emerald-300/[0.03] p-8 sm:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">
                  Built for real applications
                </p>

                <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
                  Odi will become your personal career workspace.
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-slate-400">
                  Start with CV and job analysis. Then build towards interview simulation, job tracking, and smarter career preparation.
                </p>
              </div>

              <a
                href="/"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-200"
              >
                Back to Arcklen
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
export default function ArcklenConsultingWebsite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageKey>(getPageFromPath());

  useEffect(() => {
    const handleRouteChange = () => setCurrentPage(getPageFromPath());
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const navItems = useMemo(
    () => [
      { label: 'Home', href: '/' as const, key: 'home' as PageKey },
      { label: 'About', href: '/about' as const, key: 'about' as PageKey },
      { label: 'Services', href: '/services' as const, key: 'services' as PageKey },
      { label: 'Case Studies', href: '/case-studies' as const, key: 'case-studies' as PageKey },
      { label: 'Insights', href: '/insights' as const, key: 'insights' as PageKey },
      { label: 'Contact', href: '/contact' as const, key: 'contact' as PageKey },
    ],
    []
  );

  const navigateTo = (href: string) => {
    window.history.pushState({}, '', href);
    setCurrentPage(getPageFromPath());
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'case-studies':
        return <CaseStudiesPage />;
      case 'insights':
        return <InsightsPage />;
      case 'contact':
        return <ContactPage />;
      case 'odi':
        return <OdiPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SeoManager page={currentPage} />
      <RobChatbot />

      <div className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-sm text-slate-300 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-200">
            <Sparkles className="h-3.5 w-3.5" />
            Business Analysis & Transformation Consulting
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-500" />
              <a href={`mailto:${businessEmail}`} className="hover:underline">
                {businessEmail}
              </a>
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-500" />
              <a href={`tel:${businessPhone}`} className="hover:underline">
                {businessPhone}
              </a>
            </span>
          </div>
        </div>
      </div>

      <AnimatedServiceStrip />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <button onClick={() => navigateTo('/')} className="flex items-center gap-4 text-left">
            <img src="/logo.png" alt="Arcklen Group Logo" className="h-12 w-auto rounded-xl" />
            <div>
              <p className="text-base font-semibold tracking-[0.14em] text-white">Arcklen Group Limited</p>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Business Analysis & Transformation Consulting</p>
            </div>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigateTo(item.href)}
                className={`text-sm font-medium transition hover:text-white ${currentPage === item.key ? 'text-white' : 'text-slate-300'}`}
              >
                {item.label}
              </button>
            ))}
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>

          <button onClick={() => setMobileOpen((prev) => !prev)} className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 px-6 py-5 lg:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button key={item.label} onClick={() => navigateTo(item.href)} className="text-left text-sm text-slate-300">
                  {item.label}
                </button>
              ))}
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900">
                Book a Consultation
              </a>
            </div>
          </div>
        )}
      </header>

      {renderPage()}

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 pb-28 lg:grid-cols-4 lg:px-8 lg:pb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Arcklen Group Logo" className="h-12 w-auto rounded-xl" />
              <div>
                <h3 className="text-xl font-semibold text-white">Arcklen Group Limited</h3>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Business Analysis & Transformation Consulting</p>
              </div>
            </div>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
              Arcklen supports UK businesses with business analysis, process improvement, documentation, and change & transformation support.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Quick Links</h4>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              {navItems.map((item) => (
                <button key={item.label} onClick={() => navigateTo(item.href)} className="text-left transition hover:text-white">
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Business Info</h4>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p>United Kingdom</p>
              <p>{businessEmail}</p>
              <p>
                <a href={`tel:${businessPhone}`} className="hover:underline">
                  {businessPhone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const __sanityChecks = {
  navItemCount: 6,
  serviceCount: services.length,
  caseStudyCount: caseStudies.length,
  blogPostCount: blogPosts.length,
};












