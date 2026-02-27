export default function PrivacyPolicy() {
    return (
      <main className="min-h-screen bg-[#020617] text-white p-8 md:p-20 text-right" dir="rtl">
        <div className="max-w-3xl mx-auto bg-slate-900/50 p-8 rounded-3xl border border-white/10 shadow-2xl">
          <h1 className="text-3xl font-bold text-yellow-400 mb-8 border-b border-yellow-400/20 pb-4">
            سياسة الخصوصية لموقع المسحراتي
          </h1>
          
          <section className="space-y-6 text-slate-300">
            <p>
              مرحباً بك في تطبيق المسحراتي. نحن نحترم خصوصيتك ونسعى لحماية بياناتك.
            </p>
  
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">1. جمع البيانات</h2>
              <p>نحن لا نقوم بجمع أي بيانات شخصية (مثل الاسم الحقيقي أو البريد الإلكتروني) من زوار الموقع بشكل مباشر.</p>
            </div>
  
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">2. ملفات تعريف الارتباط (Cookies)</h2>
              <p>يستخدم هذا الموقع جوجل أدسنس (Google AdSense) لعرض الإعلانات. تقوم جوجل باستخدام ملفات تعريف الارتباط لعرض الإعلانات بناءً على زياراتك السابقة لهذا الموقع أو مواقع أخرى.</p>
            </div>
  
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">3. الإعلانات والربح</h2>
              <p>بصفتنا ناشرين في جوجل، نلتزم بشروط الخدمة الخاصة بـ Google AdSense لضمان تجربة إعلانية آمنة ومناسبة لجميع المستخدمين.</p>
            </div>
  
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">4. التواصل</h2>
              <p>إذا كان لديك أي استفسار، يمكنك التواصل معنا عبر البريد الإلكتروني: ts643104@gmail.com</p>
            </div>
          </section>
  
          <button 
            onClick={() => window.history.back()}
            className="mt-10 px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-xl transition-all"
          >
            رجوع للموقع
          </button>
        </div>
      </main>
    );
  }
  