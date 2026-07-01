import { useLanguage } from "@/lib/language-context";
import { ScrollAnimation } from "@/components/scroll-animation";
import { Cpu } from "lucide-react";
import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiFigma,
  SiGooglecloud,
  SiOpenai,
  SiFlutter,
  SiAngular,
  SiExpress,
  SiGraphql,
  SiFirebase,
  SiJavascript,
  SiGit,
  SiDotnet,
  SiCloudflare,
  SiPostman,
  SiSwagger,
  SiTensorflow,
  SiAuth0,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandMysql } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";
import { type IconType } from "react-icons";
import { type LucideIcon } from "lucide-react";
import { BarChart3 } from "lucide-react";

interface Technology {
  name: string;
  icon: IconType | LucideIcon;
  color: string;
}

const technologies: Technology[] = [
  { name: "Java", icon: FaJava, color: "#ED8B00" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Angular", icon: SiAngular, color: "#DD0031" },
  { name: ".NET", icon: SiDotnet, color: "#512BD4" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Express", icon: SiExpress, color: "#ffffff" },
  { name: "Cloudflare", icon: SiCloudflare, color: "#F38020" },
  { name: "Azure", icon: VscAzure, color: "#0078D4" },
  { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", icon: TbBrandMysql, color: "#4479A1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "REST API", icon: SiPostman, color: "#FF6C37" },
  { name: "Swagger", icon: SiSwagger, color: "#85EA2D" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098" },
  { name: "OpenAI", icon: SiOpenai, color: "#00A67E" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Power BI", icon: BarChart3, color: "#F2C811" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "Auth0", icon: SiAuth0, color: "#EB5424" },
];

export function TechStack() {
  const { isRTL } = useLanguage();

  return (
    <section
      id="tech-stack"
      className="py-28 lg:py-40 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />

      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeUp">
          <div className="text-center mb-16">
            <div
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8 shadow-lg ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span
                className={`text-sm font-bold text-slate-300 ${
                  isRTL ? "font-arabic" : ""
                }`}
              >
                {isRTL ? "التقنيات" : "Technologies"}
              </span>
            </div>
            <h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-8 bg-gradient-to-r from-white via-slate-100 to-gray-200 bg-clip-text text-transparent ${
                isRTL ? "font-arabic" : ""
              }`}
              data-testid="text-tech-title"
            >
              {isRTL ? "التقنيات التي نستخدمها" : "Our Technology Stack"}
            </h2>
            <p
              className={`text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed ${
                isRTL ? "font-arabic" : ""
              }`}
              data-testid="text-tech-subtitle"
            >
              {isRTL
                ? "نستخدم أحدث التقنيات والأدوات لبناء حلول قوية وقابلة للتطوير"
                : "We leverage cutting-edge technologies and tools to build powerful, scalable solutions"}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4 md:gap-6">
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <div key={tech.name}>
                <div
                  className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer"
                  data-testid={`tech-${tech.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <Icon
                    className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: tech.color }}
                  />
                  <span className="text-xs sm:text-sm font-medium text-slate-400 group-hover:text-white transition-colors text-center">
                    {tech.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
