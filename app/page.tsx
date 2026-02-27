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

  const handleWakeUp = () => {
    if (!name.trim()) return;
    setIsWakingUp(true);
    setShowShare(false);
    
    const manVoice = new Howl({ 
      src: [isEvil ? '/man-voice-evil.mp3' : '/man-voice-normal.mp3'], 
      volume: 1.0,
      onplay: () => {
        setTimeout(() => { drum.play(); }, 1500);
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

    const drum = new Howl({ src: ['/drum.mp3'], volume: 0.5, loop: true });
    manVoice.play();
  };

  return (
    <main className={`min-h-screen flex flex-col items-center justify-center p-4 transition-all ${isEvil ? 'bg-black' : 'bg-slate-950'}`} dir="rtl">
      
      {/* --- إعلان علوي (لزيادة الأرباح) --- */}
      <div className="w-full max-w-[728px] h-[90px] mb-6 bg-slate-900/50 flex items-center justify-center border border-white/5">
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-2972377931989464"
             data-ad-slot="YOUR_AD_SLOT_1"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      <div className="absolute top-4 left-4 z-20">
        <button 
          onClick={() => setIsEvil(!isEvil)}
          className={`px-4 py-2 rounded-xl font-bold border-2 transition-all ${isEvil ? 'bg-red-600 border-red-400 text-white' : 'bg-yellow-500 border-yellow-300 text-black'}`}
        >
          {isEvil ? '💀 وضع الرعب' : '🌙 وضع المسحراتي'}
        </button>
      </div>

      <motion.div className={`w-full max-w-md p-8 rounded-[3rem] border-2 text-center shadow-2xl ${isEvil ? 'bg-red-950/20 border-red-900' : 'bg-slate-900/90 border-yellow-600/30'}`}>
        <h1 className={`text-3xl font-bold mb-6 ${isEvil ? 'text-red-600' : 'text-yellow-500'}`}>
          {isEvil ? 'عمي عاطا المرعب 💀' : 'مسحراتي عمي عاطا 🥁'}
        </h1>

        <canvas ref={canvasRef} width={300} height={300} className={`mx-auto rounded-full mb-6 border-4 ${isEvil ? 'border-red-600 shadow-[0_0_20px_red]' : 'border-yellow-500'}`} />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اكتب الاسم هنا.."
          className="w-full p-4 rounded-xl bg-slate-800 text-white text-center mb-4 border border-slate-700 focus:ring-2 focus:ring-yellow-500"
        />

        <button onClick={handleWakeUp} disabled={isWakingUp} className={`w-full py-4 rounded-xl font-bold text-xl ${isEvil ? 'bg-red-700 text-white' : 'bg-yellow-500 text-black'}`}>
          {isWakingUp ? 'جاري المناداة...' : 'ابدأ المقلب'}
        </button>
      </motion.div>

      {/* --- إعلان سفلي (لزيادة الأرباح) --- */}
      <div className="w-full max-w-md mt-6">
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-2972377931989464"
             data-ad-slot="YOUR_AD_SLOT_2"
             data-ad-format="fluid"
             data-ad-layout-key="-gw-3+1f-3d+2z" />
      </div>

      <footer className="mt-8 text-slate-600 text-xs">
        <p>بواسطة طه 🌙 | ts643104@gmail.com</p>
        <p className="mt-1 underline cursor-pointer" onClick={() => window.location.href='/privacy-policy'}>سياسة الخصوصية</p>
      </footer>
    </main>
  );
}