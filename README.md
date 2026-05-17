<h1 align="center">Your APIs. Handled For You.</h1>

<p align="center">
  Artery is an AI-powered API workflow tool built for macOS — with Docker, snapshots, and more.<br/>
  This extension connects your VS Code AI agent directly to Artery, so it can create collections, send requests, read responses, and manage environments — all without leaving your editor.
</p>

<p align="center">
  <strong>No files to configure. Just install and go.</strong>
</p>

---

## Setup

**1. Open the Artery app**

**2. Turn on the AI server**

Click the MCP icon in the Artery toolbar. When it turns **green**, the AI server is on and ready.

<p align="center">
  <img src="images/ai-server-on.png" width="320" alt="Artery AI server turned on — green icon" />
</p>

> Red means off. Green means on.

**3. Install this extension in VS Code**

That's it — your AI agent now has access to your Artery workspace.

---

## What your agent can do

### Allowed by default

| Tool | Description |
|---|---|
| **list_folders** | List all folders and collections in Artery |
| **read_folder** | See all requests inside a specific folder |
| **create_folder** | Create a new folder or nested subfolder |
| **rename_item** | Rename a request or folder |
| **move_items** | Move a folder or request to a different location |
| **delete_folder** | Delete a folder and everything inside it |
| **create_request** | Create an API request with URL, method, body, and content type |
| **modify_request** | Update URL, method, body, or content type on an existing request |
| **delete_request** | Delete a request |
| **send_request** | Execute a stored request and return the live response |
| **read_response** | Read the last saved response — status, body, headers, and timing |

---

### Requires user permission

These tools are gated behind toggles in **Artery Settings → AI Permissions**. Your agent will tell you if one needs to be enabled.

<p align="center">
  <img src="images/AI Permissions.png" width="500" alt="Artery AI Permissions settings" />
</p>

#### Log Access

Allows the agent to read logs from your running backend.

| Tool | Description |
|---|---|
| **read_docker_logs** | Read recent logs from the Docker container connected in Artery |
| **read_terminal_logs** | Read recent logs from the terminal session running in Artery |

#### Secret Access

Allows the agent to read and write auth credentials on requests (bearer tokens, API keys, basic auth).

| Tool | Description |
|---|---|
| **create_request** | Accepts auth fields when Secret Access is on |
| **modify_request** | Can update auth fields when Secret Access is on |

#### Environment Access

Allows the agent to read and manage your environments and variables.

| Tool | Description |
|---|---|
| **list_environments** | List all environments (returns id and name) |
| **read_environment** | Get the full details of an environment including all variables |
| **create_environment** | Create a new environment |
| **rename_environment** | Rename an existing environment |
| **delete_environment** | Delete an environment and all its variables |
| **create_variable** | Add a new variable to an environment |
| **modify_variable** | Update the key or value of an existing variable |
| **move_variable** | Move a variable from one environment to another |
| **delete_variable** | Delete a variable from an environment |

---

## Requirements

- macOS
- [Artery](https://prodartery.com) installed
- VS Code 1.99+

