'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import { Howl } from 'howler';

export default function Home() {
  const [name, setName] = useState('');
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // رسم الاسم على شكل "شعار شرير" باحترافية
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.src = '/drum-bg.png'; // الصورة الأصلية للمسحراتي
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // رسم الصورة بشكل دائري مع تأثير "الظل الأحمر الشرقي"
          ctx.save();
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          ctx.restore();

          // إضافة الاسم بتنسيق "شعار شرير" (أحمر ناري مع ظل أسود عميق)
          if (name) {
            ctx.shadowColor = "rgba(255, 0, 0, 0.9)"; // ظل أحمر توهجي
            ctx.shadowBlur = 15;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
            
            ctx.font = 'bold 36px Arial'; // تكبير الخط وتوضيحه
            ctx.fillStyle = '#ef4444'; // اللون الأحمر الناري
            ctx.textAlign = 'center';
            ctx.fillText(name, canvas.width / 2, canvas.height / 1.55);
          }
        };
      }
    }
  }, [name]);

  const handleWakeUp = () => {
    if (!name.trim()) return alert('اكتب اسم الأول يا بطل!');
    
    setIsWakingUp(true);
    setShowShare(false);
    
    const drum = new Howl({ src: ['/drum.mp3'], volume: 0.3, loop: true });
    const manVoice = new Howl({ 
      src: ['/man-voice-evil.mp3'], // تأكد من وجود ملف الصوت الشرير في public
      volume: 1.0,
      onend: () => {
        drum.fade(0.3, 0, 1000);
        setTimeout(() => {
          drum.stop();
          setIsWakingUp(false);
          setShowShare(true);
        }, 1000);
      }
    });

    drum.play();
    setTimeout(() => manVoice.play(), 200); // بدء الصوت البشري فوراً
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-4 overflow-hidden" dir="rtl">
      
      {/* خلفية جمالية خفيفة */}
      <div className="absolute inset-0 bg-[url('/stars-bg.png')] opacity-10 pointer-events-none"></div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md bg-slate-900/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-red-500/30 shadow-[0_0_80px_rgba(185,28,28,0.4)] text-center"
      >
        <h1 className="text-4xl font-bold text-red-600 mb-8 drop-shadow-[0_0_15px_rgba(239,68,68,0.7)] font-arabic">
          💀 عمي عاطا.. نداء الظلام
        </h1>

        <div className="relative mb-8 flex justify-center">
          <motion.div
            animate={isWakingUp ? { scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] } : {}}
            transition={{ repeat: Infinity, duration: 0.4 }}
          >
            <canvas 
              ref={canvasRef} 
              width={350} 
              height={350} 
              className="rounded-full shadow-[0_0_50px_rgba(185,28,28,0.6)] border-4 border-red-700/50" 
            />
          </motion.div>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.substring(0, 15))}
            placeholder="مين الضحية الجاية؟"
            className="w-full p-5 rounded-2xl bg-slate-800/80 border border-red-900 text-white text-center text-2xl focus:ring-4 focus:ring-red-600 outline-none transition-all placeholder:text-slate-600"
          />

          <button
            onClick={handleWakeUp}
            disabled={isWakingUp}
            className="w-full py-5 rounded-2xl font-bold text-2xl bg-gradient-to-b from-red-600 to-red-900 text-white shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
          >
            {isWakingUp ? '😈 جاري استدعاء الروح...' : '🔥 ابدأ النداء المرعب'}
          </button>
        </div>

        <AnimatePresence>
          {showShare && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={() => {
                const text = `سمعت عمي عاطا الشرير وهو بيصحي ${name}؟ جربها من هنا: ${window.location.origin}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="w-full mt-4 py-4 rounded-2xl bg-green-700 text-white font-bold text-lg shadow-lg hover:bg-green-600 transition-colors"
            >
              📲 ابعت المقلب لـ {name}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="mt-8 text-slate-700 text-sm text-center relative z-10">
        <p>بواسطة طه 🌙 | ts643104@gmail.com</p>
        <p className="mt-2 text-red-500/70 hover:underline cursor-pointer" onClick={() => window.location.href='/privacy-policy'}>سياسة الخصوصية</p>
      </footer>
    </main>
  );
}