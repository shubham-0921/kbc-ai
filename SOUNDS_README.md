# KBC Sound Effects Guide

This game includes KBC-style sound effects to enhance the gaming experience! 🎵

## Current Sound Implementation

The game uses royalty-free placeholder sounds. Here's what plays when:

### Sound Effects List

1. **Theme Music** 🎼
   - Plays: Home screen
   - Type: Looping background music
   - Default: Generic theme music

2. **Question Bed Music** 🤔
   - Plays: During question answering phase
   - Type: Looping suspenseful background
   - Default: Thinking/suspense music

3. **Timer Ticking** ⏱️
   - Plays: Last 10 seconds of countdown
   - Type: Looping ticking sound
   - Default: Clock tick sound

4. **Lock Sound** 🔒
   - Plays: When "LOCK KIYA JAYE" button is clicked
   - Type: Single sound effect
   - Default: Lock/confirm sound

5. **Correct Answer** ✅
   - Plays: When answer is revealed as correct
   - Type: Single sound effect
   - Default: Success/celebration sound

6. **Wrong Answer** ❌
   - Plays: When answer is revealed as incorrect
   - Type: Single sound effect
   - Default: Fail/buzzer sound

7. **Winner Celebration** 🏆
   - Plays: Results screen when game ends
   - Type: Single sound effect
   - Default: Victory fanfare

8. **Click Sound** 🖱️
   - Plays: Button clicks throughout the game
   - Type: Single sound effect
   - Default: UI click sound

## How to Add Custom KBC Sounds

### Option 1: Use Local Audio Files (Recommended)

1. **Create sound files** with actual KBC sounds (if you have permission to use them)
2. **Place files** in the `public/sounds/` directory:
   ```
   public/sounds/
   ├── theme.mp3
   ├── question-bed.mp3
   ├── timer-tick.mp3
   ├── lock.mp3
   ├── correct.mp3
   ├── wrong.mp3
   ├── winner.mp3
   └── click.mp3
   ```

3. **Update sound URLs** in `src/services/soundService.js`:
   ```javascript
   export const SOUNDS = {
     THEME: {
       key: 'theme',
       url: '/sounds/theme.mp3',  // Changed from online URL
       volume: 0.3,
       loop: true
     },
     // ... update all other sounds similarly
   };
   ```

### Option 2: Use Online Audio URLs

If you have audio files hosted online (e.g., on a CDN), update the URLs in `src/services/soundService.js`:

```javascript
THEME: {
  key: 'theme',
  url: 'https://your-cdn.com/kbc-theme.mp3',
  volume: 0.3,
  loop: true
}
```

### Option 3: Replace Placeholder URLs

The current implementation uses Mixkit's free sounds. You can replace these URLs with any publicly accessible audio URL.

## Sound Volume Control

Each sound has a default volume setting (0.0 to 1.0). You can adjust these in `src/services/soundService.js`:

```javascript
CORRECT: {
  key: 'correct',
  url: '...',
  volume: 0.6,  // Adjust this value (0.0 = silent, 1.0 = max)
  loop: false
}
```

## Mute/Unmute Feature

Users can mute/unmute all sounds using the speaker icon in the top-right corner of the game. The mute preference is saved in localStorage.

## Audio Format Support

Supported formats (most browsers):
- MP3 (`.mp3`) - **Recommended**
- OGG (`.ogg`)
- WAV (`.wav`) - Larger file size
- M4A (`.m4a`)

## Copyright Notice ⚠️

**IMPORTANT**: The current implementation uses royalty-free placeholder sounds. If you want to use actual KBC sounds:

1. Ensure you have the **legal rights** to use those audio files
2. KBC sound effects are copyrighted by Sony Pictures Networks India
3. Using actual KBC sounds may require **licensing** or permission
4. This is for **personal/educational use only**

## Testing Sounds

After adding custom sounds:

1. Clear browser cache
2. Reload the game
3. Check browser console for any audio loading errors
4. Test each sound by playing through the game

## Troubleshooting

### Sound not playing?
- Check browser console for errors
- Verify file paths are correct
- Ensure audio files are in supported format
- Some browsers require user interaction before playing audio

### Sound quality issues?
- Use high-quality audio files (256kbps or higher for MP3)
- Adjust volume levels in `soundService.js`
- Consider using MP3 format for best compatibility

### Performance issues?
- Compress audio files to reduce size
- Use MP3 instead of WAV for smaller file sizes
- Preloading happens automatically on app start

## Files You May Need to Modify

1. **`src/services/soundService.js`** - Update sound URLs and settings
2. **`public/sounds/`** - Add your custom audio files here
3. **`.env`** - No changes needed for sounds

## Need Help?

The sound system is implemented using:
- React Context API (`SoundContext.jsx`)
- Custom hook (`useGameSound`)
- Web Audio API (native browser support)

All sound-related code is in:
- `src/contexts/SoundContext.jsx`
- `src/services/soundService.js`
- `src/hooks/useSound.js` (if needed)

---

**Enjoy the game with authentic KBC sound effects!** 🎊
