import React, { useEffect, useState, useCallback, useRef } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, TrendingUp, ShieldCheck } from "lucide-react";
import "./Home.css";
import myImage from "../assets/ChatGPT Image May 6, 2026, 12_21_55 AM.png";

/* ══════════════════════════════════════════
   LOADER COMPONENT
   — your exact HTML structure (.line, h1, h2,
     #line1-part1 h5/h6) inside React refs
   — no GSAP dependency (pure CSS + JS timers)
   — onDone() called when loader finishes
══════════════════════════════════════════ */
function Loader({ onDone }) {
  const loaderRef   = useRef(null);
  const h5Ref       = useRef(null);
  const fillRef     = useRef(null);
  const labelRef    = useRef(null);
  const h2Ref       = useRef(null);
  const line1Ref    = useRef(null);
  const lineH1Refs  = useRef([]);          // [h1-"Your", h1-"Web Experiences", h1-"is loading right"]
  const timers      = useRef([]);

  const STATUS = ["Initializing", "Loading Assets", "Building UI", "Connecting Farmers", "Almost Ready"];

  /* safe setTimeout — all cleared on unmount */
  const after = (fn, ms) => { const id = setTimeout(fn, ms); timers.current.push(id); };

  useEffect(() => {
    /* ── STEP 1: h1 lines slide up (staggered 250ms, starts 500ms in) ── */
    lineH1Refs.current.forEach((el, i) => {
      if (!el) return;
      after(() => {
        el.style.transition = "transform 0.65s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease";
        el.style.transform  = "translateY(0)";
        el.style.opacity    = "1";
      }, 500 + i * 250);
    });

    /* ── STEP 2: #line1-part1 fades in + counter starts (at 800ms) ── */
    after(() => {
      if (line1Ref.current) {
        line1Ref.current.style.transition = "opacity 0.4s ease";
        line1Ref.current.style.opacity    = "1";
      }
      let grow = 0;
      const iv = setInterval(() => {
        grow++;
        if (h5Ref.current)   h5Ref.current.textContent    = grow < 10 ? "0" + grow : String(grow);
        if (fillRef.current)  fillRef.current.style.width  = grow + "%";
        if (labelRef.current) labelRef.current.textContent = STATUS[Math.min(Math.floor(grow / 22), 4)];
        if (grow >= 100) {
          clearInterval(iv);
          if (labelRef.current) labelRef.current.textContent = "Ready!";
        }
      }, 33);                                     // 33ms × 100 ≈ 3.3s
      timers.current.push(iv);
    }, 800);

    /* ── STEP 3: "now" h2 — trigger CSS @keyframes anni (at 1300ms) ── */
    after(() => {
      if (h2Ref.current) h2Ref.current.style.animationPlayState = "running";
    }, 1300);

    /* ── STEP 4: loader fades + slides out (at 5300ms) ── */
    after(() => {
      if (loaderRef.current) {
        loaderRef.current.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        loaderRef.current.style.opacity    = "0";
        loaderRef.current.style.transform  = "translateY(-24px)";
      }
    }, 5300);

    /* ── STEP 5: call onDone → reveal homepage (at 5850ms) ── */
    after(onDone, 5850);

    return () => timers.current.forEach(id => typeof id === "number" ? clearTimeout(id) : clearInterval(id));
  }, []);

  return (
    <div id="fd-loader" ref={loaderRef}>

      {/* grain texture */}
      <div className="fd-grain" />

      {/* subtle grid lines */}
      <div className="fd-gline fd-gv" style={{ left: "10vw" }} />
      <div className="fd-gline fd-gv" style={{ right: "10vw" }} />
      <div className="fd-gline fd-gh" style={{ top: "10vh" }} />
      <div className="fd-gline fd-gh" style={{ bottom: "10vh" }} />

      {/* top bar — branding + pulsing status */}
      <div className="fd-topbar">
        <div className="fd-brand">
          <span className="fd-brand-name">FarmDirect</span>
          <span className="fd-brand-sub">Farmer's Digital Marketplace</span>
        </div>
        <div className="fd-status-wrap">
          <span className="fd-status-dot" />
          <span className="fd-status-text" ref={labelRef}>Initializing</span>
        </div>
      </div>

      {/* ── YOUR EXACT LOADER HTML STRUCTURE ── */}
      <div className="fd-lines-wrap">
        {/* Line 1 — counter + "Your" */}
        <div className="line">
          <div id="line1-part1" ref={line1Ref} style={{ opacity: 0 }}>
            <h5 ref={h5Ref}>00</h5>
            <h6>- 100</h6>
          </div>
          <h1
            ref={el => (lineH1Refs.current[0] = el)}
            style={{ transform: "translateY(150%)", opacity: 0 }}
          >
            Your
          </h1>
        </div>

        {/* Line 2 — "Web Experiences" */}
        <div className="line">
          <h1
            ref={el => (lineH1Refs.current[1] = el)}
            style={{ transform: "translateY(150%)", opacity: 0 }}
          >
            Agrismart Platform
          </h1>
        </div>

        {/* Line 3 — "is loading right now" */}
        <div className="line">
          <h1
            ref={el => (lineH1Refs.current[2] = el)}
            style={{ transform: "translateY(150%)", opacity: 0 }}
          >
            is loading right
          </h1>
          <h2 ref={h2Ref}>now</h2>
        </div>
      </div>

      {/* bottom progress bar */}
      <div className="fd-progress-wrap">
        <div className="fd-progress-track">
          <div className="fd-progress-fill" ref={fillRef} />
        </div>
        <span className="fd-progress-label" ref={labelRef}>Initializing</span>
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════
   DATA CONSTANTS
══════════════════════════════════════════ */
const HERO_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80",
    label: "Fields of Jharkhand",
    title: <>Fresh from the Farm,<br /><span>Direct to Your Table.</span></>,
    subtitle: "Skip the middlemen. Farmers get higher profits, and you get the freshest produce at better prices.",
  },
  {
    url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1920&q=80",
    label: "Harvest Season",
    title: <>Grown with Care,<br /><span>Delivered with Pride.</span></>,
    subtitle: "From wheat fields to vegetable farms — buy directly from the hands that grow your food.",
  },
  {
    url: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1920&q=80",
    label: "Golden Grains",
    title: <>Support Local Farmers,<br /><span>Eat Better Every Day.</span></>,
    subtitle: "Every purchase empowers a farmer family and brings fresher food to your kitchen.",
  },
  {
    url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1920&q=80",
    label: "Organic Produce",
    title: <>Nature's Finest,<br /><span>At Farm-Gate Prices.</span></>,
    subtitle: "Organic, seasonal, and sustainably grown. No chemicals, no cold storage, no compromises.",
  },
  {
    url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1920&q=80",
    label: "Morning Harvest",
    title: <>From Soil to Soul,<br /><span>Pure & Unprocessed.</span></>,
    subtitle: "Harvested this morning, on your plate tonight. The FarmDirect promise.",
  },
  {
    url: myImage,
    label: "Support Farmers",
    title: <>From Farmers<br /><span>to Families.</span></>,
    subtitle: "Every meal tells a story. Make yours one of fairness, freshness, and community.",
  },
];

const VEGGIE_IMGS = [
  { src: "https://images.unsplash.com/photo-1683355739329-cea18ba93f02?q=80&w=1074&auto=format&fit=crop", alt: "vegetables" },
  { src: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?q=80&w=627&auto=format&fit=crop",  alt: "tomatoes" },
  { src: "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop",             alt: "greens" },
  { src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop",             alt: "farm" },
  { src: "https://images.unsplash.com/photo-1683543122945-513029986574?q=80&w=1074&auto=format&fit=crop", alt: "produce" },
];

const CEREAL_IMGS = [
  { src: "https://images.unsplash.com/photo-1621956838481-f8f616950454?q=80&w=687&auto=format&fit=crop",        alt: "wheat" },
  { src: "https://plus.unsplash.com/premium_photo-1686981905845-474e850e1a67?q=80&w=1170&auto=format&fit=crop", alt: "grains" },
  { src: "https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?q=80&w=688&auto=format&fit=crop",        alt: "rice" },
  { src: "https://images.pexels.com/photos/32851818/pexels-photo-32851818.jpeg",                                alt: "cereal" },
  { src: "https://images.pexels.com/photos/28447659/pexels-photo-28447659.jpeg",                                alt: "seeds" },
];

const BUYER_STEPS = [
  { icon:"🔍", num:"1", label:"Step 01", title:"Browse & Discover",    desc:"Explore seasonal produce from verified local farmers near you. Filter by category, location, or organic certification.", tag:"✦ 340+ Products Listed" },
  { icon:"💳", num:"2", label:"Step 02", title:"Order & Pay Securely", desc:"Add to cart and checkout with UPI, card, or net banking. Choose home delivery or direct farm pickup — your call.",      tag:"🔒 100% Secure Payments" },
  { icon:"🚚", num:"3", label:"Step 03", title:"Receive Farm Fresh",   desc:"Harvested fresh, delivered to your door. Same or next day. Rate your farmer and build a direct relationship.",          tag:"⚡ Same / Next Day Delivery", highlight: true },
];

const FARMER_STEPS = [
  { icon:"📝", num:"1", label:"Step 01", title:"Register for Free",  desc:"Create your farmer profile in minutes. Upload KYC documents and get verified within 24 hours — completely free.",               tag:"✦ No Registration Fee" },
  { icon:"📦", num:"2", label:"Step 02", title:"List Your Produce",  desc:"Upload photos, set your own price, and add stock quantity. Your listing goes live instantly and reaches thousands of buyers.", tag:"📸 Goes Live Instantly" },
  { icon:"💰", num:"3", label:"Step 03", title:"Earn Directly",      desc:"Receive orders, fulfil them your way, and get payment straight to your bank account. Zero commission for first 3 months.",    tag:"🎉 0% Commission — 3 Months", highlight: true },
];

const HIW_STATS = [
  { num: "2,400+", label: "Verified Farmers" },
  { num: "40%",    label: "More Profit for Farmers" },
  { num: "18K+",   label: "Happy Buyers" },
];

function StepCard({ step }) {
  return (
    <div className={`hiw-step-card${step.highlight ? " hiw-step-card--highlight" : ""}`}>
      <div className="hiw-step-num">{step.num}</div>
      <div className="hiw-step-icon">{step.icon}</div>
      <div className="hiw-step-label-pill">{step.label}</div>
      <h3 className="hiw-step-title">{step.title}</h3>
      <p className="hiw-step-desc">{step.desc}</p>
      <div className="hiw-step-tag">{step.tag}</div>
      {!step.highlight && <div className="hiw-step-arrow">→</div>}
    </div>
  );
}

function HowItWorks() {
  const [tab, setTab] = useState(0);
  const steps = tab === 0 ? BUYER_STEPS : FARMER_STEPS;
  return (
    <section className="hiw-section">
      <div className="hiw-header">
        <div className="section-eyebrow" style={{ display:"inline-flex", marginBottom:14 }}>
          <span className="section-eyebrow-dot" />
          Simple Process
        </div>
        <h2 className="hiw-title">How <span>FarmDirect</span> Works</h2>
        <p className="hiw-sub">Farm fresh produce reaches you in 3 simple steps — no middlemen, no cold storage, no compromise.</p>
      </div>
      <div className="hiw-tabs">
        <button className={`hiw-tab${tab===0?" active":""}`} onClick={()=>setTab(0)}>🛒 For Buyers</button>
        <button className={`hiw-tab${tab===1?" active":""}`} onClick={()=>setTab(1)}>🌾 For Farmers</button>
      </div>
      <div className="hiw-steps-grid">
        {steps.map(step => <StepCard key={step.num} step={step} />)}
      </div>
      <div className="hiw-divider">
        <span className="hiw-divider-line" /><span>🌾</span><span className="hiw-divider-line" />
      </div>
      <div className="hiw-stats">
        {HIW_STATS.map(s => (
          <div className="hiw-stat-box" key={s.label}>
            <div className="hiw-stat-num">{s.num}</div>
            <div className="hiw-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   HOME — main export
══════════════════════════════════════════ */
function Home() {
  const [loading, setLoading]         = useState(true);
  const [posts, setPosts]             = useState([]);
  const [current, setCurrent]         = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    appwriteService.getPosts().then(res => { if (res) setPosts(res.documents); });
  }, []);

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    setProgressKey(k => k + 1);
  }, []);

  /* hero auto-advance — only after loader finishes */
  useEffect(() => {
    if (loading) return;
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % HERO_SLIDES.length);
      setProgressKey(k => k + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, [loading]);

  const slide = HERO_SLIDES[current];

  return (
    <>
      {/* ══ LOADER ══ */}
      {loading && <Loader onDone={() => setLoading(false)} />}

      {/* ══ HOMEPAGE — fades in when loader finishes ══ */}
      <div
        className="home min-h-screen"
        style={{
          background:    "#f5f0e8",
          opacity:       loading ? 0 : 1,
          transition:    "opacity 0.6s ease",
          pointerEvents: loading ? "none" : "all",
        }}
      >
        {/* Hero */}
        <section className="hero">
          <div className="hero-slides">
            {HERO_SLIDES.map((s, i) => (
              <div
                key={i}
                className={`hero-slide${i===current?" active":""}`}
                style={{ backgroundImage:`url('${s.url}')` }}
              />
            ))}
          </div>
          <div key={progressKey} className="hero-progress" />
          <div className="container">
            <div className="hero-content mt-8 md:mt-0">
              <div className="hero-eyebrow">
                <span className="hero-eyebrow-dot" />
                {slide.label}
              </div>
              <h1 className="hero-title">{slide.title}</h1>
              {slide.subtitle && <p className="hero-subtitle">{slide.subtitle}</p>}
              <div className="hero-actions flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/all-posts" className="btn btn-primary w-full sm:w-auto">
                  Shop Fresh Produce <ArrowRight size={18} />
                </Link>
                <Link to="/DashBoard" className="btn btn-outline w-full sm:w-auto"
                  style={{ backgroundColor:"rgba(255,248,240,0.9)", color:"#2c1a0e" }}>
                  I am a Farmer
                </Link>
              </div>
            </div>
          </div>
          <div className="hero-dots">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} className={`hero-dot${i===current?" active":""}`}
                onClick={() => goTo(i)} aria-label={`Slide ${i+1}`} />
            ))}
          </div>
          <div className="hero-slide-label">{slide.label}</div>
        </section>

        {/* Vegetables Slider */}
        <section className="slider-section">
          <div className="section-eyebrow" style={{ display:"block", textAlign:"center", marginBottom:8 }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:8 }}>
              <span className="section-eyebrow-dot" /> Daily Fresh
            </span>
          </div>
          <h2 className="slider-title">Fresh Vegetables</h2>
          <p className="slider-title-sub">Straight from the farm, never from cold storage</p>
          <div className="slider">
            <div className="slide-track">
              {[...Array(2)].map((_,i) => (
                <React.Fragment key={i}>
                  {VEGGIE_IMGS.map((img,j) => (
                    <div key={j} className="card"><img src={img.src} alt={img.alt} /></div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Cereals Slider */}
        <section className="slider-section" style={{ background:"#fdf6ec" }}>
          <div className="section-eyebrow" style={{ display:"block", textAlign:"center", marginBottom:8 }}>
            <span style={{ display:"inline-flex", alignItems:"center", gap:8 }}>
              <span className="section-eyebrow-dot" /> Golden Harvest
            </span>
          </div>
          <h2 className="slider-title">Cereals & Grains</h2>
          <p className="slider-title-sub">Bulk or retail — sourced directly from farmers</p>
          <div className="slider">
            <div className="slide-track reverse">
              {[...Array(2)].map((_,i) => (
                <React.Fragment key={i}>
                  {CEREAL_IMGS.map((img,j) => (
                    <div key={j} className="card"><img src={img.src} alt={img.alt} /></div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <HowItWorks />

        {/* Features */}
        <section className="features-section container py-16 px-6">
          <div style={{ textAlign:"center", marginBottom:48 }}>
            <div className="section-eyebrow" style={{ display:"inline-flex", marginBottom:14 }}>
              <span className="section-eyebrow-dot" /> Why FarmDirect
            </div>
            <h2 className="features-heading">Built for <span>Farmers & Families</span></h2>
            <p className="features-sub">A marketplace where everyone wins — fair prices, fresh food, full transparency.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card my-2">
              <div className="feature-icon"><TrendingUp size={30} color="#c8703a" /></div>
              <h3>Fair Prices & Higher Profits</h3>
              <p>Farmers earn up to 40% more by eliminating wholesale intermediaries, while buyers enjoy farm-gate prices.</p>
            </div>
            <div className="feature-card my-2">
              <div className="feature-icon"><Leaf size={30} color="#c8703a" /></div>
              <h3>Peak Freshness</h3>
              <p>Produce travels straight from the soil to your kitchen, ensuring maximum nutrition and taste.</p>
            </div>
            <div className="feature-card my-2">
              <div className="feature-icon"><ShieldCheck size={30} color="#c8703a" /></div>
              <h3>Transparent & Secure</h3>
              <p>Know exactly who grew your food and how. Secure payments guarantee trust on both sides.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;