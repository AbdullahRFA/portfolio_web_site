# 🌌 Abdullah Nazmus-Sakib | Cyberpunk Engineering Portfolio & Core Terminal Dashboard

A high-fidelity, cyberpunk-themed engineering portfolio and production-ready content management system. Engineered to showcase full-stack technical capability, interactive case studies, and automated pipeline integration.

---

## 📖 Overview

### What the Project Does

This project serves as an immersive digital workspace and terminal dashboard. It dynamically serves showcase elements including engineering projects, an interactive skills array, live publications, an open guestbook ledger, and a direct communication tunnel. It features an authenticated administrative control panel allowing real-time modification of the site's database rows without requiring raw table access or redeployments.

### Why It Was Built

Traditional static portfolios quickly become stale and require manual code changes or redeployments to update content. This system was built to combine high-performance, edge-rendered frontend micro-interactions with a decoupled, fully autonomous serverless database system. It demonstrates a practical application of Next.js 16 app routers, parallel asynchronous database fetching, secure server actions, and third-party communication layers.

### Main Objectives

* **Real-Time Rendering:** Bypass standard static compilation states using `force-dynamic` parameters to guarantee fresh database retrievals on every unique request.
* **Operational Control:** Centralize data entry through a secure administrative interface authenticated via HTTP-only web states.
* **Architectural Fluidity:** Orchestrate hardware-accelerated micro-animations using masonry layouts and spring-stiffness physics vectors.

---

## ✨ Features

* **⚡ Parallel Data Execution Pipeline:** Leverages `Promise.all` directly inside asynchronous Server Components to resolve projects, blogs, credentials, and work history records simultaneously, minimizing cumulative layout shift and server turnaround latency.
* **🏗️ Masonry Technical Bento Toolkit:** An interactive capability board displaying development tooling, software quality assurance frameworks, and engineering languages, configured to pack cards cleanly using responsive CSS masonry columns.
* **🎛️ Multipurpose Showcase Matrix:** Provides localized filtering across frontend, distributed systems, mobile frameworks, and hardware architectures using integrated state trackers and layout animations.
* **🔒 Secure Administrative Interface:** Includes protected control panels allowing full entry insertion, mutation, and destruction across all structural data sections.
* **✉️ Dual-Route Communication Pipeline:** Accepts data via a client validation layer, records entries permanently to transactional storage tables, and uses server-side runners to route alerts directly to an external mailbox using the Resend API protocol.

---

## 🏗️ System Architecture

The project leverages a serverless architecture designed for rapid edge rendering, stateless verification, and event-driven automation.

```
┌────────────────────────────────────────────────────────┐
│                    Client Browser                      │
└───────────────────────────┬────────────────────────────┘
                            │
               HTTPS / Server Actions / API Requests
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Next.js 16 Engine                    │
│      ┌────────────────────────┬──────────────────────┐ │
│      │     Server Actions     │     Route Handlers   │ │
│      │    (adminCrud.ts)      │    (/api/contact)    │ │
│      └───────────┬────────────┴───────────┬──────────┘ │
└──────────────────┼────────────────────────┼────────────┘
                   │                        │
       PostgreSQL Transaction      Resend REST Dispatch
                   │                        │
                   ▼                        ▼
┌───────────────────────────────┐ ┌──────────────────────┐
│       Supabase Database       │ │   Resend SMTP Edge   │
└───────────────────────────────┘ └──────────────────────┘

```

### Component Tiers

* **Frontend Interface:** Rendered using React and Next.js utilizing Tailwind CSS configurations for thematic styling and Framer Motion spring modules for smooth animations.
* **Backend Server Layer:** Next.js Server Actions and explicit Route Handlers operating within Vercel's serverless micro-runtime environment.
* **Data Tier:** Supabase cloud management instances running transactional PostgreSQL engines.
* **APIs & Outbound Channels:** Connection links established with the Resend mailing engine for notification dispatch.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 16 (App Router), React, Tailwind CSS, Framer Motion
* **Backend:** Next.js Server Actions, Next.js API Route Handlers
* **Database:** Supabase (PostgreSQL)
* **Authentication:** Custom admin verification leveraging HTTP-Only, secure session-tracking cookies
* **Notification Engine:** Resend Node SDK
* **Development / Stacking Tooling:** TypeScript, Next.js Turbopack compiler, Git

---

## 📂 Project Structure

```
portfolio-2026/
├── src/
│   ├── actions/          # Next.js server actions executing database CRUD operations
│   │   └── adminCrud.ts
│   ├── app/              # Core App Router directory mapping pages, layouts, and API routes
│   │   ├── admin/        # Dashboard view structures and record management forms
│   │   ├── api/          # Public and system service JSON endpoints
│   │   ├── favicon.ico   # Legacy icon graphic fallback
│   │   ├── globals.css   # Main CSS configuration file
│   │   ├── icon.png      # Custom workspace favicon asset
│   │   ├── layout.tsx    # App shell, base typography, and SEO metadata
│   │   └── page.tsx      # Landing page orchestrating asynchronous component fetches
│   ├── components/       # Presentation components (showcases, forms, layout elements)
│   ├── lib/              # Client instances, mock data types, and storage definitions
│   │   └── supabase.ts
│   └── types/            # Application data TypeScript types and interfaces
├── package.json
└── README.md

```

---

## ⚙️ Installation Guide

### Prerequisites

* Node.js runtime environment (v18.17.0 or greater recommended)
* An active Supabase project instance containing standard data tables
* A Resend developer API authentication key token

### Clone Repository

```bash
git clone https://github.com/AbdullahRFA/portfolio_web_site.git
cd portfolio_web_site

```

### Install Dependencies

```bash
npm install

```

### Environment Variables

Create a file named `.env.local` in the root directory and populate it with the following keys:

| Environment Variable Name | Purpose / Function | Source / Retrieval Location |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public cloud endpoint path for your Supabase project instance | Supabase Project API Settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anonymous browser-safe database interaction public signature token | Supabase Project API Settings |
| `RESEND_API_KEY` | Private server token string authorizing outbound emails | Resend Developer Dashboard |

### Run Project Locally

To run the local development engine utilizing Next.js Turbopack compilation optimization, execute:

```bash
npm run dev

```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) inside your web browser to review the local build.

---

## 🚀 Usage Guide

### Interacting with the Main Interface

* **Projects Filter:** Click categories like "Web Architecture" or "Mobile Apps" inside the Featured Projects component to filter items live using Framer Motion micro-animations. Clicking a card triggers a modal overlay rendering detailed descriptions and source repository access links.
* **Connecting:** Fill out the forms in the Contact component. Submitting triggers an immediate background insertion to your Supabase tables while routing an email alert to the admin's inbox.

### Administrative Operations

1. Navigate to `/admin/login`.
2. Provide the secret administrative passphrase token to establish an authorized HTTP cookie session state.
3. Access individual operational routes like `/admin/projects` or `/admin/blogs` to create new entries or edit existing data fields via server action triggers.

---

## 📸 Screenshots

## 📸 Screenshots

| Home | About | 
|:---:|:---:|
| <img src="portfolio-2026/public/Screenshots/Screenshot 2026-06-20 at 9.37.53 AM.png" width="400"> | <img src="portfolio-2026/public/Screenshots/Screenshot 2026-06-20 at 5.43.58 PM.png" width="400"> |

| Projects | Skills | 
|:---:|:---:|
| <img src="portfolio-2026/public/Screenshots/Screenshot 2026-06-20 at 5.44.27 PM.png" width="400"> | <img src="portfolio-2026/public/Screenshots/Screenshot 2026-06-20 at 5.44.52 PM.png" width="400"> |

| Certifications | Blogs | 
|:---:|:---:|
| <img src="portfolio-2026/public/Screenshots/Screenshot 2026-06-20 at 5.45.16 PM.png" width="400"> | <img src="portfolio-2026/public/Screenshots/Screenshot 2026-06-20 at 5.45.36 PM.png" width="400"> |

| Guestbooks & Contact| 
|:---:|
| <img src="portfolio-2026/public/Screenshots/Screenshot 2026-06-20 at 5.46.14 PM.png" width="520"> | <img src="portfolio-2026/public/Screenshots/Screenshot 2026-06-20 at 5.45.36 PM.png" width="400"> |



---

## 🔌 API Documentation

### Contact Submission Route

* **Endpoint:** `/api/contact`
* **Method:** `POST`
* **Request Body Type:** `application/json`

**Request Body Structure:**

```json
{
  "name": "Alex Mercer",
  "email": "alex@infrastructure.io",
  "message": "Encountered your systems portfolio framework. Are you open to custom architecture consultation?"
}

```

**Response Example (201 Created):**

```json
{
  "success": true,
  "message": "Message received and transmission synchronized!"
}

```

---

## 🗄️ Database Design

The system maps properties directly onto relational Supabase operational storage tables.

### Core Schema Collections

* **`home_page`**: Tracks main hero parameters, bio descriptions, role lists, and cv location paths.
* **`projects`**: Schema tracking development elements (title, description, long_description, image_url, tech_stack, live_url, github_url, sort_order).
* **`blogs`**: Storage for articles (slug, title, excerpt, date, category, reading_time, content, image_url, sort_order).
* **`messages`**: Log tracking connection details (name, email, message, created_at).
* **`certifications` / `experiences` / `education**`: Tables tracking credential badges, professional employment timelines, and educational history.

---

## 🔐 Security Features

* **HTTP-Only Session Cookies:** Administrative authentication states are verified securely on the server via HTTP-Only cookies (`admin_auth`) that cannot be accessed by client-side browser scripts, mitigating Cross-Site Scripting (XSS) session theft.
* **Strict Server Input Validation:** The contact route handles inputs using strict runtime assertions to ensure requests contain complete, valid body text before executing database queries or out-of-network communication runs.
* **Parameterized SQL Queries:** Supabase client calls are handled using parameterized object abstractions, protecting data rows against SQL Injection attacks out-of-the-box.

---

## 🧪 Testing

### Manual & Automation Architecture

The codebase is structured to facilitate integration testing using frameworks like Playwright for end-to-end user flows and Postman for verification of REST endpoints.

### Key Verification Protocols

* **Contact Form Transmission:** Verifies data validation logic and ensures successful API integration with Supabase data tables and the Resend notification delivery queue.
* **State Route Mutation Blockers:** Confirms unauthorized client requests attempting to trigger data mutation Server Actions are blocked without a verified administrative cookie value.

---

## 📈 Future Improvements

* **Authentication Upgrade:** Replace basic cookie tracking configurations with comprehensive Supabase Auth or multi-factor OAuth workflows.
* **Dynamic Markdown Rendering:** Add full MDX syntax parsing inside the `BlogShowcase` modal container to allow structured code block highlighting, embedded media components, and links within articles.
* **Automated Storage Buckets:** Integrate Supabase Storage API buckets directly into the Admin file inputs, automating image asset rendering and CDN distribution management.

---

## 🤝 Contributing

Contributions are welcome! If you want to refine components, enhance theme logic, or optimize database handlers:

1. Fork the repository.
2. Create a descriptive branch (`git checkout -b feature/OptimizedBentoLayout`).
3. Commit your modifications cleanly.
4. Push your updates to your branch (`git push origin feature/OptimizedBentoLayout`).
5. Open a Pull Request describing your changes.

---

## 👨‍💻 Author

**Abdullah Nazmus-Sakib**

* **Role:** Computer Science & Engineering Undergraduate Developer
* **Specializations:** Cross-Platform Mobile Applications & Software Quality Assurance Pipeline Automation
* **GitHub:** [@AbdullahRFA](https://github.com/AbdullahRFA)

---

## 📄 License

This system portfolio codebase is distributed open-source under the terms of the **MIT License**. You are free to copy, modify, and distribute the code for personal or commercial projects. Refer to the base repository declarations for detailed permissions guidelines.