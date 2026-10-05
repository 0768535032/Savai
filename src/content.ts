export const pages = [
  { href: '/work', label: 'Work' },
  { href: '/approach', label: 'Approach' },
  { href: '/perspective', label: 'Perspective' },
  { href: '/create', label: "Let's create" },
  { href: '/studio', label: 'Studio' },
] as const;

export const steps = [
  ['Find', 'We study your audience, culture, category and competitors to see where the market is already decided.'],
  ['Position', 'We choose the space you can own and the idea that holds it.'],
  ['Express', 'Name, language, identity and story, built from the position, not from taste.'],
  ['Activate', 'Launch and campaign work that puts the position in front of the people it is for.'],
] as const;

export const looks: Record<string, string> = {
  Audience: 'Who is actually deciding, and what do they already believe about your category?',
  Culture: 'What is moving in the city, the language and the moment that your brand can stand beside?',
  Category: 'We map what every brand in your category says, so you can see what nobody does.',
  Competition: 'Who owns the favourite position today, and how did they earn it?',
  Ambition: 'Where you want to be in three years, and what the market must believe to get you there.',
};

export type Tier = {
  name: string;
  tag: string;
  best: string;
  line: string;
  format: string;
  timeline: string;
  payment: string;
  deliver: string[];
  mid?: boolean;
  detail: {
    what: string;
    expect: string;
    next?: string;
    notIncluded?: string;
    timelineTable?: string[][];
    phases?: string[][];
    revisions?: string[][];
    rhythm?: string[][];
  };
};

export const tiers: Tier[] = [
  {
    name: 'Bearings',
    tag: 'TIER 01',
    best: 'Brands that need direction',
    line: 'Find out where you stand and which way to go.',
    format: 'Half-day working session',
    timeline: 'Session within 2 weeks of booking; brief within 5 working days after',
    payment: 'In full, to book',
    deliver: ['A brand audit report', 'A positioning statement', 'A recommended direction', 'A written creative brief'],
    detail: {
      what: 'A half-day session with your founding team. We diagnose where the brand stands today and name the gaps.',
      expect: 'A working session, not a pitch. You leave with a clear read on your brand and a brief you can act on, with us or without us.',
      next: 'The brief carries straight into Originate. If you sign Originate within 30 days of receiving the brief, your Bearings fee is credited in full against it.',
      timelineTable: [
        ['Session held', 'Within 2 weeks of booking and payment'],
        ['Brand materials sent to Savai', '3 working days before the session'],
        ['Written brief delivered', 'Within 5 working days after the session'],
      ],
    },
  },
  {
    name: 'Originate',
    tag: 'TIER 02',
    best: 'Brands ready to build — where most clients land',
    line: 'Your brand, built from scratch.',
    format: 'Project, strategy to handover',
    timeline: '10 weeks quoted, 8 targeted',
    payment: '50% to start / 30% on identity approval / 20% at handover',
    deliver: ['Brand strategy', 'Logo and visual system (colour, type)', 'Brand guidelines book', 'Voice and messaging framework, incl. messaging pillars', 'Social and stationery templates'],
    mid: true,
    detail: {
      what: 'We work through strategy first, then the visual identity and voice, and hand it all over as a complete system.',
      expect: 'Strategy comes before design, so you see the thinking before you see the logo. You finish with everything you need to run the brand consistently without us in the room.',
      phases: [
        ['Strategy', 'Weeks 1–3', 'Discovery, audit and positioning, closing with one approval'],
        ['Identity', 'Weeks 3–7', '2–3 logo routes, then the chosen route refined; voice and messaging developed alongside'],
        ['System', 'Weeks 7–10', 'Guidelines book, social and stationery templates, final files and handover'],
      ],
      revisions: [
        ['Strategy', '1 round'],
        ['Logo, on the chosen route', '2 refinement rounds'],
        ['Guidelines and templates', '1 round'],
      ],
    },
  },
  {
    name: 'Brand Heartbeat',
    tag: 'TIER 03',
    best: 'Brands that need ongoing guidance',
    line: 'We stay in the room, as your fractional brand director.',
    format: 'Monthly retainer',
    timeline: 'Ongoing; 3-month minimum',
    payment: 'Monthly, in advance',
    deliver: ['Monthly creative reviews', 'Quarterly strategy sessions', 'Campaign approval and guidance', 'Ongoing brand consulting'],
    detail: {
      what: 'An ongoing monthly retainer. We review your creative, approve campaigns, and run strategy sessions to keep the brand consistent and moving.',
      expect: 'A standing relationship with a set rhythm, not on-demand design work. Three-month minimum commitment.',
      notIncluded: 'Producing the campaign creative itself. The retainer covers review, approval and direction. Design and production work is scoped and quoted separately.',
      rhythm: [
        ['Onboarding', 'First 2 weeks: review of existing assets, monthly and quarterly calendar set'],
        ['Creative review', 'Monthly'],
        ['Strategy session', 'Quarterly'],
        ['Campaign approvals', 'Returned within 2 working days'],
        ['Questions between reviews', 'Answered within 3 working days'],
      ],
    },
  },
];

export const images = {
  hero: 'https://images.unsplash.com/photo-1523805009349-7448c90a14c0?auto=format&fit=crop&w=2000&q=80',
  milkyway: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=2000&q=80',
  shore: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80',
  notebook: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1600&q=80',
  student: '/legacy/assets/create-collaboration.png',
  studioDesk: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2000&q=80',
  armchair: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=80',
  smoke: 'https://images.unsplash.com/photo-1502082553048-f009c37129c2?auto=format&fit=crop&w=2000&q=80',
};
