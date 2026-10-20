// Project listings. `stack` drives both the project cards and the Toolkit
// matrix, so a tool only appears in the matrix if a project actually used it.
//
// `tone` is the backdrop behind the preview — sampled from the screenshot.
//
// Optional fields, rendered only when present:
//   live: "https://…"   — public site
//   repo: "https://…"   — source code

export const projects = [
  {
    id: "himalayan-bellevue",
    title: "Himalayan Bellevue Resort",
    short: "Bellevue",
    category: "Hotel booking platform",
    year: "2026",
    role: "Full-stack developer",
    summary:
      "A complete booking platform for a resort: the guest-facing site, an admin dashboard for room management, and the REST API underneath it.",
    highlights: [
      "Express REST API with JWT authentication",
      "Admin dashboard with room management",
      "Image uploads through Cloudinary",
      "Automated email through Brevo",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Cloudinary"],
    image: "himalayan-bellevue",
    tone: "#3a2f22",
  },
  {
    id: "aarogya-sewa",
    title: "Aarogya Sewa Hospital",
    short: "Aarogya",
    category: "Healthcare platform",
    year: "2026",
    role: "Frontend developer",
    summary:
      "Hospital site with appointment booking, doctor profiles, a services showcase and animated statistics. Data fetching runs through TanStack Query.",
    stack: ["React", "TanStack Query", "Framer Motion", "Zod", "Swiper"],
    image: "aarogya-sewa",
    tone: "#16426b",
  },
  {
    id: "fusiondot",
    title: "FusionDot",
    short: "FusionDot",
    category: "Consultancy portal",
    year: "2026",
    role: "Frontend developer",
    summary:
      "Multi-page consultancy web app with an interactive Leaflet map, country flags, Swiper carousels and React Router navigation.",
    stack: ["React", "Leaflet", "React Router", "Framer Motion", "Swiper"],
    image: "fusiondot",
    tone: "#121a33",
  },
  {
    id: "hihi-consultancy",
    title: "HiHi Consultancy",
    short: "HiHi",
    category: "Corporate website",
    year: "2026",
    role: "Frontend developer",
    summary:
      "Corporate site with an interactive world map, service listings, team profiles and page transitions.",
    stack: ["React", "Tailwind CSS", "Leaflet", "Swiper", "Vite"],
    image: "hihi-consultancy",
    tone: "#c9d2de",
  },
  {
    id: "mrds",
    title: "MRDS NGO",
    short: "MRDS",
    category: "Non-profit website",
    year: "2026",
    role: "Frontend developer",
    summary:
      "Non-profit site built around storytelling: a mission-led hero, programme cards, animated impact figures and a donation call to action.",
    stack: ["React", "Tailwind CSS", "Framer Motion", "Lucide React"],
    image: "mrds",
    tone: "#b5521c",
  },
  {
    id: "srisha-marbel",
    title: "Srisha Marbel",
    short: "Srisha",
    category: "Business website",
    year: "2025",
    role: "Web developer",
    summary:
      "Marble and tiles showroom site with a product gallery, built as a multi-page PHP site in a gold-and-stone palette.",
    stack: ["PHP", "HTML", "CSS", "JavaScript"],
    image: "srisha-marbel",
    tone: "#6b5a43",
  },
];

// Preview images live in /public/work as <name>-720.webp and <name>-1376.webp.
export const imageSet = (name) => ({
  src: `/work/${name}-1376.webp`,
  srcSet: `/work/${name}-720.webp 720w, /work/${name}-1376.webp 1376w`,
  width: 1376,
  height: 768,
});

// Toolkit matrix rows, grouped. Each tool must appear in at least one
// project's `stack` above — the matrix is computed, not hand-filled.
export const toolGroups = [
  { label: "Interface", tools: ["React", "React Router", "TanStack Query", "Tailwind CSS", "Framer Motion"] },
  { label: "Server & data", tools: ["Node.js", "Express", "MongoDB", "PHP"] },
  { label: "Libraries & services", tools: ["Leaflet", "Swiper", "Zod", "Cloudinary"] },
];
