import {
  Bug,
  Circle,
  CloudSun,
  Droplets,
  Flame,
  Ghost,
  Leaf,
  MoonStar,
  Mountain,
  Shield,
  Snowflake,
  Sparkles,
  WandSparkles,
  Wind,
  Zap,
} from "lucide-react";

export const TYPE_CONFIG = {
  electric: {
    color: "#facc15",
    bg: "#fef08a",
    textColor: "#111827",
    icon: <Zap size={16} strokeWidth={2.2} />,
  },
  fire: {
    color: "#f97316",
    bg: "#ffedd5",
    textColor: "#111827",
    icon: <Flame size={16} strokeWidth={2.2} />,
  },
  water: {
    color: "#38bdf8",
    bg: "#e0f2fe",
    textColor: "#111827",
    icon: <Droplets size={16} strokeWidth={2.2} />,
  },
  grass: {
    color: "#4ade80",
    bg: "#dcfce7",
    textColor: "#111827",
    icon: <Leaf size={16} strokeWidth={2.2} />,
  },
  poison: {
    color: "#c084fc",
    bg: "#f3e8ff",
    textColor: "#111827",
    icon: <Sparkles size={16} strokeWidth={2.2} />,
  },
  flying: {
    color: "#93c5fd",
    bg: "#dbeafe",
    textColor: "#111827",
    icon: <Wind size={16} strokeWidth={2.2} />,
  },
  bug: {
    color: "#a3e635",
    bg: "#ecfccb",
    textColor: "#111827",
    icon: <Bug size={16} strokeWidth={2.2} />,
  },
  normal: {
    color: "#cbd5e1",
    bg: "#f1f5f9",
    textColor: "#111827",
    icon: <Circle size={16} strokeWidth={2.2} />,
  },
  ground: {
    color: "#fbbf24",
    bg: "#fef3c7",
    textColor: "#111827",
    icon: <Mountain size={16} strokeWidth={2.2} />,
  },
  fairy: {
    color: "#f472b6",
    bg: "#fce7f3",
    textColor: "#111827",
    icon: <WandSparkles size={16} strokeWidth={2.2} />,
  },
  fighting: {
    color: "#ef4444",
    bg: "#fee2e2",
    textColor: "#111827",
    icon: <Shield size={16} strokeWidth={2.2} />,
  },
  psychic: {
    color: "#f43f5e",
    bg: "#ffe4e6",
    textColor: "#111827",
    icon: <CloudSun size={16} strokeWidth={2.2} />,
  },
  rock: {
    color: "#b45309",
    bg: "#fef3c7",
    textColor: "#111827",
    icon: <Mountain size={16} strokeWidth={2.2} />,
  },
  ghost: {
    color: "#818cf8",
    bg: "#e0e7ff",
    textColor: "#111827",
    icon: <Ghost size={16} strokeWidth={2.2} />,
  },
  ice: {
    color: "#67e8f9",
    bg: "#cffafe",
    textColor: "#111827",
    icon: <Snowflake size={16} strokeWidth={2.2} />,
  },
  dragon: {
    color: "#6366f1",
    bg: "#e0e7ff",
    textColor: "#111827",
    icon: <Sparkles size={16} strokeWidth={2.2} />,
  },
  steel: {
    color: "#94a3b8",
    bg: "#e2e8f0",
    textColor: "#111827",
    icon: <Shield size={16} strokeWidth={2.2} />,
  },
  dark: {
    color: "#475569",
    bg: "#cbd5e1",
    textColor: "#111827",
    icon: <MoonStar size={16} strokeWidth={2.2} />,
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
      icon: <Circle size={16} strokeWidth={2.2} />,
    }
  );
};
