// Single source of truth for everything shown on the site.
// Update this file when the CV changes.

export const profile = {
  name: 'Krutharth R Kumar',
  shortName: 'Krutharth',
  title: 'MSc Computer Science · Big Data Engineering',
  location: 'Amsterdam, Netherlands',
  email: 'krutharth07@gmail.com',
  github: 'https://github.com/krutharth1047',
  linkedin: 'https://www.linkedin.com/in/krk2004/',
  availability: 'Available for a six-month internship from February 2027',
  roles: [
    'finance AI copilots',
    'data pipelines',
    'SQL warehouses',
    'forecasting models',
    'process mining tools',
  ],
  summary:
    'MSc Computer Science (Big Data Engineering) student at the University of Amsterdam and Vrije Universiteit Amsterdam, skilled in Python, SQL and data analysis. I build data and AI tools for finance processes, from invoice automation and process mining to revenue forecasting and variance analysis.',
  bio: [
    "I'm a data engineer in the making, now doing my MSc in Computer Science on the Big Data Engineering track at the University of Amsterdam and Vrije Universiteit Amsterdam.",
    'Most of what I build sits where data meets finance: mining procure-to-pay logs for bottlenecks, automating invoice matching with LLMs that are kept honest by accounting checks, and splitting revenue variance into effects that reconcile to the cent.',
    "I'm first author of an IEEE paper on generative AI for document recommendations. Outside the terminal I run the Instagram (and the bar) at an Indian restaurant in Amsterdam, play football, chess and video games, and am learning Dutch one word at a time.",
  ],
  interests: ['Gaming', 'Football', 'Chess'],
};

export const stats = [
  { value: 2, label: 'Publications', sub: 'IEEE · Springer' },
  { value: 6, label: 'Projects', sub: 'on GitHub' },
  { value: 18, suffix: 'k+', label: 'Records analysed', sub: 'at Deloai' },
  { value: 8.51, decimals: 2, label: 'BE GPA', sub: 'out of 10' },
];

export const education = [
  {
    school: 'University of Amsterdam & Vrije Universiteit Amsterdam',
    degree: 'MSc Computer Science, Big Data Engineering track',
    place: 'Amsterdam, Netherlands',
    dates: 'Sep 2026 – Aug 2028',
    current: true,
  },
  {
    school: 'Yonsei University',
    degree: 'Yonsei International Summer School',
    place: 'Seoul, South Korea',
    dates: 'Jun 2026 – Aug 2026',
    logo: 'images/yonsei-logo.png',
  },
  {
    school: 'BMS Institute of Technology and Management',
    degree: 'BE Computer Science and Engineering',
    detail: 'GPA 8.51/10',
    place: 'Bengaluru, India',
    dates: 'Aug 2022 – May 2026',
  },
];

export const experience = [
  {
    company: "Jahagir's Kitchen",
    role: 'Social Media Manager and Front-of-House Staff',
    note: 'Indian restaurant · part-time, alongside studies',
    place: 'Amsterdam, Netherlands',
    dates: 'Sep 2026 – present',
    current: true,
    kind: 'work',
    points: [
      "Manage the restaurant's Instagram account, creating and publishing content to attract new guests.",
      'Serve guests, run the bar and handle cash and card payments at the till.',
      'Keep track of bar and kitchen stock levels.',
    ],
    tags: ['Social media', 'Content', 'Hospitality', 'Stock control'],
  },
  {
    company: 'Deloai Private Limited',
    role: 'Data Analyst Intern',
    place: 'Bengaluru, India',
    dates: 'Jan 2026 – Apr 2026',
    kind: 'data',
    points: [
      'Analysed retention, daily active user and placement metrics in SQL to support product decisions.',
      'Built Tableau dashboards and a churn analysis on 18,000+ student activity records.',
      'Wrote Python scripts generating 50,000+ synthetic student activity records to test the analytics pipeline.',
    ],
    tags: ['SQL', 'Tableau', 'Python', 'Churn analysis'],
  },
];

export const featuredProjects = [
  {
    id: 'invoice',
    name: 'Invoice Copilot',
    tagline: 'AP process mining and AI invoice automation',
    stack: ['Python', 'Claude API', 'Streamlit', 'Excel'],
    repo: 'https://github.com/krutharth1047/finance-invoice-copilot',
    repoLabel: 'krutharth1047/finance-invoice-copilot',
    points: [
      'Mined a procure-to-pay event log to find bottlenecks (approval waiting, inbox delays) and rework loops.',
      'Built invoice extraction (rules + LLM fallback, gated by accounting checks) and 3-way PO/receipt matching.',
      'On synthetic data: 73% touchless invoices, 97.5% anomaly recall, Excel business case of ~€256k/year.',
    ],
    metrics: [
      { value: '73%', label: 'touchless invoices' },
      { value: '97.5%', label: 'anomaly recall' },
      { value: '~€256k', label: 'per year business case' },
    ],
  },
  {
    id: 'fpa',
    name: 'Travel FP&A Copilot',
    tagline: 'Revenue variance and forecasting',
    stack: ['SQL', 'DuckDB', 'Python', 'statsmodels', 'Excel'],
    repo: 'https://github.com/krutharth1047/travel-fpa-copilot',
    repoLabel: 'krutharth1047/travel-fpa-copilot',
    points: [
      'Built a Snowflake-compatible SQL warehouse with 7 data-quality tests that stop reporting on failure.',
      'Split budget-vs-actual revenue into volume, mix, rate and take-rate effects that reconcile exactly to the variance.',
      'Backtested 3 forecast models per market (MAPE 1.2–6.5%) for a full-year estimate with P10–P90 range.',
      'Generated LLM management commentary with a guard that rejects any number not computed in code.',
    ],
    metrics: [
      { value: '7', label: 'data-quality gates' },
      { value: '1.2–6.5%', label: 'MAPE across markets' },
      { value: 'P10–P90', label: 'full-year range' },
    ],
  },
];

export const moreProjects = [
  {
    name: 'Glucoguide',
    text: 'Generative AI conversational assistant for diabetic patients with predictive health analytics and data visualisation.',
    img: 'images/glucoguide.webp',
    url: 'https://github.com/krutharth1047/Glucoguide',
    tags: ['Python', 'Generative AI', 'Healthcare'],
    category: 'AI',
  },
  {
    name: 'AgriSmart',
    text: 'AI-driven platform for crop prediction, fertiliser guidance and yield forecasting with GPT and Stripe API integration.',
    img: 'images/agrismart.png.avif',
    url: 'https://github.com/krutharth1047/AgriSmart',
    tags: ['Full stack', 'GPT API', 'Stripe'],
    category: 'Full stack',
  },
  {
    name: 'Autopilotnet',
    text: 'Deep learning model that predicts steering angles for autonomous vehicles, based on the NVIDIA end-to-end framework.',
    img: 'images/autopilotnet.jpg',
    url: 'https://github.com/krutharth1047/Autopilotnet',
    tags: ['Deep learning', 'PyTorch', 'Computer vision'],
    category: 'ML',
  },
  {
    name: 'StorySign',
    text: 'Sign recognition and accessibility tooling built with computer vision techniques in Python.',
    img: 'images/storysign.jpeg',
    url: 'https://github.com/krutharth1047/StorySign',
    tags: ['Python', 'OpenCV', 'Accessibility'],
    category: 'ML',
  },
];

export const publications = [
  {
    role: 'First author',
    title: 'Enhancing Web Document Recommendations with Generative AI',
    venue: 'IEEE CICN 2025',
    text: 'An LLM-based recommendation pipeline that optimises metadata selection, improving scalability and personalisation through efficient data handling.',
    tags: ['LLMs', 'Recommender systems', 'NLP'],
  },
  {
    role: 'Co-author',
    title: 'Mitigation of Fire Disasters Using Computer Vision and Machine Learning',
    venue: 'Springer LNNS 2026',
    text: 'Real-time fire detection with YOLOv5 on a Raspberry Pi: over 90% detection accuracy with under 2 s response latency, wired to a servo-targeted suppression mechanism.',
    tags: ['YOLOv5', 'Computer vision', 'IoT'],
  },
];

// `used` links a skill to where it shows up on the site, which powers the
// skill explorer. Leave it empty for skills that are just part of the toolkit.
export const skillGroups = [
  {
    group: 'Finance & analytics',
    skills: [
      { name: 'Excel / Google Sheets', used: ['Invoice Copilot', 'Travel FP&A Copilot'] },
      { name: 'PowerPoint / Google Slides', used: [] },
      { name: 'Tableau', used: ['Deloai'] },
      { name: 'Variance analysis', used: ['Travel FP&A Copilot'] },
      { name: 'Forecasting', used: ['Travel FP&A Copilot'] },
    ],
  },
  {
    group: 'Process & AI',
    skills: [
      { name: 'Lean process improvement', used: ['Invoice Copilot'] },
      { name: 'Process mining', used: ['Invoice Copilot'] },
      { name: 'AI process automation', used: ['Invoice Copilot'] },
      { name: 'LLM APIs (OpenAI, Claude)', used: ['Invoice Copilot', 'Travel FP&A Copilot', 'IEEE CICN 2025'] },
    ],
  },
  {
    group: 'Data & statistics',
    skills: [
      { name: 'Python', used: ['Invoice Copilot', 'Travel FP&A Copilot', 'Deloai'] },
      { name: 'pandas', used: ['Travel FP&A Copilot'] },
      { name: 'NumPy', used: [] },
      { name: 'SQL', used: ['Travel FP&A Copilot', 'Deloai'] },
      { name: 'DuckDB', used: ['Travel FP&A Copilot'] },
      { name: 'MySQL', used: ['Deloai'] },
      { name: 'SQLite', used: [] },
      { name: 'Statistical modelling', used: ['Travel FP&A Copilot'] },
      { name: 'Data mining', used: ['Invoice Copilot'] },
    ],
  },
  {
    group: 'ML & engineering',
    skills: [
      { name: 'scikit-learn', used: [] },
      { name: 'TensorFlow', used: [] },
      { name: 'PyTorch', used: ['Autopilotnet'] },
      { name: 'Apache Spark', used: [] },
      { name: 'Hadoop', used: [] },
      { name: 'Java', used: [] },
      { name: 'C++', used: [] },
    ],
  },
  {
    group: 'Tools',
    skills: [
      { name: 'Git', used: [] },
      { name: 'GitHub Actions', used: [] },
      { name: 'Linux', used: [] },
      { name: 'AWS', used: [] },
      { name: 'GCP', used: [] },
      { name: 'Streamlit', used: ['Invoice Copilot'] },
      { name: 'Flask', used: [] },
    ],
  },
];

export const languages = [
  { name: 'English', level: 'C1 · IELTS 7.5', pct: 85 },
  { name: 'Hindi', level: 'Native', pct: 100 },
  { name: 'Kannada', level: 'Native', pct: 100 },
  { name: 'Dutch', level: 'A1 · learning', pct: 15 },
];

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export const resumeMailto = `mailto:${profile.email}?subject=${encodeURIComponent(
  'CV request from your portfolio'
)}&body=${encodeURIComponent(
  "Hi Krutharth,\n\nI came across your portfolio and would love to see your CV. Hope to connect!\n\nThanks,"
)}`;
