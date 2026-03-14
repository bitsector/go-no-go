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