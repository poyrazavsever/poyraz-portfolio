---
title: "Software with Poyraz #3106092026"
category: "Newsletter"
date: "2026-09-06"
readTime: "18 min read"
author: "Poyraz Avsever"
slug: "software-with-poyraz-3106092026"
excerpt: "This week, we cover new Claude, Gemini, and GPT releases, agent-driven software tools, generative design, open source, and space technology."
coverImage: "/blog/images/poyraz-ile-yazilima-dair-3106092026-cover.webp"
lang: "en"
---

# Software with Poyraz #3106092026

Hello,

Welcome to a new issue of Software with Poyraz, covering the week of August 31–September 6, 2026.

This week, AI models did not merely become more powerful. Software development, design, security, and even the hardware expectations for our computers began changing at the same time. Let us take a closer look at the developments that genuinely stood out.

## Artificial Intelligence Developments

### Anthropic Released One Model with Two Security Layers: Claude Fable 5.1 and Mythos 5.1

**Sources:** [Primary source — Anthropic announcement](https://www.anthropic.com/claude-fable-and-mythos-5-1), [Secondary source — VentureBeat](https://venturebeat.com/technology/anthropics-claude-fable-5-1-and-mythos-5-1-arrive-with-a-75-cost-reduction-for-fable-cache-reads)

Anthropic released Claude Fable 5.1 and Claude Mythos 5.1, two versions of the same underlying model with different security profiles. Fable 5.1 is generally available, while Mythos 5.1 is restricted to verified people and organizations working with more sensitive capabilities in cybersecurity and life sciences. Fable can help find vulnerabilities but will not develop exploit code; Mythos offers more flexible, controlled access programs for defensive and scientific research.

The major economic change is a reduction in cached input pricing from $1 to $0.25 per million tokens. Standard API pricing remains $10 per million input tokens and $50 per million output tokens. Anthropic says the cache discount can reduce total costs by roughly 25 percent for typical work and up to 45 percent for agent-heavy workloads. The company also announced Enterprise Frontier Safeguards, an architecture that keeps customer data in the customer's cloud. It reported scores of 52.6 percent on Terminal-Bench Science 0.1 and 55.8 and 60.9 percent on Terminal-Bench 4.0 for Fable and Mythos respectively. These are vendor-reported measurements, not independent proof of superiority.

**Why it matters**

Long-running coding and research agents repeatedly read the same context, so cache pricing may matter more than the headline token price. Separating a general model from one with sensitive capabilities also signals a move away from giving every user identical access toward tiered access based on risk.

**My take:**

Two things matter more than the model scores here: the real cost of long-running agents and who is allowed to access dangerous capabilities. The cache discount makes agents more economical, while Mythos acknowledges that powerful capabilities cannot be offered to everyone through the same door. We will only learn how well the safety layer works through independent findings over time. This is not simply a smarter Claude; it is an experiment in different deployment models for different levels of risk.

### Gemini 3.8 Flash Became More Capable for Agents, While Flash Cyber Was Reserved for Defenders

**Sources:** [Primary source — Google announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/), [Secondary source — The Verge](https://www.theverge.com/ai-artificial-intelligence/988742/google-gemini-3-8-flash)

Google announced Gemini 3.8 Flash, its third Flash release in six weeks, and Gemini 3.8 Flash Cyber, which adapts the same underlying intelligence for cybersecurity. The standard version focuses on software engineering, multi-step reasoning, and agent tasks. Promotional pricing through December 31 is $0.75 per million input tokens and $3.75 per million output tokens; on January 1, 2027, those prices are scheduled to rise to $1.50 and $7.50.

In Google's published results, Gemini 3.8 Flash reaches 73.8 percent on DeepSWE. Flash Cyber is tuned for vulnerability discovery and automated patching. Google reports more than 70 percent success in its language-diversity test, 47.2 percent pass@1 on CWE-Bench, and 2.6 times more correct results on Chrome patches than its previous system. These are also vendor measurements. The Cyber model is restricted through the Fairwind Program to trusted public institutions, critical-infrastructure operators, and software maintainers, while the standard model is available through the Gemini API, AI Studio, Android Studio, and other Google products.

**Why it matters**

The Flash class no longer means only a small model that answers quickly and cheaply. Long agent loops and serious coding tasks are moving into this category, allowing developers to build broader automation without paying for a top-tier model at every step. Restricting the cyber version also shows that access will increasingly vary by identity and intended use as model capability grows.

**My take:**

Three Flash releases in six weeks suggest that the model race is shifting from annual launches to continuous optimization. A low unit price does not automatically mean a cheap task, however; an agent that reasons longer and calls more tools can still cost more overall. Controlled access for Flash Cyber is sensible, but independent case studies will determine whether defenders truly benefit. I would compare cost per completed task, latency, and error-correction rate before benchmark scores.

### GPT-6 Astra Crossed the “Critical” Cyber-Risk Threshold Alongside a Major Capability Jump

**Sources:** [Primary source — OpenAI launch](https://openai.com/index/gpt-6-astra/), [Primary safety source — OpenAI](https://openai.com/index/safety-overview-gpt-6-astra/), [Secondary source — Reuters](https://www.reuters.com/legal/litigation/openai-launches-new-astra-model-amid-growing-scrutiny-over-agents-safety-2026-09-03/)

OpenAI announced GPT-6 Astra as its new top-tier model for computer use, browsing, software engineering, professional workflows, and scientific tasks. It opened to a limited set of organizations on day one, with a gradual rollout to Plus, Pro, Business, and Enterprise users, as well as access through the OpenAI API, Microsoft Azure, and AWS Bedrock. Standard API pricing is $10 per million input tokens and $50 per million output tokens. OpenAI reports 57.9 percent on Terminal-Bench 4.0, 74.1 percent on DeepSWE, 99.9 percent on ARC-AGI-3, and 100 percent on ExploitBench; these figures should be read as vendor-reported results.

The critical part of the launch is safety. OpenAI says Astra is the first broadly deployed model to reach the “Critical” cyber-capability level under its Preparedness Framework. With suitable tools and access, it can discover previously unknown vulnerabilities and develop exploitation methods without a human directing every step. The company added tighter isolation, encrypted model checkpoints, and monitoring of all agent routes. At the same time, its system-card tests acknowledge that the model's written reasoning is harder to monitor than its predecessor's. Capability is rising while observability remains unresolved.

**Why it matters**

This marks a general-purpose model moving beyond code suggestions into finding vulnerabilities and acting through tools in real systems. It could accelerate defensive patching and review, but the same capability could reduce attackers' costs. Authorization, logging, approval, and emergency-stop mechanisms now need to be part of product architecture alongside model quality.

**My take:**

Reading this as “AGI has arrived” is too simplistic. Saturated benchmarks do not remove real-world judgment, reliability, or accountability problems. The meaningful threshold is not how much work a model can do at a computer, but how early it can be stopped when it heads toward the wrong target. OpenAI's disclosure of both higher capability and reduced observability is important. Agent evaluations should now report permission overruns and reversibility alongside success rates.

## Software Developments

### VS Code 1.136 Lets an Agent Prepare a Pull Request for Merging

**Sources:** [Primary source — VS Code 1.136 release notes](https://code.visualstudio.com/updates/v1_136), [Secondary source — InfoWorld](https://www.infoworld.com/article/4218856/visual-studio-code-1-136-introduces-agent-merges-for-pull-requests.html)

Microsoft introduced Agent Merge as a preview in Visual Studio Code 1.136. It addresses review feedback on a pull request, attempts to fix failed checks and merge conflicts, reruns workflows, and continues the loop until the PR is ready to merge. It can be enabled with `chat.agentMerge.enabled` and currently starts from a session in the Agents window.

The release also adds experimental support for Copilot and Claude agent sessions in multi-root workspaces. Related chats appear hierarchically, users can see each session's status and pending approvals, and notifications arrive when an agent responds or needs a decision. Enterprise users can keep dictation on-device. The integrated browser gained spelling suggestions, and a bug causing a five-second terminal delay for some extension commands was fixed.

**Why it matters**

Coding agents are moving beyond writing files in an editor and into the review, CI, and pre-merge maintenance loop. That can reduce repetitive work without removing human responsibility for accepting a PR. Since the feature is in preview and multi-root support is experimental, large repositories should pilot it carefully.

**My take:**

Agent Merge is more interesting than code generation because the final 20 percent of fixes often consumes more team time than the initial implementation. Still, “the checks passed” and “the change is correct” are not the same thing; human review must preserve business rules and architectural intent. This will be valuable in repositories with strong tests and may simply hide mistakes faster in projects with weak tests. Repository discipline will matter as much as agent quality.

### GitHub Actions Exposed Runner Lifetimes and Reusable Workflow Identity

**Sources:** [Primary source — GitHub Changelog](https://github.blog/changelog/2026-09-03-github-actions-early-september-2026-updates/), [Secondary source — GitHub Actions context documentation](https://docs.github.com/en/actions/reference/workflows-and-actions/contexts)

A new GitHub Actions REST API reports when a particular runner version will stop accepting new registrations and lose execution support. Available at repository, organization, or enterprise level, the `GET /actions/runners/deprecations/{version}` endpoint returns the version plus end dates for runtime and registration. Teams operating self-hosted runners can therefore schedule upgrades before a version is abruptly disabled.

The update also adds a `vulnerability-alerts` permission for `GITHUB_TOKEN`, accepting only `read` and `none`, so workflows can read Dependabot alerts without broader access. Reusable workflows can identify themselves through `job.workflow_ref`, `job.workflow_sha`, `job.workflow_repository`, and `job.workflow_file_path`. Unlike some `github.*` fields that describe the caller, these values identify the workflow that actually defines the job. The features are not yet available in GitHub Enterprise Server.

**Why it matters**

These small changes address two central enterprise CI/CD problems: predictable maintenance and least privilege. A machine-readable runner lifecycle enables automated warnings; a dedicated permission reduces unnecessarily broad token access. Clear workflow identity improves traceability and policy enforcement for centralized CI templates.

**My take:**

Updates like these are less glamorous than agent features but often last longer in production. Learning a runner's end-of-life date from an API means planned maintenance instead of a broken pipeline at midnight. The new permission is also a welcome challenge to the “open everything for convenience” habit. Clear source identity can significantly simplify audit records for large teams using reusable workflows.

### npm's Tokenless Publishing Now Supports Multiple CI Workflows

**Sources:** [Primary source — GitHub/npm changelog](https://github.blog/changelog/2026-09-03-multiple-trusted-publishing-configurations-for-npm/), [Secondary source — npm documentation](https://docs.npmjs.com/trusted-publishers/)

npm packages can now have multiple trusted-publisher configurations. This OIDC-based method lets a CI/CD system publish with a short-lived, signed identity token, removing the need to store long-lived npm tokens as secrets. Stable releases, prereleases, and staging can each use separate repository, workflow, or environment combinations; the documentation allows up to ten connections for one package.

The update also prevents staged packages from being approved before malware scanning finishes and adds a history of approved, rejected, and pending states to the package's Versions tab. Staging is the default for every configuration, while direct `npm publish` must be enabled separately. GitHub recommends staging because it adds human approval and limits the impact of a compromised workflow. Self-hosted runners are not yet supported.

**Why it matters**

Long-lived publishing tokens are prime targets in software supply-chain attacks. Multiple OIDC identities allow maintainers with monorepos, multiple CI providers, or separate release channels to keep the secure approach without breaking real workflows. Connecting malware scanning and human approval to the same flow can also contain a single CI compromise.

**My take:**

Users may never see this feature directly, but it could be one of the week's most valuable security improvements for the JavaScript ecosystem. When a secure method does not fit the real workflow, teams eventually reach for workarounds or permanent tokens; multiple configurations remove that excuse. My preference would be OIDC combined with stage-only publishing and two-step human approval. Teams should still test the migration with a disposable package and keep detailed audit logs because repository or workflow identities can be misconfigured.

## Design Developments

### Google Pics Adds a Collaborative AI Visual Studio to Workspace

**Sources:** [Primary source — Google announcement](https://blog.google/products-and-platforms/products/workspace/google-pics/), [Secondary source — The Verge](https://www.theverge.com/tech/987423/google-pics-ai-image-editor-generator)

Google announced Google Pics, built on the Nano Banana image-generation and editing model. It works both as a standalone product and as part of Workspace. Users can generate images from text, replace an object without changing the rest of the composition, edit or translate text inside an image, and create multiple alternatives from one prompt.

Pics distinguishes itself through collaboration and integration with existing document workflows. Teams can share and co-edit an image. Docs and Slides integrations launched with the announcement, while Drive integration is planned for the following weeks. The product is rolling out gradually to Google AI Pro and Ultra subscribers and most Workspace business customers. Google's Workspace announcement also includes cropping for social, web, and print formats and 2K and 4K upscaling.

**Why it matters**

Visual-production tasks associated with tools such as Canva and Adobe Express are moving into the environment people already use for documents and presentations. Creators may spend less time transferring files between applications and requesting small revisions. Design teams, meanwhile, need stronger checks for brand consistency, licensing, AI-generated errors, and final quality.

**My take:**

Google Pics' real strength is not merely a new image model; it is distribution inside Docs and Slides, where people already work. A tool that reaches millions through that advantage can challenge more capable but isolated competitors. Clean object selection and text replacement still do not make an entire design—hierarchy, message, and brand language require judgment. I would position it as a fast variation and production tool, not a replacement for designers.

### Figma Turned Generative Plugins and Shaders into Shareable, Exportable Code

**Sources:** [Primary source — Figma Blog](https://www.figma.com/blog/how-we-built-generative-plugins-and-shaders/), [Secondary source — Figma product update](https://forum.figma.com/product-updates-3/updates-to-generative-plugins-and-shaders-57397)

Figma expanded the prompt-driven plugin and shader creation feature introduced at Config 2026. Users can publish their plugins and shaders to Figma Community, while Organization and Enterprise plans support private internal sharing. Shaders can respond to time and pointer movement with animation and interaction, and generated code can be viewed and downloaded from Figma.

The shader system uses WebGPU, with user scripts running in separate sandboxes. Third-party agents can inspect and modify these generative tools through the Figma MCP server. When a shader-enabled frame is transferred to an external agent, the goal is to reproduce the effect correctly in React code; HTML and React exports are also available. Figma's design agent is in open beta for Full-seat users and will begin consuming AI credits within a few weeks.

**Why it matters**

This shifts the design file from a static handoff document toward a production surface containing executable visual logic and code. Designers can create small tools for their needs, while developers receive more than a screenshot of an effect. Handoff loss may decrease, although generated WebGPU and React code still requires performance, accessibility, and maintainability review.

**My take:**

This feels more mature than simply “generating design with AI” because the output is reusable, inspectable, and shareable. Code access matters: without it, a generative design tool quickly becomes a closed magic box. Giving everyone the power to generate effects does not automatically create good visual decisions, however. The strongest use case will be sharing design-system-aware micro-tools internally and giving developers an implementable counterpart.

## Technology News

### NVIDIA Agreed to Acquire Hugging Face for $12.93 Billion

**Sources:** [Primary source — NVIDIA announcement](https://blogs.nvidia.com/blog/nvidia-to-acquire-hugging-face/), [Secondary source — Reuters](https://www.reuters.com/business/nvidia-buy-hugging-face-nearly-13-billion-big-bet-open-ai-models-2026-09-03/)

NVIDIA formally announced an agreement to acquire Hugging Face for $12.9303 billion. Reuters reports that $11.9 billion is intended for shareholders and roughly $1 billion for employee-retention equity incentives. This is an agreement, not a completed acquisition, and still has to close. NVIDIA says the platform will remain open, multi-cloud, and compatible with multiple accelerators, and that NVIDIA hardware will not be required to use Hugging Face.

According to company figures, Hugging Face has more than 18 million developers, three million models, 500,000 datasets, and one million applications. The acquisition would therefore give NVIDIA control not just of a model company, but of a discovery and distribution layer for the open-weight AI ecosystem. The central concern reported by Reuters is whether NVIDIA infrastructure could gradually receive preferential treatment over competing hardware. Earlier acquisition reports existed, but the official agreement announced on September 3 makes this the week's confirmed development.

**Why it matters**

NVIDIA is moving beyond supplying GPUs and networking into owning a developer platform where models are found, evaluated, and deployed. The open-model ecosystem could gain stronger infrastructure and investment, while raising questions about neutrality, governance, and one company controlling too many layers of the stack. Developers should watch whether freedom of model and hardware choice is preserved in practice.

**My take:**

This is the week's biggest strategic story. NVIDIA no longer wants only to sell the picks; it wants to manage the entrance to the mine. The promise that Hugging Face will remain open matters, but the real test is equal integration and visibility for AMD and other accelerators. More resources are good news for open source, while concentrated decision-making is a serious risk. I will be watching recommendation algorithms, default inference options, and platform governance more closely than licenses.

### Microsoft Is Creating a “Ready-to-Code PC” Category with Project Zenith

**Sources:** [Primary source — Microsoft Windows Developer Blog](https://blogs.windows.com/windowsdeveloper/2026/09/04/announcing-project-zenith-the-ready-to-code-windows-experience/), [Secondary source — The Verge](https://www.theverge.com/news/990051/microsoft-project-zenith-windows-developers)

Microsoft introduced Project Zenith as a preconfigured, distraction-reduced Windows experience for developer-class devices. It is not a new Windows edition or separate operating system. Initial requirements include at least 64 GB of unified memory and more than 250 GB/s of memory bandwidth. The first devices will use AMD Ryzen AI Halo, with more OEM and chip partners expected later.

Windows Terminal and Visual Studio Code are pinned to the taskbar; development languages, runtimes, source control, and productivity tools are preinstalled. File extensions, hidden files, and full paths are visible by default, long-path support is enabled, and several recommendations and account notifications are disabled. Microsoft says this hardware class can run models with more than 30 billion parameters locally without consuming metered cloud tokens. Windows investments in WSL, containers, and agent isolation are also part of the environment.

**Why it matters**

Local AI development is no longer only about a powerful GPU. Unified-memory capacity, bandwidth, preinstalled tools, and operating-system security boundaries are being productized together. Setup time may shrink, and some coding models can run without sending data to the cloud. The 64 GB and 250 GB/s thresholds show that the experience will initially be limited to high-end, expensive devices.

**My take:**

Project Zenith feels like the 2026 version of a developer edition, except local agents now sit at the center instead of the terminal. Good defaults help, but developers must still be able to build their own environments; a strong starting profile should not become a closed workflow. The hardware threshold makes clear that local AI is still aimed at professional workstations. If prices fall, we will need to recalculate the tradeoff between cloud tokens and hardware investment.

### Isar Aerospace Commercially Delivered Satellites to Orbit from Continental Europe

**Sources:** [Primary source — Isar Aerospace mission updates](https://www.isaraerospace.com/mission-updates-overview), [Secondary source — Reuters](https://www.reuters.com/business/media-telecom/german-space-rocket-lifts-off-norway-base-2026-09-05/), [Institutional verification — ESA](https://www.esa.int/Enabling_Support/Space_Transportation/Boost/Spectrum_s_qualifying_second_launch)

German space startup Isar Aerospace launched its Spectrum rocket from Norway's Andøya Spaceport at 22:12 CEST on September 5 and reached orbit. The company's second flight, called “Onward and Upward,” carried five CubeSats and one technology experiment. Main-engine cutoff, stage separation, second-stage ignition, crossing the 100-kilometer Kármán line, orbital circularization, and payload separation were completed. The company says it is continuing to verify the satellites' final status with customers.

Isar calls it the first time a European commercial space company has delivered satellites to orbit from continental Europe; Reuters likewise described it as the first commercial orbital launch from continental Europe. The two-stage, 28-meter Spectrum is designed to carry up to 1,000 kilograms to low Earth orbit. Rockets three through seven are in production, and a new 40,000-square-meter facility targets capacity for up to 40 vehicles per year. That is a manufacturing target, not an achieved launch cadence.

**Why it matters**

Europe's dependence on external providers, especially US systems, for small-satellite launches has long been a strategic concern. Spectrum's orbital success creates a new European option for commercial, scientific, and public missions. One successful flight does not establish a sustainable service, but it shows that a new generation of European rocket companies can cross the technical threshold.

**My take:**

Reaching orbit on the second flight is a strong engineering signal. I would not immediately turn one success into “Europe's SpaceX has arrived,” however; repeatability, cost, and on-time delivery are the real tests. The target of 40 vehicles per year is ambitious and should not be confused with current capacity. This flight's value is that it moves independent European access one step closer from theory to a working system.

## Open-Source Project of the Week

### TrustTunnel v1.2 Made an Obfuscated, Self-Hostable VPN Easier to Use on macOS

**Sources:** [Primary source — GitHub v1.2.0 release](https://github.com/TrustTunnel/TrustTunnelFlutterClient/releases/tag/v1.2.0), [Project repository — GitHub](https://github.com/TrustTunnel/TrustTunnel), [Secondary source — TechRadar](https://www.techradar.com/vpn/vpn-services/adguard-makes-its-open-source-stealth-vpn-protocol-native-to-macos-with-one-click-setup)

TrustTunnel is an open-source VPN protocol developed by AdGuard and published under the Apache 2.0 license. It attempts to make traffic harder to distinguish through deep packet inspection by resembling normal HTTPS over HTTP/2 or QUIC/HTTP/3. It supports TCP, UDP, and ICMP tunneling; a system-wide TUN interface; SOCKS5 proxying; split tunneling; and custom upstream DNS. Users can operate an endpoint on their own VPS, cloud account, or suitable home server.

The project did not become open source this week. The specific development was version 1.2.0, released on August 31. It turned TrustTunnel into a native macOS application installable from the Mac App Store, with a menu-bar indicator, launch-at-login, and automatic connection. Log export arrived on every platform, and “Query log” was renamed to the clearer “Connection log.” The update makes a setup that previously required the command line accessible to a broader macOS audience.

**Why it matters**

TrustTunnel is both an inspectable Rust project for developers interested in network protocols and a practical self-hosting option. Its strategy of resembling standard HTTPS is technically notable on networks that block VPN traffic. Open source does not automatically mean secure, independently audited, or legal in every jurisdiction, however; server security and correct configuration remain the user's responsibility.

**My take:**

I chose this project not simply because it is a VPN, but because it turns a difficult protocol into an everyday product. Installation friction is often a bigger barrier than technical quality in open-source projects, and version 1.2 addresses exactly that. I would first deploy it on a test server and measure DNS leaks, kill-switch behavior, and connection failures. The combination of a censorship-resistant protocol, self-hosting, and inspectable code still makes TrustTunnel worth following.

## The Week in Review

The common theme this week is AI leaving the “model that answers questions” stage and spreading across the entire production chain. With Claude, Gemini, and GPT, the discussion is no longer limited to intelligence scores; cache cost, long agent loops, cyber permissions, human approval, and observability now matter just as much. VS Code assigning PR fixes to an agent, Figma turning generated effects into code, and Microsoft defining a PC class for models above 30 billion parameters are different faces of the same shift.

My focus will be control rather than speed. As an agent runs longer and gains access to more tools, good tests, narrow permissions, logging, and reversible operations become inseparable from product quality. The NVIDIA–Hugging Face agreement reveals the economic side of the same transformation: the competition is not only to build the best model, but to control the platform where it is found, the hardware where it runs, and the developer's daily workflow.
