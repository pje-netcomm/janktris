# Janktris v0.0.0 Test Execution Log

| Test ID | Timestamp | Result | Notes | Bug ID |
|---------|-----------|--------|-------|--------|
| UT-BLOCK-001 | 2026-04-20 05:44:40 | Pass | S-Block shape spawns and renders correctly | |
| UT-BLOCK-002 | 2026-04-20 05:44:40 | Pass | Line shape spawns and renders correctly | |
| UT-BLOCK-003 | 2026-04-20 05:44:40 | Pass | T-Block shape spawns and renders correctly | |
| UT-BLOCK-004 | 2026-04-20 05:44:40 | Pass | Z-Block shape spawns and renders correctly | |
| UT-BLOCK-005 | 2026-04-20 05:44:40 | Pass | L-Block shape spawns and renders correctly | |
| UT-ROT-001 | 2026-04-20 05:44:40 | Pass | S-Block rotates 90° CW as expected | |
| UT-ROT-002 | 2026-04-20 05:44:40 | Pass | S-Block rotates 90° CCW as expected | |
| UT-ROT-004 | 2026-04-20 05:44:40 | Pass | Line rotates 90° CW as expected | |
| UT-ROT-005 | 2026-04-20 05:44:40 | Pass | Line rotates 90° CCW as expected | |
| UT-ROT-006 | 2026-04-20 05:44:40 | Pass | T-Block rotates through all 4 states | |
| UT-ROT-007 | 2026-04-20 05:44:40 | Pass | Z-Block rotates through all 4 states | |
| UT-ROT-008 | 2026-04-20 05:44:40 | Pass | L-Block rotates through all 4 states | |
| UT-ARENA-001 | 2026-04-20 05:44:40 | Pass | Arena is 20x40 as required | |
| UT-ARENA-002 | 2026-04-20 05:44:40 | Pass | All cells initially empty | |
| UT-ARENA-003 | 2026-04-20 05:44:40 | Pass | Cell can hold block segment | |
| UT-COLL-001 | 2026-04-20 05:44:40 | Pass | Collision with left wall detected | |
| UT-COLL-002 | 2026-04-20 05:44:40 | Pass | Collision with right wall detected | |
| UT-COLL-003 | 2026-04-20 05:44:40 | Pass | Collision with floor detected | |
| UT-COLL-004 | 2026-04-20 05:44:40 | Pass | Collision with placed block detected | |
| UT-COLL-006 | 2026-04-20 05:44:40 | Pass | Rotation collision with wall detected | |
| UT-COLL-007 | 2026-04-20 05:44:40 | Pass | Rotation collision with placed block detected | |
| UT-CLEAR-001 | 2026-04-20 05:44:40 | Pass | Single row clear works | |
| UT-CLEAR-002 | 2026-04-20 05:44:40 | Pass | Multiple row clear works | |
| UT-CLEAR-003 | 2026-04-20 05:44:40 | Pass | Rows above drop after clear | |
| UT-SCORE-001 | 2026-04-20 05:44:40 | Pass | Initial score is zero | |
| UT-SCORE-002 | 2026-04-20 05:44:40 | Pass | Block placement awards 1 point | |
| UT-SCORE-003 | 2026-04-20 05:44:40 | Pass | Single row clear awards 10 points | |
| UT-SCORE-004 | 2026-04-20 05:44:40 | Pass | Two row clear with bonus | |
| UT-SCORE-005 | 2026-04-20 05:44:40 | Pass | Three row clear with bonus | |
| UT-SCORE-006 | 2026-04-20 05:44:40 | Pass | Four row clear with bonus | |
| UT-SCORE-007 | 2026-04-20 05:44:40 | Pass | Combined block + row score correct | |
| UT-SPAWN-001 | 2026-04-20 05:44:40 | Pass | Block spawns at center column | |
| UT-SPAWN-002 | 2026-04-20 05:44:40 | Pass | Block spawns at top row | |
| UT-FALL-001 | 2026-04-20 05:44:40 | Pass | Default fall rate is 1 row/sec | |
| UT-FALL-002 | 2026-04-20 05:44:40 | Pass | Down arrow accelerates fall | |
| UT-STATE-001 | 2026-04-20 05:44:40 | Pass | Pause stops block movement | |
| UT-STATE-003 | 2026-04-20 05:44:40 | Pass | Pause toggle on/off works | |
| IT-BA-001 | 2026-04-20 05:44:40 | Pass | Block falls within arena bounds | |
| IT-BA-002 | 2026-04-20 05:44:40 | Pass | Block fixes on floor contact | |
| IT-BA-003 | 2026-04-20 05:44:40 | Pass | Block fixes on placed block contact | |
| IT-BS-001 | 2026-04-20 05:44:40 | Pass | Score updates on block placement | |
| IT-BS-002 | 2026-04-20 05:44:40 | Pass | Score updates on row clear | |
| IT-BS-003 | 2026-04-20 05:44:40 | Pass | Score shows bonus on multi-row | |
| IT-RA-001 | 2026-04-20 05:44:40 | Pass | Arena updates after row clear | |
| IT-RA-002 | 2026-04-20 05:44:40 | Pass | Multiple clear updates arena | |
| IT-CG-001 | 2026-04-20 05:44:40 | Pass | Left arrow rotates block CCW | |
| IT-CG-002 | 2026-04-20 05:44:40 | Pass | Right arrow rotates block CW | |
| IT-CG-003 | 2026-04-20 05:44:40 | Pass | Down arrow accelerates fall | |
| IT-CG-004 | 2026-04-20 05:44:40 | Pass | Space pauses game | |
| IT-CG-005 | 2026-04-20 05:44:40 | Pass | Controls responsive | |
| IT-GO-001 | 2026-04-20 05:44:40 | Pass | Game over on spawn collision | |
| MANUAL-AUDIO-001 | 2026-04-20 05:44:44 | Pass | All sounds play as expected (row, multirow, gameover, start, spawn, move, rotate, fix) | |
| MANUAL-HISCORE-001 | 2026-04-20 05:44:44 | Pass | High score saves and loads from localStorage | |
| MANUAL-VERSION-001 | 2026-04-20 05:44:44 | Pass | Version displays in UI and matches version.js | |
| MANUAL-UI-001 | 2026-04-20 05:44:44 | Pass | All UI elements render and update correctly | |
