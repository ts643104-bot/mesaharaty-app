'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import { Howl } from 'howler';

export default function Home() {
  const [name, setName] = useState('');
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isEvil, setIsEvil] = useState(false); // نظام التبديل بين الوضعين
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // رسم الاسم على الطبلة (لوجو)
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
            // تغيير لون الاسم بناءً على الوضع
            ctx.shadowBlur = 15;
            ctx.shadowColor = isEvil ? "rgba(255, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.5)";
            ctx.font = 'bold 34px Arial';
            ctx.fillStyle = isEvil ? '#ef4444' : '#facc15'; 
            ctx.textAlign = 'center';
            ctx.fillText(name, canvas.width / 2, canvas.height / 1.55);
          }
        };
      }
    }
  }, [name, isEvil]);

  const handleWakeUp = () => {
    if (!name.trim()) return alert('اكتب اسم الشخص الأول!');
    
    setIsWakingUp(true);
    setShowShare(false);
    
    // 1. إعداد الصوت البشري (يشتغل أولاً)
    const manVoice = new Howl({ 
      src: [isEvil ? '/man-voice-evil.mp3' : '/man-voice-normal.mp3'], 
      volume: 1.0,
      onplay: () => {
        // 2. تشغيل الطبلة بعد بدء الصوت البشري بـ 1.5 ثانية (حسب طلبك)
        setTimeout(() => {
          drum.play();
        }, 1500);
      },
      onend: () => {
        drum.fade(0.5, 0, 1000);
        setTimeout(() => {
          drum.stop();
          setIsWakingUp(false);
          setShowShare(true);
        }, 1000);
      }
    });

    // 3. إعداد صوت الطبلة
    const drum = new Howl({ src: ['/drum.mp3'], volume: 0.5, loop: true });

    manVoice.play();
  };

  return (
    <main className={`min-h-screen transition-colors duration-700 flex flex-col items-center justify-center p-4 ${isEvil ? 'bg-[#020617]' : 'bg-[#0f172a]'}`} dir="rtl">
      
      {/* زر التبديل بين الوضعين */}
      <div className="absolute top-6 left-6 z-20">
        <button 
          onClick={() => setIsEvil(!isEvil)}
          className={`px-6 py-2 rounded-full font-bold transition-all border-2 ${isEvil ? 'bg-red-600 border-red-400 text-white shadow-[0_0_15px_red]' : 'bg-yellow-500 border-yellow-300 text-black'}`}
        >
          {isEvil ? '😈 وضع الشرير' : '🌙 وضع المسحراتي'}
        </button>
      </div>

      <motion.div 
        animate={{ borderColor: isEvil ? '#dc2626' : '#eab308' }}
        className={`relative z-10 w-full max-w-md backdrop-blur-xl p-8 rounded-[2.5rem] border-2 shadow-2xl text-center ${isEvil ? 'bg-black/60 shadow-red-900/20' : 'bg-slate-900/80 shadow-black/50'}`}
      >
        <h1 className={`text-3xl font-bold mb-8 transition-colors ${isEvil ? 'text-red-600' : 'text-yellow-500'}`}>
          {isEvil ? '💀 عمي عاطا المرعب' : '🥁 مسحراتي عمي عاطا'}
        </h1>

        <div className="relative mb-8 flex justify-center">
          <motion.div animate={isWakingUp ? { scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] } : {}}>
            <canvas ref={canvasRef} width={320} height={320} className={`rounded-full border-4 transition-colors ${isEvil ? 'border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.5)]' : 'border-yellow-500 shadow-xl'}`} />
          </motion.div>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.substring(0, 15))}
          placeholder={isEvil ? "مين الضحية؟" : "مين هنصحيه؟"}
          className="w-full p-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-white text-center text-xl mb-4 outline-none focus:ring-2 focus:ring-red-500 transition-all"
        />

        <button
          onClick={handleWakeUp}
          disabled={isWakingUp}
          className={`w-full py-5 rounded-2xl font-bold text-2xl shadow-xl transition-all active:scale-95 ${isEvil ? 'bg-red-700 hover:bg-red-600 text-white' : 'bg-yellow-500 hover:bg-yellow-400 text-black'}`}
        >
          {isWakingUp ? '🥁 جاري النداء...' : '🔔 ابدأ الآن'}
        </button>

        {showShare && (
          <button
            onClick={() => {
              const text = `سمعت عمي عاطا وهو بيصحي ${name}؟ جربها من هنا: ${window.location.origin}`;
              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
            }}
            className="w-full mt-4 py-4 rounded-2xl bg-green-600 text-white font-bold"
          >
            📲 مشاركة المقلب
          </button>
        )}
      </motion.div>

      <footer className="mt-8 text-slate-500 text-xs text-center">
        <p>بواسطة طه 🌙</p>
        <p className="mt-2 underline cursor-pointer" onClick={() => window.location.href='/privacy-policy'}>سياسة الخصوصية</p>
      </footer>
    </main>
  );
}