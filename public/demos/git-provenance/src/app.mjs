import { provenanceKind } from "./provenance.mjs";

let events = {
  "agent-1": {
    id: "agent-1",
    actor: "agent",
    actorName: "Codex",
    time: "10:42 AM",
    title: "Introduced signal-aware evaluation",
    operation: "Inserted 9 lines",
    model: "GPT-5",
    prompt: "Update escalation logic to consider critical risk signals, while keeping the public API straightforward.",
    response: "I’ll replace the single-score check with a typed decision function and include blocking signals in the result.",
    tool: "apply_patch · src/evaluateRisk.ts",
    hash: "6de9a8f",
    filePath: "src/evaluateRisk.ts",
    before: `export function shouldEscalate(score: number) {
  return score > 0.62;
}`,
    after: `export function evaluateRisk(score, signals) {
  const blockingSignals = signals.filter(isCritical);
  return score >= 0.62 || blockingSignals.length >= 2;
}`
  },
  "human-1": {
    id: "human-1",
    actor: "human",
    actorName: "Ben Harris",
    time: "10:47 AM",
    title: "Adjusted threshold and naming",
    operation: "Modified 2 spans",
    prompt: null,
    response: "Raised the escalation threshold to 0.7 and renamed the derived signal collection for clarity.",
    tool: "VS Code save · 2 edits",
    hash: "82b37c1",
    filePath: "src/evaluateRisk.ts",
    before: `const blockingSignals = signals.filter(isCritical);
return score >= 0.62 || blockingSignals.length >= 2;`,
    after: `const criticalSignals = signals.filter(isCritical);
return score >= 0.7 || criticalSignals.length >= 2;`
  },
  "agent-2": {
    id: "agent-2",
    actor: "agent",
    actorName: "Codex",
    time: "10:51 AM",
    title: "Reworked score adjustment",
    operation: "Modified 3 spans",
    model: "GPT-5",
    prompt: "Good. Make critical signals influence the score too, but cap the result at one.",
    response: "I’ll derive an adjusted score from the human-renamed signal collection and use it in the final decision.",
    tool: "apply_patch · src/evaluateRisk.ts",
    hash: "b914ec4",
    filePath: "src/evaluateRisk.ts",
    before: `const criticalSignals = signals.filter(isCritical);
return score >= 0.7 || criticalSignals.length >= 2;`,
    after: `const adjustedScore = Math.min(
  score + criticalSignals.length * 0.1,
  1,
);
return adjustedScore >= 0.7 || criticalSignals.length >= 2;`
  },
  "human-2": {
    id: "human-2",
    actor: "human",
    actorName: "Ben Harris",
    time: "10:55 AM",
    title: "Documented decision behavior",
    operation: "Inserted 1 line",
    prompt: null,
    response: "Added a concise comment for callers of the exported function.",
    tool: "VS Code save · 1 edit",
    hash: "d7603a9",
    filePath: "src/evaluateRisk.ts",
    before: "export function evaluateRisk(",
    after: `/** Returns a review decision using score and critical signals. */
export function evaluateRisk(`
  },
  "agent-test": {
    id: "agent-test",
    actor: "agent",
    actorName: "Codex",
    time: "10:56 AM",
    title: "Added escalation coverage",
    operation: "Inserted 7 lines",
    model: "GPT-5",
    prompt: "Add a focused test for the new score-based escalation behavior.",
    response: "I’ll add a small test that exercises the public decision function above the revised threshold.",
    tool: "apply_patch · test/evaluateRisk.test.ts",
    hash: "e42c7b5",
    filePath: "test/evaluateRisk.test.ts",
    before: "(new file)",
    after: `describe("evaluateRisk", () => {
  it("escalates scores above the threshold", () => {
    expect(evaluateRisk(0.8, [])).toBe("escalate");
  });
});`
  }
};

const rows = [
  { old: 1, type: "removed", text: "export function shouldEscalate(score: number) {" },
  { old: 2, type: "removed", text: "  return score > 0.62;" },
  { old: 3, type: "removed", text: "}" },
  { old: "", next: "", type: "context", text: "" },
  { old: "", next: 1, type: "added", segments: [{ text: "/** Returns a review decision using score and critical signals. */", events: ["human-2"] }] },
  { old: "", next: 2, type: "added", segments: [{ text: "export function evaluateRisk(", events: ["agent-1"] }] },
  { old: "", next: 3, type: "added", segments: [{ text: "  score: number,", events: ["agent-1"] }] },
  { old: "", next: 4, type: "added", segments: [{ text: "  signals: RiskSignal[],", events: ["agent-1"] }] },
  { old: "", next: 5, type: "added", segments: [{ text: "): ReviewDecision {", events: ["agent-1"] }] },
  { old: "", next: 6, type: "added", segments: [
    { text: "  const ", events: ["agent-1"] },
    { text: "criticalSignals", events: ["agent-1", "human-1", "agent-2"] },
    { text: " = signals.filter((signal) => signal.severity === \"critical\");", events: ["agent-1"] }
  ] },
  { old: "", next: 7, type: "added", segments: [{ text: "  const adjustedScore = Math.min(", events: ["agent-1", "agent-2"] }] },
  { old: "", next: 8, type: "added", segments: [
    { text: "    ", events: ["agent-1", "agent-2"] },
    { text: "score + criticalSignals.length * 0.1", events: ["agent-1", "human-1", "agent-2"] },
    { text: ",", events: ["agent-1", "agent-2"] }
  ] },
  { old: "", next: 9, type: "added", segments: [{ text: "    1,", events: ["agent-1", "agent-2"] }] },
  { old: "", next: 10, type: "added", segments: [{ text: "  );", events: ["agent-1", "agent-2"] }] },
  { old: "", next: 11, type: "added", segments: [
    { text: "  return adjustedScore >= ", events: ["agent-1", "agent-2"] },
    { text: "0.7", events: ["agent-1", "human-1", "agent-2"] },
    { text: " || criticalSignals.length >= 2", events: ["agent-1", "human-1", "agent-2"] }
  ] },
  { old: "", next: 12, type: "added", segments: [{ text: "    ? \"escalate\"", events: ["agent-1", "agent-2"] }] },
  { old: "", next: 13, type: "added", segments: [{ text: "    : \"approve\";", events: ["agent-1", "agent-2"] }] },
  { old: "", next: 14, type: "added", segments: [{ text: "}", events: ["agent-1"] }] }
];

const testRows = [
  { old: "", next: 1, type: "added", segments: [{ text: "import { evaluateRisk } from \"../src/evaluateRisk\";", events: ["agent-test"] }] },
  { old: "", next: 2, type: "added", segments: [{ text: "", events: ["agent-test"] }] },
  { old: "", next: 3, type: "added", segments: [{ text: "describe(\"evaluateRisk\", () => {", events: ["agent-test"] }] },
  { old: "", next: 4, type: "added", segments: [{ text: "  it(\"escalates scores above the threshold\", () => {", events: ["agent-test"] }] },
  { old: "", next: 5, type: "added", segments: [{ text: "    expect(evaluateRisk(0.8, [])).toBe(\"escalate\");", events: ["agent-test"] }] },
  { old: "", next: 6, type: "added", segments: [{ text: "  });", events: ["agent-test"] }] },
  { old: "", next: 7, type: "added", segments: [{ text: "});", events: ["agent-test"] }] }
];

let diffs = [
  { tableId: "diff-table", statsId: "attribution-stats", filePath: "src/evaluateRisk.ts", hunk: "@@ -1,3 +1,14 @@", collapsed: false, rows },
  { tableId: "test-diff-table", statsId: "test-attribution-stats", filePath: "test/evaluateRisk.test.ts", hunk: "@@ -0,0 +1,7 @@", collapsed: true, rows: testRows }
];

let chatSessions = [
  {
    id: "risk-signals",
    title: "Risk signal implementation",
    agent: "Codex",
    model: "GPT-5",
    time: "10:42–10:55 AM",
    summary: "3 edit actions · 1 file",
    additions: 13,
    deletions: 3,
    messages: [
      { type: "user", time: "10:42 AM", text: events["agent-1"].prompt },
      { type: "assistant", time: "10:42 AM", text: events["agent-1"].response },
      { type: "tool", time: "10:43 AM", eventId: "agent-1" },
      { type: "assistant", time: "10:43 AM", text: "Implemented the signal-aware decision function. The threshold remains unchanged for now." },
      { type: "user", time: "10:50 AM", text: events["agent-2"].prompt },
      { type: "assistant", time: "10:51 AM", text: events["agent-2"].response },
      { type: "tool", time: "10:51 AM", eventId: "agent-2" },
      { type: "assistant", time: "10:52 AM", text: "The score now incorporates critical signals, is capped at one, and uses Ben’s revised threshold and naming." }
    ]
  },
  {
    id: "test-coverage",
    title: "Follow-up test coverage",
    agent: "Codex",
    model: "GPT-5",
    time: "10:56–10:58 AM",
    summary: "1 edit action · 1 file",
    additions: 7,
    deletions: 0,
    messages: [
      { type: "user", time: "10:56 AM", text: events["agent-test"].prompt },
      { type: "assistant", time: "10:56 AM", text: events["agent-test"].response },
      { type: "tool", time: "10:57 AM", eventId: "agent-test" },
      { type: "assistant", time: "10:58 AM", text: "Added focused coverage for escalation above the revised threshold. The test passes." }
    ]
  }
];

const actorHistory = (eventIds) => eventIds.map((id) => ({ eventId: id, actor: events[id].actor }));

function renderFileShells() {
  const container = document.querySelector("#file-diffs");
  container.innerHTML = diffs.map((diff) => `
    <article class="file-diff${diff.collapsed ? " collapsed" : ""}" data-file="${escapeHtml(diff.filePath)}">
      <header class="file-header">
        <button class="plain-icon file-toggle" aria-label="${diff.collapsed ? "Expand" : "Collapse"} ${escapeHtml(diff.filePath)}" aria-expanded="${!diff.collapsed}"><svg viewBox="0 0 16 16"><path d="m5 6 3 3 3-3"/></svg></button>
        <strong>${escapeHtml(diff.filePath)}</strong><span class="attribution-stats" id="${diff.statsId}" aria-label="Provenance by changed line"></span>
        <label class="viewed"><input type="checkbox" /> Viewed</label><button class="button icon-only" aria-label="File options">•••</button>
      </header>
      <div class="diff-content">
        <div class="diff-hunk">${escapeHtml(diff.hunk)}</div>
        <div class="diff-table" id="${diff.tableId}" role="table" aria-label="Code changes for ${escapeHtml(diff.filePath)}"></div>
      </div>
    </article>`).join("");

  const additions = diffs.reduce((sum, diff) => sum + diff.rows.filter((row) => row.type === "added").length, 0);
  const deletions = diffs.reduce((sum, diff) => sum + diff.rows.filter((row) => row.type === "removed").length, 0);
  const fileLabel = `${diffs.length} ${diffs.length === 1 ? "file" : "files"} changed`;
  document.querySelector("#files-tab-count").textContent = diffs.length;
  document.querySelector("#review-file-count").textContent = diffs.length;
  document.querySelector("#changed-files-label").textContent = fileLabel;
  document.querySelector("#addition-count").textContent = `+${additions}`;
  document.querySelector("#deletion-count").textContent = `−${deletions}`;
  document.querySelector(".diff-stats").setAttribute("aria-label", `${additions} additions and ${deletions} deletions`);
}

function renderDiff() {
  for (const diff of diffs) {
    const table = document.querySelector(`#${diff.tableId}`);
    table.replaceChildren(...diff.rows.map((row, index) => {
      const line = document.createElement("div");
      line.className = `diff-row ${row.type}`;
      line.setAttribute("role", "row");

      const oldNumber = cell("line-number", row.old ?? "");
      const newNumber = cell("line-number", row.next ?? "");
      const marker = cell("marker", row.type === "removed" ? "−" : row.type === "added" ? "+" : " ");
      const code = cell("code", "");

      if (row.segments) {
        for (const segment of row.segments) {
          const kind = provenanceKind(actorHistory(segment.events));
          const button = document.createElement("button");
          button.className = `code-segment ${kind}`;
          button.textContent = segment.text || " ";
          button.dataset.events = segment.events.join(",");
          button.dataset.kind = kind;
          button.dataset.line = row.next;
          button.title = `${kindLabel(kind)} · click for history`;
          button.addEventListener("click", () => openHistory(segment, row, diff.filePath));
          code.append(button);
        }
      } else {
        const content = document.createElement("span");
        content.textContent = row.text || " ";
        code.append(content);
      }
      line.append(oldNumber, newNumber, marker, code);
      line.style.setProperty("--row-index", index);
      return line;
    }));
    renderAttributionStats(diff.rows, diff.statsId);
  }
}

function renderAttributionStats(diffRows, statsId) {
  const categories = ["human", "agent", "mixed", "unknown", "tool"];
  const counts = Object.fromEntries(categories.map((category) => [category, 0]));

  for (const row of diffRows.filter((item) => item.segments)) {
    const eventIds = [...new Set(row.segments.flatMap((segment) => segment.events))];
    const kind = provenanceKind(actorHistory(eventIds));
    if (kind in counts) counts[kind] += 1;
  }

  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  if (total === 0) return;
  const raw = Object.fromEntries(categories.map((category) => [category, counts[category] / total * 100]));
  const percentages = Object.fromEntries(categories.map((category) => [category, Math.floor(raw[category])]));
  let remainder = 100 - Object.values(percentages).reduce((sum, value) => sum + value, 0);
  const byFraction = [...categories].sort((left, right) => (raw[right] % 1) - (raw[left] % 1));
  for (let index = 0; remainder > 0; index += 1, remainder -= 1) percentages[byFraction[index % byFraction.length]] += 1;

  const stats = document.querySelector(`#${statsId}`);
  stats.innerHTML = categories.filter((category) => counts[category] > 0).map((category) => `
    <span class="line-stat ${category}" title="${counts[category]} changed ${counts[category] === 1 ? "line" : "lines"}">
      <i></i><b>${kindLabel(category)}</b> ${percentages[category]}%
    </span>`).join("");
}

function cell(className, value) {
  const element = document.createElement("div");
  element.className = className;
  element.textContent = value;
  element.setAttribute("role", "cell");
  return element;
}

function kindLabel(kind) {
  return { human: "Human only", agent: "Agent only", mixed: "Human + agent", unknown: "Unknown", tool: "Tool" }[kind] || kind;
}

function openHistory(segment, row, filePath) {
  const dialog = document.querySelector("#history-dialog");
  const selectedEvents = segment.events.map((id) => events[id]);
  const kind = provenanceKind(actorHistory(segment.events));
  const summary = document.querySelector("#selection-summary");
  summary.innerHTML = "";

  const meta = document.createElement("div");
  meta.className = "selection-meta";
  const badge = document.createElement("span");
  badge.className = `provenance-badge ${kind}`;
  badge.textContent = kindLabel(kind);
  meta.innerHTML = `<span>${filePath}</span><span>Line ${row.next}</span>`;
  meta.prepend(badge);

  const code = document.createElement("pre");
  code.textContent = segment.text.trim() || segment.text;
  summary.append(meta, code);

  document.querySelector("#action-count").textContent = `${selectedEvents.length} ${selectedEvents.length === 1 ? "action" : "actions"}`;
  const timeline = document.querySelector("#event-timeline");
  timeline.replaceChildren(...selectedEvents.map(renderEvent));
  dialog.showModal();
}

function renderEvent(event, index) {
  const item = document.createElement("li");
  item.className = `timeline-event ${event.actor}`;
  const icon = event.actor === "agent"
    ? `<svg viewBox="0 0 24 24"><path d="M8 3h8v4H8zM6 7h12v11H6zM9 11h.01M15 11h.01M9 15h6"/></svg>`
    : `<span>${event.actorName.split(" ").map((part) => part[0]).join("")}</span>`;

  item.innerHTML = `
    <div class="timeline-rail"><div class="actor-icon">${icon}</div></div>
    <article>
      <div class="event-topline"><strong>${event.actorName}</strong><span class="actor-label">${event.actor}</span><time>${event.time}</time></div>
      <h3>${event.filePath}</h3>
      <p class="operation">${event.operation}</p>
      ${renderUnifiedChange(event.before, event.after)}
      <div class="event-foot"><span><svg viewBox="0 0 24 24"><path d="M5 4h14v16H5zM8 8h8M8 12h8M8 16h5"/></svg>${event.tool}</span><code>${event.hash}</code></div>
      ${event.actor === "agent" ? `<button class="chat-link" data-chat-event="${event.id}">Review in Agent chat <span>→</span></button>` : ""}
    </article>`;
  item.style.setProperty("--event-index", index);
  item.querySelector(".chat-link")?.addEventListener("click", () => openChatAtEvent(event.id));
  return item;
}

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function renderUnifiedChange(before, after) {
  const beforeLines = before === "(new file)" ? [] : before.split("\n");
  const afterLines = after.split("\n");
  let prefixLength = 0;
  while (prefixLength < beforeLines.length && prefixLength < afterLines.length && beforeLines[prefixLength] === afterLines[prefixLength]) prefixLength += 1;

  let suffixLength = 0;
  while (
    suffixLength < beforeLines.length - prefixLength &&
    suffixLength < afterLines.length - prefixLength &&
    beforeLines[beforeLines.length - 1 - suffixLength] === afterLines[afterLines.length - 1 - suffixLength]
  ) suffixLength += 1;

  const prefix = beforeLines.slice(0, prefixLength);
  const removed = beforeLines.slice(prefixLength, beforeLines.length - suffixLength || beforeLines.length);
  const added = afterLines.slice(prefixLength, afterLines.length - suffixLength || afterLines.length);
  const suffix = suffixLength ? afterLines.slice(-suffixLength) : [];
  const line = (text, kind, marker) => `<div class="preview-line ${kind}"><span>${marker}</span><code>${escapeHtml(text) || " "}</code></div>`;

  return `<div class="change-preview">
    <div class="preview-hunk">${beforeLines.length ? "Before" : "New file"} → After</div>
    ${prefix.map((text) => line(text, "context", " ")).join("")}
    ${removed.map((text) => line(text, "removed", "−")).join("")}
    ${added.map((text) => line(text, "added", "+")).join("")}
    ${suffix.map((text) => line(text, "context", " ")).join("")}
  </div>`;
}

function applyNoteBundle(note) {
  const normalizedEvents = {};
  const fileEvents = new Map();

  for (const session of note.sessions) {
    const messageById = new Map(session.messages.map((message) => [message.id, message]));
    for (const event of session.events) {
      const linked = (event.messageIds || []).map((id) => messageById.get(id)).filter(Boolean);
      const prompt = linked.find((message) => message.role === "user") || session.messages.find((message) => message.role === "user");
      const response = linked.find((message) => message.role === "assistant") || session.messages.find((message) => message.role === "assistant");
      normalizedEvents[event.id] = {
        ...event,
        actorName: event.actor === "agent" ? session.agent.name : event.actor === "human" ? "Human" : "Unknown source",
        time: formatTime(event.timestamp || session.endedAt || session.startedAt),
        operation: describeChange(event.before || "", event.after || ""),
        filePath: event.file,
        before: event.before || "(new file)",
        after: event.after || "(deleted file)",
        prompt: prompt?.content,
        response: response?.content,
        tool: `${session.agent.harness || "recorded session"} · ${event.file}`,
        hash: event.id.slice(0, 12)
      };
      if (!fileEvents.has(event.file)) fileEvents.set(event.file, []);
      fileEvents.get(event.file).push(event);
    }
  }
  events = normalizedEvents;

  diffs = [...fileEvents.entries()].map(([filePath, editEvents], index) => {
    const before = editEvents[0].before || "";
    const after = editEvents.at(-1).after || "";
    const eventIds = editEvents.map((event) => event.id);
    const diffRows = rowsFromChange(before, after, eventIds);
    return {
      tableId: `note-diff-${index}`,
      statsId: `note-stats-${index}`,
      filePath,
      hunk: `@@ -1,${lineCount(before)} +1,${lineCount(after)} @@`,
      collapsed: index > 0,
      rows: diffRows
    };
  });

  chatSessions = note.sessions.map((session, index) => {
    const sessionEvents = session.events || [];
    const messages = (session.messages || []).map((message) => ({
      type: message.role === "tool" ? "assistant" : message.role,
      time: formatTime(message.timestamp || session.startedAt),
      text: message.content
    }));
    for (const event of sessionEvents) messages.push({ type: "tool", time: formatTime(event.timestamp || session.endedAt || session.startedAt), eventId: event.id });
    const files = new Set(sessionEvents.map((event) => event.file));
    return {
      id: session.id || `session-${index}`,
      title: session.title || `${session.agent.name} session`,
      agent: session.agent.name,
      model: session.agent.model || session.agent.harness || "Recorded agent",
      time: `${formatTime(session.startedAt)}–${formatTime(session.endedAt || session.startedAt)}`,
      summary: `${sessionEvents.length} edit ${sessionEvents.length === 1 ? "action" : "actions"} · ${files.size} ${files.size === 1 ? "file" : "files"}`,
      additions: sessionEvents.reduce((sum, event) => sum + lineCount(event.after || ""), 0),
      deletions: sessionEvents.reduce((sum, event) => sum + lineCount(event.before || ""), 0),
      messages
    };
  });

  document.querySelector("#chats-tab-count").textContent = chatSessions.length;
  document.querySelector("#recorded-session-count").textContent = `${chatSessions.length} recorded ${chatSessions.length === 1 ? "session" : "sessions"}`;
  document.querySelector("#files-view .prototype-note").innerHTML = `<strong>Git note:</strong> Rendering provenance attached to commit <code>${escapeHtml(note.commit.slice(0, 12))}</code>.`;
  document.querySelector(".pr-title h1").innerHTML = `Recorded code provenance <span>${escapeHtml(note.commit.slice(0, 12))}</span>`;
  document.querySelector(".pr-meta p").innerHTML = `Reviewing metadata attached to commit <a href="#files">${escapeHtml(note.commit.slice(0, 12))}</a> through <code>refs/notes/provenance</code>`;
  document.querySelector(".open-pill").lastChild.textContent = "Recorded";
}

function rowsFromChange(before, after, eventIds) {
  const beforeLines = before ? before.replace(/\n$/, "").split("\n") : [];
  const afterLines = after ? after.replace(/\n$/, "").split("\n") : [];
  return [
    ...beforeLines.map((text, index) => ({ old: index + 1, type: "removed", text })),
    ...(beforeLines.length && afterLines.length ? [{ old: "", next: "", type: "context", text: "" }] : []),
    ...afterLines.map((text, index) => ({ old: "", next: index + 1, type: "added", segments: [{ text, events: eventIds }] }))
  ];
}

function lineCount(value) {
  if (!value) return 0;
  return value.replace(/\n$/, "").split("\n").length;
}

function describeChange(before, after) {
  if (!before) return `Added ${lineCount(after)} ${lineCount(after) === 1 ? "line" : "lines"}`;
  if (!after) return `Deleted ${lineCount(before)} ${lineCount(before) === 1 ? "line" : "lines"}`;
  return `Changed ${lineCount(before)} → ${lineCount(after)} lines`;
}

function formatTime(value) {
  if (!value || Number.isNaN(Date.parse(value))) return "Recorded";
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

function renderSessionList(activeId = chatSessions[0].id) {
  const list = document.querySelector("#session-list");
  list.replaceChildren(...chatSessions.map((session) => {
    const button = document.createElement("button");
    button.className = `session-button${session.id === activeId ? " active" : ""}`;
    button.innerHTML = `<strong>${session.title}</strong><span>${session.agent} · ${session.time}</span><small>${session.summary}</small>`;
    button.addEventListener("click", () => {
      renderChatSession(session.id);
      history.replaceState(null, "", `#chats/${session.id}`);
    });
    return button;
  }));
}

function renderChatSession(sessionId = chatSessions[0].id, focusEventId) {
  const session = chatSessions.find((item) => item.id === sessionId) || chatSessions[0];
  const messageCount = session.messages.filter((message) => message.type !== "tool").length;
  renderSessionList(session.id);
  const transcript = document.querySelector("#chat-transcript");
  transcript.innerHTML = `
    <header class="transcript-header">
      <div><h3>${session.title}</h3><p>${session.agent} · ${session.model} · ${session.time}</p></div>
      <span class="transcript-stats"><b class="addition">+${session.additions}</b><b class="deletion">−${session.deletions}</b><span>·</span>${messageCount} messages</span>
    </header>
    <div class="messages"></div>`;

  const messages = transcript.querySelector(".messages");
  for (const message of session.messages) {
    if (message.type === "tool") {
      const event = events[message.eventId];
      const tool = document.createElement("section");
      tool.className = "chat-tool";
      tool.dataset.event = event.id;
      tool.innerHTML = `
        <div class="tool-icon"><svg viewBox="0 0 16 16"><path d="M3 2h10v12H3zM5.5 5h5M5.5 8h5M5.5 11h3"/></svg></div>
        <div class="tool-body">
          <div class="tool-top"><strong>apply_patch</strong><time>${message.time}</time></div>
          <code>${event.filePath}</code><p>${event.operation}</p>
          <button class="diff-link">View changes in diff <span>→</span></button>
        </div>`;
      tool.querySelector(".diff-link").addEventListener("click", () => openDiffAtEvent(event.id));
      messages.append(tool);
      continue;
    }

    const item = document.createElement("section");
    item.className = `chat-message ${message.type}`;
    const isUser = message.type === "user";
    item.innerHTML = `
      <div class="message-avatar ${message.type}">${isUser ? "BH" : `<svg viewBox="0 0 16 16"><path d="M5 2h6v3H5zM3.5 5h9v8h-9zM6 8h.01M10 8h.01M6 11h4"/></svg>`}</div>
      <div><header><strong>${isUser ? "Ben Harris" : session.agent}</strong><time>${message.time}</time></header><p>${escapeHtml(message.text)}</p></div>`;
    messages.append(item);
  }

  if (focusEventId) {
    requestAnimationFrame(() => {
      const target = transcript.querySelector(`[data-event="${focusEventId}"]`);
      target?.classList.add("deep-linked");
      target?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }
}

function switchView(view) {
  document.querySelector("#files-view").hidden = view !== "files";
  document.querySelector("#chats-view").hidden = view !== "chats";
  document.querySelectorAll(".pr-tabs [data-view]").forEach((tab) => tab.classList.toggle("active", tab.dataset.view === view));
}

function openChatAtEvent(eventId) {
  const session = chatSessions.find((item) => item.messages.some((message) => message.eventId === eventId));
  if (!session) return;
  const dialog = document.querySelector("#history-dialog");
  if (dialog.open) dialog.close();
  switchView("chats");
  renderChatSession(session.id, eventId);
  history.replaceState(null, "", `#chats/${session.id}/${eventId}`);
}

function openDiffAtEvent(eventId) {
  switchView("files");
  const target = [...document.querySelectorAll(".code-segment")].find((segment) => segment.dataset.events.split(",").includes(eventId));
  if (!target) return;
  const file = target.closest(".file-diff");
  file.classList.remove("collapsed");
  const toggle = file.querySelector(".file-toggle");
  toggle.setAttribute("aria-expanded", "true");
  toggle.setAttribute("aria-label", `Collapse ${file.dataset.file}`);
  history.replaceState(null, "", `#files/${eventId}`);
  target.classList.add("deep-linked");
  target.scrollIntoView({ block: "center", behavior: "smooth" });
  setTimeout(() => {
    target.click();
    target.classList.remove("deep-linked");
  }, 350);
}

function setupControls() {
  const dialog = document.querySelector("#history-dialog");
  document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  document.querySelector(".dialog-done").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.querySelector("#provenance-filter").addEventListener("change", (event) => {
    const filter = event.target.value;
    document.querySelectorAll(".code-segment").forEach((segment) => {
      segment.classList.toggle("filtered", filter !== "all" && segment.dataset.kind !== filter);
    });
  });

  document.querySelectorAll(".file-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const file = toggle.closest(".file-diff");
      const isCollapsed = file.classList.toggle("collapsed");
      toggle.setAttribute("aria-expanded", String(!isCollapsed));
      toggle.setAttribute("aria-label", `${isCollapsed ? "Expand" : "Collapse"} ${file.dataset.file}`);
    });
  });

  document.querySelectorAll(".pr-tabs [data-view]").forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      switchView(tab.dataset.view);
      if (tab.dataset.view === "chats") renderChatSession();
      history.replaceState(null, "", `#${tab.dataset.view}`);
    });
  });

  document.querySelector(".primary").addEventListener("click", () => showToast("Review workflow is intentionally mocked in this local demo."));
  document.querySelectorAll("a[href=\"#\"], .toolbar-actions .button, .icon-button").forEach((control) => {
    control.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("This GitHub control is illustrative; provenance interactions are fully functional.");
    });
  });
}

let toastTimer;
function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("visible"), 2800);
}

async function bootstrap() {
  renderFileShells();
  renderDiff();
  renderSessionList();
  renderChatSession();
  setupControls();

  const [, initialView, sessionId, eventId] = location.hash.match(/^#(files|chats)(?:\/([^/]+))?(?:\/([^/]+))?/) || [];
  if (initialView === "chats") {
    switchView("chats");
    renderChatSession(sessionId, eventId);
  } else if (initialView === "files" && sessionId) {
    openDiffAtEvent(sessionId);
  }
}

bootstrap();
