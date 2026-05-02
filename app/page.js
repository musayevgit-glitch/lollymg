"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HERO_BANNER_SRC = "/images/abc.JPG";
const SOFT_BG_SRC = "/images/bgall.jpg";

const projects = [
  { title: "Luxury Persona Relaunch", color: "#4df6ff", label: "Model A | +312%" },
  { title: "Retention Funnel Overhaul", color: "#ff7f9d", label: "Model B | +221%" },
  { title: "Premium Chat Conversion System", color: "#b9a8ff", label: "Model C | +408%" },
  { title: "High-Ticket PPV Story Engine", color: "#8af8c4", label: "Model D | +287%" },
];

const panels = [
  {
    title: "01. Brand Positioning",
    text: "We map your niche, define your premium tone, and build a growth architecture designed for loyal fan ecosystems.",
  },
  {
    title: "02. 24/7 Chatter Team",
    text: "Dedicated trained chatters manage DMs around the clock, building trust, urgency, and consistent high-value conversion moments.",
  },
  {
    title: "03. Revenue Systems",
    text: "PPV scripting, retention funnels, campaign timing, and spend-ready upsell structures that increase average fan value.",
  },
  {
    title: "04. Data-Led Optimization",
    text: "We track response quality, conversion windows, and fan behavior to tune your account weekly for compounding growth.",
  },
];

const creators = [
  {
    name: "Creator One",
    src: "/creators/stat1.JPG",
    stat: "+186% Monthly Net",
    focus: "DM Conversion",
  },
  {
    name: "Creator Two",
    src: "/creators/stat2.JPG",
    stat: "+241% Retention",
    focus: "VIP Funnel",
  },
  {
    name: "Creator Three",
    src: "/creators/stat3.png",
    stat: "+329% PPV Revenue",
    focus: "Story Sales",
  },
];

export default function HomePage() {
  const [activePanel, setActivePanel] = useState(0);
  const [formNote, setFormNote] = useState("");
  const [preloaderHidden, setPreloaderHidden] = useState(false);
  const [bgSrc, setBgSrc] = useState(SOFT_BG_SRC);

  const cursorRef = useRef(null);
  const cursorLabelRef = useRef(null);
  const followerRef = useRef(null);
  const followerLabelRef = useRef(null);
  const heroObjectRef = useRef(null);
  const ambientARef = useRef(null);
  const ambientBRef = useRef(null);
  const ambientCRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setPreloaderHidden(true), 950);

    const state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      fx: window.innerWidth / 2,
      fy: window.innerHeight / 2,
    };

    let rafId = 0;

    const moveCursor = (event) => {
      state.x = event.clientX;
      state.y = event.clientY;

      const nx = (event.clientX / window.innerWidth - 0.5) * 2;
      const ny = (event.clientY / window.innerHeight - 0.5) * 2;

      if (ambientARef.current) ambientARef.current.style.transform = `translate(${nx * 26}px, ${ny * 20}px)`;
      if (ambientBRef.current) ambientBRef.current.style.transform = `translate(${nx * -22}px, ${ny * 28}px)`;
      if (ambientCRef.current) ambientCRef.current.style.transform = `translate(${nx * 18}px, ${ny * -24}px)`;

      if (followerRef.current && followerRef.current.classList.contains("active")) {
        followerRef.current.style.left = `${event.clientX}px`;
        followerRef.current.style.top = `${event.clientY}px`;
      }
    };

    const animateCursor = () => {
      if (!cursorRef.current) return;

      state.fx += (state.x - state.fx) * 0.18;
      state.fy += (state.y - state.fy) * 0.18;
      cursorRef.current.style.left = `${state.fx}px`;
      cursorRef.current.style.top = `${state.fy}px`;

      rafId = window.requestAnimationFrame(animateCursor);
    };

    const handleScroll = () => {
      if (!heroObjectRef.current) return;
      const distance = document.body.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? window.scrollY / distance : 0;
      heroObjectRef.current.style.transform = `rotate(${progress * 260}deg) scale(${1 + progress * 0.08})`;
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("scroll", handleScroll, { passive: true });
    rafId = window.requestAnimationFrame(animateCursor);

    const magneticItems = Array.from(document.querySelectorAll("[data-magnetic]"));
    const magneticHandlers = magneticItems.map((item) => {
      const onMouseMove = (event) => {
        const rect = item.getBoundingClientRect();
        const px = event.clientX - rect.left - rect.width / 2;
        const py = event.clientY - rect.top - rect.height / 2;
        item.style.transform = `translate(${px * 0.15}px, ${py * 0.15}px)`;
      };

      const onMouseEnter = () => {
        if (cursorRef.current) {
          cursorRef.current.style.width = "160px";
          cursorRef.current.style.height = "160px";
        }
        if (cursorLabelRef.current) {
          cursorLabelRef.current.textContent = "engage";
        }
      };

      const onMouseLeave = () => {
        item.style.transform = "translate(0, 0)";
        if (cursorRef.current) {
          cursorRef.current.style.width = "120px";
          cursorRef.current.style.height = "120px";
        }
        if (cursorLabelRef.current) {
          cursorLabelRef.current.textContent = "";
        }
      };

      item.addEventListener("mousemove", onMouseMove);
      item.addEventListener("mouseenter", onMouseEnter);
      item.addEventListener("mouseleave", onMouseLeave);

      return () => {
        item.removeEventListener("mousemove", onMouseMove);
        item.removeEventListener("mouseenter", onMouseEnter);
        item.removeEventListener("mouseleave", onMouseLeave);
      };
    });

    const revealTargets = Array.from(document.querySelectorAll("section, .panel, .project, .creator-card"));
    revealTargets.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      magneticHandlers.forEach((cleanup) => cleanup());
    };
  }, []);

  useEffect(() => {
    // Resolve available background image among common extensions
    const candidates = [
      "/images/soft-bg.webp",
      "/images/soft-bg.png",
      "/images/soft-bg.jpg",
      "/images/soft-bg.svg",
      "/images/bgall.jpg",
    ];
    let cancelled = false;

    (async () => {
      for (const p of candidates) {
        try {
          const res = await fetch(p, { method: "HEAD" });
          if (res.ok) {
            if (!cancelled) setBgSrc(p);
            break;
          }
        } catch (e) {
          // ignore
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleProjectEnter = (project, event) => {
    if (!followerRef.current || !followerLabelRef.current) return;

    followerRef.current.classList.add("active");
    followerRef.current.style.background = `radial-gradient(circle at 30% 30%, #ffffff, ${project.color})`;
    followerRef.current.style.left = `${event.clientX}px`;
    followerRef.current.style.top = `${event.clientY}px`;
    followerLabelRef.current.textContent = project.label;

    if (cursorRef.current) {
      cursorRef.current.style.width = "190px";
      cursorRef.current.style.height = "190px";
    }
    if (cursorLabelRef.current) {
      cursorLabelRef.current.textContent = "open";
    }
  };

  const handleProjectMove = (event) => {
    if (!followerRef.current || !followerRef.current.classList.contains("active")) return;
    followerRef.current.style.left = `${event.clientX}px`;
    followerRef.current.style.top = `${event.clientY}px`;
  };

  const handleProjectLeave = () => {
    if (followerRef.current) followerRef.current.classList.remove("active");
    if (cursorRef.current) {
      cursorRef.current.style.width = "120px";
      cursorRef.current.style.height = "120px";
    }
    if (cursorLabelRef.current) {
      cursorLabelRef.current.textContent = "";
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formEl = event.currentTarget; // capture form element to avoid React synthetic event pooling
    (async () => {
      const formData = new FormData(formEl);
      const payload = {
        firstName: formData.get("firstName")?.toString().trim() || "",
        lastName: formData.get("lastName")?.toString().trim() || "",
        phone: formData.get("phone")?.toString().trim() || "",
        email: formData.get("email")?.toString().trim() || "",
        instagram: formData.get("instagram")?.toString().trim() || "",
        workedWithAgency: formData.get("workedWithAgency") || "",
        onlyfans: formData.get("onlyfans")?.toString().trim() || "",
        accountStatus: formData.get("accountStatus") || "",
        monthlyRevenue: formData.get("monthlyRevenue") || "",
        about: formData.get("about")?.toString().trim() || "",
      };

      // Client-side validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9+()\s-]{6,25}$/; // permissive
      if (!payload.firstName) return setFormNote("Please enter your first name.");
      if (!payload.lastName) return setFormNote("Please enter your last name.");
      if (!emailRegex.test(payload.email)) return setFormNote("Please enter a valid email address.");
      if (!phoneRegex.test(payload.phone)) return setFormNote("Please enter a valid phone number.");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setFormNote(`Thanks, ${payload.firstName || "there"}. Your request was received. LOLLY team will contact you within 24 hours.`);
          formEl.reset();
        } else {
          const j = await res.json().catch(() => ({}));
          console.error("Contact submit error:", j);
          const serverMsg = j?.error?.message || j?.error || JSON.stringify(j) || "Submission failed — please try again later.";
          setFormNote(serverMsg);
        }
        } catch (e) {
          console.error("Network error sending contact:", e);
          setFormNote("Network error — please try again later.");
        }
    })();
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <>
      <div className={`preloader${preloaderHidden ? " hidden" : ""}`} aria-hidden="true">
        <div className="loader-orbit">
          <span className="loader-core" />
          <span className="loader-ring ring-a" />
          <span className="loader-ring ring-b" />
        </div>
        <p>Assembling Astra Experience</p>
      </div>

      <div className="cursor" ref={cursorRef}>
        <span ref={cursorLabelRef} />
      </div>

      <div className="ambient ambient-a" ref={ambientARef} />
      <div className="ambient ambient-b" ref={ambientBRef} />
      <div className="ambient ambient-c" ref={ambientCRef} />
      <div className="background-photo" style={{ backgroundImage: `url(${bgSrc})` }} aria-hidden="true" />

      <header className="site-header">
        <a href="#" className="brand">
          LOLLY AGENCY
        </a>
        <nav>
            <a href="#process" onClick={(e) => handleNavClick(e, "process")}>Process</a>
            <a href="#creators" onClick={(e) => handleNavClick(e, "creators")}>Success</a>
            <a href="#showcase" onClick={(e) => handleNavClick(e, "showcase")}>FAQ</a>
            <a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>Contact</a>
        </nav>
        <button className="nav-cta" data-magnetic onClick={() => scrollToId("contact")}>
          Apply Now
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">OnlyFans Management, Reimagined</p>
            <h1>
              We run your <span className="glow-word">OnlyFans</span> 24/7, so your brand scales with precision.
            </h1>
            <p className="lead">
              LOLLY AGENCY is a full-service growth partner. Trained chatters, conversion-focused content systems,
              retention strategy, and premium fan relationship management.
            </p>
            <div className="hero-actions">
              <button className="primary" data-magnetic>
                Start With Lolly
              </button>
              <button className="ghost" data-magnetic onClick={() => scrollToId("process")}>
                See How It Works
              </button>
            </div>
          </div>
          <div className="hero-object-wrap">
            <div className="hero-photo-card">
              <img src={HERO_BANNER_SRC} alt="Featured creator banner" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div className="hero-object" ref={heroObjectRef} aria-hidden="true">
              <div className="orbital orbital-1" />
              <div className="orbital orbital-2" />
              <div className="orbital orbital-3" />
            </div>
          </div>
        </section>

        <section className="process" id="process">
          <div className="section-title">
            <p>Interactive Process</p>
            <h2>From onboarding to elite monthly performance.</h2>
          </div>

          <div className="bento-grid">
            {panels.map((panel, index) => (
              <article
                key={panel.title}
                className={`panel ${activePanel === index ? "active" : ""}`}
                onClick={() => setActivePanel(index)}
              >
                <h3>{panel.title}</h3>
                <p>{panel.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="creators" id="creators">
          <div className="section-title">
            <p>Creator Visuals</p>
            <h2>Premium profile imagery that fits high-trust agency branding.</h2>
          </div>

          <div className="creators-grid">
            {creators.map((creator) => (
              <article className="creator-card" key={creator.name}>
                <div className="creator-image-wrap">
                  <Image
                    src={creator.src}
                    alt={`${creator.name} profile visual`}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="creator-meta">
                  <h3>{creator.name}</h3>
                  <p>{creator.focus}</p>
                  <strong>{creator.stat}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="showcase" id="showcase">
          <div className="section-title">
            <p>Portfolio Snapshot</p>
            <h2>Frequently Asked Questions.</h2>
          </div>

          <ul className="project-list">
            {projects.map((project) => (
              <li
                className="project"
                key={project.title}
                onMouseEnter={(event) => handleProjectEnter(project, event)}
                onMouseMove={handleProjectMove}
                onMouseLeave={handleProjectLeave}
              >
                <button data-magnetic>{project.title}</button>
              </li>
            ))}
          </ul>

          <div className="project-follower" ref={followerRef} aria-hidden="true">
            <span ref={followerLabelRef} />
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="section-title">
            <p>Contact Lolly</p>
            <h2>Let us scale your account while you stay in your creative zone.</h2>
          </div>

          <form className="contact-form" onSubmit={onSubmit}>
            <div className="form-row">
              <label>
                <span>First Name</span>
                <input type="text" name="firstName" placeholder="First name" required />
              </label>
              <label>
                <span>Last Name</span>
                <input type="text" name="lastName" placeholder="Last name" required />
              </label>
            </div>

            <div className="form-row">
              <label>
                <span>Email</span>
                <input type="email" name="email" placeholder="you@brand.com" required />
              </label>
              <label>
                <span>Phone</span>
                <input type="tel" name="phone" placeholder="+1 555 555 5555" required />
              </label>
            </div>

            <label>
              <span>Instagram Handle / URL</span>
              <input type="text" name="instagram" placeholder="@yourhandle or https://instagram.com/you" />
            </label>

            <label>
              <span>Have you worked with an agency?</span>
              <div className="radio-row">
                <label><input type="radio" name="workedWithAgency" value="yes" /> Yes</label>
                <label><input type="radio" name="workedWithAgency" value="no" defaultChecked /> No</label>
              </div>
            </label>

            <label>
              <span>OnlyFans link</span>
              <input type="url" name="onlyfans" placeholder="https://onlyfans.com/yourprofile" />
            </label>

            <label>
              <span>Account status</span>
              <select name="accountStatus">
                <option value="part-time">Part-time</option>
                <option value="full-time">Full-time</option>
                <option value="onboarding">Onboarding</option>
                <option value="paused">Paused</option>
              </select>
            </label>

            <label>
              <span>Monthly revenue</span>
              <select name="monthlyRevenue">
                <option value="0-4999">0 - 4,999</option>
                <option value="5000-19999">5,000 - 19,999</option>
                <option value="20000-49999">20,000 - 49,999</option>
                <option value="50000+">50,000+</option>
              </select>
            </label>

            <label>
              <span>About yourself</span>
              <textarea name="about" rows="4" placeholder="Tell us about your content, goals, and challenges" />
            </label>

            <button className="primary" type="submit" data-magnetic>
              Request Private Strategy Session
            </button>
            <p className="form-note" aria-live="polite">
              {formNote}
            </p>
          </form>
        </section>
      </main>
    </>
  );
}