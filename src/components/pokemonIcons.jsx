import React from "react";

export const TYPE_CONFIG = {
  electric: {
    color: "#facc15",
    bg: "#fef08a",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M13 2L3 14h7v8l11-13h-8l3-7z" />
      </svg>
    ),
  },
  fire: {
    color: "#f97316",
    bg: "#ffedd5",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M12 2c-.3 1.2-1 2.5-2 3.5-1.5 1.5-3 3.5-3 6.5a7 7 0 0014 0c0-3.5-2.2-6-3.5-7.5-.8-.9-1.5-2-1.8-3-.7 1.2-1.8 2-2.7 2.5-.5-1.2-.8-2.7-1-4z" />
      </svg>
    ),
  },
  water: {
    color: "#38bdf8",
    bg: "#e0f2fe",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
      </svg>
    ),
  },
  grass: {
    color: "#4ade80",
    bg: "#dcfce7",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66 1.82-5.46C15 17 21 13 21 3c-4 0-8 2-10 5-1.33 2-1.92 4-2.5 6 1.5-1 3.5-2 6.5-2l2-4z" />
      </svg>
    ),
  },
  poison: {
    color: "#c084fc",
    bg: "#f3e8ff",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M12 2a6 6 0 00-6 6c0 2.22 1.21 4.15 3 5.19V16h2v2h2v-2h2v-2.81c1.79-1.04 3-2.97 3-5.19a6 6 0 00-6-6zm-2 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm4 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM8 20h8v2H8z" />
      </svg>
    ),
  },
  flying: {
    color: "#93c5fd",
    bg: "#dbeafe",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M21 3L3 10.53v.98l6.84 2.28L12.12 21h.96L21 3zm-3.32 3.68L9.9 12.3l-4.52-1.51 12.3-4.11z" />
      </svg>
    ),
  },
  bug: {
    color: "#a3e635",
    bg: "#ecfccb",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M19 8h-1.81a5.985 5.985 0 00-1.82-1.96L17 4.41 15.59 3l-2.17 2.17C12.96 5.06 12.49 5 12 5c-.49 0-.96.06-1.41.17L8.41 3 7 4.41l1.62 1.63C7.94 6.57 7.37 7.24 6.81 8H5v2h1.22c-.14.64-.22 1.31-.22 2v1H4v2h2v1c0 .69.08 1.36.22 2H5v2h1.81c1.04 1.79 2.97 3 5.19 3s4.15-1.21 5.19-3H19v-2h-1.22c.14-.64.22-1.31.22-2v-1h2v-2h-2v-1c0-.69-.08-1.36-.22-2H19V8zm-5 8h-4v-2h4v2zm0-4h-4v-2h4v2z" />
      </svg>
    ),
  },
  normal: {
    color: "#cbd5e1",
    bg: "#f1f5f9",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <circle cx="12" cy="12" r="8" />
      </svg>
    ),
  },
  ground: {
    color: "#fbbf24",
    bg: "#fef3c7",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M2 19h20v2H2v-2zm2-4h16v2H4v-2zm3-4h10v2H7v-2zm3-4h4v2h-4V7z" />
      </svg>
    ),
  },
  fairy: {
    color: "#f472b6",
    bg: "#fce7f3",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.6-6.2 4.6 2.3-7.3-6.1-4.5h7.6z" />
      </svg>
    ),
  },
  fighting: {
    color: "#ef4444",
    bg: "#fee2e2",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M19 7h-2V5.5a2.5 2.5 0 00-5 0V7h-1V5.5a2.5 2.5 0 00-5 0V11l-2 2v6a3 3 0 003 3h8a4 4 0 004-4V7z" />
      </svg>
    ),
  },
  psychic: {
    color: "#f43f5e",
    bg: "#ffe4e6",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </svg>
    ),
  },
  rock: {
    color: "#b45309",
    bg: "#fef3c7",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M19 4H5L2 10l5 10h10l5-10L19 4zm-2.5 8L12 17.5 7.5 12 10 7h4l2.5 5z" />
      </svg>
    ),
  },
  ghost: {
    color: "#818cf8",
    bg: "#e0e7ff",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M12 2a9 9 0 00-9 9v9l3-2 3 2 3-2 3 2 3-2 3 2V11a9 9 0 00-9-9zm-3 8a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm6 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
      </svg>
    ),
  },
  ice: {
    color: "#67e8f9",
    bg: "#cffafe",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M12 2l1.5 3.5L17 4l-1.5 3.5L19 9l-3.5 1.5L17 14l-3.5-1.5L12 16l-1.5-3.5L7 14l1.5-3.5L5 9l3.5-1.5L7 4l3.5 1.5L12 2zm0 6a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
  },
  dragon: {
    color: "#6366f1",
    bg: "#e0e7ff",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>
    ),
  },
  steel: {
    color: "#94a3b8",
    bg: "#e2e8f0",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 4a4 4 0 110 8 4 4 0 010-8z" />
      </svg>
    ),
  },
  dark: {
    color: "#475569",
    bg: "#cbd5e1",
    textColor: "#111827",
    icon: (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
        <path d="M12.3 2a10 10 0 00-1.9 19.8 10 10 0 009.6-9.6A10 10 0 0012.3 2z" />
      </svg>
    ),
  },
};

export const PokeballIcon = ({ size = 20, className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
  >
    <circle cx="12" cy="12" r="9.5" />
    <line x1="2.5" y1="12" x2="21.5" y2="12" />
    <circle cx="12" cy="12" r="3.2" fill="#f4f4f6" />
    <circle cx="12" cy="12" r="1.3" fill="currentColor" />
  </svg>
);

export const getTypeInfo = (typeName) => {
  const normalized = (typeName || "").toLowerCase().trim();
  return (
    TYPE_CONFIG[normalized] || {
      color: "#cbd5e1",
      bg: "#f1f5f9",
      textColor: "#111827",
      icon: (
        <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
          <circle cx="12" cy="12" r="6" />
        </svg>
      ),
    }
  );
};
