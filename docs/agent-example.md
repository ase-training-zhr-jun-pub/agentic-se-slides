# Example Agent

A minimal TypeScript agent using the Claude API. Demonstrates the control loop
(Reason → Act → Observe) with two file-system tools.

## Prerequisites

```bash
npm install @anthropic-ai/sdk
export ANTHROPIC_API_KEY=sk-ant-...
```

## Code

```typescript
import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";

const client = new Anthropic();

// --- Tool definitions ---

const tools: Anthropic.Tool[] = [
  {
    name: "read_file",
    description: "Read the content of a file from the filesystem.",
    input_schema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Relative path to the file" },
      },
      required: ["path"],
    },
  },
  {
    name: "write_file",
    description: "Write content to a file on the filesystem.",
    input_schema: {
      type: "object",
      properties: {
        path:    { type: "string", description: "Relative path to the file" },
        content: { type: "string", description: "Content to write" },
      },
      required: ["path", "content"],
    },
  },
];

// --- Tool execution (the "Act" step) ---

function executeTool(name: string, input: Record<string, string>): string {
  if (name === "read_file") {
    try {
      return fs.readFileSync(input.path, "utf-8");
    } catch {
      return `Error: file not found – ${input.path}`;
    }
  }

  if (name === "write_file") {
    fs.writeFileSync(input.path, input.content, "utf-8");
    return `Written ${input.content.length} chars to ${input.path}`;
  }

  return `Unknown tool: ${name}`;
}

// --- The agentic loop ---

async function runAgent(task: string) {
  console.log(`\nTask: ${task}\n`);

  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: task },
  ];

  // Control loop: Reason → Act → Observe (repeat until done)
  while (true) {
    const response = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 4096,
      system: [
        {
          type: "text",
          text: "You are a file-system agent. Use the provided tools to complete tasks. When you are done, respond with a short summary – no tool calls.",
          // Prompt caching: the system prompt is stable across turns
          cache_control: { type: "ephemeral" },
        },
      ],
      tools,
      messages,
    });

    // Reason: what did the model decide?
    for (const block of response.content) {
      if (block.type === "text" && block.text) {
        console.log("Agent:", block.text);
      }
    }

    // Done?
    if (response.stop_reason === "end_turn") break;

    // Act + Observe: execute every tool the model requested
    const toolResults: Anthropic.ToolResultBlockParam[] = [];

    for (const block of response.content) {
      if (block.type !== "tool_use") continue;

      console.log(`  → ${block.name}(${JSON.stringify(block.input)})`);
      const result = executeTool(block.name, block.input as Record<string, string>);
      console.log(`  ← ${result}`);

      toolResults.push({
        type: "tool_result",
        tool_use_id: block.id,
        content: result,
      });
    }

    // Feed observations back into the context
    messages.push({ role: "assistant", content: response.content });
    messages.push({ role: "user",      content: toolResults });
  }
}

// --- Run ---

runAgent("Create a file hello.txt that contains a friendly greeting, then read it back and confirm its content.");
```

## What this shows

| Concept | Where |
|---|---|
| **Tool definitions** | `tools` array – name, description, JSON schema |
| **Control loop** | `while (true)` – loops until `stop_reason === "end_turn"` |
| **Reason** | Model decides which tool to call (or finishes) |
| **Act** | `executeTool()` runs the tool |
| **Observe** | Result is appended as `tool_result` and fed back to the model |
| **Prompt caching** | `cache_control` on the system prompt – cached across turns |

## Example output

```
Task: Create a file hello.txt that contains a friendly greeting, …

  → write_file({"path":"hello.txt","content":"Hello! Have a great day 👋"})
  ← Written 26 chars to hello.txt
  → read_file({"path":"hello.txt"})
  ← Hello! Have a great day 👋
Agent: Done! I wrote the greeting to hello.txt and confirmed it reads back correctly.
```
