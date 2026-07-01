import { useLanguage } from "@/lib/language-context";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Testimonial } from "@shared/schema";

const fallbackTestimonials = [
  {
    id: 1,
    nameEn: "Mohammed Al-Rashid",
    nameAr: "محمد الراشد",
    companyEn: "TechVentures MENA",
    companyAr: "تك فينتشرز الشرق الأوسط",
    textEn:
      "iThing transformed our data infrastructure completely. Their AI solutions increased our operational efficiency by 40%. Highly recommend their expertise.",
    textAr:
      "غيّرت iThing بنيتنا التحتية للبيانات بالكامل. زادت حلول الذكاء الاصطناعي من كفاءتنا التشغيلية بنسبة 40%. أوصي بشدة بخبرتهم.",
    rating: 5,
  },
  {
    id: 2,
    nameEn: "Dr. Fatima Hassan",
    nameAr: "د. فاطمة حسن",
    companyEn: "Healthcare Plus",
    companyAr: "هيلث كير بلس",
    textEn:
      "The custom healthcare solution they built for us streamlined our patient management system. Their team understood our needs perfectly.",
    textAr:
      "الحل الصحي المخصص الذي بنوه لنا سهّل نظام إدارة المرضى لدينا. فهم فريقهم احتياجاتنا تماماً.",
    rating: 5,
  },
  {
    id: 3,
    nameEn: "James Thompson",
    nameAr: "جيمس طومسون",
    companyEn: "Global Logistics Co.",
    companyAr: "جلوبال لوجستكس",
    textEn:
      "Their IoT solutions revolutionized our supply chain tracking. Real-time monitoring saved us millions in operational costs.",
    textAr:
      "أحدثت حلول إنترنت الأشياء ثورة في تتبع سلسلة التوريد لدينا. وفرت المراقبة في الوقت الفعلي ملايين في تكاليف التشغيل.",
    rating: 5,
  },
];

export function Testimonials() {
  const { language, isRTL } = useLanguage();

  const { data: apiTestimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/content/testimonials"],
  });

  const testimonials =
    apiTestimonials.length > 0 ? apiTestimonials : fallbackTestimonials;

  return (
    <section className="py-28 lg:py-40 relative overflow-hidden bg-card/50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/15 to-primary/10 border border-primary/20 mb-8 shadow-lg shadow-primary/5 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Quote className="w-4 h-4 text-primary" />
            <span
              className={`text-sm font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent ${
                isRTL ? "font-arabic" : ""
              }`}
            >
              {isRTL ? "آراء عملائنا" : "Testimonials"}
            </span>
          </div>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-8 ${
              isRTL ? "font-arabic" : ""
            }`}
            data-testid="text-testimonials-title"
          >
            {isRTL ? "ماذا يقول عملاؤنا" : "What Our Clients Say"}
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed ${
              isRTL ? "font-arabic" : ""
            }`}
            data-testid="text-testimonials-subtitle"
          >
            {isRTL
              ? "قصص نجاح حقيقية من شركاء نفخر بالعمل معهم"
              : "Real success stories from partners we're proud to work with"}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => {
              const name =
                language === "ar" ? testimonial.nameAr : testimonial.nameEn;
              const company =
                language === "ar"
                  ? testimonial.companyAr
                  : testimonial.companyEn;
              const text =
                language === "ar" ? testimonial.textAr : testimonial.textEn;
              const rating = testimonial.rating || 5;

              return (
                <Card
                  key={testimonial.id}
                  className="group border-0 bg-background shadow-xl overflow-hidden hover-lift hover-shine"
                  data-testid={`card-testimonial-${testimonial.id}`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <p
                      className={`text-muted-foreground leading-relaxed mb-8 ${
                        isRTL ? "font-arabic text-right" : ""
                      }`}
                      data-testid={`text-testimonial-quote-${testimonial.id}`}
                    >
                      "{text}"
                    </p>
                    <div
                      className={`flex items-center gap-4 ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <span
                          className={`text-lg font-bold text-primary ${
                            isRTL ? "font-arabic" : ""
                          }`}
                        >
                          {name.charAt(0)}
                        </span>
                      </div>
                      <div className={isRTL ? "text-right" : ""}>
                        <h4
                          className={`font-bold ${isRTL ? "font-arabic" : ""}`}
                          data-testid={`text-testimonial-name-${testimonial.id}`}
                        >
                          {name}
                        </h4>
                        <p
                          className={`text-sm text-muted-foreground ${
                            isRTL ? "font-arabic" : ""
                          }`}
                          data-testid={`text-testimonial-company-${testimonial.id}`}
                        >
                          {company}
                        </p>
                      </div>
                    </div>
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
