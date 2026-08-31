import type { Localized } from "@/lib/locale";

export type TechnologyStackItem = {
  id: string;
  label: string | Localized;
  icon: string;
};

export type TechnologyStackGroup = {
  id: "frontend" | "backend" | "databases" | "languages" | "designTools";
  items: readonly TechnologyStackItem[];
};

export const TECHNOLOGY_STACK: readonly TechnologyStackGroup[] = [
  {
    id: "frontend",
    items: [
      { id: "react", label: "React.js", icon: "simple-icons:react" },
      { id: "nextjs", label: "Next.js", icon: "simple-icons:nextdotjs" },
      { id: "angular", label: "Angular", icon: "simple-icons:angular" },
      {
        id: "react-native",
        label: "React Native",
        icon: "mdi:react",
      },
      { id: "electron", label: "Electron.js", icon: "simple-icons:electron" },
      {
        id: "tailwindcss",
        label: "Tailwind CSS",
        icon: "simple-icons:tailwindcss",
      },
      {
        id: "bootstrap",
        label: "Bootstrap",
        icon: "simple-icons:bootstrap",
      },
      { id: "redux", label: "Redux", icon: "simple-icons:redux" },
      { id: "zustand", label: "Zustand", icon: "devicon:zustand" },
    ],
  },
  {
    id: "backend",
    items: [
      { id: "nodejs", label: "Node.js", icon: "simple-icons:nodedotjs" },
      { id: "express", label: "Express.js", icon: "simple-icons:express" },
      { id: "nestjs", label: "Nest.js", icon: "simple-icons:nestjs" },
      { id: "dotnet", label: ".NET", icon: "simple-icons:dotnet" },
      {
        id: "rest-api",
        label: { tr: "REST API'ler", en: "REST APIs" },
        icon: "mdi:api",
      },
      {
        id: "jwt-auth",
        label: "JWT Auth",
        icon: "simple-icons:jsonwebtokens",
      },
      { id: "prisma", label: "Prisma", icon: "simple-icons:prisma" },
      {
        id: "socket-io",
        label: "Socket.io",
        icon: "simple-icons:socketdotio",
      },
    ],
  },
  {
    id: "databases",
    items: [
      { id: "mongodb", label: "MongoDB", icon: "simple-icons:mongodb" },
      { id: "mongoose", label: "Mongoose", icon: "simple-icons:mongoose" },
      {
        id: "postgresql",
        label: "PostgreSQL",
        icon: "simple-icons:postgresql",
      },
      { id: "mysql", label: "MySQL", icon: "simple-icons:mysql" },
      {
        id: "mssql",
        label: "Microsoft SQL Server",
        icon: "simple-icons:microsoftsqlserver",
      },
    ],
  },
  {
    id: "languages",
    items: [
      {
        id: "javascript",
        label: "JavaScript",
        icon: "simple-icons:javascript",
      },
      {
        id: "typescript",
        label: "TypeScript",
        icon: "simple-icons:typescript",
      },
      { id: "csharp", label: "C#", icon: "mdi:language-csharp" },
    ],
  },
  {
    id: "designTools",
    items: [
      { id: "figma", label: "Figma", icon: "simple-icons:figma" },
      {
        id: "wireframing",
        label: "Wireframing",
        icon: "mdi:vector-square",
      },
      {
        id: "design-systems",
        label: { tr: "Tasarım Sistemleri", en: "Design Systems" },
        icon: "mdi:palette-swatch-outline",
      },
      { id: "git", label: "Git", icon: "simple-icons:git" },
      { id: "github", label: "GitHub", icon: "simple-icons:github" },
      { id: "firebase", label: "Firebase", icon: "simple-icons:firebase" },
      { id: "supabase", label: "Supabase", icon: "simple-icons:supabase" },
      {
        id: "vercel-ai-sdk",
        label: "Vercel AI SDK",
        icon: "simple-icons:vercel",
      },
      { id: "postman", label: "Postman", icon: "simple-icons:postman" },
    ],
  },
];
