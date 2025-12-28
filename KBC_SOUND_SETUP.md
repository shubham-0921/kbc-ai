# KBC Sound Integration Guide

Follow these steps to add authentic KBC sounds to your game:

## Step 1: Download the Sound Files

### Download these sounds from the sources:

1. **KBC Theme Music**
   - Go to: https://archive.org/details/tvtunes_19327
   - Download and save as: `theme.mp3`

2. **Lock Kiya Jaye Sound**
   - Go to: https://tuna.voicemod.net/sound/d03be056-0db1-4009-bb00-1b1ccc8ce529
   - Download and save as: `lock.mp3`

3. **KBC Question Music** (Thinking/Suspense)
   - Go to: https://www.myinstants.com/en/instant/kbc-question-60314/
   - Download and save as: `question-bed.mp3`

4. **Additional Sounds from Zedge**
   - Go to: https://www.zedge.net/find/ringtones/kbc
   - Download various KBC sounds for correct/wrong/timer/winner
   - Save as: `correct.mp3`, `wrong.mp3`, `timer-tick.mp3`, `winner.mp3`, `click.mp3`

## Step 2: Prepare the Sound Files

Once downloaded, you should have these files ready:
```
theme.mp3          - KBC opening theme
question-bed.mp3   - Question thinking music
timer-tick.mp3     - Clock ticking sound
lock.mp3           - "Computer ji lock kiya jaye" sound
correct.mp3        - Correct answer celebration
wrong.mp3          - Wrong answer sound
winner.mp3         - Winner celebration
click.mp3          - Button click sound
```

## Step 3: Add Files to Your Project

Move all the downloaded MP3 files to your project's `public/sounds/` directory:

```bash
# Make sure you're in the project root directory
cd /Users/shubham/Desktop/Projects/trivia-battle-arena

# The public/sounds/ directory already exists
# Just copy your downloaded files there
# For example, if they're in ~/Downloads:
cp ~/Downloads/theme.mp3 public/sounds/
cp ~/Downloads/lock.mp3 public/sounds/
cp ~/Downloads/question-bed.mp3 public/sounds/
# ... and so on for all files
```

## Step 4: Verify Files Are in Place

Check that all files are in the correct location:
```bash
ls -la public/sounds/
```

You should see all 8 MP3 files listed.

## Step 5: Update Sound Service Configuration

The sound service configuration file is already set up at:
`src/services/soundService.js`

I'll update it to use your local files instead of the placeholder URLs.

## Step 6: Test the Sounds

1. Make sure dev server is running: `npm run dev`
2. Open http://localhost:5173/
3. Test each sound:
   - Home screen → Theme music plays
   - Start game → Question music plays
   - Lock answer → Lock sound plays
   - Reveal → Correct/Wrong sound plays
   - Results → Winner sound plays

## Step 7: Adjust Volume Levels (Optional)

If any sounds are too loud or quiet, edit `src/services/soundService.js` and adjust the `volume` values (0.0 to 1.0).

---

## Quick Command Reference

```bash
# Navigate to project
cd /Users/shubham/Desktop/Projects/trivia-battle-arena

# Check if sounds directory exists
ls public/sounds/

# Copy all sounds at once (adjust path to your downloads folder)
cp ~/Downloads/*.mp3 public/sounds/

# Verify files
ls -la public/sounds/

# The app will automatically detect and use the new files!
```

---

## Troubleshooting

### Sounds not playing?
- Clear browser cache (Cmd+Shift+R on Mac)
- Check browser console for errors
- Verify file names match exactly (case-sensitive)

### Wrong sound playing?
- Check file names match the expected names
- Verify MP3 files are not corrupted

### Sound quality issues?
- Use high-quality MP3 files (256kbps or higher)
- Convert to MP3 format if using other formats

---

Ready to proceed? Let me know when you have the files downloaded and I'll update the sound service configuration!
