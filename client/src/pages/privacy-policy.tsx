import { useLanguage } from "@/lib/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  const { isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className={`mb-8 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <ArrowIcon className="w-4 h-4" />
            <span className={isRTL ? "font-arabic" : ""}>{isRTL ? "رجوع" : "Back"}</span>
          </Button>

          <h1 className={`text-4xl sm:text-5xl font-bold mb-8 ${isRTL ? "font-arabic text-right" : ""}`}>
            {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
          </h1>

          <div className={`prose prose-lg dark:prose-invert max-w-none ${isRTL ? "font-arabic text-right" : ""}`}>
            <p className="text-muted-foreground mb-6">
              {isRTL ? "آخر تحديث: يناير 2026" : "Last updated: January 2026"}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "مقدمة" : "Introduction"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isRTL 
                  ? "نحن في iThing لتطوير حلول الأعمال الذكية نلتزم بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام خدماتنا."
                  : "At iThing Smart Business Solutions, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our services."}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "المعلومات التي نجمعها" : "Information We Collect"}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {isRTL ? "قد نجمع الأنواع التالية من المعلومات:" : "We may collect the following types of information:"}
              </p>
              <ul className={`list-disc ${isRTL ? "pr-6" : "pl-6"} text-muted-foreground space-y-2`}>
                <li>{isRTL ? "معلومات الاتصال (الاسم، البريد الإلكتروني، رقم الهاتف)" : "Contact information (name, email, phone number)"}</li>
                <li>{isRTL ? "معلومات الشركة والمنصب الوظيفي" : "Company information and job title"}</li>
                <li>{isRTL ? "بيانات الاستخدام وسجلات التصفح" : "Usage data and browsing logs"}</li>
                <li>{isRTL ? "المعلومات التقنية (عنوان IP، نوع المتصفح)" : "Technical information (IP address, browser type)"}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "كيف نستخدم معلوماتك" : "How We Use Your Information"}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {isRTL ? "نستخدم المعلومات التي نجمعها من أجل:" : "We use the information we collect to:"}
              </p>
              <ul className={`list-disc ${isRTL ? "pr-6" : "pl-6"} text-muted-foreground space-y-2`}>
                <li>{isRTL ? "تقديم خدماتنا وتحسينها" : "Provide and improve our services"}</li>
                <li>{isRTL ? "التواصل معك بشأن استفساراتك" : "Communicate with you about your inquiries"}</li>
                <li>{isRTL ? "إرسال تحديثات ومعلومات تسويقية (بموافقتك)" : "Send updates and marketing information (with your consent)"}</li>
                <li>{isRTL ? "الامتثال للمتطلبات القانونية" : "Comply with legal requirements"}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "حماية البيانات" : "Data Protection"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isRTL 
                  ? "نتخذ إجراءات أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به أو التغيير أو الإفصاح أو التدمير. نستخدم التشفير والخوادم الآمنة لحماية بياناتك."
                  : "We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. We use encryption and secure servers to safeguard your data."}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "حقوقك" : "Your Rights"}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {isRTL ? "لديك الحق في:" : "You have the right to:"}
              </p>
              <ul className={`list-disc ${isRTL ? "pr-6" : "pl-6"} text-muted-foreground space-y-2`}>
                <li>{isRTL ? "الوصول إلى بياناتك الشخصية" : "Access your personal data"}</li>
                <li>{isRTL ? "تصحيح البيانات غير الدقيقة" : "Correct inaccurate data"}</li>
                <li>{isRTL ? "طلب حذف بياناتك" : "Request deletion of your data"}</li>
                <li>{isRTL ? "الاعتراض على معالجة بياناتك" : "Object to processing of your data"}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "اتصل بنا" : "Contact Us"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isRTL 
                  ? "إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر البريد الإلكتروني: info@ithingsolutions.com"
                  : "If you have any questions about this Privacy Policy, please contact us at: info@ithingsolutions.com"}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
