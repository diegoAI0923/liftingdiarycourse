# Developer Notes — Lifting Diary Course Project

A collection of questions and answers gathered during the initial setup of this Next.js project. Useful as a reference for anyone new to the stack.

---

## 1. How do I install Claude Code in VS Code?

The recommended method is through the VS Code Extension Marketplace:

1. Press `Cmd+Shift+X` to open the Extensions panel
2. Search for **"Claude Code"** and install the one published by **Anthropic**
3. Click the Spark (✦) icon in the sidebar to open the Claude Code panel
4. Sign in with your Claude account

> Requires a Claude Pro, Max, Team, or Enterprise subscription.

Alternatively, you can install the CLI via npm:

```bash
npm install -g @anthropic-ai/claude-code
```

Then type `claude` in any terminal to get started.

---

## 2. What is a Next.js project?

Next.js is a framework built on top of React that adds production-ready features out of the box:

- **Server-side rendering** — pages are generated on the server for faster load times
- **File-based routing** — your folder structure automatically becomes your URL routes
- **API routes** — write backend code in the same project
- **Built-in optimizations** — images, caching, and more

Plain React is a UI library. Next.js turns it into a full-stack framework.

### Creating a new Next.js project

```bash
npx create-next-app@latest my-app-name
```

After setup, run the development server with:

```bash
npm run dev
```

### What is `npx` vs `npm`?

| Command | Purpose |
|--------|---------|
| `npm` | Installs packages permanently onto your machine |
| `npx` | Runs a package temporarily without installing it |

`npx` is ideal for project scaffolding tools you only need once.

---

## 3. What is SEO?

**SEO (Search Engine Optimization)** is the practice of making your website rank higher in search engine results (e.g. Google) for relevant queries.

Google rewards sites that are:
- **Fast** — slow pages rank lower
- **Crawlable** — content must be in the HTML, not loaded later by JavaScript
- **Mobile-friendly** — responsive design is a ranking factor
- **Well-structured** — proper use of `<title>`, `<h1>`, `<h2>`, and descriptive links

### Why Next.js helps with SEO

Plain React apps often render as blank HTML that gets filled in by JavaScript *after* load — Google's crawler may miss that content. Next.js pre-renders HTML on the server, so content is immediately visible to search engine crawlers. This is one of the primary reasons Next.js became popular.

---

## 4. What do the Next.js setup options mean?

When running `npx create-next-app@latest`, you are prompted with several configuration choices. Here's what each one means:

### TypeScript → Yes
Adds static typing to JavaScript. Instead of `let age = 25`, you write `let age: number = 25`. Catches bugs early and improves editor support.

### Linter → ESLint
A tool that scans your code for problems and bad practices as you write — like spell-check for code quality.

### React Compiler → No
An experimental Meta feature that auto-optimizes React code. Choosing *No* is the safe, stable choice for most projects right now.

### Tailwind CSS → Yes
A utility-first CSS framework. Instead of separate CSS files, you add classes directly in your JSX:

```jsx
<h1 className="text-lg font-bold text-blue-500">Hello</h1>
```

### `src/` directory → Yes
Your code lives in a `src/` folder, keeping it separate from config files at the root. A clean organizational habit.

### App Router → Yes
The modern Next.js routing system (vs. the older Pages Router). Recommended for all new projects — unlocks server components and more powerful data fetching patterns.

### Import Alias → No
Import aliases let you write cleaner paths. With the `@/*` alias, instead of:

```js
import Button from '../../components/Button'
```

You could write:

```js
import Button from '@/components/Button'
```

Choosing *No* means standard relative paths for now — fine while learning.

---

## 5. How do I fix the `code .` command not working on Mac?

The `code` command needs to be registered in your terminal PATH. This is a one-time setup:

1. Open VS Code
2. Press `Cmd+Shift+P` to open the Command Palette
3. Type **"Shell Command"** and select **"Shell Command: Install 'code' command in PATH"**
4. Restart your terminal

After this, `code .` will open any folder in VS Code from the terminal.

> This happens because VS Code on Mac doesn't automatically register the `code` command on install. The Command Palette step is a one-time fix.

---

## 6. What is a "skill file" in Claude's environment?

When helping with tasks like creating files, Claude has access to internal "skill" documents that contain best practices for producing high-quality outputs — things like how to properly generate a Word document, a PowerPoint, a PDF, etc. Before creating a file, Claude reads the relevant skill file first to follow the right approach.

For example, before creating the NOTES.md file in this project, Claude checked the `docx` skill before realizing a plain Markdown `.md` file was all that was needed — simple enough that no special skill was required.

Think of skill files as internal cheat sheets or SOPs (Standard Operating Procedures) that help Claude do certain tasks correctly the first time, rather than through trial and error.

---

## 7. What is the `.claude/settings.local.json` file?

This file is a **project-level Claude Code configuration** file, intended to be **gitignored** (personal to your machine, not shared with the team).

### Why "local"?
The `local` suffix distinguishes it from `.claude/settings.json` (without `local`), which you would commit to git to share settings with the whole team. Use `settings.local.json` for personal overrides.

### What can it configure?

Beyond permissions, it supports:

- `model` — override the default Claude model for this project
- `env` — set environment variables for Claude Code sessions
- `hooks` — run shell commands before/after tool use (e.g. auto-format after every file edit)
- `autoMemoryEnabled` — toggle whether Claude writes memory notes for this project
- `cleanupPeriodDays` — how long to retain chat transcripts
- `plansDirectory` — custom folder for plan files, relative to project root

### The `deny` list
Even when empty, it's useful for explicitly blocking dangerous operations (e.g. `"Bash(git push --force)"`) as a safety net regardless of permission mode.

---

## 8. How does settings precedence work in Claude Code?

Local overrides global. The order from lowest to highest priority is:

```
Enterprise (managed) → Global (~/.claude/settings.json) → Project (.claude/settings.json) → Local (.claude/settings.local.json)
```

- **Enterprise** — hard rules across the org
- **Global** — your personal defaults across all projects
- **Project** (`settings.json`) — shared team conventions, committed to git
- **Local** (`settings.local.json`) — your personal overrides for a specific project, wins over everything

### How permissions are merged
`allow` and `deny` lists are **merged** across all levels — they don't replace each other. So if global allows `Bash(git status)` and local allows `Bash(npm run dev)`, you get both. However, `deny` always takes final precedence: if something is denied at any level, it's denied.

---

## 9. What is Clerk?

**Clerk** is an authentication and user management service — a complete "auth system in a box" that you drop into your app instead of building login/signup from scratch.

### What it handles for you
- Sign up / sign in flows (email, password, magic links)
- Social logins (Google, GitHub, Apple, etc.)
- Multi-factor authentication (MFA)
- User profile management
- Session management
- Organization/team support (multi-tenant)

### Why developers use it instead of building auth
Auth is notoriously complex to get right — password hashing, session tokens, OAuth flows, email verification, security patches. Clerk abstracts all of that behind a hosted service and pre-built UI components.

### How it integrates with Next.js
Clerk has a first-class Next.js SDK (`@clerk/nextjs`). The typical setup is:

1. Wrap your app in a `<ClerkProvider>` in `layout.tsx`
2. Use middleware (`clerkMiddleware`) to protect routes
3. Drop in pre-built components like `<SignIn />`, `<SignUp />`, `<UserButton />`
4. Access the current user anywhere via `currentUser()` (server) or `useUser()` (client)

### Pricing
- **Free tier** — up to 10,000 monthly active users, plenty for learning and small projects
- Paid plans add features like organizations, advanced MFA, and custom domains

### The trade-off
You're depending on an external service — if Clerk goes down, your auth goes down. For a course project or early-stage app it's an excellent choice; for large enterprises, some prefer keeping auth in-house.

---

## 10. Why does `next dev` fail with a lock file error instead of switching ports?

When starting `next dev`, two separate things can go wrong:

### Port conflict (3000 → 3001)
This resolves itself — Next.js automatically switches to the next available port. Not a problem.

### Lock file conflict (the actual failure)
When `next dev` starts, it creates a lock file at `.next/dev/lock` to signal "I'm running." If a second instance tries to start:

1. It finds the lock file from the first instance
2. It refuses to start — **regardless of the port**
3. The lock is tied to the `.next/` build directory, not the port, so switching ports doesn't help

This is intentional — Next.js prevents two dev servers from writing to the same `.next/` cache simultaneously, which would corrupt the build output.

### Why does a second instance exist?
A previous `npm run dev` was started and never properly stopped — just the terminal window was closed, leaving the process running in the background. Closing a terminal doesn't kill its child processes on Mac by default.

### How to fix it
```bash
pkill -f "next dev"
```

### How to avoid it in the future
Always stop the dev server with `Ctrl+C` before closing the terminal.

---

## 11. How do I open Clerk's Sign In / Sign Up as a modal?

By default, `<SignInButton>` and `<SignUpButton>` navigate to a separate page. Adding `mode="modal"` overlays the auth form on top of the current page instead.

```tsx
<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>
```

- The child element (e.g. `<button>`) is the trigger — Clerk renders the modal UI automatically
- No separate sign-in/sign-up routes needed
- `<SignInButton>` and `<SignUpButton>` work inside Server Component layouts without adding `"use client"` — Clerk handles that boundary internally

---

## 12. How do I style the Clerk auth buttons and header?

Clerk's button wrappers accept any child element, so you style the inner element directly with Tailwind classes. A common pattern is an outlined style for Sign In and a filled style for Sign Up to establish visual hierarchy:

```tsx
<header className="flex items-center justify-end gap-3 px-6 py-4 border-b border-gray-200">
  <SignedOut>
    <SignInButton mode="modal">
      <button className="px-4 py-2 text-sm font-medium text-white border border-red-300 rounded-lg hover:bg-gray-50 transition-colors">
        Sign In
      </button>
    </SignInButton>
    <SignUpButton mode="modal">
      <button className="px-4 py-2 text-sm font-medium text-white border border-blue-300 rounded-lg hover:bg-gray-50 transition-colors">
        Sign Up
      </button>
    </SignUpButton>
  </SignedOut>
  <SignedIn>
    <UserButton />
  </SignedIn>
</header>
```

- `justify-end` pushes the buttons to the right
- `gap-3` adds spacing between them
- `border-b` adds a subtle separator below the header

---

## 13. What does the `/clear` command do in Claude Code?

The `/clear` command resets the conversation history, giving you a fresh context window. It does **not** change the size of the context window — it just removes the previous message history.

After `/clear`, the context still contains:
- **CLAUDE.md** — loaded automatically as project instructions
- **MEMORY.md** — persistent memory file
- **Git status** — a snapshot of the current branch/changes
- **System prompt** — Claude Code's built-in instructions

**What it's useful for:**
- **Performance** — shorter context = faster responses and lower cost per message
- **Avoiding confusion** — old conversation history can cause the model to make stale assumptions
- **Starting fresh** — if a conversation went in a wrong direction, clearing resets it without losing project files
- **Context limit management** — prevents hitting the 200k token limit on long sessions

---

## 14. What happens if you exceed the 200k token context limit?

Claude Code handles this automatically with **context compression**:

- When the conversation approaches the limit, the system automatically compresses older messages
- Earlier parts of the conversation get summarized/condensed to free up space
- You can continue working without interruption

You'll see a note in the UI when compression happens. Quality can degrade slightly on very long sessions since compressed summaries are less precise than the original messages.

**Best practices to avoid hitting the limit:**
- Use `/clear` when switching to a new task
- Keep file reads focused — avoid reading large files unnecessarily
- Break long sessions into separate conversations for distinct tasks

---

## 15. How do you create a CLAUDE.md file?

**Option 1: Let Claude Code generate it**

Run `claude` in your project root, then type `/init` — Claude Code will analyze your codebase and generate a `CLAUDE.md` with relevant project info.

**Option 2: Create it manually**

```bash
touch CLAUDE.md
```

Then fill it in with instructions you want Claude to follow.

**What to put in it:**
- Common commands (`npm run dev`, `npm test`, etc.)
- Architecture overview (framework, folder structure, patterns)
- Coding conventions (naming, file organization, patterns to follow/avoid)
- Project-specific rules

**Scope:**
- `CLAUDE.md` in the project root applies to the whole project
- Subdirectory `CLAUDE.md` files apply to that folder only
- `~/.claude/CLAUDE.md` applies across all projects globally

---

## 16. How do you update the CLAUDE.md file?

Three ways:

**Ask Claude Code directly** — tell it what to add/change:
> "Add a note to CLAUDE.md that we always use `bun` instead of `npm`"

**Edit it manually** — open it in your editor and modify it directly (it's just a markdown file).

**Ask Claude to persist a discovery** — after working through something, say:
> "Add that to CLAUDE.md"

> Note: Changes take effect on the next conversation (or after `/clear`). Edits mid-conversation won't retroactively update the current session's context.

---

## 17. What are `dotenv`, `.env`, and `process.env`?

Three related concepts for managing environment variables in Node.js projects.

### `.env` file

A plain text file that stores key-value pairs for configuration:

```
DATABASE_URL=postgres://localhost/mydb
API_KEY=abc123secret
PORT=3000
```

It lives at the root of your project and is **never committed to git** (add it to `.gitignore`). It keeps secrets and environment-specific config out of your source code.

### `process.env`

A built-in Node.js object that holds all **environment variables** as a dictionary. You read values from it in code:

```ts
const dbUrl = process.env.DATABASE_URL;
const port = process.env.PORT ?? "3000";
```

By default, it only contains variables set in the shell/OS environment — it does **not** automatically read your `.env` file.

### `dotenv`

An npm package that **loads your `.env` file into `process.env`** at runtime:

```ts
import "dotenv/config";

console.log(process.env.DATABASE_URL); // now works
```

Without `dotenv`, `process.env.DATABASE_URL` would be `undefined` unless you manually exported the variable in your shell.

### Why `.env` must be loaded into `process.env`

Because `process.env` is the **standard interface** that Node.js and all libraries use to read configuration. Your code and every npm package expects to find config values there — not in a `.env` file directly. A `.env` is just a text file; Node.js has no idea it exists until something reads it and injects the values into `process.env`.

A simple analogy: a `.env` file is like a note on your desk. `process.env` is your brain. Until someone reads the note and tells you what it says, the information isn't accessible to you. `dotenv` is the person who reads the note.

### How Next.js handles this automatically

Next.js has **built-in `.env` support** — no need to install `dotenv`. When you run `npm run dev` or `npm run build`, Next.js reads your `.env` files before any application code runs, using an internal package called `@next/env`.

**Which files it loads (highest priority first):**

```
.env.local          ← always loaded, never committed to git
.env.development    ← loaded when NODE_ENV=development
.env.production     ← loaded when NODE_ENV=production
.env                ← always loaded, base defaults
```

If the same key appears in multiple files, the higher-priority file wins.

**The `NEXT_PUBLIC_` rule:** Variables prefixed with `NEXT_PUBLIC_` are **inlined into the client-side JavaScript bundle** at build time. All other variables stay server-side only and are never sent to the browser.

---

## 18. Why does `process.env.DATABASE_URL` cause a TypeScript error when passed to `drizzle()`?

`process.env` values are always typed as `string | undefined` — TypeScript has no way to guarantee a variable actually exists at runtime. `drizzle()` expects a `string`, not `string | undefined`, so TypeScript raises a type error.

The fix is a **non-null assertion** (`!`):

```ts
const db = drizzle(process.env.DATABASE_URL!);
```

The `!` tells TypeScript "trust me, this value exists at runtime." It removes `undefined` from the type, satisfying `drizzle()`'s expectation.

This is the standard pattern when you know the variable will always be set (e.g. via `.env.local`) but TypeScript can't verify that statically.

---

## 19. What does `export { db }` do and why is it useful?

The `export { db }` line makes the `db` instance available to other files in your project. Without it, `db` exists only inside `src/index.ts` — no other file can use it. With it, any other file can import and use the same database connection:

```ts
import { db } from "@/index";
```

**Why this pattern is useful:**

You want **one shared database connection** across your entire app, not a new connection created in every file that needs the database. Creating a connection is expensive — it involves network handshakes, authentication, and pooling. If every route or server action created its own `drizzle(...)` instance, you'd be wasting resources and potentially exhausting your connection pool.

By creating `db` once in `index.ts` and exporting it, every file that imports it gets the **same instance**.

**Why it would be required:**

Any file that needs to query the database — API routes, server actions, server components — must import `db` from somewhere. Without the export, they'd each have to recreate it themselves, which defeats the purpose of centralizing the setup.

---

## 20. What is the purpose of the `drizzle(process.env.DATABASE_URL!)` instance?

The `drizzle(...)` call creates a **database client** — an object that knows how to talk to your database. You pass it your connection string (the URL), and it returns `db`, which gives you a typed, query-ready interface:

```ts
// Without drizzle — raw SQL, no type safety
const result = await client.query("SELECT * FROM workouts");

// With drizzle — typed, composable queries
const result = await db.select().from(workouts).where(eq(workouts.userId, id));
```

**What it's doing under the hood:**

- `process.env.DATABASE_URL` is your Neon database's connection string (e.g. `postgresql://user:pass@host/dbname`)
- `drizzle-orm/neon-http` uses that URL to connect to Neon over HTTP (rather than a persistent TCP connection — Neon's serverless architecture works better this way)
- The returned `db` object is your **ORM layer** — it translates your TypeScript queries into SQL, sends them to Neon, and returns typed results

In short: it's the bridge between your Next.js app and your Neon PostgreSQL database. Every query your app makes goes through this `db` instance.

---

## 21. What is a "typed result" in the context of Drizzle ORM?

A **typed result** means TypeScript knows the exact shape of the data coming back from a query — the column names and their types — so your editor can autocomplete and catch mistakes.

**Without types (raw SQL):**

```ts
const result = await client.query("SELECT * FROM workouts");
// result is `any` — TypeScript has no idea what's in it
console.log(result.rows[0].naem); // typo — TypeScript won't catch this
```

**With Drizzle (typed):**

```ts
const result = await db.select().from(workouts);
// TypeScript knows result is: { id: number, name: string, date: Date, ... }[]
console.log(result[0].naem); // ❌ TypeScript error — "naem" doesn't exist
console.log(result[0].name); // ✅ works, and your editor autocompletes it
```

Drizzle can do this because you define your table schema in TypeScript first:

```ts
const workouts = pgTable("workouts", {
  id: integer("id"),
  name: text("name"),
  date: timestamp("date"),
});
```

Drizzle uses that schema to infer what every query will return. So the types flow from your schema → through your queries → into your application code automatically.

---

## 22. What does passing `{ schema }` to `drizzle()` do?

When you update the `drizzle()` call to include the schema:

```ts
import * as schema from './schema';
const db = drizzle(process.env.DATABASE_URL!, { schema });
```

It enables Drizzle's **relational query API** — a higher-level query interface built on top of the core builder.

**Without `{ schema }` — core query builder only:**

```ts
db.select().from(workouts).where(eq(workouts.userId, id));
```

**With `{ schema }` — relational API unlocked:**

```ts
db.query.workouts.findFirst({
  where: eq(workouts.id, 1),
  with: {
    workoutExercises: {
      with: {
        exercise: true,
        sets: true,
      },
    },
  },
});
```

The relational API lets you fetch nested/related data in a single call using `with:` — instead of writing multiple joins manually. Drizzle uses the `relations()` definitions in your schema to know how to join tables automatically.

For a workout logging app this matters a lot: a single `db.query.workouts.findFirst(...)` can return a workout with all its exercises and all their sets in one round-trip, fully typed.

---

## 23. How do the four database tables relate to each other?

The schema has four tables that form a chain: `exercises → workout_exercises ← workouts`, and `sets` hangs off `workout_exercises`.

### The tables

- **`exercises`** — a global library of movements (no user). Each row is just a named exercise with a muscle group and equipment.
- **`workouts`** — a single training session belonging to a user on a specific date.
- **`workout_exercises`** — the junction table linking the two above. One row per exercise per workout, with an `order_index` to control display order.
- **`sets`** — individual sets performed for a given `workout_exercise`. Stores reps, weight, RPE, and whether it was a warmup.

### Mental model (nesting)

```
Workout (Push Day A, Feb 6)
 └── Exercise 1: Barbell Bench Press       ← workout_exercises row
 │    ├── Set 1 (warmup): 10 × 60 kg  @ RPE 6
 │    ├── Set 2: 8 × 80 kg  @ RPE 7
 │    ├── Set 3: 6 × 82.5 kg @ RPE 8
 │    └── Set 4: 5 × 82.5 kg @ RPE 9
 └── Exercise 2: Incline Dumbbell Press
 │    └── ...
 └── Exercise 3: Overhead Press
      └── ...
```

### How to query all four tables together

```sql
SELECT
  w.name        AS workout_name,
  w.date        AS workout_date,
  we.order_index,
  e.name        AS exercise_name,
  e.muscle_group,
  s.set_number,
  s.is_warmup,
  s.reps,
  s.weight_kg,
  s.rpe
FROM workouts w
JOIN workout_exercises we ON we.workout_id = w.id
JOIN exercises e          ON e.id = we.exercise_id
JOIN sets s               ON s.workout_exercise_id = we.id
WHERE w.name = 'Push Day A'
ORDER BY we.order_index, s.set_number;
```

This flattens the nested tree into rows — `workout_name` and `workout_date` repeat on every row because SQL is tabular. In application code you re-group them (by `workout_exercise_id`) before rendering.

### Why `workout_exercises` exists (instead of linking sets directly to workouts)

Without `workout_exercises`, you'd have no place to store per-exercise-per-workout metadata like `order_index` or per-exercise notes. More importantly, multiple sets for the same exercise in the same workout all need a shared parent to group them — that parent is the `workout_exercises` row.

---

## 24. What is OAuth 2.0 and how does it work?

**OAuth 2.0** is a standard protocol that lets one application access another on your behalf — without ever seeing your password.

The core idea: instead of giving App A your credentials for App B, you tell App B directly "yes, App A is allowed to do X for me." App B then gives App A a limited-access token.

### The flow (applied to Claude Code + Neon)

```
Claude Code          Your Browser          Neon's Server
     │                    │                     │
     │──"I need access"──▶│                     │
     │                    │──login + approve───▶│
     │                    │◀──auth code─────────│
     │◀───auth code───────│                     │
     │─────────────────────────auth code───────▶│
     │◀────────────────────────access token──────│
     │                    │                     │
     │─────────────future API calls (token)────▶│
```

**Step by step:**

1. **Redirect** — Claude Code sends you to `https://neon.tech/oauth/authorize?client_id=claude-code&...`
2. **You log in** — you authenticate directly with Neon (Claude Code never sees your password)
3. **You approve** — Neon shows a consent screen: "Claude Code wants to: manage your projects, run SQL..." — you click Allow
4. **Auth code** — Neon redirects back to Claude Code with a short-lived, one-time `code`
5. **Token exchange** — Claude Code sends that `code` to Neon's token endpoint and gets back an **access token**
6. **API calls** — from now on, every request to `https://mcp.neon.tech/mcp` includes `Authorization: Bearer <token>`

### Key concepts

| Term | What it is |
|------|------------|
| **Client** | The app requesting access (Claude Code) |
| **Resource owner** | You |
| **Authorization server** | Neon's login/consent system |
| **Resource server** | Neon's MCP/API server |
| **Access token** | A credential Claude Code uses instead of your password |
| **Scope** | What the token is allowed to do (e.g. read projects, run SQL) |

### Why it's better than passwords

- Neon never shares your password with Claude Code
- The token can have **limited scope** (only what was approved)
- You can **revoke** it from Neon's dashboard anytime without changing your password
- The token can **expire**, limiting damage if it leaks

This same pattern is used everywhere: "Sign in with Google", GitHub Apps, Slack integrations — they're all OAuth 2.0.

---

## 25. What does "OAuth" stand for?

**OAuth** = **Open Authorization**

- **Open** — it's an open standard, not owned by any single company; anyone can implement it
- **Authorization** — it grants *access rights*, not identity. It answers "what are you allowed to do?" not "who are you?"

That second point is a common source of confusion: despite often being called an "auth" protocol, OAuth is strictly about **authorization**. Proving *who you are* (authentication) is handled by a separate layer — **OpenID Connect** — which is built on top of OAuth 2.0.

---

## 26. What do the core Git and GitHub CLI commands do?

### `git status`

```bash
git status
```

Shows the current state of your working directory and staging area. It tells you:
- Which files have been **modified** since the last commit
- Which files are **untracked** (new files Git doesn't know about yet)
- Which files are **staged** (ready to be committed)

Nothing is changed — it's purely informational.

---

### `git add .`

```bash
git add .
```

**Stages** all changes in the current directory (and subdirectories) so they're included in the next commit. The `.` means "everything from here downward."

- Modified files → moved from "unstaged" to "staged"
- Untracked files → Git starts tracking them and stages them

Staging is a deliberate step — it lets you choose exactly what goes into a commit rather than blindly committing everything.

To stage a single file instead of everything:
```bash
git add src/app/page.tsx
```

---

### `git commit -m "your message"`

```bash
git commit -m "Add OAuth notes to NOTES.md"
```

Creates a **snapshot** of everything currently staged and saves it to your local Git history.

- `-m` — stands for "message". Lets you write the commit message inline. Without `-m`, Git opens a text editor for you to type the message.

The commit only exists **locally** at this point — it hasn't been sent to GitHub yet.

---

### `git push`

```bash
git push
```

Sends your local commits to the **remote repository** (GitHub). Only works after the remote has been set up and the branch has a tracking upstream (see `git push -u` below).

---

### `git push -u origin main`

```bash
git push -u origin main
```

Same as `git push` but with two extra pieces:

- `origin` — the name of the remote (by convention, `origin` is always the primary GitHub remote)
- `main` — the branch to push
- `-u` — short for `--set-upstream`. Links your local `main` branch to `origin/main` so future `git push` and `git pull` commands know where to go without you specifying it each time

You only need `-u` once per branch. After that, plain `git push` is enough.

---

### `git remote add origin <url>`

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

Connects your local Git repository to a remote one on GitHub.

- `remote add` — registers a new remote
- `origin` — the nickname you give this remote (convention is always `origin` for your primary remote)
- The URL — where the remote lives on GitHub

This is the manual approach. The `gh repo create --push` command does this automatically.

---

### `gh auth login`

```bash
gh auth login
```

Authenticates the GitHub CLI (`gh`) with your GitHub account using a browser-based OAuth flow:

1. It displays a one-time code (e.g. `D682-4ED2`)
2. It opens `https://github.com/login/device` in your browser
3. You enter the code and approve access
4. The CLI stores your credentials locally for future commands

Only needs to be done once per machine.

---

### `gh repo create`

```bash
gh repo create liftingdiarycourse --public --source=. --push
```

Creates a new GitHub repository and pushes your local code to it in one step.

- `liftingdiarycourse` — the name of the new repository
- `--public` — makes the repo publicly visible (use `--private` to hide it)
- `--source=.` — tells `gh` which local folder to use. Behind the scenes it runs `git remote add origin <new repo URL>` inside that folder, which saves the GitHub URL into your local Git config so your local repo knows where its remote counterpart lives. Before this step, your local repo had no idea GitHub existed.
- `--push` — immediately pushes all local commits to the newly created remote

This is the equivalent of manually creating a repo on GitHub, running `git remote add origin <url>`, and then `git push -u origin main` — all in one command.

---

## 27. Why were some files missing from GitHub after the initial push?

The files (like `NOTES.md`) were not in `.gitignore` — that wasn't the reason. The reason is that they had never been **committed**. When `gh repo create --push` ran, it only pushed commits that already existed. Since those files were still untracked, Git had no record of them and they never made it to GitHub.

The fix is to stage, commit, and push them:

```bash
git add .
git commit -m "Add notes, drizzle config, db schema, and MCP config"
git push
```

### What each command did here

**`git add .`**
Staged every untracked and modified file in the project — `NOTES.md`, `.mcp.json`, `drizzle/`, `src/db/`, and the rest. This moved them from "Git doesn't know about these" to "ready to be committed."

**`git commit -m "Add notes, drizzle config, db schema, and MCP config"`**
Created a snapshot of everything staged and saved it to the local Git history. The `-m` flag lets you write the commit message inline. At this point the changes still only exist locally.

**`git push`**
Sent the new commit to GitHub. This worked without specifying `origin main` because the branch already had an upstream set (from the earlier `gh repo create --push`), so Git knew where to send it.

After running all three, all 16 files were uploaded and the GitHub repo matched the local project.

---

## 28. What do `origin`, `main`, and "upstream" mean in Git?

### `origin` — the bridge

`origin` is just a **nickname** for the remote URL. Instead of typing the full URL every time:

```bash
git push https://github.com/diegoAI0923/liftingdiarycourse.git main
```

You can type:

```bash
git push origin main
```

`origin` is an alias for that long URL. You could rename it to anything — `github`, `myrepo`, `banana` — but `origin` is the universal convention so everyone uses it.

You can see what `origin` points to with:

```bash
git remote -v
```

Output:
```
origin  https://github.com/diegoAI0923/liftingdiarycourse.git (fetch)
origin  https://github.com/diegoAI0923/liftingdiarycourse.git (push)
```

It appears twice because Git tracks a URL for **fetching** (downloading changes) and one for **pushing** (uploading changes) — they're usually the same URL.

---

### `main` — the destination branch

When you push, Git needs to know which branch on GitHub to send your commits to. `main` on the GitHub side is the remote branch that mirrors your local `main`.

```
LOCAL                          GITHUB (origin)
──────                         ───────────────
main branch          ────▶     main branch
(on your machine)    push      (on GitHub)
```

A way to read `git push origin main` out loud:

> **"Push to `origin` (GitHub), targeting the `main` branch."**

- **`origin`** — the bridge (the GitHub URL nickname)
- **`main`** — the destination ("mirror my local `main` to the remote `main`")

They don't have to share the same name — you could push local `main` to a remote branch called `production` — but keeping them both `main` is standard convention.

**Why GitHub's `main` matters:**
- It's what GitHub displays by default when you open the repo
- It's what you pull from when downloading changes to another machine
- It's what deployment services like Vercel watch for changes

```
local main  →  git push  →  origin/main (GitHub)
local main  ←  git pull  ←  origin/main (GitHub)
```

---

### "Upstream" — the saved connection between branches

When you run `git push -u origin main` (the `-u` flag), Git writes a small config entry that says:

> "my local `main` corresponds to `main` on `origin`"

This is called setting the **upstream**. After it's set, plain `git push` works without you specifying `origin main` every time — Git already knows where to send the code.

Without an upstream set, Git would complain:
```
fatal: The current branch main has no upstream branch.
```

You can verify the upstream is set with:
```bash
git branch -vv
```

Output:
```
* main  319fe51 [origin/main] Add notes, drizzle config, db schema...
```

The `[origin/main]` confirms the upstream is set. You only need `-u` once per branch — after that, plain `git push` and `git pull` just work.

---

## 29. Why is the `.git` folder not visible in VS Code?

It's not because of `.gitignore` — that file only tells Git which files to ignore when committing, it has no effect on the VS Code UI.

The real reason is VS Code has a built-in setting called **`files.exclude`** that hides certain files and folders from the Explorer panel by default. Out of the box it includes:

```json
"files.exclude": {
  "**/.git": true
}
```

This is intentional — `.git` is an internal Git folder you rarely need to browse manually, so VS Code hides it to reduce noise in the file tree.

**To make it visible**, open VS Code settings (`Cmd + ,`), search for `files.exclude`, and remove or uncheck the `**/.git` entry.

But there's almost never a reason to do that — everything useful inside `.git` is exposed through VS Code's built-in Git UI (the Source Control panel) or via terminal commands like `git log`, `git remote -v`, etc.

### Does `.git` need to be added to `.gitignore`?

No. Git automatically ignores its own `.git` folder — it can never be committed or pushed to GitHub. Adding it to `.gitignore` would be redundant and wouldn't change anything. `.gitignore` is only needed for files Git *would* otherwise track, like `node_modules` or `.env`.

---

## 30. What's the difference between "Create Branch" and "Create Branch From..." in VS Code?

Both options are in the **Source Control** panel in VS Code:

- **Create Branch** — creates a new branch from **wherever you currently are**. If you're on `main`, it branches off `main`. If you're on another branch, it branches off that instead.
- **Create Branch From...** — lets you **explicitly choose** the starting point (main, another branch, a specific commit). Safer and more intentional.

The habit worth building is always using **"Create Branch From..."** and selecting `main` — that way it's always explicit and you never accidentally branch off the wrong place.

### Terminal equivalent

```bash
git checkout -b ui/new-visual-elements main
```

- `-b` — creates the new branch and switches to it in one step
- `ui/new-visual-elements` — the name of the new branch
- `main` — explicitly sets where to branch from (your golden reference)

### Does creating a branch locally publish it to GitHub automatically?

No — `git checkout -b <new_branch> main` only creates the branch **locally**. GitHub has no idea it exists yet.

To publish it to GitHub:

```bash
git push -u origin new-branch-name
```

The `-u` sets the upstream so future `git push` calls on that branch just work without specifying `origin branch-name` each time.

**Or** in VS Code, after creating the branch locally a **"Publish Branch"** button appears in the Source Control panel — clicking it does the same thing.

The full flow is always:

```
1. git checkout -b my-branch main    → creates branch locally
2. git add . + git commit            → saves changes locally
3. git push -u origin my-branch      → publishes branch to GitHub
```

### How to delete a branch

If you create a branch by mistake, switch back to `main` first, then delete it:

```bash
git checkout main
git branch -d branch-name
```

- `git checkout main` — switches to the `main` branch
- `git branch -d` — safe delete; won't let you delete a branch with unmerged commits

---

## 31. How do `async`, `Promise`, and `await` work?

These three concepts handle operations that take time (database queries, API calls) without freezing the app.

### The problem they solve

JavaScript is single-threaded — if it just waited doing nothing while a database query ran, the entire app would freeze. The solution: start the task, go do other things, come back when it's done.

### `Promise`

A `Promise` is an object that represents a value **that isn't available yet** but will be at some point. Like a restaurant ticket — you don't have the food yet, but you have a guarantee it's coming.

```ts
searchParams: Promise<{ date?: string }>
// "searchParams isn't the value yet — it will resolve to { date?: string }"
```

### `await`

`await` pauses execution **at that line only** until the Promise resolves, then gives you the actual value:

```ts
const { date } = await searchParams;
// searchParams was a Promise<{ date?: string }>
// after await, you have the actual { date?: string } object
```

Without `await`, you'd get the Promise object itself — not the data inside it.

### `async`

A function must be marked `async` to use `await` inside it. It also means the function itself returns a Promise automatically:

```ts
export default async function DashboardPage(...) {
  const { userId } = await auth();                    // wait for Clerk
  const { date }   = await searchParams;              // wait for searchParams
  const workouts   = await db.query.workouts...       // wait for DB
}
```

Each `await` pauses only that line — the rest of the server keeps handling other requests in parallel.

---

## 32. How does destructuring with TypeScript types work in function parameters?

This syntax does two things at once: **destructuring** and **TypeScript typing**.

### Step 1 — Without destructuring

```ts
function DashboardPage(props) {
  console.log(props.searchParams);
}
```

`props` is the object passed in. You access things on it with dot notation.

### Step 2 — With destructuring

```ts
function DashboardPage({ searchParams }) {
  console.log(searchParams); // no need for props.searchParams
}
```

`{ searchParams }` means: "pull `searchParams` out of the incoming object and give it its own variable."

### Step 3 — Adding TypeScript types

```ts
function DashboardPage({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
```

The `: { ... }` after the destructure is the type annotation for the entire props object.

### Step 4 — Split across lines for readability

```ts
export default async function DashboardPage({
  searchParams,        // ← destructured prop
}: {
  searchParams: Promise<{ date?: string }>;  // ← its type
}) {
```

Same thing — just formatted with line breaks.

### The type decoded

| Part | Meaning |
|---|---|
| `{ searchParams }` | Destructures `searchParams` out of props |
| `: { ... }` | TypeScript type for the whole props object |
| `Promise<...>` | Value is async — needs `await` |
| `{ date?: string }` | Once resolved, object with optional string `date` |
| `?` | `date` might not be present (URL has no `?date=` param) |

---

## 33. Is the props object created by TypeScript or sent by the user?

**The framework (Next.js) sends it automatically** — you never call a page component yourself.

```
User visits /dashboard?date=2026-03-01
        ↓
Next.js matches the route to src/app/dashboard/page.tsx
        ↓
Next.js calls DashboardPage({ searchParams: { date: "2026-03-01" } })
        ↓
Your function runs with the object already populated
```

**TypeScript's role is separate** — it doesn't create or send anything. It validates at compile time that you're using `searchParams` correctly (e.g. warns if you forget to `await` it or access a property that doesn't exist).

- **Next.js** → sends the props object at runtime
- **TypeScript** → validates you're using it correctly at compile time
- **You** → declare what shape you expect and destructure what you need

---

## 34. How do you know what props a component receives?

The answer depends on what kind of component you're in.

### Next.js page components

Next.js documents exactly what it injects. Pages can receive:

| Prop | What it contains |
|---|---|
| `searchParams` | URL query string as an object (`?date=2026-03-01` → `{ date: "2026-03-01" }`) |
| `params` | Dynamic route segments (`/dashboard/[id]` → `{ id: "123" }`) |

These are the only two Next.js injects into pages — anything else would be `undefined`.

### Your own components

You define the props yourself:

```ts
// you decided this prop exists
export default function DatePicker({ selectedDate }: { selectedDate: string }) {
```

Whoever calls `<DatePicker selectedDate="2026-03-01" />` is responsible for passing it. TypeScript will error if a required prop is missing or the wrong type is passed.

### How to know in practice

1. **Framework components** (pages, layouts) → check the Next.js docs
2. **Your own components** → you define the props; TypeScript enforces them
3. **Third-party components** → check their docs or hover over the component in VS Code — TypeScript shows accepted props inline

---

## 35. What is a good approach for giving Claude UI visual standards?

A `/docs/ui.md` file referenced in `CLAUDE.md` works well. Claude reads it before writing any code and follows the rules defined there.

The most reliable rules are **explicit prohibitions** — negative rules ("do NOT use lucide-react directly") are more reliable than positive ones ("prefer X"). Rules that are merely implied or inferred are more likely to be missed.

Things worth adding to `ui.md` to reduce corrections:
- **Layout patterns** — preferred max-width, spacing, and padding conventions
- **Variant conventions** — when to use `Badge variant="outline"` vs `"secondary"`, etc.
- **Explicit bans** — e.g. "Do NOT import icons from `lucide-react` directly. Icons are not shadcn components."

---

## 36. What is `"use client"` in Next.js?

A **directive** placed at the top of a file that marks it as a **Client Component** — meaning it runs in the browser, not on the server.

```tsx
"use client";
```

Next.js defaults all components to **Server Components** (run on the server, no access to browser APIs or React hooks). Adding `"use client"` opts the file out of that default.

**When it's required:**
- The component uses React state (`useState`, `useReducer`)
- The component uses React hooks that depend on the browser (`useEffect`, `useRef`)
- The component handles user events (`onClick`, `onChange`, etc.)
- The component uses browser-only APIs (`window`, `document`, etc.)

**When it's not needed:**
- The component just renders static HTML/JSX
- The component fetches data on the server
- The component has no interactivity

shadcn/ui adds `"use client"` automatically to components that require it (e.g. `popover.tsx`, `calendar.tsx`) because they depend on state for their open/close behavior. You don't need to add it yourself when installing those components.

---
*These notes were compiled during initial project setup and are safe to keep inside the `src/` folder or at the project root. They do not affect application functionality.*
