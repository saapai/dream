# AI Dreamer — Live & Working! 🎉

**Transform your ideas into working code with a single prompt.** AI Dreamer orchestrates **Mistral LLM → Design System → Code Generation → Live Deployment**.

## ✨ What's Working Right Now

- ✅ **Mistral Integration**: Smart planning and code generation
- ✅ **Design System**: 4 built-in presets (UCLA Spirit, Minimal, Brutalist, Material-ish)
- ✅ **Real-time UI**: 3-step workflow with live job tracking
- ✅ **Code Generation**: Creates Next.js components with CSS design tokens
- ✅ **Background Processing**: Async job orchestration with status updates

## 🚀 Quick Start

```bash
# 1. Clone and start everything
git clone <your-repo>
cd dream

# 2. Start AI Dreamer (includes Mistral API key)
./start.sh

# 3. Open http://localhost:3000 and start dreaming!
```

Or run manually:

```bash
# Backend with Mistral
cd server && source .venv/bin/activate
MISTRAL_API_KEY=deEC8929Ch2QvwsVSJGDW4sboSdWbwUm uvicorn app:app --reload

# Frontend
cd web && npm run dev
```

## 🎯 Try It Now

1. **Enter a prompt**: "Create a landing page for a UCLA club with events and email signup"
2. **Choose design**: Select "UCLA Blue & Gold" preset
3. **Watch the magic**: AI generates Next.js components with your design tokens
4. **Get results**: Real-time job status and generated code

## 📋 Current Features

- **Smart Planning**: Mistral analyzes your prompt and creates a development plan
- **Design Tokens**: 4 built-in design systems with CSS variables
- **Code Generation**: Creates React components, CSS, and Next.js structure
- **Job Tracking**: Real-time status updates and logs
- **Graceful Fallbacks**: Works even without GitHub/Vercel credentials

## 🔧 Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend       │    │   Integrations  │
│   (Next.js)     │◄──►│   (FastAPI)      │◄──►│                 │
│                 │    │                  │    │ • Mistral API   │
│ • 3-step UI     │    │ • Job Queue      │    │ • GitHub API    │
│ • Real-time     │    │ • Orchestrator   │    │ • Vercel API    │
│   Status        │    │ • Memory         │    │ • Figma API     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Quickstart

```bash
# 1) Backend
cd server
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # set tokens
uvicorn app:app --reload

# 2) Frontend
cd ../web
npm i
npm run dev
```

Backend will be at http://localhost:8000, frontend at http://localhost:3000.

## Flow

1. User enters a *dream prompt* in the UI.
2. `/dream` → Orchestrator calls LLM planner → creates a plan and job.
3. Orchestrator executes steps:
   - (optional) Pull Figma design metadata.
   - Generate code plan → open PR on GitHub (stubbed).
   - Trigger Vercel deploy (stubbed).
4. Job state is persisted to a simple JSON file DB (you can swap to Postgres easily).
5. UI polls `/jobs/{id}` for status/logs.

## Repo Map

```
/server
  app.py              # FastAPI, routes
  settings.py         # config
  models.py           # job model
  schemas.py          # Pydantic schemas
  dreamer/
    orchestrator.py   # main run loop for a job
    planner.py        # LLM -> plan
    memory.py         # simple JSON DB for jobs/logs
    integrators/
      figma.py        # Figma API stub
      github.py       # GitHub API stub
      vercel.py       # Vercel API stub
      llm.py          # LLM wrapper stub

/web
  pages/index.tsx     # basic UI
  components/JobStatus.tsx
  lib/api.ts          # tiny API client
  package.json
  tsconfig.json
```

## Notes

- Start simple. Replace the stubs step-by-step with real calls.
- For GitHub, prefer a GitHub App over PAT for long-term security.
- For Vercel deploys: create a project + link GitHub repo; then invoke the Vercel Deployments API.
- Observability: swap `memory.py` for a DB and add OpenTelemetry later.


**Tip:** Include a Figma file URL in your prompt to auto-discover components/styles.


**Design flow:** use `/design/options?figma_url=` to fetch presets and (optionally) Figma components; UI now lets users pick a preset which is baked into CSS tokens.
