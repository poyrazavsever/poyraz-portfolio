export type BlogDetail = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  coverImage: string;
  markdown: string;
};

export const BLOG_DETAILS: BlogDetail[] = [
  {
    slug: "building-minimal-design-systems",
    title: "Building Minimal Design Systems",
    category: "React",
    date: "March 2026",
    readTime: "12 min read",
    author: "Poyraz Avsever",
    excerpt:
      "A practical and detailed playbook for building a clean, scalable UI system with markdown-driven documentation, mermaid diagrams, and implementation-ready code.",
    coverImage: "/news/design.svg",
    markdown: `
## Why Most Design Systems Become Heavy

Most teams start with good intentions and end up with too many variants, too many exceptions, and no clear usage guide.  
The real problem is usually **decision sprawl**:

- Too many size and style combinations
- Inconsistent naming conventions
- Documentation that explains props, but not decisions

---

## Core Principle: Constrain First, Expand Later

Start with a strict base:

1. Typography scale
2. Spacing scale
3. Semantic colors
4. A handful of primitives

> A design system is not a component museum.  
> It is an agreement that helps teams ship consistent UI quickly.

---

## Suggested Token Strategy

\`\`\`json
{
  "font": {
    "size": { "sm": "0.875rem", "base": "1rem", "lg": "1.125rem" },
    "weight": { "regular": 400, "medium": 500, "bold": 700 }
  },
  "space": {
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "6": "1.5rem"
  }
}
\`\`\`

---

## Architecture Flow

\`\`\`mermaid
flowchart LR
  A[Design Tokens] --> B[Primitives]
  B --> C[Composed Components]
  C --> D[Page Sections]
  D --> E[Product Screens]
\`\`\`

---

## Example: Button Primitive

\`\`\`tsx
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-sm text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-border bg-background",
        ghost: "bg-transparent"
      },
      size: {
        sm: "h-8 px-3",
        md: "h-9 px-4",
        lg: "h-10 px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
\`\`\`

Why this works:

- Variants are explicit
- Defaults are stable
- Consumers avoid ad-hoc class combinations

---

## Documentation Pattern That Scales

Instead of “prop-only docs”, use this pattern for every component:

### 1) When to use
Explain context and intent.

### 2) Do / Don't
Show 2 positive and 2 negative examples.

### 3) Accessibility checklist

- Keyboard interaction
- Focus visibility
- ARIA coverage

### 4) Code examples by complexity

- Basic
- With validation
- With async state

---

## Mermaid Sequence for Contribution Workflow

\`\`\`mermaid
sequenceDiagram
  participant Dev as Developer
  participant DS as Design System
  participant App as Product App

  Dev->>DS: Add primitive or variant
  DS-->>Dev: Exports + docs update
  Dev->>App: Integrate component
  App-->>Dev: UX feedback
  Dev->>DS: Refine API
\`\`\`

---

## Example: Page-Level Composition

\`\`\`tsx
export function BlogHeader() {
  return (
    <header className="space-y-2">
      <Badge>React</Badge>
      <h1 className="text-2xl font-bold">Building Minimal Design Systems</h1>
      <p className="text-sm text-muted-foreground">
        Practical notes from shipping real components.
      </p>
    </header>
  );
}
\`\`\`

---

## Common Failure Modes

| Problem | Why it happens | Better approach |
|---|---|---|
| Variant explosion | No ownership rules | Add contribution guardrails |
| Styling overrides everywhere | Weak defaults | Strengthen semantic tokens |
| Inconsistent docs | No template | Use one markdown template |
| Slow adoption | API too abstract | Show direct usage examples |

---

## Final Checklist Before Shipping a New Component

- [ ] API is minimal and explicit
- [ ] States are documented (default, hover, focus, disabled, loading)
- [ ] Keyboard support verified
- [ ] Mobile rendering verified
- [ ] Real usage example added to docs

---

## Closing Notes

A minimal design system should feel boring in the best way.  
When engineers can predict behavior, teams move faster with fewer regressions.

Focus on **consistency, clarity, and constraints**.  
Those three will outperform “feature-rich” component sets in the long run.
`,
  },
] as const;

export function getBlogDetailBySlug(slug: string) {
  return BLOG_DETAILS.find((post) => post.slug === slug) ?? null;
}
