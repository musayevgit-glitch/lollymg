"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const HERO_BANNER_SRC = "/images/abc.JPG";
const SOFT_BG_SRC = "/images/bgall.jpg";

const faqs = [
  {
    question: "What is LOLLY AGENCY and how can it help me succeed on OnlyFans?",
    answer: "LOLLY AGENCY is a full-service OnlyFans management company. We handle everything from 24/7 subscriber engagement, premium content strategy, conversion optimization, and revenue maximization. Our trained chatter team manages DMs around the clock to build trust and drive consistent high-value conversion moments. We handle the business side so you can focus on your creative vision."
  },
  {
    question: "What makes LOLLY AGENCY different from other OnlyFans agencies?",
    answer: "Unlike generic agencies, we specialize exclusively in OnlyFans growth with a data-led approach. We combine brand positioning, dedicated 24/7 chatter teams, premium conversion systems, and weekly optimization based on real fan behavior. Each strategy is customized for your niche—whether luxury positioning, high-ticket PPV, or retention-focused models. We track metrics that matter: response quality, conversion windows, and fan lifetime value."
  },
  {
    question: "What are the benefits of working with LOLLY AGENCY?",
    answer: "Direct benefits include: 24/7 account management, increased subscriber engagement and PPV conversions, optimized fan retention, higher average monthly revenue, access to proven conversion scripts and funnels, data-driven account tuning, and more time for you to focus on creative content. Our clients typically see 200-400% growth in their first 90 days."
  },
  {
    question: "How does LOLLY AGENCY ensure my privacy and safety?",
    answer: "Your privacy and security are non-negotiable. We use encrypted communication channels, strict confidentiality agreements, and never share subscriber data. Your account credentials are protected with industry-standard security. We only access your account to manage strategy execution—chatting, content timing, and analytics review. You maintain full control and can revoke access anytime."
  },
  {
    question: "What is your commission or fee structure?",
    answer: "We operate on a performance-based commission model. Instead of upfront fees, we take a percentage of the revenue we help you generate. This aligns our incentives with yours—we only succeed when you succeed. Exact percentages vary based on your account tier, growth goals, and level of service. We'll discuss pricing during your private strategy session."
  },
  {
    question: "What kind of growth can I expect with LOLLY AGENCY?",
    answer: "Growth varies by starting point, niche, and engagement. Most creators see 200-400% revenue increase within 90 days. Some top performers have achieved 1000%+ growth. Realistic expectations: increased subscriber retention, 3-5x higher PPV conversion rates, consistent daily PPV sales, and more predictable monthly revenue. We focus on sustainable, compound growth—not vanity metrics."
  },
  {
    question: "How do you help with content creation and curation?",
    answer: "Our team doesn't create content for you—that's your creative domain. Instead, we strategize when and how to release content for maximum impact. We optimize content timing based on your fan behavior, create PPV scripting templates that convert, suggest content themes that resonate with your audience, and manage the promotional side. You create; we amplify and monetize."
  },
  {
    question: "How quickly can I start earning money after joining LOLLY AGENCY?",
    answer: "Most creators see meaningful revenue increase within the first 30 days. Our chatter team begins engagement immediately, and PPV conversion optimizations take effect within 7-14 days. However, compound results build over 90 days as we refine your strategy, grow your subscriber base quality, and establish fan relationship patterns. Quick wins are possible, but lasting growth requires consistent execution."
  },
  {
    question: "What success stories can LOLLY AGENCY share from models who have joined?",
    answer: "We've worked with luxury creators who increased revenue from $8K to $40K+ monthly. Content creators grew their fan base by 300% while improving quality and engagement. Retention models decreased churn by 60% and doubled fan lifetime value. PPV specialists went from inconsistent sales to $3K-$8K daily PPV revenue. While results vary, consistent execution with our system yields significant growth across all creator types."
  },
  {
    question: "How can I get started with LOLLY AGENCY?",
    answer: "Simple: Apply through our website. We'll review your application and schedule a private strategy session. During the call, we'll analyze your current account, discuss your goals, explain our approach, and create a custom growth plan. If it's a fit, we'll onboard you and start driving results. Most creators go from application to first chatter engagement within 3-5 business days."
  }
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

  },
  {
    name: "Creator Two",
    src: "/creators/stat2.JPG",
   
  },
  {
    name: "Creator Three",
    src: "/creators/stat3.png",

  },
];

export default function HomePage() {
  const [activePanel, setActivePanel] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const [formNote, setFormNote] = useState("");
  const [preloaderHidden, setPreloaderHidden] = useState(false);

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

    const sections = Array.from(document.querySelectorAll("main > section"));
    sections.forEach((section, index) => {
      section.classList.add("reveal", "section-motion", `motion-${index % 2 === 0 ? "left" : "right"}`);
      section.style.setProperty("--section-index", index);
    });

    const revealTargets = [
      ...sections,
      ...Array.from(document.querySelectorAll(".panel, .creator-card, .faq-item, .contact-highlights div, .form-field, .agency-field, .contact-submit")),
    ];

    revealTargets.forEach((el, index) => {
      el.classList.add("reveal");
      el.style.setProperty("--reveal-order", index % 8);
    });

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
      <div className="background-photo" style={{ backgroundImage: `url(${SOFT_BG_SRC})` }} aria-hidden="true" />

      <a href="https://instagram.com/lollymgmt" target="_blank" rel="noopener noreferrer" className="instagram-icon" aria-label="Follow LOLLY AGENCY on Instagram">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12c0-3.403 2.759-6.162 6.162-6.162 3.403 0 6.162 2.759 6.162 6.162 0 3.403-2.759 6.162-6.162 6.162-3.403 0-6.162-2.759-6.162-6.162zm2.889 0c0 1.821 1.453 3.276 3.273 3.276 1.821 0 3.276-1.455 3.276-3.276 0-1.82-1.455-3.273-3.276-3.273-1.82 0-3.273 1.453-3.273 3.273zm10.354-6.558c0 .795.645 1.44 1.44 1.44.795 0 1.44-.645 1.44-1.44-.001-.795-.645-1.44-1.44-1.44-.795 0-1.44.645-1.44 1.44z"/>
        </svg>
      </a>

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
            <p>Questions & Answers</p>
            <h2 className="faq-heading">
              <span>Frequently Asked Questions.</span>
              <span className="bra-icon" aria-hidden="true">
                <svg viewBox="0 0 96 64" role="img" focusable="false">
                  <path className="bra-strap" d="M15 31C19 16 28 9 42 9" />
                  <path className="bra-strap" d="M81 31C77 16 68 9 54 9" />
                  <path className="bra-cup" d="M10 31C17 22 29 20 39 27C45 31 47 39 47 51C34 55 18 51 10 31Z" />
                  <path className="bra-cup" d="M86 31C79 22 67 20 57 27C51 31 49 39 49 51C62 55 78 51 86 31Z" />
                  <path className="bra-band" d="M42 36C46 39 50 39 54 36" />
                  <path className="bra-band" d="M8 31H2" />
                  <path className="bra-band" d="M94 31H88" />
                </svg>
              </span>
            </h2>
          </div>

          <div className="faq-container">
            {faqs.map((faq, index) => (
              <article className={`faq-item${activeFaq === index ? " open" : ""}`} key={faq.question}>
                <button 
                  className="faq-question"
                  onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                  aria-expanded={activeFaq === index}
                  data-magnetic
                >
                  <span className="faq-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="faq-text">{faq.question}</span>
                  <span className="faq-toggle" aria-hidden="true" />
                </button>
                {activeFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-layout">
            <div className="contact-copy">
              <div className="section-title">
                <p>Contact Lolly</p>
                <h2>Let us scale your account while you stay in your creative zone.</h2>
              </div>
              <div className="contact-highlights" aria-label="Lolly contact highlights">
                <div>
                  <strong>24h</strong>
                  <span>Private review</span>
                </div>
                <div>
                  <strong>3-5d</strong>
                  <span>Onboarding window</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>Confidential process</span>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={onSubmit}>
              <div className="form-row">
                <label className="form-field">
                  <span>First Name</span>
                  <input type="text" name="firstName" placeholder="First name" required />
                </label>
                <label className="form-field">
                  <span>Last Name</span>
                  <input type="text" name="lastName" placeholder="Last name" required />
                </label>
              </div>

              <div className="form-row">
                <label className="form-field">
                  <span>Email</span>
                  <input type="email" name="email" placeholder="you@brand.com" required />
                </label>
                <label className="form-field">
                  <span>Phone</span>
                  <input type="tel" name="phone" placeholder="+1 555 555 5555" required />
                </label>
              </div>

              <label className="form-field">
                <span>Instagram Handle / URL</span>
                <input type="text" name="instagram" placeholder="@yourhandle or https://instagram.com/you" />
              </label>

              <fieldset className="agency-field">
                <legend>Have you worked with an agency?</legend>
                <div className="radio-row">
                  <label><input type="radio" name="workedWithAgency" value="yes" /> <span>Yes</span></label>
                  <label><input type="radio" name="workedWithAgency" value="no" defaultChecked /> <span>No</span></label>
                </div>
              </fieldset>

              <label className="form-field">
                <span>OnlyFans link</span>
                <input type="url" name="onlyfans" placeholder="https://onlyfans.com/yourprofile" />
              </label>

              <label className="form-field">
                <span>Monthly revenue</span>
                <select name="monthlyRevenue">
                  <option value="0-4999">0 - 4,999</option>
                  <option value="5000-19999">5,000 - 19,999</option>
                  <option value="20000-49999">20,000 - 49,999</option>
                  <option value="50000+">50,000+</option>
                </select>
              </label>

              <label className="form-field">
                <span>About yourself</span>
                <textarea name="about" rows="4" placeholder="Tell us about your content, goals, and challenges" />
              </label>

              <button className="primary contact-submit" type="submit" data-magnetic>
                Request Private Strategy Session
              </button>
              <p className="form-note" aria-live="polite">
                {formNote}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <strong>2026 Lolly Agency</strong>
        <p>Private OnlyFans management, growth strategy, and creator support.</p>
      </footer>
    </>
  );
}
