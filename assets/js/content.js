/* =====================================================================
   CONTENT FILE: edit everything about the site here.
   - Leave a link as "" to hide it. Set it to "TODO" to show a
     "link coming soon" message instead of a broken link.
   - Images: drop files into assets/img/ and set the path. If an image
     is missing, the site falls back to initials, so nothing breaks.
   ===================================================================== */
window.CONTENT = {
  profile: {
    name: "Arunanshu Sinha",
    first: "Arunanshu",
    initials: "AS",
    photo: "assets/img/avatar.jpg",
    headline: ["I'm Arunanshu.", "I solve", "problems."],
    tagline: "A product person who builds. Engineer turned PM. I'd rather prototype the idea than argue about it."
  },

  links: {
    email: "contactarunanshu@gmail.com",
    cal: "https://cal.com/arunanshu-sinha-nrgwad/15min",
    resume: "https://drive.google.com/file/d/106ol-JQeZ4nRaJSuzCBHsh-K7v7_QIpH/view?usp=sharing",
    linkedin: "https://www.linkedin.com/in/arunanshu-sinha",
    github: "https://github.com/sirius-arun",
    x: "https://x.com/arunanshu_sinha",
    caseStudies: "https://laser-carpet-c01.notion.site/My-Case-Studies-21c862ead1aa49a19c598c19c71cf100"
  },

  /* ---------- Hero: written as a PRD ---------- */
  prd: {
    props: [
      { k: "Status", v: "Product Analyst at VMock", live: true },
      { k: "Origin story", v: "Engineer → PM" },
      { k: "Education", v: "IIT (BHU) Varanasi '25" }
    ],
    overview: "I take ideas from fuzzy to shipped. I talk to users, prototype it myself, write the evals, price it, and help sell it.",
    builtFor: "Teams building 0 → 1 or AI products who want a PM who's comfortable in the code, the data and the customer call.",
    features: ["User research", "PRDs + roadmaps", "Prototyping in code", "AI evals", "Pricing", "Go-to-market"],
    metrics: [
      { v: "2+ yrs", k: "building products at 3 startups and scale-ups" },
      { v: "130+", k: "countries where people use products I've worked on" },
      { v: "5", k: "national podiums in product + case competitions" }
    ]
  },

  /* ---------- Trophy shelf (hero) ---------- */
  trophies: [
    { kind: "cup", tier: "gold", short: "PMx", label: "Gold · PMx case competition, IIT Guwahati" },
    { kind: "cup", tier: "gold", short: "Honeywell", label: "Gold · Honeywell SADC Nationals. Went on to represent India at internationals." },
    { kind: "medal", tier: "silver", short: "Udyami", label: "Silver · Udyami entrepreneurship competition, IIT Madras" },
    { kind: "medal", tier: "bronze", short: "Inter IIT 11", label: "Bronze · Inter IIT Tech Meet 11.0, PM event" },
    { kind: "medal", tier: "bronze", short: "Inter IIT 12", label: "Bronze · Inter IIT Tech Meet 12.0, PM event" },
    { kind: "star", tier: "gold", short: "Coach · 13", label: "Coach · Trained IIT (BHU)'s Inter IIT 13.0 contingent, which won Gold" }
  ],

  ticker: [
    "AI resume verification is live at ISB",
    "Gold at PMx, IIT Guwahati",
    "Aspire now speaks 8 languages",
    "Languify transcription cost cut by 30%",
    "117 AI failures caught before users saw them",
    "Vouch is open source on GitHub",
    "300+ member product community built at IIT (BHU)"
  ],

  /* ---------- Roadmap (career trajectory) ---------- */
  roadmap: {
    start: [2021, 1], end: [2028, 1], today: [2026, 11],
    lanes: ["Work", "Education", "Community", "Wins"],
    bars: [
      { lane: 0, s: [2023, 5], e: [2024, 2], title: "Monetizely", sub: "Technical PM Intern · Remote (US)", logo: "assets/img/logos/monetizely.jpg", mono: "M", read: "Monetizely · PRDs for e-sign + billing APIs in a CPQ tool" },
      { lane: 0, s: [2024, 5], e: [2024, 8], title: "Languify AI", sub: "PM Intern · Bengaluru", logo: "assets/img/logos/languify.jpg", mono: "L", read: "Languify AI · −30% transcription cost, −20% bounce rate" },
      { lane: 0, s: [2025, 6], e: [2026, 11], title: "VMock", sub: "Product Analyst · Gurugram", logo: "assets/img/logos/vmock.jpg", mono: "V", now: true, read: "VMock · Shipping GenAI to 250+ clients in 130+ countries" },
      { lane: 0, s: [2027, 1], e: [2027, 12], title: "Next release", sub: "In development 🔒 Ask me about it", next: true, read: "Next release · ask me what's next" },
      { lane: 1, s: [2021, 7], e: [2025, 5], title: "IIT (BHU) Varanasi", sub: "B.Tech, Mining Engineering · CGPA 7.93", logo: "assets/img/logos/iitbhu.jpg", mono: "I", edu: true, read: "IIT (BHU) · B.Tech, thesis on Quantum Monte Carlo for risk" },
      { lane: 2, s: [2022, 5], e: [2025, 4], title: "The Product Folks × IIT (BHU)", sub: "Founding Campus Director · 300+ members", logo: "assets/img/logos/tpf.png", mono: "T", community: true, read: "The Product Folks · 15+ workshops, 80+ students mentored" }
    ],
    milestones: [
      { d: [2023, 2], t: "Inter IIT 11.0 · Bronze" },
      { d: [2023, 12], t: "Inter IIT 12.0 · Bronze" },
      { d: [2024, 12], t: "Coached Inter IIT 13.0 · Gold" },
      { d: [2025, 6], t: "Graduated 🎓" },
      { d: [2026, 11], t: "Vouch open-sourced" }
    ]
  },

  /* ---------- Release notes (detail per role) ---------- */
  releases: [
    {
      v: "v3.0", when: "Jun 2025 – Present", org: "VMock", role: "Product Analyst", place: "Gurugram", current: true,
      logo: "assets/img/logos/vmock.jpg", mono: "V",
      about: "AI career-acceleration platform (B2B2C) serving 250+ enterprise and university clients across 130+ countries.",
      notes: [
        ["new", "Launched AI resume verification, a new revenue line on the flagship product. Live at ISB with 6,000+ resumes verified."],
        ["new", "Self-initiated a contextual-testing system for GenAI (Claude-agent test runners, LLM judges): 612 cases, 117 failures caught, 46 critical."],
        ["new", "Built a RAG support-reply system: 600+ tickets resolved, average resolution time down 75%."],
        ["imp", "Led the redesign of the admin platform into an agentic career-services platform. Demos helped win a $150K global enterprise contract."],
        ["imp", "Owned Aspire and Cover Letter: rebuilt scoring and feedback from 5+ years of user data, localized into 8 languages, including for a Fortune 500 client with 150K+ users."],
        ["imp", "Shipped GenAI auto-fix and a refreshed Aspire UI, cutting time-to-value by ~50%."],
        ["ops", "Managed delivery for 30+ enterprise and university clients across 4 continents."]
      ]
    },
    {
      v: "v2.0", when: "May – Aug 2024", org: "Languify AI", role: "Product Management Intern", place: "Bengaluru",
      logo: "assets/img/logos/languify.jpg", mono: "L",
      about: "AI mock-interview startup.",
      notes: [
        ["fix", "Reduced hallucination and cut transcription cost by 30% in the interview-scoring engine (speech-to-text upgrade, prompt tuning, token optimization)."],
        ["imp", "Redesigned the landing page: bounce rate down 20%, ~5 qualified B2B leads a month with zero ad spend."],
        ["new", "Led product-led sales through gamified adoption campaigns."]
      ]
    },
    {
      v: "v1.0", when: "May 2023 – Feb 2024", org: "Monetizely", role: "Technical PM Intern", place: "Remote (US)",
      logo: "assets/img/logos/monetizely.jpg", mono: "M",
      about: "Early-stage US startup building a CPQ (configure, price, quote) SaaS tool.",
      notes: [
        ["new", "Drafted the PRD and data-flow diagrams for e-sign and billing API integrations, benchmarked against 20+ tools."],
        ["imp", "Redesigned the landing page and created marketing collateral for the founder."]
      ]
    },
    {
      v: "v0.x", when: "2021 – 2025", org: "IIT (BHU) Varanasi", role: "B.Tech, Mining Engineering · Founding Campus Director, The Product Folks", place: "Varanasi",
      logo: "assets/img/logos/iitbhu.jpg", mono: "I",
      about: "CGPA 7.93/10. Coursework in computer science, mathematics, statistics, probability, electronics and engineering design.",
      notes: [
        ["new", "Thesis: Quantum Monte Carlo algorithms for risk assessment of geotechnical structures (Python, IBM Qiskit)."],
        ["new", "Launched IIT (BHU)'s chapter of The Product Folks by pitching its co-founder. Built a 15-member core team and a 300+ member community."],
        ["ops", "Led 15+ PM workshops and mentored 80+ students starting PM careers."],
        ["imp", "Trained IIT (BHU)'s Inter IIT 13.0 contingent, which won Gold."]
      ]
    }
  ],

  /* ---------- Shipped (impact case studies) ---------- */
  shipped: [
    {
      id: "SHIP-01", org: "VMock", type: "0 → 1 · New revenue line", domain: "B2B2C · AI",
      title: "AI resume verification",
      problem: "Universities needed to trust that student resumes were accurate, at scale.",
      built: ["Defined the technical approach and AI prompt pipeline", "Prototyped and tested it end to end, then designed the UX", "Modeled unit economics to help set pricing", "Demoed it to 6 top Indian business schools"],
      metric: { v: "6,000+", k: "resumes verified, live at ISB" },
      link: { label: "Read case study", url: "" }   // TODO: add Notion link
    },
    {
      id: "SHIP-02", org: "VMock", type: "Self-initiated · AI quality", domain: "GenAI evals",
      title: "Contextual testing for GenAI features",
      problem: "AI features were shipping without a reliable way to know when they fail.",
      built: ["Claude-agent test runners that exercise features in context", "LLM judges with PM-validated grading", "Piloted on 2 AI products across 612 cases"],
      metric: { v: "117", k: "failures caught before users saw them, 46 critical" },
      link: { label: "Read case study", url: "" }
    },
    {
      id: "SHIP-03", org: "VMock", type: "Internal AI tool", domain: "Support ops · RAG",
      title: "RAG-based support replies",
      problem: "Support tickets took too long because answers were buried in years of past tickets.",
      built: ["Retrieval over thousands of resolved tickets plus current product context", "Drafts responses for the support team to review and send"],
      metric: { v: "−75%", k: "average resolution time, 600+ tickets resolved" },
      link: { label: "Read case study", url: "" }
    },
    {
      id: "SHIP-04", org: "VMock", type: "Platform redesign", domain: "Enterprise · Agentic UX",
      title: "Agentic career-services platform",
      problem: "The admin platform couldn't handle complex multi-role workflows for enterprise clients.",
      built: ["Led the redesign into an agentic career-services platform", "UX for multi-role workflows", "A new interview-scheduling system"],
      metric: { v: "$150K", k: "global enterprise contract won with the demos" },
      link: { label: "Read case study", url: "" }
    },
    {
      id: "SHIP-05", org: "VMock", type: "Product ownership", domain: "Global · Localization",
      title: "Aspire + Cover Letter, rebuilt",
      problem: "Feedback was generic, and the products only worked in one language.",
      built: ["Rebuilt scoring rubrics and the feedback engine from 5+ years of user data", "Owned LLM prompt pipelines and evals", "Localized into 8 languages, then shipped GenAI auto-fix", "Prototyped a Chrome extension for in-browser LinkedIn optimization"],
      metric: { v: "~50%", k: "faster time-to-value, used by a Fortune 500 client with 150K+ users" },
      link: { label: "Read case study", url: "" }
    },
    {
      id: "SHIP-06", org: "Open source", type: "Side project · CLI", domain: "Developer tools · LLM evals",
      title: "Vouch: contextual testing CLI for LLM apps",
      problem: "A single passing run tells you very little about whether an LLM app is reliable.",
      built: ["Runs any LLM app N times per case against a YAML context pack", "Rule checks plus LLM judges that must quote evidence", "Reports pass^k and a human-review queue"],
      metric: { v: "15/15", k: "seeded defects caught, 0 false alarms" },
      link: { label: "View on GitHub", url: "https://github.com/sirius-arun/vouch" }
    }
  ],

  /* ---------- Archive: earlier case studies (Notion) ---------- */
  archive: [
    { org: "Paradime.io", t: "Product teardown + PRD for suggested improvements", tag: "Teardown · PRD", url: "https://laser-carpet-c01.notion.site/Paradime-io-Teardown-and-drafting-a-product-requirement-document-for-suggested-product-improvements-b42a486a089c47928712c1bf3926636d" },
    { org: "Trumio", t: "AI-based solutions for a university ecosystem, with launch plan", tag: "Proposal · GTM", url: "https://laser-carpet-c01.notion.site/Trumio-Final-Proposal-AI-based-solutions-for-improving-their-university-ecosystem-with-launch-plan-51abc0d0800243779d95cb7a9fc1cf0a" },
    { org: "Dunzo", t: "Reducing Dunzo's carbon footprint", tag: "Strategy", url: "https://laser-carpet-c01.notion.site/Reducing-Dunzo-s-Carbon-Footprint-and-moving-towards-a-sustainable-future-003fcd81a05d4abc93718be810944183" },
    { org: "Coca-Cola", t: "Logistics strategy to 2× daily volume and reach 20–30% CAGR", tag: "Ops strategy", url: "https://laser-carpet-c01.notion.site/Logistics-strategies-to-2X-daily-volume-manage-risks-in-line-with-achieving-a-target-of-20-30-CAGR-8bc16cc8f85d40688643041db1f2ee51" }
  ],

  /* ---------- Skills (backlog of work I can pick up) ---------- */
  backlog: [
    { p: "P0", t: "Ship a GenAI feature end to end", why: "Technical approach, prompt pipeline, prototype, UX, launch", tags: ["Prompt pipelines", "Prototyping", "Claude Code", "Python"], pts: 8 },
    { p: "P0", t: "Make the AI trustworthy with evals", why: "Test suites that catch failures before customers do", tags: ["LLM-as-judge", "Contextual testing", "RAG"], pts: 5 },
    { p: "P0", t: "Write the PRD and the roadmap", why: "From messy inputs to a doc engineering actually reads", tags: ["PRDs", "Roadmapping", "System design"], pts: 3 },
    { p: "P1", t: "Price it and model the unit economics", why: "So the new feature is also a new revenue line", tags: ["Business modeling", "Pricing"], pts: 3 },
    { p: "P1", t: "Design UX for complex, multi-role workflows", why: "Admins, counselors, students: one coherent flow", tags: ["UI/UX design", "Figma", "Prototyping"], pts: 5 },
    { p: "P1", t: "Run research and experiments", why: "Decisions backed by data instead of opinions", tags: ["User research", "A/B testing", "SQL", "Mixpanel", "Google Analytics"], pts: 3, bug: true },
    { p: "P2", t: "Take it to market", why: "Sales demos, GTM plans, product-led growth", tags: ["GTM", "Sales demos", "Product-led sales"], pts: 3 },
    { p: "P2", t: "Grow and mentor a product community", why: "300+ members, 15+ workshops, 80+ mentees", tags: ["Community", "Mentoring", "Workshops"], pts: 2 }
  ],

  toolbox: [
    { n: "Claude Code", d: "Agents + prototyping", mono: "CC", logo: "assets/img/tools/claude.svg" },
    { n: "Python", d: "Evals, automation", mono: "Py", logo: "assets/img/tools/python.svg" },
    { n: "SQL", d: "Querying my own data", mono: "SQ", logo: "assets/img/tools/postgresql.svg" },
    { n: "Figma", d: "UI / UX design", mono: "F", logo: "assets/img/tools/figma.svg" },
    { n: "Mixpanel", d: "Product analytics", mono: "Mx", logo: "assets/img/tools/mixpanel.svg" },
    { n: "Google Analytics", d: "Web analytics", mono: "GA", logo: "assets/img/tools/googleanalytics.svg" },
    { n: "IBM Qiskit", d: "Quantum (thesis)", mono: "Qk", logo: "assets/img/tools/qiskit.svg" },
    { n: "Notion", d: "Docs + case studies", mono: "N", logo: "assets/img/tools/notion.svg" }
  ],

  /* ---------- Testimonials (shown as user-interview notes) ---------- */
  testimonials: [
    {
      id: "INT-01", context: "Monetizely",
      quote: "…worked more diligently than someone with ten+ years of work experience.",
      highlight: "more diligently than someone with ten+ years",
      summary: "Praised his diligence from early in the internship, his clear communication and research, his skill at distilling technical requirements, and his can-do attitude. Expects him to lead organisations.",
      themes: ["Diligence", "Clear communication", "Research depth", "Tech requirements", "Can-do"],
      name: "Ajit Ghuman", title: "Co-Founder & CEO, Monetizely Inc. · Stanford '11", initials: "AG",
      photo: "assets/img/people/ajit-ghuman.jpg", linkedin: "https://www.linkedin.com/in/ajitpalghuman/"
    },
    {
      id: "INT-02", context: "Formative team",
      quote: "…sharp analytical mind, great sense of responsibility…",
      highlight: "sharp analytical mind",
      summary: "Worked with him as an intern on the formative team. Highlights his quick grasp of problems, his responsiveness and his focus on the mission.",
      themes: ["Analytical", "Ownership", "Quick learner", "Responsive", "Mission-focused"],
      name: "Jitendra Gokhale", title: "Advisor, Mentor & Consultant · TiE Pune CM", initials: "JG",
      photo: "assets/img/people/jitendra-gokhale.jpg", linkedin: "https://www.linkedin.com/in/jbgokhale/"
    }
  ],

  /* ---------- Contact (go / no-go launch review) ---------- */
  checks: [
    ["Has shipped real products", "6 launches"],
    ["Comfortable with the technical side", "Python · SQL · AI"],
    ["Thinks about the business", "pricing + GTM"],
    ["Strong testimonials", "2 / 2"],
    ["Gives back to the community", "80+ mentees"],
    ["Calendar availability", "open this week"]
  ],

  /* ---------- What the floating avatar says in each section ---------- */
  buddy: {
    hero: "Hey, I'm Arunanshu 👋 This site is a product and you're the user. There's a site tour in the top bar if you want to earn some XP.",
    roadmap: "My roadmap. Keep scrolling and it moves sideways: mining engineer, then PM intern, now shipping GenAI.",
    releases: "Release notes for every version of me. Expand one for the full changelog.",
    shipped: "Six things I've shipped. Each card shows the number I'd put on the launch slide.",
    archive: "Older case studies from competitions and teardowns. Opening one counts toward your tour.",
    backlog: "Skills, written as tickets you could hand me on day one. Psst, one of them has a bug in it 🐞",
    interviews: "Don't take my word for it. I interviewed people who managed me, and tagged the themes.",
    launch: "Every check passes. Book 15 minutes and let's see if we're a fit 🚀"
  }
};
