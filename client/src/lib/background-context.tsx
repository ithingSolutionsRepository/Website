import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type TimeOfDay = "dawn" | "morning" | "afternoon" | "sunset" | "night";
type BackgroundMode =
  | "auto"
  | "dawn"
  | "morning"
  | "afternoon"
  | "sunset"
  | "night";

interface BackgroundContextType {
  timeOfDay: TimeOfDay;
  backgroundMode: BackgroundMode;
  setBackgroundMode: (mode: BackgroundMode) => void;
  currentBackground: TimeOfDay;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
);

function getTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "sunset";
  return "night";
}

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay);
  const [backgroundMode, setBackgroundMode] = useState<BackgroundMode>(() => {
    if (typeof window !== "undefined") {
      return (
        (localStorage.getItem("backgroundMode") as BackgroundMode) || "auto"
      );
    }
    return "auto";
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("backgroundMode", backgroundMode);
  }, [backgroundMode]);

  const currentBackground =
    backgroundMode === "auto" ? timeOfDay : backgroundMode;

  return (
    <BackgroundContext.Provider
      value={{
        timeOfDay,
        backgroundMode,
        setBackgroundMode,
        currentBackground,
      }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
}

export const backgroundGradients = {
  dawn: {
    primary: "from-rose-900/20 via-orange-800/15 to-amber-700/10",
    secondary: "from-purple-900/10 to-pink-800/15",
    accent: "from-amber-500/20 to-orange-400/15",
    glow: "bg-gradient-to-br from-rose-500/15 via-orange-400/10 to-amber-300/5",
  },
  morning: {
    primary: "from-sky-800/15 via-blue-700/10 to-cyan-600/5",
    secondary: "from-amber-400/10 to-yellow-300/5",
    accent: "from-blue-500/20 to-cyan-400/15",
    glow: "bg-gradient-to-br from-sky-400/15 via-blue-300/10 to-cyan-200/5",
  },
  afternoon: {
    primary: "from-blue-900/15 via-indigo-800/10 to-violet-700/5",
    secondary: "from-cyan-500/10 to-blue-400/5",
    accent: "from-indigo-500/20 to-blue-400/15",
    glow: "bg-gradient-to-br from-blue-500/15 via-indigo-400/10 to-violet-300/5",
  },
  sunset: {
    primary: "from-orange-900/20 via-red-800/15 to-rose-700/10",
    secondary: "from-purple-800/15 to-violet-700/10",
    accent: "from-orange-500/25 to-red-400/20",
    glow: "bg-gradient-to-br from-orange-500/20 via-red-400/15 to-purple-300/10",
  },
  night: {
    primary: "from-slate-900/30 via-indigo-950/25 to-violet-950/20",
    secondary: "from-blue-950/20 to-purple-950/15",
    accent: "from-indigo-600/20 to-purple-500/15",
    glow: "bg-gradient-to-br from-indigo-600/10 via-purple-500/5 to-blue-400/5",
  },
};

export const timeLabels = {
  auto: { en: "Auto (Time-based)", ar: "تلقائي (حسب الوقت)" },
  dawn: { en: "Dawn", ar: "الفجر" },
  morning: { en: "Morning", ar: "الصباح" },
  afternoon: { en: "Afternoon", ar: "الظهيرة" },
  sunset: { en: "Sunset", ar: "الغروب" },
  night: { en: "Night", ar: "الليل" },
};
