# Go / No-Go Game

▶️ [Click here to play the game](https://bitsector.github.io/go-no-go/)

A minimal Go/No-Go web page with random-duration stages, 30/70 Go vs No-Go ratio, and reaction time logging.

## Game rules

- **Go stage** (non-red ball): tap or press Space as fast as possible. Missing a Go stage plays the error buzz.
- **No-Go stage** (red ball): hold back. Clicking during a No-Go stage plays the error buzz immediately.
- Each stage has a random duration between 700 ms and 1500 ms.

## Run locally

Using npx (no install):

```
npx http-server .
```

Then open the printed URL (default http://localhost:8080).

Alternate (after installing once):

```
npm install -g serve
serve .
```

Open http://localhost:3000 (or the URL shown). Stop with Ctrl+C.
