"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const TRACKS = [
  "/audio/bg-music.m4a",
  "/audio/bg-music-2.mp4",
  "/audio/bg-music-3.mp3",
  "/audio/bg-music-4.mp3",
  "/audio/bg-music-5.mp3",
];

function startAudio(audio: HTMLAudioElement) {
  audio.src    = TRACKS[Math.floor(Math.random() * TRACKS.length)];
  audio.volume = 0.35;
  audio.load();
  return audio.play();
}

/*
 * AudioPlayer
 * ───────────
 * Button is always visible. Two modes:
 *  - Not yet playing: click starts a random track (user gesture satisfies autoplay).
 *  - Playing: click toggles mute.
 *
 * Also listens for "catalysis:play" (fired by SplashScreen) to auto-start on
 * first visit without requiring a second click.
 */
export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(false);

  // Start via splash event (first visit)
  useEffect(() => {
    const handlePlay = () => {
      const audio = audioRef.current;
      if (!audio || playing) return;
      startAudio(audio)
        .then(() => setPlaying(true))
        .catch(() => {});
    };

    window.addEventListener("catalysis:play", handlePlay);
    return () => window.removeEventListener("catalysis:play", handlePlay);
  }, [playing]);

  const handleButtonClick = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!playing) {
      // First click after refresh — start music
      startAudio(audio)
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      // Already playing — toggle mute
      audio.muted = !muted;
      setMuted(prev => !prev);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="none" />

      <button
        onClick={handleButtonClick}
        aria-label={!playing ? "Play music" : muted ? "Unmute music" : "Mute music"}
        className="fixed bottom-6 right-6 z-[500] w-12 h-12 bg-white border-[3px] border-black rounded-full shadow-[3px_3px_0px_black] flex items-center justify-center text-xl hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_black] active:translate-y-0.5 active:shadow-[2px_2px_0px_black] transition-all duration-200"
      >
        {!playing ? (
          <Image src="/sound-icon.png" alt="Play music" width={24} height={24} className="object-contain" />
        ) : muted ? (
          <Image src="/mute-icon.png" alt="Unmuted" width={24} height={24} className="object-contain" />
        ) : (
          <Image src="/sound-icon.png" alt="Sound on" width={24} height={24} className="object-contain" />
        )}
      </button>
    </>
  );
}
