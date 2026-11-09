---
theme: none
title: Mastering Claude Code
info: |
  ## Mastering Claude Code
  The loop, the gate, the proof.
  nextacademy.io · Adam Furmanczuk
colorSchema: dark
highlighter: shiki
lineNumbers: false
drawings:
  enabled: false
transition: fade
mdc: true
fonts:
  sans: 'Inter'
  mono: 'JetBrains Mono'
  weights: '400,500,600,700,800'
css: unocss
layout: concept
---

<div class="flex flex-col items-center gap-8 text-center">
  <img src="/brand/nalogo-white-n.svg" alt="nextacademy.io" class="w-20 h-20" />
  <div>
    <h1 class="!mb-2">Mastering Claude Code</h1>
    <p class="text-2xl" style="color: var(--na-fg-muted)">
      Learn What's Next. <span style="color: var(--na-primary-400); font-weight: 700">Today.</span>
    </p>
  </div>
  <div class="text-lg" style="color: var(--na-fg-muted)">Adam Furmanczuk · nextacademy.io</div>
  <div class="na-card px-6 py-3 text-lg" style="border-color: var(--na-accent-500)">
    Stay to the end. There is a gift: <span style="color: var(--na-accent-500); font-weight: 700">a starter repo to take home.</span>
  </div>
</div>

<div class="absolute inset-x-0 bottom-3 text-center text-sm" style="color: var(--na-fg-muted)">
  © nextacademy.io, a project of SunsetPicnic UG (haftungsbeschränkt). All rights reserved.
</div>

<!--
- Dieses Deck gehört zum einstündigen Webinar «Claude Code Black Belt» von nextacademy.io. Es zeigt an einer echten App, wie ein Coding-Agent arbeitet und wie du ihm Grenzen setzt, die er nicht überschreiten kann
- Das Geschenk am Ende ist dieses Repo: eine Übungsaufgabe auf derselben App (`TASK.md`), das Verification Kit auf dem Branch `webinar-solution` und ein Cheat Sheet für vier Tools
-->

---
layout: concept
heading: "Where do you stand today?"
lines:
  - "Three quick polls. Anonymous. Any tool counts, and starting from zero counts too."
---

<div class="flex flex-col items-center gap-6 w-full">
<div class="flex items-end gap-4 w-full max-w-4xl justify-center text-sm">
  <div class="na-card px-4 py-3" :style="$clicks >= 1 ? 'border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)' : ''">you watch</div>
  <div class="na-card px-4 py-5 w-28">&nbsp;</div>
  <div class="na-card px-4 py-7 w-28">&nbsp;</div>
  <div class="na-card px-4 py-9 w-28">&nbsp;</div>
  <div class="na-card px-4 py-11">CI / routine</div>
</div>
<div v-click="1" class="text-xl font-semibold" style="color: var(--na-accent-500)">Today we all start here.</div>
</div>

<!--
- Im Webinar beginnt hier ein Check-in mit drei Umfragen: Womit arbeitest du (Claude Code, GitHub Copilot, Codex, OpenCode, ein anderes Tool, noch keins)? Was hast du schon eingerichtet (nur gefragt, CLAUDE.md oder AGENTS.md, Skills, Hooks, Agent-Teams)? Was kostet dich am meisten?
- Die Treppe zeigt, wie viel ein Agent ohne dich tun darf, von «you watch» bis «CI / routine». Sie kommt auf Folie 13 zurück
- [click] Wir beginnen alle unten: Du schaust jedem Schritt zu
-->

---
layout: concept
heading: "One question, two answers"
---

<div class="flex flex-col items-center gap-6 w-full max-w-3xl">

```txt
Can a talk start in the past?
Can two talks share a room and a start?
Name the file behind each answer.
```

<div v-click class="text-2xl font-semibold" style="color: var(--na-accent-500)">Both: yes. Nothing checks either.</div>

</div>

<!--
- Die App ist clash-conference auf `localhost:3001`: das Programm einer Konferenz. Ein Talk hat Titel, Beschreibung, Startzeit und optional einen Raum
- Die Frage an Claude Code, auf dem Branch `webinar-start`, wörtlich: Read the code only, change nothing. Can a talk start in the past? Can two talks share a room and a start? Name the file and line behind each answer.
- [click] Beides geht. `lib/validation.ts` prüft nur, ob das Datum gültig ist, nicht, ob es sinnvoll ist. Ein alter Test, «a start in the past is accepted», verlangt das sogar
- Hier steht kein Fehler im Code, hier fehlen zwei Regeln. Wann ein Talk beginnen darf, ist eine Fachfrage: für POs eine Entscheidung, für BAs ein Akzeptanzkriterium, für UX ein Text im Interface
- Claude lag richtig, weil es gelesen hat. Geraten hätte genauso sicher geklungen
-->

---
layout: concept
heading: "Fluent is not the same as true"
lines:
  - "The model always produces something that reads well."
---

<div class="flex gap-6 w-full max-w-3xl">
  <div class="na-card p-5 flex-1" style="border-color: var(--na-error-500)">
    <div class="font-mono text-xs mb-2" style="color: var(--na-error-500)">guessing</div>
    <div class="text-base">"What does lib/validation.ts check for a start?"</div>
    <div class="text-sm mt-2" style="color: var(--na-fg-muted)">Answer from training. Plausible. Maybe wrong.</div>
  </div>
  <div class="na-card p-5 flex-1" v-click style="border-color: var(--na-success-500)">
    <div class="font-mono text-xs mb-2" style="color: var(--na-success-500)">grounded</div>
    <div class="text-base">"Read @lib/validation.ts. What does it check for a start?"</div>
    <div class="text-sm mt-2" style="color: var(--na-fg-muted)">Answer from the file. Checkable.</div>
  </div>
</div>

<!--
- Ein Sprachmodell erzeugt immer etwas, das sich gut liest. Ob es stimmt, ist eine andere Frage
- Links fragt man nach einer Datei, ohne sie zu zeigen: Die Antwort kommt aus dem Training, plausibel und vielleicht falsch
- [click] Rechts zeigt man die Datei mit `@`: Die Antwort kommt aus der Datei und lässt sich prüfen. So hat Claude auf Folie 3 gearbeitet
- Die Frage, die ab jetzt jede Rolle stellt: Woher stammt diese Antwort, gelesen oder geraten?
- Deshalb braucht es ein Programm um das Modell, das nachschaut: den Harness
-->

---
layout: concept
heading: "The loop"
docs: https://code.claude.com/docs/en/how-claude-code-works
lines:
  - "You write. The harness builds the prompt. The model chooses a tool or answers."
  - "The harness runs the tool and feeds the result back. Until the model answers."
---

<D07HarnessLoop />

<!--
- Das Modell allein ist eine Funktion: Text rein, Text raus. Der Ring drumherum ist der Harness. Claude Code ist ein Harness, GitHub Copilot, Codex und OpenCode sind es auch
- [click] Du schreibst. Der Harness baut den Prompt
- [click] Er ruft das Modell. Das Modell wählt: ein Tool oder eine Antwort
- [click] Will es ein Tool, fragt das Gate: Ist das erlaubt?
- [click] Der Harness führt das Tool aus, nicht das Modell
- [click] Das Ergebnis kommt zurück in den Prompt, und der Ring dreht sich weiter
- [click] Erst wenn das Modell mit Text antwortet, endet der Turn
- Auf Folie 3 hat der Harness `validation.ts` bei «run tool» gelesen. Das Modell hat nur entschieden, die Datei zu lesen
- Der Ring zeigt, wo du eingreifst: beim Prompt (die Datei zeigen), am Gate (Permissions) und rund um das Tool (Hooks)
- Wie die vier Tools den Ring beschreiben, steht im Cheat Sheet
-->

---
layout: concept
heading: "A question that skips the loop"
lines:
  - "Answered from what is already in the window. No tool call, no new turn."
---

<D07HarnessLoop btw />

<!--
- Auf derselben App baut Claude die zwei Regeln ein. Der Prompt: Add both rules: a start must be in the future, and no two talks share a room and a start. Run npm test.
- Während es arbeitet, kommt eine Zwischenfrage: `/btw why does the old past-start test have to fail?`
- [click] Die Arbeit bricht nicht ab. `/btw` geht direkt ans Modell, ohne Runde über den Ring. Die Antwort kommt nur aus dem, was schon im Gespräch steht: kein Tool, kein Gate, kein neuer Turn. Darunter läuft der Fix weiter
- Andere Tools: Copilot kennt ebenfalls `/btw`, Codex hat `/side`, bei OpenCode belegst du dafür selbst eine Taste. Details im Cheat Sheet
- Nach dem Fix zeigt die App «Start must be in the future.» unter dem Startfeld und «This room is already booked at that time.» unter «Room»
- Der alte Test «a start in the past is accepted» wird rot, denn er verlangte das Gegenteil der neuen Regel. Die CLAUDE.md auf `webinar-start` sagt: Never edit a file in tests/ to make a failing test pass. Fragt Claude nach, hat es den Rat befolgt. Ändert es den Test, wäre die Änderung hier fachlich richtig, aber niemand hat gefragt
- `npm test` setzt die Datenbank `dev.db` zurück. Selbst angelegte Talks sind danach weg
-->

---
layout: concept
heading: "Ten runs per level end in a tie"
---

<div class="flex flex-col items-center gap-6 w-full max-w-3xl">
<div class="grid grid-cols-4 gap-2 w-full text-sm">
  <div></div><div class="font-semibold text-center">correct</div><div class="font-semibold text-center">false +</div><div class="font-semibold text-center">median output tokens</div>
  <div class="na-card p-3 font-mono">low</div><div class="na-card p-3 text-center">4/4 in 10 of 10</div><div class="na-card p-3 text-center">0</div><div class="na-card p-3 text-center">1366</div>
  <div class="na-card p-3 font-mono" v-click="1">high</div><div class="na-card p-3 text-center" v-click="1">4/4 in 10 of 10</div><div class="na-card p-3 text-center" v-click="1">0</div><div class="na-card p-3 text-center" v-click="1">1658</div>
</div>
<div v-click="1" class="text-xl font-semibold" style="color: var(--na-accent-500)">Every run found all four bugs. Not one false positive.</div>
</div>

<!--
- Effort heisst, wie viel das Modell auf jedem Schritt nachdenkt
- Ein Messwert aus dem Kurs: dieselbe Datei, derselbe Prompt, dasselbe Modell, je zehn Läufe. Auf low findet jeder Lauf alle vier Bugs, ohne falschen Fund
- [click] Auf high genau dasselbe. Der Median steigt von 1366 auf 1658 Output-Tokens, etwa ein Fünftel mehr, für längere Begründungen. Die Bereiche überlappen nicht
- Das gilt für diese Aufgabe, eine kleine Datei und ein Modell. Ein Messwert, kein Gesetz
- Mehr Denken ändert nicht, was der Loop darf. Das entscheiden die Permissions
-->

---
layout: concept
heading: "Permissions"
lines:
  - "The model asks. The harness decides: a rule from settings, or you."
  - "The mode sets how often the gate asks you."
---

<D09PermissionGate />

<!--
- Den Tool-Aufruf wählt das Modell, entscheiden tut der Harness
- [click] Gibt es eine Regel in den Settings?
- [click] Wenn ja: erlaubt oder verboten, ohne dich
- [click] Wenn nein: Du wirst gefragt
- [click] Manual fragt vor Edits und Commands
- [click] Accept edits lässt Datei-Änderungen durch
- [click] Plan schaut nur und plant
- [click] Auto lässt einen Klassifikator riskante Aktionen blocken
- [click] Bypass überspringt fast alles. Bypass kommt auf Folie 11 zurück
- Ein Tool, das Dinge tut, ohne zu fragen, hat keinen Charakterzug, sondern einen Modus
- Für UX: Jede Rückfrage ist Interface-Entwurf. Zu viele, und niemand liest sie mehr
-->

---
layout: concept
heading: "Hooks"
lines:
  - "Your own shell command on the ring: before a tool, after it, or at the exit"
  - "Before a tool, exit 2 blocks it. After a tool, exit 2 gives the model the error."
---

<D07HarnessLoop hooks />

<!--
- Ein Hook ist dein eigenes Shell-Kommando an einer festen Stelle im Ring
- [click] Vor dem Tool: Exit-Code 2 blockiert den Aufruf, noch vor jeder Regel
- [click] Nach dem Tool: Das Tool ist schon gelaufen. Exit 2 gibt dem Modell den Fehler zurück
- [click] Am Ausgang: Exit 2 hält den Turn offen
- Hooks gibt es in allen vier Tools, bei OpenCode über Plugins. Wer bisher nur fragt: Der Hook ist die erste Idee zum Mitnehmen
-->

---
layout: concept
heading: "Advice vs. law"
---

<div class="flex gap-6 w-full max-w-4xl">
  <div class="na-card p-5 flex-1" style="border-style: dashed; border-color: var(--na-zinc-600)">
    <div class="text-sm font-semibold mb-3" style="color: var(--na-fg-muted)">ADVICE</div>
    <div class="text-base">CLAUDE.md: Never edit a file in <code style="color: var(--na-accent-500)">tests/</code> to make a failing test pass.</div>
    <div class="text-sm mt-3" style="color: var(--na-fg-muted)">Can be forgotten.</div>
  </div>
  <div v-click class="na-card p-5 flex-1" style="border-color: var(--na-primary-500); box-shadow: var(--na-shadow-accent)">
    <div class="text-sm font-semibold mb-3" style="color: var(--na-primary-400)">LAW</div>
    <div class="text-base">Deny: <code>Edit(tests/**)</code>. Hook: blocks <code>db:seed</code>, <code>db:reset</code>, <code>setup</code> and <code>rm dev.db</code>. Exit 2.</div>
    <div class="text-sm mt-3" style="color: var(--na-fg-muted)">Runs outside the model, every time.</div>
  </div>
</div>

<!--
- Links der Rat: eine Zeile in der CLAUDE.md. Das Modell liest sie bei jedem Start und kann sie trotzdem übergehen. Bei Codex und OpenCode heisst die Datei AGENTS.md
- [click] Rechts das Gesetz, in `.claude/settings.json`: ein Deny auf `Edit(tests/**)` und ein Hook vor jedem Shell-Befehl, der `npm run setup`, `db:seed`, `db:reset` und das Löschen von `dev.db` mit Exit 2 blockt. Beides läuft ausserhalb des Modells, jedes Mal
- Die Szene im Webinar, auf dem Branch `webinar-demo-law`: Claude soll den roten alten Test grün machen. Der Edit am Test wird verweigert, vom Harness, nicht von Claude. Danach drei mögliche Ausgänge: Claude fragt nach, Claude gibt auf, oder Claude lockert stattdessen die Regel in `lib/validation.ts`. Dann ist der Test grün und die Regel gebrochen, darum geht es auf Folie 12
- Dann: Run npm run db:seed now. I allow it. Der Hook blockt trotzdem und sagt, warum
- CLAUDE.md ist der Zettel am Kühlschrank, der Hook ist das Schloss. Für BAs: Ein Hook ist eine Definition of Done, die niemand überspringen kann
- Die Grenze des Hooks: `npm test` löscht trotzdem alle Talks, denn es startet den Seed selbst. Was ein erlaubter Befehl tut, regelt der Hook nicht. Dafür gibt es einen Zaun um den Befehl: die Sandbox
-->

---
layout: concept
heading: "The escape hatch: an unsandboxed retry"
docs: https://code.claude.com/docs/en/sandboxing#the-unsandboxed-retry-escape-hatch
lines:
  - "A command fails sandboxed. Claude may retry with dangerouslyDisableSandbox."
  - "allowUnsandboxedCommands: false switches the retry off."
---

<div class="flex flex-col items-center gap-6 w-full">
<div v-click="1" class="text-xl font-semibold" style="color: var(--na-accent-500)">Manual mode asks you first. Bypass mode does not.</div>
<div class="na-card p-5 font-mono text-sm w-full max-w-md">
  <div>{ "sandbox": {</div>
  <div>&nbsp;&nbsp;"enabled": true,</div>
  <div v-click="2" style="color: var(--na-accent-500)">&nbsp;&nbsp;"allowUnsandboxedCommands": false</div>
  <div>} }</div>
</div>
</div>

<!--
- Eine Sandbox ist ein Zaun um einen Befehl. Der Hook selbst läuft übrigens mit deinen vollen Rechten
- Der Zaun hat eine Tür: Scheitert ein Befehl in der Sandbox, darf Claude ihn mit `dangerouslyDisableSandbox` ausserhalb wiederholen
- [click] Im manuellen Modus fragt Claude dich vorher, im Bypass-Modus nicht. Dann steht niemand an der Tür
- [click] Eine Zeile in den Settings schliesst die Tür: `"allowUnsandboxedCommands": false`
- Unter Windows läuft die Sandbox in WSL2, auf macOS und Linux direkt
- Andere Tools: Copilot hat eine OS-Sandbox, standardmässig aus; `sandbox.allowBypass: false` schliesst die Tür. Bei Codex ist die Sandbox standardmässig an; wer sie verlässt, wird gefragt, oder eine automatische Prüfung entscheidet. OpenCode hat keine Sandbox. Mehr im Cheat Sheet
- Auch mit geschlossener Tür bleibt das Projekt beschreibbar, dafür arbeitet Claude ja darin. Also darf der Agent auch den Test ändern, solange nichts anderes es verbietet
-->

---
layout: concept
heading: "Update the test, or fix the code?"
---

<div class="w-full grid grid-cols-2 gap-8 text-base">
  <div class="flex flex-col gap-2">
    <div class="font-semibold text-center" style="color: var(--na-fg-muted)">Careless</div>
    <div v-click="1" class="na-card px-3 py-2" style="border-color: var(--na-zinc-700)">“update the test so the suite passes”</div>
    <div v-click="2" class="na-card px-3 py-2" style="border-color: var(--na-zinc-700)">Claude edits the assertion</div>
    <div v-click="3" class="text-center font-semibold mt-1" style="color: var(--na-error-500)">green, rule broken</div>
  </div>
  <div class="flex flex-col gap-2">
    <div class="font-semibold text-center" style="color: var(--na-fg-muted)">Engineered</div>
    <div v-click="4" class="na-card px-3 py-2 font-mono text-sm" style="border-color: var(--na-primary-500)">“change lib/validation.ts only, not the tests”</div>
    <div v-click="5" class="na-card px-3 py-2" style="border-color: var(--na-primary-500)">Claude edits the logic</div>
    <div v-click="6" class="text-center font-semibold mt-1" style="color: var(--na-success-500)">green, rule holds</div>
  </div>
  <p v-click="7" class="col-span-2 text-center mt-2">Same failing test. Which file was allowed to change?</p>
</div>

<!--
- Zwei rote Tests, zwei Antworten. Den alten durfte die Fachseite ändern, weil sich das Produkt geändert hat. Den neuen darf niemand ändern, er ist die Regel
- Eine Geschichte dazu: Ein Kollege bat Claude, ein BCC zu seinem E-Mail-Tool hinzuzufügen. Im Plan stand, nebenbei die GDPR- und Privacy-Seiten umzuschreiben. Er las den ganzen Plan und fing es vor dem Ausrollen ab. Einen Plan liest man. Einen geänderten Test liest keiner mehr
- Ausgangslage: Die neue Spec «a start in the past is refused on create» ist rot
- [click] Links der Prompt: update the test so the suite passes
- [click] Claude ändert die Assertion, nicht den Code
- [click] Die Suite ist grün. Aber der Code bricht die Regel weiter, und kein Test prüft sie mehr
- [click] Rechts: change lib/validation.ts only, not the tests
- [click] Claude ändert die Logik. Der Test sagt noch, was er sagte
- [click] Grün, weil die Regel wirklich gilt
- [click] Derselbe rote Test. Die Frage ist, welche Datei sich ändern durfte
- Für BAs: Die Regel, die der Test beweist, gehört der Fachseite. Für POs: Bei jeder Abnahme fragen, welche Datei sich ändern durfte, um grün zu werden
- Die Sandbox hätte das nicht verhindert, denn Datei-Tools folgen den Permission-Regeln. Auch `/goal` verhindert es nicht: Sein Prüfer ist ein kleiner Bewerter, der feststellt, ob das Ziel erreicht ist. Die Grenze hält er nicht
- In Claude Code deckt `Edit(tests/**)` alle Datei-Tools. Bei Copilot gelten nur exakte Pfade, bei Codex ein Profil ohne Garantie. Details im Cheat Sheet
- Die Grenze gehört in die Settings, nicht in den Prompt
-->

---
layout: concept
heading: "Autonomy is earned by verification"
lines:
  - "More freedom needs stronger evidence, isolation and limits."
  - "Do not scale autonomy beyond your ability to detect and contain errors."
---

<div class="flex items-end gap-4 w-full max-w-4xl justify-center text-sm">
  <div class="na-card px-4 py-3">you watch</div>
  <div class="na-card px-4 py-5" v-click>goal + gates</div>
  <div class="na-card px-4 py-7" v-click>isolated agents</div>
  <div class="na-card px-4 py-9" v-click>background / batch</div>
  <div class="na-card px-4 py-11" v-click>CI / routine</div>
</div>

<!--
- Die Treppe von Folie 2: Mehr Freiheit braucht stärkere Belege, Isolation und Grenzen
- Ganz unten: you watch. Im Webinar war das der Live-Lauf, jeder Schritt unter Aufsicht
- [click] goal + gates: Ein Check, nicht deine Augen, entscheidet, wann der Lauf stoppt, hier der Hook und der Test. `/goal` ist die kleinste Stufe, zum Beispiel: /goal The new spec passes, npm test passes and npm run lint has no warnings. Show the output of both commands in your last message. Dass `tests/` dabei unverändert bleibt, hält der Deny, nicht der Prüfer des Goals
- [click] isolated agents: die Sandbox
- [click] background und batch: mehrere Agenten auf einmal, im Hintergrund
- [click] CI und Routinen: ohne dich
- Jeder Schritt weg von der Tastatur nimmt eine Korrekturschleife weg
- Für POs: Dieselbe Frage stellst du bei jedem neuen Teammitglied: Wie viel darf es allein, und woran merken wir einen Fehler? Für BAs: Das Akzeptanzkriterium ist der Beleg, der eine Stufe trägt. Für Architektur: Isolation ist eine Stufe, keine Einstellung
- Was würdest du Claude heute nicht allein machen lassen?
-->

---
layout: concept
heading: "Autonomy is earned by verification"
lines:
  - "More freedom needs stronger evidence, isolation and limits."
  - "Do not scale autonomy beyond your ability to detect and contain errors."
---

<div class="flex items-end gap-4 w-full max-w-4xl justify-center text-sm">
  <div class="na-card px-4 py-3" style="opacity: 0.5">you watch</div>
  <div class="na-card px-4 py-5" style="opacity: 0.5">goal + gates</div>
  <div class="na-card px-4 py-7" style="opacity: 0.5">isolated agents</div>
  <div class="na-card px-4 py-9" style="border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)">background / batch</div>
  <div class="na-card px-4 py-11" style="border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)">CI / routine</div>
</div>

<!--
- Drei Stufen hat das Webinar gezeigt: den Live-Lauf, den Hook und die Sandbox
- Die oberen zwei Stufen leuchten. Dort liefe genau das ohne dich, was du Claude heute nicht allein machen lassen würdest. Was ist dann dein Beleg?
- Und wer baut diese Stufen?
-->

---
layout: concept
heading: "The steps where nobody watches"
---

<div class="grid grid-cols-2 gap-8 w-full max-w-3xl">
  <div class="na-card p-6" style="border-color: var(--na-accent-500)">
    <div class="text-sm font-semibold mb-2 font-mono" style="color: var(--na-accent-500)">/batch</div>
    <div class="text-lg">Many separate units, each ending as a tested pull request.</div>
  </div>
  <div v-click class="na-card p-6" style="border-color: var(--na-accent-500)">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">CI</div>
    <div class="text-lg">A pull request opens. The same agent audits it. Nobody watches.</div>
  </div>
</div>

<!--
- Das sind die zwei Stufen, die das Webinar nicht geklettert ist
- Links `/batch`: viele einzelne Einheiten, jede endet als getesteter Pull Request
- [click] Rechts CI: Ein Pull Request geht auf, derselbe Agent prüft ihn, und niemand schaut zu
- Beide baut der Kurs «Mastering Claude Code» in Teil IV, «Orchestrate and let go», in der Task «Letting go». Wer so loslässt, braucht für jede Stufe einen Beleg wie den, den das Webinar für den Loop gebaut hat
- Der Publish-Knopf in clash-conference ist die nächste Stufe: ein Agent, der ohne dich in der App läuft. Den baust du im Kurs in Task 19
-->

---
layout: concept
---

<div class="flex flex-col items-center gap-6 text-center">
  <img src="/brand/nalogo-white-n.svg" alt="nextacademy.io" class="w-20 h-20" />
  <h1 class="!mb-0">Mastering Claude Code</h1>
  <p class="text-3xl font-semibold" style="color: var(--na-accent-500)">24–26 November</p>
  <p class="text-xl max-w-2xl">Book by 18 November 2026 and save 25 %.</p>
  <div class="na-card px-6 py-4 font-mono text-xl" style="border-color: var(--na-accent-500)"><span v-pre>{{BOOKING_URL}}</span></div>
</div>

<!--
- Der Kurs «Mastering Claude Code» läuft vom 24. bis 26. November 2026. Wer bis zum 18. November 2026 bucht, spart 25 %
- Wer tiefer einsteigen will, kann sich gern melden
-->

---
layout: concept
heading: "You stayed to the end"
---

<div v-click class="flex items-center gap-8">
  <div class="na-card px-8 py-6 text-2xl max-w-xl" style="border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)">
    Your gift: <span style="color: var(--na-accent-500); font-weight: 700">a repo with a verification kit, a course task and a cheat sheet.</span>
    <div class="font-mono text-base mt-4" style="color: var(--na-fg-muted)"><span v-pre>{{GIFT_URL}}</span></div>
  </div>
  <div class="na-card w-40 h-40 flex items-center justify-center font-mono text-sm" style="color: var(--na-fg-muted)">QR</div>
</div>

<div class="absolute inset-x-0 bottom-3 text-center text-sm" style="color: var(--na-fg-muted)">
  © nextacademy.io, a project of SunsetPicnic UG (haftungsbeschränkt). All rights reserved.
</div>

<!--
- Dieses Repo ist das Geschenk
- [click] `TASK.md` ist die Übungsaufgabe: dieselbe App, dieselben zwei Regeln, diesmal baust du sie selbst, vom Branch `webinar-start` bis zur Lösung auf `webinar-solution`. Das Verification Kit ist, was `webinar-solution` absichert: der Deny auf `tests/**`, der Hook für `dev.db` und die Regeln in der CLAUDE.md. Das Cheat Sheet zeigt die Handgriffe in Claude Code, GitHub Copilot, Codex und OpenCode
- Wer ein anderes Tool nutzt: Die Zeilen im Cheat Sheet sind Fragen, die du jedem Tool stellen kannst
-->
