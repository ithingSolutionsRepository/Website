import { useLanguage } from "@/lib/language-context";
import { SiLinkedin, SiWhatsapp } from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
const logoImage = "/attached_assets/1661853192216_1767668534815.jpg";

export function Footer() {
  const { t, isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();

  const services = [
    t("services.ai.title"),
    t("services.analytics.title"),
    t("services.cloud.title"),
    t("services.software.title"),
    t("services.consulting.title"),
  ];

  const quickLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 ${
            isRTL ? "text-right" : ""
          }`}
        >
          <div className="sm:col-span-2 lg:col-span-1">
            <div
              className={`flex items-center gap-2 mb-8 ${
                isRTL ? "flex-row-reverse justify-end" : ""
              }`}
            >
              <img
                src={logoImage}
                alt="iThing"
                className="h-14 w-auto bg-white rounded-lg p-1.5"
              />
            </div>
            <p
              className={`text-slate-400 text-sm leading-relaxed mb-8 ${
                isRTL ? "font-arabic" : ""
              }`}
            >
              {t("footer.description")}
            </p>
            <div
              className={`flex items-center gap-4 ${
                isRTL ? "justify-end" : ""
              }`}
            >
              <a
                href="https://www.linkedin.com/company/ithing-smart-business-solutions"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-white/10 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110 text-slate-300"
                data-testid="link-linkedin"
              >
                <SiLinkedin className="h-5 w-5 transition-transform group-hover:rotate-6" />
              </a>
              <a
                href="https://wa.me/962777775484"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-white/10 hover:bg-[#25D366] hover:text-white transition-all duration-300 hover:scale-110 text-slate-300"
                data-testid="link-whatsapp"
              >
                <SiWhatsapp className="h-5 w-5 transition-transform group-hover:rotate-6" />
              </a>
            </div>
          </div>

          <div>
            <h4
              className={`font-bold mb-8 text-lg text-white ${
                isRTL ? "font-arabic" : ""
              }`}
            >
              {t("footer.services")}
            </h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className={`group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors ${
                      isRTL ? "font-arabic flex-row-reverse justify-end" : ""
                    }`}
                  >
                    {service}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className={`font-bold mb-8 text-lg text-white ${
                isRTL ? "font-arabic" : ""
              }`}
            >
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors ${
                      isRTL ? "font-arabic flex-row-reverse justify-end" : ""
                    }`}
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              className={`font-bold mb-8 text-lg text-white ${
                isRTL ? "font-arabic" : ""
              }`}
            >
              {t("footer.contact")}
            </h4>
            <ul className="space-y-4">
              <li
                className={`text-sm text-slate-400 ${
                  isRTL ? "font-arabic" : ""
                }`}
              >
                {t("contact.office.amman.address")}
              </li>

              <li className="text-sm text-slate-400" dir="ltr">
                info@ithingsolutions.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10">
          <div
            className={`flex flex-col sm:flex-row items-center justify-between gap-6 ${
              isRTL ? "sm:flex-row-reverse" : ""
            }`}
          >
            <p
              className={`text-sm text-slate-500 ${isRTL ? "font-arabic" : ""}`}
            >
              &copy; {currentYear} {t("footer.company")}.{" "}
              {t("footer.copyright")}
            </p>
            <div
              className={`flex items-center gap-8 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <a
                href="/privacy-policy"
                className={`text-sm text-slate-500 hover:text-white transition-colors ${
                  isRTL ? "font-arabic" : ""
                }`}
              >
                {t("footer.privacy")}
              </a>
              <a
                href="/terms-of-service"
                className={`text-sm text-slate-500 hover:text-white transition-colors ${
                  isRTL ? "font-arabic" : ""
                }`}
              >
                {t("footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
