"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const industries = [
  { name: "Solar",       icon: "fa-solar-panel",    img: "https://festivalpost.in/images/business-category/132098076_9c862491-8a06-440c-9d5a-2d76feaaace71.svg" },
  { name: "Jewellery",   icon: "fa-gem",            img: "https://festivalpost.in/images/business-category/24855004_design2381.svg" },
  { name: "Mobile Store",icon: "fa-mobile-screen",  img: "https://festivalpost.in/images/business-category/365433759_90905d3d-31ad-4a0c-b3c4-5691b012d9901.svg" },
  { name: "Insurance",   icon: "fa-shield",         img: "https://festivalpost.in/images/business-category/414799689_f170327a-0d5d-4e87-adb6-7f7283c34e351.svg" },
  { name: "Real Estate", icon: "fa-building",       img: "https://festivalpost.in/images/business-category/409788032_39cf12be-6d9d-4b18-b0f1-bdf853eae4651.png" },
  { name: "Healthcare",  icon: "fa-heart",          img: "https://festivalpost.in/images/business-category/image34.png" },
  { name: "Automotive",  icon: "fa-car",            img: "https://festivalpost.in/images/business-category/409788032_39cf12be-6d9d-4b18-b0f1-bdf853eae4651-1.png" },
  { name: "E-commerce",  icon: "fa-cart-shopping",  img: "https://festivalpost.in/images/business-category/image34-1.png" },
  { name: "Construction",icon: "fa-helmet-safety",  img: "https://festivalpost.in/images/business-category/409788032_39cf12be-6d9d-4b18-b0f1-bdf853eae4651-2.png" },
  { name: "Beauty",      icon: "fa-spa",            img: "https://festivalpost.in/images/business-category/image34-2.png" },
];

const festivals = [
  { name: "Holi",               img: "https://festivalpost.in/images/festive-planner/16415508197261_Fest_07_01_vishal_1_square1.svg" },
  { name: "Makar Sankranti",    img: "https://festivalpost.in/images/festive-planner/image40.svg" },
  { name: "Ganesh Chaturthi",   img: "https://festivalpost.in/images/festive-planner/16415508197261_Fest_07_01_vishal_1_square1-2.svg" },
  { name: "Ram Navmi",          img: "https://festivalpost.in/images/festive-planner/16415508197261_Fest_07_01_vishal_1_square1-3.svg" },
  { name: "Pongal",             img: "https://festivalpost.in/images/festive-planner/16415508197261_Fest_07_01_vishal_1_square1-4.svg" },
  { name: "Vasant Panchami",    img: "https://festivalpost.in/images/festive-planner/1e33279dac6fe02e650ef956797f50f8b824e4a6.webp" },
  { name: "Maha Shivratri",     img: "https://festivalpost.in/images/festive-planner/maha-shivratri.svg" },
  { name: "Yoga Day",           img: "https://festivalpost.in/images/festive-planner/cat1.svg" },
  { name: "Janmashtami",        img: "https://festivalpost.in/images/festive-planner/cat1-1.svg" },
  { name: "Navratri",           img: "https://festivalpost.in/images/festive-planner/cat1-2.svg" },
  { name: "Dussehra",           img: "https://festivalpost.in/images/festive-planner/cat1-3.svg" },
  { name: "Diwali",             img: "https://festivalpost.in/images/festive-planner/cat1-4.svg" },
];

const features = [
  { icon: "fa-image",       title: "Custom Frame",          desc: "Add your own Photo from Phone Gallery and Set in the Readymade Frame Layout with Company Details like Business Logo, Name, Mobile Number, Gmail ID, Website and Address." },
  { icon: "fa-pen-ruler",   title: "Custom Templates",      desc: "Our Creative Designer will Design specific Customize Poster Design to meet Customers Business Requirements with latest designs." },
  { icon: "fa-language",    title: "Multiple Language",     desc: "Festival Poster & Videos are available in Hindi, English, Gujarati, Marathi, Tamil etc languages. Includes Poster Text in Indian regional languages for the users." },
  { icon: "fa-share-nodes", title: "Social Share",          desc: "Share post on Social Media Apps like WhatsApp, Facebook, Instagram, Twitter, Pinterest, Snapchat, YouTube, Insta Reels etc on one click." },
  { icon: "fa-images",      title: "Multiple Image Choice", desc: "Lots of Awesome Posters & Video to opt one of your Choice. Unique Background, Frames Layout, Color Combination, Text, Video Effects, etc." },
  { icon: "fa-gift",        title: "Greetings",             desc: "Greetings Cards Designs for all occasions such as Happy Birthday, Festival, Product Launch, Anniversary, Congratulations, RIP etc with quotes messages." },
];

const services = [
  { name: "Own Logo Design",        icon: "fa-paint-brush",   img: "https://festivalpost.in/images/marketing-solutions/Icon.svg" },
  { name: "Visiting Card Design",   icon: "fa-id-card",       img: "https://festivalpost.in/images/marketing-solutions/Icon-1.svg" },
  { name: "Own Video Post Design",  icon: "fa-photo-film",    img: "https://festivalpost.in/images/marketing-solutions/Icon-2.svg" },
  { name: "Own Photo Post Design",  icon: "fa-camera",        img: "https://festivalpost.in/images/marketing-solutions/Icon-3.svg" },
  { name: "WhatsApp Status Saver",  icon: "fa-share-alt",     img: "https://festivalpost.in/images/marketing-solutions/Icon-5.svg" },
  { name: "AI Image Generator",     icon: "fa-wand-sparkles", img: "https://festivalpost.in/images/marketing-solutions/Icon-6.svg" },
  { name: "Own Mini Website",       icon: "fa-globe",         img: "https://festivalpost.in/images/marketing-solutions/Icon-7.svg" },
  { name: "Create Video from Photo",icon: "fa-video",         img: "https://festivalpost.in/images/marketing-solutions/Icon-4.svg" },
];

const stats = [
  { label: "Total Downloads", value: "10M+", icon: "fa-download" },
  { label: "Premium Clients", value: "5L+",  icon: "fa-crown" },
  { label: "Active Users",    value: "8L+",  icon: "fa-users" },
  { label: "App Rating",      value: "4.5+", icon: "fa-star" },
];

const testimonials = [
  { name: "R Reekki Singh Rajput", initials: "RR", text: "Festival Poster app is very easy to use. It has wide range of templates making it so easy to create professional looking posters. We share our creations directly to social media and impress our friends. I recommend to download the application." },
  { name: "SP Santhosh Pm",        initials: "SP", text: "The Festival Poster Maker app is a great tool for creating personalized festival posters. It is easy to use and does not require any prior design or photo editing experience. It provides a variety of templates for different festivals." },
  { name: "SK Samiya Kazmi",       initials: "SK", text: "Recommend Festival Post to everyone who loves sending creative wishes. The app is designed beautifully and is extremely user-friendly. You can edit and download in less than a minute. Perfect for both personal messages and business promotions!" },
];

const faqs = [
  { q: "Can I view free images and videos?",       a: "Yes, you can view free images and videos, including categories like Good Morning, Good Night, Gujarati quotes, Hindi quotes, English quotes, and various greeting videos." },
  { q: "Can I add my own text?",                   a: "Yes, you can add your own text to both images and videos using the built-in text editor with multiple fonts and colors." },
  { q: "Can I add multiple businesses?",           a: "Yes, you can add multiple businesses under one Festival Post account and switch between them easily at any time." },
  { q: "How to add custom images?",               a: "You can add custom images by clicking the Custom button on the home page and selecting an image from your gallery." },
];

// Poster strips for the infinite scroll
const posterRow1 = [
  "https://festivalpost.in/images/business-category/132098076_9c862491-8a06-440c-9d5a-2d76feaaace71.svg",
  "https://festivalpost.in/images/business-category/24855004_design2381.svg",
  "https://festivalpost.in/images/business-category/365433759_90905d3d-31ad-4a0c-b3c4-5691b012d9901.svg",
  "https://festivalpost.in/images/business-category/414799689_f170327a-0d5d-4e87-adb6-7f7283c34e351.svg",
  "https://festivalpost.in/images/business-category/image34.png",
  "https://festivalpost.in/images/festive-planner/16415508197261_Fest_07_01_vishal_1_square1.svg",
  "https://festivalpost.in/images/festive-planner/image40.svg",
  "https://festivalpost.in/images/festive-planner/maha-shivratri.svg",
  "https://festivalpost.in/images/daily-post/GoodMorning.webp",
  "https://festivalpost.in/images/daily-post/BusinessAnniversary.png",
  "https://festivalpost.in/images/own-logo/1.png",
  "https://festivalpost.in/images/visiting-card/1.png",
];

const posterRow2 = [
  "https://festivalpost.in/images/offer-sale/image57.svg",
  "https://festivalpost.in/images/offer-sale/image58.svg",
  "https://festivalpost.in/images/events/339550246_bb6e9fe6-c290-4bdc-92e9-eeafaa53e7fc1.svg",
  "https://festivalpost.in/images/events/40275102_5521.svg",
  "https://festivalpost.in/images/daily-post/MotivationQuotes.webp",
  "https://festivalpost.in/images/daily-post/GoodNight.png",
  "https://festivalpost.in/images/own-logo/2.png",
  "https://festivalpost.in/images/visiting-card/2.webp",
  "https://festivalpost.in/images/business-promotion/1.jpg",
  "https://festivalpost.in/images/business-promotion/2.png",
  "https://festivalpost.in/images/product-promotion/3.png",
  "https://festivalpost.in/images/festive-planner/cat1.svg",
];

const marqueeItems = [
  { label: "Solar",       icon: "fa-solar-panel" },
  { label: "Jewellery",   icon: "fa-gem" },
  { label: "Mobile Store",icon: "fa-mobile-screen" },
  { label: "Insurance",   icon: "fa-shield" },
  { label: "Real Estate", icon: "fa-building" },
  { label: "Healthcare",  icon: "fa-heart" },
  { label: "Automotive",  icon: "fa-car" },
  { label: "E-commerce",  icon: "fa-cart-shopping" },
  { label: "Education",   icon: "fa-graduation-cap" },
  { label: "Food",        icon: "fa-utensils" },
  { label: "Travel",      icon: "fa-plane" },
  { label: "Beauty",      icon: "fa-spa" },
];

// ─── SCROLL REVEAL HOOK ──────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fp-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fp-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────

export default function HomePage() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Syne:wght@700;800&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --orange:   #F97316;
          --orange-d: #EA580C;
          --orange-l: #FED7AA;
          --orange-ll:#FFF7ED;
          --amber:    #F59E0B;
          --white:    #FFFFFF;
          --g50:  #F9FAFB; --g100: #F3F4F6; --g200: #E5E7EB;
          --g400: #9CA3AF; --g500: #6B7280; --g600: #4B5563;
          --g700: #374151; --g800: #1F2937; --g900: #111827;
        }

        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; background: #fff; color: var(--g800); overflow-x: hidden; }

        /* ── NAV ── */
        .fp-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(255,255,255,0.95); backdrop-filter: blur(14px);
          border-bottom: 1px solid #FEE2B3; padding: 0 5%;
        }
        .fp-nav-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center; height: 66px;
        }
        .fp-logo {
          display: flex; align-items: center; gap: 9px;
          font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800;
          color: var(--g900); text-decoration: none;
        }
        .fp-logo-icon {
          width: 38px; height: 38px; border-radius: 10px;
          background: linear-gradient(135deg, var(--orange), var(--amber));
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 16px; flex-shrink: 0;
        }
        .fp-logo span { color: var(--orange); }
        .fp-nav-links { display: flex; align-items: center; gap: 4px; }
        .fp-btn-ghost {
          padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 500;
          color: var(--g600); background: transparent; border: none; cursor: pointer;
          text-decoration: none; transition: all .2s;
        }
        .fp-btn-ghost:hover { background: var(--g100); color: var(--g900); }
        .fp-btn-primary {
          padding: 10px 22px; border-radius: 9px; font-size: 14px; font-weight: 600;
          color: #fff; background: var(--orange); border: none; cursor: pointer;
          text-decoration: none; transition: all .2s;
          box-shadow: 0 2px 10px rgba(249,115,22,.35);
        }
        .fp-btn-primary:hover { background: var(--orange-d); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(249,115,22,.45); }

        /* ── HERO ── */
        .fp-hero {
          padding: 136px 5% 80px; text-align: center;
          background: radial-gradient(ellipse 85% 65% at 50% 0%, #FFF7ED 0%, #fff 72%);
          position: relative; overflow: hidden;
        }
        .fp-hero-glow {
          position: absolute; border-radius: 50%;
          filter: blur(60px); pointer-events: none;
        }
        .fp-hero-badge {
          display: inline-flex; align-items: center; gap: 9px;
          background: #fff; border: 1.5px solid #FED7AA; border-radius: 50px;
          padding: 9px 20px; font-size: 13px; font-weight: 600; color: var(--orange-d);
          margin-bottom: 30px; box-shadow: 0 2px 14px rgba(249,115,22,.13);
        }
        .fp-pulse {
          width: 7px; height: 7px; border-radius: 50%; background: var(--orange);
          animation: fp-pulse 2s infinite;
        }
        @keyframes fp-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }

        .fp-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px, 6vw, 74px);
          font-weight: 800; line-height: 1.05; color: var(--g900);
          letter-spacing: -2px; max-width: 900px; margin: 0 auto 8px;
        }
        .fp-grad {
          background: linear-gradient(135deg, #F97316, #F59E0B);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .fp-hero-sub {
          font-size: 18px; color: var(--g500); max-width: 560px;
          margin: 18px auto 40px; line-height: 1.75;
        }

        /* ── CTA BUTTONS ── */
        .fp-cta-row { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 60px; }
        .fp-btn-big {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 34px; border-radius: 12px; font-size: 16px; font-weight: 700;
          text-decoration: none; transition: all .25s; border: none; cursor: pointer;
        }
        .fp-btn-big.primary {
          background: linear-gradient(135deg, var(--orange), var(--amber));
          color: #fff; box-shadow: 0 6px 24px rgba(249,115,22,.4);
        }
        .fp-btn-big.primary:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(249,115,22,.5); }
        .fp-btn-big.outline {
          background: #fff; color: var(--g700);
          border: 1.5px solid var(--g200);
        }
        .fp-btn-big.outline:hover { border-color: var(--orange-l); background: var(--orange-ll); color: var(--orange-d); }

        /* ── STATS ROW ── */
        .fp-stats-row { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin-bottom: 60px; }
        .fp-stat-pill {
          display: flex; flex-direction: column; align-items: center;
          padding: 18px 30px; background: #fff; border: 1px solid var(--g100);
          border-radius: 18px; box-shadow: 0 2px 14px rgba(0,0,0,.06); min-width: 120px;
        }
        .fp-stat-pill i { font-size: 20px; color: var(--orange); margin-bottom: 6px; }
        .fp-stat-pill strong { font-family:'Syne',sans-serif; font-size: 30px; font-weight: 800; color: var(--g900); line-height: 1; }
        .fp-stat-pill span { font-size: 12px; color: var(--g400); margin-top: 4px; }

        /* ── MARQUEE ── */
        .fp-marquee-wrap {
          overflow: hidden; padding: 16px 0;
          background: linear-gradient(135deg, var(--orange) 0%, var(--amber) 100%);
        }
        .fp-marquee-track {
          display: flex; white-space: nowrap; gap: 0;
          animation: fp-marquee 30s linear infinite;
        }
        .fp-marquee-track:hover { animation-play-state: paused; }
        @keyframes fp-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .fp-marquee-item {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 0 28px; color: #fff; font-size: 14px; font-weight: 600;
        }
        .fp-marquee-item i { font-size: 15px; opacity: .85; }
        .fp-marquee-sep { color: rgba(255,255,255,.4); margin: 0 4px; }

        /* ── POSTER SCROLL ── */
        .fp-poster-wrap { overflow: hidden; padding: 20px 0; position: relative; }
        .fp-poster-wrap::before, .fp-poster-wrap::after {
          content: ''; position: absolute; top: 0; bottom: 0; width: 140px; z-index: 2; pointer-events: none;
        }
        .fp-poster-wrap::before { left: 0; background: linear-gradient(to right, #fff, transparent); }
        .fp-poster-wrap::after  { right: 0; background: linear-gradient(to left, #fff, transparent); }
        .fp-poster-track {
          display: flex; gap: 14px;
          animation: fp-scroll 35s linear infinite;
        }
        .fp-poster-track.reverse { animation-direction: reverse; animation-duration: 40s; }
        @keyframes fp-scroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .fp-poster-img {
          width: 160px; height: 160px; border-radius: 16px;
          object-fit: cover; flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(0,0,0,.12);
          transition: transform .3s;
        }
        .fp-poster-img:hover { transform: scale(1.06); }

        /* ── SECTIONS ── */
        .fp-section { padding: 88px 5%; }
        .fp-section-inner { max-width: 1200px; margin: 0 auto; }
        .fp-label {
          display: inline-block; padding: 6px 16px; border-radius: 50px;
          background: var(--orange-ll); color: var(--orange-d);
          font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
          margin-bottom: 14px;
        }
        .fp-section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 800; color: var(--g900); line-height: 1.08;
          letter-spacing: -1px; margin-bottom: 12px;
        }
        .fp-section-sub {
          font-size: 16px; color: var(--g500); max-width: 520px; line-height: 1.75; margin-bottom: 48px;
        }

        /* ── INDUSTRY GRID ── */
        .fp-cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
        .fp-cat-card {
          border-radius: 18px; overflow: hidden; border: 1.5px solid var(--g100);
          background: #fff; transition: all .3s; cursor: default;
        }
        .fp-cat-card:hover { border-color: #FED7AA; transform: translateY(-4px); box-shadow: 0 12px 32px rgba(249,115,22,.15); }
        .fp-cat-card img { width: 100%; height: 130px; object-fit: cover; display: block; }
        .fp-cat-label { padding: 12px; text-align: center; font-size: 13px; font-weight: 600; color: var(--g700); }
        .fp-cat-label i { color: var(--orange); margin-right: 5px; font-size: 12px; }

        /* ── FESTIVAL GRID ── */
        .fp-fest-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(148px, 1fr)); gap: 14px; }
        .fp-fest-card {
          background: #fff; border-radius: 18px; padding: 20px 12px 16px;
          text-align: center; border: 1.5px solid var(--g100); transition: all .3s;
        }
        .fp-fest-card:hover { border-color: #FED7AA; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(249,115,22,.12); }
        .fp-fest-card img { width: 70px; height: 70px; border-radius: 12px; object-fit: cover; margin: 0 auto 10px; display: block; }
        .fp-fest-card h4 { font-size: 13px; font-weight: 600; color: var(--g700); margin-bottom: 4px; }
        .fp-fest-card span { font-size: 11px; color: var(--g400); }

        /* ── FEATURES GRID ── */
        .fp-feat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
        .fp-feat-card {
          background: #fff; border-radius: 20px; padding: 32px 28px;
          border: 1.5px solid var(--g100); transition: all .3s; position: relative; overflow: hidden;
        }
        .fp-feat-card::before {
          content: ''; position: absolute; top: -30px; right: -30px;
          width: 90px; height: 90px; background: var(--orange-ll); border-radius: 50%;
        }
        .fp-feat-card:hover { border-color: #FED7AA; transform: translateY(-4px); box-shadow: 0 14px 40px rgba(249,115,22,.13); }
        .fp-feat-icon {
          width: 52px; height: 52px; border-radius: 14px;
          background: linear-gradient(135deg, var(--orange), var(--amber));
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 22px; margin-bottom: 20px;
          box-shadow: 0 4px 14px rgba(249,115,22,.35);
        }
        .fp-feat-card h3 { font-size: 18px; font-weight: 700; color: var(--g900); margin-bottom: 10px; }
        .fp-feat-card p  { font-size: 14px; color: var(--g500); line-height: 1.75; }

        /* ── SERVICES GRID ── */
        .fp-serv-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; }
        .fp-serv-card {
          background: #fff; border-radius: 18px; padding: 28px 16px;
          text-align: center; border: 1.5px solid var(--g100); transition: all .3s;
        }
        .fp-serv-card:hover { border-color: #FED7AA; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(249,115,22,.12); }
        .fp-serv-icon {
          width: 68px; height: 68px; margin: 0 auto 14px;
          border-radius: 50%; background: var(--orange-ll);
          display: flex; align-items: center; justify-content: center;
          transition: all .3s; overflow: hidden;
        }
        .fp-serv-card:hover .fp-serv-icon { background: var(--orange); }
        .fp-serv-icon img { width: 38px; height: 38px; object-fit: contain; }
        .fp-serv-card h4 { font-size: 14px; font-weight: 600; color: var(--g700); }

        /* ── STATS BAND ── */
        .fp-stats-band { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; margin-bottom: 64px; }
        @media(max-width:700px){ .fp-stats-band { grid-template-columns: repeat(2,1fr); } }
        .fp-stat-card {
          background: linear-gradient(135deg, #FFF7ED, #FFEDD5);
          border-radius: 20px; padding: 28px 20px; text-align: center;
          border: 1.5px solid #FED7AA;
        }
        .fp-stat-card i { font-size: 28px; color: var(--orange); margin-bottom: 10px; display: block; }
        .fp-stat-card .val { font-family:'Syne',sans-serif; font-size: 40px; font-weight: 800; color: var(--g900); line-height: 1; }
        .fp-stat-card .lbl { font-size: 13px; color: var(--g500); margin-top: 6px; }

        /* ── TESTIMONIALS ── */
        .fp-testi-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .fp-testi-card {
          background: #fff; border-radius: 20px; padding: 28px;
          border: 1.5px solid var(--g100); transition: all .3s;
        }
        .fp-testi-card:hover { border-color: #FED7AA; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(249,115,22,.1); }
        .fp-stars { color: var(--amber); font-size: 14px; margin-bottom: 14px; letter-spacing: 2px; }
        .fp-testi-card p { font-size: 14px; color: var(--g600); line-height: 1.8; font-style: italic; margin-bottom: 18px; }
        .fp-testi-author { display: flex; align-items: center; gap: 12px; }
        .fp-testi-avatar {
          width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, var(--orange), var(--amber));
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 700; font-size: 13px;
        }
        .fp-testi-name { font-size: 13px; font-weight: 600; color: var(--g800); }

        /* ── FAQ ── */
        .fp-faq-list {
          background: #fff; border-radius: 20px; border: 1.5px solid var(--g100);
          overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,.06);
        }
        .fp-faq-item {
          padding: 22px 28px; border-bottom: 1px solid var(--g100);
          display: flex; justify-content: space-between; align-items: center;
          cursor: pointer; transition: background .2s; gap: 16px;
        }
        .fp-faq-item:last-child { border-bottom: none; }
        .fp-faq-item:hover { background: var(--orange-ll); }
        .fp-faq-q { font-size: 15px; font-weight: 600; color: var(--g800); }
        .fp-faq-icon { color: var(--g400); font-size: 13px; flex-shrink: 0; transition: all .25s; }
        .fp-faq-icon.open { transform: rotate(180deg); color: var(--orange); }
        .fp-faq-ans {
          padding: 0 28px 20px; font-size: 14px; color: var(--g500);
          line-height: 1.8; background: var(--orange-ll);
          overflow: hidden; max-height: 0;
          transition: max-height .35s ease, padding .35s ease;
        }
        .fp-faq-ans.open { max-height: 200px; padding: 0 28px 20px; }

        /* ── CTA SECTION ── */
        .fp-cta-sec {
          background: linear-gradient(135deg, #F97316 0%, #F59E0B 100%);
          padding: 100px 5%; text-align: center; position: relative; overflow: hidden;
        }
        .fp-cta-sec::before {
          content:''; position:absolute; top:-120px; left:-120px;
          width:500px; height:500px; background:rgba(255,255,255,.07); border-radius:50%;
        }
        .fp-cta-sec::after {
          content:''; position:absolute; bottom:-100px; right:-100px;
          width:420px; height:420px; background:rgba(255,255,255,.05); border-radius:50%;
        }
        .fp-cta-inner { max-width: 720px; margin: 0 auto; position: relative; z-index: 1; }
        .fp-cta-inner h2 {
          font-family:'Syne',sans-serif; font-size: clamp(32px,5vw,58px);
          font-weight: 800; color: #fff; margin-bottom: 18px; line-height: 1.1; letter-spacing: -1.5px;
        }
        .fp-cta-inner p { font-size: 18px; color: rgba(255,255,255,.9); margin-bottom: 42px; line-height: 1.65; }
        .fp-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .fp-cta-btn-white {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 34px; background: #fff; color: var(--orange-d);
          font-size: 16px; font-weight: 700; border-radius: 12px;
          text-decoration: none; transition: all .25s;
          box-shadow: 0 4px 20px rgba(0,0,0,.14);
        }
        .fp-cta-btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,.22); }
        .fp-cta-btn-ghost {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 15px 34px; background: rgba(255,255,255,.15); color: #fff;
          font-size: 16px; font-weight: 600; border-radius: 12px;
          text-decoration: none; border: 1.5px solid rgba(255,255,255,.4);
          transition: all .25s;
        }
        .fp-cta-btn-ghost:hover { background: rgba(255,255,255,.25); }

        /* ── FOOTER ── */
        .fp-footer { background: var(--g900); padding: 56px 5% 32px; }
        .fp-footer-inner { max-width: 1200px; margin: 0 auto; }
        .fp-footer-top {
          display: flex; justify-content: space-between; align-items: center;
          flex-wrap: wrap; gap: 24px; margin-bottom: 36px;
          padding-bottom: 36px; border-bottom: 1px solid rgba(255,255,255,.08);
        }
        .fp-footer-brand {
          display: flex; align-items: center; gap: 9px;
          font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: #fff;
        }
        .fp-footer-brand .fp-logo-icon { width: 32px; height: 32px; font-size: 13px; border-radius: 8px; }
        .fp-footer-links { display: flex; gap: 22px; flex-wrap: wrap; }
        .fp-footer-links a { color: var(--g400); text-decoration: none; font-size: 14px; transition: color .2s; }
        .fp-footer-links a:hover { color: var(--orange); }
        .fp-footer-social { display: flex; gap: 10px; }
        .fp-social-btn {
          width: 38px; height: 38px; border-radius: 9px;
          background: rgba(255,255,255,.06); display: flex; align-items: center;
          justify-content: center; color: var(--g400); text-decoration: none;
          transition: all .2s; font-size: 15px;
        }
        .fp-social-btn:hover { background: var(--orange); color: #fff; }
        .fp-footer-bottom { text-align: center; font-size: 13px; color: var(--g500); }

        /* ── REVEAL ANIMATION ── */
        .fp-reveal { opacity: 0; transform: translateY(28px); transition: opacity .65s ease, transform .65s ease; }
        .fp-visible { opacity: 1; transform: translateY(0); }

        /* ── RESPONSIVE ── */
        @media(max-width: 768px) {
          .fp-nav-links .fp-btn-ghost:not(:last-child):not(:nth-last-child(2)) { display: none; }
          .fp-h1 { letter-spacing: -1px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="fp-nav">
        <div className="fp-nav-inner">
          <Link href="/" className="fp-logo">
            <div className="fp-logo-icon"><i className="fas fa-calendar-alt" /></div>
            Festival<span>Post</span>
          </Link>
          <div className="fp-nav-links">
            <a href="#industries" className="fp-btn-ghost">Industries</a>
            <a href="#features"   className="fp-btn-ghost">Features</a>
            <a href="#testimonials" className="fp-btn-ghost">Reviews</a>
            <Link href="/login"    className="fp-btn-ghost">Login</Link>
            <Link href="/register" className="fp-btn-primary">
              <i className="fas fa-rocket" style={{ fontSize: 12 }} /> Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="fp-hero">
        {/* Ambient glows */}
        <div className="fp-hero-glow" style={{ top: 80, left: "6%", width: 200, height: 200, background: "rgba(249,115,22,.1)" }} />
        <div className="fp-hero-glow" style={{ top: 140, right: "5%", width: 260, height: 260, background: "rgba(245,158,11,.08)" }} />

        <div className="fp-reveal">
          <div className="fp-hero-badge">
            <div className="fp-pulse" />
            Festival Post · Business Suite · v3.0
            <i className="fas fa-wand-magic-sparkles" style={{ fontSize: 12, opacity: .7 }} />
          </div>

          <h1 className="fp-h1">
            Promote Your Business with<br />
            <span className="fp-grad">100K+ Images &amp; 50K+ Videos</span>
          </h1>

          <p className="fp-hero-sub">
            Best Digital Marketing app to promote your business for 365 Days.
            Save and share images or videos with your business logo &amp; company details.
          </p>

          <div className="fp-cta-row">
            <Link href="/register" className="fp-btn-big primary">
              <i className="fas fa-rocket" /> Start Free
            </Link>
            <Link href="/login" className="fp-btn-big outline">
              <i className="fas fa-sign-in-alt" /> Login
            </Link>
            <a href="#industries" className="fp-btn-ghost" style={{ alignSelf: "center", fontSize: 15 }}>
              Explore <i className="fas fa-arrow-down" style={{ fontSize: 12 }} />
            </a>
          </div>

          <div className="fp-stats-row">
            {stats.map((s, i) => (
              <div key={i} className="fp-stat-pill">
                <i className={`fas ${s.icon}`} />
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="fp-marquee-wrap">
        <div className="fp-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((m, i) => (
            <span key={i} className="fp-marquee-item">
              <i className={`fas ${m.icon}`} />
              {m.label}
              <span className="fp-marquee-sep">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── POSTER ROW 1 ── */}
      <div className="fp-poster-wrap" style={{ paddingTop: 44 }}>
        <div
          className="fp-poster-track"
          ref={track1Ref}
          onMouseEnter={() => track1Ref.current && (track1Ref.current.style.animationPlayState = "paused")}
          onMouseLeave={() => track1Ref.current && (track1Ref.current.style.animationPlayState = "running")}
        >
          {[...posterRow1, ...posterRow1].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="poster" className="fp-poster-img" />
          ))}
        </div>
      </div>

      {/* ── POSTER ROW 2 ── */}
      <div className="fp-poster-wrap" style={{ paddingBottom: 44 }}>
        <div
          className="fp-poster-track reverse"
          ref={track2Ref}
          onMouseEnter={() => track2Ref.current && (track2Ref.current.style.animationPlayState = "paused")}
          onMouseLeave={() => track2Ref.current && (track2Ref.current.style.animationPlayState = "running")}
        >
          {[...posterRow2, ...posterRow2].map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={src} alt="poster" className="fp-poster-img" />
          ))}
        </div>
      </div>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="fp-section" style={{ background: "#F9FAFB" }}>
        <div className="fp-section-inner">
          <div className="fp-reveal">
            <div className="fp-label"><i className="fas fa-briefcase" /> Industries</div>
            <h2 className="fp-section-title">Business Categories</h2>
            <p className="fp-section-sub">
              For Daily Marketing and Advertisement Promotion large number New Posters are
              available for Business Categories &amp; International Days
            </p>
          </div>
          <div className="fp-cat-grid fp-reveal">
            {industries.map((cat, i) => (
              <div key={i} className="fp-cat-card">
                <Image
                  src={cat.img}
                  alt={cat.name}
                  width={400}
                  height={130}
                  style={{ width: "100%", height: 130, objectFit: "cover" }}
                  unoptimized
                />
                <div className="fp-cat-label">
                  <i className={`fas ${cat.icon}`} />
                  {cat.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FESTIVAL PLANNER ── */}
      <section id="festivals" className="fp-section" style={{ background: "#fff" }}>
        <div className="fp-section-inner">
          <div className="fp-reveal">
            <div className="fp-label"><i className="fas fa-calendar-alt" /> Planner</div>
            <h2 className="fp-section-title">Festival Planner 2026</h2>
            <p className="fp-section-sub">
              View upcoming festivals, set reminders, and prepare your marketing designs
              ahead of time — all from one app.
            </p>
          </div>
          <div className="fp-fest-grid fp-reveal">
            {festivals.map((f, i) => (
              <div key={i} className="fp-fest-card">
                <Image
                  src={f.img}
                  alt={f.name}
                  width={70}
                  height={70}
                  style={{ borderRadius: 12, objectFit: "cover" }}
                  unoptimized
                />
                <h4>{f.name}</h4>
                <span>2026</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="fp-section" style={{ background: "linear-gradient(160deg,#FFF7ED 0%,#fff 60%)" }}>
        <div className="fp-section-inner">
          <div className="fp-reveal" style={{ textAlign: "center" }}>
            <div className="fp-label"><i className="fas fa-crown" /> Features</div>
            <h2 className="fp-section-title">Awesome Features</h2>
            <p className="fp-section-sub" style={{ margin: "0 auto 48px" }}>
              Ready to use Festival Posters with Creative Layout Options for Advertisement
              on Social Media to Promote Business Online.
            </p>
          </div>
          <div className="fp-feat-grid fp-reveal">
            {features.map((f, i) => (
              <div key={i} className="fp-feat-card">
                <div className="fp-feat-icon"><i className={`fas ${f.icon}`} /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="fp-section" style={{ background: "#F9FAFB" }}>
        <div className="fp-section-inner">
          <div className="fp-reveal" style={{ textAlign: "center" }}>
            <div className="fp-label"><i className="fas fa-boxes-stacked" /> Services</div>
            <h2 className="fp-section-title">All-in-One Marketing Solutions</h2>
            <p className="fp-section-sub" style={{ margin: "0 auto 48px" }}>
              Everything you need to create, design, and market your brand in one place.
            </p>
          </div>
          <div className="fp-serv-grid fp-reveal">
            {services.map((s, i) => (
              <div key={i} className="fp-serv-card">
                <div className="fp-serv-icon">
                  <Image src={s.img} alt={s.name} width={38} height={38} style={{ objectFit: "contain" }} unoptimized />
                </div>
                <h4>{s.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS + TESTIMONIALS ── */}
      <section id="testimonials" className="fp-section" style={{ background: "#fff" }}>
        <div className="fp-section-inner">
          <div className="fp-stats-band fp-reveal">
            {stats.map((s, i) => (
              <div key={i} className="fp-stat-card">
                <i className={`fas ${s.icon}`} />
                <div className="val">{s.value}</div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="fp-reveal" style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="fp-label"><i className="fas fa-quote-left" /> Testimonials</div>
            <h2 className="fp-section-title">Trusted by Festival Post Worldwide</h2>
          </div>

          <div className="fp-testi-grid fp-reveal">
            {testimonials.map((t, i) => (
              <div key={i} className="fp-testi-card">
                <div className="fp-stars">★★★★★</div>
                <p>"{t.text}"</p>
                <div className="fp-testi-author">
                  <div className="fp-testi-avatar">{t.initials}</div>
                  <div className="fp-testi-name">{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="fp-section" style={{ background: "#F9FAFB" }}>
        <div className="fp-section-inner" style={{ maxWidth: 760 }}>
          <div className="fp-reveal" style={{ textAlign: "center" }}>
            <div className="fp-label"><i className="fas fa-circle-question" /> FAQ</div>
            <h2 className="fp-section-title">Your Questions Answered</h2>
            <p className="fp-section-sub" style={{ margin: "0 auto 40px" }}>
              Browse through the FAQs to find answers to commonly asked questions.
            </p>
          </div>
          <div className="fp-faq-list fp-reveal">
            {faqs.map((faq, i) => (
              <div key={i}>
                <div
                  className="fp-faq-item"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="fp-faq-q">{faq.q}</span>
                  <i className={`fas fa-chevron-down fp-faq-icon${openFaq === i ? " open" : ""}`} />
                </div>
                <div className={`fp-faq-ans${openFaq === i ? " open" : ""}`}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="fp-cta-sec">
        <div className="fp-cta-inner fp-reveal">
          <h2>Grow Your Business with Festival Post</h2>
          <p>
            We help you create professional festival creatives that drive engagement
            and business growth — every single day of the year.
          </p>
          <div className="fp-cta-btns">
            <Link href="/register" className="fp-cta-btn-white">
              <i className="fas fa-gem" /> Get Started Free
            </Link>
            <Link href="/login" className="fp-cta-btn-ghost">
              <i className="fas fa-sign-in-alt" /> Login
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="fp-footer">
        <div className="fp-footer-inner">
          <div className="fp-footer-top">
            <div className="fp-footer-brand">
              <div className="fp-logo-icon"><i className="fas fa-calendar-alt" /></div>
              Festival Post
              <span style={{ fontWeight: 400, color: "#6B7280", fontSize: 13, fontFamily: "'Inter',sans-serif" }}>
                © {new Date().getFullYear()}
              </span>
            </div>
            <div className="fp-footer-links">
              <a href="#industries">Industries</a>
              <a href="#features">Features</a>
              <a href="#services">Services</a>
              <a href="#faq">FAQ</a>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
            <div className="fp-footer-social">
              <a href="https://www.facebook.com/FestivalPosterMaker" className="fp-social-btn" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f" /></a>
              <a href="https://www.instagram.com/festival_post/" className="fp-social-btn" target="_blank" rel="noreferrer"><i className="fab fa-instagram" /></a>
              <a href="#" className="fp-social-btn"><i className="fab fa-twitter" /></a>
              <a href="#" className="fp-social-btn"><i className="fab fa-linkedin-in" /></a>
            </div>
          </div>
          <div className="fp-footer-bottom">
            Made with <i className="fas fa-heart" style={{ color: "#F97316" }} /> for Indian businesses &nbsp;·&nbsp; Festival Post v3.0 Pro
          </div>
        </div>
      </footer>
    </>
  );
}