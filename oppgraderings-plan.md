# Oppgraderingsplan for holtnesved.no

## 1. Mål
- Lage en ren og litt klassisk nettside som passer vedsalg fra gård i Hurum (Akershus).
- Gjøre siden enkel å vedlikeholde uten kodeendringer for vanlige oppdateringer.
- Erstatte pris-/teksthenting fra Google Docs med GitHub Pages + Jekyll-datafiler (JSON for priser).

## 2. Dagens situasjon (kort)
- Prosjektet har flere varianter av `index.html` (blant annet i rot og i `startbootstrap-small-business-gh-pages/`).
- Prisdata og meldinger hentes via JavaScript fra Google Sheets (`lib/data.js`), med lokal TSV som fallback.
- Mye stil og struktur ligger direkte i HTML, som gjør vedlikehold tyngre over tid.

## 3. Målarkitektur (GitHub Pages + Jekyll)
- Én aktiv nettside i rotmappen (Jekyll-bygget side).
- Struktur:
  - `_config.yml` for nettsted-innstillinger.
  - `_layouts/default.html` for grunnlayout.
  - `_includes/` for gjenbrukbare deler (header, kontakt, footer, tabeller).
  - `_data/` for innhold som endres jevnlig:
    - `priser.json` (obligatorisk)
    - `frakt.json`
    - `sekker.json`
    - `meldinger.json`
  - `assets/css/site.css` for all styling.
  - `index.md` eller `index.html` med Jekyll front matter.
- All dynamisk JS-henting av data fjernes (`lib/data.js` fases ut).

## 4. Innholds- og designretning
- Visuell retning: lys, varm og rolig (jordtoner), klassiske fonter, tydelig typografi.
- Stilgrunnlag: `Bønes + Oppetveiten` (enkel, lokal, tydelig).
- Enkelt sideoppsett:
  - Toppseksjon med navn, område og kontakt.
  - Kort intro om gården og leveranse.
  - Priser/frakt/sekker som tydelige tabeller generert fra `_data/*.json`.
  - Valgfri meldingsboks (f.eks. utsolgt, pause i bestillinger) styrt av `_data/meldinger.json`.
- Mobilvennlig layout prioriteres (lesbarhet før pynt).

### 4.1 Konkrete stilregler (Bønes + Oppetveiten)
- Tonalitet i tekst:
  - Kort, konkret og lokal.
  - Fokus på leveranseområde, kvalitet og praktisk bestilling.
- Layout:
  - Én-kolonne hovedflyt med tydelige seksjoner.
  - Maksbredde på innhold for god lesbarhet.
  - Kontaktinfo synlig øverst og nederst.
- Typografi:
  - Klassisk serif for overskrifter.
  - Nøktern, lettlest brødtekst.
  - Tydelig hierarki mellom H1, H2 og tabelltekst.
- Fargepalett (forslag):
  - Bakgrunn: varm lys tone (`#f6f0e4`).
  - Flater/kort: lys krem (`#fffaf0`).
  - Primær tekst: mørk brungrå (`#2f2a24`).
  - Aksent/lenker: dempet gårdsbrun (`#7b5a36`).
  - Varselboks: varm gul (`#f2dd9b`) med mørk tekst.
- Komponenter:
  - Pristabell med tydelig header og god luft mellom rader.
  - Enkel meldingsboks (vises kun når aktiv i `meldinger.json`).
  - Primærknapp for kontakt/bestilling uten visuell støy.
- Bilder:
  - Bruke ekte gårds-/vedbilder (ikke stock-følelse).
  - Rolige utsnitt og naturlige farger.

## 5. Migreringssteg
1. Avklare hvilken `index` som blir hovedside (anbefalt: rotnivå).
2. Opprette Jekyll-struktur (`_config.yml`, `_layouts`, `_includes`, `_data`, `assets/css`).
3. Flytte eksisterende tekst, bilder og kontaktinfo inn i ny struktur.
4. Konvertere `holtnesved-data.tsv` til JSON-filer i `_data/` (minst `priser.json`).
5. Implementere tabeller/meldinger med Liquid-loops (f.eks. `site.data.priser`) i stedet for JavaScript.
6. Rydde bort gammel dataflyt (`lib/data.js` og Google Sheets-avhengighet).
7. Forenkle HTML: korte, semantiske seksjoner og gjenbruk via includes.
8. Kjør test med lokal Jekyll (`bundle exec jekyll serve`) og sjekk mobil/desktop.
9. Publiser til GitHub Pages og verifiser live-side.

## 6. Vedlikeholdsrutine etter oppgradering
- Prisendringer gjøres kun i `_data/priser.json`.
- Frakt, sekker og meldinger oppdateres i egne JSON-filer i `_data/`.
- Designjusteringer gjøres i `assets/css/site.css`.
- Sideinnhold (tekstseksjoner) holdes i `index` + `_includes` for enkel redigering.

## 7. Definisjon av ferdig
- Ingen avhengighet til Google Sheets/ekstern datahenting.
- Kun én tydelig sidevariant i bruk.
- Priser/frakt/meldinger kan oppdateres uten JS-endringer.
- Mobil og desktop er testet og lesbart.
- Kodebasen er ryddig nok til at en enkel innholdsoppdatering tar få minutter.
