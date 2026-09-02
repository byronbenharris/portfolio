function copyHistory(history) {
  return history.map((entry) => ({ ...entry }));
}

function historiesEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function compact(spans) {
  const result = [];
  for (const span of spans.filter((item) => item.start < item.end)) {
    const previous = result.at(-1);
    if (previous && previous.end === span.start && historiesEqual(previous.history, span.history)) {
      previous.end = span.end;
    } else {
      result.push({ ...span, history: copyHistory(span.history) });
    }
  }
  return result;
}

export function createDocument(text) {
  return {
    text,
    spans: text.length ? [{ start: 0, end: text.length, history: [] }] : [],
    events: []
  };
}

export function applyEdit(document, edit) {
  const { start, end, text, event } = edit;
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start || end > document.text.length) {
    throw new RangeError(`Invalid edit range ${start}..${end}`);
  }
  if (!event?.id || !event?.actor) {
    throw new TypeError("An edit event requires an id and actor");
  }

  const delta = text.length - (end - start);
  const isInsertion = start === end;
  const inherited = [];
  const before = [];
  const after = [];

  for (const span of document.spans) {
    if (span.end <= start) {
      before.push(span);
      continue;
    }
    if (span.start >= end) {
      after.push({ ...span, start: span.start + delta, end: span.end + delta });
      continue;
    }

    if (isInsertion) {
      before.push({ ...span, end: start });
      after.push({ ...span, start: start + text.length, end: span.end + text.length });
      continue;
    }

    if (span.start < start) {
      before.push({ ...span, end: start });
    }
    if (span.end > end) {
      after.push({ ...span, start: start + text.length, end: span.end + delta });
    }
    for (const entry of span.history) {
      if (!inherited.some((item) => item.eventId === entry.eventId)) inherited.push(entry);
    }
  }

  const action = {
    eventId: event.id,
    actor: event.actor,
    operation: start === end ? "insert" : text ? "replace" : "delete"
  };
  const inserted = text.length
    ? [{ start, end: start + text.length, history: [...copyHistory(inherited), action] }]
    : [];

  return {
    text: document.text.slice(0, start) + text + document.text.slice(end),
    spans: compact([...before, ...inserted, ...after]),
    events: [...document.events, { ...event, range: { start, end }, insertedText: text }]
  };
}

export function provenanceKind(history) {
  const actors = new Set(history.map((entry) => entry.actor));
  if (actors.has("unknown")) return "unknown";
  if (actors.has("human") && actors.has("agent")) return "mixed";
  if (actors.has("agent")) return "agent";
  if (actors.has("human")) return "human";
  if (actors.has("tool")) return "tool";
  return "base";
}

export function historyForRange(document, start, end) {
  const ids = new Set();
  for (const span of document.spans) {
    if (span.end <= start || span.start >= end) continue;
    for (const entry of span.history) ids.add(entry.eventId);
  }
  return document.events.filter((event) => ids.has(event.id));
}
