import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { Cookie, X, Settings, Check } from "lucide-react";
import { Link } from "wouter";

const COOKIE_CONSENT_KEY = "ithingsolutions_cookie_consent";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const { isRTL } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(necessaryOnly));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
    setIsVisible(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return;
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6">
              <div
                className={`flex items-start gap-4 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                  <Cookie className="w-6 h-6 text-primary" />
                </div>
                <div className={`flex-1 ${isRTL ? "text-right" : ""}`}>
                  <h3
                    className={`text-lg font-bold mb-2 ${
                      isRTL ? "font-arabic" : ""
                    }`}
                  >
                    {isRTL
                      ? "نحن نستخدم ملفات تعريف الارتباط"
                      : "We use cookies"}
                  </h3>
                  <p
                    className={`text-muted-foreground text-sm leading-relaxed ${
                      isRTL ? "font-arabic" : ""
                    }`}
                  >
                    {isRTL
                      ? "نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. بعضها ضروري لعمل الموقع، بينما يساعدنا البعض الآخر في تحسين خدماتنا."
                      : "We use cookies to enhance your experience on our website. Some are essential for the site to function, while others help us improve our services."}{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-primary hover:underline"
                    >
                      {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
                    </Link>
                  </p>
                </div>
                <button
                  onClick={handleAcceptNecessary}
                  className="p-2 hover:bg-accent rounded-lg transition-colors shrink-0"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <AnimatePresence>
                {showPreferences && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 pt-6 border-t border-border/50 space-y-4">
                      <div
                        className={`flex items-center justify-between gap-4 p-4 rounded-xl bg-accent/30 ${
                          isRTL ? "flex-row-reverse" : ""
                        }`}
                      >
                        <div className={isRTL ? "text-right" : ""}>
                          <p
                            className={`font-semibold ${
                              isRTL ? "font-arabic" : ""
                            }`}
                          >
                            {isRTL
                              ? "ملفات تعريف الارتباط الضرورية"
                              : "Necessary Cookies"}
                          </p>
                          <p
                            className={`text-sm text-muted-foreground ${
                              isRTL ? "font-arabic" : ""
                            }`}
                          >
                            {isRTL
                              ? "مطلوبة لعمل الموقع بشكل صحيح"
                              : "Required for the website to function properly"}
                          </p>
                        </div>
                        <div className="w-12 h-7 bg-primary/20 rounded-full flex items-center justify-end px-1">
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>

                      <div
                        className={`flex items-center justify-between gap-4 p-4 rounded-xl bg-accent/30 cursor-pointer hover:bg-accent/50 transition-colors ${
                          isRTL ? "flex-row-reverse" : ""
                        }`}
                        onClick={() => togglePreference("analytics")}
                      >
                        <div className={isRTL ? "text-right" : ""}>
                          <p
                            className={`font-semibold ${
                              isRTL ? "font-arabic" : ""
                            }`}
                          >
                            {isRTL
                              ? "ملفات تعريف الارتباط التحليلية"
                              : "Analytics Cookies"}
                          </p>
                          <p
                            className={`text-sm text-muted-foreground ${
                              isRTL ? "font-arabic" : ""
                            }`}
                          >
                            {isRTL
                              ? "تساعدنا على فهم كيفية استخدام الموقع"
                              : "Help us understand how the site is used"}
                          </p>
                        </div>
                        <div
                          className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors ${
                            preferences.analytics
                              ? "bg-primary/20 justify-end"
                              : "bg-muted justify-start"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                              preferences.analytics
                                ? "bg-primary"
                                : "bg-muted-foreground/50"
                            }`}
                          >
                            {preferences.analytics && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`flex items-center justify-between gap-4 p-4 rounded-xl bg-accent/30 cursor-pointer hover:bg-accent/50 transition-colors ${
                          isRTL ? "flex-row-reverse" : ""
                        }`}
                        onClick={() => togglePreference("marketing")}
                      >
                        <div className={isRTL ? "text-right" : ""}>
                          <p
                            className={`font-semibold ${
                              isRTL ? "font-arabic" : ""
                            }`}
                          >
                            {isRTL
                              ? "ملفات تعريف الارتباط التسويقية"
                              : "Marketing Cookies"}
                          </p>
                          <p
                            className={`text-sm text-muted-foreground ${
                              isRTL ? "font-arabic" : ""
                            }`}
                          >
                            {isRTL
                              ? "تُستخدم لتقديم إعلانات مخصصة"
                              : "Used to deliver personalized advertisements"}
                          </p>
                        </div>
                        <div
                          className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors ${
                            preferences.marketing
                              ? "bg-primary/20 justify-end"
                              : "bg-muted justify-start"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                              preferences.marketing
                                ? "bg-primary"
                                : "bg-muted-foreground/50"
                            }`}
                          >
                            {preferences.marketing && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className={`flex flex-col sm:flex-row gap-3 mt-6 ${
                  isRTL ? "sm:flex-row-reverse" : ""
                }`}
              >
                <Button
                  onClick={handleAcceptAll}
                  className={`flex-1 ${isRTL ? "font-arabic" : ""}`}
                  data-testid="button-accept-all-cookies"
                >
                  {isRTL ? "قبول الكل" : "Accept All"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPreferences(!showPreferences)}
                  className={`flex-1 gap-2 ${
                    isRTL ? "font-arabic flex-row-reverse" : ""
                  }`}
                  data-testid="button-cookie-preferences"
                >
                  <Settings className="w-4 h-4" />
                  {isRTL ? "تخصيص" : "Customize"}
                </Button>
                {showPreferences && (
                  <Button
                    variant="secondary"
                    onClick={handleSavePreferences}
                    className={`flex-1 ${isRTL ? "font-arabic" : ""}`}
                    data-testid="button-save-cookie-preferences"
                  >
                    {isRTL ? "حفظ التفضيلات" : "Save Preferences"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
