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

  // 1. رسم الاسم على الطبلة (Image Generation)
  useEffect(() => {
    if (name && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.src = '/drum-bg.png'; // حط صورة طبلة في فولدر public
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          ctx.font = 'bold 30px Arial';
          ctx.fillStyle = '#facc15'; // لون أصفر ذهبي
          ctx.textAlign = 'center';
          ctx.fillText(name, canvas.width / 2, canvas.height / 1.5);
        };
      }
    }
  }, [name]);

  // 2. دالة النطق المصري المحسنة
  const speak = (text: string, onEndCallback: () => void) => {
    window.speechSynthesis.cancel();
    // تصفية النص من أي كود خبيث (Security)
    const cleanText = text.replace(/[<>]/g, ''); 
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();
    // محاولة اختيار صوت عربي مصري إذا كان متاحاً في المتصفح
    const arabicVoice = voices.find(v => v.lang.includes('ar-EG') || v.lang.includes('ar-SA'));
    
    if (arabicVoice) utterance.voice = arabicVoice;
    utterance.lang = 'ar-EG';
    utterance.rate = 0.8; 
    utterance.pitch = 1.1; 
    
    utterance.onend = onEndCallback;
    window.speechSynthesis.speak(utterance);
  };

  const handleWakeUp = () => {
    // حماية ضد الـ Empty Strings والمسافات الزائدة
    const sanitizedName = name.trim();
    if (!sanitizedName || sanitizedName.length > 20) {
      return alert('اكتب اسم حقيقي وقصير يا بطل! 😅');
    }
    
    setIsWakingUp(true);
    setShowShare(false);
    
    const drum = new Howl({ 
      src: ['/drum.mp3'], 
      volume: 0.5,
      loop: true,
      html5: true // أفضل للأداء
    });
    drum.play();

    const message = isEvil 
      ? `يا ${sanitizedName}، إصحى بقى الفجر هيأذن، بلاش كسل وقوم اتسحر!` 
      : `إصحى يا ${sanitizedName}، وحّد الرزاق، سحورك يا بطل برعاية طه.`;
    
    setTimeout(() => {
      speak(message, () => {
        drum.stop();
        setIsWakingUp(false);
        setShowShare(true);
      });
    }, 1200);
  };

  return (
    <main className={`min-h-screen transition-all duration-500 flex flex-col items-center justify-center p-6 ${isEvil ? 'bg-red-950' : 'bg-[#020617]'}`}>
      
      {/* حماية من هجمات الهاكرز عبر الهيدر (Security Note) */}
      {/* في الحقيقة، التأمين الأقوى يكون في ملف next.config.js */}

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 w-full max-w-md bg-slate-900/90 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/10 shadow-2xl text-center"
      >
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 font-arabic shadow-sm"> مسحراتيي عمي عأطا 🤖</h2>

        {/* عرض صورة الطبلة وعليها الاسم */}
        <div className="relative mb-6 flex justify-center">
          <canvas 
            ref={canvasRef} 
            width={300} 
            height={300} 
            className="rounded-full shadow-2xl border-4 border-yellow-500/20"
          />
          {isWakingUp && (
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 0.2 }}
              className="absolute inset-0 rounded-full bg-yellow-500/10 pointer-events-none"
            />
          )}
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value.substring(0, 20))}
          placeholder="اكتب اسم الضحية.."
          className="w-full p-4 rounded-2xl bg-slate-800/50 border border-slate-700 text-white text-center text-xl mb-6 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
        />

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setIsEvil(!isEvil)}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${isEvil ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-300'}`}
          >
            {isEvil ? 'وضع الشرير 🔥' : 'الوضع الهادي 🌙'}
          </button>
        </div>

        <button
          onClick={handleWakeUp}
          disabled={isWakingUp}
          className={`w-full py-5 rounded-2xl font-bold text-2xl shadow-lg transform active:scale-95 transition-all ${
            isEvil ? 'bg-gradient-to-r from-red-800 to-red-600' : 'bg-gradient-to-r from-yellow-600 to-yellow-400 text-black'
          }`}
        >
          {isWakingUp ? '🥁 جاري التصحية...' : '🥁 ابدأ الطبل'}
        </button>

        {showShare && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => {
              const text = `خليت المسحراتي يصحّي ${name} مخصوص! جربها هنا: ${window.location.origin}`;
              window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
            }}
            className="w-full mt-4 py-4 rounded-2xl bg-green-600 text-white font-bold text-lg hover:bg-green-500"
          >
            📲 مشاركة المقلب
          </motion.button>
        )}
      </motion.div>

      <footer className="mt-8 text-slate-500 text-[12px] text-center">
        <p>تم التطوير بواسطة **Taha** 🌙</p>
        <p>محفوظه حقوقه الطبعه و النشر  Taha</p>
      </footer>
    </main>
  );
}