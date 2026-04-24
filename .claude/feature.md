# Feature: LeibWeissman Civilization Card Game

## Status: Implemented (verify before closing)

## What was built
10-round HTML+JS deck-building game using Stable Diffusion images from `v1/` and `old/`.

## Files
- `index.html` — entry point, title screen, resource bar, hand zone, overlay, end screen
- `style.css` — dark parchment theme, card hover effects, event overlay
- `cards.js` — CARDS array (19 cards from v1/) + RANDOM_EVENTS array (7 events from old/)
- `game.js` — state machine, render, playCard(), endRound(), resolveEvent(), resolveCardEvent()

## Game loop
Draw 4 → Play cards → End Round → Random event fires (old/ image) → Next round.
Round 10 ends the game; score ≥ 60 = win.

## Card types
| Type | Effect |
|---|---|
| building | +resources → score |
| unit | +defense, -threat |
| event (hand) | inline choice overlay with two outcomes |

## Random events
7 events using old/ images; fire once per round after End Round button.
Negative events (flood, fire) can reduce resources.

## Symbols mapped
All 20 v1/ images used. 7 of 70 old/ images curated as event art.

## Verification checklist
- [ ] Open index.html in browser — no console errors
- [ ] Play all 10 rounds — round counter increments, score updates
- [ ] Play a unit card — threat decreases, defense increases
- [ ] Play an event card from hand — choice overlay appears
- [ ] End a round — random event overlay fires with old/ image
- [ ] Reach round 10 — end screen shows collage of played cards
- [ ] Score < 60 shows loss screen; ≥ 60 shows win screen
- [ ] Play Again button resets state
