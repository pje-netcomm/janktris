# Janktris v0.1.0 Release Notes

**Release Date**: April 21, 2026  
**Tag**: janktris-v0.1.0

## Overview
Version 0.1.0 represents a major stability and usability update with critical bug fixes and enhanced user experience.

## Bug Fixes

### Version Display
- Fixed version always showing "3695472"
- Now displays actual git tag via build script
- Version shows as "janktris-v0.1.0" format

### Key Repeat
- Movement and rotation keys now auto-repeat as expected
- Space and Enter keys blocked from repeating to prevent accidents
- Arrow keys and A/D rotation keys repeat when held

### Game Over Detection
- Game now properly ends when blocks reach top rows
- Two detection checks implemented:
  1. After fixing block: Check if top 2 rows have filled cells
  2. After spawning block: Check if new block collides in top rows
- Game over message displays immediately

### Sound Effects
- Added error handling for audio file loading
- Browser autoplay restrictions handled gracefully
- No crashes when audio files are missing or empty

## New Features

### Hard Drop (Enter Key)
- Instantly drops block to bottom position
- Standard Tetris feature for faster gameplay
- Automatically fixes block and spawns next one

### Improved Rotation Controls
- **Up Arrow**: Added as alternative for clockwise rotation
- **A Key**: Changed counter-clockwise from Z to A
- More ergonomic A/D pairing for left/right rotation

### Enhanced Control Legend
- Redesigned with elegant two-column grid layout
- Golden key badges with subtle glow effects
- Gradient background for premium appearance
- Easier to scan and visually appealing

## Controls

| Key | Action |
|-----|--------|
| ←/→ | Move left/right |
| ↑ | Rotate clockwise |
| ↓ | Drop faster |
| A | Rotate counter-clockwise |
| D | Rotate clockwise |
| Enter | Hard drop (instant) |
| Space | Pause/Start/Restart |

## Technical Details
- Built from commit: 1e16ead
- Tag: janktris-v0.1.0
- All automated tests passing
- Playwright test suite created for E2E verification

## Files Changed
- main.js: Control handlers, hard drop logic, game over fixes
- index.html: Control legend redesign
- style.css: Modern control styling
- version.js: Build script integration
- audio.js: Error handling

## Testing
- test-v0.1.0-complete.js: Full verification suite
- test-ux-improvements.js: UX feature tests  
- test-final-v0.1.0.js: Bug fix tests
- All tests passing

## Known Issues
- Audio files are 0-byte placeholders (sounds don't play but don't crash)
- Version shows "-dirty" suffix when built (due to version.js modification)

## Next Version
v1.0.0 will include:
- Leader Board for high scores
- Persistent score storage

---

**Installation**: Open index.html in a web browser  
**Build**: Run `./build.sh` to inject version  
**Test**: Run `node test-v0.1.0-complete.js` (requires Playwright)
