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

  // تحسين رسم الاسم بجودة عالية وتأثيرات احترافية
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.src = '/drum-bg.png'; // الصورة الأصلية للمسحراتي
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // رسم الصورة بشكل دائري
          ctx.save();
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          ctx.restore();

          // إضافة الاسم بتنسيق "ذهبي" متوهج
          if (name) {
            ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            
            ctx.font = 'bold 32px Arial'; // تكبير الخط وتوضيحه
            ctx.fillStyle = '#facc15'; // اللون الذهبي
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
    
    const drum = new Howl({ src: ['/drum.mp3'], volume: 0.5, loop: true });
    const manVoice = new Howl({ 
      src: ['/man-voice-normal.mp3'], // تأكد من وجود الملف في public
      volume: 1.0,
      onend: () => {
        drum.fade(0.5, 0, 1000);
        setTimeout(() => {
          drum.stop();
          setIsWakingUp(false);
          setShowShare(true);
        }, 1000);
      }
    });

    drum.play();
    setTimeout(() => manVoice.play(), 500);
  };

  return (
    <main className="min-h-screen bg-[#050a1f] text-white flex flex-col items-center justify-center p-4 overflow-hidden" dir="rtl">
      
      {/* خلفية جمالية خفيفة */}
      <div className="absolute inset-0 bg-[url('/stars-bg.png')] opacity-20 pointer-events-none"></div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md bg-slate-900/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-yellow-500/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] text-center"
      >
        <h1 className="text-4xl font-bold text-yellow-500 mb-8 drop-shadow-lg">
          🥁 مسحراتي عمي عاطا
        </h1>

        <div className="relative mb-8 flex justify-center">
          <motion.div
            animate={isWakingUp ? { scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] } : {}}
            transition={{ repeat: Infinity, duration: 0.5 }}
          >
            <canvas 
              ref={canvasRef} 
              width={350} 
              height={350} 
              className="rounded-full shadow-[0_0_30px_rgba(234,179,8,0.3)] border-4 border-yellow-500/30" 
            />
          </motion.div>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.substring(0, 15))}
            placeholder="مين اللي هنصحيه؟"
            className="w-full p-5 rounded-2xl bg-slate-800/60 border border-slate-700 text-white text-center text-2xl focus:ring-4 focus:ring-yellow-500/50 outline-none transition-all placeholder:text-slate-500"
          />

          <button
            onClick={handleWakeUp}
            disabled={isWakingUp}
            className="w-full py-5 rounded-2xl font-bold text-2xl bg-gradient-to-b from-yellow-400 to-yellow-600 text-slate-900 shadow-xl hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
          >
            {isWakingUp ? '🥁 جاري المناداة...' : '🔔 ابدأ النداء الآن'}
          </button>
        </div>

        <AnimatePresence>
          {showShare && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={() => {
                const text = `سمعت عمي عاطا وهو بيصحي ${name}؟ جربها من هنا: ${window.location.origin}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="w-full mt-4 py-4 rounded-2xl bg-green-600 text-white font-bold text-lg shadow-lg hover:bg-green-500 transition-colors"
            >
              📲 ابعت المقطع لـ {name}
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="mt-8 text-slate-500 text-sm text-center relative z-10">
        <p>بواسطة طه 🌙 | ts643104@gmail.com</p>
        <p className="mt-2 text-yellow-500/70 hover:underline cursor-pointer" onClick={() => window.location.href='/privacy-policy'}>سياسة الخصوصية</p>
      </footer>
    </main>
  );
}