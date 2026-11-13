---
theme: none
title: Claude Code Black Belt
info: |
  ## Claude Code Black Belt
  Zugzwang: who decides when the agent has to move?
  nextacademy.io · Adam Furmanczuk
colorSchema: dark
highlighter: shiki
lineNumbers: false
selectable: true
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
    <h1 class="!mb-2">Claude Code Black Belt</h1>
    <p class="text-2xl" style="color: var(--na-fg-muted)">
      Zugzwang: <span style="color: var(--na-primary-400); font-weight: 700">who decides when the agent has to move?</span>
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
- Zugzwang im Schach: Du musst ziehen, jeder Zug hat einen Preis.
- Heute: was das für Claude Code bedeutet.
- Wer bis zum Schluss bleibt, bekommt ein Geschenk.
- 👋 Kurze nextacademy-Trainervorstellung.
-->

---
layout: concept
class: na-poll
heading: "How often do you work with a coding agent?"
lines:
  - "Claude Code or any other. Type the number in the chat."
---

<div class="flex flex-col items-center gap-6 w-full">
<div class="text-sm font-mono" style="color: var(--na-fg-muted)">Poll 1 of 4</div>
<div class="grid grid-cols-4 gap-3 w-full max-w-3xl">
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">1</div><div class="text-base mt-1">almost never</div></div>
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">2</div><div class="text-base mt-1">rarely</div></div>
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">3</div><div class="text-base mt-1">weekly</div></div>
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">4</div><div class="text-base mt-1">daily</div></div>
</div>
</div>

<!--
- Vier kurze Fragen. Kein Test, ich will nur wissen, wer da ist.
- 💬 Eine Zahl in den Chat.
- Wer noch nichts hat, ist hier richtig. Wir erklären jeden Begriff.
- Kurz vorlesen, wo die Mehrheit liegt.
-->

---
layout: concept
class: na-poll
heading: "What do you work with?"
lines:
  - "Several? Type all numbers, for example: 1 3"
---

<div class="flex flex-col items-center gap-6 w-full">
<div class="text-sm font-mono" style="color: var(--na-fg-muted)">Poll 2 of 4</div>
<div class="grid grid-cols-5 gap-3 w-full max-w-4xl">
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">1</div><div class="text-base mt-1">Claude Code</div></div>
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">2</div><div class="text-base mt-1">GitHub Copilot</div></div>
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">3</div><div class="text-base mt-1">Codex</div></div>
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">4</div><div class="text-base mt-1">Cursor</div></div>
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">5</div><div class="text-base mt-1">something else</div></div>
</div>
</div>

<!--
- 💬 Mehrere Zahlen gehen.
- Notieren: das Tool mit den meisten Stimmen ausser Claude Code.
- Kurz vorlesen.
-->

---
layout: concept
class: na-poll
heading: "What have you set up?"
lines:
  - "Several? Type all numbers, for example: 2 4"
---

<div class="flex flex-col items-center gap-6 w-full">
<div class="text-sm font-mono" style="color: var(--na-fg-muted)">Poll 3 of 4</div>
<div class="grid grid-cols-5 gap-3 w-full max-w-4xl">
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">1</div><div class="text-base mt-1">chat only</div></div>
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">2</div><div class="text-base mt-1">CLAUDE.md or AGENTS.md</div></div>
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">3</div><div class="text-base mt-1">skills</div></div>
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">4</div><div class="text-base mt-1">hooks</div></div>
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">5</div><div class="text-base mt-1">subagents or agent teams</div></div>
</div>
</div>

<!--
- 💬 Mehrere Zahlen gehen.
- Notieren: wie viele haben 4, Hooks. Kommt bei den Hooks zurück.
-->

---
layout: concept
class: na-poll
heading: "Has your agent ever changed an existing test?"
lines:
  - "Type the number in the chat. An honest answer helps."
---

<div class="flex flex-col items-center gap-6 w-full">
<div class="text-sm font-mono" style="color: var(--na-fg-muted)">Poll 4 of 4</div>
<div class="grid grid-cols-4 gap-3 w-full max-w-3xl">
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">1</div><div class="text-base mt-1">yes, I noticed</div></div>
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">2</div><div class="text-base mt-1">yes, noticed later</div></div>
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">3</div><div class="text-base mt-1">no</div></div>
  <div class="na-card px-3 py-3 text-center"><div class="text-3xl font-bold" style="color: var(--na-accent-500)">4</div><div class="text-base mt-1">don't know</div></div>
</div>
</div>

<!--
- Ehrlich antworten lohnt sich.
- Notieren: wie viele haben 4, weiss ich nicht. Kommt beim Zugzwang zurück.
- 💬 Wer mag: eure Rolle in den Chat. Dev, PO, BA, Architektur, UX.
-->

---
layout: concept
heading: "Where do you stand today?"
lines:
  - "How much does the agent do without you?"
---

<div class="flex flex-col items-center gap-6 w-full">
<div class="flex items-end gap-4 w-full max-w-4xl justify-center text-sm">
  <div class="na-card px-4 py-3" :style="$clicks >= 1 ? 'border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)' : ''">pair with Claude</div>
  <div class="na-card px-4 py-5 w-28">&nbsp;</div>
  <div class="na-card px-4 py-7 w-28">&nbsp;</div>
  <div class="na-card px-4 py-9 w-28">&nbsp;</div>
  <div class="na-card px-4 py-11">CI / routine</div>
</div>
<div v-click="1" class="text-xl font-semibold" style="color: var(--na-accent-500)">Today's live demo starts here.</div>
</div>

<!--
- Ihr steht an ganz verschiedenen Stellen.
- Die Treppe: wie viel der Agent ohne euch macht. Unten pair with Claude, oben CI.
- [click] Die Demo fängt unten an: pair with Claude.
- Zuerst eine Frage, bei der ihr euch festlegt.
-->

---
layout: concept
heading: "The app: two questions, one answer"
---

<div class="grid grid-cols-2 gap-8 w-full max-w-5xl items-center">
<div class="flex flex-col gap-2">
  <img src="/clash-conference.png" alt="clash-conference: a list of three draft talks, each with a start time and a room" class="rounded-lg" style="border: 1px solid var(--na-zinc-700)" />
  <div class="text-sm" style="color: var(--na-fg-muted)">clash-conference: the program of a conference. A talk has a title, a start and a room.</div>
</div>
<div class="flex flex-col gap-6">

```txt
Can a talk start in the past?
Can two talks share a room and a start?
Name the file and line behind each answer.
```

<div v-click class="text-2xl font-semibold" style="color: var(--na-accent-500)">Both: yes. Nothing checks either.</div>

</div>
</div>

<!--
- 🖥 20 Sekunden Browser: die Liste, einmal Edit.
- Ihr organisiert eine Konferenz. Ein Talk hat Titel, Start und Raum.
- 📊 Beides geht, nur eins oder keins? Schliessen, zeigen.
- 🖥 Prompt abschicken.
- Während es läuft: Achtet auf die Tool-Aufrufe. Das ist Claude beim Lesen.
- [click] Beides geht. Das Datum ist gültig, ob es sinnvoll ist, prüft niemand.
- Ein alter Test verlangt sogar die Vergangenheit. Merkt ihn euch.
- Kein Fehler im Code, hier fehlen zwei Regeln.
- Claude lag richtig, weil es gelesen hat. Liest es immer?
-->

---
layout: concept
heading: "Fluent is not the same as true"
lines:
  - "The model always produces something that reads well."
  - "It reads your code on its own. It guesses where it thinks it already knows."
---

<div class="flex flex-col gap-4 w-full max-w-4xl">
<div class="na-card px-4 py-3 font-mono text-sm">Can Claude still change a test with sed -i when Edit(tests/**) is denied?</div>
<div class="flex gap-6 w-full">
  <div class="na-card p-5 flex-1" style="border-color: var(--na-error-500)">
    <div class="font-mono text-xs mb-2" style="color: var(--na-error-500)">guessing · “quick question”</div>
    <div class="text-base">“Yes: the deny only covers the file tools, not Bash.”</div>
    <div class="text-sm mt-2" style="color: var(--na-fg-muted)">No tool call. From training. Sure of itself. Wrong.</div>
  </div>
  <div class="na-card p-5 flex-1" v-click style="border-color: var(--na-success-500)">
    <div class="font-mono text-xs mb-2" style="color: var(--na-success-500)">grounded · “check the docs first”</div>
    <div class="text-base">“No: Edit deny rules also cover sed, tee and &gt; in Bash.”</div>
    <div class="text-sm mt-2" style="color: var(--na-fg-muted)">Read the permissions docs, then answered. Quotes the source.</div>
  </div>
</div>
</div>

<!--
- Euren Code liest Claude heute selbst.
- 🖥 /clear, die schnelle Frage zu sed.
- Ja, sagt es. Sicher, flüssig, kein Tool-Aufruf davor. Und falsch.
- [click] 🖥 /clear, dieselbe Frage mit «Check the docs first».
- Jetzt steht ein Doku-Aufruf davor. Die Antwort: Nein, mit Zitat.
- Geraten wird, wo es glaubt, es wisse es schon.
- Ab jetzt die Frage: gelesen oder geraten? Steht ein Tool-Aufruf davor?
- Deshalb braucht es ein Programm drumherum: den Harness.
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
- Der Ring ist der Harness. Claude Code ist einer.
- [click] Du schreibst, der Harness baut den Prompt.
- [click] Das Modell wählt: Tool oder Antwort.
- [click] Das Gate fragt: erlaubt?
- [click] Der Harness führt aus, nicht das Modell.
- [click] Ergebnis zurück, der Ring dreht sich.
- [click] Textantwort: Der Turn endet.
- Aber mitten im Lauf kommt eine Frage.
-->

---
layout: concept
heading: "A question that skips the loop"
lines:
  - "Answered from what is already in the window. No tool call, no new turn."
---

<D07HarnessLoop btw />

<!--
- Jetzt sind alle Tests grün.
- 🖥 Zwei Regeln in CLAUDE.md. Ich bin die Fachseite.
- 🖥 Spec-Prompt: Claude schreibt zuerst die Tests, kein App-Code.
- Während es schreibt, eine Zwischenfrage: /btw.
- 💬 J oder N: Bricht die Arbeit ab?
- [click] Nein. Direkt ans Modell, kein Tool, kein neuer Turn.
- Codex hat /side, Copilot /ask.
- 🖥 Neun Specs, fünf rot. Gewollt: Der Code fehlt noch.
- 🖥 Implement-Prompt: talk-rules grün machen. Das dauert, wir machen weiter.
- Während Claude baut: Wie lange soll es nachdenken?
-->

---
layout: concept
heading: "Thinking time: more effort, better move?"
lines:
  - "Effort sets how deep the model may think. It decides per step."
---

<div class="flex flex-col items-center gap-6 w-full max-w-3xl">
<div class="grid grid-cols-2 gap-6 w-full">
  <div class="na-card p-5 text-center font-mono text-xl">--effort low</div>
  <div class="na-card p-5 text-center font-mono text-xl" style="border-color: var(--na-accent-500)">--effort high</div>
</div>
<div class="text-lg">Same file. Same prompt. Same model. Four hidden bugs.</div>
<div v-click class="text-xl font-semibold" style="color: var(--na-accent-500)">The race starts now. The result comes later.</div>
</div>

<!--
- Im Schach hat jeder Zug Bedenkzeit. Bei Claude heisst sie Effort.
- Mehr Bedenkzeit, besserer Zug? Wir messen es.
- Dieselbe Datei, derselbe Prompt, dasselbe Modell, vier Bugs.
- [click] 🖥 Rennterminal: node measure.mjs 5. Erste Zeile zeigen, zurück.
- Mehr Denken ändert nicht, was der Loop darf. Wer entscheidet das?
-->

---
layout: concept
heading: "Permissions"
docs: https://code.claude.com/docs/en/permissions
lines:
  - "The model asks. The harness decides: a rule from settings, or you."
---

<D09PermissionGate />

<!--
- 💬 Wie oft soll ein Agent fragen? 1 immer, 2 bei Edits, 3 nie.
- 🖥 Klon A fertig? Dann Dev-Server :3001: A stoppen, B starten. Sonst zu Beginn von Folie 15.
- [click] Regel in den Settings?
- [click] Ja: erlaubt oder verboten, ohne dich.
- [click] Nein: Du wirst gefragt.
- [click] Manual: fragt vor Edits und Befehlen.
- [click] Accept edits: Dateien gehen durch.
- [click] Plan: schaut nur.
- [click] Auto: Ein Klassifikator blockt Riskantes.
- ⏸ Pause. 💬 Was wäre das Schlimmste, wenn er nie mehr fragt?
- [click] Bypass: fragt fast nie.
- Welche Regeln werden erzwungen statt erhofft?
-->

---
layout: concept
heading: "Hooks"
docs: https://code.claude.com/docs/en/hooks
lines:
  - "Your own shell command on the ring: before a tool, after it, or at the exit."
  - "Before a tool, exit 2 blocks it. After a tool, exit 2 gives the model the error."
---

<D07HarnessLoop hooks />

<!--
- Ein Hook ist dein eigenes Shell-Kommando im Ring.
- [click] Vor dem Tool: Exit 2 blockt, auch wenn eine Regel erlaubt.
- [click] Nach dem Tool: Exit 2 gibt dem Modell den Fehler.
- [click] Am Ausgang: Exit 2 hält den Turn offen.
- 📊 Umfrage 3: [Zahl] von euch haben schon einen Hook.
- 💬 Was prüft euer Hook?
- Nur Chat? Der Hook ist eure erste Idee zum Mitnehmen.
- Und Claude im Zugzwang: Test ändern oder Logik?
-->

---
layout: concept
heading: "Zugzwang: change the test or the logic?"
---

<div class="w-full grid grid-cols-2 gap-8 text-base">
  <div class="flex flex-col gap-2">
    <div class="font-semibold text-center" style="color: var(--na-fg-muted)">careless</div>
    <div v-click="1" class="na-card px-3 py-2" style="border-color: var(--na-zinc-700)">“update the test so the suite passes”</div>
    <div v-click="2" class="na-card px-3 py-2" style="border-color: var(--na-zinc-700)">Claude edits the assertion</div>
    <div v-click="3" class="text-center font-semibold mt-1" style="color: var(--na-error-500)">green, rule broken</div>
  </div>
  <div class="flex flex-col gap-2">
    <div class="font-semibold text-center" style="color: var(--na-fg-muted)">engineered</div>
    <div v-click="4" class="na-card px-3 py-2" style="border-color: var(--na-primary-500)">“change lib/validation.ts only, not the tests”</div>
    <div v-click="5" class="na-card px-3 py-2" style="border-color: var(--na-primary-500)">Claude edits the logic</div>
    <div v-click="6" class="text-center font-semibold mt-1" style="color: var(--na-success-500)">green, rule holds</div>
  </div>
  <p v-click="7" class="col-span-2 text-center mt-2">Same failing test. Which file was allowed to change?</p>
</div>

<!--
- Den Plan liest man. Den geänderten Test liest keiner.
- Hier: eine neue Spec, vor dem Code geschrieben, rot. Sie ist die Regel.
- [click] Links: update the test.
- [click] Claude ändert die Assertion.
- [click] Grün, Regel gebrochen.
- [click] Rechts: nur validation.ts.
- [click] Claude ändert die Logik.
- [click] Grün, Regel gilt.
- [click] Welche Datei durfte sich ändern?
- Der alte Test ist ein anderer Fall. Was hat Claude in Klon A gemacht?
-->

---
layout: concept
heading: "Advice vs. law"
lines:
  - "Zugzwang: who decides the move?"
---

<div class="flex flex-col gap-5 w-full max-w-4xl">
<div class="flex gap-6 w-full">
  <div class="na-card p-5 flex-1" style="border-style: dashed; border-color: var(--na-zinc-600)">
    <div class="text-sm font-semibold mb-3" style="color: var(--na-fg-muted)">advice</div>
    <div class="text-base">CLAUDE.md: Never edit a file in <code style="color: var(--na-accent-500)">tests/</code> to make a failing test pass.</div>
    <div class="text-sm mt-3" style="color: var(--na-fg-muted)">Can be forgotten.</div>
  </div>
  <div v-click="1" class="na-card p-5 flex-1" style="border-color: var(--na-primary-500); box-shadow: var(--na-shadow-accent)">
    <div class="text-sm font-semibold mb-3" style="color: var(--na-primary-400)">law</div>
    <div class="text-base">Hook <code>guard-tests</code> lets new tests pass.<br>A committed test: Claude explains, you approve.</div>
    <div class="text-base mt-2">Hook <code>guard-db</code> blocks <span class="whitespace-nowrap"><code>db:seed</code> · <code>db:reset</code> · <code>setup</code> · <code>rm dev.db</code></span></div>
    <div class="text-sm mt-3" style="color: var(--na-fg-muted)">Runs outside the model, every time.</div>
  </div>
</div>
<div v-click="2" class="text-xl font-semibold text-center" style="color: var(--na-accent-500)">You decide the move, not the model.</div>
<div v-click="3" class="na-card px-4 py-2 font-mono text-sm text-center" style="border-color: var(--na-accent-500)">git status --short -- tests/<br>?? = untracked (new) &nbsp;·&nbsp; A = added &nbsp;·&nbsp; M = modified: one <b>M</b>oment please ⚠️</div>
</div>

<!--
- 🖥 Klon A: Der alte Test war rot. Zugzwang.
- Claude hat geändert / gefragt. Das ist Rat.
- [click] 🖥 Klon B: «Make the test … pass».
- Hook lehnt ab, Claude erklärt. «Yes, the product rule changed.»
- Diff lesen, Yes.
- [click] Die Titelfrage: Ich entscheide den Zug, nicht das Modell.
- 🖥 «Run npm run db:seed now. I allow it.» Geblockt.
- Zettel am Kühlschrank gegen Schloss.
- Auch eine Deny-Regel auf Bash prüft nur den Text: /bin/rm läuft dran vorbei.
- Die Sandbox schützt, was ausserhalb des Projekts liegt.
- 📊 Umfrage 4: [Zahl] sagten «Weiss ich nicht». Nur zählen, keine Namen.
- [click] 🖥 Klon B: git status --short -- tests/
- ?? heisst untracked: neu, git kennt die Datei noch nicht.
- A heisst added: neu und vorgemerkt.
- M heisst modified: Moment mal, hinschauen.
- Wo stehen wir jetzt?
-->

---
layout: concept
heading: "Where do we stand now?"
lines:
  - "Two steps climbed today: we paired with Claude, then hook and test set the gates."
---

<div class="flex items-end gap-4 w-full max-w-4xl justify-center text-sm">
  <div class="na-card px-4 py-3" style="border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)">pair with Claude</div>
  <div class="na-card px-4 py-5" style="border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)">goal + gates</div>
  <div class="na-card px-4 py-7 w-28">&nbsp;</div>
  <div class="na-card px-4 py-9 w-28">&nbsp;</div>
  <div class="na-card px-4 py-11">CI / routine</div>
</div>

<!--
- Die Treppe vom Anfang. Zwei Stufen haben wir jetzt.
- Unten: pair with Claude. Jeder Schritt gemeinsam.
- Darüber: goal + gates. Hook und Test halten an, ich entscheide.
- Aber was sagt das Rennen?
-->

---
layout: concept
heading: "The race: low vs. high"
lines:
  - "Live result: in the terminal."
---

<div class="flex flex-col items-center gap-6 w-full max-w-3xl">
<div v-click="1" class="text-sm" style="color: var(--na-fg-muted)">Today: five runs per level</div>
<div v-click="1" class="grid grid-cols-4 gap-2 w-full text-sm">
  <div></div><div class="font-semibold text-center">correct</div><div class="font-semibold text-center">false positives</div><div class="font-semibold text-center">median output tokens</div>
  <div class="na-card p-3 font-mono">low</div><div class="na-card p-3 text-center">…</div><div class="na-card p-3 text-center">…</div><div class="na-card p-3 text-center">…</div>
  <div class="na-card p-3 font-mono">high</div><div class="na-card p-3 text-center">…</div><div class="na-card p-3 text-center">…</div><div class="na-card p-3 text-center">…</div>
</div>
<div v-click="2" class="text-xl font-semibold" style="color: var(--na-accent-500)">More thinking is a dial, not a guard. Safety came from the hook and the test.</div>
</div>

<!--
- 💬 Findet high mehr Bugs? J oder N.
- 🖥 Rennterminal: Tabelle zeigen.
- [click] Vorlesen: alle vier? Falsche Funde? Tokens?
- Im Kurs: beide 4 von 4. high mehr Tokens, stark schwankend.
- Messwert, kein Gesetz.
- [click] Regler, kein Wächter. Sicher machen Hook und Test.
- Autonom heisst nicht ungeprüft.
-->

---
layout: concept
heading: "Subagents: three checkers, one prompt"
docs: https://code.claude.com/docs/en/sub-agents
lines:
  - "Each subagent works in its own context window. Only its answer comes back."
---

<div class="grid grid-cols-2 gap-8 w-full max-w-5xl items-center">

```txt
Use three Explore subagents in parallel, read only:
1. Does the app refuse a start in the past?
2. Does it refuse two talks in one room at one start?
3. Which files under tests/ changed?
   (git status --short -- tests/)
Each answers in one line with file:line.
```

<div class="flex flex-col gap-3">
  <div class="na-card px-4 py-3" v-click="1"><span class="font-mono text-sm" style="color: var(--na-accent-500)">Explore 1</span> · start in the past? · <span style="color: var(--na-fg-muted)">read-only</span></div>
  <div class="na-card px-4 py-3" v-click="1"><span class="font-mono text-sm" style="color: var(--na-accent-500)">Explore 2</span> · one room, one start? · <span style="color: var(--na-fg-muted)">read-only</span></div>
  <div class="na-card px-4 py-3" v-click="1"><span class="font-mono text-sm" style="color: var(--na-accent-500)">Explore 3</span> · tests/ changed? · <span style="color: var(--na-fg-muted)">read-only</span></div>
  <div class="text-lg font-semibold mt-2" v-click="2" style="color: var(--na-accent-500)">Back: three lines with file:line. What they read stays in their windows.</div>
</div>

</div>

<!--
- 🖥 Klon B, gleiche Session: Prompt aus der Zwischenablage.
- Drei Prüfer, ein Prompt.
- [click] Starten gleichzeitig, je eigenes Kontextfenster.
- Kein Edit, kein Write. Aber eine Shell.
- [click] Drei Zeilen zurück. Gelesenes bleibt bei ihnen.
- ~25 s. Raumregel: lib/data/talks.ts, nicht validation.ts.
- Explore ist eingebaut. Ein eigener Prüfer?
-->

---
layout: concept
heading: "Your own checker: rule-checker.md"
docs: https://code.claude.com/docs/en/sub-agents
lines:
  - "A subagent is one Markdown file. No Edit, no Write, no shell: this one cannot bend a test."
---

<div class="grid grid-cols-5 gap-6 w-full max-w-5xl items-center">
<div class="col-span-3">

```md
---
name: rule-checker
description: Read-only check of one product rule. …
tools: Read, Grep, Glob
---

You check one product rule in this repository.
You change nothing: you have no tool that can.

Answer in one line: yes or no, then the file
and line that prove it. …
```

<div class="text-sm mt-2" style="color: var(--na-fg-muted)">Excerpt of <span class="font-mono">subagents/rule-checker.md</span> in the webinar repo</div>

</div>
<div class="col-span-2 flex flex-col gap-3 text-base">
  <div class="na-card px-4 py-3" v-click><span class="font-mono text-sm" style="color: var(--na-accent-500)">1</span> · copy <span class="font-mono text-sm">subagents/rule-checker.md</span> → <span class="font-mono text-sm">.claude/agents/</span> in your project, <span style="color: var(--na-fg-muted)">or ask Claude to create it</span></div>
  <div class="na-card px-4 py-3" v-click><span class="font-mono text-sm" style="color: var(--na-accent-500)">2</span> · new <span class="font-mono text-sm">agents/</span> folder?<br>restart Claude&nbsp;Code once</div>
  <div class="na-card px-4 py-3" v-click style="border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)"><span class="font-mono text-sm" style="color: var(--na-accent-500)">3</span> · <span class="font-mono text-sm">Use three rule-checker subagents in parallel, one per rule: no start in the past, no shared room and start, no talk without a title</span></div>
</div>
</div>

<!--
- Explore gehört zu Claude Code. Dieser Prüfer gehört euch.
- Eine Markdown-Datei. Oben der Name, unten der Auftrag.
- Die Zeile tools: nur Read, Grep, Glob. Er kann lesen, aber nichts ändern.
- [click] Kopiert sie in euer Projekt, nach .claude/agents.
- Oder nach ~/.claude/agents, dann gilt sie in allen Projekten.
- Ihr könnt Claude auch bitten, den Prüfer für euch anzulegen.
- [click] War der Ordner agents neu? Dann Claude Code einmal neu starten.
- [click] Dann ruft ihr ihn beim Namen. Ein Prüfer pro Regel, die Regeln nennt ihr gleich mit.
- Das ist die nächste Stufe der Treppe: isolated agents.
-->

---
layout: concept
heading: "Isolated agents: Claude in a box"
docs: https://code.claude.com/docs/en/devcontainer
lines:
  - "Commands run in the container. Your project files stay on your machine."
  - "Trusted repos only: in bypass mode a malicious project can take what is in the box, even ~/.claude."
---

<div class="grid grid-cols-5 gap-6 w-full max-w-5xl items-center">
<div class="col-span-3">

```jsonc
// the core of .devcontainer/devcontainer.json
{
  "image": "mcr.microsoft.com/devcontainers/javascript-node:22",
  "features": {
    "ghcr.io/anthropics/devcontainer-features/claude-code:1.0": {}
  }
}
```

</div>
<div class="col-span-2 flex flex-col gap-3 text-base">
  <div class="na-card px-4 py-3"><span class="font-mono text-sm" style="color: var(--na-accent-500)">1</span> · <span class="font-mono text-sm">claude setup-token</span> → <span class="font-mono text-sm">.devcontainer/.env</span> <span style="color: var(--na-fg-muted)">(git-ignored)</span></div>
  <div class="na-card px-4 py-3" v-click><span class="font-mono text-sm" style="color: var(--na-accent-500)">2</span> · VS Code: <span class="font-mono text-sm whitespace-nowrap">Reopen in Container</span></div>
  <div class="na-card px-4 py-3" v-click style="border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)"><span class="font-mono text-sm" style="color: var(--na-accent-500)">3</span> · terminal in the container: <span class="font-mono">claude</span></div>
</div>
</div>

<!--
- Isolation, Teil zwei: Claude bekommt ein eigenes Brett.
- Befehle laufen dort. Das Repo ist gemountet: Änderungen landen bei euch.
- Anleitung und Datei im Webinar-Repo.
- Browser-Login hängt im Container.
- Darum: Token in .devcontainer/.env.
- [click] Reopen in Container.
- [click] Terminal: claude. Schon angemeldet.
- ⚠ Nur Repos, denen ihr traut.
- Was haben wir noch zugemacht?
-->

---
layout: concept
heading: "What we added to the box"
lines:
  - "Three layers. Test them in your box: a script that opens .env must fail."
---

<div class="grid grid-cols-3 gap-6 w-full max-w-5xl">
  <div v-click class="na-card p-5 pb-10 relative" style="border-color: var(--na-accent-500)">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">token hidden</div>
    <div class="text-base">Commands Claude runs don't see it. Claude Code keeps it for its own calls.</div>
    <div class="font-mono text-xs mt-3" style="color: var(--na-fg-muted)">CLAUDE_CODE_SUBPROCESS_<wbr>ENV_SCRUB=1</div>
    <DocLink card href="https://code.claude.com/docs/en/env-vars" />
  </div>
  <div v-click class="na-card p-5 pb-10 relative" style="border-color: var(--na-accent-500)">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">no reading secrets</div>
    <div class="text-base">Deny rules in <span class="font-mono text-sm">.claude/settings.json</span>.</div>
    <div class="font-mono text-xs mt-3" style="color: var(--na-fg-muted)">.env*<br>~/.claude/.credentials.json<br>~/.ssh<br>~/.aws</div>
    <DocLink card href="https://code.claude.com/docs/en/permissions" />
  </div>
  <div v-click class="na-card p-5 pb-10 relative" style="border-color: var(--na-accent-500)">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">sandbox on</div>
    <div class="text-base">Native Windows has no Bash sandbox. WSL2 and the Linux box do.</div>
    <div class="font-mono text-xs mt-3" style="color: var(--na-fg-muted)">"sandbox": { "enabled": true }</div>
    <DocLink card href="https://code.claude.com/docs/en/sandboxing" />
  </div>
</div>

<!--
- Drei Schichten, die wir dazugebaut haben.
- [click] Befehle, die Claude startet, sehen den Token nicht. Claude Code selbst schon.
- [click] Lesen verboten: .env, Anmeldedaten, SSH- und AWS-Schlüssel.
- [click] Unter Windows direkt gibt es keine Sandbox. In WSL2 und in der Linux-Kiste schon.
- Testet es: Ein Skript, das .env öffnet, muss in der Kiste scheitern.
- Anleitung: docs/devcontainer.md im Webinar-Repo.
- Wo steht das auf der Treppe?
-->

---
layout: concept
heading: "Autonomy is earned by verification"
lines:
  - "More freedom needs stronger evidence, isolation and limits."
  - "Do not scale autonomy beyond your ability to detect and contain errors."
---

<div class="flex flex-col items-center gap-6 w-full">
<div class="flex items-end gap-4 w-full max-w-4xl justify-center text-sm">
  <div class="na-card px-4 py-3" style="border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)">pair with Claude</div>
  <div class="na-card px-4 py-5" v-click style="border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)">goal + gates</div>
  <div class="na-card px-4 py-7" v-click style="border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)">isolated agents</div>
  <div class="na-card px-4 py-9 invisible">background / batch</div>
  <div class="na-card px-4 py-11 invisible">CI / routine</div>
</div>
<div class="text-xl font-semibold invisible" aria-hidden="true">You decide the move, not the model.</div>
</div>

<!--
- 💬 Welche Stufe war der Live-Lauf, welche der Hook?
- Ganz unten: pair with Claude. Da hat die Demo angefangen.
- 🖥 Klon A: /goal tippen, nicht senden.
- [click] goal + gates: Ein Modell prüft das Ziel. Hook und Test halten an.
- [click] isolated agents: die drei Prüfer und die Kiste.
- Und darüber?
-->

---
layout: concept
heading: "Autonomy is earned by verification"
lines:
  - "More freedom needs stronger evidence, isolation and limits."
  - "Do not scale autonomy beyond your ability to detect and contain errors."
---

<div class="flex flex-col items-center gap-6 w-full">
<div class="flex items-end gap-4 w-full max-w-4xl justify-center text-sm">
  <div class="na-card px-4 py-3" style="border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)">pair with Claude</div>
  <div class="na-card px-4 py-5" style="border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)">goal + gates</div>
  <div class="na-card px-4 py-7" style="border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)">isolated agents</div>
  <div class="na-card px-4 py-9">background / batch</div>
  <div class="na-card px-4 py-11" v-click>CI / routine</div>
</div>
<div v-click class="text-xl font-semibold" style="color: var(--na-accent-500)">You decide the move, not the model.</div>
</div>

<!--
- Drei Stufen habt ihr heute gesehen. Die vierte:
- background / batch: mehrere Agenten im Hintergrund.
- [click] CI und Routinen: ohne euch.
- Je weniger ihr zuschaut, desto mehr Beleg braucht ihr.
- [click] Der Agent muss ziehen. Welchen Zug er darf, entscheidet ihr.
- 💬 Was lasst ihr Claude heute nicht allein machen?
- Zwei Antworten vorlesen: Oben liefe genau das ohne euch. Was ist dann euer Beleg?
- Und wer baut diese Stufen?
-->

---
layout: concept
heading: "The steps where nobody watches"
---

<div class="grid grid-cols-2 gap-8 w-full max-w-3xl">
  <div class="na-card p-6 pb-10 relative" style="border-color: var(--na-accent-500)">
    <div class="text-sm font-semibold mb-2 font-mono" style="color: var(--na-accent-500)">/batch</div>
    <div class="text-lg">Many separate units, each tested, ending in a pull request or a report.</div>
    <DocLink card href="https://code.claude.com/docs/en/commands" />
  </div>
  <div v-click class="na-card p-6 pb-10 relative" style="border-color: var(--na-accent-500)">
    <div class="text-sm font-semibold mb-2" style="color: var(--na-accent-500)">CI</div>
    <div class="text-lg">A pull request opens. A separate agent audits it. Nobody watches.</div>
    <DocLink card href="https://code.claude.com/docs/en/github-actions" />
  </div>
</div>

<!--
- Die Antwort auf den Cliffhanger, kein Werbeblock.
- Links /batch: viele Einheiten, jede getestet, am Ende ein PR oder ein Bericht.
- [click] Rechts CI: Ein PR geht auf, ein eigener Agent prüft, niemand schaut zu.
- Kurs Teil IV, «Letting go»: CI-Prüfer bauen, /batch kennenlernen.
- Der Publish-Knopf der App ist die nächste Stufe: Task 19.
- Deshalb der Kurs.
-->

---
layout: concept
---

<div class="flex flex-col items-center gap-6 text-center">
  <img src="/brand/nalogo-white-n.svg" alt="nextacademy.io" class="w-20 h-20" />
  <h1 class="!mb-0">Mastering Claude Code</h1>
  <p class="text-3xl font-semibold" style="color: var(--na-accent-500)">24–26 November</p>
  <p class="text-xl max-w-2xl">Online · EUR 1290 · book by 18 November 2026 with the code <span class="font-mono" style="color: var(--na-accent-500)">TD2SJ59H</span> and save 25 %.</p>
  <div class="na-card px-6 py-4 font-mono text-xl" style="border-color: var(--na-accent-500)">nextacademy.io/de/workshops/claude-code</div>
</div>

<!--
- 🖥 Kurslink in den Chat.
- Der Kurs: 24. bis 26. November, online, 1290 Euro.
- Bis 18. buchen mit Code TD2SJ59H: 25 Prozent. Code in den Chat.
- Keine Claude-Code-Erfahrung nötig, ein Pro-Abo reicht.
- Jetzt eure Fragen. Höchstens 8 Minuten, bis 18:57.
-->

---
layout: concept
heading: "You stayed to the end"
---

<div v-click class="flex items-center gap-8">
  <div class="na-card px-8 py-6 text-2xl max-w-xl" style="border-color: var(--na-accent-500); box-shadow: var(--na-shadow-accent)">
    Your gift: <span style="color: var(--na-accent-500); font-weight: 700">a repo with the guard-tests hook, a checker subagent, a course task and a cheat sheet.</span>
    <div class="font-mono text-base mt-4" style="color: var(--na-fg-muted)">github.com/nextacademy-io/claude-code-webinar</div>
  </div>
  <img src="/gift-qr.svg" alt="QR code: github.com/nextacademy-io/claude-code-webinar" class="w-44 h-44 rounded-lg" />
</div>

<div class="absolute inset-x-0 bottom-3 text-center text-sm" style="color: var(--na-fg-muted)">
  © nextacademy.io, a project of SunsetPicnic UG (haftungsbeschränkt). All rights reserved.
</div>

<!--
- Ihr seid bis hierher geblieben. Das ist für euch.
- [click] 🖥 Repo-Link in den Chat.
- Den Hook legt ihr morgen in euer Projekt: neue Tests frei, alte nur mit eurem Ja.
- Die Aufgabe spielt auf derselben App. Das Cheat Sheet hat vier Tools.
- Das Geschenk gibt es auch ohne Buchung.
- Danke fürs Bleiben.
-->
