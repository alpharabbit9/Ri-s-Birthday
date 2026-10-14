Background music for the scrapbook (Phase 16)
=============================================

The site plays local audio. Drop your own files here with these exact names
(MP3 recommended for broad browser support):

  song.mp3   The full song. (Currently in use.)
             Fades in when the "Choose your gift" menu appears (Page 5) and
             keeps playing through the gifts, Gift 4 (the "surprise"), the
             diary, memories, photo reel and final letter. Pages 1-4 are silent.

  tone.mp3   An optional gentle / melodic version meant to play earlier (from
             the Page 2 unlock). NOT currently used: the machinery exists, but
             nothing triggers it yet. To enable it, add this file and wire
             startTone() back into the envelope unlock in
             src/components/scrapbook/SceneFlow.tsx.

song.mp3 is looped automatically. The controller is already wired up — as soon
as song.mp3 exists here, playback works with no code changes.

Notes
-----
- Keep the files reasonably small (ideally a few MB each) so they load quickly
  on a phone. Trimming/compressing to ~128 kbps MP3 is plenty for this.
- These are intentionally NOT committed/shipped with the project, and no
  copyrighted recording was downloaded or bundled. Add only audio you have the
  right to use.
- Want different filenames or formats (e.g. .ogg/.m4a)? Edit MUSIC_SOURCES in
  src/components/audio/music.ts.
