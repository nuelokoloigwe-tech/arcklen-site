import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,  CheckCircle2,
  ChevronRight,
  FileText,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  X,
} from 'lucide-react';

const serviceIconMap = [FileText, TrendingUp, ShieldCheck, Sparkles, Briefcase, CheckCircle2];

const services = [
  {
    title: 'Business Analysis Consulting',
    desc: 'Requirements gathering, process mapping, stakeholder engagement, user story development, and delivery support for change initiatives.',
  },
  {
    title: 'Strategy & Transformation',
    desc: 'Practical advisory support for businesses improving operations, customer journeys, governance, and decision-making.',
  },
  {
    title: 'Project & Change Support',
    desc: 'Support with change coordination, documentation, implementation readiness, impact analysis, and structured delivery execution.',
  },
  {
    title: 'Career & Interview Coaching',
    desc: 'Interview preparation, CV positioning, career support, and coaching for aspiring and experienced Business Analysts.',
  },
  {
    title: 'Documentation & Process Design',
    desc: 'Professional business documents, process flows, SOPs, requirement packs, and operational support materials.',
  },
  {
    title: 'Real Estate & Admin Support',
    desc: 'Property-related coordination, managed support services, documentation support, and administrative business assistance.',
  },
];

const clientLogos = ['FinEdge', 'NovaSphere', 'PrimeNest', 'AxisPoint', 'BluePeak'];

const caseStudies = [
  {
    title: 'Mortgage Journey Process Improvement',
    result: 'Reduced process ambiguity and improved stakeholder alignment.',
    desc: 'Mapped current-state workflows, identified pain points, and created clearer requirements for a lending-related change initiative.',
  },
  {
    title: 'SME Operations Documentation Pack',
    result: 'Improved consistency and handover readiness.',
    desc: 'Developed structured SOPs, process documentation, and operating guidance to support a growing business team.',
  },
  {
    title: 'BA Interview Coaching Programme',
    result: 'Increased candidate confidence and interview readiness.',
    desc: 'Delivered structured coaching sessions covering storytelling, scenario answers, CV positioning, and mock interview practice.',
  },
];

const coachingFeatures = [
  'Mock interviews and feedback',
  'CV and LinkedIn positioning',
  'STAR answer coaching',
  'BA scenario and stakeholder questions',
];

const industries = [
  'Financial Services',
  'Consulting & Professional Services',
  'Property & Real Estate',
  'Operations & Service Businesses',
];

const testimonials = [
  {
    name: 'Client Team Lead',
    role: 'Transformation Programme',
    quote:
      'Arcklen brought structure, clarity, and momentum to our change work. The analysis was practical and easy for stakeholders to understand.',
  },
  {
    name: 'Business Owner',
    role: 'SME Advisory Client',
    quote:
      'We needed order around our processes and documentation. The support was professional, thoughtful, and immediately useful.',
  },
  {
    name: 'Career Coaching Client',
    role: 'Business Analyst Candidate',
    quote:
      'The interview coaching helped me present my experience with confidence and structure. It made a real difference.',
  },
];

const insights = [
  {
    title: 'Why Business Analysis Matters in Growing Organisations',
    tag: 'Insight',
    desc: 'How structured requirements and stakeholder engagement reduce confusion and improve delivery outcomes.',
  },
  {
    title: 'What Makes a Strong Change Initiative Successful',
    tag: 'Transformation',
    desc: 'A practical view of clarity, ownership, documentation, and communication in business change.',
  },
  {
    title: 'How to Prepare for a Business Analyst Interview',
    tag: 'Career',
    desc: 'A simple framework for telling your story, demonstrating value, and answering scenario-based questions.',
  },
];

const highlights = [
  'Process Improvement',
  'Stakeholder Management',
  'Requirements Documentation',
  'Change Delivery',
];

const seoKeywords = [
  'Business Analysis Consulting UK',
  'Transformation Support',
  'Business Analyst Interview Coaching',
  'Process Improvement Consulting',
];

const metrics = [
  { value: '6+', label: 'Service Areas' },
  { value: 'End-to-End', label: 'Delivery Support' },
  { value: 'SMEs & Professionals', label: 'Client Focus' },
  { value: 'UK Based', label: 'Business Presence' },
];

type PageKey = 'home' | 'about' | 'services' | 'case-studies' | 'insights' | 'contact';

const pageMeta: Record<PageKey, { title: string; eyebrow: string; description: string }> = {
  home: {
    title: 'Premium consulting presence for ambitious businesses.',
    eyebrow: 'Landing Page',
    description:
      'A high-converting landing page that introduces Arcklen clearly, establishes trust fast, and routes visitors into your key offers.',
  },
  about: {
    title: 'A consulting brand built around clarity, trust, and execution.',
    eyebrow: 'About Page',
    description:
      'A dedicated page that explains who Arcklen is, the quality of thinking behind the brand, and why clients should trust the business.',
  },
  services: {
    title: 'Premium services built around business value.',
    eyebrow: 'Services Page',
    description:
      'A focused service page that makes each offer feel more credible, premium, and easier for visitors to understand.',
  },
  'case-studies': {
    title: 'Selected work and visible outcomes.',
    eyebrow: 'Case Studies Page',
    description:
      'A proof-driven page that shows thinking, outcomes, and the type of transformation support Arcklen can provide.',
  },
  insights: {
    title: 'Thought leadership that strengthens your brand.',
    eyebrow: 'Insights Page',
    description:
      'A dedicated insights page for authority-building articles, guidance, and content that supports SEO and trust.',
  },
  contact: {
    title: 'Turn interest into conversations.',
    eyebrow: 'Contact Page',
    description:
      'A conversion-focused page for enquiries, consultations, and strong call-to-action pathways.',
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

function PremiumPageHero({ page }: { page: PageKey }) {
  const meta = pageMeta[page];

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.16),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute left-1/2 top-16 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

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

function LandingPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.16),transparent_30%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute left-1/2 top-24 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28 lg:pt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              <Star className="h-4 w-4 text-emerald-300" />
              Premium consulting website experience
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Make your business look trusted, premium, and impossible to ignore.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Arcklen Group Limited helps businesses and professionals communicate clarity, authority, and execution
              strength through consulting, analysis, transformation support, and strategic advisory.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-slate-900 shadow-[0_30px_80px_rgba(255,255,255,0.18)] transition hover:-translate-y-0.5"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                View Case Studies
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-sm text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                'Professional consulting presence',
                'Lead-generation focused layout',
                'Built to scale with your brand',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-sm leading-6 text-slate-300">{item}</p>
                </div>
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
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Business Focus</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">Built for growth and trust</h2>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-200">
                    Premium Positioning
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {services.slice(0, 4).map((service, index) => {
                    const Icon = serviceIconMap[index % serviceIconMap.length];
                    return (
                      <div
                        key={service.title}
                        className="group rounded-[22px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20 hover:bg-white/[0.07]"
                      >
                        <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-slate-900 p-3 shadow-lg">
                          <Icon className="h-5 w-5 text-emerald-300" />
                        </div>
                        <h3 className="text-base font-semibold text-white">{service.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{service.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {metrics.slice(0, 3).map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 text-center">
                      <p className="text-lg font-semibold text-white">{item.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-4">
          {metrics.map((item) => (
            <div
              key={item.label}
              className="rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-6 shadow-[0_15px_40px_rgba(15,23,42,0.22)]"
            >
              <p className="text-3xl font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-sm uppercase tracking-[0.22em] text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Trusted Positioning</p>
              <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Designed to feel credible from the first glance</h2>
            </div>
            <p className="max-w-2xl text-slate-300">
              Your website should not feel like a starter template. It should communicate confidence, clarity, and
              commercial value before the first call even happens.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {clientLogos.map((logo) => (
              <div
                key={logo}
                className="rounded-[22px] border border-white/10 bg-slate-950/80 px-6 py-5 text-center text-base font-semibold tracking-wide text-slate-200 shadow-lg"
              >
                {logo}
              </div>
            ))}
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
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">About Arcklen</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">A consulting brand built around clarity, trust, and execution</h2>
            <p className="mt-5 leading-8 text-slate-300">
              Arcklen Group Limited is positioned to serve organisations and individuals who need structure, business
              insight, confident execution, and modern professional support. The brand is designed to feel premium,
              commercially credible, and ready for long-term growth.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-slate-900/80 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.34)]">
            <h3 className="text-2xl font-semibold text-white">Why clients work with Arcklen</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                'Clear thinking that turns complex needs into actionable steps.',
                'Strong business analysis foundations with delivery awareness.',
                'Professional support for organisations and individual clients.',
                'A flexible service model that grows with your ambitions.',
              ].map((item) => (
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

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-8 shadow-2xl">
            <div className="inline-flex rounded-2xl border border-white/10 bg-slate-900 p-3">
              <img src="/logo.png" alt="Founder" className="h-16 w-auto rounded-xl" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-white">Founder</h3>
            <p className="mt-4 leading-8 text-slate-300">
              Arcklen Group Limited is led by Nuel Okoloigwe, a Business Analyst and consulting professional focused on helping organisations bring structure, clarity, and delivery confidence to business change and transformation initiatives.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Leadership & Vision</p>
            <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">A modern consulting presence that inspires confidence</h2>
            <p className="mt-6 max-w-2xl leading-8 text-slate-300">
              The strongest consulting websites do not just explain services. They communicate authority, premium positioning, and a sense of confidence that makes clients want to start the conversation.
            </p>
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
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-300">Services</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Premium services built around business value</h2>
          </div>
          <p className="max-w-2xl text-slate-300">
            Clear service packaging, premium layout, and stronger visual hierarchy make your business look far more established and trustworthy.
          </p>
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
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/90">
                  Learn more <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 rounded-[34px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-8 shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">BA Interview Coaching</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">A dedicated path for Business Analyst candidates</h2>
              <p className="mt-4 leading-8 text-slate-300">
                Arcklen also supports aspiring and experienced Business Analysts with interview preparation, confidence building, and stronger self-presentation.
              </p>
            </div>
            <div className="space-y-4">
              {coachingFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                  <span>{feature}</span>
                </div>
              ))}
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
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">Outcome</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.desc}</p>
              <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
                {item.result}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry) => (
            <div
              key={industry}
              className="rounded-[26px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.2)]"
            >
              <h3 className="text-lg font-semibold text-white">{industry}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Tailored support designed around structure, documentation, operational improvement, and delivery confidence.
              </p>
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
          {insights.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-white/10 bg-slate-950/80 p-7 shadow-xl">
              <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">
                {item.tag}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.desc}</p>
              <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                Read more <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[34px] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-8 shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">SEO Ready Structure</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Built to rank, position, and convert</h2>
              <p className="mt-4 max-w-2xl leading-8 text-slate-300">
                Clear services, founder credibility, case studies, coaching offers, and structured content all work together to position Arcklen more strongly online.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {seoKeywords.map((keyword) => (
                <div
                  key={keyword}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/75 p-4 text-sm text-slate-300"
                >
                  <Search className="h-4 w-4 text-emerald-300" />
                  <span>{keyword}</span>
                </div>
              ))}
            </div>
          </div>
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
        <div className="rounded-[36px] border border-white/10 bg-gradient-to-r from-blue-600/20 via-slate-900 to-emerald-500/20 p-8 shadow-[0_30px_120px_rgba(15,23,42,0.45)] backdrop-blur-xl lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-200">Contact Us</p>
              <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">Let’s build a stronger business presence</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-200">
                This website is now designed to look premium, communicate trust, and feel commercially credible from the first impression.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-950/75 p-7 shadow-xl">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Get in touch</p>
              <div className="mt-6 space-y-5 text-slate-300">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-emerald-300" />
                  <span>United Kingdom</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-emerald-300" />
                  <span>Email address can be added here</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-emerald-300" />
                  <span>Phone number can be added here</span>
                </div>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5">
                  Book a Consultation
                </button>
                <button className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Request a Callback
                </button>
              </div>
            </div>
          </div>
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
        return <ServicesPage />;
      case 'case-studies':
        return <CaseStudiesPage />;
      case 'insights':
        return <InsightsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 text-sm text-slate-300 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-emerald-200">
            <Sparkles className="h-3.5 w-3.5" />
            Premium consulting presence for modern businesses
          </div>
          <div className="hidden items-center gap-6 md:flex">
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-500" />
              Business email can be added
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-500" />
              Business phone can be added
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
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Consulting • Strategy • Business Analysis</p>
            </div>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigateTo(item.href)}
                className={`text-sm font-medium transition hover:text-white ${
                  currentPage === item.key ? 'text-white' : 'text-slate-300'
                }`}
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

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-2xl border border-white/10 bg-white/5 p-3 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 px-6 py-5 lg:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigateTo(item.href)}
                  className="text-left text-sm text-slate-300"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => navigateTo('/contact')}
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900"
              >
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
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Consulting • Strategy • Business Analysis</p>
              </div>
            </div>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
              A modern consulting brand focused on business analysis, strategic support, transformation thinking, and professional business services.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Quick Links</h4>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigateTo(item.href)}
                  className="text-left transition hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Business Info</h4>
            <div className="mt-4 space-y-3 text-sm text-slate-400">
              <p>United Kingdom</p>
              <p>Business email can be added</p>
              <p>Business phone can be added</p>
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
  testimonialCount: testimonials.length,
};
