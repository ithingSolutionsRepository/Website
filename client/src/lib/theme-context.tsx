import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isEvening: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getAmmanHour(): number {
  const now = new Date();
  const ammanTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Amman" })
  );
  return ammanTime.getHours();
}

function checkIsEvening(): boolean {
  const hour = getAmmanHour();
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("evening") === "true") return true;
  if (urlParams.get("evening") === "false") return false;
  return hour >= 18 || hour < 6;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme;
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  const [isEvening, setIsEvening] = useState<boolean>(checkIsEvening);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEvening(checkIsEvening());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (isEvening) {
      document.documentElement.classList.add("evening-mode");
    } else {
      document.documentElement.classList.remove("evening-mode");
    }
  }, [isEvening]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isEvening }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
