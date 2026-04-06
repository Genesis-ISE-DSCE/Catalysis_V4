'use client'

import { useEffect } from 'react'

// ---------------------------------------------------------------------------
// CSS injected once — click-burst keyframes only (cursor removed)
// ---------------------------------------------------------------------------
const GLOBAL_CSS = `
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