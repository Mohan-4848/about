export const profile = {
  name: 'Mohan Balaji',
  fullName: 'Badri Mohan Balaji',
  role: 'Full-stack & systems engineer',
  location: 'Hyderabad, India',
  timezone: 'Asia/Kolkata',
  education: 'B.Tech CSE · MLRIT',
  school: 'MLR Institute of Technology, Hyderabad',
  availability: 'Open to software engineering roles',
  email: 'mohanbalaji4848@gmail.com',
  domain: 'mohanbalaji.in',
  // Drop your résumé into /public (e.g. public/resume.pdf) and set this to '/resume.pdf'
  // to show a "Résumé" button in the hero and command palette.
  resume: '',
  socials: {
    github: 'https://github.com/Mohan-4848',
    linkedin: 'https://linkedin.com/in/badrimohanbalaji',
  },
};

export const navLinks = [
  { id: 'work', label: 'Work' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'about', label: 'About' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'lab', label: 'Lab' },
  { id: 'contact', label: 'Contact' },
];

export const highlights = [
  { value: 2, suffix: 'nd', label: 'Prize at the MRUH Hackathon, Oct 2026' },
  { value: 85, suffix: ' ms', label: 'Warm-start code execution in CodeArena' },
  { value: 0, label: 'Open inbound ports on my ARM64 game server' },
  { value: 12, suffix: '+', label: 'Self-hosted containers in my homelab' },
];

export const projects = [
  {
    id: 'codearena',
    name: 'CodeArena',
    title: 'CodeArena Execution Sandbox',
    category: 'Systems · Docker',
    tagline: 'A queued engine that runs untrusted code inside locked-down containers.',
    description:
      'Evaluates untrusted C++, Python and Java submissions in ephemeral Docker containers with cgroup v2 limits, orchestrated by a Redis BullMQ worker pool so no single job can starve the host.',
    longDescription:
      'CodeArena solves the problem of safely executing arbitrary, untrusted user code at scale. Every test case runs in a hardened scratch container with custom Linux cgroup limits — CPU quota, memory ceiling and a PID cap — so a fork bomb or infinite loop stays contained. A Redis-backed BullMQ cluster handles multi-tenant queueing with backpressure, and a FastAPI worker layer streams stdout, stderr and memory telemetry back to the React client over WebSockets.',
    architecture: [
      'cgroup v2 limits enforce strict CPU time (2.0 s max) and memory (256 MB max) per run',
      'Ephemeral Docker micro-containers are spun up per test case and garbage-collected automatically',
      'Redis BullMQ task queue with multi-worker concurrency management and backpressure controls',
      'Async FastAPI worker layer streams real-time stdout, stderr and memory telemetry',
    ],
    tags: ['React', 'FastAPI', 'Docker', 'Redis', 'BullMQ', 'Linux cgroups', 'ARM64'],
    metrics: [
      { label: 'Latency', value: '340 ms cold · 85 ms warm' },
      { label: 'Isolation', value: 'cgroup v2 + seccomp' },
      { label: 'Runtimes', value: 'C++ · Java 21 · Python 3.12' },
    ],
    featured: true,
    github: 'https://github.com/mohanbalaji',
  },
  {
    id: 'speedpot',
    name: 'SpeedPot',
    title: 'SpeedPot Road Anomaly Detector',
    category: 'Android · Sensors',
    tagline: 'Turns a phone on the dashboard into a live pothole-mapping sensor.',
    description:
      'An Android client that fuses accelerometer and GPS streams, separates real road hazards from normal driving vibration, and syncs geotagged events to Firestore for a live hazard map.',
    longDescription:
      'SpeedPot is an on-device sensor-fusion client for Android that captures high-frequency 3-axis accelerometer and gyroscope spikes. An edge thresholding algorithm separates normal driving vibration from genuine road anomalies like potholes and speed bumps. Validated events are stamped with high-accuracy GPS coordinates and synced in batches to Firebase Firestore, rendering interactive hazard maps for municipal reporting.',
    architecture: [
      'Background Android service polling sensors at 50 Hz on a low-power budget',
      'Dynamic-window filtering that rejects non-vehicular, erratic noise',
      'Offline-first SQLite buffer with batched sync over intermittent mobile connections',
      'Firestore geo-query index for instant bounding-box map rendering',
    ],
    tags: ['Kotlin', 'Android', 'Sensor fusion', 'Firebase', 'SQLite', 'Geohashing'],
    metrics: [
      { label: 'Sampling', value: '50 Hz' },
      { label: 'Battery', value: '< 3.5% / hr' },
      { label: 'GPS lock', value: 'sub-5 m' },
    ],
    featured: true,
    github: 'https://github.com/mohanbalaji',
  },
  {
    id: 'hybrid-node',
    name: 'Hybrid Game Node',
    title: 'Hybrid Cross-Platform Game Node',
    category: 'Infra · Networking',
    tagline: 'A cross-platform game server with zero open inbound ports.',
    description:
      'An ARM64 server on Oracle Cloud that bridges Java and Bedrock clients through GeyserMC and Floodgate, exposed to the internet only through an outbound Cloudflare Tunnel.',
    longDescription:
      'A zero-attack-surface multiplayer server running on Oracle Cloud Ampere ARM64 hardware (4 OCPUs, 24 GB RAM). GeyserMC and Floodgate translate packets in both directions between Java Edition and Bedrock Edition clients. Public IPv4 exposure is eliminated entirely: all traffic routes through automated Cloudflare Tunnels with custom UDP edge proxying.',
    architecture: [
      'OCI Ampere A1 ARM64 instance with kernel-level tuning',
      'GeyserMC + Floodgate translate Bedrock UDP to Java TCP',
      'Cloudflare Zero Trust Tunnel: no open inbound ports, DDoS absorbed at the edge',
      'systemd supervision, memory-trim cron jobs and daily Restic off-site snapshots',
    ],
    tags: ['Ubuntu', 'ARM64', 'Cloudflare Tunnels', 'Docker', 'Networking', 'Bash'],
    metrics: [
      { label: 'Uptime', value: '99.9%' },
      { label: 'Open ports', value: '0' },
      { label: 'Hardware', value: '4 × ARM64 · 24 GB' },
    ],
    featured: true,
    github: 'https://github.com/mohanbalaji',
  },
  {
    id: 'aims-portal',
    name: 'AIMS Health Portal',
    title: 'Healthcare Services Web Portal (AIMS)',
    category: 'Web · Accessibility',
    tagline: 'An accessible, instant-feeling hospital booking portal.',
    description:
      'An institutional healthcare portal prototype built around WCAG 2.1 AA accessibility, instant client-side search and conflict-free appointment booking flows.',
    longDescription:
      'An institutional-grade healthcare portal prototype that prioritises WCAG 2.1 AA accessibility, instant page transitions and modular doctor–patient booking flows. Type-safe state machines drive appointment scheduling, triage questionnaires and the department directory, with instant client-side fuzzy search.',
    architecture: [
      'Vite + React component architecture with TypeScript strict mode',
      'Tailwind design tokens tuned for high-contrast medical legibility',
      'Accessible dialogs with focus traps and screen-reader-friendly ARIA trees',
      'Client-side appointment conflict detection with simulated backend persistence',
    ],
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'State machines', 'a11y'],
    metrics: [
      { label: 'Lighthouse', value: '99 perf · 100 a11y' },
      { label: 'Initial JS', value: '< 45 kB gzip' },
      { label: 'Search', value: '< 5 ms' },
    ],
    featured: true,
    github: 'https://github.com/mohanbalaji',
  },
  {
    id: 'meme-indexer',
    name: 'Meme Indexer',
    title: 'Meme Indexer & Media Pipeline',
    category: 'Backend · Media',
    tagline: 'Self-hosted media ingestion with automatic transcription and full-text search.',
    description:
      'A self-hosted media hub that extracts audio from clips, transcribes it in background workers and makes every spoken word searchable.',
    longDescription:
      'A self-hosted ingestion hub for video clips, memes and audio snippets. A background worker pipeline built on FFmpeg and Python speech-to-text extracts audio tracks, indexes transcripts as full-text-searchable documents and generates compressed preview thumbnails on the fly.',
    architecture: [
      'Express REST API handling chunked multipart uploads with integrity checksums',
      'Python workers consuming Celery queues for asynchronous transcoding',
      'FFmpeg audio separation and waveform thumbnail generation',
      'PostgreSQL full-text search over extracted transcripts',
    ],
    tags: ['Python', 'Express', 'FFmpeg', 'Celery', 'PostgreSQL', 'Docker'],
    metrics: [
      { label: 'Transcode', value: '4× realtime' },
      { label: 'Storage', value: '~65% smaller' },
      { label: 'Search', value: 'Full-text, fuzzy' },
    ],
    featured: false,
    github: 'https://github.com/mohanbalaji',
  },
];

export const recognition = {
  id: 'mruh-hackathon',
  place: '2nd',
  badge: 'Runner-up',
  date: '3–4 Oct 2026',
  title: 'MRUH Hackathon',
  org: 'Malla Reddy University',
  description:
    'Designed, built and pitched an end-to-end full-stack prototype in a 24-hour sprint, handling real-time data flow, cloud hosting and a production deploy under deadline.',
  highlights: [
    'Built the backend endpoints and the frontend dashboard inside the 24-hour window',
    'Held up under live jury stress-testing with no downtime or latency regressions',
    'Placed 2nd across university and external collegiate teams',
  ],
};

export const about = {
  statement: 'I value determinism, performance and clear architectural boundaries over unnecessary abstraction.',
  paragraphs: [
    'I’m an undergraduate Computer Science & Engineering student at MLR Institute of Technology in Hyderabad. My work sits where low-level systems engineering meets reactive web applications.',
    'Whether that means a code-execution sandbox with custom cgroup limits, a distributed Redis worker pool, or shaving render cycles off a React UI, I like knowing exactly what the machine is doing.',
    'Outside coursework I run a real homelab — ARM64 virtualization, a Tailscale mesh and Cloudflare edge tunnels — so the infrastructure I write about is infrastructure I actually operate.',
  ],
  facts: [
    { label: 'Based in', value: 'Hyderabad, India' },
    { label: 'Studying', value: 'B.Tech, Computer Science & Engineering — MLRIT' },
    { label: 'Focus', value: 'Systems, backend infrastructure and web' },
    { label: 'Off-screen', value: 'Speedcubing — sub-20s on a 3×3' },
  ],
  principles: [
    {
      title: 'Zero-trust by default',
      body: 'Nothing is exposed to the public internet without an encrypted tunnel and identity in front of it.',
    },
    {
      title: 'Isolation first',
      body: 'Untrusted work runs inside deterministic CPU, memory and PID quotas so no neighbour gets starved.',
    },
    {
      title: 'Interfaces that feel instant',
      body: 'Complex backends deserve fast, predictable frontends — no sluggish animation or bloated DOM.',
    },
    {
      title: 'Reproducible everything',
      body: 'Code, Dockerfiles and dotfiles are versioned and can be bootstrapped on bare metal anywhere.',
    },
  ],
};

export const toolkit = [
  {
    id: 'languages',
    title: 'Languages',
    description: 'Algorithmic thinking in compiled and typed languages.',
    items: ['C', 'C++', 'Java', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Fast, accessible, reactive interfaces.',
    items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'HTML / CSS', 'Design systems'],
  },
  {
    id: 'backend',
    title: 'Backend & data',
    description: 'Async APIs, queues and structured persistence.',
    items: ['FastAPI', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'BullMQ'],
  },
  {
    id: 'systems',
    title: 'Systems & cloud',
    description: 'Containers, networking and hosting automation.',
    items: ['Docker', 'Linux', 'ARM64', 'Cloudflare Tunnels', 'Tailscale', 'Reverse proxies', 'Git'],
  },
];

export const lab = {
  workstations: [
    {
      name: 'Dell G15 Special Edition',
      role: 'Compute & Docker host',
      specs: ['Intel Core i7', '16 GB DDR4 dual-channel', 'NVIDIA RTX', 'Dual NVMe PCIe 4.0'],
      os: 'Ubuntu 24.04 LTS · Windows (WSL2)',
    },
    {
      name: 'MacBook Air M1',
      role: 'Daily driver',
      specs: ['Apple M1, 8-core', 'Unified memory', 'All-day battery'],
      os: 'macOS · Homebrew · zsh + Starship',
    },
  ],
  services: [
    { name: 'Docker Engine', detail: '12+ containers — Redis, Postgres, Nginx, Portainer, BullMQ workers', status: 'Running' },
    { name: 'Tailscale', detail: 'WireGuard mesh linking every personal node', status: 'Connected' },
    { name: 'Cloudflare Tunnels', detail: 'Outbound-only ingress with HTTPS and DDoS protection at the edge', status: 'Active' },
    { name: 'Oracle Cloud ARM64', detail: 'Ampere A1 · 4 OCPU · 24 GB running long-lived daemons', status: 'Online' },
  ],
  dotfiles: 'Neovim · tmux · zsh — dotfiles synced via a bare Git repo',
};
