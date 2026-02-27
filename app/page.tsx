'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
// @ts-ignore
import { Howl } from 'howler';

export default function Home() {
  const [name, setName] = useState('');
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // رسم الاسم على الطبلة باحترافية
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.src = '/drum-bg.png'; 
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          if (name) {
            ctx.font = 'bold 28px Arial';
            ctx.fillStyle = '#facc15';
            ctx.textAlign = 'center';
            ctx.fillText(name, canvas.width / 2, canvas.height / 1.6);
          }
        };
      }
    }
  }, [name]);

  const handleWakeUp = () => {
    // --- نظام الأمان المعقد (Anti-Hack) ---
    // منع الرموز ومنع الكلمات المحجوزة (XSS Protection)
    const sanitizedName = name.replace(/[^a-zA-Z0-9ا-ي\s]/g, '').trim();
    const blockedWords = ['script', 'alert', 'eval', 'document', 'cookie'];
    
    if (!sanitizedName || sanitizedName.length > 15 || blockedWords.some(w => sanitizedName.toLowerCase().includes(w))) {
      return alert('الاسم غير مسموح به أمنياً! 🛡️');
    }

    setIsWakingUp(true);
    setShowShare(false);
    
    const drum = new Howl({ src: ['/drum.mp3'], volume: 0.4, loop: true });
    const manVoice = new Howl({ 
      src: ['/man-voice.mp3'], 
      volume: 1.0,
      onend: () => {
        drum.fade(0.4, 0, 1000);
        setTimeout(() => { drum.stop(); setIsWakingUp(false); setShowShare(true); }, 1000);
      }
    });

    drum.play();
    setTimeout(() => manVoice.play(), 1000);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6" dir="rtl">
      
      {/* إعلان علوي للربح */}
      <div className="mb-4 w-full max-w-md overflow-hidden">
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-2972377931989464"
             data-ad-slot="YOUR_AD_SLOT_ID"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md bg-slate-900/90 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl text-center"
      >
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">مسحراتي طه 🥁</h2>

        <div className="relative mb-6 flex justify-center">
          <canvas ref={canvasRef} width={300} height={300} className="rounded-full border-4 border-yellow-500/20" />
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اكتب اسم الشخص.."
          className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700 text-white text-center text-xl mb-6 outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <button
          onClick={handleWakeUp}
          disabled={isWakingUp}
          className="w-full py-5 rounded-2xl font-bold text-2xl bg-gradient-to-r from-yellow-600 to-yellow-400 text-black shadow-lg active:scale-95 transition-all"
        >
          {isWakingUp ? '🥁 جاري المناداة...' : '🥁 ابدأ الطبل'}
        </button>

        {showShare && (
          <button
            onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent('اسمع المسحراتي بيصحي ' + name + ' مخصوص هنا: ' + window.location.origin)}`, '_blank')}
            className="w-full mt-4 py-4 rounded-2xl bg-green-600 text-white font-bold"
          >
            📲 مشاركة على واتساب
          </button>
        )}
      </motion.div>

      <footer className="mt-8 text-slate-500 text-xs text-center">
        <p>بواسطة طه - ts643104@gmail.com</p>
        <p className="mt-2 text-yellow-500 underline cursor-pointer" onClick={() => window.location.href='/privacy-policy'}>سياسة الخصوصية</p>
      </footer>
    </main>
  );
}