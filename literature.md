# Scientific Literature on Go/No-Go Tasks

A consolidated list of every scientific source cited in this project, grouped by topic.

---

## Core Go/No‑Go task design and theory

**A Formal Cognitive Model of the Go/No-Go Discrimination Task**
https://pmc.ncbi.nlm.nih.gov/articles/PMC2752340/
Models how Go and No-Go responses are discriminated in the brain. Shows that discrimination accuracy depends on stimulus clarity and timing parameters. Helps set stimulus presentation durations in your design.

On the task definition:

"The go/no-go discrimination task assesses the ability of a participant to learn to respond to cues (in the form of numbers presented on the screen) that have been previously paired with rewards and withhold a response to cues that have been paired with punishments."

And 

On the task procedure:

"In the go/no-go discrimination task, stimuli consist of 'good' and 'bad' two-digit numbers presented in a pseudorandom order for 90 experimental trials. Participants learn by trial-and-error which numbers are good and which are bad. The stimuli are displayed on the screen until participants respond or for up to 2.5 s. After each response, the participants are given visual, auditory, and monetary feedback. Lack of response leads to neither punishment nor reward. A correct response (responding to a good number) is followed by a high-pitched tone, the appearance of the message 'You WIN 25 cents!,' and the addition of money to the participant's tally of earnings. An incorrect response (responding to a bad number) is followed by a low-pitched tone, the appearance of the message 'You LOSE 25 cents!'"

"This game is inspired by the above described mechanics"

**A Model of the Go/No-Go Task**
https://pmc.ncbi.nlm.nih.gov/articles/PMC2701630/
Formal computational model of the Go/No-Go task. Explains the cognitive mechanisms: how the brain builds a prepotent Go response and then must suppress it on No-Go trials. Essential reading for understanding *why* the task works structurally.

**A consensus guide to capturing the ability to inhibit actions (stop-signal task)**
https://pmc.ncbi.nlm.nih.gov/articles/PMC6533084/
Canonical paper on how to properly measure response inhibition. Covers task design requirements: ratio of Go vs No-Go, timing, what to measure, and why you must prevent a "waiting strategy." The most cited design reference for anyone building these tasks.

**Psychometric Properties of a Combined Go/No-go and Continuous Performance Task**
https://pmc.ncbi.nlm.nih.gov/articles/PMC10041761/
Tests how reliable and valid Go/No-Go measurements are. Shows commission errors, omission errors, and reaction time variability are the most meaningful metrics. Important for making the task scientifically valid rather than just a game.

**Go/No-Go Ratios Modulate Inhibition-Related Brain Activity**
https://pmc.ncbi.nlm.nih.gov/articles/PMC11117662/
Shows that the ratio of Go to No-Go trials directly changes how hard inhibition is and how the brain responds. More frequent Go trials = stronger prepotent tendency = harder to stop on No-Go. Confirms that 70–80% Go / 20–30% No-Go is the right range.

**Differences in unity: The go/no-go and stop signal tasks rely on different mechanisms**
https://www.sciencedirect.com/science/article/pii/S1053811920300690
Explains that Go/No-Go and stop-signal are related but test different things. Go/No-Go measures proactive withholding; stop-signal measures reactive cancellation of a started response. You should decide early which one your game targets.

**Go/No-go task – PsyToolkit reference**
https://www.psytoolkit.org/experiment-library/go-no-go.html
Open-access task implementation with stimulus timing parameters, trial structure, and example code. Useful as a direct technical reference.

**Go/No-go task – Testable.org guide**
https://www.testable.org/experiment-guides/executive-function/go-no-go-task
Step-by-step practical guide to implementing a Go/No-Go task. Covers trial structure, timing windows, feedback, and data output. Good for implementation.

---

## ADHD and inhibition training: studies that found some positive effects

**Computer-based inhibitory control training in children with ADHD (PLOS ONE)**
https://pmc.ncbi.nlm.nih.gov/articles/PMC7703966/
https://journals.plos.org/plosone/article/file?type=printable&id=10.1371%2Fjournal.pone.0241352
RCT with 40 children with ADHD using an adaptive stop-signal training game. Found improved stop-signal performance and neural changes (theta, N200). Symptom change was modest. Supports the idea that training changes the inhibition circuit even if symptoms don't move much.

**Inhibitory Control Training Improves ADHD Symptoms and Externalizing Behavior (PARISA program)**
https://pubmed.ncbi.nlm.nih.gov/36474404/
RCT with preschoolers using Go/No-Go + Flanker tasks. Found reduced ADHD symptoms and externalizing behavior at post-test and one-month follow-up. One of the more positive studies, especially for young children.

**Computerized cognitive training to improve executive functions and driving skills (adolescents)**
https://ui.adsabs.harvard.edu/abs/2024TRPF..105...13D/abstract
Used EF training including Go/No-Go for adolescents with and without ADHD. Found improved EF scores and some driving-skill improvement. Shows benefit on trained tasks; real-world effects modest.

**Computerized Progressive Attention Training (CPAT): Near and Far Transfer**
https://pmc.ncbi.nlm.nih.gov/articles/PMC10173353/
Multi-component attention training for adults with ADHD. One of the more encouraging studies: found both near-transfer (attention tasks) and some far-transfer (reading, ADHD symptoms). Uses multiple task types, not just Go/No-Go alone.

**AttenGo pilot study (Hebrew University / Hadassah)**
https://isot.org.il/wp-content/uploads/2022/11/23470818.pdf
The main Israeli pilot study on AttenGo with 14 adults with ADHD. Found improvements in executive-function questionnaires and quality of life after 3 months. Small sample, uncontrolled. The foundational study for AttenGo specifically.

**Pilot study of computerized cognitive training in adults with ADHD (Haifa, 2011)**
https://cris.haifa.ac.il/en/publications/a-pilot-study-of-computerized-cognitive-training-in-adults-with-a-2/
Related Israeli pilot. Similar design and findings to the above.

---

## ADHD and inhibition training: studies that found weak or no effects

**Online cognitive training not effective in reducing ADHD symptoms (King's College London, 2023)**
https://www.kcl.ac.uk/news/online-cognitive-training-not-effective-in-reducing-adhd-symptoms
Meta-analysis of 36 RCTs on computerized cognitive training for ADHD. Conclusion: "little to no support" for CCT as a stand-alone ADHD treatment. Blinded outcomes showed small, clinically insignificant effects. Most important negative result in this space.

**Computerized cognitive training in ADHD: Molecular Psychiatry / Nature 2023**
https://www.nature.com/articles/s41380-023-02000-7
Large review finding CCT reliably improves trained cognitive tasks but shows little convincing evidence for real-world ADHD symptom change in blinded assessments.

**Cognitive Control Training with domain-general response inhibition does not change children's brains or behavior (Nature Neuroscience, 2024)**
https://www.nature.com/articles/s41593-024-01672-w
Pre-registered, large-sample RCT. Found that 8 weeks of response-inhibition training produced no behavioral or brain changes that generalized. Directly challenges the idea that training a specific cognitive process will generalize.

**Adaptive n-back training does not improve fluid intelligence at the construct level**
https://www.sciencedirect.com/article/abs/pii/S0160289613001293
RCT finding no Gf (fluid intelligence) improvement from n-back training when properly controlled. Concludes most of the Jaeggi effect was methodological artifact.

**Does training working memory or inhibitory control produce far-transfer improvements in set-shifting for ADHD? RCT**
https://pubmed.ncbi.nlm.nih.gov/36331068/
RCT specifically asking whether WM or IC training transfers to cognitive flexibility (set-shifting) in ADHD children. Mostly negative: little far transfer even within the EF domain.

---

## Transfer: near vs far, and why it fails

**Near and Far Transfer in Cognitive Training: Second-Order Meta-Analysis**
https://online.ucpress.edu/collabra/article/5/1/18/113004/Near-and-Far-Transfer-in-Cognitive-Training-A
Meta-analysis across many cognitive training studies. Near transfer is real; far transfer is small or zero once placebo and publication bias are accounted for. Core reference for understanding the transfer problem.

**Training Cognition in ADHD: Current Findings, Borrowed Concepts (2012 review)**
https://pmc.ncbi.nlm.nih.gov/articles/PMC3441933/
Conceptual review explaining why cognitive training tends to stay lab-bound. Argues that training "borrows" lab tasks designed for measurement, not generalization, and lacks complexity needed for far transfer.

**Far transfer in cognitive training of older adults**
https://pmc.ncbi.nlm.nih.gov/articles/PMC4169295/
Reviews what conditions are required for far transfer. Introduces Barnett & Ceci's framework: transfer requires overlap across knowledge domain, physical context, functional context, social context, and modality. Widely used to explain why lab games don't generalize.

**Far-Transfer Effects of Strategy-Based Working Memory Training**
https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.01285/full
Shows that explicit strategy teaching (not just task repetition) improves far transfer. Supports the design strategy of surfacing and labeling transferable cognitive strategies.

**There is No Supporting Evidence for a Far Transfer of General Cognitive Training (2024)**
https://pmc.ncbi.nlm.nih.gov/articles/PMC11560981/
Blunt 2024 review. States that across the literature, there is no robust evidence for far transfer from generic cognitive training. Important reality check.

**Cognitive Training: A Field in Search of a Phenomenon (Gobet & Sala, 2023)**
https://journals.sagepub.com/doi/10.1177/17456916221091830
https://pmc.ncbi.nlm.nih.gov/articles/PMC9903001/
Harshest overview of the field. Argues that cognitive training effects "rarely generalize beyond very similar tasks," and that the field has mostly been chasing a phenomenon that may not exist in a practically useful form.

**Can cognitive training capitalise on near transfer effects? (2023)**
https://pmc.ncbi.nlm.nih.gov/articles/PMC10637678/
Nuanced view: argues near transfer is real and could be leveraged if you design for it deliberately, but far transfer remains difficult without environmental coupling.

**Transferability of cognitive training in children with ADHD (2026)**
https://www.sciencedirect.com/science/article/pii/S000169182600260X
Recent review specifically on transfer in ADHD children. Confirms near transfer is robust; far transfer to real-world symptoms requires additional environmental and behavioral components.

---

## Jaeggi / n-back working memory

**Improving fluid intelligence with training on working memory (Jaeggi et al., 2008)**
https://gwern.net/doc/dual-n-back/2008-jaeggi.pdf
The original paper claiming adaptive dual n-back training raises fluid intelligence. The source of the "can you raise IQ with training?" hype. Used passive controls; findings weakened by later replications.

**Improving fluid intelligence with training: meta-analysis (Au et al., 2014)**
https://scottbarrykaufman.com/wp-content/uploads/2014/08/au-et-al2014_nback-training-gf-meta-analysis.pdf
Meta-analysis finding a small but significant Gf effect from n-back training (g ≈ 0.24, ~3–4 IQ points). Heavily qualified: effect is small, heterogeneous, and sensitive to design quality.

**A multi-level meta-analysis of n-back training studies**
https://pubmed.ncbi.nlm.nih.gov/28116702/
Comprehensive meta-analysis on n-back training. Near transfer to other n-back tasks is medium; transfer to WM, Gf, and cognitive control is "very small." Confirms the transfer problem extends to n-back as well.

**Dual N-Back Meta-Analysis (Gwern.net)**
https://gwern.net/dnb-meta-analysis
Informal but thorough meta-analysis. Notes that effect sizes correlate with methodological quality: passive control studies show big effects; active control studies show near zero. Argues there is no real Gf change from n-back.

**Boosting Working Memory in ADHD: Adaptive Dual N-Back training enhances WAIS-IV performance (2025)**
https://pubmed.ncbi.nlm.nih.gov/41008358/
Newest RCT on dual n-back in ADHD adults. Found verbal working-memory improvement but limited visuospatial transfer. No broad symptom change. Confirms the near-transfer-only pattern.

---

## Interventions that do work (non-drug)

**Sustained improvements by Behavioural Parent Training for children with ADHD (meta-analysis, 2023)**
https://pmc.ncbi.nlm.nih.gov/articles/PMC10501699/
Meta-analysis confirming BPT has sustained benefits (≥5 months) on children's ADHD symptoms, behavior, and parenting quality. The strongest psychosocial evidence base for ADHD.

**Organizational Skills Training for children with ADHD (meta-analysis, 12 RCTs)**
https://pmc.ncbi.nlm.nih.gov/articles/PMC8556963/
12-RCT meta-analysis. Large parent-rated and moderate teacher-rated effects on organizational skills; small-moderate effects on inattention and academic performance.

**School-based RCTs for ADHD (Frontiers, 2025)**
https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1611145/full
Meta-analysis finding school-based behavioral interventions reduce ADHD combined symptoms, inattention, and externalizing problems, and improve academic and social skills.

**CBT for adults with ADHD: meta-analysis of RCTs (2023)**
https://pubmed.ncbi.nlm.nih.gov/36794797/
Meta-analysis finding CBT effective for adults with ADHD in reducing core symptoms, depression, anxiety, and improving quality of life. Moderate effect sizes even vs active controls.

---

## Functional impact of ADHD in daily life

**Functional Impairments Associated With ADHD in Adulthood**
https://pmc.ncbi.nlm.nih.gov/articles/PMC10173356/
Reviews the breadth of real-life impairment from ADHD: work, relationships, finances, health. Important context for understanding what any intervention actually needs to change.

**Lived Experiences of Adults Diagnosed With ADHD**
https://nsuworks.nova.edu/fse_etd/399/
https://nsuworks.nova.edu/cgi/viewcontent.cgi?article=1426&context=fse_etd
Qualitative study with adults diagnosed with ADHD. Themes: chronic sense of being behind, misunderstood, mislabeled as lazy, and relief after diagnosis. Shows the human cost and why real-world transfer from any training matters so much.

---

> **Key takeaway across all sources:** Go/No-Go tasks reliably train inhibition on the task itself; the harder and still-unsolved problem is getting that to matter outside the game.
