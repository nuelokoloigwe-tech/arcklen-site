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
    title: 'Business Analysis Consulting',
    desc: 'Requirements gathering, stakeholder engagement, user stories, process mapping, and analysis support for projects and change initiatives.',
  },
  {
    title: 'Process Improvement & Documentation',
    desc: 'SOP creation, process mapping, requirement packs, and structured documentation that improves clarity and operational consistency.',
  },
  {
    title: 'Change & Transformation Support',
    desc: 'Support for business change initiatives including impact analysis, delivery support, governance structure, and implementation readiness.',
  },
  {
    title: 'BA Career Coaching',
    desc: 'Interview preparation, CV positioning, mock interviews, and coaching for aspiring or experienced Business Analysts.',
  },
];

const audienceCards = [
  {
    title: 'SMEs needing clearer processes',
    desc: 'Support for growing businesses that need stronger process clarity, better documentation, and more structure around delivery.',
  },
  {
    title: 'Financial services and change teams',
    desc: 'Practical business analysis and transformation support for teams managing change, stakeholder alignment, and implementation readiness.',
  },
  {
    title: 'BA professionals preparing for interviews',
    desc: 'Focused coaching for aspiring and experienced Business Analysts who want stronger interview structure, confidence, and positioning.',
  },
];

const caseStudies = [
  {
    title: 'Mortgage Process Improvement',
    desc: 'Mapped workflows and clarified stakeholder requirements to improve alignment and reduce operational friction.',
  },
  {
    title: 'Operations Documentation Pack',
    desc: 'Developed structured SOPs and process documentation to improve consistency and operational readiness.',
  },
  {
    title: 'BA Interview Coaching Programme',
    desc: 'Helped candidates improve interview structure, confidence, and performance through targeted coaching.',
  },
];



const blogPosts = [
  {
    title: 'How to Pass a Business Analyst Interview with Confidence',
    category: 'BA Coaching',
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

const trustIndicators = ['UK Based', 'Business Analysis', 'Process Improvement', 'Change Support'];

const whyChooseArcklen = [
  'Clear and practical business analysis',
  'Strong documentation and process thinking',
  'Delivery-focused support, not just theory',
  'Professional guidance for business and career growth',
];

const founderCredibility = [
  'UK-based Business Analyst',
  'Experience in structured delivery, stakeholder engagement, and process improvement',
  'Practical, delivery-focused consulting approach',
];

const seoKeywords = [
  'Business Analysis Consulting UK',
  'Transformation Support',
  'Process Improvement',
  'Business Analyst Coaching',
  'Requirements Gathering',
  'Change Support UK',
];

const metrics = [
  { value: 'UK Based', label: 'Consulting Presence' },
  { value: '4', label: 'Core Services' },
  { value: 'SMEs & FS', label: 'Primary Audience' },
  { value: 'Delivery-Focused', label: 'Approach' },
];

type PageKey = 'home' | 'about' | 'services' | 'case-studies' | 'insights' | 'contact';

const businessEmail = 'hello@arcklengroup.com';
const businessPhone = '+44 7498 847956';
const bookingUrl = '#';
// TODO: Replace with real Calendly booking link
const formEndpoint = https://formspree.io/f/mykbkjdw
// TODO: Replace with real Formspree or backend endpoint

const pageMeta: Record<PageKey, { title: string; eyebrow: string; description: string; seoTitle: string; seoDescription: string }> = {
  home: {
    title: 'Business Analysis & Transformation Support for Growing UK Businesses',
    eyebrow: 'Business Analysis & Transformation Consulting',
    description:
      'Arcklen Group helps organisations bring structure to change through clear requirements, stronger processes, practical documentation, and delivery-focused support.',
    seoTitle: 'Arcklen Group | Business Analysis & Transformation Consulting UK',
    seoDescription:
      'Arcklen Group provides business analysis consulting, process improvement, documentation, transformation support, and BA coaching for UK businesses.',
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
      'Explore Arcklen’s core offers across business analysis consulting, documentation, transformation support, and BA career coaching.',
    seoTitle: 'Services | Business Analysis & Transformation Consulting UK',
    seoDescription:
      'Explore Arcklen services: business analysis consulting, process improvement, change support, and BA career coaching.',
  },
  'case-studies': {
    title: 'Examples of structured support and practical outcomes',
    eyebrow: 'Case Studies',
    description:
      'See examples of how Arcklen supports process clarity, documentation, stakeholder alignment, and coaching outcomes.',
    seoTitle: 'Case Studies | Arcklen Group',
    seoDescription:
      'See practical examples of Arcklen’s work across process improvement, documentation, and BA coaching.',
  },
  insights: {
    title: 'Business analysis and change insights for growing organisations',
    eyebrow: 'Insights',
    description:
      'Read practical content on business analysis, process improvement, stakeholder management, and BA career growth.',
    seoTitle: 'Insights | Arcklen Group',
    seoDescription:
      'Read Arcklen insights on business analysis, documentation, transformation support, and BA interview preparation.',
  },
  contact: {
    title: 'Need clarity on a project, process, or change initiative?',
    eyebrow: 'Contact',
    description:
      'Whether you need business analysis support, stronger documentation, process improvement, or BA interview coaching, Arcklen can help bring structure and clarity to your next step.',
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
          className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
        >
          Book a Consultation
        </a>
        <a
          href="/contact"
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Send an Enquiry</p>
      <h3 className="mt-3 text-2xl font-semibold text-white">Tell us how Arcklen can help</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">
        Share a few details about your project, process, or business analysis needs and we will get back to you.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit} action={formEndpoint} method="POST">
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

function LandingPage({ navigateTo }: { navigateTo: (href: string) => void }) {
  return (
    <>
      <section className="relative overflow-hidden">
        <LuxeBackground />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28 lg:pt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              <Star className="h-4 w-4 text-emerald-300" />
              Business Analysis & Transformation Consulting
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Business Analysis & Transformation Support for Growing UK Businesses
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Arcklen Group helps organisations bring structure to change through clear requirements, stronger processes, practical documentation, and delivery-focused support.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('/contact')}
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-900 shadow-[0_30px_80px_rgba(255,255,255,0.18)] transition hover:-translate-y-0.5"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => navigateTo('/contact')}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Send an Enquiry
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {trustIndicators.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="lg:pl-6"
          >
            <div className="rounded-[32px] border border-white/10 bg-white/[0.07] p-4 shadow-[0_40px_120px_rgba(15,23,42,0.45)] backdrop-blur-2xl">
              <div className="rounded-[26px] border border-white/10 bg-slate-950/90 p-6">
                <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Focused Support</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Built for clarity and delivery</h2>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
                    UK Based
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {services.map((service, index) => {
                    const Icon = serviceIconMap[index % serviceIconMap.length];
                    return (
                      <div key={service.title} className="group rounded-[22px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20 hover:bg-white/[0.07]">
                        <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-lg">
                          <Icon className="h-5 w-5 text-emerald-300" />
                        </div>
                        <h3 className="text-base font-semibold text-white">{service.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{service.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {audienceCards.map((item, index) => {
            const Icon = serviceIconMap[index % serviceIconMap.length];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-7 shadow-[0_20px_60px_rgba(15,23,42,0.22)]"
              >
                <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-lg">
                  <Icon className="h-5 w-5 text-emerald-300" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Who We Help</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-4">
          {metrics.map((item) => (
            <div key={item.label} className="rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-6 shadow-[0_15px_40px_rgba(15,23,42,0.22)]">
              <p className="text-3xl font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">About</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Clarity for businesses delivering change</h2>
            <p className="mt-5 leading-8 text-slate-300">
              Arcklen Group Limited supports organisations that need clearer requirements, better processes, stronger documentation, and practical support delivering change.
            </p>
            <p className="mt-4 leading-8 text-slate-300">
              We combine business analysis thinking with hands-on transformation support to help teams move from ambiguity to action.
            </p>
            <p className="mt-4 leading-8 text-slate-300">
              Led by a UK-based Business Analyst, Arcklen works with businesses that want structured thinking, clear documentation, and effective delivery support.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.34)]">
            <h3 className="text-2xl font-semibold text-white">Why businesses choose Arcklen</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {whyChooseArcklen.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-3 inline-flex rounded-full bg-emerald-400/10 p-2 text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-7 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Focused Audience</p>
              <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Supporting UK businesses, delivery teams, and BA professionals</h2>
            </div>
            <p className="max-w-2xl text-slate-300">
              Arcklen is built for organisations that need structured business analysis, clearer process thinking, and practical support moving change work forward.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-10 rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-8 shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Founder Credibility</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Credible, structured support grounded in practical delivery</h2>
              <p className="mt-4 max-w-2xl leading-8 text-slate-300">
                Arcklen is led by a UK-based Business Analyst with a practical consulting style shaped by structured delivery, stakeholder engagement, and process improvement work.
              </p>
            </div>
            <div className="space-y-4">
              {founderCredibility.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/75 p-4 text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Core Services</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Support built around business analysis, process improvement, and delivery clarity</h2>
          </div>
          <p className="max-w-2xl text-slate-300">
            Arcklen’s services are shaped for organisations that need sharper requirements, stronger documentation, and delivery-focused support through change.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Case Studies</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Examples of structured support and practical outcomes</h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((item) => (
              <div key={item.title} className="rounded-[28px] border border-white/10 bg-slate-950/80 p-7 shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="rounded-[34px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-8 shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Call to Action</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Need clarity on a project, process, or change initiative?</h2>
              <p className="mt-4 max-w-2xl leading-8 text-slate-300">
                Whether you need clearer requirements, stronger process documentation, change support, or BA interview coaching, Arcklen can help you move from uncertainty to a more structured next step.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => navigateTo('/contact')}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
              >
                Book a Consultation
              </button>
              <button
                onClick={() => navigateTo('/contact')}
                className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Send an Enquiry
              </button>
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
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 shadow-xl">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Clarity for businesses delivering change</h2>
            <p className="mt-5 leading-8 text-slate-300">
              Arcklen Group Limited supports organisations that need clearer requirements, better processes, stronger documentation, and practical support delivering change.
            </p>
            <p className="mt-4 leading-8 text-slate-300">
              We combine business analysis thinking with hands-on transformation support to help teams move from ambiguity to action.
            </p>
            <p className="mt-4 leading-8 text-slate-300">
              Led by a UK-based Business Analyst, Arcklen works with businesses that want structured thinking, clear documentation, and effective delivery support.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.34)]">
            <h3 className="text-2xl font-semibold text-white">Why businesses choose Arcklen</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {whyChooseArcklen.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-3 inline-flex rounded-full bg-emerald-400/10 p-2 text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-7 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServicesPage({ navigateTo }: { navigateTo: (href: string) => void }) {
  return (
    <>
      <PremiumPageHero page="services" />
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Core Services</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Support built around business analysis, process improvement, and change delivery</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
              <button
                onClick={() => navigateTo('/contact')}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
              >
                Book a Consultation
              </button>
              <button
                onClick={() => navigateTo('/contact')}
                className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Send an Enquiry
              </button>
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
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-white/10 bg-slate-950/80 p-7 shadow-[0_24px_80px_rgba(15,23,42,0.24)]">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.desc}</p>
            </div>
          ))}
        </div>
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
                  <span>{businessPhone}</span>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-slate-400">
                Best for project enquiries, consulting support, process improvement work, and BA coaching discussions.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a href={bookingUrl} className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5">
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
        return <ServicesPage navigateTo={navigateTo} />;
      case 'case-studies':
        return <CaseStudiesPage />;
      case 'insights':
        return <InsightsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <LandingPage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SeoManager page={currentPage} />

      <div className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-sm text-slate-300 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-200">
            <Sparkles className="h-3.5 w-3.5" />
            Business Analysis & Transformation Consulting
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-500" />
              {businessEmail}
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-500" />
              {businessPhone}
            </span>
          </div>
        </div>
      </div>

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
            <button
              onClick={() => navigateTo('/contact')}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_20px_60px_rgba(255,255,255,0.12)] transition hover:-translate-y-0.5"
            >
              Book a Consultation
              <ArrowRight className="h-4 w-4" />
            </button>
          </nav>

          <button onClick={() => setMobileOpen((prev) => !prev)} className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:hidden" aria-label="Toggle menu">
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
              <button onClick={() => navigateTo('/contact')} className="mt-2 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900">
                Book a Consultation
              </button>
            </div>
          </div>
        )}
      </header>

      {renderPage()}

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-4 lg:px-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="Arcklen Group Logo" className="h-12 w-auto rounded-xl" />
              <div>
                <h3 className="text-xl font-semibold text-white">Arcklen Group Limited</h3>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Business Analysis & Transformation Consulting</p>
              </div>
            </div>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
              Arcklen supports UK businesses with business analysis consulting, process improvement, documentation, transformation support, and BA coaching.
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
              <p>{businessPhone}</p>
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
