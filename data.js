const BASE = "https://ahaanshrivastava800.github.io/Portfolio/";

const PORTFOLIO_DATA = {
  baseUrl: BASE,
  owner: {
    name: "Ahaan Shrivastava",
    tagline:
      "First-year B.Tech Student in Computer Science and Artificial Intelligence — Newton School of Technology, Pune",
    institution: "Newton School of Technology (NST), Pune",
    degree: "B.Tech, Computer Science and Artificial Intelligence",
    year: "First year",
    expectedGraduation: "7 August 2030",
    github: "https://github.com/ahaanshrivastava800",
    linkedin: "https://www.linkedin.com/in/ahaan-shrivastava-48a157422",
    email: "ahaan.shrivastava800@gmail.com",
    emailHref: "mailto:ahaan.shrivastava800@gmail.com"
  },

  about: {
    paragraph:
      "I am a first-year B.Tech student in Computer Science and Artificial Intelligence at Newton School of Technology (NST), Pune, with expected graduation on 7 August 2030. My technical focus spans Bash and shell tooling with automated testing, full-stack web development, applied AI, and quantitative research. Through open-source contributions and solo engineering projects, I have worked on static analysis, mutation testing, test generation, asynchronous serverless pipelines, and mobile-first browser applications with local storage. My objective is to secure software engineering and AI internships where I can build reliable developer tools and production web systems."
  },

  skills: [
    {
      category: "Languages & Scripting",
      items: [
        {
          name: "Bash scripting",
          note: "Implemented exercise solutions, track tooling fixes, test suites, and benchmarked scripts across ten pull requests.",
          evidence: [
            { label: "T001 (PR #61)", url: "https://github.com/S-AI-Projects/bash/pull/61" },
            { label: "T002 (PR #65)", url: "https://github.com/S-AI-Projects/bash/pull/65" },
            { label: "T003 (PR #66)", url: "https://github.com/S-AI-Projects/bash/pull/66" },
            { label: "T004 (PR #67)", url: "https://github.com/S-AI-Projects/bash/pull/67" },
            { label: "T005 (PR #68)", url: "https://github.com/S-AI-Projects/bash/pull/68" },
            { label: "T006 (PR #69)", url: "https://github.com/S-AI-Projects/bash/pull/69" },
            { label: "T007 (PR #71)", url: "https://github.com/S-AI-Projects/bash/pull/71" },
            { label: "T008 (PR #73)", url: "https://github.com/S-AI-Projects/bash/pull/73" },
            { label: "T009 (PR #75)", url: "https://github.com/S-AI-Projects/bash/pull/75" },
            { label: "T010 (PR #90)", url: "https://github.com/S-AI-Projects/bash/pull/90" }
          ]
        },
        {
          name: "HTML, CSS, JavaScript",
          note: "Built this static, semantic, accessible portfolio site using plain HTML, CSS, and vanilla JavaScript without frameworks or build tools.",
          evidence: [
            { label: "Portfolio repo", url: "https://github.com/ahaanshrivastava800/Portfolio" }
          ]
        }
      ]
    },
    {
      category: "Testing & Quality",
      items: [
        {
          name: "BATS testing and Jinja2 test generation",
          note: "Authored Jinja2 templates to regenerate BATS suites from canonical data and added tests for new and existing exercises.",
          evidence: [
            { label: "T002 (PR #65)", url: "https://github.com/S-AI-Projects/bash/pull/65" },
            { label: "T003 (PR #66)", url: "https://github.com/S-AI-Projects/bash/pull/66" },
            { label: "T010 (PR #90)", url: "https://github.com/S-AI-Projects/bash/pull/90" }
          ]
        },
        {
          name: "ShellCheck and shell style",
          note: "Resolved ShellCheck (-o all) warnings, aligned scripts with Google Shell Style, and replaced destructive git checkout resets with safe temp-file traps.",
          evidence: [
            { label: "T004 (PR #67)", url: "https://github.com/S-AI-Projects/bash/pull/67" },
            { label: "T005 (PR #68)", url: "https://github.com/S-AI-Projects/bash/pull/68" },
            { label: "T009 (PR #75)", url: "https://github.com/S-AI-Projects/bash/pull/75" }
          ]
        },
        {
          name: "Mutation testing",
          note: "Generated 11 mutants of an exercise solution, identified 2 surviving negative-minute modulo mutants, and added a test to close the coverage gap.",
          evidence: [
            { label: "T003 (PR #66)", url: "https://github.com/S-AI-Projects/bash/pull/66" }
          ]
        },
        {
          name: "Performance profiling (hyperfine)",
          note: "Measured and optimized the palindrome-products reference solution from 9.370 s down to 0.037 s (~254x speedup).",
          evidence: [
            { label: "T005 (PR #68)", url: "https://github.com/S-AI-Projects/bash/pull/68" }
          ]
        }
      ]
    },
    {
      category: "Web Development",
      items: [
        {
          name: "Next.js, React, Tailwind CSS, REST API design, async job queues (Redis/Upstash), Server-Sent Events, Vercel serverless",
          note: "Built a dual-mode GST filing demonstrator comparing synchronous uploads against an Upstash Redis queue, worker endpoint, and SSE progress stream.",
          evidence: [
            { label: "gst-flow-demo repo", url: "https://github.com/ahaanshrivastava800/gst-flow-demo" }
          ]
        },
        {
          name: "CodeMirror, Web Workers, IndexedDB, PWA/service workers",
          note: "Built a mobile-first code editor prototype with client-side Web Worker execution, IndexedDB persistence, and PWA caching via next-pwa.",
          evidence: [
            { label: "CloudCode repo", url: "https://github.com/ahaanshrivastava800/CloudCode" }
          ]
        }
      ]
    },
    {
      category: "Tools & Workflow",
      items: [
        {
          name: "JSON/jq configuration and documentation (markdown lint, configlet)",
          note: "Added approach metadata, verified non-spoiler hints, and populated exercise topics using jq while passing markdownlint and configlet lint.",
          evidence: [
            { label: "T006 (PR #69)", url: "https://github.com/S-AI-Projects/bash/pull/69" },
            { label: "T007 (PR #71)", url: "https://github.com/S-AI-Projects/bash/pull/71" },
            { label: "T008 (PR #73)", url: "https://github.com/S-AI-Projects/bash/pull/73" }
          ]
        },
        {
          name: "Git and GitHub pull-request workflow",
          note: "Managed forked branches, clean commits, and pull requests across all ten S-AI-Projects/bash contributions.",
          evidence: [
            { label: "T001 (PR #61)", url: "https://github.com/S-AI-Projects/bash/pull/61" },
            { label: "T002 (PR #65)", url: "https://github.com/S-AI-Projects/bash/pull/65" },
            { label: "T003 (PR #66)", url: "https://github.com/S-AI-Projects/bash/pull/66" },
            { label: "T004 (PR #67)", url: "https://github.com/S-AI-Projects/bash/pull/67" },
            { label: "T005 (PR #68)", url: "https://github.com/S-AI-Projects/bash/pull/68" },
            { label: "T006 (PR #69)", url: "https://github.com/S-AI-Projects/bash/pull/69" },
            { label: "T007 (PR #71)", url: "https://github.com/S-AI-Projects/bash/pull/71" },
            { label: "T008 (PR #73)", url: "https://github.com/S-AI-Projects/bash/pull/73" },
            { label: "T009 (PR #75)", url: "https://github.com/S-AI-Projects/bash/pull/75" },
            { label: "T010 (PR #90)", url: "https://github.com/S-AI-Projects/bash/pull/90" }
          ]
        }
      ]
    }
  ],

  contributions: {
    repoName: "S-AI-Projects/bash",
    repoUrl: "https://github.com/S-AI-Projects/bash",
    forkName: "ahaanshrivastava800/bash",
    forkUrl: "https://github.com/ahaanshrivastava800/bash",
    tasks: [
      {
        taskId: "R05-T001",
        exercise: "hamming",
        prNumber: 61,
        prUrl: "https://github.com/S-AI-Projects/bash/pull/61",
        modifications:
          "Documented 6 excluded canonical cases with comments in tests.toml.",
        rationale:
          "Traceable exclusions keep track tests in sync with problem-specifications."
      },
      {
        taskId: "R05-T002",
        exercise: "beer-song",
        prNumber: 65,
        prUrl: "https://github.com/S-AI-Projects/bash/pull/65",
        modifications:
          "Wrote .meta/template.j2 so beer_song.bats regenerates exactly (11 tests).",
        rationale:
          "Generated tests stay reproducible from canonical data."
      },
      {
        taskId: "R05-T003",
        exercise: "clock",
        prNumber: 66,
        prUrl: "https://github.com/S-AI-Projects/bash/pull/66",
        modifications:
          "Ran mutation testing on 11 mutants of .meta/example.sh (2 survived on negative-minute modulo); added test_large_negative_delta_wraps_many_days and regenerated clock.bats to 59 tests.",
        rationale:
          "Found and closed a real test coverage gap."
      },
      {
        taskId: "R05-T004",
        exercise: "rectangles",
        prNumber: 67,
        prUrl: "https://github.com/S-AI-Projects/bash/pull/67",
        modifications:
          "Applied ShellCheck (-o all) and Google Shell Style cleanup to example.sh with behaviour unchanged; all 14/14 tests pass.",
        rationale:
          "Improves script maintainability and eliminates static-analysis warnings without altering behaviour."
      },
      {
        taskId: "R05-T005",
        exercise: "palindrome-products",
        prNumber: 68,
        prUrl: "https://github.com/S-AI-Projects/bash/pull/68",
        modifications:
          "Implemented a faster example solution; hyperfine on \"largest 1000 9999\" improved from 9.370 s to 0.037 s (about 254x faster); 14/14 tests pass and ShellCheck is clean.",
        rationale:
          "Removes an algorithmic bottleneck in the reference solution while preserving correctness and lint compliance."
      },
      {
        taskId: "R05-T006",
        exercise: "leap",
        prNumber: 69,
        prUrl: "https://github.com/S-AI-Projects/bash/pull/69",
        modifications:
          "Added a 4th approach (case statement) to .approaches (content.md, snippet.txt, config.json uuid, introduction.md); check_snippets.sh runs all 13 tests against all 4 approaches; configlet lint passes.",
        rationale:
          "Provides learners with an idiomatic pattern-matching alternative verified by automated snippet tests and track linting."
      },
      {
        taskId: "R05-T007",
        exercise: "grains",
        prNumber: 71,
        prUrl: "https://github.com/S-AI-Projects/bash/pull/71",
        modifications:
          "Wrote .docs/instructions.append.md with 5 verified Bash hints (arithmetic, signed 64-bit overflow) without spoilers; markdownlint and configlet lint pass.",
        rationale:
          "Surfaces Bash-specific integer limits upfront so learners avoid silent 64-bit overflow bugs."
      },
      {
        taskId: "R05-T008",
        exercise: "save-the-cow",
        prNumber: 73,
        prUrl: "https://github.com/S-AI-Projects/bash/pull/73",
        modifications:
          "Filled empty topics in config.json (arrays, control_flow_conditionals, control_flow_loops, error_handling, regular_expressions, strings, text_formatting), derived from example.sh and compared with other difficulty-4 exercises via jq.",
        rationale:
          "Accurate topic metadata improves track discoverability and consistency across difficulty tiers."
      },
      {
        taskId: "R05-T009",
        exercise: "hello-world",
        prNumber: 75,
        prUrl: "https://github.com/S-AI-Projects/bash/pull/75",
        modifications:
          "Changed bin/validate_one_exercise to back up the stub to a temp file and restore it in an EXIT trap instead of running git checkout.",
        rationale:
          "Prevents uncommitted local work from being lost when contributors run the validation script."
      },
      {
        taskId: "R05-T010",
        exercise: "matrix",
        prNumber: 90,
        prUrl: "https://github.com/S-AI-Projects/bash/pull/90",
        modifications:
          "Added a new practice exercise (CLI: matrix.sh <matrix> {row|column} <index>), added config.json entry (difficulty 3), and removed \"matrix\" from foregone.",
        rationale:
          "Expands the Bash practice track with a canonical exercise integrated into track configuration."
      }
    ]
  },

  projects: [
    {
      id: "gst-flow-demo",
      title: "GST Flow Demo",
      subtitle: "Solo demonstration project",
      repoUrl: "https://github.com/ahaanshrivastava800/gst-flow-demo",
      docsUrl:
        "https://github.com/ahaanshrivastava800/gst-flow-demo/blob/main/docs/project-summary.md",
      problem:
        "Legacy GST filing systems process uploads synchronously; the request blocks and fails under load or with large files (10 s Vercel limit).",
      architecture:
        "One UI, two modes. Sync: POST /api/sync/upload blocks until completion or timeout. Async: POST /api/async/upload validates, queues the job in Upstash Redis and returns 202 with a job ID; a background worker endpoint (process-job) processes rows; the client tracks progress via polling and Server-Sent Events. A load simulator compares both modes under concurrent requests.",
      stack: [
        "Next.js (App Router)",
        "React",
        "Tailwind CSS",
        "Upstash Redis (REST)",
        "Vercel serverless functions",
        "Server-Sent Events"
      ],
      contribution: "Designed and built everything myself (solo).",
      note:
        "Demonstration project on simulated GST data; load-test figures come from the built-in simulator."
    },
    {
      id: "cloudcode",
      title: "CloudCode (prototype)",
      subtitle: "Built for the Omnikon National Hackathon 2026 (solo)",
      repoUrl: "https://github.com/ahaanshrivastava800/CloudCode",
      docsUrl:
        "https://github.com/ahaanshrivastava800/CloudCode/blob/main/ARCHITECTURE.md",
      problem:
        "Coding on a phone is awkward: desktop editors are hard on small screens, symbols are buried on the keyboard, and work is lost when the connection drops.",
      architecture:
        "Next.js app with a CodeMirror editor, terminal-style output panel, snippet library and mobile accessory bar. JavaScript, Python (via Pyodide, WebAssembly) and SQL (via sql.js) are routed to a client-side Web Worker, with a timeout on each run; the Python and SQL runtimes are loaded from a CDN. C++, Rust, Go and Java go to /api/execute, which in this prototype returns SIMULATED output and does not compile or run code. Files, projects, execution logs and a sync queue use IndexedDB helpers, so work is stored locally in the browser; a service worker (next-pwa) provides PWA caching.",
      stack: [
        "Next.js",
        "React",
        "CodeMirror",
        "Web Workers",
        "IndexedDB",
        "next-pwa",
        "Node.js"
      ],
      contribution: "Designed and built everything myself (solo).",
      note:
        "Limitations: remote execution is simulated; no authentication or cloud database yet."
    }
  ],

  education: {
    degree: "B.Tech, Computer Science and Artificial Intelligence",
    institution: "Newton School of Technology (NST), Pune",
    year: "First year",
    expectedGraduation: "7 August 2030"
  },

  achievements: [
    {
      title: "Gold Level, WorldQuant Challenge® (WorldQuant BRAIN)",
      date: "25 October 2026 (date per WorldQuant's email)",
      description:
        "Certificate of Accomplishment from WorldQuant for reaching Gold level.",
      links: [
        {
          label: "Certificate (PDF)",
          url: BASE + "proof/brain-gold-certificate.pdf"
        },
        {
          label: "WorldQuant email confirming date (PNG)",
          url: BASE + "proof/brain-gold-email.png"
        }
      ]
    },
    {
      title:
        "Hacktoberfest 26 (MLH + DEV; Newton School of Technology and Ajeenkya DY Patil University)",
      date: "24–25 October 2026",
      description:
        "Certificate of Achievement as Participant. Contributed README fixes and architecture and data-flow diagrams to an open-source repo via two pull requests.",
      links: [
        {
          label: "Certificate (PDF)",
          url: BASE + "proof/hacktoberfest-certificate.pdf"
        },
        {
          label: "Hacktober_project PR #1",
          url: "https://github.com/bhavsartaran04-ui/Hacktober_project/pull/1"
        },
        {
          label: "Hacktober_project PR #2",
          url: "https://github.com/bhavsartaran04-ui/Hacktober_project/pull/2"
        }
      ]
    },
    {
      title: "Omnikon National Hackathon 2026 (participant)",
      date: "Certificate issued 5 September 2026 (registered 14 August 2026)",
      description:
        "Participated and built CloudCode (see CloudCode in Projects).",
      relatedProjectId: "cloudcode",
      links: [
        {
          label: "Certificate (PNG)",
          url: BASE + "proof/omnikon-hackathon-certificate.png"
        }
      ]
    }
  ],

  contact: [
    {
      label: "Email",
      value: "ahaan.shrivastava800@gmail.com",
      url: "mailto:ahaan.shrivastava800@gmail.com",
      note: ""
    },
    {
      label: "GitHub",
      value: "github.com/ahaanshrivastava800",
      url: "https://github.com/ahaanshrivastava800",
      note: "Same account used for the course pull requests."
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/ahaan-shrivastava-48a157422",
      url: "https://www.linkedin.com/in/ahaan-shrivastava-48a157422",
      note: ""
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
