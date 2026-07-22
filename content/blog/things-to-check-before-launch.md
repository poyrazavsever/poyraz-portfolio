---
title: "Things to Check Before Launch: A Production Checklist for Web Applications"
category: "Testing"
date: "2026-07-22"
readTime: "16 min read"
author: "Poyraz Avsever"
slug: "things-to-check-before-launch"
excerpt: "Before shipping your web application to production, walk through functional tests, security checks, dependency safety, OWASP ZAP scans, legal data handling, SEO, accessibility, performance, and final operational checks."
coverImage: "/blog/images/yayina-cikmadan-once-dikkat-et-cover.png"
lang: "en"
---

# Things to Check Before Launch: A Production Checklist for Web Applications

A web application working smoothly in development does not mean it is ready for production. Real users arrive from different devices, enter unexpected data, interrupt requests halfway through, click the same button twice, and discover corners of the application you never thought about. In production, you are not only responsible for features. Security, personal data, search visibility, accessibility, monitoring, and recovery plans all become part of the product.

That is why a launch should not be treated as a single `deploy` command. It should be handled as a controlled delivery process. The checklist below can be adapted to anything from a small portfolio site to a larger product with accounts, payments, dashboards, and third-party integrations. Not every item will have the same weight in every project. The important part is to understand the risks, make conscious decisions, and keep a record of what was checked.

> Apply the security steps in this article only to systems you own or have explicit permission to test. Also, do not treat automated scanner results as final proof that an application is secure.

## 1. Core Functional Tests

Your first goal is to confirm that users can complete the most important tasks from beginning to end. Instead of randomly clicking through every screen, list the critical user journeys and test them deliberately.

For an application with user accounts, check flows such as:

- New user registration, email verification, and first login
- Login with both correct and incorrect credentials
- Password reset link expiration and single-use behavior
- Viewing, updating, and deleting a profile
- Success, error, and loading states during form submission
- Pages visible to authorized and unauthorized users
- Application behavior after a session expires
- Attempts to access private pages with the browser back button after logout

Testing only the happy path is not enough. Try empty fields, very long text, unexpected characters, duplicate submissions, slow connections, and server responses such as `400`, `401`, `403`, `404`, `429`, and `500`. When something fails, the user should understand what happened. The application should not present a half-finished action as completed.

### Run the production build for real

The development server and the production build may behave differently. Optimizations, environment variables, server-side rendering, and build-only errors can expose problems that never appeared locally during development.

If you are using PowerShell 7 or later, run this in the project directory:

```powershell
npm run build && npm run start
```

If your older Windows PowerShell version does not support `&&`, run the commands separately. After confirming that the build finished successfully:

```powershell
npm run build
npm run start
```

Once the application is running, open the browser developer tools and check the Console and Network tabs. Silent JavaScript errors, failed network requests, mixed content warnings, and unexpected redirect loops usually show up there first.

### Short functional launch checklist

- Can critical flows be completed on desktop and mobile screen sizes?
- Are forms usable with a keyboard, and do they show the correct validation messages?
- Do refreshes and direct URL visits work as expected?
- Are empty, loading, success, and error states designed and tested?
- Have email, file upload, payment, and third-party services been checked with real production settings?
- Is there a rollback plan for database migrations and seed data?

## 2. Basic Security and Penetration Checks

Security is not just about running a scanner. First, manually check the application's basic defenses. The goal here is not to attack the system. The goal is to catch obvious misconfigurations before launch.

### Separate authentication from authorization

A user being logged in does not mean they should have access to every resource. If a user can change an ID in the URL and view another user's order, profile, or document, you likely have a broken access control problem. Hiding a button in the UI is not a security control. Authorization must be enforced on the server for every relevant request.

Try these checks:

- Send direct requests to private pages and API endpoints without logging in.
- Try to reach admin routes with a normal user account.
- Change resource IDs in the URL, query string, or request body.
- Use one account's token while requesting resources that belong to another account.
- Confirm that old tokens stop working after logout.

### Secrets and security headers

Passwords, private API keys, database connection strings, and access tokens must not appear in source code, JavaScript bundles, source maps, network requests, or error messages. Anything sent to the client should be considered visible.

Review HTTPS redirection and evaluate at least these headers based on your application's needs:

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`
- `frame-ancestors` in CSP for clickjacking protection

For cookies, use `Secure`, `HttpOnly`, and the appropriate `SameSite` value based on sensitivity. Avoid accepting arbitrary origins in CORS when credentials are enabled. Add rate limiting to abuse-prone endpoints such as login, password reset, and form submissions.

You can use the OWASP Top 10 as a shared starting point for discussing risk, not as a complete security test. In the 2025 list, Broken Access Control, Security Misconfiguration, and Software Supply Chain Failures are among the top categories.

## 3. Dependency Security

Your application's security is not limited to the code you wrote. Every package installed through a package manager, including transitive dependencies, becomes part of your software supply chain.

For Node.js projects, start with one of these commands depending on your package manager:

```powershell
npm audit
```

```powershell
pnpm audit
```

Do not judge the report only by the number of findings. Ask these questions:

1. Is the vulnerability in a production dependency or only in a development tool?
2. Does your application actually use the vulnerable code path?
3. Does upgrading to the safe version introduce a breaking change?
4. Is the package still maintained, or do you need a safer alternative?
5. If you accept the risk temporarily, is the owner, reason, and review date documented?

Avoid running forceful commands such as `npm audit fix --force` without reviewing the result. Major version upgrades can break the application. Keep the lockfile in the repository, use deterministic installs in CI, and merge dependency updates only after tests pass.

Also scan the repository for accidentally committed secrets. Removing a leaked key from the latest file is not enough if it already entered Git history. Revoke and rotate the key. Production credentials should follow the principle of least privilege and be rotated regularly.

## 4. Automated Security Scanning with OWASP ZAP (Windows / PowerShell)

After manual checks, you can use OWASP ZAP Baseline Scan to inspect the running application. Baseline Scan crawls the target for a short time with a spider and then runs passive scan rules against the generated traffic. Because it does not perform active attacks, it is a safer starting point for CI/CD and controlled production checks than Full Scan.

This distinction matters. Baseline Scan can find useful warnings, but it does not prove the application is secure. It may not reach authenticated screens, it cannot understand business logic vulnerabilities, and it does not attempt active exploitation. Treat the results as one layer in a broader review that includes code review, authorization testing, and specialist penetration testing when needed.

### Requirements

- Docker Desktop must be installed and running on Windows.
- The PowerShell session must be opened in the correct project directory.
- The production build of the application must be running.
- The target must be your own system or a system you have explicit permission to test.

Start the application in the first PowerShell window:

```powershell
npm run build && npm run start
```

If the application runs at `http://localhost:3000`, open a second PowerShell window in the project root and run this single-line command:

```powershell
docker run --rm -t -v "${PWD}:/zap/wrk/:rw" zaproxy/zap-stable zap-baseline.py -t http://host.docker.internal:3000 -r zap-baseline-report.html
```

When the scan finishes, the file `zap-baseline-report.html` will be created in your project folder. Open it in the browser to review alerts, affected URLs, evidence, and the remediation guidance from ZAP.

### What each part of the command does

| Part | Explanation |
| --- | --- |
| `docker run` | Starts a temporary container from the ZAP image. |
| `--rm` | Removes the stopped container after the scan finishes. It does not delete the HTML report because the report is written to the mounted host folder. |
| `-t` | Allocates a pseudo-terminal so the output is easier to read. |
| `-v "${PWD}:/zap/wrk/:rw"` | Mounts the current project folder into the container as `/zap/wrk/` with read-write access. This is what allows the report to be saved on your machine. |
| `zaproxy/zap-stable` | Uses the stable OWASP ZAP Docker image. The image may be downloaded during the first run. |
| `zap-baseline.py` | Runs the Baseline Scan script, which performs a time-limited spider and passive analysis. |
| `-t http://host.docker.internal:3000` | Defines the target to scan. The protocol is required. |
| `-r zap-baseline-report.html` | Sets the HTML report filename. Because of the mounted volume, the file appears in the project directory. |

### Why not `localhost:3000`?

From inside the container, `localhost` refers to the ZAP container itself, not the application running on Windows. Docker Desktop provides `host.docker.internal` as a hostname for reaching the host machine. That is why the application you open as `http://localhost:3000` in the browser is usually scanned as `http://host.docker.internal:3000` from the ZAP container.

If your application runs on another port, change only the port:

```powershell
docker run --rm -t -v "${PWD}:/zap/wrk/:rw" zaproxy/zap-stable zap-baseline.py -t http://host.docker.internal:8080 -r zap-baseline-report.html
```

If you are scanning a remote staging or production address, use the HTTPS URL directly:

```powershell
docker run --rm -t -v "${PWD}:/zap/wrk/:rw" zaproxy/zap-stable zap-baseline.py -t https://example.com -r zap-baseline-report.html
```

### Useful Baseline Scan options

- `-m 3`: Sets how many minutes the traditional spider should crawl the target. The default is 1 minute.
- `-T 10`: Limits the maximum time, in minutes, for ZAP startup and passive scan completion.
- `-j`: Also uses the modern spider for JavaScript-heavy pages. It may increase scan time and resource usage.
- `-J zap-report.json`: Produces a JSON report for automation tools.
- `-w zap-report.md`: Produces a Markdown report.
- `-g zap-rules.conf`: Generates the default rule configuration file.
- `-c zap-rules.conf`: Uses a configuration file where rules can be classified as `INFO`, `WARN`, `FAIL`, or `IGNORE`.
- `-I`: Prevents warnings from causing a non-zero exit code. Do not add this before deciding your CI policy deliberately.

For example, to produce both HTML and JSON reports while increasing crawl time:

```powershell
docker run --rm -t -v "${PWD}:/zap/wrk/:rw" zaproxy/zap-stable zap-baseline.py -t http://host.docker.internal:3000 -m 3 -T 10 -r zap-baseline-report.html -J zap-baseline-report.json
```

### Read exit codes correctly

The ZAP script can generate a report and still finish with a non-zero exit code. That does not always mean the tool failed:

- `0`: Success according to the selected policy.
- `1`: At least one `FAIL` was found.
- `2`: No `FAIL` findings, but at least one `WARN` was found.
- `3`: Another scan error occurred, such as target connection failure, timeout, or configuration issue.

In PowerShell, write `$LASTEXITCODE` immediately after the scan to see the final exit code. Your team policy should define how CI handles `1` and `2`. Instead of ignoring the tool forever, review the initial report, promote real risks to `FAIL`, document accepted risks, and track temporary exceptions.

### Common problems

#### The target cannot be reached

First confirm that the application opens in the browser. Then check the port and make sure the command uses `host.docker.internal`. If the application is bound to a different interface, inspect the server's listen settings.

#### The report does not appear in the project folder

Make sure you ran the command from the project root, kept the volume expression in quotes, and mounted `/zap/wrk/:rw` with write access. If the Windows drive is not shared with Docker Desktop, check Docker Desktop file sharing settings.

#### There are too many warnings

Group findings by severity first. Security headers, cookie options, and information-revealing server headers are common findings. Review the request and response evidence for each alert. Do not dismiss false positives without writing down why. After fixing issues, run the same command again and compare reports.

## 5. Legal Requirements and Data Management

If you collect personal data, being technically secure is not enough. You should know what data you collect, why you collect it, which legal basis applies, who receives it, and how long you keep it. This section is not legal advice. Get expert guidance based on your product, business model, and target countries.

Under Turkey's KVKK framework, the obligation to inform data subjects includes explaining the identity of the data controller, processing purposes, transfers, collection method, legal basis, and data subject rights. Getting explicit consent where required does not remove the obligation to inform the user.

Before launch, check these points:

- Do the privacy notice and disclosure texts reflect the real data flow?
- Do non-essential cookies and tracking tools wait for the required consent?
- Is every collected field actually necessary, or can you apply data minimization?
- Is there a plan for deleting, destroying, or anonymizing data after the retention period?
- How will users request access, correction, deletion, or other data rights?
- Which data is transferred to analytics, email, error monitoring, and cloud providers?
- Are backups encrypted, has restore been tested, and are accesses logged?
- Is there a written incident response plan for data breaches, including owners and communication steps?

Do not log passwords, full access tokens, payment card data, or unnecessary personal information. Do not copy production data into development or test environments. If it is unavoidable, use anonymization or masking. For admin panels, use multi-factor authentication and role-based authorization.

KVKK's data security guidance expects data controllers to take appropriate technical and administrative measures to prevent unlawful processing, prevent unlawful access, and preserve personal data. Your security checklist and legal compliance work should therefore be treated as connected parts of the same launch process.

## 6. SEO, Accessibility, and Final Checks

At the final stage, make sure the product is discoverable, usable, and observable. An application that technically works but cannot be read by search engines, cannot be used with a keyboard, or fails without alerting anyone is not production-ready.

### SEO

- Every page should have a descriptive and unique `title` and meta description.
- Canonical URLs should be correct; HTTP/HTTPS, `www`, and trailing slash variants should resolve to one address.
- `robots.txt` should not accidentally block production pages.
- The XML sitemap should include only publishable and canonical URLs.
- Open Graph and social media cover images should be reachable in the real environment.
- Heading hierarchy should be meaningful; do not use headings only for visual size.
- The 404 page should return the correct HTTP status code.
- Structured data should match the visible page content.

### Accessibility

Use WCAG 2.2 as a reference and check at least keyboard usage, visible focus, color contrast, form labels, error messages, and alternative text.

- Can the whole page be used with only a keyboard?
- Is the focus order logical, and is the focus indicator visible?
- Do meaningful images have useful `alt` text, and are decorative images hidden from screen readers?
- Do form fields have visible labels and programmatic names?
- Are errors explained with text, not only with red color?
- When a modal opens, is focus managed, and can it be closed with `Escape`?
- Does motion-heavy content respect reduced motion preferences?
- Does content remain available when zoomed or viewed on narrow screens?

Automated accessibility tools are a good start, but they do not replace keyboard and screen reader testing.

### Performance and operations

With Lighthouse or similar tools, focus on the real bottleneck, not only the score. Serve large images at the right size and in modern formats, defer non-critical JavaScript, review font loading, and validate cache policies. Repeat measurements several times, ideally on lower-power mobile devices and slower networks.

Finally, answer these operational questions:

- Are errors tracked in a central system, and do alerts reach the right person?
- Do you have health checks, uptime monitoring, and basic metrics?
- Is the deployed version or commit ID recorded?
- Is the database migration backward-compatible?
- Has the rollback path to the previous version actually been tested?
- Are DNS, SSL certificates, and domain renewals monitored?
- Have production environment variables and third-party webhook URLs been verified?

## Conclusion: Launch Is a Process, Not a Moment

A good launch checklist does not guarantee that nothing will ever go wrong. Its real value is making known risks visible and defining what you will do when something breaks.

In short, before going live:

1. Test critical user flows on the production build.
2. Review authorization, secrets, cookies, and security headers.
3. Evaluate dependency and software supply chain risks.
4. Scan the running application with OWASP ZAP Baseline Scan and interpret the report.
5. Verify personal data flows, disclosure texts, and retention processes.
6. Complete SEO, accessibility, performance, monitoring, and rollback checks.

Turn this checklist into a living document in your repository. Review it for every release, update it after incidents, and automate the items that can be handled in CI/CD. That gives you a launch process with evidence and a recovery plan instead of a deploy based on hope.

## Sources

- [OWASP ZAP Baseline Scan documentation](https://www.zaproxy.org/docs/docker/baseline-scan/)
- [OWASP ZAP Docker user guide](https://www.zaproxy.org/docs/docker/about/)
- [OWASP Top 10:2025](https://owasp.org/Top10/)
- [KVKK - Obligation to Inform](https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-)
- [KVKK - Obligations Related to Data Security](https://www.kvkk.gov.tr/Icerik/2040/Veri-Guvenligine-Iliskin-Yukumlulukler)
- [W3C - Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
