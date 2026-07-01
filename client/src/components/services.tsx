import { useLanguage } from "@/lib/language-context";
import {
  ScrollAnimation,
  StaggerContainer,
  StaggerItem,
} from "@/components/scroll-animation";
import {
  Lightbulb,
  Layers,
  Settings,
  BarChart3,
  Cloud,
  Rocket,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";

interface Service {
  id: number;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
}

const services: Service[] = [
  {
    id: 1,
    titleEn: "Digital Transformation & Strategy",
    titleAr: "التحول الرقمي والاستراتيجية",
    descriptionEn:
      "We enable organizations to scale and innovate through advanced digital technologies. Our services focus on modernizing IT ecosystems, optimizing digital platforms, and building secure, high-performance infrastructures leveraging cloud computing, AI, data analytics, automation, and enterprise systems.",
    descriptionAr:
      "نمكّن المؤسسات من التوسع والابتكار من خلال التقنيات الرقمية المتقدمة. تركز خدماتنا على تحديث أنظمة تقنية المعلومات وتحسين المنصات الرقمية وبناء بنى تحتية آمنة وعالية الأداء.",
    icon: Lightbulb,
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
  },
  {
    id: 2,
    titleEn: "Enterprise & Smart Solutions",
    titleAr: "حلول المؤسسات والحلول الذكية",
    descriptionEn:
      "We design and deliver intelligent enterprise systems that enhance performance, connectivity, and operational control. We implement scalable platforms powered by IoT, cloud, AI, and advanced analytics to optimize business processes and support real-time decision-making.",
    descriptionAr:
      "نصمم ونقدم أنظمة مؤسسية ذكية تعزز الأداء والاتصال والتحكم التشغيلي. ننفذ منصات قابلة للتوسع مدعومة بإنترنت الأشياء والسحابة والذكاء الاصطناعي والتحليلات المتقدمة.",
    icon: Layers,
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
  {
    id: 3,
    titleEn: "Systems & Application Integration",
    titleAr: "تكامل الأنظمة والتطبيقات",
    descriptionEn:
      "We connect enterprise systems and digital platforms to create seamless, secure, and high-performance technology ecosystems. We design and implement scalable integration architectures using APIs, middleware, microservices, and cloud-native technologies.",
    descriptionAr:
      "نربط أنظمة المؤسسات والمنصات الرقمية لإنشاء أنظمة تقنية سلسة وآمنة وعالية الأداء. نصمم وننفذ هياكل تكامل قابلة للتوسع باستخدام واجهات برمجة التطبيقات والوسيط والخدمات المصغرة.",
    icon: Settings,
    gradient: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-400",
  },
  {
    id: 4,
    titleEn: "Data Analytics & AI",
    titleAr: "تحليلات البيانات والذكاء الاصطناعي",
    descriptionEn:
      "We transform data into actionable intelligence through advanced analytics and artificial intelligence solutions. We design and deploy scalable data platforms leveraging cloud data lakes, business intelligence, machine learning, and predictive analytics.",
    descriptionAr:
      "نحوّل البيانات إلى ذكاء قابل للتنفيذ من خلال حلول التحليلات المتقدمة والذكاء الاصطناعي. نصمم وننشر منصات بيانات قابلة للتوسع مع التعلم الآلي والتحليلات التنبؤية.",
    icon: BarChart3,
    gradient: "from-cyan-500/20 to-teal-500/20",
    iconColor: "text-cyan-400",
  },
  {
    id: 5,
    titleEn: "Cloud & Infrastructure Integration",
    titleAr: "تكامل السحابة والبنية التحتية",
    descriptionEn:
      "We design and integrate secure, scalable, and high-performance cloud and infrastructure environments. We implement hybrid and multi-cloud architectures leveraging leading platforms, virtualization, containerization, and edge technologies.",
    descriptionAr:
      "نصمم وندمج بيئات سحابية وبنية تحتية آمنة وقابلة للتوسع وعالية الأداء. ننفذ هياكل سحابية هجينة ومتعددة مع الاستفادة من المنصات الرائدة والحاويات وتقنيات الحافة.",
    icon: Cloud,
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    id: 6,
    titleEn: "Startup & Enterprise Enablement",
    titleAr: "تمكين الشركات الناشئة والمؤسسات",
    descriptionEn:
      "We empower startups and enterprises to build, scale, and optimize digital products and platforms with speed and confidence. We provide end-to-end enablement through cloud platforms, agile development frameworks, DevOps automation, and modern application architectures.",
    descriptionAr:
      "نمكّن الشركات الناشئة والمؤسسات من بناء وتوسيع وتحسين المنتجات والمنصات الرقمية بسرعة وثقة. نقدم تمكيناً شاملاً من خلال المنصات السحابية وأطر التطوير المرنة وأتمتة DevOps.",
    icon: Rocket,
    gradient: "from-rose-500/20 to-red-500/20",
    iconColor: "text-rose-400",
  },
];

export function Services() {
  const { language, isRTL } = useLanguage();

  return (
    <section id="services" className="py-28 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />

      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeUp">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8 shadow-lg">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span
                className={`text-sm font-bold text-slate-300 ${
                  isRTL ? "font-arabic" : ""
                }`}
              >
                {isRTL ? "ما نقدمه" : "What We Offer"}
              </span>
            </div>
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-white via-slate-100 to-gray-200 bg-clip-text text-transparent ${
                isRTL ? "font-arabic" : ""
              }`}
              data-testid="text-services-title"
            >
              {isRTL ? "خدماتنا" : "Our Services"}
            </h2>
            <p
              className={`text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed ${
                isRTL ? "font-arabic" : ""
              }`}
              data-testid="text-services-subtitle"
            >
              {isRTL
                ? "شريكك لتسريع التبني الرقمي وتعزيز التميز التشغيلي والبقاء في المقدمة"
                : "Partner with us to accelerate digital adoption, strengthen operational excellence, and stay ahead in a rapidly evolving digital landscape"}
            </p>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            const title = language === "ar" ? service.titleAr : service.titleEn;
            const description =
              language === "ar" ? service.descriptionAr : service.descriptionEn;

            return (
              <StaggerItem key={service.id} animation="zoomIn">
                <div
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${service.gradient} backdrop-blur-xl border border-white/10 shadow-2xl p-6 lg:p-8 h-full hover:scale-105 transition-all duration-300 cursor-pointer`}
                  data-testid={`card-service-${service.id}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative">
                    <div
                      className={`flex items-start justify-between mb-6 ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div className="p-4 rounded-2xl bg-white/10 border border-white/20">
                        <Icon className={`h-7 w-7 ${service.iconColor}`} />
                      </div>
                      <div className="p-2 rounded-full border border-transparent group-hover:border-white/20 transition-colors">
                        <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                    <h3
                      className={`text-xl font-bold mb-3 text-white group-hover:text-red-400 transition-colors duration-300 ${
                        isRTL ? "font-arabic text-right" : ""
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`text-sm text-slate-300 leading-relaxed ${
                        isRTL ? "font-arabic text-right" : ""
                      }`}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
