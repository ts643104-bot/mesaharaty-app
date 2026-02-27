export default function PrivacyPolicy() {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-10 text-right" dir="rtl">
        <h1 className="text-3xl font-bold mb-6 text-yellow-500">سياسة الخصوصية</h1>
        <p className="mb-4 text-slate-300">موقع المسحراتي يلتزم بحماية خصوصية المستخدمين:</p>
        <ul className="list-disc pr-6 space-y-3 text-slate-400">
          <li>نحن لا نجمع أي بيانات شخصية أو سرية عن المستخدمين.</li>
          <li>يستخدم هذا الموقع جوجل أدسنس لعرض الإعلانات.</li>
          <li>تستخدم جوجل ملفات تعريف الارتباط (Cookies) لتحسين تجربة الإعلانات.</li>
        </ul>
        <button onClick={() => window.history.back()} className="mt-10 px-6 py-2 bg-yellow-600 rounded-lg font-bold">رجوع</button>
      </div>
    );
  }