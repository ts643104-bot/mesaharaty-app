'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';

export default function Home() {
  const [name, setName] = useState('');
  const [isWakingUp, setIsWakingUp] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isEvil, setIsEvil] = useState(false);

  // دالة النطق الذكي بالذكاء الاصطناعي
  const speak = (text: string, onEndCallback: () => void) => {
    // إلغاء أي صوت شغال عشان ميسجلوش فوق بعض
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-EG'; // اللهجة المصرية
    utterance.rate = 0.85;    // سرعة هادية زي المسحراتي
    utterance.pitch = 0.9;    // صوت راجل تخين شوية
    
    utterance.onend = onEndCallback;
    window.speechSynthesis.speak(utterance);
  };

  const handleWakeUp = () => {
    if (!name) return alert('يا بطل اكتب اسم اللي هنصحيه الأول! 😂');
    
    setIsWakingUp(true);
    setShowShare(false);
    
    // 1. تشغيل الطبلة وتكرارها (Loop)
    const drum = new Howl({ 
      src: ['/drum.mp3'], 
      volume: 0.5,
      loop: true 
    });
    drum.play();

    // 2. تجهيز النص بناءً على الوضع
    const message = isEvil 
      ? `إصحى يا ${name}، الفجر هيأذن يا مهزأ، قوم اتسحر بدل ما أجيلك بالطبّالة!` 
      : `إصحى يا ${name}، وحّد الدايم، سحورك يا بطل. رمضان كريم عليك.`;
    
    // 3. النطق وإيقاف الطبلة عند النهاية
    setTimeout(() => {
        speak(message, () => {
            drum.stop();
            setIsWakingUp(false);
            setShowShare(true);
        });
    }, 1000); // يبدأ يتكلم بعد ثانية من التطبيل
  };

  const shareToWhatsApp = () => {
    const text = `خليت المسحراتي يصحّي ${name} مخصوص! 🥁🌙 جربها لصحابك هنا: ${window.location.origin}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <main className={`min-h-screen transition-colors duration-700 flex flex-col items-center justify-center p-6 relative overflow-hidden ${isEvil ? 'bg-red-950' : 'bg-[#020617]'}`}>
      
      {/* خلفية النجوم */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 w-full max-w-md bg-slate-900/90 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-slate-700 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-center"
      >
        <div className="text-6xl mb-4 animate-bounce">🌙</div>
        <h2 className="text-3xl font-bold text-yellow-400 mb-2 font-arabic">مسحراتي "الفكرة بالثانية"</h2>
        <p className="text-slate-400 mb-8">صحي صاحبك بصوت المسحراتي الحقيقي</p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مين الضحية؟"
          className="w-full p-5 rounded-2xl bg-slate-800 border-2 border-slate-700 text-white text-center text-2xl mb-6 focus:border-yellow-500 transition-all outline-none"
        />

        {/* سويتش المسحراتي الشرير */}
        <div 
          className="flex items-center justify-center gap-3 mb-8 cursor-pointer group"
          onClick={() => setIsEvil(!isEvil)}
        >
          <div className={`w-14 h-7 rounded-full p-1 transition-colors ${isEvil ? 'bg-red-600' : 'bg-slate-700'}`}>
            <motion.div 
              animate={{ x: isEvil ? 28 : 0 }}
              className="w-5 h-5 bg-white rounded-full shadow-md"
            />
          </div>
          <span className={`font-bold transition-colors ${isEvil ? 'text-red-400' : 'text-slate-500'}`}>
            الوضع الشرير 😈
          </span>
        </div>

        <AnimatePresence mode="wait">
          {!showShare ? (
            <motion.button
              key="action-btn"
              whileTap={{ scale: 0.95 }}
              animate={isWakingUp ? { x: [-3, 3, -3, 3, 0] } : {}}
              transition={{ repeat: isWakingUp ? Infinity : 0, duration: 0.1 }}
              onClick={handleWakeUp}
              disabled={isWakingUp}
              className={`w-full py-5 rounded-2xl font-bold text-2xl shadow-xl transition-all ${
                isEvil ? 'bg-red-700 hover:bg-red-600' : 'bg-yellow-500 hover:bg-yellow-400 text-black'
              }`}
            >
              {isWakingUp ? '🥁 طَبَّل يَا مِسَحَّرَاتِي...' : '🥁 طَبَّل وَصَحِّيـه'}
            </motion.button>
          ) : (
            <motion.button
              key="share-btn"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={shareToWhatsApp}
              className="w-full py-5 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-bold text-xl flex items-center justify-center gap-3"
            >
              📲 ابعتها لـ {name} على واتساب
            </motion.button>
          )}
        </AnimatePresence>

        {/* مكان إعلان صغير (Banner) */}
        <div className="mt-8 p-2 border border-dashed border-slate-700 rounded-lg text-[10px] text-slate-600">
            ADVERTISEMENT - SPACE
        </div>
      </motion.div>

      <footer className="mt-8 text-slate-500 text-sm z-10 flex flex-col items-center">
        <p>صنع بكل ❤️ بواسطة طه</p>
        <p className="text-[10px] mt-1">تطوير Taha - جميع الحقوق محفوظة 2026</p>
      </footer>
    </main>
  );
}