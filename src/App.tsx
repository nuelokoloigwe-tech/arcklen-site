import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  FileText,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
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

export default function ArcklenConsultingWebsite() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Industries', href: '#industries' },
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'Insights', href: '#insights' },
      { label: 'Contact', href: '#contact' },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white" id="home">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src="/Arcklen Group Limited logo.png"
                alt="Arcklen Group Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide">Arcklen Group Limited</p>
              <p className="text-xs text-slate-400">Consulting • Strategy • Business Analysis</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:scale-[1.02]"
            >
              Let’s Talk
            </a>
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
          <div className="border-t border-white/10 px-6 py-4 lg:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-slate-300"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-emerald-500/20" />
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              Full Business Website Concept
            </div>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Building credible business presence with clarity, structure, and consulting value.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Arcklen Group Limited is a modern consulting brand focused on business analysis, transformation support,
              strategic advisory, and professional services for organisations and individuals.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:scale-[1.02]"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="rounded-2xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Contact Us
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:justify-self-end"
          >
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[22px] bg-slate-900/80 p-6">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-400">Business Focus</p>
                    <h2 className="text-2xl font-semibold">Built for growth</h2>
                  </div>
                  <div className="rounded-2xl bg-emerald-400/15 px-3 py-2 text-sm text-emerald-300">Growth Ready</div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {services.slice(0, 4).map((service, index) => {
                    const Icon = serviceIconMap[index % serviceIconMap.length];
                    return (
                      <div key={service.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="mb-3 inline-flex rounded-xl border border-white/10 bg-slate-950/80 p-2">
                          <Icon className="h-4 w-4 text-emerald-300" />
                        </div>
                        <h3 className="text-base font-semibold">{service.title}</h3>
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

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-4 lg:px-8">
        {[
          { value: '6+', label: 'Service Areas' },
          { value: 'End-to-End', label: 'Delivery Support' },
          { value: 'SMEs & Professionals', label: 'Client Focus' },
          { value: 'UK Based', label: 'Business Presence' },
        ].map((item) => (
          <div key={item.label} className="rounded-[24px] border border-white/10 bg-white/5 p-6 text-center shadow-lg">
            <p className="text-2xl font-bold text-white">{item.value}</p>
            <p className="mt-2 text-sm text-slate-400">{item.label}</p>
          </div>
        ))}
      </section>

      <section id="about" className="border-y border-white/10 bg-white/5">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">About Us</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A consulting brand with practical business value</h2>
            <p className="mt-5 leading-8 text-slate-300">
              Arcklen Group Limited is positioned as a consulting business serving organisations and individuals who need
              support with analysis, improvement, documentation, change initiatives, and structured execution.
            </p>
            <p className="mt-4 leading-8 text-slate-300">
              The brand is built to present a professional, modern, and trusted image while remaining flexible enough to
              expand into a multi-service business over time.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-8 shadow-xl">
            <h3 className="text-2xl font-semibold">Why clients work with Arcklen</h3>
            <div className="mt-5 space-y-4 text-slate-300">
              {[
                'Clear thinking that turns complex needs into actionable steps.',
                'Strong business analysis foundations with delivery awareness.',
                'Professional support for both organisations and individual clients.',
                'Flexible service model that can grow with your brand and ambitions.',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Services</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What Arcklen can help with</h2>
          <p className="mt-4 text-slate-300">
            Flexible support for organisations and individuals looking for structure, insight, and delivery confidence.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = serviceIconMap[index % serviceIconMap.length];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-lg"
              >
                <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-slate-900/70 p-3">
                  <Icon className="h-5 w-5 text-emerald-300" />
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Trusted By</p>
              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Built to serve ambitious teams and professionals</h2>
            </div>
            <p className="max-w-2xl text-slate-300">
              A strong brand presence supported by structured delivery, practical consulting support, and professional
              coaching services.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {clientLogos.map((logo) => (
              <div
                key={logo}
                className="rounded-[20px] border border-white/10 bg-slate-950/60 px-6 py-5 text-center text-lg font-semibold text-slate-200 shadow-lg"
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Industries</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Sectors we can support</h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {industries.map((industry) => (
              <div key={industry} className="rounded-[24px] border border-white/10 bg-slate-950/60 p-6 shadow-lg">
                <h3 className="text-lg font-semibold">{industry}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Tailored support designed around structure, clarity, documentation, and operational improvement.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="founder" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-xl">
            <img src="/Arcklen Group Limited logo.png" alt="Founder" className="mb-4 w-20" />
            <h3 className="text-2xl font-semibold">Founder</h3>
            <p className="mt-4 leading-8 text-slate-300">
              Arcklen Group Limited is led by Nuel Okoloigwe, a Business Analyst and consulting professional focused on
              helping organisations bring structure, clarity, and delivery confidence to business change and
              transformation initiatives.
            </p>
            <p className="mt-4 leading-8 text-slate-300">
              With experience in financial services and consulting environments, the goal of Arcklen is to combine
              practical business analysis with strategic thinking to support businesses and professionals navigating
              complex problems.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold">Leadership & Vision</h2>
            <p className="mt-5 leading-8 text-slate-300">
              Arcklen was created to become a trusted advisory brand that supports organisations with analysis,
              documentation, change delivery, and strategic thinking while also helping professionals grow in their
              careers.
            </p>
          </div>
        </div>
      </section>

      <section id="case-studies" className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Case Studies</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Selected work and outcomes</h2>
            <p className="mt-4 text-slate-300">
              A consulting website needs proof of thinking. This section shows the kind of structured results Arcklen can
              deliver.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/10 bg-slate-950/60 p-6 shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Outcome</p>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.desc}</p>
                <div className="mt-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-200">
                  {item.result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">Testimonials</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">What clients say</h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={`${item.name}-${item.role}`} className="rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-lg">
              <p className="text-sm leading-7 text-slate-300">“{item.quote}”</p>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-slate-400">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Book a Consultation</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Make it easy for visitors to contact you</h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-300">
              This booking section can later connect to Calendly, Google Calendar, or a custom booking flow so prospects
              can schedule calls directly.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-xl">
            <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-slate-900/70 p-3">
              <CalendarDays className="h-6 w-6 text-emerald-300" />
            </div>
            <h3 className="text-2xl font-semibold">Consultation Booking</h3>
            <p className="mt-3 leading-7 text-slate-300">
              Add your booking tool here to allow strategy calls, BA coaching sessions, and discovery meetings.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02]">
                Book Discovery Call
              </button>
              <button className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                View Availability
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">BA Interview Coaching</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">A dedicated path for Business Analyst candidates</h2>
              <p className="mt-4 leading-8 text-slate-300">
                Arcklen can also support aspiring and experienced Business Analysts with interview preparation,
                confidence building, and stronger self-presentation.
              </p>
              <div className="mt-6 space-y-4">
                {coachingFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-8 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">Ideal For</p>
              <div className="mt-5 grid gap-4">
                {[
                  'Entry-level BA candidates',
                  'Professionals switching into BA roles',
                  'Senior BAs preparing for interviews',
                  'Candidates needing mock interview support',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="insights" className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">Insights</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Articles and business insights</h2>
              <p className="mt-4 text-slate-300">
                A section for blog posts, educational content, and thought leadership pieces that strengthen your online
                presence.
              </p>
            </div>
            <a href="#contact" className="text-sm font-semibold text-white underline underline-offset-4">
              Discuss content strategy
            </a>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {insights.map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/10 bg-slate-950/60 p-6 shadow-lg">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  {item.tag}
                </span>
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.desc}</p>
                <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  Read more <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">SEO Ready Structure</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Built with search visibility in mind</h2>
              <p className="mt-4 max-w-2xl leading-8 text-slate-300">
                The website now includes clear service sections, founder credibility, case studies, coaching offers, and
                searchable business themes that help position Arcklen better online.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {seoKeywords.map((keyword) => (
                <div
                  key={keyword}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300"
                >
                  <Search className="h-4 w-4 text-emerald-300" />
                  <span>{keyword}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[32px] border border-white/10 bg-gradient-to-r from-blue-600/20 to-emerald-500/20 p-8 shadow-2xl backdrop-blur">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-200">Contact Us</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Let’s build a stronger business presence</h2>
              <p className="mt-4 max-w-xl text-slate-200">
                This full website concept gives Arcklen a professional home online and can be expanded further with live
                forms, booking, case studies, service pages, and a real blog.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-6">
              <p className="text-sm text-slate-400">Get in touch</p>
              <div className="mt-5 space-y-4 text-slate-300">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4" />
                  <span>United Kingdom</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  <span>Email address can be added here</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4" />
                  <span>Phone number can be added here</span>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:scale-[1.02]">
                  Book a Consultation
                </button>
                <button className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Request a Callback
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-4 lg:px-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-xl bg-white">
                <img
                  src="/Arcklen Group Limited logo.png"
                  alt="Arcklen Group Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">Arcklen Group Limited</h3>
            </div>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
              A modern consulting brand focused on business analysis, strategic support, transformation thinking, and
              professional business services.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Quick Links</h4>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              {navItems.slice(1).map((item) => (
                <a key={item.label} href={item.href} className="transition hover:text-white">
                  {item.label}
                </a>
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
  navItemCount: 8,
  serviceCount: services.length,
  caseStudyCount: caseStudies.length,
  testimonialCount: testimonials.length,
};