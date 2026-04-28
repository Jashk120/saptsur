```javascript
import { useState, useEffect, useRef } from "react";

import ssvLogo      from "./assets/ssv-logo.jpeg";
import saptsurImg   from "./assets/saptsur.png";
import lataHeroImg  from "./assets/lata-hero.png";
import lataMiddImg  from "./assets/Lata_Young.jfif";
import lataYoungImg from "./assets/Lata_MID.jfif";
import iprogLogo    from "./assets/I_Prog_LOGO.jpeg";
import aahLogo      from "./assets/Adhar_ashram_logo.webp"

const SSV_LOGO    = ssvLogo;
const WRI_LOGO    = aahLogo; // replace with wriLogo import when available
const IPROG_LOGO  = iprogLogo;
const SAPTSUR_IMG = saptsurImg;
const LATA_HERO   = lataHeroImg;
const LATA_YOUNG  = lataYoungImg;
const LATA_MIDDLE = lataMiddImg;
const LATA_OLD    = LATA_HERO;

const GITHUB_CONFIG_URL = "https://raw.githubusercontent.com/Jashk120/config/refs/heads/main/config.json";

const LATA_LIFE = [
  {
    era: "The Early Years",
    years: "1929 – 1948",
    img: LATA_YOUNG,
    summary:
      "Born Hema Mangeshkar on 28 September 1929 in Indore, she showed musical genius from childhood. Her father, Mast.Pt.Dinanath  — a celebrated Marathi classical singer and theatre actor — began training her before she could read. She performed on stage before the age of five. After his untimely death in 1942, a thirteen-year-old Lata shouldered the family's survival, singing in Marathi and Hindi films to support her mother and four younger siblings. Her pure, crystalline voice caught immediate attention in Bombay's film industry, and she began recording professionally by 1945 — launching what would become the longest and most celebrated career in Indian music history.",
  },
  {
    era: "The Golden Voice",
    years: "1949 – 1972",
    img: LATA_MIDDLE,
    summary:
      "With Mahal (1949) and the unforgettable 'Ayega Aanewala', Lata became a household name overnight. Through the 1950s and 60s she lent her voice to virtually every leading actress — Nargis, Meena Kumari, Waheeda Rehman, Sadhana — and collaborated with the greatest composers of the golden era: Naushad, S.D. Burman, Shankar-Jaikishan, Madan Mohan and Laxmikant-Pyarelal. In 1963, her live rendition of 'Ae Mere Watan Ke Logo' moved Prime Minister Nehru to tears. In 1969, she made the extraordinary gesture of giving up the Filmfare Award permanently — to give space to newer voices. By this era she was beyond comparison — the undisputed Nightingale of India.",
  },
  {
    era: "Legacy & Legend",
    years: "1973 – 2022",
    img: LATA_OLD,
    summary:
      "In 1974, Lata became the first Indian playback singer to perform at the Royal Albert Hall, London. That same year, the Guinness Book of Records named her the most recorded artist in history. She received the Dadasaheb Phalke Award in 1989, the Padma Vibhushan in 1999, and the Bharat Ratna in 2001 — becoming only the second vocalist in India ever to receive the nation's highest civilian honour. France honoured her with the Legion of Honour in 2007. She sang in over 36 languages across eight decades — and on 6 February 2022, the voice that had defined an era fell silent at 92. But no silence can ever contain it.",
  },
];
const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@300;400;500&display=swap";

  // ── CAUSE ─────────────────────────────────────────────────────────────────────
const CAUSE_ORGS = [
  {
    name: "I Progress Foundation",
    logo: IPROG_LOGO,
    desc: "A charitable organisation working for the development of specially-abled individuals who live immersed in a world of their own.",
    emoji: "🌱",
  },
  {
    name: "Aadhar Old Age Home",
    logo: WRI_LOGO,
    desc: "Providing shelter and care to 25 elderly residents — men and women — in Chhatrapati Sambhajinagar.",
    emoji: "🏡",
  },
];

const CAUSE_TEXT_MR =
  "प्रिय रसिकहो, आम्ही तुम्हाला एका सामाजिक कार्यासाठी साद घालतो. आपण असे अनेक व्यक्तींसोबत हे जग सामायिक करतो जे पूर्णपणे स्वतःच्याच विश्वात रममाण असतात. अशा विशेष व्यक्तींच्या विकासासाठी आय प्रोग्रेस फाउंडेशन आपल्या शहरात सक्रियपणे कार्यरत आहे. याशिवाय, पंचवीस (25) वृद्ध स्त्री-पुरुष रहिवाशांना छत्रपती संभाजीनगर येथील आधार वृद्धाश्रमात आश्रय मिळत आहे. आम्ही आमच्या कलेच्या माध्यमातून सेवा करण्याचा एक नम्र प्रयत्न करत आहोत.";
const CAUSE_TEXT_EN =
  "Dear Patrons, we reach out to you for a social cause. We share this world with many individuals who live immersed in a universe entirely their own. To foster the development of such special individuals, the I Progress Foundation is actively working within our city. Additionally, twenty-five elderly residents are finding shelter at the Aadhar Old Age Home in Chhatrapati Sambhajinagar. We are making a humble attempt to serve through the medium of our art.";

const CAUSE_CTA_URL = "https://in.bookmyshow.com/events/tere-sur-aur-mere-geet-2026/ET00491309";

// ── hooks ─────────────────────────────────────────────────────────────────────

/**
 * Custom hook that detects when an element becomes visible in the viewport.
 *
 * @returns An array containing a ref object and a boolean visibility state.
 */
function useReveal() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const check = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        setVis(true);
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);
  return [ref, vis];
}

/**
 * Custom hook that calculates and returns a countdown object for a given date string.
 *
 * @param dateStr - The target date string.
 * @returns An object with days, hours, minutes, and seconds properties.
 */
function useCountdown(dateStr) {
  const [p, setP] = useState({ d:"--", h:"--", m:"--", s:"--" });
  useEffect(() => {
    if (!dateStr) return;
    const target = new Date(dateStr + "T18:00:00").getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setP({ d:"00",h:"00",m:"00",s:"00" }); return; }
      setP({
        d: String(Math.floor(diff / 86400000)).padStart(2,"0"),
        h: String(Math.floor(diff / 3600000) % 24).padStart(2,"0"),
        m: String(Math.floor(diff / 60000) % 60).padStart(2,"0"),
        s: String(Math.floor(diff / 1000) % 60).padStart(2,"0"),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [dateStr]);
  return p;
}

/**
 * Formats a date string into a human-readable Indian English locale date string.
 *
 * @param str - The date string to format.
 * @returns The formatted date string, or an empty string if input is falsy.
 */
function fmtDate(str) {
  if (!str) return "";
  return new Date(str + "T12:00:00").toLocaleDateString("en-IN", {
    weekday:"long", year:"numeric", month:"long", day:"numeric",
  });
}

const STARS = Array.from({ length: 70 }, (_, i) => ({
  id:i, left:Math.random()*100, top:Math.random()*100,
  dur:2+Math.random()*4, delay:Math.random()*5, big:Math.random()>.82,
}));

// ── primitives ────────────────────────────────────────────────────────────────

/**
 * A component that reveals its children with a fade-in and slide-up animation when scrolled into view.
 *
 * @param children - The content to reveal.
 * @param delay - Optional animation delay in seconds.
 * @param style - Optional additional inline styles.
 * @returns The Reveal component.
 */
function Reveal({ children, delay=0, style={} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(40px)", transition:`opacity .9s ${delay}s ease,transform .9s ${delay}s ease`, ...style }}>
      {children}
    </div>
  );
}

/**
 * A decorative divider component with a diamond-shaped gold element.
 *
 * @returns The Divider component.
 */
function Divider() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"1.5rem", padding:"0 clamp(1rem,5vw,5rem)", margin:"0.5rem 0" }}>
      <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,rgba(201,168,76,.3),transparent)" }}/>
      <div style={{ width:7, height:7, background:"var(--gold)", transform:"rotate(45deg)", boxShadow:"0 0 10px rgba(201,168,76,.5)" }}/>
      <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,rgba(201,168,76,.3),transparent)" }}/>
    </div>
  );
}

/**
 * A label component styled for section headings.
 *
 * @param children - The label text content.
 * @returns The SectionLabel component.
 */
function SectionLabel({ children }) {
  return (
    <div style={{ fontFamily:"'Cinzel',serif", fontSize:"0.95rem", letterSpacing:"0.6em", color:"var(--gold)", textTransform:"uppercase", marginBottom:"0.6rem" }}>
      {children}
    </div>
  );
}

/**
 * A component that applies a shimmering gold gradient effect to its children text.
 *
 * @param children - The text content to highlight.
 * @returns The GoldEm component.
 */
function GoldEm({ children }) {
  return (
    <em style={{ fontStyle:"italic", fontSize:"1.15em", background:"linear-gradient(90deg,var(--gold),var(--gold-pale),var(--gold))", backgroundSize:"200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"shimmer 3s linear infinite" }}>
      {children}
    </em>
  );
}

/**
 * A section title component with a specific font and size.
 *
 * @param children - The title text content.
 * @returns The SectionTitle component.
 */
function SectionTitle({ children }) {
  return (
    <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.2rem,4vw,3.6rem)", fontWeight:300, lineHeight:1.15, marginBottom:"2rem" }}>
      {children}
    </h2>
  );
}

/**
 * A circular portrait component with decorative glowing rings and an optional fallback.
 *
 * @param src - The image source URL.
 * @param alt - The alt text for the image.
 * @param size - The size of the portrait circle.
 * @param glowColor - The color of the glow effect.
 * @returns The PortraitCircle component.
 */
function PortraitCircle({ src, alt, size="min(300px,72vw)", glowColor="rgba(201,168,76,.18)" }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center", width:size, height:size, flexShrink:0 }}>
      <div style={{ position:"absolute", inset:-22, borderRadius:"50%", background:`radial-gradient(circle,${glowColor} 0%,transparent 68%)`, animation:"breathe 4.5s ease-in-out infinite" }}/>
      <div style={{ position:"absolute", inset:-9, borderRadius:"50%", border:"1px solid rgba(201,168,76,.22)" }}/>
      <div style={{ position:"absolute", inset:-3, borderRadius:"50%", border:"1px solid rgba(201,168,76,.48)" }}/>
      <div style={{ position:"absolute", inset:-18, borderRadius:"50%", border:"1px solid transparent", borderTopColor:"rgba(201,168,76,.38)", animation:"spin 14s linear infinite" }}/>
      <div style={{ position:"absolute", inset:-30, borderRadius:"50%", border:"1px solid transparent", borderTopColor:"rgba(201,168,76,.14)", animation:"spin 22s linear infinite reverse" }}/>
      {!err
        ? <img src={src} alt={alt} onError={()=>setErr(true)}
            style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover", objectPosition:"center top", border:"2px solid rgba(201,168,76,.65)", boxShadow:"0 0 50px rgba(201,168,76,.22),0 0 100px rgba(201,168,76,.07)", display:"block", filter:"sepia(10%) contrast(1.06) brightness(.95)" }}
          />
        : <div style={{ width:"100%", height:"100%", borderRadius:"50%", background:"linear-gradient(135deg,rgba(122,28,46,.3),rgba(201,168,76,.08))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"3.5rem" }}>🎵</div>
      }
    </div>
  );
}

/**
 * A component that displays a horizontal bar of organizer logos and names.
 *
 * @param organizers - An array of organizer objects with name, logoUrl, and short properties.
 * @returns The OrganizersBar component, or null if no organizers are provided.
 */
function OrganizersBar({ organizers }) {
  if (!organizers?.length) return null;
  return (
    <Reveal>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "2rem",
        padding: "4rem clamp(1rem,5vw,5rem)",
        borderBottom: "1px solid rgba(201,168,76,.1)"
      }}>
        {organizers.map((org, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center" }}>

            {/* Divider — hidden on mobile via small screens */}
            {i > 0 && (
              <div className="org-divider" style={{
                width: 1,
                height: 110,
                background: "linear-gradient(180deg,transparent,rgba(201,168,76,.35),transparent)",
                margin: "0 clamp(1rem,3vw,3rem)",
                flexShrink: 0,
              }}/>
            )}

            {/* Org card — fluid width on mobile */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              width: "clamp(100px,20vw,180px)",
            }}>

              {/* Logo */}
              <div style={{
                width: i === 1 ? "clamp(110px,22vw,190px)" : "clamp(90px,18vw,150px)",
                height: i === 1 ? "clamp(110px,22vw,190px)" : "clamp(90px,18vw,150px)",
                borderRadius: "50%",
                border: "2px solid rgba(201,168,76,.55)",
                background: "radial-gradient(circle at 38% 35%,rgba(201,168,76,.15),rgba(201,168,76,.03))",
                display: "flex",
                alignItems