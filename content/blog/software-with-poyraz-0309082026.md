---
title: "Software with Poyraz #0309082026"
category: "Newsletter"
date: "2026-08-09"
readTime: "7 min read"
author: "Poyraz Avsever"
slug: "software-with-poyraz-0309082026"
excerpt: "This week, we have a packed agenda, from AI cost competition and DeepMind's leadership shift to the 100x developer debate, Figma's file architecture updates, and changing power dynamics in tech."
coverImage: "/blog/images/poyraz-ile-yazilima-dair-0309082026-cover.webp"
lang: "en"
---

# Software with Poyraz #0309082026

Hello from the week of August 3-9, 2026 :)

One common theme stands out in this week's technology agenda: as scale grows, costs, organizations, and power balances are being reshaped.

Chinese AI labs pushed pricing boundaries lower while Google DeepMind went through a historic leadership change. The software world debated the idea of the "100x developer" while security teams dealt with critical network vulnerabilities.

Figma changed its file architecture, tech layoffs passed last year's total before the year ended, and one of the biggest brands in the gaming industry changed hands through a 55 billion dollar transaction.

Let's look at the week's most important developments and what they tell us.

## Artificial Intelligence Developments

### Chinese AI Labs Push on Price and Performance

Source: Pakistan Today - Qwen3.8-Max and DeepSeek V4-Flash | Alibaba Cloud

Alibaba introduced Qwen3.8-Max, a 2.4 trillion parameter model. The model uses a Mixture of Experts architecture and activates only 95 billion of its total parameters for each request.

It is also reported to have a one million token context window and to have worked autonomously for 16 days on an internal software project.

Around the same period, DeepSeek announced V4-Flash pricing at 0.14 dollars per million input tokens and 0.28 dollars per million output tokens. According to reporting based on Artificial Analysis data, that price can be as low as one percent of some American competitors' costs.

The biggest shift in the AI race is no longer only about asking, "Who built the strongest model?" The question of who can offer the same reasoning capacity more cheaply is becoming just as decisive.

Lower model usage costs will open space for processing large document collections, running long-lived software agents, and building product ideas that previously did not make economic sense. But cheap tokens alone are not enough. Reliability, evaluation systems, data security, and model governance will become the new competitive fronts.

### A Historic Leadership Change at Google DeepMind

Source: The Guardian - Google DeepMind leadership change

Demis Hassabis, DeepMind's founder and CEO of 16 years, stepped away from daily operational responsibilities and moved into the roles of DeepMind Chair and Alphabet Chief Scientist. Operational leadership was handed over to CTO Koray Kavukcuoglu.

During the same period, longtime Google engineers Jeff Dean and Sanjay Ghemawat left the company to start a new venture called Discovery Loop, focused on machine learning, science, and engineering. Alphabet shares closed the day of the announcement down 4 percent.

Reading this only as a case of "brain drain" would be incomplete. Alphabet may be separating scientific vision from the operational needs of large-scale products such as Gemini by placing them into different leadership layers.

Still, the departure of names like Jeff Dean and Sanjay Ghemawat is an important signal. In the AI era, the biggest competitors of large companies will not only be other technology giants; they will also be the small, fast, research-focused teams that can emerge from within.

## Software Developments

### The Myth of the "100x Developer" in the AI Era

Source: Stack Overflow - Explorers, exploiters, and the myth of the 100x engineer

Stack Overflow's analysis describes developers who adopt AI tools early and achieve unusual productivity gains as "explorers." Most teams, however, prefer to use workflows that have already been tested and made reliable instead of discovering new methods themselves.

The core idea is that people seen as "100x developers" are not fundamentally different by birth. Curiosity, willingness to adapt, and freedom to experiment become more visible with AI. The job of leaders is not to find a few exceptional employees, but to turn their discoveries into methods the whole team can use.

The era in which code production speed alone was treated as a success metric is ending. A developer writing one hundred times more code does not mean the team is producing one hundred times more value.

The real issue is whether the code being produced is tested, secured, and shipped sustainably. The strongest engineering organizations of the future will not be the ones dependent on a few "super developers"; they will be the ones that can turn explorers' lessons into standards, evaluation systems, and automated quality gates.

### Cisco Releases a Critical IOS XE Security Update

Source: Cisco Security Advisory - IOS XE Security Hardening Release

Cisco released a critical security hardening update that fixes seven vulnerabilities found through internal testing in IOS XE software. The flaws include CVE-2026-20272, a vulnerability with a CVSS score of 9.8 that could allow unauthorized command execution.

Cisco says it has not found evidence that the vulnerabilities are being actively exploited. However, there is no workaround for the flaws; affected systems need to be moved to fixed software releases.

The habit of saying "let's leave the update for the next maintenance window" is becoming increasingly dangerous for critical infrastructure. Especially in devices at the center of the network, such as routers and switches, a single delay can affect the attack surface of an entire organization.

Patch management should no longer be an operation manually tracked only by IT teams. Inventory discovery, version control, risk prioritization, and staged rollout processes need to be automated as much as possible.

### Your MVP May Not Need a Kubernetes Cluster

Source: Stack Overflow - Your MVP doesn't need a Kubernetes cluster

In a Stack Overflow Podcast episode featuring Render CEO Anurag Goel, the discussion focused on why early-stage startups should not begin by managing Kubernetes and complex cloud infrastructure.

The message is quite clear: if a startup has not yet found product-market fit, spending limited engineering capacity on infrastructure management can slow down the actual product. Managed services offer a faster and more economical starting point for most MVPs.

One of the most expensive habits in software is trying to solve scale problems that do not exist yet. Designing a microservice architecture for millions of users when the product does not yet have one hundred users is often not technical preparation; it is delayed product development.

At the beginning, a simple application, a managed database, and a reliable deployment pipeline may be enough. Kubernetes is not a badge of success. It is a powerful but costly answer to needs that appear at a certain scale.

## Design Developments

### Figma Reorganizes File Architecture and AI Spending

Source: Figma - File management updates | Figma - Manage AI credits

As of August 3, Figma started renaming "Projects" to "Folders." On paid plans, folders can now be nested up to ten levels deep. Folder permissions are also being simplified so they can either inherit from the parent folder or be restricted to specific people.

The platform also gives administrators the ability to manage employees' access to paid AI credits. Admins can set full access, custom monthly limits, or disable access per user; they can also review credit requests and track usage amounts.

When these two updates are read together, the current direction of design tools becomes clearer. Enterprise design files are no longer simple visual documents; they increasingly resemble large software repositories with permissions, hierarchy, and dependencies.

Managing AI credits per user also shows that an "AI FinOps" mindset is entering design workflows. Teams will soon debate not only which design is better, but also which AI operation is worth its cost.

### AI Drift in Design Systems: Taking AI Out of the Loop at the Right Time

Source: TJ Pitre - Use AI to Need Less AI

An analysis by TJ Pitre, also highlighted in Smashing Magazine's weekly selection, focuses on the problem of "drift" created when AI interprets design systems. In this context, drift means the gap that can emerge between design and code.

The article argues that instead of leaving every check to AI again, design rules should be turned into machine-readable contracts. Color tokens, component properties, and allowed variants should be enforced by deterministic systems rather than reinterpreted by a model every time.

AI is strong at generating creative options, but it is still fragile in areas where the same rule must be followed exactly every time. In products that depend on pixel-level precision, even a small deviation can spread inconsistency across the whole component system.

The future role of designers will not only be writing good prompts. Deciding which decisions can be left to AI and which must be protected by fixed system rules will become a much more valuable skill.

## Technology News

### 2026 Tech Layoffs Have Already Passed Last Year's Total

Source: Fast Company - Tech layoffs August 2026 update

In the first week of August, Zillow announced layoffs affecting more than 500 people, TikTok 250, Etsy around 220, and Google 52.

According to Layoffs.fyi data, technology sector job losses in 2026 reached 125,759 as of August 6. That means the 122,606 total recorded across all of 2025 has already been passed before the end of the year.

Reading this only as "AI is taking people's jobs" is too simple. I think the bigger change is that company capital is being redirected. As organizations allocate billions of dollars to data centers, GPUs, and AI infrastructure, they are questioning operating expenses more aggressively.

This does not mean AI has nothing to do with job losses. The effect does not always appear as one employee being directly replaced by one model; investment budgets shifting from human labor to infrastructure is also part of the same transformation.

### A Saudi-Led Consortium Buys EA for 55 Billion Dollars

Source: SEPE - Saudi-led group completes $55bn purchase of EA

A consortium led by Saudi Arabia's Public Investment Fund completed the 55 billion dollar acquisition of Electronic Arts. The company behind brands such as The Sims, Battlefield, and EA Sports FC was taken private as a result of the transaction.

The acquisition is a leveraged deal that places a significant amount of debt on EA's balance sheet.

The gaming industry is no longer only a market that produces entertainment. It is a strategic power area that provides access to global culture, young audiences, and digital distribution channels.

Saudi Arabia's investments in gaming under Vision 2030 can be read not only as part of the transition away from an oil-based economy, but also as a long-term cultural influence strategy. The critical question from here is how the new ownership structure will affect EA's creative decisions and global brands.

### Defense Technology Cooperation Between Turkey, Saudi Arabia, and Pakistan

Source: ShiftDelete.Net - Mecca Agreement

Turkey, Saudi Arabia, and Pakistan signed a trilateral defense agreement in Mecca on August 7. In addition to treating an armed attack against one party as an attack against all parties, the agreement aims to develop shared defense technologies and enable military interoperability.

This level of integration is expected to require technical infrastructure such as common data link standards, compatible command-and-control software, and identification friend or foe systems. The localization of AKINCI in Saudi Arabia and the previously discussed joint investment option for KAAN also strengthen the technological foundation of the cooperation.

Modern defense alliances are built not only through signed documents, but also through software protocols. If two armies can securely share the same data and see the same operational picture, that can create a more lasting bond than political statements.

But interoperability also creates technological dependency. That is why who defines the standards, where the data is stored, and who owns the critical software will be at least as important as joint production.

## Open Source Radar of the Week

### Qwen3.8-27B: A New Candidate for Local AI

Source: LOG - Qwen3.8-Max and Qwen3.8-27B | Alibaba Cloud

Alibaba announced that, alongside Qwen3.8-Max, it will also publish the weights of the smaller Qwen3.8-27B model openly. The models are expected to be shared through Hugging Face and ModelScope.

There is an important detail here: as of August 9, Qwen3.8-27B is not yet available for download; the open weights are expected to be released the following week. Before the license terms are finalized, it is more accurate to describe the model as "open-weight" rather than fully "open source" in the technical sense.

The ability to run a strong model in the 27 billion parameter class inside a company or on local hardware creates serious value for data privacy, cost control, and provider independence.

With closed APIs, pricing, usage policy, or access conditions can change unilaterally. Open weights allow teams to evaluate and customize the model on their own infrastructure. Still, the model's real value will only become clear after release, once its license, hardware requirements, and independent benchmark results are visible.

## This Week's Bigger Picture

This week's news points to three major shifts.

First, AI capacity is getting cheaper quickly. Competition is no longer moving only through model quality, but also through usage cost and accessibility.

Second, software and design teams are seeing a power shift from production to verification. As producing code or interfaces becomes easier, reliability, testing, standards, and governance become more valuable.

Third, technology is increasingly becoming a geopolitical asset. From AI models to gaming companies, from data links to design tools, technological infrastructure sits at the center of economic and political power.

Which development do you think was the most important one this week?
