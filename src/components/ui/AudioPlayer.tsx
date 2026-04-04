"use client";

import { useEffect, useRef, useState } from "react";

/*
 * AudioPlayer
 * ───────────
 * Always mounted in the layout. Waits for the "catalysis:play" custom event
 * (fired by SplashScreen on pokeball click) to start playback — this satisfies
 * browser autoplay policy since it's triggered by a real user gesture.
 *
 * Shows a floating mute/unmute button once music is playing.
 */
export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(false);
  const [visible, setVisible] = useState(false); // fade-in the button

  useEffect(() => {
    const handlePlay = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0.35;
      audio.play()
        .then(() => {
          setPlaying(true);
          setTimeout(() => setVisible(true), 1200); // show button after splash fades
        })
        .catch(() => {/* blocked — user can interact again */});
    };

    window.addEventListener("catalysis:play", handlePlay);
    return () => window.removeEventListener("catalysis:play", handlePlay);
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(prev => !prev);
  };

  return (
    <>
      {/* Hidden audio element — persists for the lifetime of the app */}
      <audio ref={audioRef} src="/audio/bg-music.m4a" loop preload="auto" />

      {/* Floating mute button — appears after music starts */}
      {playing && (
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute music" : "Mute music"}
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
          className="fixed bottom-6 right-6 z-[500] w-12 h-12 bg-white border-[3px] border-black rounded-full shadow-[3px_3px_0px_black] flex items-center justify-center text-xl hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_black] active:translate-y-0.5 active:shadow-[2px_2px_0px_black] transition-all duration-200"
        >
          {muted ? "🔇" : "🔊"}
        </button>
      )}
    </>
  );
}
