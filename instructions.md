Build a simple Go/No-Go cognitive training game as a responsive web app that works on desktop and mobile browsers. The game should present frequent "Go" stimuli and rarer "No-Go" stimuli, so the user develops a strong tendency to respond and must sometimes inhibit that response. Track correct Go responses, omission errors, commission errors, reaction time, and reaction-time variability. Include a short practice mode, clear instructions, large touch-friendly controls, and adaptive difficulty based on speed and accuracy. Keep the interface minimal, fast, and distraction-free.
That description matches the standard Go/No‑Go logic where frequent Go trials create a prepotent response tendency and rarer No‑Go trials test response inhibition.

Requirements:
JS code that can be easily embedded in a page or display as a standalone page in which the go no go game will run. 

Good papers
A Model of the Go/No-Go Task
https://pmc.ncbi.nlm.nih.gov/articles/PMC2701630/
​

A Formal Cognitive Model of the Go/No-Go Discrimination Task
https://pmc.ncbi.nlm.nih.gov/articles/PMC2752340/
​

A consensus guide to capturing the ability to inhibit actions and impulsive behaviors in the stop-signal task
https://pmc.ncbi.nlm.nih.gov/articles/PMC6533084/
​
This is stop-signal rather than pure Go/No‑Go, but it is one of the clearest papers on inhibition measurement and task design.

Psychometric Properties of a Combined Go/No-go and Continuous Performance Task
https://pmc.ncbi.nlm.nih.gov/articles/PMC10041761/
​

Differences in unity: The go/no-go and stop signal tasks rely on different mechanisms
https://www.sciencedirect.com/science/article/pii/S1053811920300690
​

PsyToolkit Go/No-go task reference
https://www.psytoolkit.org/experiment-library/go-no-go.html
​

Testable Go/No-go task guide
https://www.testable.org/experiment-guides/executive-function/go-no-go-task
​

What these papers help with
If you are building the game, the most useful requirements pulled from this literature are: frequent Go vs rarer No‑Go trials, simple response rules, many repeated trials, a practice phase, and logging of omission errors, commission errors, and reaction time.

The literature also warns that Go/No‑Go and stop‑signal tasks are related but not identical, so you should decide early whether your app is training response withholding, response cancellation, or both.

General plan of stages (current build scope)
- Single run only: no practice, no adaptive difficulty, no thresholds.
- Stage timing: each stage lasts 3s and advances automatically.
- Stage mix: 90% Go, 10% No-Go, biased random ordering.
- Input handling: first input within a stage is recorded; later inputs in that stage are ignored.
- Logging: for each stage, record type (Go/No-Go), whether a response happened, response timestamp, and reactionTimeMs; if no response, reactionTimeMs = null.
- Go stages: record reaction time if the user taps/presses.
- No-Go stages: if the user responds, log reaction time as a wrong response; if they wait it out, log no-response (RT null).
- Session summary: counts of Go responses, No-Go responses, misses; RT mean/SD for Go responses; RT mean/SD for No-Go responses (only when responses occurred).
- Controls: large tap target plus keyboard (space/enter) support.
- Optional: restart button to replay the session; optional raw log export (JSON) later.