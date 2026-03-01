'use client';
import { motion } from 'framer-motion';

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8" dir="rtl">
      <div className="max-w-3xl mx-auto mt-10">
        <motion.h1 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-4xl font-bold text-yellow-500 mb-8 border-b border-yellow-500/20 pb-4"
        >
          حكاية عمي عاطا الحقيقية 🥁
        </motion.h1>
        
        <div className="text-xl leading-relaxed space-y-6 text-slate-300 font-arabic">
          <p>في قلب أريافنا المصرية الأصيلة، كان **عمي عاطا** هو أيقونة شهر رمضان المبارك. لم يكن مجرد مسحراتي، بل كان الفرحة التي ينتظرها أطفال القرية كل ليلة.</p>
          <p className="bg-slate-900 p-6 rounded-2xl italic border-r-8 border-yellow-500 text-2xl text-yellow-400">
            "عمي عاطا جاب نطور.. ولا بيدقدق ولا بيدور"
          </p>
          <p>بهذه الكلمات كنا نهتف ونحن نجري خلفه، ممسكين بطبلته الشهيرة التي توقظ القلوب قبل الأجساد. كانت أياماً ملؤها البهجة والترابط، حيث كان يلف القرية بأكملها ليتأكد أن الجميع قد استيقظ للسحور.</p>
          
          <div className="py-6 border-y border-white/5 my-8">
            <h2 className="text-2xl font-semibold text-red-400 mb-4">ذكرى حادثة الطوبة 🤕</h2>
            <p>وفي إحدى السنين، وبينما كان عمي عاطا يمارس مهمته المعتادة، وسط زحام الأطفال، انطلقت طوبة طائشة بالخطأ لتصيبه في رأسه. من ذلك اليوم، توقف عمي عاطا عن التجوال بطلبلته، وافتقدت القرية صوته في الأزقة.</p>
          </div>

          <p>اليوم، يعيش عمي عاطا حياة هادئة بين زراعته والمسجد. وهو الآن صاحب الصوت الأجمل في **الأذان**، حيث يرفع النداء في مسجد القرية بصوت فريد لا يستطيع أحد تقليده، ليظل صوته مرتبطاً بالعبادة والروحانيات كما كان دائماً.</p>
        </div>

        <button 
          onClick={() => window.location.href='/'} 
          className="mt-12 bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-4 rounded-full font-bold transition-transform active:scale-95"
        >
          الرجوع للمسحراتي 🌙
        </button>
      </div>
    </main>
  );
}