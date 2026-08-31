---
title: "Software with Poyraz #2702082026"
category: "Newsletter"
date: "2026-08-02"
readTime: "5 min read"
author: "Poyraz Avsever"
slug: "newsletter2702082026-en"
excerpt: "This week, we have a packed agenda, from autonomous AI models and data center water consumption to major shifts in design tools, next-generation batteries, and chip technologies."
coverImage: "/blog/images/newsletter2702082026-cover.webp"
lang: "en"
---

# Software with Poyraz #2702082026

Greetings,

I am back with a new issue of Software with Poyraz. In this edition, covering the week of July 27 - August 2, 2026, we take a closer look at several developments that are shaking up the technology and software world.

From AI models that act on their own and lock up systems, to the massive water crisis behind data centers, major changes in design tools, and next-generation battery and chip technologies, we have a full agenda this week.

Without further ado, let's move quickly into the week's highlights.

## Artificial Intelligence Developments

### The White House's $5 Billion Genesis Mission and the AI Race with China

Sources: [Washington Post](https://www.washingtonpost.com/business/technology/), [Nextgov](https://www.nextgov.com/)

The White House allocated a massive budget of more than $5 billion to the Genesis Mission project to accelerate the use of artificial intelligence in scientific research, with more than 15 federal agencies involved. Led by the Department of Energy, the project selected more than 270 AI initiatives across areas such as health, energy, and national security. On the other side, Silicon Valley CEOs published a joint letter opposing more restrictive AI policies. The real reason behind this letter is the rising cost of US-based labs, which is pushing companies toward China-based models, while companies such as DeepSeek and Moonshot AI continue to move quickly.

Thought: The confusion governments have around artificial intelligence is very clear. On one hand, billions of dollars are being distributed to preserve technological superiority against China; on the other hand, governments are trying to introduce strict regulations because they are afraid of autonomous hacking incidents. As software teams, the biggest lesson we should take from this geopolitical tension is that we should not lock our systems into the ecosystem of a single country or company. We have to design our infrastructure in an agnostic way that can switch between different APIs instantly.

## Software Developments

### The GitHub Models Era Is Over: Developers Are Looking for Alternative Routes

[Source link](https://www.developersdigest.tech/blog/github-models-retired-2026)

GitHub, under Microsoft, permanently shut down GitHub Models as of July 30, 2026. The service included a model catalog, playground, inference API, and bring-your-own-key (BYOK) features. After planned outages throughout July, the system's full shutdown put engineering teams in a difficult position, especially those testing models in CI workflows and relying on BYOK configurations.

Thought: This is one of the classic examples of PaaS providers moving toward cost optimization. These proxy-style services that offer API management with almost no friction have very high compute costs behind the scenes. The biggest architectural lesson here is that we should not tightly couple LLM integrations, which are now at the heart of many systems, to a single platform's interface or authentication model. Teams should manage their own LLM gateways and build modular routing solutions that can distribute requests across different models.

### AI Spam Split GitHub's Bug Bounty Program in Two

[Source link](https://www.techradar.com/pro/security/github-restructures-bug-bounty-program-following-flood-of-ai-generated-reports)

The ability of large language models to analyze source code created a serious crisis for GitHub's security department. Thousands of low-effort and hallucinated vulnerability reports generated with AI overwhelmed the platform. In response, GitHub divided its bug bounty program into two tiers: a Public Program that requires a HackerOne track record, and a VIP Program with increased rewards. Linus Torvalds similarly noted that Linux security mailing lists had become nearly unusable because of AI-driven hunters.

Thought: We can clearly see that DoS attacks have changed form and turned into "Cognitive DoS." In the past, server resources were exhausted; now, the attention and time of cybersecurity analysts are being consumed directly. Inexperienced users who paste code into ChatGPT and generate fake vulnerability reports are creating a serious cost for defenders. DevSecOps workflows will absolutely need intermediary agents that check whether a report was written with AI before it reaches human review.

### Open Source Security: Dependabot Updates and npm Supply Chain Defense

[Source link](https://github.blog/)

GitHub published new techniques to prevent supply chain attacks on npm and GitHub Actions, especially typosquatting attempts. Immediately afterward, strategies were introduced to reduce one of developers' biggest pain points: Dependabot noise. Dependabot pull requests can now be grouped, and update frequency can be slowed down, helping projects avoid unnecessary notification overload.

Thought: Dependency management is truly the Achilles' heel of software engineering. However, waiting for PR approval for every small package update clogs CI/CD pipelines and creates "Alert Fatigue," which can lead teams to approve warnings blindly. PR grouping is a strong solution from an engineering psychology perspective; testing updates in packages should seriously reduce integration risk.

## Design Developments

### 2026 Design Tools Report: Figma's Monopoly and Conversion-Focused Interface Metrics

[Source link](https://linkupst.com/design/blog-design/top-ui-ux-agencies)

According to an independent report published in July 2026, Figma was selected as the clear market leader with a score of 9.1 out of 10, thanks to its real-time multiplayer architecture and AI that can generate wireframes in 30 seconds. Adobe XD fell into legacy status because it no longer receives updates, while Canva positioned itself for marketing teams and Sketch for macOS performance enthusiasts. Meanwhile, reports from UI/UX agencies showed that a good interface can increase conversion rates by up to 200%, while deeper UX interventions with well-designed flow and interaction logic can increase them by up to 400%. Google data also confirms that more than half of mobile users leave sites that take longer than 3 seconds to load.

Thought: Figma's success is not just about being a good drawing tool; it comes from a radical change in data structure architecture. Older software kept files in the operating system, while Figma transformed interface design into a browser-based database problem and made the URL itself the source. Interface design has evolved from artistic aesthetics into an engineering discipline backed by behavioral economics and data analytics. Reducing cognitive load is now a much more strategic decision than nudging pixels around.

## Technology News

### A Cyber-Physical Revolution in the Oceans: RIMPAC 2026 and Additive Manufacturing

[Source link](https://www.eurasiareview.com/26072026-exercise-rimpac-2026-features-uncrewed-vessels-other-emerging-technologies/)

The RIMPAC 2026 exercise showcased an impressive integration of naval operations and technology. Autonomous uncrewed surface and underwater vehicles used for intelligence and surveillance played the leading role. But the most striking development was the use of uncrewed drones to deliver 3D printers to ships, allowing critical parts to be printed directly in the middle of the ocean instead of waiting for intercontinental supply chains.

Thought: The concept of contested logistics sits exactly at the intersection of digital software and physical manufacturing. Instead of waiting for a damaged sensor to be shipped, downloading its CAD file via satellite and printing it immediately turns the supply chain entirely into data transfer. The fact that uncrewed submarines can calculate physical factors such as ocean currents, pressure, and wind in real time proves that Physical AI is moving down to the hardware level, not only simulating the world but directly commanding it.

### The Industrial Technology Arena: Physical AI Events and the Asian Market

[Source link](https://www.iiot-world.com/industrial-iot/connected-industry/july-2026-industrial-ai-events-global-conference-guide/)

Events held in July, such as the Farnborough Airshow in the United Kingdom and Asia's massive Automation Expo Mumbai, put the intersection of hardware and software on display. The most notable trend was that Physical AI became an independent category of its own through conferences such as MACHINA and AUTONOMOUS.

Thought: Physical AI is no longer only in theoretical papers; it has become a commercial product sold directly on trade show floors. Our software code now controls not just digital pixels, but steel arms and servo motors that weigh tons. We can clearly see innovation shifting out of Silicon Valley and into production lines across Asia and Europe. This growing data load in automation will also increase edge computing investment in IIoT dramatically.
