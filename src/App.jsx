import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  CheckCircle,
  MapPin,
  Calendar,
  Heart,
  Sun,
  FileDown,
  Loader2,
  Sparkles,
} from "lucide-react";
import "./App.css";

const NAKATH_DATA = [
  {
    id: 1,
    title: "Punya Kalaya",
    subtitle: "Nonagathaya",
    titleSi: "පුණ්‍ය කාලය",
    time: "2026-04-14T03:08:00+05:30",
    endTime: "2026-04-14T15:56:00+05:30",
    description: "Stop all work and engage in religious activities.",
    gradient: "linear-gradient(135deg, #f59e0b, #d97706, #b45309)",
    glow: "#f59e0b",
    direction: "N/A",
    attire: "White / Traditional",
    icon: "🙏",
  },
  {
    id: 2,
    title: "Dawn of the New Year",
    subtitle: "අලුත් අවුරුදු උදාව",
    titleSi: "අලුත් අවුරුදු උදාව",
    time: "2026-04-14T09:32:00+05:30",
    description: "The official transition of the Sun to Aries.",
    gradient: "linear-gradient(135deg, #dc2626, #b91c1c, #991b1b)",
    glow: "#ef4444",
    direction: "North",
    attire: "Red",
    icon: "🌅",
  },
  {
    id: 3,
    title: "Preparing Meals",
    subtitle: "ආහාර පිසීම",
    titleSi: "ආහාර පිසීම",
    time: "2026-04-14T10:51:00+05:30",
    description: "Light the hearth facing the North, wearing Red.",
    gradient: "linear-gradient(135deg, #ea580c, #c2410c, #9a3412)",
    glow: "#f97316",
    direction: "North",
    attire: "Red",
    icon: "🍚",
  },
  {
    id: 4,
    title: "Work & Transactions",
    subtitle: "වැඩ ඇල්ලීම හා ගනුදෙනු",
    titleSi: "වැඩ ඇල්ලීම, ගනුදෙනු හා ආහාර",
    time: "2026-04-14T12:06:00+05:30",
    description: "Start work, symbolic transactions, and partaking in meals.",
    gradient: "linear-gradient(135deg, #ca8a04, #a16207, #854d0e)",
    glow: "#eab308",
    direction: "North",
    attire: "Red",
    icon: "💼",
  },
  {
    id: 5,
    title: "Anointing Oil",
    subtitle: "හිසතෙල් ගෑම",
    titleSi: "හිසතෙල් ගෑම",
    time: "2026-04-15T06:55:00+05:30",
    description: "Face East, applying herbal oils for health and longevity.",
    gradient: "linear-gradient(135deg, #16a34a, #15803d, #166534)",
    glow: "#22c55e",
    direction: "East",
    attire: "Green",
    icon: "🌿",
  },
  {
    id: 6,
    title: "Leaving for Work",
    subtitle: "රැකී රක්ෂා සඳහා",
    titleSi: "රැකී රක්ෂා සඳහා පිටත්ව යෑම",
    time: "2026-04-20T06:27:00+05:30",
    description: "Step out with a clean mind for a prosperous work year.",
    gradient: "linear-gradient(135deg, #2563eb, #1d4ed8, #1e40af)",
    glow: "#3b82f6",
    direction: "South",
    attire: "White",
    icon: "🌟",
  },
];
const CountdownTimer = ({ targetDate, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date().getTime();
    const distance = new Date(targetDate).getTime() - now;
    if (distance <= 0)
      return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
      finished: false,
    };
  });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          finished: true,
        });
        if (onFinish) onFinish();
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        finished: false,
      });
    };

    tick(); // run immediately
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [targetDate, onFinish]);

  if (timeLeft.finished) return null;

  return (
    <div style={{ display: "flex", gap: "6px", marginTop: "14px" }}>
      {[
        { label: "Days", val: timeLeft.days },
        { label: "Hrs", val: timeLeft.hours },
        { label: "Min", val: timeLeft.minutes },
        { label: "Sec", val: timeLeft.seconds },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: "10px",
            padding: "6px 10px",
            minWidth: "44px",
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.2)",
            flex: 1,
          }}
        >
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              lineHeight: 1,
              fontFamily: "'DM Mono', monospace",
            }}
          >
            {String(item.val).padStart(2, "0")}
          </div>
          <div
            style={{
              fontSize: "9px",
              textTransform: "uppercase",
              opacity: 0.7,
              letterSpacing: "0.05em",
              marginTop: "2px",
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};
const NekathCard = ({ item, index }) => {
  const [isFinished, setIsFinished] = useState(
    () => new Date() > new Date(item.time),
  );
  const [hovered, setHovered] = useState(false);
  const timeStr = new Date(item.time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const dateStr = new Date(item.time).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        padding: "1.5rem",
        background: isFinished ? "rgba(255,255,255,0.05)" : item.gradient,
        boxShadow: isFinished
          ? "none"
          : hovered
            ? `0 20px 60px ${item.glow}55, 0 0 0 1px ${item.glow}33`
            : `0 8px 32px ${item.glow}33`,
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform:
          hovered && !isFinished
            ? "translateY(-6px) scale(1.01)"
            : "translateY(0) scale(1)",
        border: isFinished ? "1px solid rgba(255,255,255,0.08)" : "none",
        animationDelay: `${index * 0.1}s`,
        animation: "fadeSlideUp 0.6s ease both",
        color: isFinished ? "rgba(255,255,255,0.5)" : "white",
      }}
    >
      {/* Decorative orb */}
      {!isFinished && (
        <div
          style={{
            position: "absolute",
            right: "-30px",
            bottom: "-30px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            transition: "transform 0.5s ease",
            transform: hovered ? "scale(1.5)" : "scale(1)",
          }}
        />
      )}
      {!isFinished && (
        <div
          style={{
            position: "absolute",
            right: "20px",
            top: "-20px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }}
        />
      )}

      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
          position: "relative",
        }}
      >
        <div
          style={{
            fontSize: "28px",
            lineHeight: 1,
            filter: isFinished ? "grayscale(1) opacity(0.4)" : "none",
          }}
        >
          {item.icon}
        </div>
        <div
          style={{
            fontSize: "10px",
            fontWeight: "700",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "4px 12px",
            borderRadius: "20px",
            background: isFinished
              ? "rgba(255,255,255,0.08)"
              : "rgba(255,255,255,0.2)",
            border: isFinished
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(255,255,255,0.3)",
            color: isFinished ? "rgba(255,255,255,0.4)" : "white",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {isFinished ? (
            <>
              <CheckCircle size={10} /> Done
            </>
          ) : (
            <>
              <Sparkles size={10} /> Upcoming
            </>
          )}
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "800",
          marginBottom: "4px",
          fontFamily: "'Playfair Display', serif",
          lineHeight: 1.2,
          position: "relative",
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          fontSize: "15px",
          fontFamily: "'Abhaya Libre', serif",
          opacity: isFinished ? 0.4 : 0.85,
          marginBottom: "16px",
          position: "relative",
        }}
      >
        {item.titleSi}
      </p>

      {/* Info pills */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          position: "relative",
        }}
      >
        {[
          { icon: <Clock size={12} />, text: `${dateStr} · ${timeStr}` },
          { icon: <MapPin size={12} />, text: `${item.direction}` },
          { icon: <Heart size={12} />, text: item.attire },
        ].map((info, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              opacity: isFinished ? 0.4 : 0.9,
            }}
          >
            <span style={{ opacity: 0.7 }}>{info.icon}</span>
            <span>{info.text}</span>
          </div>
        ))}
      </div>

      {!isFinished ? (
        <>
          <p
            style={{
              fontSize: "12px",
              marginTop: "14px",
              paddingTop: "14px",
              borderTop: "1px solid rgba(255,255,255,0.2)",
              opacity: 0.8,
              fontStyle: "italic",
              lineHeight: 1.5,
              position: "relative",
            }}
          >
            {item.description}
          </p>
          <CountdownTimer
            targetDate={item.time}
            onFinish={() => setIsFinished(true)}
          />
        </>
      ) : (
        <p
          style={{
            fontSize: "12px",
            marginTop: "14px",
            paddingTop: "14px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            opacity: 0.35,
            fontStyle: "italic",
          }}
        >
          This auspicious time has passed.
        </p>
      )}
    </div>
  );
};

// Floating particle
const Particle = ({ style }) => (
  <div
    style={{
      position: "absolute",
      borderRadius: "50%",
      background: "rgba(255,220,100,0.6)",
      pointerEvents: "none",
      animation: "floatParticle 6s ease-in-out infinite",
      ...style,
    }}
  />
);

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [started, setStarted] = useState(() => {
    return sessionStorage.getItem("splashShown") === "true";
  });
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio("/song.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
  }, []);

  // 👇 add this function here
  const handleStart = () => {
    audioRef.current.play();
    sessionStorage.setItem("splashShown", "true");
    setStarted(true);
  };

  const downloadPDF = async () => {
    setIsGenerating(true);
    try {
      const loadScript = (url) =>
        new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = url;
          script.onload = resolve;
          document.head.appendChild(script);
        });
      if (!window.jspdf) {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
        );
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js",
        );
      }
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.setFillColor(139, 0, 0);
      doc.rect(0, 0, 210, 40, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.text("ALUTH AVURUDU NEKATH 2026", 105, 20, { align: "center" });
      doc.setFontSize(12);
      doc.text("Official Auspicious Times Seettuwa", 105, 30, {
        align: "center",
      });
      const tableData = NAKATH_DATA.map((n) => [
        n.title,
        `${new Date(n.time).toLocaleDateString()} ${new Date(n.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
        n.direction,
        n.attire,
      ]);
      doc.autoTable({
        startY: 50,
        head: [["Ritual", "Time", "Direction", "Attire Color"]],
        body: tableData,
        headStyles: { fillColor: [139, 0, 0], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(
        "Generated by Aurudu 2026 Portal • Suba Aluth Avuruddak Wewa!",
        105,
        doc.internal.pageSize.height - 10,
        { align: "center" },
      );
      doc.save("Aurudu_Nekath_2026.pdf");
    } catch (error) {
      console.error("PDF Export failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const particles = Array.from({ length: 18 }, (_, i) => ({
    width: `${4 + Math.random() * 6}px`,
    height: `${4 + Math.random() * 6}px`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${5 + Math.random() * 5}s`,
    opacity: 0.4 + Math.random() * 0.4,
  }));

  return (
    <>
      {!started && (
        <div
          onClick={handleStart}
          style={{
            height: "100vh",
            width: "100vw",
            background: "linear-gradient(135deg, #4a0000, #8B0000)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            color: "white",
            textAlign: "center",
            padding: "24px",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999,
            overflowY: "auto",
          }}
        >
          <style>{`
          @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.05);opacity:0.8} }
          @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        `}</style>
          <div
            style={{
              fontSize: "80px",
              marginBottom: "24px",
              animation: "pulse 2s ease infinite",
            }}
          >
            🌅
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 8vw, 72px)",
              fontWeight: "900",
              background: "linear-gradient(135deg, #ffffff, #fde68a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: "12px",
              animation: "fadeIn 0.8s ease both",
            }}
          >
            Nekath Portal
          </h1>
          <p
            style={{
              fontFamily: "'Abhaya Libre', serif",
              fontSize: "clamp(16px, 3vw, 22px)",
              color: "#fde68a",
              opacity: 0.9,
              marginBottom: "48px",
              animation: "fadeIn 0.8s 0.2s ease both",
            }}
          >
            සිංහල හා හින්දු අලුත් අවුරුදු නැකැත් සීට්ටුව
          </p>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.4)",
              borderRadius: "50px",
              padding: "16px 40px",
              fontSize: "16px",
              fontWeight: "700",
              letterSpacing: "0.05em",
              animation: "pulse 1.5s ease infinite",
              backdropFilter: "blur(10px)",
            }}
          >
            🎵 Tap to Enter & Play Music
          </div>
          <p
            style={{
              marginTop: "24px",
              fontSize: "12px",
              opacity: 0.4,
              fontFamily: "'Abhaya Libre', serif",
            }}
          >
            ඇතුළු වීමට ස්පර්ශ කරන්න
          </p>
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&family=Abhaya+Libre:wght@400;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0506;
          font-family: 'DM Sans', sans-serif;
          color: white;
          overflow-x: hidden;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          33% { transform: translateY(-20px) rotate(120deg); opacity: 1; }
          66% { transform: translateY(10px) rotate(240deg); opacity: 0.4; }
        }

        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes countUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .hero-text-1 { animation: heroReveal 0.8s 0.1s ease both; }
        .hero-text-2 { animation: heroReveal 0.8s 0.3s ease both; }
        .hero-text-3 { animation: heroReveal 0.8s 0.5s ease both; }
        .hero-text-4 { animation: heroReveal 0.8s 0.7s ease both; }

        .time-digit {
          animation: countUp 0.3s ease both;
          display: inline-block;
        }

        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .download-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 20px rgba(220,38,38,0.4);
        }

        .download-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(220,38,38,0.5);
        }

        .download-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .color-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a0a0a; }
        ::-webkit-scrollbar-thumb { background: #8B0000; border-radius: 3px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#0a0506" }}>
        {/* HERO */}
        <div
          style={{
            position: "relative",
            background:
              "linear-gradient(180deg, #4a0000 0%, #8B0000 40%, #6d0000 100%)",
            overflow: "hidden",
            paddingBottom: "100px",
          }}
        >
          {/* Animated mesh background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.15,
              backgroundImage: `radial-gradient(circle at 20% 50%, #ff6b35 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, #ffb347 0%, transparent 50%),
                              radial-gradient(circle at 50% 80%, #dc143c 0%, transparent 50%)`,
            }}
          />

          {/* Grid pattern */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.06,
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Particles */}
          {particles.map((p, i) => (
            <Particle key={i} style={p} />
          ))}

          {/* Rotating sun ornament */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "360px",
              height: "360px",
              opacity: 0.06,
              animation: "spin-slow 30s linear infinite",
            }}
          >
            <Sun size={360} />
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "800px",
              margin: "0 auto",
              padding: "80px 24px 40px",
              textAlign: "center",
            }}
          >
            {/* Badge */}
            <div
              className="hero-text-1"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,180,0,0.15)",
                border: "1px solid rgba(255,180,0,0.3)",
                borderRadius: "50px",
                padding: "8px 20px",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#fbbf24",
                marginBottom: "32px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#fbbf24",
                  animation: "pulse-ring 1.5s ease-out infinite",
                  position: "relative",
                }}
              />
              2026 Aluth Avurudu
            </div>

            {/* Main title */}
            <h1
              className="hero-text-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(48px, 8vw, 90px)",
                fontWeight: "900",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
                background:
                  "linear-gradient(135deg, #ffffff 0%, #fde68a 50%, #fca5a5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Nekath Portal
            </h1>

            {/* Sinhala subtitle */}
            <p
              className="hero-text-3"
              style={{
                fontFamily: "'Abhaya Libre', serif",
                fontSize: "clamp(16px, 3vw, 22px)",
                opacity: 0.8,
                marginBottom: "40px",
                color: "#fde68a",
                letterSpacing: "0.02em",
              }}
            >
              සිංහල හා හින්දු අලුත් අවුරුදු නැකැත් සීට්ටුව
            </p>

            {/* Live clock */}
            <div
              className="hero-text-4"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "24px",
                background: "rgba(0,0,0,0.3)",
                backdropFilter: "blur(20px)",
                borderRadius: "20px",
                padding: "20px 36px",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    opacity: 0.5,
                    marginBottom: "4px",
                  }}
                >
                  Sri Lanka Time
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "32px",
                    fontWeight: "500",
                    letterSpacing: "0.05em",
                    color: "#fde68a",
                  }}
                >
                  {currentTime.toLocaleTimeString("en-US", { hour12: false })}
                </div>
              </div>
              <div
                style={{
                  width: "1px",
                  height: "50px",
                  background: "rgba(255,255,255,0.15)",
                }}
              />
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    opacity: 0.5,
                    marginBottom: "4px",
                  }}
                >
                  Location
                </div>
                <div
                  style={{
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "16px",
                  }}
                >
                  <MapPin size={16} style={{ color: "#fca5a5" }} />
                  Sri Lanka
                </div>
              </div>
            </div>
          </div>

          {/* Wave bottom */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <svg
              viewBox="0 0 1440 80"
              preserveAspectRatio="none"
              style={{ display: "block", height: "80px" }}
            >
              <path
                d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
                fill="#0a0506"
              />
            </svg>
          </div>
        </div>

        {/* CARDS SECTION */}
        <main
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "40px 20px 80px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "48px",
              animation: "heroReveal 0.6s 0.2s ease both",
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                fontWeight: "700",
                color: "rgba(255,255,255,0.9)",
                marginBottom: "8px",
              }}
            >
              Auspicious Times
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>
              April 14–20, 2026 · Hover to explore
            </p>
          </div>

          <div className="card-grid">
            {NAKATH_DATA.map((item, i) => (
              <NekathCard key={item.id} item={item} index={i} />
            ))}
          </div>

          {/* Info & Download section */}
          <div
            style={{
              marginTop: "60px",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "28px",
              padding: "48px",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              animation: "fadeSlideUp 0.6s 0.4s ease both",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "40px",
                alignItems: "center",
              }}
            >
              {/* Left: description */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "rgba(220,38,38,0.2)",
                      borderRadius: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(220,38,38,0.3)",
                    }}
                  >
                    <Sun size={22} style={{ color: "#fca5a5" }} />
                  </div>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "white",
                    }}
                  >
                    The Tradition
                  </h2>
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.8,
                    fontSize: "14px",
                    marginBottom: "28px",
                  }}
                >
                  The Sinhala and Tamil New Year (Aluth Avurudda) marks the
                  Sun's transition from Pisces to Aries. A unique set of
                  auspicious times (Nakath) calculated by astrologers ensures
                  prosperity and harmony for the coming year.
                </p>
                <button
                  onClick={downloadPDF}
                  disabled={isGenerating}
                  className="download-btn"
                >
                  {isGenerating ? (
                    <>
                      <Loader2
                        size={16}
                        style={{ animation: "spin-slow 1s linear infinite" }}
                      />{" "}
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileDown size={16} /> Download PDF Seettuwa
                    </>
                  )}
                </button>
              </div>

              {/* Right: color palette */}
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "20px",
                  padding: "28px",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#fbbf24",
                    marginBottom: "20px",
                  }}
                >
                  2026 Colour Guide
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  {[
                    {
                      color: "#dc2626",
                      label: "Red",
                      desc: "New Year Dawn & Cooking",
                    },
                    {
                      color: "#16a34a",
                      label: "Green",
                      desc: "Oil Anointing Ritual",
                    },
                    {
                      color: "#f0f0f0",
                      label: "White",
                      desc: "Religious Acts & Work",
                    },
                  ].map((c, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                      }}
                    >
                      <div
                        className="color-dot"
                        style={{
                          background: c.color,
                          border:
                            c.color === "#f0f0f0"
                              ? "1px solid rgba(255,255,255,0.2)"
                              : "none",
                          boxShadow: `0 0 12px ${c.color}66`,
                        }}
                      />
                      <div>
                        <div
                          style={{
                            fontWeight: "600",
                            fontSize: "14px",
                            color: "rgba(255,255,255,0.9)",
                          }}
                        >
                          {c.label}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "rgba(255,255,255,0.4)",
                          }}
                        >
                          {c.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer
            style={{
              marginTop: "60px",
              textAlign: "center",
              color: "rgba(255,255,255,0.2)",
              fontSize: "13px",
              letterSpacing: "0.05em",
            }}
          >
            <p>
              © 2026 Aluth Avurudu Portal &nbsp;·&nbsp; සුභ අලුත් අවුරුද්දක්
              වේවා!
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}
