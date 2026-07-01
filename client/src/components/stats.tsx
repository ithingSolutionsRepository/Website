import { useLanguage } from "@/lib/language-context";
import { TrendingUp, Users, Award, Briefcase } from "lucide-react";

const stats = [
  { key: "projects", value: "100", suffix: "+", icon: Briefcase },
  { key: "clients", value: "200", suffix: "+", icon: Users },
  { key: "experience", value: "10", suffix: "+", icon: Award },
  { key: "experts", value: "50", suffix: "+", icon: TrendingUp },
];

export function Stats() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/98 to-foreground" />

      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-primary/15 rounded-full opacity-40"
          style={{ filter: "blur(60px)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-primary/10 rounded-full opacity-30"
          style={{ filter: "blur(50px)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl sm:text-4xl font-bold text-background/90 mb-4 ${
              isRTL ? "font-arabic" : ""
            }`}
          >
            {isRTL ? "أرقامنا تتحدث" : "Numbers That Speak"}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.key}
                className="group relative p-8 lg:p-10 rounded-3xl bg-background/5 border border-background/10 backdrop-blur-sm hover:bg-background/10 hover:border-background/20 transition-all duration-500"
                data-testid={`stat-${stat.key}`}
              >
                <div className="absolute top-4 right-4 p-2 rounded-xl bg-primary/20">
                  <Icon className="w-4 h-4 text-primary" />
                </div>

                <div className="flex items-baseline gap-1 mb-4" dir="ltr">
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-br from-primary via-primary to-primary/60 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary/50">
                    {stat.suffix}
                  </span>
                </div>
                <div
                  className={`text-background/50 text-sm font-bold uppercase tracking-[0.2em] ${
                    isRTL ? "font-arabic text-right" : ""
                  }`}
                >
                  {t(`stats.${stat.key}`)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
