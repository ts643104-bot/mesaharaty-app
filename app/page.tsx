'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import { Howl } from 'howler';

export default function Home() {
  const [name, setName] = useState('');
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [isEvil, setIsEvil] = useState(false); 
  const [showShare, setShowShare] = useState(false); // حالة إظهار زرار المشاركة
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const speakName = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA'; 
      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(v => v.name.includes('Male') || v.name.includes('Naayf'));
      if (maleVoice) utterance.voice = maleVoice;
      utterance.pitch = 0.8; utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

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
            ctx.font = 'bold 36px Arial';
            ctx.fillStyle = isEvil ? '#ff0000' : '#facc15'; 
            ctx.textAlign = 'center';
            ctx.fillText(name, canvas.width / 2, canvas.height / 1.55);
          }
        };
      }
    }
  }, [name, isEvil]);

  const handleWakeUp = () => {
    if (!name.trim()) return alert('اكتب الاسم يا بطل!');
    setIsWakingUp(true);
    setShowShare(false); // إخفاء الزرار لو كان ظاهر
    speakName(`يا ${name}.. يا ${name}`);
    
    setTimeout(() => {
      const sound = new Howl({ 
        src: [isEvil ? '/man-voice-evil.mp3' : '/man-voice-normal.mp3'], 
        onend: () => {
          setIsWakingUp(false);
          setShowShare(true); // إظهار زرار المشاركة بعد انتهاء الصوت
        } 
      });
      sound.play();
    }, 1500);
  };

  // دالة المشاركة على الواتساب
  const shareToWhatsApp = () => {
    const message = isEvil 
      ? `💀 الحق! عمي عاطا الشرير بينادي عليك يا ${name}! ادخل اسمع بنفسك: `
      : `🌙 عمي عاطا المسحراتي بينادي عليك يا ${name} عشان تتسحر! اسمع صوتك هنا: `;
    const url = `https://mesaharaty-app-taha2010.vercel.app/`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message + url)}`, '_blank');
  };

  return (
    <main className={`min-h-screen flex flex-col items-center p-4 transition-all duration-700 ${isEvil ? 'bg-black' : 'bg-slate-950'}`} dir="rtl">
      <div className="fixed top-6 left-6 z-50">
        <button onClick={() => setIsEvil(!isEvil)} className={`px-6 py-2 rounded-full font-bold border-2 ${isEvil ? 'bg-red-700 border-red-500 text-white' : 'bg-yellow-500 border-yellow-300 text-black'}`}>
          {isEvil ? '💀 وضع الرعب' : '🌙 وضع المسحراتي'}
        </button>
      </div>

      <motion.div className={`w-full max-w-md p-8 rounded-[3rem] border-2 mt-10 ${isEvil ? 'bg-red-950/10 border-red-900' : 'bg-slate-900/80 border-yellow-600/30'}`}>
        <h1 className={`text-3xl font-bold mb-6 ${isEvil ? 'text-red-600' : 'text-yellow-500'}`}>
          {isEvil ? 'عمي عاطا المرعب 💀' : 'مسحراتي عمي عاطا 🥁'}
        </h1>
        <canvas ref={canvasRef} width={300} height={300} className="mx-auto rounded-full mb-8" />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="اكتب اسم صاحبك.." className="w-full p-4 rounded-xl bg-slate-800 text-white text-center mb-4 outline-none" />
        
        <button onClick={handleWakeUp} disabled={isWakingUp} className={`w-full py-4 rounded-xl font-bold text-xl mb-4 ${isEvil ? 'bg-red-700 text-white' : 'bg-yellow-500 text-black'}`}>
          {isWakingUp ? '🔔 جاري النداء...' : 'ابدأ المقلب'}
        </button>

        {/* زرار المشاركة السحري */}
        <AnimatePresence>
          {showShare && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={shareToWhatsApp}
              className="w-full py-4 rounded-xl font-bold text-lg bg-green-600 text-white flex items-center justify-center gap-2 hover:bg-green-500 shadow-[0_0_20px_rgba(22,163,74,0.4)]"
            >
              <span>إرسال المقلب لـ {name} على واتساب</span> ✅
            </motion.button>
          )}
        </AnimatePresence>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/5 pt-6">
          <button onClick={() => window.location.href='/story'} className="text-yellow-500 underline text-sm hover:text-yellow-400">📖 إقرأ حكاية عمي عاطا الحقيقية</button>
          <button onClick={() => window.location.href='/privacy-policy'} className="text-slate-500 underline text-xs">سياسة الخصوصية</button>
        </div>
      </motion.div>

      <footer className="mt-10 text-slate-700 text-[10px]">بواسطة طه 🌙 | ts643104@gmail.com</footer>
    </main>
  );
}