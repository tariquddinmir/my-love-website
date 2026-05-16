"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Unlock, Sparkles, ChevronDown, Clock } from 'lucide-react';

export default function Home() {
  // --- STATE ---
  const [currentReason, setCurrentReason] = useState("Click the heart to see why I love you...");
  const [passcode, setPasscode] = useState("");
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [vaultError, setVaultError] = useState(false);
  
  const [isForgiven, setIsForgiven] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  // --- LIVE TIMER LOGIC ---
  useEffect(() => {
    // CHANGE THIS TO YOUR ACTUAL ANNIVERSARY DATE (YYYY-MM-DD)
    const startDate = new Date("2022-04-18T00:00:00"); 

    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / 1000 / 60) % 60);
      const secs = Math.floor((diff / 1000) % 60);
      
      setTimeTogether({ days, hours, mins, secs });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // --- DATA ---
  const reasons = [
    "Because your smile lights up my darkest days.",
    "For the way you understand me without me saying a word.",
    "Because of your endless kindness and warm heart.",
    "For the way you make ordinary moments feel like magic.",
    "Because you are my greatest adventure and my safe harbor."
  ];

  const timelineEvents = [
    {
      date: "The Beginning",
      title: "When We First Met",
      description: "The day my life changed forever. I still remember exactly what you were wearing.",
      image: "/images/timeline-1.jpeg" 
    },
    {
      date: "Our First Movie Date",
      title: "Popcorn & Stolen Glances",
      description: "Sitting in that theater with you, Bobo, I realized I didn't care about the movie at all. My favorite view was right next to me.",
      image: "/images/timeline-2.jpg"
    },
    {
      date: "Today & Always",
      title: "Building Our Future",
      description: "Every day with you is a gift, Nirmali, and I can't wait for all the tomorrows.",
      image: "/images/timeline-3.jpg"
    }
  ];

  // --- HANDLERS ---
  const generateReason = () => {
    const randomIndex = Math.floor(Math.random() * reasons.length);
    setCurrentReason(reasons[randomIndex]);
  };

  const handleVaultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toLowerCase() === "143") {
      setIsVaultUnlocked(true);
      setVaultError(false);
    } else {
      setVaultError(true);
      setPasscode("");
    }
  };

  const moveNoButton = () => {
    // Made the jump radius a bit larger so it's harder to catch
    const x = Math.random() * 300 - 150; 
    const y = Math.random() * 200 - 100;
    setNoPos({ x, y });
  };

  // --- SECRET NOTIFICATION HANDLER ---
  const handleYesClick = async () => {
    // 1. Show her the happy ending immediately
    setIsForgiven(true);

    // 2. Silently send you an email in the background
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "80d23151-5032-4d47-8f71-487c31c00ce3", // Replace this with the key from your email!
          subject: "🚨 BOBO SAID YES! 🚨",
          from_name: "Vault Bot",
          message: "Bro, Nirmali just unlocked the vault and clicked YES! Time to text her! ❤️"
        }),
      });
    } catch (error) {
      console.error("Notification failed, but she still saw the message.", error);
    }
  };
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-rose-200">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-stone-900 text-stone-100">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.jpeg" 
            alt="Us" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-serif mb-4 tracking-wide">For You, Bobo.</h1>
          <p className="text-lg md:text-xl font-light tracking-widest uppercase mb-8">A digital keepsake of us</p>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="mx-auto mt-12 w-8 h-8 text-rose-300 opacity-80" />
          </motion.div>
        </motion.div>
      </section>

      {/* --- NEW: TIME TOGETHER COUNTER --- */}
      <section className="py-16 bg-rose-50 px-4 border-b border-rose-100">
        <div className="max-w-3xl mx-auto text-center">
          <Clock className="w-8 h-8 text-rose-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-serif text-stone-800 mb-8">Every Second With You Counts</h2>
          
          <div className="flex justify-center gap-4 md:gap-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-light text-rose-500">{timeTogether.days}</span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-stone-500 mt-2">Days</span>
            </div>
            <span className="text-4xl md:text-6xl font-light text-rose-300">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-light text-rose-500">{timeTogether.hours.toString().padStart(2, '0')}</span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-stone-500 mt-2">Hours</span>
            </div>
            <span className="text-4xl md:text-6xl font-light text-rose-300">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl md:text-6xl font-light text-rose-500">{timeTogether.mins.toString().padStart(2, '0')}</span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-stone-500 mt-2">Mins</span>
            </div>
            <span className="text-4xl md:text-6xl font-light text-rose-300 hidden md:block">:</span>
            <div className="flex flex-col items-center hidden md:flex">
              <span className="text-4xl md:text-6xl font-light text-rose-500">{timeTogether.secs.toString().padStart(2, '0')}</span>
              <span className="text-xs md:text-sm uppercase tracking-widest text-stone-500 mt-2">Secs</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- TIMELINE SECTION --- */}
      <section className="py-24 px-4 md:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-2">Our Story</h2>
          <div className="w-16 h-1 bg-rose-400 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-16">
          {timelineEvents.map((event, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              key={index}
              className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
            >
              <div className="w-full md:w-1/2">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-72 object-cover object-top rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                <span className="text-rose-500 font-medium tracking-wider text-sm uppercase">{event.date}</span>
                <h3 className="text-2xl font-serif">{event.title}</h3>
                <p className="text-stone-600 leading-relaxed">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- POETRY CORNER --- */}
      <section className="py-24 bg-rose-50 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <Sparkles className="w-8 h-8 text-rose-400 mx-auto" />
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800">The Unsaid Alfaaz</h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-rose-100 italic"
          >
            <p className="text-xl md:text-2xl text-stone-700 leading-loose font-serif">
              "Tumhari hansi mein meri duniya basti hai,<br/>
              Tumhare bina har khushi adhoori lagti hai.<br/>
              Lafzon mein kaise bayaan karun apni mohabbat,<br/>
              Meri har saans tumhara hi naam japti hai."
            </p>
            <p className="mt-6 text-stone-500 not-italic font-light text-sm tracking-widest uppercase">— Yours Dodo</p>
          </motion.div>
        </div>
      </section>

      {/* --- INTERACTIVE REASONS --- */}
      <section className="py-24 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-12">100 Reasons Why</h2>
        
        <div className="max-w-xl mx-auto flex flex-col items-center gap-8">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={generateReason}
            className="bg-rose-500 text-white p-6 rounded-full shadow-lg hover:bg-rose-600 transition-colors"
          >
            <Heart className="w-10 h-10 fill-current" />
          </motion.button>
          
          <AnimatePresence mode="wait">
            <motion.p 
              key={currentReason}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl md:text-2xl text-stone-700 font-medium h-20 flex items-center justify-center px-4"
            >
              {currentReason}
            </motion.p>
          </AnimatePresence>
        </div>
      </section>

      {/* --- HIDDEN VAULT --- */}
      <section className="py-24 bg-stone-900 text-stone-100 px-4 overflow-hidden">
        <div className="max-w-2xl mx-auto text-center">
          {!isVaultUnlocked ? (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Lock className="w-12 h-12 mx-auto text-stone-400" />
              <h2 className="text-2xl font-serif">The Vault</h2>
              <p className="text-stone-400">Enter our special code to unlock a secret message.</p>
              
              <form onSubmit={handleVaultSubmit} className="flex flex-col items-center gap-4 mt-8">
                <input 
                  type="password" 
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter Passcode"
                  className="px-6 py-3 rounded-full bg-stone-800 border border-stone-700 text-center focus:outline-none focus:border-rose-400 transition-colors"
                />
                <button type="submit" className="px-8 py-3 rounded-full bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors">
                  Unlock
                </button>
                {vaultError && <p className="text-rose-400 text-sm mt-2">Incorrect passcode. Hint: It means 'I love you'.</p>}
              </form>
            </motion.div>
          ) : !isForgiven ? (
            // --- THE APOLOGY & RUNAWAY BUTTON ---
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 bg-stone-800 p-8 md:p-12 rounded-3xl"
            >
              <h2 className="text-3xl font-serif text-rose-300">I'm Sorry, Bobo.</h2>
              <p className="text-lg leading-relaxed text-stone-300">
                I know I hurt you and made mistakes, and I am so deeply sorry. You mean the absolute world to me. I don't want to lose what we have.
                <br/><br/>
                Can we please be together again?
              </p>
              
              {/* BUTTONS FIX: Removed absolute positioning so they sit side-by-side using flex gap */}
              <div className="relative h-40 mt-8 flex justify-center items-center gap-6">
                
                {/* YES BUTTON */}
                <button 
                  onClick={handleYesClick}
                  className="px-8 py-3 rounded-full bg-rose-500 text-white font-bold text-lg hover:bg-rose-600 transition-colors z-10"
                >
                  Yes
                </button>

                {/* NO BUTTON (RUNAWAY) */}
                <motion.button 
                  animate={{ x: noPos.x, y: noPos.y }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  onHoverStart={moveNoButton}
                  onClick={moveNoButton}
                  onTouchStart={moveNoButton} 
                  className="px-8 py-3 rounded-full bg-stone-600 text-white font-bold text-lg z-20 cursor-not-allowed"
                >
                  No
                </motion.button>

              </div>
            </motion.div>
          ) : (
            // --- THE HAPPY ENDING ---
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 bg-stone-800 p-8 md:p-12 rounded-3xl"
            >
              <Unlock className="w-12 h-12 mx-auto text-rose-400" />
              <h2 className="text-3xl font-serif text-rose-300">Thank You, Bobo ❤️</h2>
              <p className="text-lg leading-relaxed text-stone-300">
                You have no idea how happy this makes me. I promise to always be your biggest supporter, to hold your hand through the tough times, and to make sure you always know exactly how deeply loved you are. I won't let you down.
              </p>
              <img 
                src="/images/secret.jpeg" 
                alt="Us smiling" 
                className="w-full h-auto rounded-xl mt-6 shadow-lg"
              />
            </motion.div>
          )}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-stone-500 text-sm">
        <p>Built with ❤️ specifically for Nirmali.</p>
      </footer>
    </div>
  );
}