/**
 * content.js — All site text and data in one editable object.
 * Edit this file to update any portfolio content without touching HTML or JS logic.
 */

const CONTENT = {
  meta: {
    title: "Ahaan Shrivastava — Portfolio",
    description: "Personal portfolio of Ahaan Shrivastava — community architect, dealmaker, and builder.",
    author: "Ahaan Shrivastava",
  },

  nav: {
    brand: "A.S.",
    links: [
      { label: "Surface", href: "#layer-1" },
      { label: "Gale", href: "#layer-2" },
      { label: "Brokerage", href: "#layer-3" },
      { label: "Forge", href: "#layer-4" },
      { label: "Depths", href: "#layer-5" },
      { label: "Abyss", href: "#layer-6" },
    ],
  },

  depthGauge: {
    unit: "m",
    layers: [
      { id: "layer-1", name: "The Surface", depth: 0 },
      { id: "layer-2", name: "The Eternal Gale", depth: 200 },
      { id: "layer-3", name: "The Brokerage", depth: 500 },
      { id: "layer-4", name: "The Forge", depth: 900 },
      { id: "layer-5", name: "The Quant Depths", depth: 1400 },
      { id: "layer-6", name: "The Abyss", depth: 2000 },
    ],
  },

  layers: {
    /* ── Layer 1: The Surface ───────────────────────────────── */
    surface: {
      id: "layer-1",
      title: "The Surface",
      greeting: "Hi, I'm Ahaan.",
      subtitle: "Community Architect · Dealmaker · Builder",
      bio: [
        "I build and scale gaming communities, broker partnerships between developers and creators, and manage projects from concept to launch.",
        "I've grown communities to 268 000+ members, negotiated partnerships across indie studios, and led cross-functional teams shipping real products.",
        "Currently studying Computer Science & AI, pursuing quantitative research, and always looking for the next thing to build.",
      ],
      stats: [
        { label: "Communities Scaled", value: "268K+", icon: "users" },
        { label: "Deals Brokered", value: "50+", icon: "handshake" },
        { label: "Projects Shipped", value: "12+", icon: "rocket" },
        { label: "Years Active", value: "4+", icon: "clock" },
      ],
    },

    /* ── Layer 2: The Eternal Gale ──────────────────────────── */
    eternalGale: {
      id: "layer-2",
      title: "The Eternal Gale",
      heading: "Community & Partnerships",
      description: "Building and nurturing the communities that power everything else. From Discord servers to cross-platform networks, I've learned that the community is the product.",
      highlights: [
        {
          title: "Community Scaling",
          text: "Grew multiple gaming communities from zero to 268K+ combined members through organic growth strategies, event programming, and creator partnerships.",
          icon: "growth",
        },
        {
          title: "Event Hosting",
          text: "Organised and administered large-scale community events, tournaments, and live experiences — coordinating staff, sponsors, and thousands of participants.",
          icon: "event",
        },
        {
          title: "Partnership Network",
          text: "Built a network of developers, content creators, and brand partners. Brokered deals that connected indie studios with audiences and revenue streams.",
          icon: "network",
        },
      ],
    },

    /* ── Layer 3: The Brokerage ─────────────────────────────── */
    brokerage: {
      id: "layer-3",
      title: "The Brokerage",
      heading: "Commissions & Agency",
      description: "The intermediary layer — connecting talent with opportunity. I operate as a dealmaker and agent for developers, artists, and teams in the gaming space.",
      roles: [
        {
          title: "Deal Brokering",
          text: "Negotiated and closed 50+ partnership and commission deals between developers, creators, and sponsors — handling scoping, pricing, contracts, and delivery.",
          icon: "deal",
        },
        {
          title: "Talent Recruitment",
          text: "Scouted and recruited skilled developers, artists, and community managers for projects and studios. Built talent pipelines that filled critical roles.",
          icon: "recruit",
        },
        {
          title: "Business Development",
          text: "Identified growth opportunities, structured proposals, and pitched to potential partners and investors. Turned cold leads into lasting collaborations.",
          icon: "bizdev",
        },
      ],
    },

    /* ── Layer 4: The Forge ─────────────────────────────────── */
    forge: {
      id: "layer-4",
      title: "The Forge",
      heading: "Projects & Game Management",
      description: "Where ideas are hammered into reality. I've managed game development projects from concept through launch, coordinating developers, artists, and QA.",
      projects: [
        {
          name: "VaultWake",
          role: "Project Lead",
          text: "Led a cross-functional team building an indie game from concept to playable prototype. Managed sprints, art pipelines, and developer coordination.",
          tags: ["Game Dev", "Project Management", "Team Lead"],
          icon: "vault",
        },
        {
          name: "Indie Title Management",
          role: "Producer / Manager",
          text: "Managed multiple indie game projects simultaneously — setting milestones, distributing tasks, running playtests, and ensuring on-time delivery.",
          tags: ["Production", "Multi-project", "Agile"],
          icon: "gamepad",
        },
        {
          name: "Creative Direction",
          role: "Creative Director",
          text: "Provided creative direction for game design, branding, and marketing materials. Shaped the visual identity and narrative voice of multiple projects.",
          tags: ["Creative", "Branding", "Design"],
          icon: "palette",
        },
      ],
    },

    /* ── Layer 5: The Quant Depths ──────────────────────────── */
    quantDepths: {
      id: "layer-5",
      title: "The Quant Depths",
      heading: "Quantitative Research",
      description: "Beneath the surface projects lies a deeper pursuit — quantitative research and systematic thinking. Exploring alpha design, data-driven strategies, and computational methods.",
      areas: [
        {
          title: "Quantitative Research & Alpha Design",
          text: "Studying systematic approaches to market analysis, signal generation, and quantitative strategy design. Applying mathematical and computational thinking to complex problems.",
          icon: "chart",
        },
        {
          title: "Data-Driven Decision Making",
          text: "Bringing quantitative rigour to every project — from community growth metrics to game economy balancing. If it can be measured, it can be optimised.",
          icon: "data",
        },
      ],
    },

    /* ── Layer 6: The Abyss ─────────────────────────────────── */
    abyss: {
      id: "layer-6",
      title: "The Abyss",
      heading: "Education, Goals & Contact",
      description: "The deepest layer — where foundations are laid and futures are shaped.",
      education: {
        degree: "Computer Science & Artificial Intelligence",
        status: "Currently Studying",
        note: "Building a rigorous technical foundation to complement years of hands-on project and business experience.",
      },
      goals: [
        "Launch a game studio and ship a commercial title",
        "Break into quantitative finance or AI research",
        "Scale a community past 500K members",
        "Build tools that make indie game development more accessible",
      ],
      contact: {
        heading: "Reach the Depths",
        text: "If you've made it this far, we should talk. I'm always open to partnerships, projects, and interesting conversations.",
        links: [
          { label: "GitHub", url: "https://github.com/ahaanshrivastava", icon: "github" },
          { label: "Email", url: "mailto:ahaan@example.com", icon: "email" },
          { label: "Discord", url: "#", icon: "discord" },
        ],
      },
    },
  },

  /* ── Talent Cards (Skills) ────────────────────────────────── */
  talents: {
    sectionTitle: "Talent Orb",
    sectionSubtitle: "Click the orb to reveal your talents",
    categories: {
      "Leadership & Management": {
        color: "#b388ff",
        cards: [
          {
            name: "Project & Product Management",
            description: "End-to-end ownership of product lifecycle — from ideation and roadmapping to sprint planning and delivery.",
            rarity: "advanced",
            tags: ["Leadership", "Agile", "Roadmap"],
            icon: "project",
          },
          {
            name: "Cross-functional Team Management",
            description: "Leading developers, artists, and community staff across disciplines to ship cohesive products.",
            rarity: "rare",
            tags: ["Leadership", "Teams", "Coordination"],
            icon: "team",
          },
          {
            name: "Task Distribution & Delegation",
            description: "Breaking complex projects into actionable tasks and assigning them to the right people at the right time.",
            rarity: "common",
            tags: ["Management", "Efficiency", "Workflow"],
            icon: "tasks",
          },
          {
            name: "Directing & Creative Ideation",
            description: "Shaping the creative vision for projects — from game design to branding to narrative direction.",
            rarity: "rare",
            tags: ["Creative", "Vision", "Direction"],
            icon: "lightbulb",
          },
        ],
      },
      "Business & Partnerships": {
        color: "#ffd54f",
        cards: [
          {
            name: "Partnership Negotiation & Brokering",
            description: "Structuring and closing deals between developers, creators, sponsors, and platforms.",
            rarity: "oath",
            tags: ["Business", "Deals", "Negotiation"],
            icon: "handshake",
          },
          {
            name: "Deal-Making for Developers & Teams",
            description: "Connecting talent with opportunity — matching skilled builders to projects that need them.",
            rarity: "advanced",
            tags: ["Agency", "Brokering", "Talent"],
            icon: "deal",
          },
          {
            name: "Investor Pitching & Seed Fundraising",
            description: "Crafting compelling pitches and raising early-stage funding for projects and ventures.",
            rarity: "advanced",
            tags: ["Fundraising", "Pitch", "Investment"],
            icon: "pitch",
          },
          {
            name: "Fund Management",
            description: "Managing allocated funds, budgets, and financial resources across multiple concurrent projects.",
            rarity: "rare",
            tags: ["Finance", "Budget", "Stewardship"],
            icon: "fund",
          },
          {
            name: "Business Development",
            description: "Identifying growth opportunities, building strategic relationships, and expanding into new markets.",
            rarity: "rare",
            tags: ["Growth", "Strategy", "Outreach"],
            icon: "bizdev",
          },
        ],
      },
      "Community & Marketing": {
        color: "#4fc3f7",
        cards: [
          {
            name: "Community Building & Scaling",
            description: "Grew communities to 268K+ members through organic strategies, engagement loops, and creator partnerships.",
            rarity: "oath",
            tags: ["Community", "Growth", "268K+"],
            icon: "community",
          },
          {
            name: "Event Hosting & Administration",
            description: "Planning and running large-scale events, tournaments, and live experiences for thousands of participants.",
            rarity: "advanced",
            tags: ["Events", "Tournaments", "Live"],
            icon: "event",
          },
          {
            name: "Marketing Campaign Execution",
            description: "Designing and executing marketing campaigns across social media, Discord, and gaming platforms.",
            rarity: "rare",
            tags: ["Marketing", "Campaigns", "Social"],
            icon: "marketing",
          },
          {
            name: "Talent Recruitment",
            description: "Scouting, interviewing, and onboarding skilled individuals for development teams and community staff.",
            rarity: "common",
            tags: ["HR", "Scouting", "Onboarding"],
            icon: "recruit",
          },
        ],
      },
      "Technical Foundation": {
        color: "#ef5350",
        cards: [
          {
            name: "Computer Science & AI",
            description: "Studying CS and AI fundamentals — algorithms, data structures, machine learning, and neural architectures.",
            rarity: "advanced",
            tags: ["CS", "AI", "Studying"],
            icon: "brain",
          },
          {
            name: "Quantitative Research & Alpha Design",
            description: "Exploring systematic strategies, signal generation, and data-driven approaches to complex problems.",
            rarity: "oath",
            tags: ["Quant", "Research", "Alpha"],
            icon: "quant",
          },
          {
            name: "Full-Stack Web & Systems",
            description: "Building responsive, accessible web architectures, data-driven interfaces, and resilient client-server workflows.",
            rarity: "rare",
            tags: ["Web Dev", "Full-Stack", "Architecture"],
            icon: "deal",
          },
          {
            name: "Game Systems & Mechanics",
            description: "Engineering interactive game mechanics, state machines, and immersive gameplay loops for indie titles.",
            rarity: "common",
            tags: ["Game Dev", "Mechanics", "Prototyping"],
            icon: "tasks",
          },
        ],
      },
    },
  },
};

// Make available globally and for modules
if (typeof window !== 'undefined') window.CONTENT = CONTENT;
if (typeof module !== 'undefined') module.exports = CONTENT;

