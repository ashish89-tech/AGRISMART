import React, { useEffect, useState, useCallback } from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, TrendingUp, ShieldCheck } from "lucide-react";
import "./Home.css";
import myImage from "../assets/ChatGPT Image May 6, 2026, 12_21_55 AM.png";

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
  { src: "https://images.unsplash.com/photo-1621956838481-f8f616950454?q=80&w=687&auto=format&fit=crop",              alt: "wheat" },
  { src: "https://plus.unsplash.com/premium_photo-1686981905845-474e850e1a67?q=80&w=1170&auto=format&fit=crop",       alt: "grains" },
  { src: "https://images.unsplash.com/photo-1581600140682-d4e68c8cde32?q=80&w=688&auto=format&fit=crop",              alt: "rice" },
  { src: "https://images.pexels.com/photos/32851818/pexels-photo-32851818.jpeg",                                      alt: "cereal" },
  { src: "https://images.pexels.com/photos/28447659/pexels-photo-28447659.jpeg",                                      alt: "seeds" },
];

function Home() {
  const [posts, setPosts]             = useState([]);
  const [current, setCurrent]         = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    appwriteService.getPosts().then((res) => {
      if (res) setPosts(res.documents);
    });
  }, []);

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_SLIDES.length);
      setProgressKey((k) => k + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <div className="home min-h-screen" style={{ background: "#f5f0e8" }}>

      {/* ── Hero Banner ── */}
      <section className="hero">
        <div className="hero-slides">
          {HERO_SLIDES.map((s, i) => (
            <div
              key={i}
              className={`hero-slide${i === current ? " active" : ""}`}
              style={{ backgroundImage: `url('${s.url}')` }}
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
            {slide.subtitle && (
              <p className="hero-subtitle">{slide.subtitle}</p>
            )}
            <div className="hero-actions flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/all-posts" className="btn btn-primary w-full sm:w-auto">
                Shop Fresh Produce
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/DashBoard"
                className="btn btn-outline w-full sm:w-auto"
                style={{ backgroundColor: "rgba(255,248,240,0.9)", color: "#2c1a0e" }}
              >
                I am a Farmer
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot${i === current ? " active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="hero-slide-label">{slide.label}</div>
      </section>

      {/* ── Vegetables Slider ── */}
      <section className="slider-section">
        <div className="section-eyebrow" style={{ display: "block", textAlign: "center", marginBottom: 8 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span className="section-eyebrow-dot" />
            Daily Fresh
          </span>
        </div>
        <h2 className="slider-title">Fresh Vegetables</h2>
        <p className="slider-title-sub">Straight from the farm, never from cold storage</p>
        <div className="slider">
          <div className="slide-track">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {VEGGIE_IMGS.map((img, j) => (
                  <div key={j} className="card">
                    <img src={img.src} alt={img.alt} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cereals Slider ── */}
      <section className="slider-section" style={{ background: "#fdf6ec" }}>
        <div className="section-eyebrow" style={{ display: "block", textAlign: "center", marginBottom: 8 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span className="section-eyebrow-dot" />
            Golden Harvest
          </span>
        </div>
        <h2 className="slider-title">Cereals & Grains</h2>
        <p className="slider-title-sub">Bulk or retail — sourced directly from farmers</p>
        <div className="slider">
          <div className="slide-track reverse">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                {CEREAL_IMGS.map((img, j) => (
                  <div key={j} className="card">
                    <img src={img.src} alt={img.alt} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section  w-full  px-10 py-10">
        <div className="max-w-7xl mx-auto px-6" style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="section-eyebrow" style={{ display: "inline-flex", marginBottom: 14 }}>
            <span className="section-eyebrow-dot" />
            Why AgriSmart
          </div>
          <h2 className="features-heading">
            Built for <span>Farmers & Families</span>
          </h2>
          <p className="features-sub">
            A marketplace where everyone wins — fair prices, fresh food, full transparency.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card my-2">
            <div className="feature-icon">
              <TrendingUp size={30} color="#c8703a" />
            </div>
            <h3>Fair Prices & Higher Profits</h3>
            <p>Farmers earn up to 40% more by eliminating wholesale intermediaries, while buyers enjoy farm-gate prices.</p>
          </div>
          <div className="feature-card my-2">
            <div className="feature-icon">
              <Leaf size={30} color="#c8703a" />
            </div>
            <h3>Peak Freshness</h3>
            <p>Produce travels straight from the soil to your kitchen, ensuring maximum nutrition and taste.</p>
          </div>
          <div className="feature-card my-2">
            <div className="feature-icon">
              <ShieldCheck size={30} color="#c8703a" />
            </div>
            <h3>Transparent & Secure</h3>
            <p>Know exactly who grew your food and how. Secure payments guarantee trust on both sides.</p>
          </div>
        </div>
      </section>


     
    </div>
  );
}

export default Home;