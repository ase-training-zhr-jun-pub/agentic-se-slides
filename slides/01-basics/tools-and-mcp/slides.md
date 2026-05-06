---
layout: intro
background: apricot
---

### *Let's talk about*
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

<h4 class="text-center">Giving an<br/>agent the<br/><em>ability to act</em></h4>


---

# Tool-Use in Action

<div class="flex justify-center">

```mermaid {scale: 0.5}
sequenceDiagram
  participant U as User
  participant A as Agent
  participant L as LLM
  
  autonumber
  
  U ->> A: Request / Task (Prompt)
  Note right of A: Agent knows available tools<br/>(Name, Params, Description)
  A ->> L: Context: Tool list & Prompt
  L ->> A: Tool call (name, params)
  Note over A: Agent executes the tool internally
  A ->> L: Tool result (raw data)
  L ->> A: Final answer based on tool results
  A ->> U: Final answer
```

</div>

---
footerLink: https://modelcontextprotocol.io/specification
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
  <img src="./assets/mcp-bsp.png" class="w-full object-contain" />
</div>

<!--
MCP ist ein offenes Protokoll von Anthropic, das den Austausch von Tools zwischen Hosts und Servern standardisiert.

Statt jedem Agenten eigene Tool-Adapter zu schreiben, kann ein MCP-Server einmal implementiert und von beliebigen Clients genutzt werden.

Der entscheidende Vorteil: Tool-Definitionen (Name, Parameter, Beschreibung) werden zur Laufzeit vom Server geliefert – der Agent muss sie nicht hart kodieren.
-->

---

# Tool-Call using an MCP-Server

<div class="flex justify-center">

```mermaid {scale: 0.5}
sequenceDiagram
  participant U as User
  participant A as Agent
  participant S as MCP Server
  participant L as LLM

  autonumber

  U ->> A: Request / Task (Prompt)
  Note right of A: Agent still knows its own tools
  A -->> S: Discover tools (list, schemas, capabilities)
  S -->> A: Tool registry (names, params, metadata)
  A ->> L: Context: Tool list (incl. Tools from MCP) & Prompt 
  L ->> A: Tool call (name, params)
  A ->> S: Execute tool via MCP (name, params)
  S ->> A: Tool result (raw data)
  A ->> L: Tool result (raw data)
  L ->> A: Final answer based on tool results
  A ->> U: Final answer
```

</div>
