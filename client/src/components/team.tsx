import { useLanguage } from "@/lib/language-context";
import { Card } from "@/components/ui/card";
import { SiLinkedin } from "react-icons/si";
import { Users, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { TeamMember } from "@shared/schema";
import tarekPhoto from "@assets/fdbffd8b-c30c-4bf1-a13d-52614b5d412d_1768089719045.jpg";
import muathPhoto from "@assets/image_1768089752024.webp";

const fallbackTeamMembers = [
  {
    id: 1,
    nameEn: "Tarek Al-Khawaldeh",
    nameAr: "طارق الخوالدة",
    roleEn: "General Manager",
    roleAr: "المدير العام",
    imageUrl: tarekPhoto,
    linkedinUrl: "#",
  },
  {
    id: 2,
    nameEn: "Muath Al-Zoubi",
    nameAr: "معاذ الزعبي",
    roleEn: "Front-End Developer",
    roleAr: "مطور الواجهات الأمامية",
    imageUrl: muathPhoto,
    linkedinUrl: "#",
  },
];

export function Team() {
  const { language, isRTL } = useLanguage();
  
  const { data: apiTeamMembers = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/content/team"],
  });

  const teamMembers = apiTeamMembers.length > 0 ? apiTeamMembers : fallbackTeamMembers;

  return (
    <section className="py-28 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/15 to-primary/10 border border-primary/20 mb-8 shadow-lg shadow-primary/5 ${isRTL ? "flex-row-reverse" : ""}`}>
            <Users className="w-4 h-4 text-primary" />
            <span className={`text-sm font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent ${isRTL ? "font-arabic" : ""}`}>
              {isRTL ? "فريق العمل" : "Our Team"}
            </span>
          </div>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-8 ${isRTL ? "font-arabic" : ""}`}
            data-testid="text-team-title"
          >
            {isRTL ? "قادة الابتكار" : "Meet Our Leaders"}
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed ${isRTL ? "font-arabic" : ""}`}
            data-testid="text-team-subtitle"
          >
            {isRTL 
              ? "خبراء متخصصون يقودون الطريق نحو التحول الرقمي"
              : "Expert professionals leading the way to digital transformation"}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => {
              const name = language === "ar" ? member.nameAr : member.nameEn;
              const role = language === "ar" ? member.roleAr : member.roleEn;
              const imageUrl = member.imageUrl || tarekPhoto;
              
              return (
                <Card
                  key={member.id}
                  className="group border-0 bg-background/80 backdrop-blur-sm shadow-xl overflow-hidden hover-lift"
                  data-testid={`card-team-${member.id}`}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className={`absolute bottom-0 left-0 right-0 p-6 ${isRTL ? "text-right" : ""}`}>
                      <h3 
                        className={`text-xl font-bold text-white mb-1 ${isRTL ? "font-arabic" : ""}`}
                        data-testid={`text-team-name-${member.id}`}
                      >
                        {name}
                      </h3>
                      <p 
                        className={`text-sm text-white/70 mb-4 ${isRTL ? "font-arabic" : ""}`}
                        data-testid={`text-team-role-${member.id}`}
                      >
                        {role}
                      </p>
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-primary transition-colors"
                          data-testid={`link-team-linkedin-${member.id}`}
                        >
                          <SiLinkedin className="w-4 h-4 text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
