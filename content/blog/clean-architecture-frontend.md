---
title: "How to Adapt Clean Architecture to the Frontend?"
category: "General"
date: "2025-12-02"
readTime: "10 min read"
author: "Poyraz Avsever"
slug: "clean-architecture-frontend"
excerpt: "How to Adapt Clean Architecture to the Frontend? Table of Contents: Introduction, Why do we need architecture in the frontend?, Core idea of Clean Architecture, Is Clean Architecture applicable..."
coverImage: "/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/clean-architecture-frontende-nas%C4%B1l-uyarlan%C4%B1r-2db91f7e7c97"
lang: "en"
---

# How to Adapt Clean Architecture to the Frontend?

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-2.jpg)

## Table of Contents

*   Introduction
*   Why do we need architecture in the frontend?
*   Core idea of Clean Architecture
*   Is Clean Architecture applicable to the frontend?
*   Defining the layers
*   Dependency direction and abstraction logic
*   Code organization and best practices
*   Implementation with a Todo example
*   Conclusion and evaluation

## TL;DR

Clean Architecture in the frontend suggests dividing the project mentally into "UI + Application + Domain + Infrastructure". Instead of mixing domain business rules into React components, we treat UI components purely as presentation tools. We keep API calls in the infrastructure layer rather than inside components. Every layer depends only on internal layers. Although this approach might seem like excessive abstraction in small examples, it improves readability, testability, and maintainability as the project scales. In this post, we demonstrate how to split these layers with React using a simple Todo list example.

---

## Introduction

When frontend projects are small, everything seems fine; API calls happen inside components, state is stored there, and the UI is shaped right next to them. However, as the project grows, this approach rapidly descends into chaos. Business logic, presentation, and data fetching become intertwined: reading, testing, and extending the code becomes a nightmare.

This is exactly where Clean Architecture comes to the rescue. Although it is usually perceived as belonging to the backend world, it actually provides huge benefits in UI-centric projects like React (I will give examples from React since I've been working on it for a long time, but this also applies to Angular, Vue, etc.). In this post, we will explain Clean Architecture from a frontend perspective in plain language and show how it can be implemented with a simple Todo list example.

The goal is not to dwell on abstract theories, but to make our daily development experience more organized.

---

## Why Do We Need Architecture in the Frontend?

Opening a React project and quickly building components is often satisfying. We create a component, place the API fetch inside, manage state here and there, and render the UI. Initially, it's simple because the app is small. But as it grows, issues begin to mount.

For instance, think of a small Todo application. At first, we have a single list, an input, and a button. Everything can live in `App.js` and it works. Now let's add filtering, then a user authentication system, then category support, and then offline sync. App.js suddenly swells to 500 lines. All this business logic eventually makes us ask: "What was going on here?"

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-3.jpg)

The real problem is that the frontend is no longer just about rendering a user interface. **Data management, validation, business rules, user behavior, performance, accessibility, and integration with external services** are actually at the core of the product. That's why attempting to solve everything at the component level leads to a tangled mess of code as complexity grows.

Another example: using API response data directly inside components works fine on day one. But a month later, when another component needs to process the same data, we find ourselves duplicating the logic. Testing becomes difficult, isolating bugs becomes impossible, and onboarding a new team member leads to constant questions like: "Why is this logic running here?"

The purpose of architecture is to prevent this chaos. Even in small applications, dividing logic into layers makes scaling much smoother. Although it seems like extra overhead initially, you will thank yourself a year later when maintaining the same code. The value of architecture comes from preparing for "tomorrow, not today".

---

## Core Idea of Clean Architecture

Clean Architecture states: the rules at the core of the application must be independent of external influences. That is, business logic must not be affected by the UI, databases, frameworks, or technical details.

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-4.jpg)

Think of it with an analogy from a restaurant kitchen. The rules for cooking a dish remain constant: how the meat is marinated, how sauces are prepared, and cooking times. These rules do not change whether the customer is dining in, ordering takeout, or picking up from a drive-thru. How the order is received changes the delivery mechanism, but it does not change the recipe.

The core idea of Clean Architecture is similar. The "kitchen" of the application (the domain and business rules) remains fixed. It does not matter whether the user visits via web or mobile app; whether the API runs locally or on a remote server; or whether the UI framework is React or Svelte. The core rules of the application remain unchanged.

This approach rests on three key ideas:

*   Positioning dependencies pointing outward, not inward.
*   Internal layers being completely unaware of external layers.
*   **Treating technologies purely as details and changeable elements.**

Therefore, Clean Architecture splits the project into layers; creating a closed core (domain) surrounded by supporting circles. In this way, rules remain constant despite changing technologies.

At first glance, this concept might seem abstract. But its goal is simple: protect business logic, facilitate change, and establish a clear structure where everything has its designated place. The real value shines when scaling the project because there is now a definitive answer to: "Where does this code belong?"

---

## Is Clean Architecture Applicable to the Frontend?

This question is usually the first reaction because Clean Architecture is primarily discussed in backend environments. Mentioning services, domain layers, and repositories makes it sound exclusive to APIs. However, the modern frontend is no longer a simple layer that just renders HTML. It carries heavy backend-like responsibilities such as complex business workflows, offline states, caching strategies, authentication management, data synchronization, and **state persistence**.

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-5.jpg)

So the answer is: Yes, Clean Architecture is both applicable and highly beneficial in the frontend.

Interestingly, we already build frontend applications with similar ideas in mind. We split UI components, write service files, and use contexts or stores for state management. Clean Architecture simply makes this separation conscious and structured.

In React terms:

*   The UI layer naturally aligns with our component hierarchy.
*   State management stores act as the application layer.
*   Hooks and custom logics behave like use cases.
*   API fetchers represent the infrastructure layer.

So React doesn't give us a poor foundation for Clean Architecture; on the contrary, it provides a natural starting point. The only requirement is to separate these parts consciously and direct dependencies in the right direction.

The main benefit in the frontend is that the project remains controllable and testable as it grows. The UI can change, the framework can be updated, and the data source can shift. Yet, the domain and application logic remain intact. That is the beauty of it: if you decide to switch from React to another UI library tomorrow, eighty percent of your business logic will be fully portable.

---

## Defining the Layers

The most well-known aspect of Clean Architecture is the layering concept. While the word "Layer" sounds theoretical, the implementation is straightforward: determining the purpose of a piece of code and placing it in the correct location.

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-6.jpg)

In the frontend, we can map this to four main layers:

**1. UI (Presentation) Layer**  
This layer interacts with the user. React components, buttons, forms, pages, animations, and visual behaviors belong here. The sole job of this layer is to bind data to the screen and capture user inputs. Business logic must not live here. The UI layer represents "how things look," not "what things are."

**2. Application Layer**  
This layer controls application behavior. State management, use cases orchestration, validation workflows, and the logic bridging the UI and the domain reside here. It initiates tasks, triggers the domain, and feeds results back to the UI.

**3. Domain (Core) Layer**  
This is the innermost circle. Business rules, models, entity configurations, use case functions, and domain-specific validations live here. The domain must remain independent of any framework or technology. It does not fetch APIs, it does not care about the UI, it only defines how the core logic works.

**4. Infrastructure Layer**  
This is where technology details live. API requests, fetch calls, localStorage, IndexedDB, third-party integrations, and data adapters go here. This layer satisfies the domain's needs, but it doesn't dictate the domain rules. The domain trusts an abstract interface, and the concrete implementation of that interface is handled here.

By dividing code into these layers, we establish a clean mental boundary. If we see business logic creeping into a UI component, or API requests executing inside a presentation block, we know something is misplaced.

---

## Dependency Direction and Abstraction Logic

The critical rule of Clean Architecture is:  
**Internal layers must never depend on external layers. The dependency direction always flows from the outside in.**

In other words, the domain does not know about the UI, does not care about the API, and is completely oblivious to React. It only executes what it is instructed to do. This makes the domain durable and portable.

Think of a manufacturing factory. The production line is at the core. The delivery trucks outside, the marketing channels, or the color of the office walls do not change how the production line functions. The core production is independent of external factors.

How is this direction maintained?  
This is where abstraction comes in. Instead of calling APIs directly, the domain relies on an interface (a contract). The domain does not dictate "use fetch to get data," it simply states "retrieve the todos." How that retrieval happens is up to the infrastructure layer.

Through this abstraction:

*   The domain becomes highly testable.
*   API changes do not break the domain logic.
*   UI overhauls keep the core business logic untouched.
*   The project structure remains clean as it scales.

In React, this means querying data through services or adapters instead of invoking fetch directly within components. This keeps components focused on UI, and the domain framework-agnostic.

---

## Code Organization and Best Practices

When applying Clean Architecture to the frontend, our first point of contact is usually the folder structure. A file structure alone does not guarantee good architecture, but it helps guide our thinking.

Let's look at a simplified directory outline:

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-8.jpg)

The goal is to make the intent of each file clear:

*   `domain/todo` handles only todo business rules. It answers questions like: "What is a todo, what fields does it have, and which states are valid?"
*   `application/todo` contains hooks or services that connect the domain and the UI.
*   `infrastructure/todo` holds the adapters to connect to APIs, localStorage, or other data stores.
*   `ui` remains purely dedicated to React components.

An important best practice here is:  
**Group files by feature and meaning, not by technical types.**

Instead of horizontal boundaries like `components`, `hooks`, and `services` in the root folder, a feature-focused and layer-conscious directory scales much better.

Secondly, keep components focused. A common mistake in React is managing UI, fetching, and domain decisions inside a single component. Instead:

*   UI component: Dumb presentation components that only receive props.
*   Container / Page component: Connects application hooks to pass data down.
*   Hook / Service: Manages logic independent of the UI representation.

For example, this workflow is very healthy:

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-9.jpg)

Here, `useTodoList` talks to the domain and infrastructure, not to the UI. As a result:

*   We can test the domain without mounting React.
*   We can reuse the todo logic in a different UI framework (e.g. mobile).
*   Refactoring is simplified since the boundaries of logic are clear.

Finally, only add abstractions when you actually need them. Instead of opening 10 layers for a tiny project, expand the structure naturally as complexity grows. The goal is to build an understandable and maintainable structure, not just follow a cookbook directory layout.

---

## Implementation with a Todo Example

Let's see this in action by splitting a simple Todo app into layers:

Folder structure:

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-10.jpg)

### 1) Domain: Todo Model and Rules

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-11.jpg)

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-12.jpg)

The domain is completely decoupled: no React imports, no localStorage, no fetch calls.

### 2) Infrastructure: LocalStorage Implementation

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-13.jpg)

Here, the only link to the domain is the `TodoRepository` interface. LocalStorage is treated purely as a detail.

### 3) Application: useTodoList Hook

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-14.jpg)

This hook accepts requests from the UI, triggers domain functions (`createTodo`, `toggleTodo`), and updates the infrastructure data source (`todoRepository`).

### 4) UI: Page and View Components

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-15.jpg)

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-16.jpg)

Here, `TodoListPage` acts as the container talking to the application layer, and `TodoListView` acts as the pure UI component. If we want to replace localStorage with a real backend API tomorrow, we only change the `TodoRepository` implementation inside the infrastructure layer. The UI and Domain remain completely unchanged!

---

## Conclusion and Evaluation

![](/blog/images/clean-architecture-frontende-nas-l-uyarlan-r-img-17.jpg)

Adapting Clean Architecture to the frontend might seem like over-engineering at first, especially for small applications. However, it is not about folders or layer names; it is about building a disciplined mental habit. By separating business logic from the UI, treating data access as a detail, and orchestrating behavior in the application layer, we build codebase architectures that are easy to read, test, and scale. The return on investment becomes clear as the code evolves.
