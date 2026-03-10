export type VolunteerCommunityItem = {
  id: string;
  title: string;
  timeline: string;
  link?: string;
  focus: string;
};

export const VOLUNTEER_COMMUNITY_ITEMS: VolunteerCommunityItem[] = [
  {
    id: "youtube",
    title: "YouTube",
    timeline: "2025 - Present",
    link: "https://youtube.com/@poyrazavsever",
    focus:
      "Publishing creator economy breakdowns and tutorials to help new devs ship their first projects.",
  },
  {
    id: "instagram",
    title: "Instagram",
    timeline: "2025 - Present",
    link: "https://instagram.com/poyrazavsever",
    focus:
      "Sharing behind-the-scenes workflow notes and short-form content tips for junior creatives.",
  },
  {
    id: "ostim-debate-club",
    title: "Ostim Debate Club",
    timeline: "2024 - Present",
    link: "https://ostimmunazara.com",
    focus: "Moderating weekly debate sessions and keeping the website content updated.",
  },
  {
    id: "huawei-student-developers",
    title: "Huawei Student Developers",
    timeline: "2025 - 2026",
    link: "https://hsdostim.tech",
    focus:
      "Organizing campus events around Huawei's developer tooling and mentoring first-time contributors.",
  },
  {
    id: "google-developer-student-club",
    title: "Google Developer Student Club",
    timeline: "2025 - 2025",
    focus:
      "Served as an event facilitator for one term, covering Flutter basics and Firebase quickstarts.",
  },
  {
    id: "ottoqa-technology-team",
    title: "Ottoqa Technology Team",
    timeline: "2024 - Present",
    focus:
      "Supporting robotics and embedded systems experiments with documentation and prototype reviews.",
  },
];
