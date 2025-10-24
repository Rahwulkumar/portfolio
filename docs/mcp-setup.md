# MCP Server Setup Guide

Use this reference when you want to activate any of the MCP servers defined in `.cursor/mcp.json`. Replace every `<your-token>` placeholder with a real secret before launching Cursor with MCP support.

| Server         | Purpose                                                           | Secrets Needed                                                                                                                     | Where to Configure                                                                                                                           |
| -------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `shadcn`       | Browse the shadcn/ui component registry and implementation notes. | None.                                                                                                                              | Ready to use.                                                                                                                                |
| `github`       | Query GitHub repos, commits, issues for activity panels.          | `GITHUB_PERSONAL_ACCESS_TOKEN`, `GITHUB_USERNAME` (token scopes: `repo`, `read:user`, `read:org` if private org data is required). | Update `.cursor/mcp.json` env block. Store the real token in a secure secret manager and inject at runtime (e.g., shell env, 1Password CLI). |
| `supabase`     | Interact with Supabase SQL, storage, and auth APIs.               | `SUPABASE_SERVICE_ROLE_KEY` (read/write). Supabase URL and anon key remain in `.env.local`.                                        | Replace `--access-token <your-token>` in `.cursor/mcp.json`. Keep the same value in `.env.local` (`SUPABASE_SERVICE_ROLE_KEY`).              |
| `prisma-local` | Run Prisma schema tooling over the local database.                | None (uses your local Prisma CLI).                                                                                                 | Ensure `prisma` is installed (Phase 02).                                                                                                     |
| `postgres`     | Direct Postgres queries without Supabase client.                  | Full connection string (e.g., `postgresql://user:pass@host:5432/db?sslmode=require`).                                              | Substitute the placeholder string in `.cursor/mcp.json`. Match the same value in `.env.local` if the backend needs it.                       |
| `git`          | Access git history, diffs, blame inside Cursor.                   | None.                                                                                                                              | Works once you open the repo.                                                                                                                |
| `fetch`        | Perform HTTP requests (useful for API experiments).               | None.                                                                                                                              | Works without extra config.                                                                                                                  |

## Quick Activation Checklist

1. Copy `.cursor/mcp.json` into your local Cursor config folder (or symlink this repo).
2. Export secrets in your shell session before launching Cursor, or configure them through Cursor's “Server Environments” UI:
   ```powershell
   setx GITHUB_PERSONAL_ACCESS_TOKEN "ghp_xxx"
   setx GITHUB_USERNAME "rahwulkumar"
   setx SUPABASE_SERVICE_ROLE_KEY "sbp_xxx"
   setx SUPABASE_URL "https://<project>.supabase.co"
   setx SUPABASE_ANON_KEY "supabase-anon"
   ```
3. For Supabase, prefer using the **service role key** for MCP access (read + write). Keep the anon key in `.env.local` for client-side usage.
4. When rotating secrets, update both `.env.local` and the MCP env configuration at the same time.
5. Restart Cursor after editing `.cursor/mcp.json` so the new servers load.

## Token Management Tips

- Store long-lived secrets in 1Password, Bitwarden, or Windows Credential Manager instead of plain text.
- Use different PATs for automation vs. personal use to simplify revocation.
- Restrict Supabase service-role keys; create read-only keys if MCP sessions only require SELECT access.
- Keep `GITHUB_USERNAME` aligned between `.env.local` and repository secrets so automation scripts work everywhere.
- For local experimentation, you can keep secrets in `.env.local`, then source them into your shell before launching Cursor:
  ```powershell
  foreach ($line in Get-Content .env.local) {
    if ($line -match "^(.*?)=(.*)$") {
      setx $Matches[1] $Matches[2]
    }
  }
  ```
- Never commit populated secrets—`.env.local` stays untracked, and `.cursor/mcp.json` should only contain placeholders.

Refer back to this file whenever you need to refresh or rotate tokens for MCP integrations.
