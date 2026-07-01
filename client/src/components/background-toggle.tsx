import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBackground, timeLabels } from "@/lib/background-context";
import { useLanguage } from "@/lib/language-context";
import {
  Palette,
  Sun,
  Sunrise,
  Cloud,
  Sunset,
  Moon,
  Sparkles,
} from "lucide-react";

const modeIcons = {
  auto: Sparkles,
  dawn: Sunrise,
  morning: Sun,
  afternoon: Cloud,
  sunset: Sunset,
  night: Moon,
};

export function BackgroundToggle() {
  const { backgroundMode, setBackgroundMode, currentBackground } =
    useBackground();
  const { language } = useLanguage();

  const CurrentIcon = modeIcons[currentBackground];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-testid="button-background-toggle"
        >
          <CurrentIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {(Object.keys(timeLabels) as Array<keyof typeof timeLabels>).map(
          (mode) => {
            const Icon = modeIcons[mode];
            const label = timeLabels[mode][language as "en" | "ar"];
            const isActive = backgroundMode === mode;

            return (
              <DropdownMenuItem
                key={mode}
                onClick={() => setBackgroundMode(mode)}
                className={isActive ? "bg-primary/10" : ""}
                data-testid={`menu-item-background-${mode}`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </DropdownMenuItem>
            );
          }
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
