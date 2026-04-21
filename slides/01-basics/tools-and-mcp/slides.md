---
layout: center
background: apricot
---

# Tools


---
layout: sidebar
sidebarBackground: petrol
image: /backgrounds/4.webp
---

# Tool-Use

- An agent adds a list of available tools to the context
- The LLM will respond with a special syntax to call the desired tool
- Tools can be used to...
  - read the content of a file
  - create or change a file
  - retrieve diagnostics from the IDE
  - use a basic web browser
- The result from a tool will be sent back to the LLM

::sidebar::

<h3 class="text-center">Giving an<br/>agent the<br/><em>ability to act</em></h3>


---

# Tool-Use in Action

```mermaid
sequenceDiagram
  participant U as User
  participant A as Client
  participant L as LLM
  
  autonumber
  
  U ->> A: Request / Task (Prompt)
  Note right of A: Agent knows available tools<br/>(Name, Params, Description)
  A ->> L: Context: Tool list & Prompt
  L ->> A: Tool call (name, params)
  Note over A: Agent executes the tool internally
  A ->> L: Tool result (raw data)
  L ->> U: Final answer including integrated results
```


---

# Model Context Protocol (MCP)

<div class="grid grid-cols-2 gap-8">
<div>

- A protocol created by Anthropic
- Standardizes tool discovery
- Local and remote MCP Servers
- Protocol defines
  - Transport Layer (STDIO / HTTP)
  - Data Layer
    - Lifecycle Management
    - Server Features
    - Client Features
    - Utility Features

</div>
<div class="flex flex-col items-center justify-center text-sm">
  <div class="border border-petrol rounded p-4 w-full text-center">
    <div class="mb-2">MCP Host (Assistant)</div>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-apricot text-white rounded px-3 py-2">MCP Client 1</div>
      <div class="bg-apricot text-white rounded px-3 py-2">MCP Client 2</div>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-4 w-full my-2 text-center">
    <div>↓ STDIO</div>
    <div>↓ HTTP</div>
  </div>
  <div class="grid grid-cols-2 gap-4 w-full text-center">
    <div class="bg-apricot text-white rounded px-3 py-2">MCP Server 1<br/><span class="text-xs opacity-80">File System</span></div>
    <div class="bg-apricot text-white rounded px-3 py-2">MCP Server 2<br/><span class="text-xs opacity-80">Jira</span></div>
  </div>
</div>
</div>

<!--
MCP hat inzwischen den Retrieval Part ersetzt.

Deswegen gehen wir auf den nicht weiter ein
-->

---

# Tool-Call using an MCP-Server

```mermaid
sequenceDiagram
  participant U as User
  participant A as Agent
  participant S as MCP Server
  participant L as LLM

  autonumber

  U ->> A: Request / Task (Prompt)
  Note right of A: Agent knows available tools<br/>(Name, Params, Description)
  A ->> S: Discover tools (list, schemas, capabilities)
  S -->> A: Tool registry (names, params, metadata)
  A ->> L: Context: Tool list & constraints (incl. MCP registry)
  L ->> A: Tool call (name, params)
  A ->> S: Execute tool via MCP (name, params)
  S ->> A: Tool result (raw data)
  A ->> L: Tool result (raw data)
  L ->> U: Final answer including integrated results
```

