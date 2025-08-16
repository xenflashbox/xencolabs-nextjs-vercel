Below is a concise yet comprehensive summary of the Shadcn UI MCP Server workflow (drawn from your transcript) followed by a step‑by‑step guide you can hand off to an LLM agent (e.g. in Cloud Code) to spin up the entire stack, configure your IDE/editor, plan and implement your UI, and then apply a custom theme via Tweak CN.

---

## Executive Summary

* **Shadcn UI MCP Server** is a Model Context Protocol server exposing all shadcn/ui v4 components, blocks (e.g. dashboards, login forms), demos, metadata, and directory structure to AI assistants and LLM‑powered tools ([GitHub][1]).
* **Core MCP tools**:

  * `list_components` / `get_component` / `get_component_demo` for individual components
  * `list_blocks` / `get_block` for compound blocks ([GitHub][1]).
* **Workflow**:

  1. **Plan in “store.md”**: Brainstorm UI/UX implementation with Claude (or your LLM), producing a high‑level UI structure document (no code yet).
  2. **Rule file**: Instruct your AI agent—on any Shadcn UI prompt—to automatically use the MCP server, prefer blocks, and always fetch the demo before coding.
  3. **Implement**: Have the LLM call `get_component_demo` and `get_block` step by step, inserting code into your React project.
  4. **Customize theme**: Use **Tweak CN**’s visual editor to generate Tailwind‑based theme settings, then install via the CLI snippet it provides ([tweakcn][2]).

---

## Step‑by‑Step Implementation Guide

### 1. Prerequisites

* **Node.js ≥ 18.x** and **npx** available ([GitHub][1]).
* A **GitHub Personal Access Token** (classic, no scopes) for 5 000 req/hr:

  ```bash
  # In GitHub: Settings → Developer settings → Personal access tokens → Generate new (classic)
  # Copy token (ghp_xxx); you won’t see it again.
  ```

### 2. Initialize Your Project & Install shadcn/ui

```bash
# If you’re starting from scratch:
npx create-next-app@latest my‑app
cd my‑app

# Install shadcn/ui CLI
npm install -D shadcn-ui
npx shadcn-ui init
```

*(Follow prompts to select components)* ([GitHub][1]).

### 3. Install & Run the MCP Server

#### Quick Start via npx

```bash
# Without token (60 req/hr):
npx @jpisnice/shadcn-ui-mcp-server

# With token (recommended – 5 000 req/hr):
npx @jpisnice/shadcn-ui-mcp-server --github-api-key ghp_xxx
```

—or— set env var in your shell:

````bash
export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxx
npx @jpisnice/shadcn-ui-mcp-server
``` :contentReference[oaicite:5]{index=5}.

### 4. Configure Your AI/IDE Environment
Choose your integration; below are two examples:

#### A. Cursor (Global)
In your Cursor settings:
```jsonc
// Settings → mcpServers
{
  "shadcn-ui": {
    "command": "npx",
    "args": ["@jpisnice/shadcn-ui-mcp-server", "--github-api-key", "ghp_xxx"]
  }
}
````

—or—workspace `.cursorrules`:

````jsonc
{
  "mcpServers": {
    "shadcn-ui": {
      "command": "npx",
      "args": ["@jpisnice/shadcn-ui-mcp-server"]
    }
  }
}
``` :contentReference[oaicite:6]{index=6}.

#### B. VS Code (Continue Extension)
1. Install **Continue** extension.  
2. In your **settings.json**:
   ```jsonc
   {
     "continue.server": {
       "mcpServers": {
         "shadcn-ui": {
           "command": "npx",
           "args": ["@jpisnice/shadcn-ui-mcp-server", "--github-api-key", "ghp_xxx"]
         }
       }
     }
   }
   ``` :contentReference[oaicite:7]{index=7}.

*(Other integrations: Claude, Continue.dev, Claude Desktop all follow the same pattern.)*

### 5. Explore Components & Blocks
In your AI prompt, call:
```json
{ "tool": "list_components", "arguments": {} }
{ "tool": "list_blocks",     "arguments": {} }
````

to discover available UI pieces ([GitHub][1]).

### 6. Create Your Rule File

Save a JSON/YAML file (e.g. `shadcn.rules.json`) with:

```jsonc
{
  "onTask": [
    {
      "when": "working with shadcn/ui",
      "useMCP": "shadcn-ui",
      "prefer": { "blocks": true, "components": true },
      "beforeCode": "get_component_demo"
    }
  ]
}
```

This ensures your agent always fetches demos and blocks first (per your transcript workflow).

### 7. Plan Your UI (“Context Engineering”)

1. **Prompt your LLM** with:

   > “Using the MCP server and the `store.md` in the repo, generate a UI/UX implementation plan for a dashboard with sidebar navigation, top bar with search, and a data table. Only list component/block names and their placement—no code yet.”
2. **Review** the returned plan, adjust as needed.

### 8. Implement the Plan

For each item in the plan:

1. **Fetch usage**:

   ```json
   { "tool": "get_component_demo", "arguments": { "componentName": "data-table" } }
   ```
2. **Insert code**: copy the demo snippet into your React component file.
3. **Repeat** for blocks:

   ```json
   { "tool": "get_block", "arguments": { "blockName": "dashboard-01" } }
   ```

This ensures error‑free, production‑ready code on the first try (per your demo) ([GitHub][1]).

### 9. Customize Your Theme with Tweak CN

1. **Go to** [tweakcn.com/editor/theme](https://tweakcn.com) and adjust colors, fonts, radii, etc. in real time.
2. **Click “Code”** → copy the CLI command (e.g. `npx shadcn-ui-theme install --theme-id=abc123`).
3. **Run** in your project:

   ```bash
   npx shadcn-ui-theme install --theme-id=abc123
   ```
4. If your AI agent needs help, hand it the snippet:

   > “Modify `tailwind.config.js` and `themes/abc123.ts` as shown above to apply the custom theme.” ([tweakcn][2]).

### 10. Best Practices & Troubleshooting

* **Always use your GitHub token** to avoid rate limits ([GitHub][1]).
* **Prefer blocks** for complex pages—they’re pre‑wired combinations of components.
* **Fetch demos first** to eliminate guesswork.
* **Keep your rule file updated** so the agent never strays.
* **Debug mode**:

  ```bash
  DEBUG=* npx @jpisnice/shadcn-ui-mcp-server
  ```
* **Proxy issues**:

  ````bash
  export HTTP_PROXY=http://… HTTPS_PROXY=http://…
  ``` :contentReference[oaicite:12]{index=12}.
  ````

---

Once you’ve confirmed access and tokens, you can hand your cloud‑code AI a single prompt like:

> “Bootstrap a Next.js app with shadcn/ui, configure the Shadcn MCP server at `npx @jpisnice/shadcn-ui-mcp-server --github-api-key $GITHUB_TOKEN`, load the `shadcn.rules.json` for context, generate a dashboard page per `store.md`, implement all components via `get_component_demo`, then apply the Tweak CN theme with ID `abc123`.”

That one prompt will trigger the entire workflow above. Let me know if you need any additional details or customizations!

[1]: https://github.com/Jpisnice/shadcn-ui-mcp-server "GitHub - Jpisnice/shadcn-ui-mcp-server: A mcp server to allow LLMS gain context about shadcn ui component structure,usage and installation"
[2]: https://tweakcn.com/?utm_source=chatgpt.com "Beautiful themes for shadcn/ui — tweakcn | Theme Editor & Generator"
