import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/lib/language-context";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Loader2,
  MessageCircle,
  User,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const services = [
    { value: "ai", label: t("services.ai.title") },
    { value: "analytics", label: t("services.analytics.title") },
    { value: "cloud", label: t("services.cloud.title") },
    { value: "software", label: t("services.software.title") },
    { value: "consulting", label: t("services.consulting.title") },
    { value: "integration", label: t("services.integration.title") },
  ];

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: isRTL ? "تم الإرسال بنجاح" : "Message Sent",
        description: isRTL
          ? "شكراً لتواصلك معنا. سنرد عليك قريباً."
          : "Thank you for reaching out. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    },
    onError: () => {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL
          ? "حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى."
          : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <section id="contact" className="py-28 lg:py-36 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black" />

      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8 shadow-lg ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <MessageCircle className="w-4 h-4 text-red-500" />
            <span
              className={`text-sm font-bold text-slate-300 ${
                isRTL ? "font-arabic" : ""
              }`}
            >
              {isRTL ? "تواصل معنا" : "Get In Touch"}
            </span>
          </div>
          <h2
            className={`text-2xl sm:text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-white via-slate-100 to-gray-200 bg-clip-text text-transparent ${
              isRTL ? "font-arabic" : ""
            }`}
            data-testid="text-contact-title"
          >
            {t("contact.title")}
          </h2>
          <p
            className={`text-xl text-slate-400 max-w-2xl mx-auto ${
              isRTL ? "font-arabic" : ""
            }`}
            data-testid="text-contact-subtitle"
          >
            {t("contact.subtitle")}
          </p>
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-5 gap-10 ${
            isRTL ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="lg:col-span-3 bg-gradient-to-br from-slate-800/50 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8 lg:p-12">
            <h3
              className={`text-2xl font-bold mb-8 text-white ${
                isRTL ? "font-arabic text-right" : ""
              }`}
            >
              {isRTL ? "تواصل معنا" : "Contact Us"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className={`text-sm font-semibold text-slate-300 ${
                      isRTL ? "font-arabic" : ""
                    }`}
                  >
                    {t("contact.form.name")}
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className={`h-14 text-base bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-red-500 transition-colors ${
                      isRTL ? "text-right font-arabic" : ""
                    }`}
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className={`text-sm font-semibold text-slate-300 ${
                      isRTL ? "font-arabic" : ""
                    }`}
                  >
                    {t("contact.form.email")}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className={`h-14 text-base bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-red-500 transition-colors ${
                      isRTL ? "text-right" : ""
                    }`}
                    dir="ltr"
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="phone"
                    className={`text-sm font-semibold text-slate-300 ${
                      isRTL ? "font-arabic" : ""
                    }`}
                  >
                    {t("contact.form.phone")}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={`h-14 text-base bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-red-500 transition-colors ${
                      isRTL ? "text-right" : ""
                    }`}
                    dir="ltr"
                    data-testid="input-phone"
                  />
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="service"
                    className={`text-sm font-semibold text-slate-300 ${
                      isRTL ? "font-arabic" : ""
                    }`}
                  >
                    {t("contact.form.service")}
                  </Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      setFormData({ ...formData, service: value })
                    }
                  >
                    <SelectTrigger
                      className={`h-14 text-base bg-white/5 border-white/10 text-white focus:border-red-500 transition-colors ${
                        isRTL ? "text-right font-arabic" : ""
                      }`}
                      data-testid="select-service"
                    >
                      <SelectValue
                        placeholder={t("contact.form.selectService")}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/10">
                      {services.map((service) => (
                        <SelectItem
                          key={service.value}
                          value={service.value}
                          className={`text-white hover:bg-white/10 ${
                            isRTL ? "font-arabic" : ""
                          }`}
                        >
                          {service.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="message"
                  className={`text-sm font-semibold text-slate-300 ${
                    isRTL ? "font-arabic" : ""
                  }`}
                >
                  {t("contact.form.message")}
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={6}
                  className={`text-base bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-red-500 transition-colors resize-none ${
                    isRTL ? "text-right font-arabic" : ""
                  }`}
                  data-testid="input-message"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className={`w-full h-14 text-lg font-semibold bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-2xl hover:shadow-red-500/30 transition-all duration-300 hover:scale-[1.02] ${
                  isRTL ? "font-arabic" : ""
                }`}
                disabled={mutation.isPending}
                data-testid="button-submit-contact"
              >
                {mutation.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Send className={`h-5 w-5 ${isRTL ? "ml-3" : "mr-3"}`} />
                    {t("contact.form.submit")}
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="lg:col-span-2 flex">
            <div
              className="group bg-gradient-to-br from-slate-800/50 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex-1 flex flex-col"
              data-testid="card-office-amman"
            >
              <div className="h-2 bg-gradient-to-r from-red-600 to-red-500" />
              <div className="p-8 flex-1 flex flex-col">
                <div
                  className={`flex items-center gap-4 mb-8 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="p-4 rounded-full bg-gradient-to-br from-red-500/20 to-red-500/10 border border-red-500/20">
                    <User className="h-8 w-8 text-red-500" />
                  </div>
                  <h3
                    className={`text-xl font-bold text-white ${
                      isRTL ? "font-arabic" : ""
                    }`}
                  >
                    {isRTL
                      ? "أبعاد لحلول الاعمال الذكية"
                      : "iThing Smart Business Solutions"}
                  </h3>
                </div>
                <div className="space-y-5">
                  <div
                    className={`flex items-start gap-4 ${
                      isRTL ? "flex-row-reverse text-right" : ""
                    }`}
                  >
                    <div className="p-3 rounded-xl bg-white/10">
                      <MapPin className="h-5 w-5 text-red-500" />
                    </div>
                    <span
                      className={`text-slate-300 pt-2 ${
                        isRTL ? "font-arabic" : ""
                      }`}
                    >
                      {t("contact.office.amman.address")}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-4 ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="p-3 rounded-xl bg-white/10">
                      <Phone className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex flex-col text-slate-300" dir="ltr">
                      <span>+962 777775484</span>
                      <span>+971 501970754</span>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-4 ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="p-3 rounded-xl bg-white/10">
                      <Mail className="h-5 w-5 text-red-500" />
                    </div>
                    <a
                      href="mailto:info@ithingsolutions.com"
                      className="text-slate-300 hover:text-red-400 transition-colors"
                      dir="ltr"
                    >
                      info@ithingsolutions.com
                    </a>
                  </div>
                </div>
                <div className="mt-auto pt-6 rounded-xl overflow-hidden border border-white/10 flex-1 min-h-[200px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211.54048486773985!2d35.89207797627318!3d31.97045142027104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca1911a552b43%3A0x3a046f55a29842d6!2sThermoflix!5e0!3m2!1sen!2sus!4v1768129631823!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Amman Office Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
