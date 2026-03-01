'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import { Howl } from 'howler';

export default function Home() {
  const [name, setName] = useState('');
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isEvil, setIsEvil] = useState(false); 
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 1. دالة نطق الاسم بالذكاء الاصطناعي (صوت راجل)
  const speakName = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA'; 
      const voices = window.speechSynthesis.getVoices();
      // محاولة اختيار صوت ذكر
      const maleVoice = voices.find(v => v.name.includes('Male') || v.name.includes('Naayf') || v.name.includes('Danny'));
      if (maleVoice) utterance.voice = maleVoice;
      utterance.pitch = 0.85; // طبقة رجالية
      utterance.rate = 0.8;   // سرعة هادئة
      window.speechSynthesis.speak(utterance);
    }
  };

  // 2. رسم الشعار (Logo) والاسم على الطبلة
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.src = '/drum-bg.png';
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          ctx.restore();
          if (name) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = isEvil ? "rgba(255, 0, 0, 0.9)" : "rgba(0, 0, 0, 0.6)";
            ctx.font = 'bold 36px Arial';
            ctx.fillStyle = isEvil ? '#ff0000' : '#facc15'; 
            ctx.textAlign = 'center';
            ctx.fillText(name, canvas.width / 2, canvas.height / 1.55);
          }
        };
      }
    }
  }, [name, isEvil]);

  // 3. دالة تشغيل المقلب والنداء
  const handleWakeUp = () => {
    if (!name.trim()) return alert('اكتب الاسم الأول يا بطل!');
    setIsWakingUp(true);
    setShowShare(false);

    // نطق الاسم أولاً
    speakName(`يا ${name}.. يا ${name}`);

    setTimeout(() => {
      const manVoice = new Howl({ 
        src: [isEvil ? '/man-voice-evil.mp3' : '/man-voice-normal.mp3'], 
        volume: 1.0,
        onplay: () => { setTimeout(() => { drum.play(); }, 1200); },
        onend: () => {
          drum.fade(0.5, 0, 1000);
          setTimeout(() => {
            drum.stop();
            setIsWakingUp(false);
            setShowShare(true);
          }, 1000);
        }
      });
      const drum = new Howl({ src: ['/drum.mp3'], volume: 0.5, loop: true });
      manVoice.play();
    }, 1500); // تأخير بسيط ليبدأ بعد النطق
  };

  return (
    <main className={`min-h-screen flex flex-col items-center p-4 transition-all duration-700 ${isEvil ? 'bg-black' : 'bg-slate-950'}`} dir="rtl">
      
      {/* إعلان علوي للأرباح */}
      <div className="w-full max-w-[728px] h-[90px] mb-6 bg-slate-900/30 flex items-center justify-center border border-white/5 overflow-hidden">
        <ins className="adsbygoogle" style={{ display: 'inline-block', width: '728px', height: '90px' }} data-ad-client="ca-pub-2972377931989464" data-ad-slot="YOUR_AD_SLOT_1"></ins>
      </div>

      {/* زر التبديل */}
      <div className="fixed top-6 left-6 z-50">
        <button onClick={() => setIsEvil(!isEvil)} className={`px-6 py-2 rounded-full font-bold border-2 transition-all ${isEvil ? 'bg-red-700 border-red-500 text-white' : 'bg-yellow-500 border-yellow-300 text-black'}`}>
          {isEvil ? '💀 وضع الرعب' : '🌙 وضع المسحراتي'}
        </button>
      </div>

      {/* الواجهة الرئيسية */}
      <motion.div className={`w-full max-w-md p-8 rounded-[3rem] border-2 text-center shadow-2xl ${isEvil ? 'bg-red-950/10 border-red-900' : 'bg-slate-900/80 border-yellow-600/30'}`}>
        <h1 className={`text-3xl font-bold mb-6 ${isEvil ? 'text-red-600' : 'text-yellow-500'}`}>
          {isEvil ? 'عمي عاطا المرعب 💀' : 'مسحراتي عمي عاطا 🥁'}
        </h1>
        <canvas ref={canvasRef} width={300} height={300} className={`mx-auto rounded-full mb-8 border-4 ${isEvil ? 'border-red-600 shadow-[0_0_30px_red]' : 'border-yellow-500'}`} />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="اكتب الاسم هنا.." className="w-full p-4 rounded-xl bg-slate-800 text-white text-center mb-4 border border-slate-700 focus:ring-2 focus:ring-yellow-500 outline-none" />
        <button onClick={handleWakeUp} disabled={isWakingUp} className={`w-full py-4 rounded-xl font-bold text-xl transition-transform active:scale-95 ${isEvil ? 'bg-red-700 text-white' : 'bg-yellow-500 text-black'}`}>
          {isWakingUp ? '🔔 جاري النداء...' : 'ابدأ المقلب'}
        </button>
      </motion.div>

      {/* قسم قصة عمي عاطا (لرفع قيمة المحتوى لأدسنس) */}
      <section className="w-full max-w-2xl mt-20 p-8 rounded-3xl bg-slate-900/40 border border-white/5 text-right mb-10">
        <h2 className="text-2xl font-bold text-yellow-500 mb-6 border-b border-yellow-500/10 pb-2">حكاية عمي عاطا: صوت لا ينسى 🥁</h2>
        <div className="text-slate-300 leading-relaxed space-y-4">
          <p>في قلب أريافنا المصرية، كان **عمي عاطا** هو المسحراتي الذي ننتظره جميعاً. كنا نجري خلفه ونحن نغني: "عمي عاطا جاب نطور.. ولا بيدقدق ولا بيدور". كانت أياماً جميلة نلف فيها القرية لنوقظ الأهالي للسحور بصوت طبلته المميزة.</p>
          <p>وفي إحدى الليالي، أصيب عمي عاطا بطوبة طائشة في رأسه، ومنذ ذلك اليوم بطل ينزل يلف في القرية. لكنه لم يترك المسجد، فهو الآن صاحب أجمل صوت أذان في مسجد القرية، ولا يستطيع أحد تقليد نبرة صوته الفريدة.</p>
        </div>
      </section>

      <footer className="mt-10 text-slate-600 text-xs pb-10">
        <p>بواسطة طه 🌙 | ts643104@gmail.com</p>
        <p className="mt-2 underline cursor-pointer" onClick={() => window.location.href='/privacy-policy'}>سياسة الخصوصية</p>
      </footer>
    </main>
  );
}