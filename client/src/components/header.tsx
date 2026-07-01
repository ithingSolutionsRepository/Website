import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
import { BackgroundToggle } from "@/components/background-toggle";
import { Menu, X, Moon, Sun } from "lucide-react";
import logoLight from "@assets/logos/Logo/logaster_No_6_png/1024_pixels/1_Primary_logo_on_transparent_1024.png";
import logoDark from "@assets/ithing_logo_dark.png_1768127827204.png";

export function Header() {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "nav.home", href: "#home" },
    { key: "nav.services", href: "#services" },
    { key: "nav.about", href: "#about" },
    { key: "nav.contact", href: "#contact" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <a href="#home" className="flex items-center" data-testid="link-logo">
            <img
              src={theme === "dark" || !scrolled ? logoDark : logoLight}
              alt="iThing"
              className="h-12 w-auto"
            />
          </a>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors group ${
                  scrolled
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-white hover:text-white/80"
                } ${isRTL ? "font-arabic" : ""}`}
                data-testid={`link-${item.key.split(".")[1]}`}
              >
                {t(item.key)}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all group-hover:w-1/2 rounded-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`rounded-full ${
                !scrolled
                  ? "text-white hover:text-white/80 hover:bg-white/10"
                  : ""
              }`}
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className={`font-bold text-xs px-3 rounded-full ${
                !scrolled
                  ? "text-white hover:text-white/80 hover:bg-white/10"
                  : ""
              }`}
              data-testid="button-language-toggle"
            >
              {language === "en" ? "العربية" : "EN"}
            </Button>

            <Button
              className={`hidden md:flex font-semibold rounded-full shadow-lg shadow-primary/25 ${
                isRTL ? "font-arabic" : ""
              }`}
              data-testid="button-get-started"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {t("nav.getStarted")}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden rounded-full ${
                !scrolled
                  ? "text-white hover:text-white/80 hover:bg-white/10"
                  : ""
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-4 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-colors ${
                    isRTL ? "font-arabic text-right" : ""
                  }`}
                  data-testid={`link-mobile-${item.key.split(".")[1]}`}
                >
                  {t(item.key)}
                </a>
              ))}
              <Button
                className={`mt-4 h-12 rounded-full ${
                  isRTL ? "font-arabic" : ""
                }`}
                data-testid="button-mobile-get-started"
                onClick={() => {
                  setMobileMenuOpen(false);
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("nav.getStarted")}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
