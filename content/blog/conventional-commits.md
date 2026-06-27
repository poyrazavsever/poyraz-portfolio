---
title: "For Order and Efficiency in Software Projects: What is Conventional Commits?"
category: "General"
date: "2024-08-23"
readTime: "3 min read"
author: "Poyraz Avsever"
slug: "conventional-commits"
excerpt: "For Order and Efficiency in Software Projects: What is Conventional Commits? In the software development process, we deal with many details beyond writing code. Commit messages are a critical part..."
coverImage: "/blog/images/yaz-l-m-projelerinde-d-zen-ve-verimlilik-i-in-conventional-commits-nedir-cover.jpg"
canonicalUrl: "https://medium.com/@poyrazavsever/yaz%C4%B1l%C4%B1m-projelerinde-d%C3%BCzen-ve-verimlilik-i%CC%87%C3%A7in-conventional-commits-nedir-4413e05ffbbf"
lang: "en"
---

# For Order and Efficiency in Software Projects: What is Conventional Commits?

In the software development process, we deal with many details beyond writing code. Commit messages are, of course, a critical part of this process. However, commit messages can sometimes be messy, incomprehensible, and unorganized. This is exactly where "**Conventional Commits**" comes into play.

![](/blog/images/yaz-l-m-projelerinde-d-zen-ve-verimlilik-i-in-conventional-commits-nedir-img-2.jpg)

## What is Conventional Commits?

Conventional Commits is a software standard that puts your commit messages into a specific format. The goal is to express clearly what each commit does and make the project history more understandable. Writing your commit messages according to this standard makes the project more organized, trackable, and sustainable. Let's inspect it together.

## Why Should We Use Conventional Commits?

### 1. Readability

The readability of the commit history is important for all of us. This standard ensures that changes made in the project can be easily tracked. In large projects, since it becomes difficult from time to time to understand which commit solved which issue or added which new feature, using such standards makes the work of developers easier.

### 2. Traceability and Transparency

Making our commit messages consistent and clear makes it easy to track changes in our project history. Especially in changes that break **backward compatibility**, these arrangements provide a major advantage.

## How Are These Commit Messages Written?

According to Conventional Commits, each commit message consists of three main parts:

1.  **Summary (Title):** Indicates the type of the message and briefly what it did.
2.  **Body:** Explains the details of the change. Tells why it was done and how it was done.
3.  **Footer:** Changes that break compatibility like breaking changes or closed issues are specified here.

## Commit Types

Commit messages start with specific types. Here are the most commonly used types: [Click to inspect more detailed commit types.](https://www.conventionalcommits.org/en/v1.0.0/)

*   **feat:** Adding a new feature.
*   **fix:** Fixing a bug.
*   **docs:** Changes related only to documentation.
*   **style:** Formatting that does not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.).
*   **refactor:** A code change that neither fixes a bug nor adds a feature.

**Let's examine an example Commit Message together:**

> feat(login): add JWT authentication
> 
> Added JWT authentication to the login process to enhance security.  
> This change involves updating the login controller and modifying the user model.
> 
> BREAKING CHANGE: The user model now requires a JWT token for all login operations.

1.  **Summary (Title):**

*   `**feat:**`  
    Indicates the commit type. Here `feat` (feature) type is used, which shows that the commit adds a new feature to the project. Other types can also be used, e.g. `fix` (fixing a bug), `docs` (documentation updates), etc.
*   `**(login):**`  
    The part specified in parentheses shows which module or section this feature or change affects. Here `login` is used, so the change made is related to the login process.
*   `**add JWT authentication:**`  
    This explains the specific change made by the commit in a short and concise way. Here, it is stated that authentication with JWT (JSON Web Token) is added to the login process.

2. **Body:**

*   **First Sentence:**  
    “Added JWT authentication to the login process to enhance security.”  
    This sentence explains the purpose and result of the change made. Here, it is stated that JWT authentication is added to the login process and this was done to enhance security.
*   **Second Sentence:**  
    “This change involves updating the login controller and modifying the user model.”  
    This sentence explains in more detail which files or modules the change affected. Here, it is stated that the login controller is updated and the user model is modified.

3. **Footer:**

*   `**BREAKING CHANGE:**`  
    This expression shows that there is a change that breaks compatibility. If a commit makes a change that will break the operation of the existing code, this must be specified. This ensures that other developers are aware of this change.
*   **Detail:**  
    “The user model now requires a JWT token for all login operations.”  
    This explanation details what the breaking change is. Here, it is stated that the user model now requires a JWT token for all login operations. This indicates that other developers should be careful when applying this change.

## In Conclusion

Conventional Commits makes our software development process more organized, understandable, and efficient. By putting our commit messages into a specific structure, we make our project management more sustainable and traceable.

If you also want a more organized commit history in your projects, I highly recommend trying Conventional Commits.

## Source

*   [https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/)
*   [https://developer.vonage.com/en/blog/3-reasons-why-you-should-use-conventional-commits](https://developer.vonage.com/en/blog/3-reasons-why-you-should-use-conventional-commits)
