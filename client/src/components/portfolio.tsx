import { useLanguage } from "@/lib/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Briefcase, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { PortfolioProject } from "@shared/schema";
import project1 from "@assets/stock_images/modern_technology_of_c41040a5.jpg";
import project2 from "@assets/stock_images/cloud_computing_serv_a28b0a16.jpg";
import project3 from "@assets/stock_images/mobile_app_developme_cb385d26.jpg";
import project4 from "@assets/stock_images/diverse_professional_4024c14e.jpg";

const fallbackProjects = [
  {
    id: 1,
    titleEn: "AI-Powered Analytics Platform",
    titleAr: "منصة تحليلات بالذكاء الاصطناعي",
    descriptionEn:
      "Enterprise-grade analytics solution with predictive insights and real-time dashboards for a Fortune 500 company.",
    descriptionAr:
      "حل تحليلات على مستوى المؤسسات مع رؤى تنبؤية ولوحات معلومات في الوقت الفعلي لشركة فورتشن 500.",
    imageUrl: project1,
    tagsEn: "AI/ML,Big Data,Dashboard",
    tagsAr: "ذكاء اصطناعي,بيانات ضخمة,لوحة معلومات",
  },
  {
    id: 2,
    titleEn: "Cloud Infrastructure Migration",
    titleAr: "هجرة البنية التحتية السحابية",
    descriptionEn:
      "Complete cloud migration for a regional bank, ensuring zero downtime and enhanced security protocols.",
    descriptionAr:
      "هجرة سحابية كاملة لبنك إقليمي، مع ضمان عدم التوقف وتعزيز بروتوكولات الأمان.",
    imageUrl: project2,
    tagsEn: "Cloud,Security,Migration",
    tagsAr: "سحابة,أمان,هجرة",
  },
  {
    id: 3,
    titleEn: "Healthcare Mobile App",
    titleAr: "تطبيق الرعاية الصحية",
    descriptionEn:
      "Patient management and telemedicine app serving 100,000+ users across the Middle East.",
    descriptionAr:
      "تطبيق إدارة المرضى والطب عن بُعد يخدم أكثر من 100,000 مستخدم في الشرق الأوسط.",
    imageUrl: project3,
    tagsEn: "Mobile,Healthcare,Telemedicine",
    tagsAr: "جوال,رعاية صحية,طب عن بعد",
  },
  {
    id: 4,
    titleEn: "Smart City IoT Network",
    titleAr: "شبكة إنترنت الأشياء للمدينة الذكية",
    descriptionEn:
      "Comprehensive IoT solution for smart city infrastructure including traffic, utilities, and public safety.",
    descriptionAr:
      "حل شامل لإنترنت الأشياء للبنية التحتية للمدينة الذكية بما في ذلك حركة المرور والمرافق والسلامة العامة.",
    imageUrl: project4,
    tagsEn: "IoT,Smart City,Infrastructure",
    tagsAr: "إنترنت الأشياء,مدينة ذكية,بنية تحتية",
  },
];

export function Portfolio() {
  const { language, isRTL } = useLanguage();

  const { data: apiProjects = [], isLoading } = useQuery<PortfolioProject[]>({
    queryKey: ["/api/content/portfolio"],
  });

  const projects = apiProjects.length > 0 ? apiProjects : fallbackProjects;

  return (
    <section id="portfolio" className="py-28 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/30 to-background" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/15 to-primary/10 border border-primary/20 mb-8 shadow-lg shadow-primary/5 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Briefcase className="w-4 h-4 text-primary" />
            <span
              className={`text-sm font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent ${
                isRTL ? "font-arabic" : ""
              }`}
            >
              {isRTL ? "أعمالنا" : "Our Work"}
            </span>
          </div>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-8 ${
              isRTL ? "font-arabic" : ""
            }`}
            data-testid="text-portfolio-title"
          >
            {isRTL ? "مشاريع مميزة" : "Featured Projects"}
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed ${
              isRTL ? "font-arabic" : ""
            }`}
            data-testid="text-portfolio-subtitle"
          >
            {isRTL
              ? "اكتشف كيف ساعدنا الشركات على تحقيق أهدافها"
              : "Discover how we've helped businesses achieve their goals"}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => {
              const title =
                language === "ar" ? project.titleAr : project.titleEn;
              const description =
                language === "ar"
                  ? project.descriptionAr
                  : project.descriptionEn;
              const tagsString =
                language === "ar" ? project.tagsAr : project.tagsEn;
              const tags = tagsString
                ? tagsString.split(",").map((t) => t.trim())
                : [];
              const imageUrl = project.imageUrl || project1;

              return (
                <Card
                  key={project.id}
                  className="group border-0 bg-background shadow-xl overflow-hidden hover-lift"
                  data-testid={`card-project-${project.id}`}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4 p-3 rounded-full bg-background/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <div
                      className={`flex flex-wrap gap-2 mb-4 ${
                        isRTL ? "justify-end" : ""
                      }`}
                    >
                      {tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className={`text-xs ${isRTL ? "font-arabic" : ""}`}
                          data-testid={`badge-project-${project.id}-tag-${index}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3
                      className={`text-2xl font-bold mb-3 group-hover:text-primary transition-colors ${
                        isRTL ? "font-arabic text-right" : ""
                      }`}
                      data-testid={`text-project-title-${project.id}`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`text-muted-foreground leading-relaxed ${
                        isRTL ? "font-arabic text-right" : ""
                      }`}
                      data-testid={`text-project-description-${project.id}`}
                    >
                      {description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
