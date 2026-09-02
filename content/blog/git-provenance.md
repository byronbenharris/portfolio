---
title: 'Git should remember how code was made'
date: '2026-09-02'
description: 'A working proposal for recording human and agent edit history as Git metadata—and reviewing it beside the pull request diff.'
interactiveDemo: 'git-provenance'
---

Code review is built around a wonderfully durable question: **what changed?** A pull request shows the old code, the new code, the author of the commit, and the conversation around it.

That model starts to strain when an agent participates in writing the code. A commit may now contain a function drafted by an agent, a variable renamed by a person, and a final condition revised by the agent after that feedback. The commit author field compresses all of that into one name. The diff preserves the result but loses the process.

The tempting response is to build an AI detector. I think that is the wrong abstraction. Generated code does not carry a reliable accent, and guessing authorship from the finished text turns review into a probabilistic accusation. If the development tools were present when the change happened, they should record the history directly.

I have been exploring a small prototype called [Git Provenance](https://github.com/byronbenharris/git-provenance). It asks what code review would look like if Git could answer a second question:

> How did this change get here?

## A provenance layer for pull requests

The interface adds one visual layer to the familiar pull request diff. Removed code remains red. Added code is green when it was written by a human and yellow when it was written by an agent. When both touched the same span, it is striped.

The stripes are the important part. Authorship is not always a final label. Imagine an agent introduces `blockingSignals`, a human renames it to `criticalSignals`, and the agent later rewrites the expression around that name. Calling the result simply “human” or “AI” throws away useful history. Its provenance is the ordered set of edits that produced it.

Clicking a highlighted span opens that history. Each action includes the actor, time, exact before-and-after chunk, and the session that caused it. For an agent action, the reviewer can jump into the complete recorded chat at the relevant tool call. The link works in both directions: a tool call can take the reviewer back to the affected lines.

That makes provenance useful without turning it into a score. A reviewer can see where an agent contributed, but more importantly can recover the context in which a particular decision was made.

<!-- interactive-demo -->

## The hard part is recording ancestry, not choosing colors

The interface is the easy half. The technical problem is preserving a trustworthy relationship between code, edit actions, and conversations while both humans and agents continue to change the same file.

The prototype models provenance on character spans. A span carries an ordered history of event IDs rather than a single author. When text is replaced, the new span inherits the history of the text it replaced and appends the new action. Adjacent spans with identical histories can then be compacted.

In simplified form:

```text
agent inserts “blockingSignals”
  → [agent-1]

human replaces it with “criticalSignals”
  → [agent-1, human-1]

agent edits the surrounding expression
  → [agent-1, human-1, agent-2]
```

This is why a mixed span is striped instead of assigned to whichever actor touched it last. The review layer can still summarize a file as human, agent, and mixed percentages by added lines, but the underlying record stays precise enough to inspect individual edits.

Deletions, moves, formatting, and overlapping replacements make this substantially harder than line-level blame. A useful implementation also needs to preserve uncertainty. If the recorder cannot associate an edit with an observed human action or an active agent action, the correct actor is `unknown`—not human by default.

## Recording without inventing a second source-control system

My first architectural instinct was a daemon that watched development sessions and wrote a `.provenance/` directory into every project. That creates immediate lifecycle questions. The directory has to be hidden from pull requests, periodically cleaned, and synchronized somewhere. A database would solve some of those problems, but it would make provenance feel like a separate product attached to Git.

Git already has a place for metadata that describes a commit without changing the commit: **Git notes**.

The working prototype stores one structured JSON bundle per commit under `refs/notes/provenance`. A note contains the target commit and parent, recorded sessions, user and agent messages, tool events, before-and-after edits, stable links between conversations and changes, and a file index for rendering.

Temporary recording state lives inside Git’s private directory:

```text
.git/provenance/
  active/    a command currently being recorded
  staging/   completed sessions waiting for a commit
  tmp/       atomic note construction and local review files
```

Once the corresponding code is committed, `git provenance attach HEAD` merges the staged sessions into the note for that commit and removes the staging copies. The note itself lives in Git’s object database. Abandoned active recordings can be inspected and cleaned explicitly; attached history is never part of that cleanup path.

This gives the system a Git-shaped lifecycle:

```text
harness or command recorder
          ↓
.git/provenance/staging
          ↓ attach
refs/notes/provenance
          ├── local review UI
          └── export → static host → GitHub extension
```

Notes are separate refs, so they are shared intentionally. The CLI exposes configuration, push, and fetch commands for `refs/notes/provenance` instead of making synchronization invisible. Provenance never enters the committed project tree, and cloning code does not silently download full transcripts unless the repository is configured to fetch the note ref.

## Two levels of capture

The repository includes a generic command recorder:

```bash
git provenance record \
  --agent Codex \
  --harness codex \
  --prompt "Add risk signal support" \
  -- your-agent-command
```

It snapshots the working tree before and after the wrapped process, captures its output, and stages the resulting session. This is enough to demonstrate the full lifecycle with nearly any agent harness. It can say that a set of changes occurred inside an agent command boundary.

It cannot honestly claim message-level precision. A human could edit concurrently, and a before-and-after snapshot cannot know which tool call changed a particular expression. Those events are marked with session-boundary confidence.

The richer path is a harness adapter. An agent harness already knows when a user message arrived, when the model responded, and when a file-editing tool ran. An adapter can emit stable message IDs and transaction-level before-and-after events directly into the same schema. That is what enables the prototype’s “review in Agent chat” links. The storage and review protocol can stay harness-independent even when capture becomes harness-specific.

## Getting the data onto GitHub

GitHub does not currently render custom Git notes in pull requests. The project therefore has two review paths.

The local path is the most Git-native: fetch the note and run `git provenance review HEAD`. The command launches the included reviewer on loopback and removes its temporary export when it exits.

For a hosted pull request, the prototype includes a Chrome extension. The developer exports a commit’s note as JSON, uploads it to a static HTTPS host they control, and gives the extension a URL template containing the GitHub owner, repository, and PR number. On a matching PR, the extension adds an **Agent provenance** entry point and renders the bundle in a modal.

This is intentionally user-hosted. There is no provenance service or account to trust. It is a bridge for testing the review experience while making the smallest possible claim about what a hosting provider might eventually support natively.

## Trust and privacy are part of the format

Recorded provenance is evidence, not proof. Git notes are mutable and are not cryptographically included in the commit they describe. A future version could bind a bundle hash with a signed commit trailer, but this prototype does not present its record as tamper-proof.

The data can also be sensitive. A transcript may contain source code, terminal output, credentials, personal information, or unrelated conversation. Exporting and publishing a note needs to be deliberate. Redaction previews, commit-head verification, signed bundles, and authenticated private hosting are all real work left beyond this experiment.

Those limits do not make provenance useless. They define what the record means. Even a locally recorded, explicitly shared history gives a reviewer more grounded context than a detector guessing from syntax after the fact.

## Try Git Provenance

The project is open source at [github.com/byronbenharris/git-provenance](https://github.com/byronbenharris/git-provenance). It requires Node.js 20 or newer and has no package dependencies.

Clone it, run the tests, and link the CLI so Git discovers `git-provenance` as a subcommand:

```bash
git clone https://github.com/byronbenharris/git-provenance.git
cd git-provenance
npm test
npm link
```

To see the fixture used in this post, run:

```bash
npm start
```

Then open [localhost:4173](http://localhost:4173). To record a real command-bounded session, commit its changes, attach the staged provenance, and review it:

```bash
git provenance record \
  --agent Codex \
  --harness codex \
  --prompt "Describe the task" \
  -- your-agent-command

git add .
git commit -m "implement the change"
git provenance attach HEAD
git provenance review HEAD
```

To exchange notes with a Git remote:

```bash
git provenance configure origin
git provenance push origin
git provenance fetch origin
```

The repository’s [README](https://github.com/byronbenharris/git-provenance#readme) also walks through loading the unpacked Chrome extension and publishing a user-hosted bundle. The short version is to export the PR head note to an owner/repository/PR path, host that directory over HTTPS, and configure the extension with the corresponding URL template:

```bash
git provenance export HEAD \
  --output public/byronbenharris/my-repo/pull/42.json
```

I am not trying to build an authorship detector or a new code-hosting platform. This is a feature sketch: a working suggestion that provenance should be a normal piece of commit metadata, carried by Git and reviewable beside the diff. As agents become ordinary development tools, I think “how did this get here?” will become as natural a review question as “what changed?”
