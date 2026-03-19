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
function Reveal({ children, delay=0, style={} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(40px)", transition:`opacity .9s ${delay}s ease,transform .9s ${delay}s ease`, ...style }}>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"1.5rem", padding:"0 clamp(1rem,5vw,5rem)", margin:"0.5rem 0" }}>
      <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,rgba(201,168,76,.3),transparent)" }}/>
      <div style={{ width:7, height:7, background:"var(--gold)", transform:"rotate(45deg)", boxShadow:"0 0 10px rgba(201,168,76,.5)" }}/>
      <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,rgba(201,168,76,.3),transparent)" }}/>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontFamily:"'Cinzel',serif", fontSize:"0.95rem", letterSpacing:"0.6em", color:"var(--gold)", textTransform:"uppercase", marginBottom:"0.6rem" }}>
      {children}
    </div>
  );
}

function GoldEm({ children }) {
  return (
    <em style={{ fontStyle:"italic", fontSize:"1.15em", background:"linear-gradient(90deg,var(--gold),var(--gold-pale),var(--gold))", backgroundSize:"200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"shimmer 3s linear infinite" }}>
      {children}
    </em>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2.2rem,4vw,3.6rem)", fontWeight:300, lineHeight:1.15, marginBottom:"2rem" }}>
      {children}
    </h2>
  );
}

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
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                boxShadow: "0 0 36px rgba(201,168,76,.22), 0 0 12px rgba(201,168,76,.12)",
                flexShrink: 0,
              }}>
                {org.logoUrl
                  ? <img src={org.logoUrl} alt={org.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                  : <span style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(12px,3vw,20px)", fontWeight:700, color:"var(--gold)", textAlign:"center", lineHeight:1.35, padding:"0 8px" }}>
                      {org.short || org.name.split(" ").map(w=>w[0]).join("")}
                    </span>
                }
              </div>

              {/* Name */}
              <span style={{
                fontFamily: "'Cinzel',serif",
                fontSize: "clamp(9px,2vw,15px)",
                letterSpacing: "2px",
                color: "var(--gold-light)",
                textAlign: "center",
                textTransform: "uppercase",
                lineHeight: 1.8,
                maxWidth: "clamp(80px,18vw,160px)",
                textShadow: "0 0 12px rgba(201,168,76,.4)",
              }}>
                {org.name}
              </span>

            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
// ── LATA LIFE ─────────────────────────────────────────────────────────────────
function LataLifeSection() {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} id="legacy" style={{ padding:"5rem clamp(1rem,5vw,5rem)", maxWidth:1200, margin:"0 auto", opacity:vis?1:0, transform:vis?"none":"translateY(48px)", transition:"opacity .9s ease,transform .9s ease" }}>
      <SectionLabel>Her Journey</SectionLabel>
      <SectionTitle>The Voice That <GoldEm>Defined a Nation</GoldEm></SectionTitle>
      <p style={{ color:"var(--text-dim)", maxWidth:680, marginBottom:"4rem", fontSize:"clamp(1.1rem,2vw,1.25rem)", lineHeight:2 }}>
        Eight decades. Thirty-six languages. Thirty thousand songs. One voice that became the soundtrack of India's joys, sorrows, and everything in between.
      </p>
      <div style={{ display:"flex", flexDirection:"column", gap:"5rem" }}>
        {LATA_LIFE.map((phase, i) => (
          <LifePhaseRow key={i} phase={phase} flip={i % 2 !== 0} index={i}/>
        ))}
      </div>
    </section>
  );
}

function LifePhaseRow({ phase, flip, index }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      display:"grid",
      gridTemplateColumns:"repeat(auto-fit,minmax(min(280px,100%),1fr))",
      gap:"2.5rem",
      alignItems:"center",
      opacity:vis?1:0,
      transform:vis?"translateY(0)":"translateY(40px)",
      transition:`opacity .9s ${index*.18}s ease,transform .9s ${index*.18}s ease`,
    }}>
      {/* Image */}
      <div className="life-img" style={{ order: flip ? 2 : 1, display:"flex", justifyContent:"center" }}>
        <PortraitCircle src={phase.img} alt={phase.era} size="min(260px,60vw)"/>
      </div>
      {/* Text */}
      <div className="life-text" style={{ order: flip ? 1 : 2 }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:"0.95rem", letterSpacing:"0.5em", color:"var(--gold)", opacity:.75, textTransform:"uppercase", marginBottom:"0.75rem" }}>{phase.years}</div>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.8rem,3vw,2.8rem)", fontWeight:300, lineHeight:1.15, marginBottom:"1.25rem" }}>
          <GoldEm>{phase.era}</GoldEm>
        </h3>
        <div style={{ width:50, height:1, background:"var(--gold)", opacity:.4, marginBottom:"1.5rem" }}/>
        <p style={{ color:"var(--text-dim)", lineHeight:2, fontSize:"clamp(1.05rem,1.8vw,1.2rem)" }}>{phase.summary}</p>
      </div>
    </div>
  );
}

// ── SONGS ─────────────────────────────────────────────────────────────────────
function SongsSection({ songs }) {
  const [ref, vis] = useReveal();
  if (!songs?.length) return null;
  return (
    <section ref={ref} id="songs" style={{ padding:"5rem clamp(1rem,5vw,5rem)", maxWidth:1200, margin:"0 auto", opacity:vis?1:0, transform:vis?"none":"translateY(48px)", transition:"opacity .9s ease,transform .9s ease" }}>
      <SectionLabel>The Setlist</SectionLabel>
      <SectionTitle>{songs.length} Songs. <GoldEm>One Night.</GoldEm></SectionTitle>
      <p style={{ color:"var(--text-dim)", maxWidth:540, marginBottom:"2.5rem", fontSize:"clamp(0.9rem,2vw,1.05rem)", lineHeight:1.8 }}>
        From the silver screen to the soul of India — every song a prayer, every note a memory. Performed live across multiple languages.
      </p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(280px,100%),1fr))", gap:1, background:"rgba(201,168,76,.08)", border:"1px solid rgba(201,168,76,.08)" }}>
        {songs.map((s,i) => <SongCard key={i} song={s} index={i}/>)}
      </div>
    </section>
  );
}

function SongCard({ song, index }) {
  const [hov, setHov] = useState(false);
  const bars = [14,28,20,36,10,24,18];
  return (
    <div
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      onTouchStart={()=>setHov(true)}  onTouchEnd={()=>setHov(false)}
      style={{ background:hov?"rgba(201,168,76,.05)":"#0a0a14", padding:"1.1rem 1.25rem", display:"flex", alignItems:"flex-start", gap:"1rem", transition:"background .3s", cursor:"default" }}>
      <span style={{ fontFamily:"'Cinzel',serif", fontSize:"0.55rem", color:"var(--gold)", opacity:.45, minWidth:"1.8rem", paddingTop:3 }}>{String(index+1).padStart(2,"0")}</span>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(0.95rem,2vw,1.05rem)", fontWeight:500, color:"var(--ivory)", marginBottom:2 }}>{song.title}</div>
        <div style={{ fontSize:"0.75rem", color:"var(--text-dim)", fontStyle:"italic", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{song.film}</div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:2, height:32, marginLeft:"auto", flexShrink:0 }}>
        {bars.map((h,j)=><div key={j} style={{ width:3, height:hov?h:5, background:"var(--gold)", opacity:hov?.65:.18, borderRadius:2, transition:`height ${.12+j*.05}s ease` }}/>)}
      </div>
    </div>
  );
}

// ── PERFORMERS ────────────────────────────────────────────────────────────────
function PerformersSection({ performers }) {
  const [ref, vis] = useReveal();
  const visible = performers?.filter(p => p.performer === true);
  if (!visible?.length) return null;

  return (
    <section ref={ref} id="performers" style={{ padding:"5rem clamp(1rem,5vw,5rem)", maxWidth:1200, margin:"0 auto", opacity:vis?1:0, transform:vis?"none":"translateY(48px)", transition:"opacity .9s ease,transform .9s ease" }}>
      <SectionLabel>The Artists</SectionLabel>
      <SectionTitle>Honouring <GoldEm>the Legend</GoldEm></SectionTitle>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}>
        {visible.map((p, i) => <PerformerCard key={i} p={p}/>)}
      </div>
    </section>
  );
}

function PerformerCard({ p }) {
  const [hov, setHov] = useState(false);
  const hasImg = p.imgUrl && p.imgUrl.trim() !== "";

  const card = (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: "100%",
        border: `1px solid ${hov ? "rgba(201,168,76,.45)" : "rgba(201,168,76,.14)"}`,
        background: hov ? "rgba(201,168,76,.05)" : "rgba(201,168,76,.02)",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? "0 12px 40px rgba(201,168,76,.1)" : "none",
        transition: "all .4s ease",
        cursor: p.url ? "pointer" : "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corner accents */}
      <div style={{ position:"absolute", top:6, left:6, width:10, height:10, borderTop:"1px solid rgba(201,168,76,.4)", borderLeft:"1px solid rgba(201,168,76,.4)", zIndex:2 }}/>
      <div style={{ position:"absolute", top:6, right:6, width:10, height:10, borderTop:"1px solid rgba(201,168,76,.4)", borderRight:"1px solid rgba(201,168,76,.4)", zIndex:2 }}/>
      <div style={{ position:"absolute", bottom:6, left:6, width:10, height:10, borderBottom:"1px solid rgba(201,168,76,.4)", borderLeft:"1px solid rgba(201,168,76,.4)", zIndex:2 }}/>
      <div style={{ position:"absolute", bottom:6, right:6, width:10, height:10, borderBottom:"1px solid rgba(201,168,76,.4)", borderRight:"1px solid rgba(201,168,76,.4)", zIndex:2 }}/>

      {/* Top accent line */}
      <div style={{ height:1, background:`linear-gradient(90deg,transparent,${hov?"rgba(201,168,76,.7)":"rgba(201,168,76,.25)"},transparent)`, transition:"background .4s" }}/>

      {/* Row layout — photo left, text right, always */}
      <div style={{ padding:"1rem 1.25rem", display:"flex", flexDirection:"row", alignItems:"center", gap:"1.25rem" }}>

        {/* Avatar */}
        <div style={{ position:"relative", flexShrink:0 }}>
          <div style={{ position:"absolute", inset:-5, borderRadius:"50%", background:`radial-gradient(circle,${hov?"rgba(201,168,76,.2)":"rgba(201,168,76,.08)"} 0%,transparent 70%)`, transition:"background .4s" }}/>
          <div style={{ position:"absolute", inset:-2, borderRadius:"50%", border:`1px solid ${hov?"rgba(201,168,76,.5)":"rgba(201,168,76,.2)"}`, transition:"border-color .4s" }}/>
          {hasImg
            ? <img src={p.imgUrl} alt={p.name} style={{ width:64, height:64, borderRadius:"50%", objectFit:"cover", objectPosition:"center top", border:"2px solid rgba(201,168,76,.45)", display:"block", position:"relative", zIndex:1 }}/>
            : <div style={{ width:64, height:64, borderRadius:"50%", background:"linear-gradient(135deg,rgba(201,168,76,.15),rgba(122,28,46,.15))", border:"2px solid rgba(201,168,76,.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem", position:"relative", zIndex:1 }}>
                {p.emoji || "🎵"}
              </div>
          }
        </div>

        {/* Text content */}
        <div style={{ flex:1, minWidth:0 }}>

          {/* Name + Role on same line */}
          <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:"0.6rem", marginBottom:"0.4rem" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1rem,2vw,1.25rem)", fontWeight:600, color:"var(--ivory)", letterSpacing:"0.04em", lineHeight:1.2 }}>
              {p.name}
            </div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"0.3rem", background:"rgba(201,168,76,.08)", border:"1px solid rgba(201,168,76,.2)", borderRadius:100, padding:"0.2rem 0.65rem" }}>
              <div style={{ width:3, height:3, borderRadius:"50%", background:"var(--gold)", opacity:.8 }}/>
              <span style={{ fontFamily:"'Cinzel',serif", fontSize:"0.55rem", letterSpacing:"0.18em", color:"var(--gold)", textTransform:"uppercase" }}>
                {p.role}
              </span>
            </div>
          </div>

          {/* Desc */}
          {p.desc && (
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"clamp(0.82rem,1.5vw,0.92rem)", color:"var(--text-dim)", lineHeight:1.65, letterSpacing:"0.02em" }}>
              {p.desc}
            </div>
          )}

          {/* Link hint */}
          {p.url && (
            <div style={{ marginTop:"0.5rem", fontFamily:"'Cinzel',serif", fontSize:"0.55rem", letterSpacing:"0.2em", color: hov ? "var(--gold)" : "var(--text-dim)", textTransform:"uppercase", transition:"color .3s" }}>
              View Profile →
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (p.url) {
    return (
      <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
        {card}
      </a>
    );
  }
  return card;
}

// ── VENUE ─────────────────────────────────────────────────────────────────────
function VenueSection({ venue }) {
  const [ref, vis] = useReveal();
  if (!venue?.name) return null;
  return (
    <section ref={ref} id="venue" style={{ padding:"5rem clamp(1rem,5vw,5rem)", maxWidth:1200, margin:"0 auto", opacity:vis?1:0, transform:vis?"none":"translateY(48px)", transition:"opacity .9s ease,transform .9s ease" }}>
      <SectionLabel>The Stage</SectionLabel>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(min(280px,100%),1fr))", gap:"3rem", alignItems:"center" }}>
        <div>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(2rem,3vw,3rem)", fontWeight:400, marginBottom:12 }}>{venue.name}</h3>
          {venue.address && <div style={{ fontFamily:"'Cinzel',serif", fontSize:"0.95rem", letterSpacing:"0.2em", color:"var(--gold)", textTransform:"uppercase", marginBottom:"1.25rem", lineHeight:1.8 }}>{venue.address}</div>}
          {venue.city    && <div style={{ fontFamily:"'Cinzel',serif", fontSize:"0.9rem", letterSpacing:"0.2em", color:"var(--gold)", opacity:.75, textTransform:"uppercase", marginBottom:"1rem" }}>{venue.city}</div>}
          {venue.description && <p style={{ color:"var(--text-dim)", lineHeight:2, fontSize:"clamp(1.05rem,1.8vw,1.2rem)" }}>{venue.description}</p>}
          {venue.mapsUrl && (
            <a href={venue.mapsUrl} target="_blank" rel="noreferrer"
              style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", marginTop:"1.5rem", fontFamily:"'Cinzel',serif", fontSize:"0.95rem", letterSpacing:"0.2em", color:"var(--gold)", textDecoration:"none", borderBottom:"1px solid rgba(201,168,76,.3)", paddingBottom:2, textTransform:"uppercase" }}
            >📍 Open in Maps</a>
          )}
        </div>
        <div style={{ aspectRatio:"4/3", background:"linear-gradient(135deg,rgba(26,74,74,.35),rgba(13,13,34,.85))", border:"1px solid rgba(201,168,76,.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"7rem", position:"relative" }}>
          <div style={{ position:"absolute", inset:20, border:"1px solid rgba(201,168,76,.07)" }}/>🏛
        </div>
      </div>
    </section>
  );
}

// ── SCHEDULE ──────────────────────────────────────────────────────────────────
function ScheduleSection({ schedule }) {
  const [ref, vis] = useReveal();
  if (!schedule?.length) return null;
  return (
    <section ref={ref} id="schedule" style={{ padding:"5rem clamp(1rem,5vw,5rem)", maxWidth:1200, margin:"0 auto", opacity:vis?1:0, transform:vis?"none":"translateY(48px)", transition:"opacity .9s ease,transform .9s ease" }}>
      <SectionLabel>The Evening</SectionLabel>
      <SectionTitle>An <GoldEm>Unforgettable</GoldEm> Night</SectionTitle>
      {schedule.map((s,i)=><ScheduleRow key={i} s={s}/>)}
    </section>
  );
}

function ScheduleRow({ s }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:"grid", gridTemplateColumns:"90px 1fr", gap:"1.25rem", padding:`1.2rem 0 1.2rem ${hov?"0.75rem":"0"}`, borderBottom:"1px solid rgba(201,168,76,.08)", transition:"padding .3s ease" }}>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:"0.58rem", letterSpacing:"0.12em", color:"var(--gold)", paddingTop:3 }}>{s.time}</div>
      <div>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1rem,2vw,1.2rem)", color:"var(--ivory)", marginBottom:2 }}>{s.name}</div>
        {s.desc && <div style={{ fontSize:"0.82rem", color:"var(--text-dim)" }}>{s.desc}</div>}
      </div>
    </div>
  );
}

// ── TICKETS ───────────────────────────────────────────────────────────────────
function TicketsSection({ tickets }) {
  const [ref, vis] = useReveal();
  if (!tickets?.length) return null;
  return (
    <section ref={ref} id="tickets" style={{ padding:"5rem clamp(1rem,5vw,5rem)", textAlign:"center", background:"linear-gradient(180deg,transparent,rgba(201,168,76,.02),transparent)", opacity:vis?1:0, transform:vis?"none":"translateY(48px)", transition:"opacity .9s ease,transform .9s ease" }}>
      <SectionLabel>Reserve Your Place</SectionLabel>
      <SectionTitle>Be Part of <GoldEm>History</GoldEm></SectionTitle>
     <div className="tickets-grid" style={{ display:"flex", justifyContent:"center", gap:"1.5rem", flexWrap:"wrap", marginTop:"2.5rem" }}>
        {tickets.map((t, i) => (
          <div key={i} style={{ paddingTop: "16px" }}>
            <TicketCard t={t} />
          </div>
        ))}
      </div>
    </section>
  );
}

function TicketCard({ t }) {
  const [hov, setHov] = useState(false);

  const availColor = { available: "#4caf6e", limited: "#c9a84c", soldout: "#e24b4a" };

  return (
    <div
      className="ticket-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "min(240px,90vw)", padding: "2rem 1.5rem 1.5rem",
        border: t.featured ? "1.5px solid var(--gold)" : "0.5px solid rgba(201,168,76,.25)",
        borderRadius: 2, position: "relative",
        background: "var(--surface)",
        transform: hov ? "translateY(-5px)" : "none",
        transition: "transform .3s ease",
        textAlign: "left",
      }}>

      {t.badge && (
        <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)",
          background:"var(--gold)", color:"#1a0e02", fontFamily:"'Cinzel',serif",
          fontSize:"9px", letterSpacing:".18em", padding:"4px 14px", borderRadius:1,
          whiteSpace:"nowrap" }}>
          {t.badge}
        </div>
      )}

      <div style={{ fontFamily:"'Cinzel',serif", fontSize:"9px", letterSpacing:".35em",
        color:"var(--gold)", textTransform:"uppercase", marginBottom:"1.25rem" }}>
        {t.tier}
      </div>

      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"3rem",
        fontWeight:300, color:"var(--ivory)", lineHeight:1 }}>
        {t.price}
      </div>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize:"8px", letterSpacing:".15em",
        color:"var(--text-dim)", marginTop:4, marginBottom:"1.25rem" }}>
        {t.currency}
      </div>

      <hr style={{ border:"none", borderTop:"0.5px solid rgba(201,168,76,.15)", margin:"1rem 0" }} />

      {t.seatSection && (
        <>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"8px", letterSpacing:".18em",
            color:"var(--text-dim)", textTransform:"uppercase", marginBottom:4 }}>
            Seating
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1rem",
            color:"var(--ivory)", marginBottom:"1rem" }}>
            {t.seatSection} · {t.features[0]}
          </div>
        </>
      )}

      <ul style={{ listStyle:"none", margin:"0 0 1.5rem", padding:0 }}>
        {t.features?.slice(t.seatSection ? 1 : 0).map((f, i) => (
          <li key={i} style={{ display:"flex", alignItems:"center", gap:8,
            fontFamily:"'Cinzel',serif", fontSize:"8px", letterSpacing:".12em",
            color:"var(--text-dim)", padding:"5px 0",
            borderBottom:"0.5px solid rgba(201,168,76,.08)" }}>
            <span style={{ width:4, height:4, borderRadius:"50%",
              background:"var(--gold)", flexShrink:0, display:"inline-block" }} />
            {f}
          </li>
        ))}
      </ul>

      {t.availability && (
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:"8px", letterSpacing:".12em",
          color:"var(--text-dim)", textAlign:"center", marginBottom:10 }}>
          <span style={{ display:"inline-block", width:5, height:5, borderRadius:"50%",
            background: availColor[t.availability] ?? availColor.available,
            marginRight:5, verticalAlign:"middle" }} />
          {{ available:"Available", limited:"Filling fast", soldout:"Sold Out" }[t.availability]}
        </div>
      )}

      <a href={t.url} target="_blank" rel="noopener noreferrer"
        style={{
          display:"block", width:"100%", padding:"10px 0",
          fontFamily:"'Cinzel',serif", fontSize:"9px", letterSpacing:".22em",
          textAlign:"center", textDecoration:"none", textTransform:"uppercase",
          borderRadius:1, transition:"background .2s, color .2s",
          background: t.featured ? "var(--gold)" : "transparent",
          color: t.featured ? "#1a0e02" : "var(--gold)",
          border: t.featured ? "none" : "0.5px solid var(--gold)",
          pointerEvents: t.availability === "soldout" ? "none" : "auto",
          opacity: t.availability === "soldout" ? 0.4 : 1,
        }}>
        {t.availability === "soldout" ? "Sold Out" : (t.ctaLabel || "Book Now")}
      </a>
    </div>
  );
}
// ── COMING SOON ───────────────────────────────────────────────────────────────
function ComingSoonSection({ cfg }) {
  return (
    <Reveal>
      <section style={{ padding:"5rem clamp(1rem,5vw,5rem)", textAlign:"center" }}>
        <SectionLabel>Coming Soon</SectionLabel>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.7rem,4vw,3.2rem)", fontWeight:300, lineHeight:1.15, marginBottom:"2.5rem" }}>
          Something <GoldEm>extraordinary</GoldEm><br/>is being prepared
        </h2>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem", background:"rgba(201,168,76,.05)", border:"1px solid rgba(201,168,76,.2)", padding:"1.5rem clamp(1rem,5vw,3.5rem)", marginBottom:"2rem", maxWidth:"min(560px,92vw)", margin:"0 auto 2rem", flexWrap:"wrap" }}>
          <span style={{ fontSize:"1.8rem", animation:"float 3s ease-in-out infinite", flexShrink:0 }}>🪔</span>
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(0.52rem,1.5vw,0.65rem)", letterSpacing:"0.28em", color:"var(--gold)", textTransform:"uppercase", lineHeight:1.8 }}>
            {cfg?.comingSoonLabel || "Full reveal coming soon"}
          </span>
        </div>
        {cfg?.comingSoonDesc && (
          <p style={{ color:"var(--text-dim)", maxWidth:"min(480px,92vw)", margin:"0 auto", fontSize:"clamp(0.9rem,2vw,1rem)", lineHeight:1.8 }}>{cfg.comingSoonDesc}</p>
        )}
      </section>
    </Reveal>
  );
}
// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav({ title, cfg }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    ["#legacy","Legacy"],
     ["#cause","Cause"], 
    cfg?.songs?.length      ? ["#songs","Songs"]    : null,
    cfg?.performers?.length ? ["#performers","Artists"] : null,
    cfg?.venue?.name        ? ["#venue","Venue"]    : null,
    cfg?.schedule?.length   ? ["#schedule","Schedule"] : null,
    cfg?.performers?.length ? ["#guest-artist", "Special Guest"] : null,
    cfg?.tickets?.length    ? ["#tickets","Tickets"] : null,
    cfg?.organizers?.length ? ["#contact","Contact"] : null,
  ].filter(Boolean);

  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:"0.85rem clamp(1rem,4vw,4rem)", display:"flex", alignItems:"center", justifyContent:"space-between", background:"linear-gradient(to bottom,rgba(10,10,20,.96),transparent)", backdropFilter:"blur(10px)" }}>
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", height:36, overflow:"visible" }}>
        <img src={SAPTSUR_IMG} alt={title}
          style={{ margin: "-18% -5% -60%", height:45, width:"auto", mixBlendMode:"screen", filter:"brightness(1.1) drop-shadow(0 0 6px rgba(201,168,76,.4))" }}
          onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="block"; }}
        />
        <span style={{ display:"none", fontFamily:"'Cinzel',serif", fontSize:"0.85rem", letterSpacing:"0.25em", color:"var(--gold)" }}>{title}</span>
      </div>

      {/* Desktop links */}
      <div className="nav-links" style={{ display:"flex", gap:"1.75rem", flexWrap:"wrap" }}>
        {links.map(([href,label])=>(
          <a key={href} href={href}
            style={{ fontFamily:"'Cinzel',serif", fontSize:"0.56rem", letterSpacing:"0.2em", color:"var(--ivory-dim)", textDecoration:"none", textTransform:"uppercase", transition:"color .2s" }}
            onMouseEnter={e=>e.target.style.color="var(--gold-light)"}
            onMouseLeave={e=>e.target.style.color="var(--ivory-dim)"}
          >{label}</a>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="nav-burger"
        onClick={()=>setMenuOpen(o=>!o)}
        style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:6, flexDirection:"column", gap:5 }}
        aria-label="Menu"
      >
        {[0,1,2].map(i=>(
          <div key={i} style={{ width:22, height:1.5, background:"var(--gold)", borderRadius:2,
            transform: menuOpen ? (i===0?"rotate(45deg) translate(4.5px,4.5px)": i===2?"rotate(-45deg) translate(4.5px,-4.5px)":"scaleX(0)") : "none",
            transition:"transform .25s ease, opacity .25s ease",
            opacity: menuOpen && i===1 ? 0 : 1,
          }}/>
        ))}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="nav-mobile-menu" style={{ position:"absolute", top:"100%", left:0, right:0, background:"rgba(10,10,20,.97)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(201,168,76,.12)", display:"flex", flexDirection:"column", padding:"1rem 0" }}>
          {links.map(([href,label])=>(
            <a key={href} href={href} onClick={()=>setMenuOpen(false)}
              style={{ fontFamily:"'Cinzel',serif", fontSize:"0.65rem", letterSpacing:"0.25em", color:"var(--ivory-dim)", textDecoration:"none", textTransform:"uppercase", padding:"0.85rem clamp(1rem,5vw,2rem)", borderBottom:"1px solid rgba(201,168,76,.05)", transition:"color .2s,background .2s" }}
              onMouseEnter={e=>{ e.target.style.color="var(--gold)"; e.target.style.background="rgba(201,168,76,.04)"; }}
              onMouseLeave={e=>{ e.target.style.color="var(--ivory-dim)"; e.target.style.background="transparent"; }}
            >{label}</a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function ContactSection({ organizers, footerTagline, copyright }) {
  if (!organizers?.length) return null;

  const visible = organizers.filter(org => org.show === true);

  if (!visible.length) return null;

  const isSingle = visible.length === 1;

  return (
    <Reveal>
      <section id="contact" style={{
        padding: "5rem clamp(1rem,5vw,5rem)",
        maxWidth: 1200,
        margin: "0 auto",
        textAlign: "center",
      }}>
        <SectionLabel>Get in Touch</SectionLabel>
        <SectionTitle>Contact the <GoldEm>Organisers</GoldEm></SectionTitle>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1.5rem",
          marginTop: "2.5rem",
        }}>
          {visible.map((org, i) => (
            <ContactCard key={i} org={org} fullWidth={isSingle} />
          ))}
        </div>

        {/* Footer tagline + copyright */}
        <div style={{
          marginTop: "5rem",
          paddingTop: "2rem",
          borderTop: "1px solid rgba(201,168,76,.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: "italic",
            fontSize: "clamp(0.9rem,2vw,1.1rem)",
            color: "var(--gold-pale)",
            opacity: 0.7,
            letterSpacing: "0.08em",
          }}>
            {footerTagline}
          </div>
          <div style={{
            fontFamily: "'Cinzel',serif",
            fontSize: "0.5rem",
            letterSpacing: "0.2em",
            color: "var(--text-dim)",
            opacity: 0.5,
            textTransform: "uppercase",
          }}>
            {copyright}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
function ContactCard({ org, fullWidth = false }) {
  const [hov, setHov] = useState(false);

  const phones    = org.phone   ? (Array.isArray(org.phone)   ? org.phone   : [org.phone])   : [];
  const emails    = org.email   ? (Array.isArray(org.email)   ? org.email   : [org.email])   : [];
  const addresses = org.address ? (Array.isArray(org.address) ? org.address : [org.address]) : [];

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: fullWidth ? "min(720px,92vw)" : "min(300px,92vw)",
        padding: "2rem 1.75rem",
        border: `1px solid ${hov ? "rgba(201,168,76,.4)" : "rgba(201,168,76,.14)"}`,
        background: hov ? "rgba(201,168,76,.05)" : "rgba(201,168,76,.02)",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "0 20px 60px rgba(201,168,76,.08)" : "none",
        transition: "all .35s ease",
        textAlign: "left",
        position: "relative",
        // two-column layout for contact rows when full width
        ...(fullWidth && { display: "grid", gridTemplateRows: "auto auto 1fr", }),
      }}
    >
      {/* Corner accents */}
      <div style={{ position:"absolute", top:8, left:8, width:10, height:10, borderTop:"1px solid rgba(201,168,76,.4)", borderLeft:"1px solid rgba(201,168,76,.4)" }}/>
      <div style={{ position:"absolute", bottom:8, right:8, width:10, height:10, borderBottom:"1px solid rgba(201,168,76,.4)", borderRight:"1px solid rgba(201,168,76,.4)" }}/>

      {/* Logo + name */}
      <div style={{ display:"flex", alignItems:"center", gap:"0.85rem", marginBottom:"1.5rem" }}>
        {org.logoUrl && (
          <div style={{ width:44, height:44, borderRadius:"50%", border:"1px solid rgba(201,168,76,.3)", overflow:"hidden", flexShrink:0 }}>
            <img src={org.logoUrl} alt={org.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
          </div>
        )}
        <div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"0.56rem", letterSpacing:"0.25em", color:"var(--gold)", textTransform:"uppercase", lineHeight:1.6 }}>
            {org.short || org.name}
          </div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(0.85rem,1.8vw,0.95rem)", color:"var(--ivory-dim)", lineHeight:1.4, marginTop:2 }}>
            {org.name}
          </div>
        </div>
      </div>

      <div style={{ width:32, height:1, background:"var(--gold)", opacity:.3, marginBottom:"1.25rem" }}/>

      {/* Contact rows — two columns if fullWidth */}
      <div style={{
        display: fullWidth ? "grid" : "block",
        gridTemplateColumns: fullWidth ? "repeat(auto-fit, minmax(200px, 1fr))" : undefined,
        gap: fullWidth ? "0 2rem" : undefined,
      }}>
        {addresses.map((a, i) => <ContactRow key={`a${i}`} icon="📍" text={a} />)}
        {phones.map((p, i)    => <ContactRow key={`p${i}`} icon="📞" text={p} href={`tel:${p}`} />)}
        {emails.map((e, i)    => <ContactRow key={`e${i}`} icon="✉️" text={e} href={`mailto:${e}`} />)}
      </div>
    </div>
  );
}
function ContactRow({ icon, text, href }) {
  const content = (
    <div style={{ display:"flex", alignItems:"flex-start", gap:"0.6rem", marginBottom:"0.75rem" }}>
      <span style={{ fontSize:"0.75rem", flexShrink:0, marginTop:1, opacity:0.7 }}>{icon}</span>
      <span style={{
        fontFamily: "'Cormorant Garamond',serif",
        fontSize: "clamp(0.82rem,1.6vw,0.9rem)",
        color: href ? "var(--gold-pale)" : "var(--text-dim)",
        lineHeight: 1.5,
      }}>{text}</span>
    </div>
  );
  if (!href) return content;
  return (
    <a href={href} style={{ textDecoration:"none", display:"block" }}
      onMouseEnter={e => e.currentTarget.querySelector("span:last-child").style.color="var(--gold)"}
      onMouseLeave={e => e.currentTarget.querySelector("span:last-child").style.color="var(--gold-pale)"}
    >
      {content}
    </a>
  );
}



function CauseSection({ cfg }) {
  const [ref, vis] = useReveal();

  return (
    <section
      ref={ref}
      id="cause"
      style={{
        padding: "5rem clamp(1rem,5vw,5rem)",
        maxWidth: 1200,
        margin: "0 auto",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(48px)",
        transition: "opacity .9s ease, transform .9s ease",
      }}
    >
      <SectionLabel>Our Purpose</SectionLabel>
      <SectionTitle>
        Music as <GoldEm>Seva</GoldEm>
      </SectionTitle>

      {/* Org cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(260px,100%), 1fr))",
          gap: "1.5rem",
          marginBottom: "3.5rem",
        }}
      >
        {CAUSE_ORGS.map((org, i) => (
          <CauseOrgCard key={i} org={org} />
        ))}
      </div>

      {/* Bilingual message panel */}
      <div
        style={{
          border: "1px solid rgba(201,168,76,.18)",
          borderLeft: "3px solid rgba(201,168,76,.6)",
          background: "linear-gradient(135deg,rgba(201,168,76,.05),rgba(201,168,76,.01))",
          padding: "2.5rem clamp(1.25rem,4vw,2.5rem)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative quote mark */}
        <div
          style={{
            position: "absolute",
            top: -10,
            right: 24,
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "8rem",
            color: "rgba(201,168,76,.06)",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          "
        </div>

        {/* Marathi */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "0.48rem",
              letterSpacing: "0.4em",
              color: "var(--gold)",
              opacity: 0.6,
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            मराठी
          </div>
          <p
            style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: "clamp(0.88rem,1.8vw,1rem)",
              color: "var(--text-dim)",
              lineHeight: 2,
              fontWeight: 300,
            }}
          >
            🙏🏻 {CAUSE_TEXT_MR}
          </p>
        </div>

        {/* Divider rule */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(to right,transparent,rgba(201,168,76,.25),transparent)",
            margin: "1.5rem 0",
          }}
        />

        {/* English */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div
            style={{
              fontFamily: "'Cinzel',serif",
              fontSize: "0.48rem",
              letterSpacing: "0.4em",
              color: "var(--gold)",
              opacity: 0.6,
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            English
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontStyle: "italic",
              fontSize: "clamp(0.95rem,2vw,1.1rem)",
              color: "var(--text-dim)",
              lineHeight: 1.9,
            }}
          >
            🙏🏻 {CAUSE_TEXT_EN}
          </p>
        </div>

        {/* Ticket nudge */}
        <div
          style={{
            background: "rgba(201,168,76,.07)",
            border: "1px solid rgba(201,168,76,.2)",
            padding: "1rem 1.25rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem",
          }}
        >
          <span style={{ fontSize: "1.1rem", flexShrink: 0, marginTop: 2 }}>🎟</span>
          <p
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(0.9rem,1.8vw,1rem)",
              color: "var(--ivory-dim)",
              lineHeight: 1.8,
            }}
          >
            By purchasing just one ticket — at{" "}
            <span style={{ color: "var(--gold)" }}>₹200, ₹300, or ₹500</span>{" "}
            as per your discretion — your contribution goes directly to both
            these organisations. Every seat filled is an act of <em>seva</em>.
          </p>
        </div>

        {/* Signature */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: "italic",
            fontSize: "clamp(0.88rem,1.8vw,1rem)",
            color: "var(--gold-pale)",
            opacity: 0.75,
            textAlign: "right",
          }}
        >
          — Kedar Minal Vijay Deshmukh 🙏🏻
        </div>
      </div>
    </section>
  );
}

function CauseOrgCard({ org }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: `1px solid ${
          hov ? "rgba(201,168,76,.4)" : "rgba(201,168,76,.14)"
        }`,
        background: hov ? "rgba(201,168,76,.05)" : "rgba(201,168,76,.02)",
        transform: hov ? "translateY(-5px)" : "none",
        boxShadow: hov ? "0 20px 60px rgba(201,168,76,.1)" : "none",
        transition: "all .35s ease",
        padding: "1.75rem",
        display: "flex",
        gap: "1.25rem",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      {/* Corner accents */}
      <div style={{ position:"absolute", top:8, left:8, width:10, height:10, borderTop:"1px solid rgba(201,168,76,.35)", borderLeft:"1px solid rgba(201,168,76,.35)" }}/>
      <div style={{ position:"absolute", bottom:8, right:8, width:10, height:10, borderBottom:"1px solid rgba(201,168,76,.35)", borderRight:"1px solid rgba(201,168,76,.35)" }}/>

      {/* Logo */}
      <div
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,.35)",
          overflow: "hidden",
          flexShrink: 0,
          background: "rgba(201,168,76,.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.4rem",
        }}
      >
        {org.logo ? (
          <img
            src={org.logo}
            alt={org.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          org.emoji
        )}
      </div>

      <div>
        <div
          style={{
            fontFamily: "'Cinzel',serif",
            fontSize: "0.54rem",
            letterSpacing: "0.22em",
            color: "var(--gold)",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}
        >
          {org.name}
        </div>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(0.88rem,1.8vw,0.97rem)",
            color: "var(--text-dim)",
            lineHeight: 1.8,
          }}
        >
          {org.desc}
        </p>
      </div>
    </div>
  );
}
// ── GUEST ARTIST ──────────────────────────────────────────────────────────────
function GuestCard({ guest, flip }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = [
    guest.imgUrl2 && guest.imgUrl2.trim() !== "" ? guest.imgUrl2 : null,
    guest.imgUrl && guest.imgUrl.trim() !== "" ? guest.imgUrl : null,
  ].filter(Boolean);

  // Touch swipe support
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      setPhotoIndex(prev =>
        diff > 0
          ? Math.min(prev + 1, photos.length - 1)
          : Math.max(prev - 1, 0)
      );
    }
    touchStartX.current = null;
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "5rem clamp(1.5rem,5vw,5rem)",
      borderBottom: "1px solid rgba(201,168,76,.12)",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Background glow */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"70%", height:"70%", background:"radial-gradient(circle,rgba(201,168,76,.05) 0%,transparent 70%)", pointerEvents:"none" }}/>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))",
        gap: "4rem",
        alignItems: "center",
        maxWidth: 1100,
        margin: "0 auto",
        width: "100%",
      }}>

        {/* Carousel */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"1.5rem" }}
        >
          <div style={{ position:"relative", width:"min(340px,80vw)", height:"min(340px,80vw)" }}>
            {photos.map((src, i) => (
              <div key={i} style={{
                position: "absolute", inset: 0,
                opacity: i === photoIndex ? 1 : 0,
                transition: "opacity 0.6s ease",
              }}>
                <PortraitCircle
                  src={src}
                  alt={guest.name}
                  size="min(340px,80vw)"
                  glowColor="rgba(201,168,76,.28)"
                />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          {photos.length > 1 && (
            <div style={{ display:"flex", gap:"0.6rem", alignItems:"center" }}>
              {photos.map((_, i) => (
                <div key={i} style={{
                  width: i === photoIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 100,
                  background: i === photoIndex ? "var(--gold)" : "rgba(201,168,76,.3)",
                  transition: "all 0.4s ease",
                }}/>
              ))}
            </div>
          )}

          {/* Swipe hint */}
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:"0.7rem", letterSpacing:"0.2em", color:"var(--gold)", opacity:0.45, textTransform:"uppercase" }}>
            ← swipe to see more →
          </div>
        </div>

        {/* Full Profile Text */}
        <div>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(201,168,76,.08)", border: "1px solid rgba(201,168,76,.28)",
            borderRadius: 100, padding: "0.5rem 1.25rem", marginBottom: "2rem",
          }}>
            <span style={{ fontSize:"1rem" }}>📺</span>
            <span style={{ fontFamily:"'Cinzel',serif", fontSize:"0.8rem", letterSpacing:"0.2em", color:"var(--gold)", textTransform:"uppercase" }}>
              {guest.badge || "Special Guest"}
            </span>
          </div>

          {/* Name */}
          <h3 style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(2.4rem,5vw,3.8rem)",
            fontWeight: 300, lineHeight: 1.1,
            marginBottom: "0.75rem",
            color: "var(--ivory)",
          }}>
            {guest.name}
          </h3>

          {/* Role */}
          <div style={{
            fontFamily: "'Cinzel',serif",
            fontSize: "0.85rem", letterSpacing: "0.25em",
            color: "var(--gold)", textTransform: "uppercase",
            marginBottom: "2rem", opacity: 0.85,
          }}>
            {guest.role}
          </div>

          {/* Gold rule */}
          <div style={{ width:60, height:1, background:"var(--gold)", opacity:0.4, marginBottom:"2rem" }}/>

          {/* Desc */}
          <p style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: "italic",
            fontSize: "clamp(1.15rem,2vw,1.35rem)",
            color: "var(--text-dim)",
            lineHeight: 2,
            maxWidth: 520,
          }}>
            {guest.desc}
          </p>

        </div>
      </div>
    </div>
  );
}

function GuestArtistSection({ performers }) {
  const [ref, vis] = useReveal();
  const guests = performers?.filter(p => p.special === true);
  if (!guests?.length) return null;

  return (
    <section ref={ref} id="guest-artist" style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(48px)",
      transition: "opacity .9s ease, transform .9s ease",
    }}>
      <div style={{ padding:"4rem clamp(1rem,5vw,5rem)", maxWidth:1200, margin:"0 auto" }}>
        <SectionLabel>Special Appearance</SectionLabel>
        <SectionTitle>An Evening <GoldEm>Made Special</GoldEm></SectionTitle>
      </div>

      {guests.map((guest, i) => (
        <GuestCard key={i} guest={guest} flip={i % 2 !== 0} />
      ))}
    </section>
  );
}
// ══════════════════════════════════════════════════════════════════════════════
//  MAIN APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [cfg, setCfg] = useState(null);
  const [loading, setLoading] = useState(true);
  const cd = useCountdown(cfg?.eventDate);

  useEffect(() => {
    if (!document.querySelector("#gfonts")) {
      const l = document.createElement("link");
      l.id="gfonts"; l.rel="stylesheet"; l.href=FONT_LINK;
      document.head.appendChild(l);
    }
    // Ensure proper mobile viewport
    if (!document.querySelector('meta[name="viewport"]')) {
      const m = document.createElement("meta");
      m.name="viewport"; m.content="width=device-width,initial-scale=1,maximum-scale=1";
      document.head.appendChild(m);
    }
document.body.style.cssText = "background:#0a0a14;margin:0;overflow-x:hidden;max-width:100%;";
  }, []);

  useEffect(() => {
    async function load() {
      let data = null;
      try {
        const r = await fetch(GITHUB_CONFIG_URL);
        if (r.ok) data = await r.json();
      } catch (err) {
        console.error("Config load error:", err);
      }
      if (data?.organizers) {
        data.organizers = data.organizers.map(o => {
          if (o.logoUrl) return o;
          const n = o.name?.toLowerCase() || "";
          if (n.includes("sharada"))  return { ...o, logoUrl: SSV_LOGO };
          if (n.includes("progress")) return { ...o, logoUrl: IPROG_LOGO };
          if (n.includes("adhar")) return { ...o, logoUrl: WRI_LOGO };
          return o;
        });
      }
      setCfg(data || {});
      setTimeout(() => setLoading(false), 900);
    }
    load();
  }, []);

  const phase = cfg?.phase ?? 1; // default to 1 if not set

const hasSections = phase >= 2 && cfg && (
  cfg.songs?.length || cfg.performers?.length ||
  cfg.venue || cfg.schedule?.length || cfg.tickets?.length
);

  const title         = cfg?.title         || "Saptasur";
  const subtitle      = cfg?.subtitle      || "";
  const tagline       = cfg?.tagline       || "In Eternal Memory of Bharat Ratna Lata Mangeshkar";
  const description   = cfg?.description   || "";
  const wriLabel      = cfg?.wriLabel      || "World Records India — Certified";
  const quote         = cfg?.quote         || "My voice is God's gift, and I have dedicated it entirely to music.";
  const quoteAuthor   = cfg?.quoteAuthor   || "— Lata Mangeshkar (1929–2022)";
  const cdLabel       = cfg?.countdownLabel|| "Time Until the Evening of a Lifetime";
  const footerTagline = cfg?.footerTagline || "Tere Sur Aur Mere Geet — In Memory of Bharat Ratna Lata Mangeshkar";
  const copyright     = cfg?.copyright     || `© ${new Date().getFullYear()} Saptasur. All rights reserved.`;

const css = `
  :root {
    --gold:#c9a84c; --gold-light:#e8c97a; --gold-pale:#f5e6c0;
    --midnight:#0a0a14; --ivory:#fdf7e8; --ivory-dim:#d4cfc4;
    --text-main:#e8e0d0; --text-dim:#a09888;
  }

html, body {
  max-width: 100%;

}

section {
  max-width: 100%;
 
}

  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  html { scroll-behavior:smooth; -webkit-text-size-adjust:100%; }
  body { color:var(--text-main); font-family:'Cormorant Garamond',serif; font-size:18px; line-height:1.7; }
  @keyframes shimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes float      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes fadeInUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulseGlow  { 0%,100%{opacity:.5} 50%{opacity:1} }
  @keyframes rotateOrb  { from{transform:rotate(0deg) translateX(155px) rotate(0deg)} to{transform:rotate(360deg) translateX(155px) rotate(-360deg)} }
  @keyframes borderGlow { 0%,100%{border-color:rgba(201,168,76,.15)} 50%{border-color:rgba(201,168,76,.45)} }
  @keyframes starTwinkle{ 0%,100%{opacity:.12;transform:scale(1)} 50%{opacity:.85;transform:scale(1.5)} }
  @keyframes loaderBar  { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes breathe    { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.07)} }
  @keyframes spin       { to{transform:rotate(360deg)} }

  a, button { -webkit-tap-highlight-color: transparent; }

  /* ── ≤ 640px — nav breakpoint ── */
  @media (max-width: 640px) {
    .nav-links       { display: none !important; }
    .nav-burger      { display: flex !important; }
    .org-divider     { display: none !important; }
    .life-img        { order: 1 !important; }
    .life-text       { order: 2 !important; }
    .tickets-grid    { flex-direction: column; align-items: center; }
    .ticket-card     { width: min(400px, 92vw) !important; }
  }

  /* ── ≥ 641px — hide mobile menu ── */
  @media (min-width: 641px) {
    .nav-mobile-menu { display: none !important; }
  }

  /* ── ≤ 480px — small phones ── */
  @media (max-width: 480px) {
    .hero-tagline  { font-size: 0.44rem !important; letter-spacing: 0.35em !important; }
    .hero-memory   { font-size: 1.1rem !important; }
    .hero-years    { font-size: 0.5rem !important; }
    .wri-strip     { padding: 0.75rem 1rem !important; }
    .date-pill     { padding: 0.55rem 1.1rem !important; font-size: 0.55rem !important; }
    .countdown-grid{ gap: 0.75rem !important; }
    .countdown-box { padding: 1.25rem 1rem !important; min-width: 72px !important; }
    .countdown-num { font-size: 2.5rem !important; }
  }

  /* ── landscape phones ── */
  @media (orientation: landscape) and (max-height: 500px) {
    .hero-portrait { transform: scale(0.85); }
  }
`;
  return (
    <>
      <style>{css}</style>

      {/* LOADER */}
      <div style={{ position:"fixed", inset:0, background:"#0a0a14", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", zIndex:1000, opacity:loading?1:0, visibility:loading?"visible":"hidden", transition:"opacity .7s ease,visibility .7s ease" }}>
        <div style={{ fontFamily:"'Cinzel',serif", fontSize:"3rem", color:"var(--gold)", animation:"pulseGlow 2s ease-in-out infinite,float 3s ease-in-out infinite", marginBottom:"1.75rem" }}>ॐ</div>
        <div style={{ width:160, height:2, background:"rgba(201,168,76,.12)", borderRadius:2, overflow:"hidden" }}>
          <div style={{ height:"100%", background:"linear-gradient(90deg,var(--gold),var(--gold-pale),var(--gold))", backgroundSize:"200%", animation:"loaderBar 1.4s linear infinite" }}/>
        </div>
      </div>

      {/* STARS */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0, overflow:"hidden" }}>
        {STARS.map(s=>(
          <div key={s.id} style={{ position:"absolute", left:`${s.left}%`, top:`${s.top}%`, width:s.big?3:2, height:s.big?3:2, background:"var(--gold-pale)", borderRadius:"50%", animation:`starTwinkle ${s.dur}s ${s.delay}s ease-in-out infinite` }}/>
        ))}
      </div>

      <div style={{ position:"relative", zIndex:1 }}>

        {/* ── NAV ── */}
        <Nav title={title} cfg={cfg}/>

        {/* ── HERO ── */}
      <section
          id="hero"
          style={{
            position: "relative",
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "7rem 0 4rem",
            overflow: "hidden"
          }}
        >
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 50% 30%,rgba(122,28,46,.18) 0%,transparent 70%),radial-gradient(ellipse 50% 40% at 20% 80%,rgba(26,74,74,.1) 0%,transparent 60%),linear-gradient(180deg,#0a0a14 0%,#06060f 100%)" }}/>
          <div style={{ position:"absolute", width:"min(600px,90vw)", height:"min(600px,90vw)", border:"1px solid rgba(201,168,76,.04)", borderRadius:"50%", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }}/>

          <div style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", alignItems:"center", width:"100%" }}>

            {/* Eyebrow tagline */}
            <div className="hero-tagline" style={{ fontFamily:"'Cinzel',serif", fontSize:"0.52rem", letterSpacing:"0.55em", color:"var(--gold)", opacity:.6, textTransform:"uppercase", marginBottom:"2rem", animation:"fadeInUp 1s .2s both", maxWidth:"90vw", lineHeight:1.8 }}>
              {tagline}
            </div>

            {/* Portrait */}
            <div className="hero-portrait" style={{ animation:"fadeInUp 1s .4s both", marginBottom:"2rem" }}>
              <PortraitCircle src={LATA_HERO} alt="Bharat Ratna Lata Mangeshkar" size="min(260px,58vw)"/>
            </div>

            {/* Saptasur image */}
            <div style={{ animation:"fadeInUp 1s .6s both", marginBottom:"0.6rem", display:"flex", justifyContent:"center" }}>
              <img src={SAPTSUR_IMG} alt={title}
                style={{ width:"min(360px,80vw)",margin: "-18% -5% -60%", maxWidth:"380px", mixBlendMode:"screen", filter:"brightness(1.1) contrast(1.05) drop-shadow(0 0 18px rgba(201,168,76,0.55))", display:"block" }}
                onError={e=>{ e.target.style.display="none"; e.target.nextSibling.style.display="block"; }}
              />
              <h1 style={{ display:"none", fontFamily:"'Noto Sans Devanagari',sans-serif", fontSize:"clamp(2.5rem,8vw,5.5rem)", fontWeight:300, background:"linear-gradient(90deg,var(--gold),var(--gold-pale),var(--gold))", backgroundSize:"200%", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"shimmer 4s linear infinite" }}>
                {title}
              </h1>
            </div>

            {/* Subtitle */}
            {subtitle && (
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic", fontSize:"clamp(0.9rem,2vw,1.25rem)", letterSpacing:"0.22em", color:"var(--gold-pale)", opacity:.8, marginBottom:"2rem", animation:"fadeInUp 1s .75s both" }}>
                {subtitle}
              </div>
            )}

            {/* God Tier Divider */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0, margin:"0 0 2rem", animation:"fadeInUp 1s .85s both", width:"min(400px,82vw)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", width:"100%", marginBottom:"0.55rem" }}>
                <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,rgba(201,168,76,.5))" }}/>
                <div style={{ width:3, height:3, background:"var(--gold)", transform:"rotate(45deg)", opacity:.5 }}/>
                <div style={{ flex:1, height:1, background:"linear-gradient(to left,transparent,rgba(201,168,76,.5))" }}/>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.85rem", width:"100%" }}>
                <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,var(--gold))" }}/>
                <div style={{ display:"flex", alignItems:"center", gap:"0.38rem" }}>
                  <div style={{ width:14, height:1, background:"var(--gold)", opacity:.45 }}/>
                  <div style={{ width:5, height:5, background:"transparent", border:"1px solid rgba(201,168,76,.65)", transform:"rotate(45deg)" }}/>
                  <div style={{ width:8, height:8, background:"transparent", border:"1px solid rgba(201,168,76,.45)", transform:"rotate(45deg)" }}/>
                </div>
                <div style={{ position:"relative", width:26, height:26, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <div style={{ position:"absolute", inset:0, border:"1px solid rgba(201,168,76,.3)", transform:"rotate(45deg)" }}/>
                  <div style={{ position:"absolute", inset:5, border:"1px solid rgba(201,168,76,.5)", transform:"rotate(45deg)" }}/>
                  <div style={{ width:5, height:5, background:"var(--gold)", transform:"rotate(45deg)", boxShadow:"0 0 8px rgba(201,168,76,.9),0 0 22px rgba(201,168,76,.4)" }}/>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"0.38rem" }}>
                  <div style={{ width:8, height:8, background:"transparent", border:"1px solid rgba(201,168,76,.45)", transform:"rotate(45deg)" }}/>
                  <div style={{ width:5, height:5, background:"transparent", border:"1px solid rgba(201,168,76,.65)", transform:"rotate(45deg)" }}/>
                  <div style={{ width:14, height:1, background:"var(--gold)", opacity:.45 }}/>
                </div>
                <div style={{ flex:1, height:1, background:"linear-gradient(to left,transparent,var(--gold))" }}/>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", width:"100%", marginTop:"0.55rem" }}>
                <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,rgba(201,168,76,.5))" }}/>
                <div style={{ width:3, height:3, background:"var(--gold)", transform:"rotate(45deg)", opacity:.5 }}/>
                <div style={{ flex:1, height:1, background:"linear-gradient(to left,transparent,rgba(201,168,76,.5))" }}/>
              </div>
            </div>

            {/* In Memory Of */}
            <div style={{ animation:"fadeInUp 1s .95s both", marginBottom:"0.5rem" }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:"0.48rem", letterSpacing:"0.45em", color:"var(--gold)", opacity:.55, textTransform:"uppercase", marginBottom:"0.55rem" }}>
                In Eternal Memory of
              </div>
              <div className="hero-memory" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.3rem,3.5vw,2.2rem)", fontWeight:300, color:"var(--ivory)", letterSpacing:"0.08em", lineHeight:1.2 }}>
                Bharat Ratna Lata Mangeshkar
              </div>
              <div className="hero-years" style={{ fontFamily:"'Cinzel',serif", fontSize:"clamp(0.44rem,1vw,0.6rem)", letterSpacing:"0.4em", color:"var(--text-dim)", marginTop:"0.5rem" }}>
                1929 – 2022
              </div>
            </div>

            {/* WRI strip */}
            {description && (
              <div className="wri-strip" style={{ maxWidth:"min(480px,92vw)", margin:"2rem 0 1.5rem", padding:"0.85rem 1.5rem", border:"1px solid rgba(201,168,76,.18)", borderLeft:"2px solid rgba(201,168,76,.5)", background:"linear-gradient(135deg,rgba(201,168,76,.06),rgba(201,168,76,.01))", animation:"fadeInUp 1s 1.05s both", display:"flex", alignItems:"flex-start", gap:"0.75rem", textAlign:"left" }}>
                <span style={{ fontSize:"1rem", flexShrink:0, marginTop:2 }}>🌐</span>
                <div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:"0.46rem", letterSpacing:"0.3em", color:"var(--gold)", textTransform:"uppercase", marginBottom:4, opacity:.65 }}>{wriLabel}</div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(0.82rem,1.8vw,0.9rem)", color:"var(--gold-pale)", opacity:.8, lineHeight:1.6 }}>{description}</div>
                </div>
              </div>
            )}

            {/* Date pill */}
            {cfg?.eventDate && (
              <div className="date-pill" style={{ display:"inline-flex", alignItems:"center", gap:"0.6rem", background:"rgba(201,168,76,.07)", border:"1px solid rgba(201,168,76,.2)", borderRadius:100, padding:"0.65rem 1.5rem", fontFamily:"'Cinzel',serif", fontSize:"0.6rem", letterSpacing:"0.15em", color:"var(--gold-light)", animation:"fadeInUp 1s 1.15s both", flexWrap:"wrap", justifyContent:"center", textAlign:"center", maxWidth:"90vw" }}>
                <span>🗓</span>
                <span>{fmtDate(cfg.eventDate)}{cfg.eventTime ? ` · ${cfg.eventTime}` : ""}</span>
              </div>
            )}

          </div>

         
        </section>

        {/* ── COUNTDOWN ── */}
        {cfg?.eventDate && (
          <section id="countdown" style={{ padding:"4rem 1.25rem", textAlign:"center" }}>
            <Reveal>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:"0.56rem", letterSpacing:"0.45em", color:"var(--gold)", textTransform:"uppercase", marginBottom:"2rem" }}>{cdLabel}</div>
              <div className="countdown-grid" style={{ display:"flex", justifyContent:"center", gap:"1rem", flexWrap:"wrap" }}>
                {[["Days",cd.d],["Hours",cd.h],["Minutes",cd.m],["Seconds",cd.s]].map(([label,val])=>(
                  <div key={label} className="countdown-box" style={{ padding:"1.5rem 1.75rem", background:"rgba(201,168,76,.04)", border:"1px solid rgba(201,168,76,.14)", position:"relative", animation:"borderGlow 3s ease-in-out infinite", minWidth:88 }}>
                    <div style={{ position:"absolute", top:-4, left:-4, width:8, height:8, border:"1px solid var(--gold)", borderRight:"none", borderBottom:"none" }}/>
                    <div style={{ position:"absolute", bottom:-4, right:-4, width:8, height:8, border:"1px solid var(--gold)", borderLeft:"none", borderTop:"none" }}/>
                    <div className="countdown-num" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"3.2rem", fontWeight:300, lineHeight:1, color:"var(--gold-pale)" }}>{val}</div>
                    <div style={{ fontFamily:"'Cinzel',serif", fontSize:"0.46rem", letterSpacing:"0.3em", color:"var(--text-dim)", textTransform:"uppercase", marginTop:6 }}>{label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>
        )}

        {/* ── ORGANIZERS ── */}
        {cfg?.organizers?.length > 0 && <><Divider/><OrganizersBar organizers={cfg.organizers}/></>}

        <Divider/>

        {/* ── QUOTE ── */}
        <Reveal>
          <section style={{ padding:"4rem 1.25rem", textAlign:"center", position:"relative" }}>
            <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(6rem,18vw,14rem)", color:"rgba(201,168,76,.025)", lineHeight:1, pointerEvents:"none", userSelect:"none" }}>"</div>
            <blockquote style={{ maxWidth:"min(660px,92vw)", margin:"0 auto", fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1.1rem,2.5vw,2rem)", fontStyle:"italic", fontWeight:300, lineHeight:1.6, color:"var(--ivory)", position:"relative" }}>
              "{quote}"
              <cite style={{ display:"block", fontStyle:"normal", fontFamily:"'Cinzel',serif", fontSize:"0.56rem", letterSpacing:"0.28em", color:"var(--gold)", marginTop:"1.5rem", textTransform:"uppercase" }}>
                {quoteAuthor}
              </cite>
            </blockquote>
          </section>
        </Reveal>

        <Divider/>

        {/* ── LATA LIFE ── */}
        <LataLifeSection/>

        <Divider/>
               {/* ── CAUSE ── */}           {/* 👈 ADD THESE TWO LINES */}
        <CauseSection cfg={cfg}/>
        <Divider/>

        {/* ── CONDITIONAL SECTIONS ── */}
        {/* Coming Soon — only when phase 1 */}
        {phase === 1 && <ComingSoonSection cfg={cfg}/>}

        {/* Phase 2+ sections */}
        {phase >= 2 && <SongsSection songs={cfg?.songs}/>}
        {phase >= 2 && cfg?.songs?.length > 0 && cfg?.performers?.length > 0 && <Divider/>}
        {phase >= 2 && <GuestArtistSection performers={cfg?.performers}/> }  {/* 👈 ADD */}
        {phase >= 2 && <PerformersSection performers={cfg?.performers}/>}
        {phase >= 2 && cfg?.venue?.name && <Divider/>}
        {phase >= 2 && <VenueSection venue={cfg?.venue}/>}
        {phase >= 2 && cfg?.schedule?.length > 0 && <Divider/>}
        {phase >= 2 && <ScheduleSection schedule={cfg?.schedule}/>}
        {phase >= 2 && cfg?.tickets?.length > 0 && <Divider/>}
        {phase >= 2 && <TicketsSection tickets={cfg?.tickets}/>}

      {/* ── CONTACT + FOOTER ── */}
        {cfg?.tickets?.length > 0 && <Divider/>}
        <ContactSection
          organizers={cfg?.organizers}
          footerTagline={footerTagline}
          copyright={copyright}
        />

      
        
      </div>
    </>
  );
}