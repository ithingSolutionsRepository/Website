import { useLanguage } from "@/lib/language-context";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/scroll-animation";
import { Sparkles, Users, HeadphonesIcon, TrendingUp, CheckCircle2, Star } from "lucide-react";

const reasons = [
  { key: "innovation", icon: Sparkles },
  { key: "expertise", icon: Users },
  { key: "support", icon: HeadphonesIcon },
  { key: "scalable", icon: TrendingUp },
];

export function WhyChooseUs() {
  const { t, isRTL } = useLanguage();

  return (
    <section id="about" className="py-28 lg:py-40 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-primary/8 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/60 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${isRTL ? "lg:flex-row-reverse" : ""}`}>
          <ScrollAnimation animation="fadeLeft" className={isRTL ? "text-right order-2 lg:order-1" : "order-2 lg:order-1"}>
           
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-8 leading-tight ${isRTL ? "font-arabic" : ""}`}
              data-testid="text-why-title"
            >
              {t("why.title")}
            </h2>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((reason) => {
                const Icon = reason.icon;
                return (
                  <StaggerItem key={reason.key} animation="fadeUp">
                    <div
                      className={`group relative p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden h-full ${isRTL ? "text-right" : ""}`}
                      data-testid={`card-why-${reason.key}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className={`relative flex items-start gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                        <div className="shrink-0 p-3.5 rounded-xl bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold mb-2 ${isRTL ? "font-arabic" : ""}`}>
                            {t(`why.${reason.key}.title`)}
                          </h3>
                          <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? "font-arabic" : ""}`}>
                            {t(`why.${reason.key}.description`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </ScrollAnimation>

          <ScrollAnimation animation="fadeRight" className={`relative order-1 lg:order-2 ${isRTL ? "lg:order-1" : "lg:order-2"}`}>
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-primary/5 rounded-[3rem] rotate-6 blur-sm" />
              <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 via-primary/10 to-transparent rounded-[3rem] -rotate-3" />
              
              <div className="absolute inset-4 bg-gradient-to-br from-card via-card to-accent/30 rounded-[2.5rem] border border-border shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="flex items-center justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-primary text-primary" />
                      ))}
                    </div>
                    <div className="text-8xl lg:text-9xl font-black bg-gradient-to-br from-primary via-primary to-primary/50 bg-clip-text text-transparent mb-4">
                      10+
                    </div>
                    <div className={`text-xl font-semibold text-muted-foreground ${isRTL ? "font-arabic" : ""}`}>
                      {isRTL ? "سنوات من التميز" : "Years of Excellence"}
                    </div>
                    <div className="mt-6 flex items-center justify-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className={`text-sm text-muted-foreground ${isRTL ? "font-arabic" : ""}`}>
                        {isRTL ? "يثق بنا العملاء" : "Trusted by Clients"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/15 rounded-full blur-2xl" />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
