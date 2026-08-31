---
title: "Software with Poyraz #1319072026"
category: "Newsletter"
date: "2026-07-19"
readTime: "6 min read"
author: "Poyraz Avsever"
slug: "software-with-poyraz-1319072026"
excerpt: "This week, we have a packed tech agenda, from AI model price wars and enterprise agent protocols to HTTP QUERY, Figma updates, and Cloudflare's machine-economy push."
coverImage: "/blog/images/poyraz-ile-yazilima-dair-1319072026-cover.webp"
lang: "en"
---

# Software with Poyraz #1319072026

Hello,

We are in a new week of the Software with Poyraz series. Once again, I gathered the developments shaking up technology, software, and design in a simple and direct format.

Let's start quickly with this week's most important AI stories.

## Artificial Intelligence Developments

### The Big Model Price War and the Chip Crisis

[Source link](https://kersai.com/ai-breakthroughs-july-2026/)

A major pricing battle has begun between Grok 4.5, GPT-5.6, and Muse Spark 1.1. As AI costs fall, Meta has stepped back from open-weight models, while DeepSeek has started designing its own chip to reduce its dependence on Nvidia.

On the other side, Microsoft laid off 4,800 people because of a margin crisis. Large companies are now building their own AI systems instead of paying license fees for traditional SaaS tools. I think this will completely reshuffle the software industry's deck. The commoditization of AI costs is great, but the fact that big technology companies are cutting their workforces this sharply is one of the clearest signs of how painful enterprise transformation will be.

### The Enterprise Agent Protocol Alliance

[Source link](https://www.buildfastwithai.com/blogs/ai-news-today-july-13-2026)

Google, Microsoft, Salesforce, Snowflake, and ServiceNow have formed a major partnership. Their goal is to develop a shared AI agent connection protocol to challenge Anthropic and OpenAI's power in the enterprise market.

The battle is no longer only about the intelligence of AI itself, but about how systems talk to each other. In other words, the war over the "internet plumbing" has begun. Whoever gets their standard accepted will likely shape the next 10 years. For us developers, following these protocol battles is critical, because our future integrations will be written around these new rules.

### GPT-Live: The Full-Duplex Voice Revolution

[Source link](https://openai.com/tr-TR/index/introducing-gpt-live/)

OpenAI released GPT-Live, a voice model that can listen and speak at the same time. It does not wait for its turn like older assistants; it can naturally tolerate interruptions and overlap, much more like a human conversation.

When a heavier reasoning task is needed, it delegates that work to other models in the background without breaking the flow of the conversation. We can say that the era of talking to voice assistants like walkie-talkies is over. From customer support to our daily coding assistant experiences, this is an infrastructure that can make AI interaction feel dramatically more natural.

### PwC and OpenAI's Enterprise Front-Line Collaboration

[Source link](https://podimo.com/shows/the-varosity-ai-gtm-report/episode/6f099132-aecb-582d-a0ea-339add4b8581)

Consulting giant PwC has started using OpenAI's new voice agent infrastructure to deploy autonomous voice assistants directly in customer support, marketing, and sales departments.

This move shows that the AI revolution often discussed in theory for call centers and customer touchpoints has now started in the field. AI is no longer only a back-office tool that writes code; it is becoming a digital worker that directly faces the customer.

## Software Developments

### Standardization of the HTTP QUERY Method

[Source link](https://www.developersdigest.tech/blog/rfc-10008-http-query-method)

After 16 years, IETF added a new method to the HTTP protocol for the first time: `QUERY`. We used to rely on `POST` for large AI prompts or complex data, but because those requests could not be cached, they created major GPU and server costs.

The `QUERY` method can carry large payloads in the body like `POST`, while staying safe and cacheable like `GET`. This will likely reduce data center costs significantly at the edge. But it is also an urgent warning for cybersecurity teams, because many existing web application firewalls do not recognize this method yet and may miss attacks hidden inside it. We need to update our defense systems quickly.

### TypeScript 7.0 Reborn in Go

[Source link](https://www.infoworld.com/article/4196378/go-based-typescript-7-0-arrives.html)

Microsoft has moved the JavaScript-based TypeScript compiler entirely to Go. Thanks to Go's native speed and multithreading support, build times in massive projects have become 10 times faster.

Turning minutes of waiting into seconds will greatly improve our daily developer experience. The fact that Microsoft also offers a backward-compatibility package called `tsc6` to avoid breaking older projects and tools makes the transition much easier.

### Supabase OpenCode and Binary Support Update

[Source link](https://github.com/orgs/supabase/discussions/47796)

Open-source database platform Supabase released an MCP integration called "OpenCode," allowing AI agents to connect directly to tables, logs, and edge functions.

It also added binary data support to its realtime streaming infrastructure so heavier packets such as live screenshots and sensor data can be transmitted with lower latency. The ability for AI agents to work this directly and structurally with databases will make data management much more stable in autonomous software workflows.

### GitHub Advanced Search and Security Scans

[Source link](https://releasebot.io/updates/github)

GitHub added advanced search features with logical operators to the projects section, while also giving administrators the ability to hide archived PRs from the general view.

The most critical update is the `/security-review` command inside Copilot. With it, our code changes can be analyzed for security issues immediately and with high accuracy. As coding speed increases, the risk of security vulnerabilities grows as well, so built-in scanning tools like this are becoming a necessity for keeping projects clean.

## Design Developments

### Figma Code Layers and GPT-5.6 Integration

[Source link](https://releasebot.io/updates/figma)

Figma released "Code Layers," a feature that improves the process of importing code-based screens. Imported designs can now automatically connect to existing variables in the system.

In addition, the GPT-5.6 model integrated into Figma Make can generate functional, self-healing prototypes with strong visual hierarchy even from very incomplete text prompts. By reducing hand-off friction between design and code, this step shows that Figma is no longer just a drawing tool; it is moving into the center of product development.

### The Rise of Meta's Astryx Design System

[Source link](https://www.opensourceforu.com/2026/07/github-trending-astryx-brings-ai-ready-open-source-to-react/)

Meta open-sourced "Astryx," a StyleX-based React design system it had tested for years in internal applications and which reduces CSS load by 80%.

The truly significant part of this system is that it provides machine-readable JSON manifests and MCP support that AI coding agents can understand, instead of being optimized only for humans. This approach, which aims to remove hallucinations when coding agents generate interfaces, is a clear signal that future design systems may be optimized for autonomous agents as much as for people.

## Technology News

### Apple's Trade Secret Lawsuit Against OpenAI

[Source link](https://www.buildfastwithai.com/blogs/ai-news-today-july-13-2026)

Apple filed a trade secret theft lawsuit against OpenAI, claiming that OpenAI transferred more than 400 employees who had worked on M-series chips and on-device AI infrastructure.

Elon Musk joining the debate on X and supporting the lawsuit turned the situation into a full prestige battle. AI competition is no longer happening only through software models, but also through the hardware and chip technologies those models will run on. This lawsuit shows very clearly how aggressive the talent wars in the industry can become.

### EU AI Act Article 50 Comes Into Force

[Source link](https://podimo.com/shows/the-varosity-ai-gtm-report/episode/920602b7-8715-5d8a-979d-b3c31007dc61)

Article 50 of the European Union's AI Act, which requires synthetic content to be clearly identified as AI-generated, gains legal enforcement power as of August 2.

The most important point is that this legal responsibility will not belong to model providers such as OpenAI or Anthropic, but to the brand that publishes the content on its website or in its ads. Every company using AI tools needs to urgently align its content workflows with these transparency rules to avoid legal penalties.

### Intel's 5 Billion Euro Chip Investment in Ireland

[Source link](https://newsroom.intel.com/)

Intel, aiming to increase Europe's share in the semiconductor supply chain, decided to invest 5 billion Euro to expand its manufacturing facilities in Ireland.

The company also entered a strategic partnership with Google Cloud and Gemini Enterprise to digitize its own corporate structure with autonomous agents. Infrastructure investments of this scale in chip production are a highly strategic move for solving AI's hardware-side supply crises in the coming years.

### Cloudflare Uses HTTP 402 to Charge Agents

[Source link](https://unrot.co/blogs/today-top-10-ai-news-july-13-2026)

Cloudflare announced its "Monetization Gateway" infrastructure so websites can instantly collect payment from AI agents that read or scrape their content.

This system revives the legendary HTTP 402 "Payment Required" status code, designed in the early days of the internet in the 1990s but never really used, through the x402 standard. The internet's revenue model is evolving toward a new machine economy where bots and machines trade with websites.

### Illinois Passes Mandatory AI Audit Law

[Source link](https://www.enterprisetimes.co.uk/2026/07/13/security-and-ai-news-from-the-week-beginning-6-july-2026/)

The U.S. state of Illinois passed a law requiring companies with annual revenue above 500 million dollars to undergo independent external audits of their AI systems.

The law also requires security vulnerabilities or hard-to-repair harms discovered in these systems to be reported within 72 hours. As governments harden their oversight mechanisms around AI, compliance will become a new line of work for large-scale companies building autonomous systems.

See you next week with the latest developments.

I wish everyone a pleasant and calm week! 👋
