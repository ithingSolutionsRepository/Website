import { useLanguage } from "@/lib/language-context";
import { useState, useEffect, useCallback } from "react";

interface Client {
  id: number;
  nameEn: string;
  nameAr: string;
  logoUrl: string;
}

const clients: Client[] = [
  {
    id: 1,
    nameEn: "AIRVINE",
    nameAr: "AIRVINE",
    logoUrl: "/attached_assets/Airvine-Logo_1767774778537.png",
  },
  {
    id: 2,
    nameEn: "Dictum Health",
    nameAr: "Dictum Health",
    logoUrl: "/attached_assets/DICTUM-HEALTH-1_1767774778538.jpg",
  },
  {
    id: 3,
    nameEn: "Flow-MED",
    nameAr: "Flow-MED",
    logoUrl: "/attached_assets/Flow-MED_1767774778540.png",
  },
  {
    id: 4,
    nameEn: "HQ Inc",
    nameAr: "HQ Inc",
    logoUrl: "/attached_assets/HQInc_1767774778539.jpg",
  },
  {
    id: 5,
    nameEn: "Swiss Discovery",
    nameAr: "Swiss Discovery",
    logoUrl: "/attached_assets/Swiss-Discovery_1767774778538.jpg",
  },
  {
    id: 6,
    nameEn: "Thermoflix",
    nameAr: "Thermoflix",
    logoUrl: "/attached_assets/Thermoflix_1767774778540.jpg",
  },
];

export function Clients() {
  const { language, isRTL } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % clients.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const getSlideStyle = (index: number) => {
    const total = clients.length;
    let diff = index - activeIndex;
    
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const translateX = diff * 180;
    const translateZ = Math.abs(diff) === 0 ? 100 : Math.abs(diff) === 1 ? 0 : -100;
    const scale = Math.abs(diff) === 0 ? 1.2 : Math.abs(diff) === 1 ? 0.9 : 0.7;
    const opacity = Math.abs(diff) <= 2 ? 1 : 0.3;
    const zIndex = 10 - Math.abs(diff);

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-card/50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-2xl animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/4 rounded-full blur-2xl animate-[pulse_6s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/15 to-primary/10 border border-primary/20 mb-8 shadow-lg shadow-primary/5">
            <span
              className={`text-sm font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent ${isRTL ? "font-arabic" : ""}`}
            >
              {isRTL ? "شركاء النجاح" : "Success Partners"}
            </span>
          </div>
          <h2
            className={`text-4xl sm:text-5xl lg:text-6xl font-black mb-8 ${isRTL ? "font-arabic" : ""}`}
            data-testid="text-clients-title"
          >
            {isRTL ? "عملاؤنا" : "Our Clients"}
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed ${isRTL ? "font-arabic" : ""}`}
            data-testid="text-clients-subtitle"
          >
            {isRTL
              ? "نفخر بالعمل مع شركات رائدة في المنطقة"
              : "Proud to work with leading companies across the region"}
          </p>
        </div>

        <div 
          className="relative h-[280px] flex items-center justify-center"
          style={{ perspective: "1000px" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {clients.map((client, index) => {
              const name = language === "ar" ? client.nameAr : client.nameEn;
              const style = getSlideStyle(index);
              return (
                <div
                  key={client.id}
                  className="absolute flex flex-col items-center justify-center p-6 rounded-2xl bg-background border border-border hover:border-primary/30 shadow-xl transition-all duration-500 ease-out cursor-pointer w-[160px]"
                  style={style}
                  onClick={() => setActiveIndex(index)}
                  data-testid={`client-${client.id}`}
                >
                  <div className="h-20 w-full flex items-center justify-center mb-3">
                    <img
                      src={client.logoUrl}
                      alt={name}
                      className="max-h-20 max-w-full object-contain"
                    />
                  </div>
                  <span
                    className={`text-xs font-medium text-center text-muted-foreground ${isRTL ? "font-arabic" : ""}`}
                  >
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {clients.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? "bg-primary w-6" 
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              data-testid={`carousel-dot-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
