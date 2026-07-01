import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";
import {
  ArrowRight,
  ArrowLeft,
  Brain,
  Cloud,
  Code,
  CheckCircle2,
  Sparkles,
  Zap,
  TrendingUp,
} from "lucide-react";
import heroBackground from "@assets/stock_images/diverse_professional_9756945b.jpg";

export function Hero() {
  const { t, isRTL } = useLanguage();
  const { theme } = useTheme();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const features = [
    {
      icon: Brain,
      text: isRTL ? "الذكاء الاصطناعي وتحليل البيانات" : "AI & Data Analytics",
    },
    {
      icon: Cloud,
      text: isRTL ? "الحوسبة السحابية" : "Cloud Services",
    },
    {
      icon: Code,
      text: isRTL ? "تطوير التكنولوجيا" : "Technology Development",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-arc {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-rotate {
          animation: rotate 20s linear infinite;
        }

        .animate-spin-arc {
          animation: spin-arc 8s linear infinite;
        }

        .shimmer-effect {
          position: relative;
          overflow: hidden;
        }

        .shimmer-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 3s infinite;
        }

        /* Curved arc elements inspired by logo */
        .arc-element {
          position: absolute;
          border: 3px solid;
          border-radius: 50%;
          border-color: transparent;
        }

        .arc-top {
          border-top-color: rgba(148, 163, 184, 0.3);
          border-right-color: rgba(148, 163, 184, 0.3);
        }

        .arc-accent {
          border-top-color: rgba(239, 68, 68, 0.6);
          border-right-color: rgba(239, 68, 68, 0.6);
        }
      `}</style>

      <section
        className="relative min-h-screen flex items-center overflow-hidden p-20"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Enhanced Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-gray-900/90 to-black/95" />

        {/* Animated curved arcs inspired by logo */}
        <div className="arc-element arc-top w-96 h-96 top-20 right-20 animate-spin-arc" />
        <div
          className="arc-element arc-accent w-64 h-64 top-32 right-32 animate-spin-arc"
          style={{ animationDelay: "0.5s", animationDirection: "reverse" }}
        />
        <div
          className="arc-element arc-top w-80 h-80 bottom-20 left-20 animate-spin-arc"
          style={{ animationDelay: "1s" }}
        />

        {/* Red accent orbs */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-red-600/15 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Gray accent orbs */}
        <div
          className="absolute top-40 left-20 w-72 h-72 bg-slate-500/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${isRTL ? "text-right" : "text-left"}`}>
              <div className="space-y-6 animate-fade-in">
                {/* Badge */}
                <div className="inline-block"></div>
           {/* Subheading */}
           <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-slate-300 to-gray-300 bg-clip-text text-transparent">
                  {isRTL ? (
                    <>
                      <span className="text-red-500">أبعاد</span>
                      لحلول الأعمال الذكية
                    </>
                  ) : (
                    <>
                      <span className="text-red-500">iThing </span>
                      Smart Business Solutions
                    </>
                  )}
                </p>
                {/* Main Heading */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className="block bg-gradient-to-r from-white via-slate-100 to-gray-100 bg-clip-text text-transparent animate-gradient">
                    {isRTL
                      ? "  تمكين حلول ذكية جاهزة للمستقبل"
                      : "Empowering future ready smart solutions"}
                  </span>
                </h1>

     

                {/* Description */}
                <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
                  {t("hero.description")}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 border border-red-500/30 shimmer-effect"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  {t("hero.cta.primary")}
                  <ArrowIcon
                    className={`h-5 w-5 transition-transform ${
                      isRTL
                        ? "group-hover:-translate-x-1"
                        : "group-hover:translate-x-1"
                    }`}
                  />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-400/30 text-white hover:bg-slate-800/30 px-8 py-6 text-lg backdrop-blur-sm hover:border-slate-300/50 transition-all duration-300 hover:scale-105 shadow-xl"
                  onClick={() => {
                    document.getElementById("services")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  {t("hero.cta.secondary")}
                </Button>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-4 pt-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg group cursor-pointer"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <feature.icon className="h-5 w-5 text-blue-300 group-hover:text-blue-200 transition-colors" />
                    <span className="text-sm font-medium text-white">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Content */}
            <div className="relative lg:block hidden">
              <div className="relative w-full h-[500px] animate-float">
                {/* Glassmorphism cards */}
                <div className="absolute top-0 right-0 w-72 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 animate-slide-in-right cursor-pointer group">
                  <div className="flex items-start justify-between">
                    <Brain className="h-12 w-12 text-blue-300 group-hover:scale-110 transition-transform" />
                    <Sparkles className="h-6 w-6 text-blue-200 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1 mt-2">
                    {isRTL ? "الذكاء الاصطناعي" : "AI-Powered"}
                  </h3>
                  <p className="text-blue-200 text-sm">
                    {isRTL ? "حلول متقدمة" : "Advanced Solutions"}
                  </p>
                </div>

                <div
                  className="absolute top-32 left-0 w-72 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 animate-slide-in-left cursor-pointer group"
                  style={{ animationDelay: "0.3s" }}
                >
                  <div className="flex items-start justify-between">
                    <Cloud className="h-12 w-12 text-purple-300 group-hover:scale-110 transition-transform" />
                    <Zap className="h-6 w-6 text-purple-200 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1 mt-2">
                    {isRTL ? "السحابة" : "Cloud Native"}
                  </h3>
                  <p className="text-purple-200 text-sm">
                    {isRTL ? "بنية تحتية مرنة" : "Scalable Infrastructure"}
                  </p>
                </div>

                <div
                  className="absolute bottom-0 right-16 w-72 h-40 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 animate-slide-in-right cursor-pointer group"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="flex items-start justify-between">
                    <Code className="h-12 w-12 text-indigo-300 group-hover:scale-110 transition-transform" />
                    <TrendingUp className="h-6 w-6 text-indigo-200 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1 mt-2">
                    {isRTL ? "تطوير مخصص" : "Software Development"}
                  </h3>
                  <p className="text-indigo-200 text-sm">
                    {isRTL ? "حلول مصممة خصيصاً" : "Tailored Solutions"}
                  </p>
                </div>

                {/* Floating particles */}
                <div className="absolute top-10 left-10 w-3 h-3 bg-blue-400 rounded-full animate-bounce shadow-lg shadow-blue-400/50" />
                <div
                  className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-bounce shadow-lg shadow-purple-400/50"
                  style={{ animationDelay: "0.5s" }}
                />
                <div
                  className="absolute top-1/2 left-1/4 w-4 h-4 bg-pink-400 rounded-full animate-bounce shadow-lg shadow-pink-400/50"
                  style={{ animationDelay: "1s" }}
                />

                {/* Additional decorative elements */}
                <div className="absolute top-1/4 right-1/3 w-16 h-16 border-2 border-blue-400/30 rounded-lg rotate-45 animate-pulse" />
                <div
                  className="absolute bottom-1/3 left-1/2 w-12 h-12 border-2 border-purple-400/30 rounded-full animate-pulse"
                  style={{ animationDelay: "1.5s" }}
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 pt-16 mt-16 border-t border-white/20">
            <div className="text-center group cursor-default">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/30 transition-all" />
                <div className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  100+
                </div>
              </div>
              <div className="text-blue-200 text-sm md:text-base font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                {isRTL ? "عميل سعيد" : "Happy Clients"}
              </div>
            </div>

            <div className="text-center group cursor-default">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full group-hover:bg-purple-500/30 transition-all" />
                <div className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  100+
                </div>
              </div>
              <div className="text-purple-200 text-sm md:text-base font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                {isRTL ? "مشروع منجز" : "Projects Done"}
              </div>
            </div>

            <div className="text-center group cursor-default">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-pink-500/20 blur-xl rounded-full group-hover:bg-pink-500/30 transition-all" />
                <div className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  10+
                </div>
              </div>
              <div className="text-pink-200 text-sm md:text-base font-medium flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                {isRTL ? "سنوات خبرة" : "Years Experience"}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>
    </>
  );
}
