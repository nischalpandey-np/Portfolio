// Single source of truth for personal details. Everything here is shown on
// the site, so keep it factual — the copy is written from this data.

export const profile = {
  name: "Nischal Pandey",
  role: "Frontend & full-stack developer",
  location: "Kathmandu, Nepal",
  timeZone: "Asia/Kathmandu",
  email: "fsd.nischal@gmail.com",
  portrait: "/nischal-portrait.webp",
  links: [
    { label: "GitHub", href: "https://github.com/nischalpandey-np", handle: "nischalpandey-np" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nischalpandey/", handle: "in/nischalpandey" },
  ],
};

// Reverse-chronological. `end: null` means ongoing.
export const timeline = [
  {
    kind: "Work",
    title: "Frontend Developer",
    org: "Rahu Doom Pvt Ltd",
    start: "May 2026",
    end: null,
    summary:
      "Building production web applications and platforms: scalable React front ends, performance work, and close collaboration with cross-functional teams.",
  },
  {
    kind: "Study",
    title: "B.Sc. CSIT",
    org: "Metropolitan College, Kathmandu",
    start: "2025",
    end: null,
    summary:
      "Computer Science & Information Technology. Coursework in data structures, database systems, operating systems, web technologies and OOP.",
  },
];

// Tools used day to day that aren't tied to a specific listed project.
export const alsoUsing = ["JavaScript", "TypeScript", "Next.js", "REST APIs", "Git", "Figma"];

export const learning = ["Docker", "AWS", "Redis", "GraphQL", "tRPC"];
