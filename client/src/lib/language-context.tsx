import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.getStarted": "Get Started",

    "hero.title": "iThing Smart Business Solutions",
    "hero.subtitle": "Accelerating Digital Transformation",
    "hero.description":
      "Your trusted partner for innovative, scalable, and future-ready technology solutions.",
    "hero.cta.primary": "Start Your Journey",
    "hero.cta.secondary": "Learn More",

    "services.title": "Our Services",
    "services.subtitle":
      "Comprehensive technology solutions tailored to your business needs",
    "services.ai.title": "Artificial Intelligence",
    "services.ai.description":
      "Leverage cutting-edge AI and machine learning to automate processes and gain intelligent insights from your data.",
    "services.analytics.title": "Data Analytics",
    "services.analytics.description":
      "Transform raw data into actionable business intelligence with our advanced analytics solutions.",
    "services.cloud.title": "Cloud Services",
    "services.cloud.description":
      "Scalable and secure cloud infrastructure designed to grow with your business needs.",
    "services.software.title": "Software Development",
    "services.software.description":
      "Tailored software solutions built to address your unique business challenges and requirements.",
    "services.consulting.title": "Digital Transformation",
    "services.consulting.description":
      "Strategic guidance to navigate your digital transformation journey with confidence.",
    "services.integration.title": "System Integration",
    "services.integration.description":
      "Seamlessly connect your systems and applications for improved efficiency and data flow.",

    "stats.projects": "Projects Delivered",
    "stats.clients": "Happy Clients",
    "stats.experience": "Years Experience",
    "stats.experts": "Tech Experts",

    "why.title": "Why iThing?",
    "why.subtitle":
      "Partner with us for innovative, scalable, and future-ready solutions",
    "why.innovation.title": "Innovation First",
    "why.innovation.description":
      "We stay ahead of technology trends to deliver cutting-edge solutions.",
    "why.expertise.title": "Expert Team",
    "why.expertise.description":
      "Our certified professionals bring years of industry experience.",
    "why.support.title": "Expert Assistance",
    "why.support.description":
      "Dedicated professionals ready to help you achieve your business goals.",
    "why.scalable.title": "Scalable Solutions",
    "why.scalable.description":
      "Solutions that grow with your business without compromising performance.",

    "contact.title": "Get In Touch",
    "contact.subtitle":
      "Ready to transform your business? Let's start a conversation.",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email Address",
    "contact.form.phone": "Phone Number",
    "contact.form.service": "Service Interest",
    "contact.form.message": "Your Message",
    "contact.form.submit": "Send Message",
    "contact.form.selectService": "Select a service",
    "contact.office.amman": "Amman Office",
    "contact.office.address": "Address",
    "contact.office.amman.address":
      "Anshasi Square, 28 Alhusari St, Amman, Jordan",
    "footer.company": "iThing Smart Business Solutions",
    "footer.description":
      "Your trusted partner for digital transformation and innovative technology solutions.",
    "footer.services": "Services",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.copyright": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
  },
  ar: {
    "nav.home": "الرئيسية",
    "nav.services": "خدماتنا",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.getStarted": "ابدأ الآن",

    "hero.title": "iThing لتطوير حلول الأعمال الذكية",
    "hero.subtitle": "تسريع التحول الرقمي",
    "hero.description":
      "شريكك الموثوق لحلول تكنولوجية مبتكرة وقابلة للتطوير ومستعدة للمستقبل.",
    "hero.cta.primary": "ابدأ رحلتك",
    "hero.cta.secondary": "اعرف المزيد",

    "services.title": "خدماتنا",
    "services.subtitle": "حلول تكنولوجية شاملة مصممة لتلبية احتياجات أعمالك",
    "services.ai.title": "الذكاء الاصطناعي",
    "services.ai.description":
      "استفد من أحدث تقنيات الذكاء الاصطناعي والتعلم الآلي لأتمتة العمليات واستخلاص رؤى ذكية من بياناتك.",
    "services.analytics.title": "تحليلات البيانات",
    "services.analytics.description":
      "حوّل البيانات الخام إلى ذكاء أعمال قابل للتنفيذ باستخدام حلولنا التحليلية المتقدمة.",
    "services.cloud.title": "الخدمات السحابية",
    "services.cloud.description":
      "بنية تحتية سحابية قابلة للتوسع وآمنة مصممة للنمو مع احتياجات عملك.",
    "services.software.title": "تطوير البرمجيات",
    "services.software.description":
      "حلول برمجية مخصصة مبنية لمعالجة تحديات ومتطلبات عملك الفريدة.",
    "services.consulting.title": "التحول الرقمي",
    "services.consulting.description":
      "توجيه استراتيجي للتنقل في رحلة التحول الرقمي بثقة.",
    "services.integration.title": "تكامل الأنظمة",
    "services.integration.description":
      "ربط أنظمتك وتطبيقاتك بسلاسة لتحسين الكفاءة وتدفق البيانات.",

    "stats.projects": "مشروع منجز",
    "stats.clients": "عميل سعيد",
    "stats.experience": "سنوات خبرة",
    "stats.experts": "خبير تقني",

    "why.title": "لماذا تختار iThing؟",
    "why.subtitle": "شاركنا لحلول مبتكرة وقابلة للتطوير ومستعدة للمستقبل",
    "why.innovation.title": "الابتكار أولاً",
    "why.innovation.description":
      "نبقى في صدارة اتجاهات التكنولوجيا لتقديم حلول متطورة.",
    "why.expertise.title": "فريق خبراء",
    "why.expertise.description":
      "محترفونا المعتمدون يجلبون سنوات من الخبرة الصناعية.",
    "why.support.title": "مساعدة الخبراء",
    "why.support.description": "متخصصون متفانون لمساعدتك في تحقيق أهداف عملك.",
    "why.scalable.title": "حلول قابلة للتوسع",
    "why.scalable.description": "حلول تنمو مع عملك دون المساس بالأداء.",

    "contact.title": "تواصل معنا",
    "contact.subtitle": "هل أنت مستعد لتحويل عملك؟ لنبدأ محادثة.",
    "contact.form.name": "الاسم الكامل",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.phone": "رقم الهاتف",
    "contact.form.service": "الخدمة المطلوبة",
    "contact.form.message": "رسالتك",
    "contact.form.submit": "إرسال الرسالة",
    "contact.form.selectService": "اختر خدمة",
    "contact.office.amman": "مكتب عمّان",
    "contact.office.address": "العنوان",
    "contact.office.amman.address":
      "ميدان الأنشاصي، 28 شارع الحصري، عمّان، الأردن",

    "footer.company": "iThing لتطوير حلول الأعمال الذكية",
    "footer.description":
      "شريكك الموثوق للتحول الرقمي وحلول التكنولوجيا المبتكرة.",
    "footer.services": "الخدمات",
    "footer.quickLinks": "روابط سريعة",
    "footer.contact": "اتصل بنا",
    "footer.copyright": "جميع الحقوق محفوظة.",
    "footer.privacy": "سياسة الخصوصية",
    "footer.terms": "شروط الخدمة",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("language") as Language;
      return saved || "en";
    }
    return "en";
  });

  const isRTL = language === "ar";

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";

    if (isRTL) {
      document.body.style.fontFamily = "Cairo, Tajawal, sans-serif";
    } else {
      document.body.style.fontFamily = "'Fira Sans', sans-serif";
    }
  }, [language, isRTL]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
