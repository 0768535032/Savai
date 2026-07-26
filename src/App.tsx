import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Check,
  Mail,
  Quote,
  Sparkles,
  Pen,
  Compass,
  Layers,
  Send,
} from 'lucide-react';
import Logo from './components/Logo';
import { supabase, type Inquiry, type Subscriber } from './lib/supabase';

const taglines = [
  {
    brand: 'KFC',
    line: 'No time for lunch at work? Bring work to lunch.',
    insight:
      'Kenyans skip lunch not because they want to, but because the day won’t wait. This line reframes KFC from a meal choice into a workaround for the busy professional — turning a constraint into a craving.',
    tone: 'Playful, urban, fast-paced',
  },
  {
    brand: 'Fargo',
    line: 'Go far with Fargo.',
    insight:
      'For a logistics company, distance is the entire value proposition. This line positions Fargo as a growth partner for Kenyan SMEs and e-commerce operators who need to reach beyond their neighborhood.',
    tone: 'Confident, expansive, reliable',
  },
  {
    brand: 'Supa Loaf',
    line: 'Supa Life.',
    insight:
      'Bread is daily. Life is daily. Collapsing the two makes Supa Loaf inseparable from the rhythm of an ordinary Kenyan morning. Two words, one identity.',
    tone: 'Warm, everyday, essential',
  },
  {
    brand: 'Festive Bread',
    line: 'Every day is festive.',
    insight:
      'Festive’s name implies occasion. This line democratizes the feeling — you don’t need a holiday to deserve good bread. It reframes an everyday purchase as a small celebration.',
    tone: 'Joyful, inclusive, uplifting',
  },
  {
    brand: 'Umoja Shoes',
    line: 'Umoja ni Mimi na Wewe, Umoja ni Nguvu.',
    insight:
      'Unity is me and you. Unity is strength. In Swahili, this line carries the weight of a proverb and the rhythm of a march. It makes every pair of shoes a statement about standing together.',
    tone: 'Bold, cultural, unifying',
  },
];

const services = [
  {
    name: 'Brand Audit & Positioning Workshop',
    tier: 'Tier 01',
    icon: Compass,
    price: 'KSh 85,000 \u2013 120,000',
    description:
      'A half-day session with your founding team. We diagnose where your brand stands today, name the gaps, and deliver a written brief with a recommended direction.',
    deliverables: ['Brand audit report', 'Positioning statement', 'Recommended direction', 'Written creative brief'],
    footnote: 'Your foot in the door. Often converts into a full identity build.',
  },
  {
    name: 'Full Brand Identity Build',
    tier: 'Tier 02',
    icon: Layers,
    price: 'KSh 600,000 \u2013 1,200,000',
    description:
      'Strategy, visual identity, and voice. Logo, colour, type, brand guidelines, messaging pillars, and templates for social and stationery. The core product.',
    deliverables: ['Brand strategy', 'Logo & visual system', 'Brand guidelines book', 'Voice & messaging framework', 'Social & stationery templates'],
    footnote: 'Recommended. This is where most clients land.',
    featured: true,
  },
  {
    name: 'Brand Partnership',
    tier: 'Tier 03',
    icon: Sparkles,
    price: 'KSh 80,000 \u2013 150,000 / month',
    description:
      'Ongoing monthly retainer. I function as your fractional brand director \u2014 attending campaign reviews, approving creative, and running quarterly strategy sessions.',
    deliverables: ['Monthly creative reviews', 'Quarterly strategy sessions', 'Campaign approval & guidance', 'Ongoing brand consulting'],
    footnote: 'Minimum three-month commitment.',
  },
];

const steps = [
  {
    n: '01',
    title: 'Discovery',
    text: 'We sit down with your team and understand the business behind the brand. What you sell, who you serve, what you believe, and where the gaps are.',
  },
  {
    n: '02',
    title: 'Strategy',
    text: 'We define positioning, voice, and messaging pillars. This is the thinking layer \u2014 the part that separates a logo from a brand.',
  },
  {
    n: '03',
    title: 'Identity',
    text: 'We build the visual system: logo, colour, type, and guidelines. Every element earns its place by serving the strategy.',
  },
  {
    n: '04',
    title: 'Embed',
    text: 'We brief your team, not just your designers. The brand lives inside the organisation before it lives in the market. The Monday morning is the real launch.',
  },
];

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'BUNI', href: '#buni' },
  { label: 'Contact', href: '#contact' },
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTagline, setActiveTagline] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [subStatus, setSubStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const heroRef = useRef<HTMLDivElement>(null);

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveTagline((prev) => (prev + 1) % taglines.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const handleInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Inquiry = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      company: String(data.get('company') || ''),
      service: String(data.get('service') || ''),
      message: String(data.get('message') || ''),
    };
    const { error } = await supabase.from('inquiries').insert(payload);
    if (error) {
      setFormStatus('error');
    } else {
      setFormStatus('sent');
      form.reset();
    }
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubStatus('sending');
    const form = e.currentTarget;
    const email = String(new FormData(form).get('email') || '');
    const { error } = await supabase.from('subscribers').insert({ email } as Subscriber);
    if (error) {
      if (error.code === '23505') {
        setSubStatus('sent');
      } else {
        setSubStatus('error');
      }
    } else {
      setSubStatus('sent');
      form.reset();
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink grain">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-paper/90 backdrop-blur-md border-b border-ink/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
          <a href="#top" className="text-ink">
            <Logo />
          </a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-inksoft hover:text-terracotta transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 bg-ink text-cream px-5 py-2.5 rounded-full text-sm font-medium hover:bg-terracotta transition-colors"
            >
              Start a project
              <ArrowRight className="w-4 h-4" />
            </a>
          </nav>
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-paper border-t border-ink/10 px-6 py-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-inksoft hover:text-terracotta"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-1.5 bg-ink text-cream px-5 py-3 rounded-full text-sm font-medium w-fit"
            >
              Start a project <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="top" ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] rounded-full bg-terracotta/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full bg-sage/15 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-ink/5 border border-ink/10 rounded-full px-4 py-1.5 text-sm font-medium text-inksoft mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
              Brand & visual identity consultancy \u2014 Nairobi
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.02] tracking-tight text-balance">
              We help growing brands{' '}
              <span className="italic text-terracotta">find their voice</span>{' '}
              before they can afford a full agency.
            </h1>
            <p className="mt-8 text-lg lg:text-xl text-inksoft max-w-xl leading-relaxed">
              Savai Creative is a brand strategy and visual identity consultancy based in Nairobi. We work with founders, funded startups, and mid-size companies that need to sound and feel bigger than they are.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-ink text-cream px-7 py-4 rounded-full text-base font-medium hover:bg-terracotta transition-colors group"
              >
                Start a project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 border border-ink/20 text-ink px-7 py-4 rounded-full text-base font-medium hover:border-ink hover:bg-ink/5 transition-all"
              >
                See the thinking
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#D67E5E" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#9AAB8F" stopOpacity="0.25" />
                  </linearGradient>
                </defs>
                <circle cx="200" cy="200" r="180" fill="url(#bgGrad)" />
                <path
                  d="M140 100 Q80 100 80 170 Q80 240 140 240 L260 240 Q320 240 320 310 Q320 380 260 380"
                  stroke="#1A1614"
                  strokeWidth="14"
                  fill="none"
                  strokeLinecap="round"
                  className="stroke-path"
                />
                <path
                  d="M240 70 A70 70 0 0 1 310 140"
                  stroke="#C65D3C"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  className="stroke-path"
                  style={{ animationDelay: '0.4s' }}
                />
              </svg>
              <div className="absolute -bottom-4 -right-4 bg-cream border border-ink/10 rounded-2xl px-5 py-3 shadow-lg animate-float">
                <p className="text-xs font-medium text-inksoft uppercase tracking-wider">From scratch</p>
                <p className="font-display text-lg font-medium">BUNI Newsletter</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-ink/10 bg-cream py-5 overflow-hidden">
        <div className="flex gap-12 animate-[float_30s_linear_infinite] whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center shrink-0">
              {['KFC', 'Fargo', 'Supa Loaf', 'Festive Bread', 'Umoja Shoes', 'Equity Bank', 'Safaricom', 'EABL'].map((b) => (
                <span key={b} className="font-display text-2xl font-medium text-ink/40">{b}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* WORK / SPEC TAGLINES */}
      <section id="work" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="reveal max-w-3xl mb-16">
            <p className="text-sm font-semibold text-terracotta uppercase tracking-widest mb-4">Speculative work</p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
              Unsolicited brand work for real Kenyan companies.
            </h2>
            <p className="mt-6 text-lg text-inksoft leading-relaxed">
              Nobody hired us to write these. We wrote them to prove the thinking against real briefs. Each tagline is paired with the strategic insight behind it \u2014 because a clever line without reasoning is just a lucky guess.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Tagline selector */}
            <div className="lg:col-span-5 space-y-3">
              {taglines.map((t, i) => (
                <button
                  key={t.brand}
                  onClick={() => setActiveTagline(i)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all ${
                    activeTagline === i
                      ? 'border-terracotta bg-cream shadow-md'
                      : 'border-ink/10 bg-paper hover:border-ink/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display text-xl font-medium">{t.brand}</span>
                    <ArrowUpRight
                      className={`w-5 h-5 transition-all ${
                        activeTagline === i ? 'text-terracotta' : 'text-ink/30'
                      }`}
                    />
                  </div>
                  <p className={`font-display text-lg italic ${activeTagline === i ? 'text-ink' : 'text-ink/50'}`}>
                    {t.line}
                  </p>
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div className="lg:col-span-7 lg:sticky lg:top-24 self-start">
              <div className="bg-ink text-cream rounded-3xl p-10 lg:p-14 min-h-[480px] flex flex-col justify-between">
                <div>
                  <span className="text-terracotta-light text-sm font-semibold uppercase tracking-widest">
                    {taglines[activeTagline].brand}
                  </span>
                  <h3 className="mt-6 font-display text-3xl lg:text-4xl font-medium leading-tight italic">
                    {taglines[activeTagline].line}
                  </h3>
                </div>
                <div className="mt-10 space-y-6">
                  <div>
                    <p className="text-cream/50 text-xs font-semibold uppercase tracking-widest mb-2">The insight</p>
                    <p className="text-cream/80 text-base lg:text-lg leading-relaxed">
                      {taglines[activeTagline].insight}
                    </p>
                  </div>
                  <div>
                    <p className="text-cream/50 text-xs font-semibold uppercase tracking-widest mb-2">Tone</p>
                    <p className="text-cream/80 text-base">{taglines[activeTagline].tone}</p>
                  </div>
                </div>
                <div className="mt-10 flex items-center gap-3">
                  {taglines.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all ${
                        activeTagline === i ? 'w-8 bg-terracotta' : 'w-4 bg-cream/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 lg:py-32 bg-cream border-y border-ink/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="reveal max-w-3xl mb-16">
            <p className="text-sm font-semibold text-terracotta uppercase tracking-widest mb-4">What we offer</p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
              Three tiers. Project-priced, never hourly.
            </h2>
            <p className="mt-6 text-lg text-inksoft leading-relaxed">
              Hourly billing punishes you for being efficient. We sell outcomes, not time. Each tier is designed so clients self-select — and so there’s always somewhere to grow into.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.tier}
                  className={`reveal relative rounded-3xl p-8 flex flex-col ${
                    s.featured
                      ? 'bg-ink text-cream border-2 border-terracotta shadow-xl lg:-translate-y-4'
                      : 'bg-paper border border-ink/10'
                  }`}
                >
                  {s.featured && (
                    <span className="absolute -top-3 left-8 bg-terracotta text-cream text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                      Recommended
                    </span>
                  )}
                  <div className={`inline-flex w-12 h-12 rounded-xl items-center justify-center mb-6 ${
                    s.featured ? 'bg-cream/10' : 'bg-ink/5'
                  }`}>
                    <Icon className={`w-6 h-6 ${s.featured ? 'text-terracotta-light' : 'text-terracotta'}`} />
                  </div>
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${s.featured ? 'text-cream/50' : 'text-ink/40'}`}>
                    {s.tier}
                  </p>
                  <h3 className="font-display text-2xl font-medium leading-tight mb-3">{s.name}</h3>
                  <p className={`text-sm leading-relaxed mb-6 ${s.featured ? 'text-cream/70' : 'text-inksoft'}`}>
                    {s.description}
                  </p>
                  <ul className="space-y-2.5 mb-8">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${s.featured ? 'text-terracotta-light' : 'text-terracotta'}`} />
                        <span className={s.featured ? 'text-cream/80' : 'text-inksoft'}>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <p className={`font-display text-xl font-medium mb-1 ${s.featured ? 'text-cream' : 'text-ink'}`}>
                      {s.price}
                    </p>
                    <p className={`text-xs ${s.featured ? 'text-cream/50' : 'text-ink/40'}`}>{s.footnote}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="reveal max-w-3xl mb-16">
            <p className="text-sm font-semibold text-terracotta uppercase tracking-widest mb-4">How we work</p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
              The design is the easy part. The Monday morning is not.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 rounded-3xl overflow-hidden border border-ink/10">
            {steps.map((s) => (
              <div key={s.n} className="reveal bg-paper p-8 lg:p-10 flex flex-col">
                <span className="font-display text-5xl font-medium text-terracotta mb-6">{s.n}</span>
                <h3 className="font-display text-2xl font-medium mb-3">{s.title}</h3>
                <p className="text-inksoft leading-relaxed text-sm">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="reveal mt-12 bg-ink text-cream rounded-3xl p-10 lg:p-16 text-center">
            <Quote className="w-10 h-10 text-terracotta-light mx-auto mb-6" />
            <p className="font-display text-2xl lg:text-3xl font-medium italic leading-tight max-w-3xl mx-auto">
              The companies that get rebrands right don\u2019t launch a new identity. They reveal one.
            </p>
            <p className="mt-6 text-cream/50 text-sm">From BUNI Issue 01 \u2014 Why most rebrands fail before they launch</p>
          </div>
        </div>
      </section>

      {/* BUNI NEWSLETTER */}
      <section id="buni" className="py-24 lg:py-32 bg-sage/10 border-y border-ink/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <p className="text-sm font-semibold text-terracotta uppercase tracking-widest mb-4">The newsletter</p>
            <h2 className="font-display text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight">
              BUNI
            </h2>
            <p className="mt-4 font-display text-xl italic text-inksoft">Brand thinking from scratch.</p>
            <p className="mt-8 text-lg text-inksoft leading-relaxed max-w-lg">
              Buni means <em>to invent, to originate</em> in Swahili. Every two weeks, one sharp take on a real brand decision \u2014 one case the world knows, one case Nairobi knows, one argument that connects them.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['No fluff', 'No agency-speak', 'Named opinions', 'Nairobi-grounded'].map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 bg-cream border border-ink/10 rounded-full px-4 py-2 text-sm font-medium text-inksoft">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="reveal">
            <div className="bg-cream rounded-3xl p-8 lg:p-12 border border-ink/10 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Pen className="w-5 h-5 text-terracotta" />
                <span className="font-display text-lg font-medium">Issue 01 is live</span>
              </div>
              <h3 className="font-display text-2xl font-medium leading-tight mb-2">
                Why most rebrands fail before they launch
              </h3>
              <p className="text-inksoft text-sm mb-8">The Monday morning problem nobody talks about.</p>

              {subStatus === 'sent' ? (
                <div className="flex items-center gap-3 bg-sage/20 border border-sage/30 rounded-2xl p-5">
                  <Check className="w-5 h-5 text-sage-dark" />
                  <p className="text-sm font-medium text-ink">You’re on the list. Next issue lands Tuesday.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@company.com"
                      className="flex-1 px-5 py-3.5 rounded-full bg-paper border border-ink/15 text-ink placeholder:text-ink/40 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={subStatus === 'sending'}
                      className="inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-3.5 rounded-full font-medium hover:bg-terracotta transition-colors disabled:opacity-60 whitespace-nowrap"
                    >
                      {subStatus === 'sending' ? 'Subscribing...' : 'Subscribe'}
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  {subStatus === 'error' && (
                    <p className="text-sm text-terracotta-dark">Something went wrong. Try again.</p>
                  )}
                  <p className="text-xs text-ink/40">Biweekly. No spam. Unsubscribe anytime.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16">
          <div className="reveal">
            <p className="text-sm font-semibold text-terracotta uppercase tracking-widest mb-4">Start a project</p>
            <h2 className="font-display text-4xl lg:text-5xl font-medium leading-tight tracking-tight">
              Let’s find your voice.
            </h2>
            <p className="mt-6 text-lg text-inksoft leading-relaxed max-w-md">
              Tell me about your company and what you’re trying to build. I read every message and respond within two business days.
            </p>
            <div className="mt-12 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <p className="text-sm text-ink/50">Email</p>
                  <p className="font-medium">hello@savai.co</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center shrink-0">
                  <span className="text-terracotta font-display text-sm font-medium">NBO</span>
                </div>
                <div>
                  <p className="text-sm text-ink/50">Based in</p>
                  <p className="font-medium">Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal">
            {formStatus === 'sent' ? (
              <div className="bg-ink text-cream rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-terracotta flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-cream" />
                </div>
                <h3 className="font-display text-2xl font-medium mb-3">Message received.</h3>
                <p className="text-cream/70 max-w-sm">
                  Thank you. I’ll be in touch within two business days. In the meantime, subscribe to BUNI for a taste of how I think.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquiry} className="bg-cream border border-ink/10 rounded-3xl p-8 lg:p-10 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-inksoft mb-2">Name</label>
                    <input
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-paper border border-ink/15 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-inksoft mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-paper border border-ink/15 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-inksoft mb-2">Company</label>
                  <input
                    name="company"
                    className="w-full px-4 py-3 rounded-xl bg-paper border border-ink/15 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                    placeholder="Company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-inksoft mb-2">What do you need?</label>
                  <select
                    name="service"
                    className="w-full px-4 py-3 rounded-xl bg-paper border border-ink/15 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all"
                    defaultValue=""
                  >
                    <option value="" disabled>Select a service...</option>
                    <option>Brand Audit & Positioning Workshop</option>
                    <option>Full Brand Identity Build</option>
                    <option>Brand Partnership (Retainer)</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-inksoft mb-2">Project details</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-paper border border-ink/15 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 transition-all resize-none"
                    placeholder="Tell me about your company, your timeline, and what you’re trying to achieve."
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-ink text-cream px-7 py-4 rounded-full font-medium hover:bg-terracotta transition-colors disabled:opacity-60"
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send inquiry'}
                  <ArrowRight className="w-5 h-5" />
                </button>
                {formStatus === 'error' && (
                  <p className="text-sm text-terracotta-dark text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-cream py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <Logo className="text-cream" />
              <p className="mt-4 text-cream/60 text-sm max-w-xs leading-relaxed">
                Brand strategy and visual identity for growing Kenyan companies. From Nairobi, for brands that need to sound bigger than they are.
              </p>
            </div>
            <div>
              <p className="text-cream/40 text-xs font-semibold uppercase tracking-widest mb-4">Navigate</p>
              <ul className="space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-cream/70 hover:text-terracotta-light transition-colors text-sm">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-cream/40 text-xs font-semibold uppercase tracking-widest mb-4">Connect</p>
              <ul className="space-y-2.5">
                <li><a href="mailto:hello@savai.co" className="text-cream/70 hover:text-terracotta-light transition-colors text-sm">hello@savai.co</a></li>
                <li><span className="text-cream/70 text-sm">Nairobi, Kenya</span></li>
                <li><a href="#buni" className="text-cream/70 hover:text-terracotta-light transition-colors text-sm">Subscribe to BUNI</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-cream/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-cream/40 text-sm">Savai Creative. {new Date().getFullYear()}. Originate.</p>
            <p className="font-display text-sm italic text-cream/50">The companies that get rebrands right don’t launch a new identity. They reveal one.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
