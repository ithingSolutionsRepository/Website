import { useLanguage } from "@/lib/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
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
            {isRTL ? "شروط الخدمة" : "Terms of Service"}
          </h1>

          <div className={`prose prose-lg dark:prose-invert max-w-none ${isRTL ? "font-arabic text-right" : ""}`}>
            <p className="text-muted-foreground mb-6">
              {isRTL ? "آخر تحديث: يناير 2026" : "Last updated: January 2026"}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "قبول الشروط" : "Acceptance of Terms"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isRTL 
                  ? "باستخدامك لموقع iThing لتطوير حلول الأعمال الذكية وخدماتنا، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام خدماتنا."
                  : "By using the iThing Smart Business Solutions website and our services, you agree to be bound by these Terms of Service. If you do not agree to any of these terms, please do not use our services."}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "وصف الخدمات" : "Description of Services"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isRTL 
                  ? "تقدم iThing خدمات تقنية متنوعة تشمل تطوير البرمجيات، حلول الذكاء الاصطناعي، تحليل البيانات، الخدمات السحابية، والاستشارات التقنية. نحتفظ بالحق في تعديل أو إيقاف أي خدمة في أي وقت."
                  : "iThing provides various technology services including software development, AI solutions, data analytics, cloud services, and technical consulting. We reserve the right to modify or discontinue any service at any time."}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "التزامات المستخدم" : "User Obligations"}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {isRTL ? "عند استخدام خدماتنا، أنت توافق على:" : "When using our services, you agree to:"}
              </p>
              <ul className={`list-disc ${isRTL ? "pr-6" : "pl-6"} text-muted-foreground space-y-2`}>
                <li>{isRTL ? "تقديم معلومات دقيقة وحديثة" : "Provide accurate and up-to-date information"}</li>
                <li>{isRTL ? "عدم استخدام الخدمات لأغراض غير قانونية" : "Not use the services for illegal purposes"}</li>
                <li>{isRTL ? "الحفاظ على سرية معلومات حسابك" : "Maintain the confidentiality of your account information"}</li>
                <li>{isRTL ? "احترام حقوق الملكية الفكرية" : "Respect intellectual property rights"}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "الملكية الفكرية" : "Intellectual Property"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isRTL 
                  ? "جميع المحتويات والعلامات التجارية والشعارات والبرمجيات الموجودة على موقعنا هي ملك لـ iThing أو مرخصة لنا. لا يجوز نسخ أو توزيع أو تعديل أي من هذه المواد دون إذن كتابي مسبق."
                  : "All content, trademarks, logos, and software on our website are owned by or licensed to iThing. No materials may be copied, distributed, or modified without prior written permission."}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "حدود المسؤولية" : "Limitation of Liability"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isRTL 
                  ? "لن تكون iThing مسؤولة عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية ناتجة عن استخدام أو عدم القدرة على استخدام خدماتنا، إلى أقصى حد يسمح به القانون."
                  : "iThing shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services, to the maximum extent permitted by law."}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "السرية" : "Confidentiality"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isRTL 
                  ? "نلتزم بالحفاظ على سرية جميع المعلومات التي تشاركها معنا في إطار مشاريعك. سيتم التعامل مع جميع بيانات العمل والمعلومات الحساسة بأقصى درجات السرية."
                  : "We are committed to maintaining the confidentiality of all information you share with us as part of your projects. All business data and sensitive information will be handled with the utmost confidentiality."}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "القانون الحاكم" : "Governing Law"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isRTL 
                  ? "تخضع هذه الشروط وتفسر وفقاً لقوانين المملكة الأردنية الهاشمية. أي نزاعات تنشأ عن هذه الشروط ستخضع للاختصاص القضائي الحصري لمحاكم عمان، الأردن."
                  : "These terms are governed by and construed in accordance with the laws of the Hashemite Kingdom of Jordan. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Amman, Jordan."}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "تعديل الشروط" : "Modification of Terms"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isRTL 
                  ? "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم نشر أي تغييرات على هذه الصفحة مع تحديث تاريخ آخر تعديل."
                  : "We reserve the right to modify these terms at any time. Any changes will be posted on this page with an updated last modified date."}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                {isRTL ? "اتصل بنا" : "Contact Us"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isRTL 
                  ? "إذا كانت لديك أي أسئلة حول شروط الخدمة هذه، يرجى التواصل معنا عبر البريد الإلكتروني: info@ithingsolutions.com"
                  : "If you have any questions about these Terms of Service, please contact us at: info@ithingsolutions.com"}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
