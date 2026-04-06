'use client'

import { useEffect } from 'react'

// ---------------------------------------------------------------------------
// Inline SVG Pokéball — used as a CSS cursor 
// ---------------------------------------------------------------------------
const POKEBALL_CURSOR_SVG = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <!-- Outer ring -->
  <circle cx="16" cy="16" r="15" fill="white" stroke="#1a1a1a" stroke-width="2"/>
  <!-- Top half (red) -->
  <path d="M1.35 14A15 15 0 0 1 30.65 14Z" fill="#EF4444" stroke="#1a1a1a" stroke-width="0"/>
  <path d="M1 16 A15 15 0 0 1 31 16 L31 14 A15 15 0 0 0 1 14 Z" fill="#EF4444"/>
  <!-- Full top arc -->
  <path d="M1.1 15.5 A15 15 0 0 1 30.9 15.5" fill="#EF4444"/>
  <!-- Cleaner top half -->
  <path d="M1.2 16 A14.8 14.8 0 0 1 30.8 16 L16 16 Z" fill="#EF4444"/>
  <!-- Divider line -->
  <rect x="1" y="14.5" width="30" height="3" fill="#1a1a1a"/>
  <!-- Center button outer -->
  <circle cx="16" cy="16" r="5.5" fill="#1a1a1a"/>
  <!-- Center button inner -->
  <circle cx="16" cy="16" r="4" fill="white"/>
  <!-- Center button shine -->
  <circle cx="14.5" cy="14.5" r="1.2" fill="rgba(255,255,255,0.8)"/>
</svg>
`)

// A cleaner, simpler Pokéball SVG that renders crisply at 32px
const CURSOR_DATA_URI = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <circle cx="16" cy="16" r="14.5" fill="white" stroke="#111" stroke-width="2"/>
  <clipPath id="c"><circle cx="16" cy="16" r="14.5"/></clipPath>
  <rect x="1.5" y="1.5" width="29" height="14.5" fill="#EF4444" clip-path="url(#c)"/>
  <rect x="1.5" y="14" width="29" height="4" fill="#111" clip-path="url(#c)"/>
  <circle cx="16" cy="16" r="5" fill="#111"/>
  <circle cx="16" cy="16" r="3.5" fill="white"/>
</svg>
`)}`

// ---------------------------------------------------------------------------
// CSS injected once — defines cursor + click-burst keyframes
// ---------------------------------------------------------------------------
const GLOBAL_CSS = `
  *,
  *::before,
  *::after,
  a, button, input, textarea, select, label,
  [role="button"], [tabindex] {
    cursor: url("${CURSOR_DATA_URI}") 16 16, auto !important;
  }

  .poke-burst {
    position: fixed;
    pointer-events: none;
    cursor: none !important;
    z-index: 99999;
    width: 40px;
    height: 40px;
    /* Center on click point */
    transform: translate(-50%, -50%);
    will-change: transform, opacity;
  }

  /* The ring that expands outward */
  .poke-burst::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 3px solid #EF4444;
    animation: poke-ring 0.45s cubic-bezier(0.2, 0.8, 0.4, 1) forwards;
    will-change: transform, opacity;
  }

  /* Inner flash */
  .poke-burst::after {
    content: '';
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,200,0,0.9) 0%, rgba(239,68,68,0.4) 60%, transparent 100%);
    animation: poke-flash 0.35s ease-out forwards;
    will-change: transform, opacity;
  }

  @keyframes poke-ring {
    0%   { transform: scale(0.3); opacity: 1; border-color: #FFD700; }
    50%  { opacity: 1; border-color: #EF4444; }
    100% { transform: scale(2.8); opacity: 0; }
  }

  @keyframes poke-flash {
    0%   { transform: scale(0.5); opacity: 1; }
    100% { transform: scale(1.6); opacity: 0; }
  }
`

// ---------------------------------------------------------------------------
// Burst factory — creates a self-cleaning DOM element at click coords
// ---------------------------------------------------------------------------
function spawnBurst(x: number, y: number) {
    const el = document.createElement('div')
    el.className = 'poke-burst'
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    document.body.appendChild(el)

    // Remove after animation completes (450ms) — no memory leak
    const cleanup = () => el.remove()
    el.addEventListener('animationend', cleanup, { once: true })
    // Fallback safety removal
    setTimeout(cleanup, 600)
}

// ---------------------------------------------------------------------------
// Component — drop into your root layout, renders nothing visible
// ---------------------------------------------------------------------------
export default function PokeCursor() {
    useEffect(() => {
        // Inject styles once
        const styleId = 'poke-cursor-styles'
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style')
            style.id = styleId
            style.textContent = GLOBAL_CSS
            document.head.appendChild(style)
        }

        // Click handler — uses { passive: true } for zero scroll performance impact
        const handleClick = (e: MouseEvent) => {
            spawnBurst(e.clientX, e.clientY)
        }

        window.addEventListener('click', handleClick, { passive: true })

        return () => {
            window.removeEventListener('click', handleClick)
            document.getElementById(styleId)?.remove()
        }
    }, [])

    return null 
}