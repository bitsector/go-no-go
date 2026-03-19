# Go / No-Go Game

A minimal Go/No-Go cognitive task: colored circle cues appear for 3 seconds each.
React to **Go** cues (any color except red) and **withhold** your response on **No-Go** cues (red). The session is 90 % Go / 10 % No-Go. Reaction times and accuracy are logged and shown in a summary at the end.

---

## How to preview this PR locally

### Prerequisites

You need **Git** and either **Python 3** (ships with macOS / Linux) or **Node.js** installed.

### 1 — Check out the branch

```bash
git clone https://github.com/bitsector/go-no-go.git
cd go-no-go
git checkout copilot/update-game-page-design
```

> If you already have the repo cloned, just fetch and check out:
> ```bash
> git fetch origin
> git checkout copilot/update-game-page-design
> ```

### 2 — Start a local server

The app uses ES modules, so it **must** be served over HTTP — opening `index.html` directly as a `file://` URL will not work.

**Option A — Python 3** (no install required):

```bash
python3 -m http.server 8080
```

**Option B — Node.js / npx** (no global install required):

```bash
npx http-server . -p 8080
```

### 3 — Open in your browser

Visit <http://localhost:8080> and press **Start Session**.

Stop the server when you are done with **Ctrl + C**.

---

## How the game works

| Cue | What to do |
|-----|-----------|
| Colored circle (any **non-red** color) | **Tap / press Space or Enter** — this is a Go trial |
| **Red** circle | **Do nothing** — this is a No-Go trial |

Each stage lasts 3 seconds and advances automatically. The progress bar at the bottom of the cue area shows time remaining. A stage counter (e.g. *Stage 4 / 20*) and a **Running / Done** status badge show where you are in the session.

After all stages finish the session summary shows:

- Go responses, omission errors (Go with no response)
- No-Go commission errors (responded when you shouldn't have), correct waits
- Mean and standard deviation of reaction time for both trial types
