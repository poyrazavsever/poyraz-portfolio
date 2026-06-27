---
title: "What is Docker? — Grab a Coffee, Let's Talk Docker."
category: "General"
date: "2025-07-03"
readTime: "4 min read"
author: "Poyraz Avsever"
slug: "what-is-docker"
excerpt: "What is Docker? — Grab a Coffee, Let's Talk Docker. Let's have a chat: in the software development world, things can get a bit messy. An application that works in one place might not work in another..."
coverImage: "/blog/images/docker-nedir-kahveni-al-docker-konu-uyoruz-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/docker-nedir-kahveni-al-docker%C4%B1-konu%C5%9Fuyoruz-de83718255e8"
lang: "en"
---

# What is Docker? — Grab a Coffee, Let's Talk Docker.

![](/blog/images/docker-nedir-kahveni-al-docker-konu-uyoruz-img-2.jpg)

Let's have a chat: in the software development world, things can get a bit... messy. An application that works in one place doesn't work in another, and the phrase "it works on my machine" turns into an office legend. Of course, there are many reasons why an application might work for you but not for someone else. But we won't talk about those today. Today, we're talking about Docker, which promises to solve most of these problems. Now "Docker" enters our stage, and with the aura of a hero.

Docker is actually an open-source platform that allows us to put our applications and their dependencies, along with the environment they run in, into lightweight virtual boxes called "containers." But don't worry, in this article, we won't just chase technical definitions. I will explain it to you the same way I understood it myself. We will discover together what Docker is, why it is loved so much, and why developers can't put it down.

## What's in the Rest of the Article?

*   Why did we need Docker?
*   What exactly does Docker do?
*   What is a container, and how is it different from a virtual machine?
*   How to run the first container with Docker?

![](/blog/images/docker-nedir-kahveni-al-docker-konu-uyoruz-img-3.jpg)

## Why Did We Need Docker?

You started a software project. You set up the development environment, installed the libraries, and everything works like clockwork. But when it comes to transferring the project to a teammate, the test environment, or the server, things go haywire. Because...

> "Dude, it works for you, but it doesn't work for me."

This is a classic scenario we've all experienced. Because every machine is different: the operating system is different, library versions are different, configurations are different... That is, the execution of the application is not only related to the software, but also to the **environment** it runs in.

That's why **we needed tools like Docker**. Because software is not just code; its dependencies, the system it runs on, its settings, ports, environment variables... are all a whole. Docker wraps this integrity in isolated boxes we call "containers" and ensures it works the same way everywhere.

## What Does Docker Do? — Think of It as a Magical Chest

![](/blog/images/docker-nedir-kahveni-al-docker-konu-uyoruz-img-4.jpg)

Docker takes your software, puts everything it needs to run next to it (libraries, environment settings, services, etc.), and packages them inside a container. This container runs the same way no matter where you take it.

Think of it like this:

*   Developer computer
*   Test server
*   Production environment
*   Cloud providers

Thanks to Docker, they all see the same environment. Because everything is inside the container, it is not affected by whatever is on your computer.

And best of all: Docker is extremely lightweight. It is not heavy like virtual machines. It starts in seconds and consumes very, very few resources. So it is fast, portable, and reliable. **A magical chest.**

## What is a Container? How is it Different from a Virtual Machine?

The answer to this question helps us better understand why Docker has created such a revolution.

### Virtual Machine (VM):

*   Runs a full operating system (e.g. Ubuntu).
*   It is heavy, taking up plenty of space from RAM and disk.
*   Takes time to boot.

### Docker Container:

*   Contains only your application and what it needs to run.
*   Shares the host system's kernel.
*   Is much lighter and starts quickly.
*   Multiple containers can easily run on the same machine.

## 🐳 Running Our First Container with Docker

Theory is nice, but without practice, everything remains a bit meaningless. Now let's start by running our first container on a system with Docker installed (it doesn't matter if it's Windows, Mac, or Linux).

### 1. Is Docker Installed?

As a first step, check if Docker is installed on your system. Type this command in your terminal or command line:

```bash
docker --version
```

If it's not installed, you can download and install Docker Desktop [from here](https://www.docker.com/products/docker-desktop/). You might need to restart your computer after installation.

### 2. First Docker Command: Hello World

```bash
docker run hello-world
```

If you ask what this does:

*   Pulls an image named `hello-world` from Docker Hub.
*   Runs this image.
*   It gives you a "Hello from Docker!" message in the terminal. **Did it?**

### 3. Creating a Dockerfile for Our Own Application

Now let's run a simple Python application inside Docker.

Our `app.py` file:

```python
print("Hello from inside Docker!")
```

`Dockerfile`:

```dockerfile
# We told it to use Python as the base image.
FROM python:3.10-slim

# We set the working directory
WORKDIR /app

# We copied the code file into the container
COPY app.py .

# What will be run when the container starts?
CMD ["python", "app.py"]
```

### Build the Docker image:

Write this to the terminal:

```bash
docker build -t hello-world-python .
```

Run the application:

```bash
docker run hello-world-python
```

And boom! You will see this in the terminal:

```text
Hello from inside Docker!
```

### 4. So What Happened?

*   Docker created a mini-system based on Python.
*   It copied your `.py` file into it.
*   And it ran this as a small, portable container.

That's it! Now your application ran independently of the system, **inside a Docker container**. No need to set up a special environment for you. Wherever you run it, the result will be the same.

![](/blog/images/docker-nedir-kahveni-al-docker-konu-uyoruz-img-5.jpg)

## Conclusion — Docker is Not Just a Tool, It's a Habit (In My Opinion)

Docker is not just a "tool" in modern software development processes; **it's a way of thinking and working**. If you want to run your applications in isolated environments, manage dependencies, and eliminate problems like "it works for me but broke on the server," Docker will be your biggest helper.

### Why is Docker Loved So Much?

*   It works the same way in every environment.
*   It provides harmony in teamwork.
*   Makes it easy to move applications.
*   Speeds up automation processes.
*   Offers full support from local development to production.

And best of all? It's fun to learn and fast to use.  
Once you get used to it, you'll want to add Docker support to all your projects. Because it gives freedom. Because it solves system complexity for you.

If you have read this article this far, you have stepped into the world of Docker. Now all you have to do is try and learn. Thanks for reading, see you.
