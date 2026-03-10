import { useState, useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;700;900&family=Black+Han+Sans&family=Do+Hyeon&family=Jua&family=Gothic+A1:wght@400;700;900&family=Gugi&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
@keyframes spin3d{0%{transform:rotateX(90deg) translateY(40px);opacity:0}100%{transform:rotateX(0) translateY(0);opacity:1}}
@keyframes sR{0%{transform:translateX(120%);opacity:0}100%{transform:translateX(0);opacity:1}}
@keyframes sL{0%{transform:translateX(-120%);opacity:0}100%{transform:translateX(0);opacity:1}}
@keyframes zB{0%{transform:scale(2.5);opacity:0;filter:blur(10px)}100%{transform:scale(1);opacity:1;filter:blur(0)}}
@keyframes bI{0%{filter:blur(20px);opacity:0}100%{filter:blur(0);opacity:1}}
@keyframes mL{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes mR{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
@keyframes gP{0%,100%{text-shadow:0 0 30px rgba(220,38,38,0)}50%{text-shadow:0 0 80px rgba(220,38,38,0.6),0 0 160px rgba(220,38,38,0.2)}}
@keyframes dX{0%{transform:scaleX(0)}100%{transform:scaleX(1)}}
@keyframes fU{0%{transform:translateY(30px);opacity:0}100%{transform:translateY(0);opacity:1}}
@keyframes dSvg{0%{stroke-dashoffset:1000}100%{stroke-dashoffset:0}}
@keyframes lPop{0%{transform:translateY(40px) rotateX(-90deg);opacity:0}100%{transform:translateY(0) rotateX(0);opacity:1}}
@keyframes bU{0%{transform:translateY(100%);opacity:0}100%{transform:translateY(0);opacity:1}}
@keyframes sSlow{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes scanM{0%{top:-2px}100%{top:100%}}
@keyframes explodeOut{0%{transform:translate(-50%,-50%) scale(0);opacity:0}20%{opacity:1}100%{transform:translate(-50%,-50%) scale(4);opacity:0}}
@keyframes flashW{0%{opacity:0}10%{opacity:0.5}100%{opacity:0}}
@keyframes rB1{0%{transform:translate(-50%,-50%) scale(0.3);opacity:0;border-width:3px}30%{opacity:1}100%{transform:translate(-50%,-50%) scale(3);opacity:0;border-width:0.5px}}
@keyframes rB2{0%{transform:translate(-50%,-50%) scale(0.3);opacity:0;border-width:2px}30%{opacity:0.8}100%{transform:translate(-50%,-50%) scale(5);opacity:0;border-width:0.5px}}
@keyframes rB3{0%{transform:translate(-50%,-50%) scale(0.3);opacity:0}25%{opacity:0.6}100%{transform:translate(-50%,-50%) scale(7);opacity:0}}
@keyframes lRay{0%{opacity:0;transform:rotate(0deg) scale(0.5)}50%{opacity:0.3;transform:rotate(180deg) scale(1.2)}100%{opacity:0;transform:rotate(360deg) scale(0.8)}}
@keyframes wordFly{0%{transform:translateY(80px) scale(0.7);opacity:0;filter:blur(8px)}100%{transform:translateY(0) scale(1);opacity:1;filter:blur(0)}}
@keyframes scUp{0%{transform:scale(0.5);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes dropIn{0%{transform:translateY(-80px) rotate(-10deg);opacity:0}60%{transform:translateY(5px) rotate(1deg);opacity:1}100%{transform:translateY(0) rotate(0);opacity:1}}
@keyframes flipIn{0%{transform:rotateY(90deg);opacity:0}100%{transform:rotateY(0);opacity:1}}
@keyframes crashIn{0%{transform:scale(3) rotate(15deg);opacity:0;filter:blur(15px)}100%{transform:scale(1) rotate(0);opacity:1;filter:blur(0)}}
@keyframes slideUpB{0%{transform:translateY(120%)}70%{transform:translateY(-8%)}100%{transform:translateY(0)}}
@keyframes wipeR{0%{clip-path:inset(0 100% 0 0)}100%{clip-path:inset(0 0 0 0)}}
@keyframes typeChar{0%{opacity:0;transform:scale(0)}50%{transform:scale(1.3)}100%{opacity:1;transform:scale(1)}}
@keyframes splitR{0%{clip-path:polygon(50% 0,50% 0,50% 100%,50% 100%)}100%{clip-path:polygon(0 0,100% 0,100% 100%,0 100%)}}
`;

export default function App() {
  const [phase, setPhase] = useState("intro");
  const [sc, setSc] = useState(0);
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (phase !== "intro") return;
    const t = [
      setTimeout(() => setSc(1), 0),
      setTimeout(() => setSc(2), 2500),
      setTimeout(() => setSc(3), 5200),
      setTimeout(() => setSc(4), 8800),
      setTimeout(() => setSc(5), 12500),
      setTimeout(() => setSc(6), 16000),
      setTimeout(() => setSc(7), 19000),
      setTimeout(() => setSc(8), 22500),
      setTimeout(() => setSc(9), 27000),
      setTimeout(() => setSc(10), 30000),
      setTimeout(() => setSc(11), 35000),
      setTimeout(() => setPhase("main"), 36000),
    ];
    return () => t.forEach(clearTimeout);
  }, [phase]);

  const skip = () => { setSc(11); setTimeout(() => setPhase("main"), 500); };

  return (
    <div>
      <style>{CSS}</style>
      {phase === "intro" && <Intro sc={sc} skip={skip} />}
      {phase === "main" && !page && <MainSite nav={setPage} />}
      {phase === "main" && page && <SvcPage id={page} back={() => setPage(null)} />}
    </div>
  );
}

function YC({ on }) { const [y, sY] = useState(2016); useEffect(() => { if (!on) return; let v = 2016; const t = setInterval(() => { v++; sY(v); if (v >= 2026) clearInterval(t); }, 300); return () => clearInterval(t); }, [on]); return String(y); }
function NC({ on }) { const [n, sN] = useState(0); useEffect(() => { if (!on) return; const s = Date.now(); const t = setInterval(() => { const p = Math.min((Date.now() - s) / 3500, 1); sN(Math.floor(p * p * p * 10000)); if (p >= 1) { sN(10000); clearInterval(t); } }, 30); return () => clearInterval(t); }, [on]); return n.toLocaleString(); }

function WLogo({ sz = 100, anim = false, glow = false }) {
  const c = "#2B8FBF";
  return (
    <svg width={sz} height={sz * 0.75} viewBox="0 0 200 150" fill="none" style={glow ? { filter: `drop-shadow(0 0 30px ${c}A0) drop-shadow(0 0 60px ${c}60)` } : {}}>
      <path d="M40 20 L80 130 L100 70 L120 130 L160 20" stroke={c} strokeWidth="8" fill="none" strokeLinecap="round" style={anim ? { strokeDasharray: 500, strokeDashoffset: 500, animation: "dSvg 2s ease-out forwards" } : {}} />
      <path d="M25 20 L70 130 L100 50 L130 130 L175 20" stroke={c} strokeWidth="5" fill="none" opacity="0.4" style={anim ? { strokeDasharray: 600, strokeDashoffset: 600, animation: "dSvg 2s ease-out 0.3s forwards" } : {}} />
      <path d="M55 20 L85 130 L100 85 L115 130 L145 20" stroke={c} strokeWidth="3" fill="none" opacity="0.25" style={anim ? { strokeDasharray: 400, strokeDashoffset: 400, animation: "dSvg 2s ease-out 0.6s forwards" } : {}} />
    </svg>
  );
}

/* ═══ INTRO ═══ */
function Intro({ sc, skip }) {
  const kws = ["네이버 플레이스", "배달플랫폼", "포커스미디어", "블로그 SEO", "체험단", "영상 제작", "검색광고", "파워링크", "인쇄물", "SNS 마케팅", "리뷰 관리", "브랜드블로그", "타겟핏", "쿠팡이츠", "옥외 광고"];
  const svcs = ["PERFORMANCE", "DELIVERY", "MEDIA", "CONTENTS", "TARGETFIT", "PRODUCTION"];
  const v = (a, b) => ({ opacity: sc >= a && sc < b ? 1 : 0, transition: sc >= b ? "opacity 0.3s" : "opacity 0.8s" });

  const svcW = [
    { t: "네이버 플레이스", x: "12%", y: "18%", sz: 22, dl: 0, c: "#2563EB" },
    { t: "포커스미디어", x: "62%", y: "12%", sz: 26, dl: 0.1, c: "#DC2626" },
    { t: "배달플랫폼", x: "22%", y: "72%", sz: 24, dl: 0.2, c: "#EA580C" },
    { t: "블로그 SEO", x: "72%", y: "68%", sz: 20, dl: 0.15, c: "#2563EB" },
    { t: "체험단", x: "8%", y: "42%", sz: 30, dl: 0.25, c: "#8B5CF6" },
    { t: "검색광고", x: "78%", y: "38%", sz: 22, dl: 0.3, c: "#2563EB" },
    { t: "영상 제작", x: "38%", y: "82%", sz: 18, dl: 0.35, c: "#059669" },
    { t: "인쇄물", x: "52%", y: "22%", sz: 16, dl: 0.4, c: "#059669" },
    { t: "SNS", x: "82%", y: "52%", sz: 28, dl: 0.2, c: "#8B5CF6" },
    { t: "리뷰 관리", x: "18%", y: "58%", sz: 18, dl: 0.45, c: "#EA580C" },
    { t: "파워링크", x: "48%", y: "8%", sz: 20, dl: 0.3, c: "#2563EB" },
    { t: "타겟핏", x: "32%", y: "52%", sz: 24, dl: 0.15, c: "#DB2777" },
  ];

  return (
    <div onClick={skip} style={{ position: "fixed", inset: 0, overflow: "hidden", cursor: "pointer", userSelect: "none", fontFamily: "'Noto Sans KR',sans-serif" }}>

      {/* Dynamic background */}
      <div style={{ position: "absolute", inset: 0, transition: "background 0.8s ease",
        background: (sc >= 3 && sc < 4) ? "#fff" : (sc >= 5 && sc < 6) ? "#0a0f20" : (sc >= 7 && sc < 8) ? "#f5f5f0" : "#000" }} />

      {/* Scanline */}
      {sc >= 1 && sc < 11 && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 50 }}>
          <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,rgba(43,143,191,${(sc >= 3 && sc < 4) || (sc >= 7 && sc < 8) ? 0.1 : 0.05}),transparent)`, animation: "scanM 5s linear infinite" }} />
        </div>
      )}

      {/* S1: Grid + WIZ */}
      <div style={{ position: "absolute", inset: 0, ...v(1, 2) }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`v${i}`} style={{ position: "absolute", top: 0, bottom: 0, left: `${(i + 1) * 16.66}%`, width: 1, background: "rgba(255,255,255,0.03)", transform: sc >= 1 ? "scaleY(1)" : "scaleY(0)", transformOrigin: "top", transition: `transform 1s ease-out ${i * 80}ms` }} />
        ))}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.03)", fontSize: "clamp(100px,25vw,250px)", fontWeight: 900, animation: sc >= 1 ? "splitR 1.2s cubic-bezier(.16,1,.3,1) both" : "none" }}>WIZ</p>
        </div>
      </div>

      {/* S2: Logo — drop letters */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", ...v(2, 3) }}>
        <div style={{ position: "absolute", left: "10%", right: "10%", top: "50%", height: 1, background: "rgba(255,255,255,0.15)", transformOrigin: "left", animation: sc >= 2 ? "dX 1s ease-out forwards" : "none" }} />
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, letterSpacing: "0.6em", marginBottom: 16, animation: sc >= 2 ? "fU 0.6s ease-out 0.5s both" : "none" }}>SINCE 2016</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 2 }}>
            {"WIZTHEPLANNING".split("").map((ch, i) => (
              <span key={i} style={{ display: "inline-block", color: "#fff", fontSize: "clamp(16px,2.5vw,24px)", fontWeight: 300, letterSpacing: "0.25em", animation: sc >= 2 ? `dropIn 0.5s cubic-bezier(.34,1.56,.64,1) ${0.3 + i * 0.06}s both` : "none" }}>{ch}</span>
            ))}
          </div>
          <div style={{ width: 30, height: 2, background: "#2B8FBF", margin: "20px auto 0", transformOrigin: "left", animation: sc >= 2 ? "dX 0.5s ease-out 1.5s both" : "none" }} />
        </div>
      </div>

      {/* S3: Big tagline — WHITE BG, dark text, color accents */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px", ...v(3, 4) }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ overflow: "hidden" }}>
            <p style={{ color: "#111", fontSize: "clamp(38px,9vw,92px)", fontWeight: 900, lineHeight: 1.08, animation: sc >= 3 ? "crashIn .6s cubic-bezier(.16,1,.3,1) both" : "none" }}>당신의</p>
          </div>
          <div style={{ overflow: "hidden" }}>
            <p style={{ fontSize: "clamp(38px,9vw,92px)", fontWeight: 900, lineHeight: 1.08, color: "#2B8FBF", animation: sc >= 3 ? "slideUpB .7s cubic-bezier(.16,1,.3,1) .2s both" : "none" }}>마케팅팀이</p>
          </div>
          <div>
            <p style={{ color: "#111", fontSize: "clamp(38px,9vw,92px)", fontWeight: 900, lineHeight: 1.08, animation: sc >= 3 ? "wipeR .8s ease-out .5s both" : "none" }}>되겠습니다.</p>
          </div>
          <div style={{ width: 80, height: 4, background: "#DC2626", margin: "20px auto 0", transformOrigin: "left", animation: sc >= 3 ? "dX .5s ease-out 1.2s both" : "none" }} />
        </div>
      </div>

      {/* S4: Service words — colored keywords flying in */}
      <div style={{ position: "absolute", inset: 0, ...v(4, 5) }}>
        {svcW.map((w, i) => (
          <div key={i} style={{ position: "absolute", left: w.x, top: w.y, color: w.c, fontSize: w.sz, fontWeight: 900, opacity: 0.5, animation: sc >= 4 ? `dropIn 0.5s cubic-bezier(.34,1.56,.64,1) ${w.dl}s both` : "none" }}>{w.t}</div>
        ))}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#fff", fontSize: "clamp(28px,5vw,56px)", fontWeight: 900, animation: sc >= 4 ? "crashIn .6s cubic-bezier(.16,1,.3,1) .5s both" : "none" }}>
              6가지 <span style={{ color: "#2B8FBF" }}>솔루션</span>
            </p>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(14px,2vw,20px)", marginTop: 12, animation: sc >= 4 ? "fU .5s ease-out 1s both" : "none" }}>하나의 파트너가 전부 해결합니다</p>
          </div>
        </div>
      </div>

      {/* S5: Marquee — deep navy bg */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", ...v(5, 6) }}>
        {[
          { sp: 12, sz: "clamp(14px,2.5vw,22px)", w: 700, a: 0.08, d: "mL" },
          { sp: 10, sz: "clamp(18px,3vw,28px)", w: 800, a: 0.15, d: "mR" },
          { sp: 8, sz: "clamp(26px,5vw,48px)", w: 900, a: 0.25, d: "mL" },
          { sp: 11, sz: "clamp(16px,2.8vw,24px)", w: 700, a: 0.12, d: "mR" },
          { sp: 13, sz: "clamp(12px,2vw,18px)", w: 700, a: 0.06, d: "mL" },
        ].map((row, r) => (
          <div key={r} style={{ whiteSpace: "nowrap", padding: "6px 0", animation: sc >= 5 ? `${row.d} ${row.sp}s linear infinite` : "none" }}>
            {[...kws, ...kws, ...kws, ...kws].map((k, i) => (
              <span key={i} style={{ display: "inline-block", margin: "0 16px", fontSize: row.sz, fontWeight: row.w, color: `rgba(255,255,255,${row.a})` }}>{k}</span>
            ))}
          </div>
        ))}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "rgba(10,15,32,0.93)", padding: "16px 32px" }}>
            <p style={{ color: "#fff", fontSize: "clamp(24px,4.5vw,48px)", fontWeight: 900, animation: sc >= 5 ? "crashIn .6s cubic-bezier(.16,1,.3,1) both" : "none" }}>모든 마케팅을 <span style={{ color: "#2B8FBF" }}>합니다.</span></p>
          </div>
        </div>
      </div>

      {/* S6: Services flash */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", ...v(6, 7) }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 300, height: 300, border: "1px solid rgba(255,255,255,0.03)", borderRadius: "50%", animation: sc >= 6 ? "sSlow 10s linear infinite" : "none" }} />
        <div style={{ textAlign: "center", perspective: 800 }}>
          {svcs.map((s, i) => (
            <div key={s} style={{ overflow: "hidden" }}>
              <p style={{ color: i === 2 ? "#DC2626" : i === 0 ? "#2563EB" : "#fff", fontSize: "clamp(18px,3.5vw,34px)", fontWeight: 900, letterSpacing: "0.15em", margin: "4px 0", animation: sc >= 6 ? `flipIn .5s cubic-bezier(.16,1,.3,1) ${i * 0.12}s both` : "none", opacity: i === 2 ? 1 : i === 0 || i === 4 ? 0.5 : 0.25 }}>{s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* S7: 340% — WARM WHITE BG, bold typography */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px", ...v(7, 8) }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "baseline" }}>
            {"340%".split("").map((ch, i) => (
              <span key={i} style={{ display: "inline-block", color: ch === "%" ? "#111" : "#DC2626", fontSize: "clamp(60px,15vw,140px)", fontWeight: 900, lineHeight: 1, fontFamily: "'Black Han Sans',sans-serif", animation: sc >= 7 ? `typeChar .3s cubic-bezier(.34,1.56,.64,1) ${i * 0.15}s both` : "none" }}>{ch}</span>
            ))}
          </div>
          <div style={{ marginTop: 20, animation: sc >= 7 ? "wipeR .8s ease-out 1s both" : "none" }}>
            <p style={{ color: "#333", fontSize: "clamp(16px,2.5vw,24px)", fontWeight: 700, fontFamily: "'Noto Sans KR',sans-serif" }}>평균 매출 성과 향상</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(32px,6vw,80px)", marginTop: 48 }}>
            {[["4.8/5", "고객 만족도", "#2B8FBF"], ["95%", "재계약률", "#DC2626"]].map(([num, label, col], i) => (
              <div key={i} style={{ textAlign: "center", animation: sc >= 7 ? `dropIn .5s cubic-bezier(.34,1.56,.64,1) ${1.3 + i * 0.2}s both` : "none" }}>
                <p style={{ color: col, fontSize: "clamp(24px,4vw,42px)", fontWeight: 900, fontFamily: "'Black Han Sans',sans-serif" }}>{num}</p>
                <p style={{ color: "#666", fontSize: 12, marginTop: 4 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* S8: Year + Number */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px", ...v(8, 9) }}>
        <div style={{ textAlign: "center", width: "100%", maxWidth: 700 }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: "clamp(32px,6vw,80px)", marginBottom: 48 }}>
            <div style={{ animation: sc >= 8 ? "flipIn .5s ease-out both" : "none" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, letterSpacing: "0.25em", marginBottom: 10 }}>SINCE</p>
              <p style={{ color: "#fff", fontSize: "clamp(40px,9vw,88px)", fontWeight: 900, fontVariantNumeric: "tabular-nums" }}><YC on={sc >= 8} /></p>
            </div>
            <div style={{ animation: sc >= 8 ? "flipIn .5s ease-out .3s both" : "none" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, letterSpacing: "0.25em", marginBottom: 10 }}>CLIENTS</p>
              <p style={{ color: "#fff", fontSize: "clamp(40px,9vw,88px)", fontWeight: 900, fontVariantNumeric: "tabular-nums" }}><NC on={sc >= 8} /></p>
            </div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <p style={{ color: "#fff", fontSize: "clamp(34px,7vw,76px)", fontWeight: 900, letterSpacing: "-0.04em", animation: sc >= 8 ? "bU .8s cubic-bezier(.16,1,.3,1) 3.8s both" : "none" }}>
              <span style={{ color: "#2B8FBF" }}>결과</span>로 증명합니다.
            </p>
          </div>
        </div>
      </div>

      {/* S9: Final tagline */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px", ...v(9, 10) }}>
        <div style={{ textAlign: "center" }}>
          <span style={{ display: "block", color: "#fff", fontSize: "clamp(32px,6.5vw,68px)", fontWeight: 900, lineHeight: 1.2, animation: sc >= 9 ? "crashIn .5s cubic-bezier(.16,1,.3,1) both" : "none" }}>모든 마케팅의</span>
          <span style={{ display: "block", marginTop: 4, fontSize: "clamp(32px,6.5vw,68px)", fontWeight: 900, lineHeight: 1.2, color: "#DC2626", animation: sc >= 9 ? "crashIn .5s cubic-bezier(.16,1,.3,1) .2s both, gP 2s ease-in-out .7s infinite" : "none" }}>시작과 끝.</span>
        </div>
      </div>

      {/* S10: Logo reveal + burst */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", ...v(10, 11) }}>
        {sc >= 10 && [0, 45, 90, 135].map(d => (
          <div key={d} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: `linear-gradient(${d}deg,transparent 30%,rgba(43,143,191,.1) 50%,transparent 70%)`, animation: `lRay 3s ease-in-out ${d * 5}ms infinite` }} />
        ))}
        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28, animation: sc >= 10 ? "fU .8s ease-out both" : "none" }}>
            <WLogo sz={120} anim={sc >= 10} glow={sc >= 10} />
          </div>
          <div style={{ display: "flex", justifyContent: "center", perspective: 600 }}>
            {"WIZ THE PLANNING".split("").map((ch, i) => (
              <span key={i} style={{ display: "inline-block", color: "#fff", fontSize: "clamp(16px,3vw,30px)", fontWeight: 300, letterSpacing: "0.22em", animation: sc >= 10 ? `lPop .4s cubic-bezier(.16,1,.3,1) ${1.5 + i * 0.08}s both` : "none", minWidth: ch === " " ? "0.5em" : "auto" }}>{ch === " " ? "\u00A0" : ch}</span>
            ))}
          </div>
          {sc >= 10 && (
            <>
              <div style={{ position: "fixed", inset: 0, background: "#fff", animation: "flashW 0.8s ease-out 3.3s both", pointerEvents: "none", zIndex: 10 }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", width: 100, height: 100, borderRadius: "50%", border: "3px solid rgba(43,143,191,0.8)", animation: "rB1 1s ease-out 3.3s both", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", width: 100, height: 100, borderRadius: "50%", border: "2px solid rgba(43,143,191,0.5)", animation: "rB2 1.3s ease-out 3.35s both", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", width: 100, height: 100, borderRadius: "50%", border: "1px solid rgba(43,143,191,0.3)", animation: "rB3 1.8s ease-out 3.4s both", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(43,143,191,0.4) 0%, transparent 70%)", animation: "explodeOut 1.5s ease-out 3.3s both", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -5, left: "-20%", right: "-20%", height: 40, background: "linear-gradient(90deg, transparent, rgba(43,143,191,0.5), transparent)", backgroundSize: "200% 100%", animation: "shimmer 1s ease-in-out 3.8s both", mixBlendMode: "screen", pointerEvents: "none" }} />
            </>
          )}
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, letterSpacing: "0.3em", marginTop: 28, animation: sc >= 10 ? "fU .5s ease-out 4s both" : "none" }}>모든 마케팅의 시작과 끝</p>
        </div>
      </div>

      {/* Fade */}
      <div style={{ position: "absolute", inset: 0, background: "#000", opacity: sc >= 11 ? 1 : 0, transition: "opacity 0.7s", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 60 }}>
        <div style={{ height: 2, background: "rgba(43,143,191,0.5)", width: `${Math.min((sc / 11) * 100, 100)}%`, transition: "width 1s ease" }} />
        <p style={{ textAlign: "center", color: `rgba(${(sc >= 3 && sc < 4) || (sc >= 7 && sc < 8) ? "0,0,0" : "255,255,255"},0.2)`, fontSize: 9, letterSpacing: "0.3em", padding: "10px 0" }}>CLICK TO SKIP</p>
      </div>
    </div>
  );
}

/* ═══ GRID CELL ═══ */
function GC({ s, nav }) {
  const [h, sH] = useState(false);
  return (
    <div onMouseEnter={() => sH(true)} onMouseLeave={() => sH(false)} onClick={() => nav(s.id)} style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}>
      <div style={{ position: "absolute", inset: 0, background: s.bg, transition: "transform .7s", transform: h ? "scale(1.08)" : "scale(1)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: s.dc, opacity: 0.25 }} />
      <div style={{ position: "absolute", inset: 0, background: h ? "rgba(0,0,0,.2)" : "rgba(0,0,0,0)", transition: "background .5s" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", pointerEvents: "none" }}>
        <p style={{ fontFamily: s.ft, fontSize: "clamp(50px,10vw,130px)", fontWeight: 900, letterSpacing: "-0.05em", whiteSpace: "nowrap", color: h ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.04)", transition: "color .7s" }}>{s.bt}</p>
      </div>
      <div style={{ position: "relative", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "clamp(16px,2vw,24px)" }}>
        <p style={{ color: "rgba(255,255,255,.5)", fontSize: 9, letterSpacing: ".2em", fontFamily: "'Gothic A1'" }}>{s.lb}</p>
        <div>
          <h2 style={{ color: "#fff", fontFamily: s.ft, fontWeight: 900, fontSize: "clamp(18px,2.5vw,32px)", lineHeight: 1.2, whiteSpace: "pre-line", marginBottom: 4 }}>{s.nm}</h2>
          <p style={{ color: "rgba(255,255,255,.6)", fontSize: 11, maxWidth: 250, fontFamily: "'Noto Sans KR'", opacity: h ? 1 : 0, transform: h ? "translateY(0)" : "translateY(4px)", transition: "all .4s" }}>{s.sb}</p>
          <div style={{ marginTop: 12, opacity: h ? 0.7 : 0.25, transition: "opacity .3s" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function IC({ d }) {
  const [h, sH] = useState(false);
  return (
    <div onMouseEnter={() => sH(true)} onMouseLeave={() => sH(false)} style={{ padding: "24px 32px", background: h ? "#000" : "#fff", cursor: "pointer", transition: "all .3s" }}>
      <p style={{ fontSize: 10, letterSpacing: ".15em", marginBottom: 12, color: h ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.3)", transition: "color .3s" }}>{d.sv}</p>
      <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8, color: h ? "#fff" : "#111", transition: "color .3s" }}>{d.nm}</h3>
      <p style={{ fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-line", color: h ? "rgba(255,255,255,.5)" : "rgba(0,0,0,.4)", transition: "color .3s" }}>{d.cp}</p>
    </div>
  );
}

/* ═══ MAIN ═══ */
function MainSite({ nav }) {
  const [fi, sF] = useState(false);
  useEffect(() => { setTimeout(() => sF(true), 50); }, []);
  return (
    <div style={{ fontFamily: "'Noto Sans KR',sans-serif", opacity: fi ? 1 : 0, transition: "opacity .6s" }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, mixBlendMode: "difference" }}>
        <div style={{ padding: "0 20px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: ".15em" }}>WIZ THE PLANNING</span>
          <div style={{ display: "flex", gap: 28 }}>
            {["SERVICES", "PORTFOLIO", "ABOUT", "CONTACT"].map(m => <a key={m} href="#" style={{ color: "#fff", fontSize: 10, letterSpacing: ".18em", textDecoration: "none" }}>{m}</a>)}
          </div>
        </div>
      </nav>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "33.33vh 33.33vh 33.34vh", width: "100%", height: "100vh" }}>
        {D.map(s => <GC key={s.id} s={s} nav={nav} />)}
      </div>
      <section style={{ padding: "80px 24px", background: "#f2f1ec" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ fontSize: 10, letterSpacing: ".35em", fontWeight: 700, color: "rgba(0,0,0,.25)", marginBottom: 20 }}>INDUSTRY SOLUTION</p>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(26px,3.5vw,42px)", color: "#111", marginBottom: 56 }}>어떤 업종이세요?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "rgba(0,0,0,.08)" }}>
            {IN.map(d => <IC key={d.nm} d={d} />)}
          </div>
        </div>
      </section>
      <section style={{ padding: "80px 24px", background: "#111" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 10, letterSpacing: ".35em", fontWeight: 700, marginBottom: 20 }}>CONTACT</p>
          <h2 style={{ color: "#fff", fontWeight: 900, fontSize: "clamp(26px,3.5vw,42px)", marginBottom: 56 }}>마케팅 고민, 지금 바로 상담하세요</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
            <div>
              <div style={{ marginBottom: 40 }}><p style={{ color: "rgba(255,255,255,.4)", fontSize: 10, letterSpacing: ".25em", marginBottom: 8 }}>PHONE</p><p style={{ color: "#fff", fontSize: 28, fontWeight: 900 }}>1670-0704</p></div>
              <div style={{ marginBottom: 40 }}><p style={{ color: "rgba(255,255,255,.4)", fontSize: 10, letterSpacing: ".25em", marginBottom: 8 }}>KAKAOTALK</p><p style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>@위즈더플래닝마케팅</p></div>
              <button style={{ padding: "16px 32px", background: "#FACC15", color: "#000", fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer" }}>카카오톡 상담 바로가기</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["이름", "연락처", "가게명"].map(p => <input key={p} placeholder={p} style={{ width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,.15)", padding: "14px 16px", color: "#fff", fontSize: 14, outline: "none" }} />)}
              <textarea placeholder="문의사항" style={{ width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,.15)", padding: "14px 16px", color: "#fff", fontSize: 14, outline: "none", height: 112, resize: "none" }} />
              <button style={{ width: "100%", padding: 14, background: "#fff", color: "#000", fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer" }}>무료 상담 신청</button>
            </div>
          </div>
        </div>
      </section>
      <footer style={{ padding: "40px 24px", background: "#080808", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}><p style={{ color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: ".15em", marginBottom: 12 }}>WIZ THE PLANNING</p><div style={{ fontSize: 10, color: "rgba(255,255,255,.25)", lineHeight: 1.8 }}><p>대표: 정현우 | 668-81-00391 | 서울시 금천구 가산디지털로 178</p><p>1670-0704 | wiz@wiztheplanning.com</p></div></div>
      </footer>
    </div>
  );
}

/* ═══ SERVICE PAGE ═══ */
function SvcPage({ id, back }) {
  const s = D.find(d => d.id === id);
  const [fi, sF] = useState(false);
  useEffect(() => { setTimeout(() => sF(true), 50); }, []);
  return (
    <div style={{ fontFamily: s.ft, minHeight: "100vh", opacity: fi ? 1 : 0, transition: "opacity .5s" }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", background: "rgba(255,255,255,.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid #eee" }}>
        <button onClick={back} style={{ fontSize: 13, color: "#555", background: "none", border: "none", cursor: "pointer" }}>← 메인으로</button>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", color: "#aaa" }}>WIZ THE PLANNING</span>
      </nav>
      <section style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "flex-end", padding: "80px 24px 48px", background: s.hb }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: s.hd, backgroundSize: "cover", opacity: 0.15 }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", border: "2px solid rgba(255,255,255,.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white" opacity="0.6"><polygon points="5 3 19 12 5 21" /></svg>
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
          <p style={{ color: "rgba(255,255,255,.7)", fontSize: 12, letterSpacing: ".25em", marginBottom: 16 }}>{s.lb}</p>
          <h1 style={{ color: "#fff", fontSize: "clamp(36px,7vw,72px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>{s.ht}</h1>
          <p style={{ color: "rgba(255,255,255,.6)", fontSize: "clamp(14px,1.5vw,18px)", maxWidth: 500, lineHeight: 1.7 }}>{s.ds}</p>
        </div>
      </section>
      <section style={{ padding: 24, background: "#fff", borderBottom: "1px solid #eee" }}>
        <div style={{ maxWidth: 700, display: "flex", flexWrap: "wrap", gap: 10 }}>
          {s.tg.map(t => <span key={t} style={{ padding: "8px 16px", fontSize: 12, background: "#f5f5f5", color: "#555" }}>{t}</span>)}
        </div>
      </section>
      <section style={{ padding: "64px 24px", background: "#fafafa" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#222", marginBottom: 40 }}>서비스 상세</h2>
          {/* Media partners section for 미디어마케팅 */}
          {s.media ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {s.media.map((m, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #eee", overflow: "hidden" }}>
                  <div style={{ padding: "20px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 6, height: 36, background: m.color, flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>{m.name}</p>
                      <p style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{m.sub}</p>
                    </div>
                    <p style={{ marginLeft: "auto", fontSize: 10, color: m.color, fontWeight: 700, letterSpacing: "0.05em" }}>{m.stats}</p>
                  </div>
                  <div style={{ padding: "16px 24px" }}>
                    <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 14 }}>{m.desc}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {m.points.map((pt, j) => (
                        <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                          <span style={{ color: m.color, fontSize: 11, fontWeight: 900, flexShrink: 0, marginTop: 1 }}>•</span>
                          <span style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {s.f2.map((f, i) => (
                <div key={i} style={{ padding: 24, background: "#fff", border: "1px solid #eee" }}>
                  <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, background: s.ac + "15" }}>
                    <span style={{ color: s.ac, fontSize: 12, fontWeight: 900 }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#222", marginBottom: 8 }}>{f.t}</h3>
                  <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{f.d}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section style={{ padding: "64px 24px", textAlign: "center", background: s.ac }}>
        <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 900, marginBottom: 32 }}>{s.ht}</h2>
        <button style={{ padding: "14px 32px", background: "#fff", color: s.ac, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer" }}>무료 상담 받기</button>
      </section>
    </div>
  );
}

/* ═══ DATA ═══ */
const D = [
  { id: "media", lb: "MEDIA MARKETING", nm: "미디어\n마케팅", bt: "MEDIA", ht: "미디어 마케팅", ft: "'Black Han Sans',sans-serif", sb: "포커스미디어 · 타운보드 · GS미디어밋 · CGV · 메가박스", ac: "#DC2626", ds: "엘리베이터TV부터 영화관 스크린까지. 오프라인 미디어의 모든 것을 한 곳에서.", tg: ["FOCUSMEDIA", "TOWNBOARD", "MEDIAMEET", "CGV", "MEGABOX", "HTPOST"], bg: "linear-gradient(160deg,#1a0a0a,#2d1015 60%,#3d151a)", dc: "radial-gradient(ellipse at 75% 25%,rgba(220,38,38,.15),transparent 50%)", hb: "linear-gradient(135deg,#1a0a0a,#3d151a)", hd: "radial-gradient(ellipse at 70% 30%,rgba(220,38,38,.2),transparent 60%)",
    media: [
      { name: "FOCUSMEDIA", sub: "No.1 엘리베이터TV", color: "#2563EB", stats: "4,600단지 · 6만대 설치 · 수도권 점유율 64%", desc: "서울·수도권을 가장 확실하게 공략하는 No.1 엘리베이터TV. 매일 반복적으로 만나는 생활밀착형 미디어로, 입주민 일평균 4.1회 이상 이용하며 광고 주목도 49%, 회피율 20%로 어떤 매체보다 높은 주목도를 보장합니다.", points: ["서울 68% · 경기 63% · 인천 61% 점유율", "입주민 월 평균 소득 685만원, 구매 가능성 높은 소비자", "동네상권 광고 인지율 82%, 구전 경험 47%", "아파트 단지 단위 판매, 15초 일 90회 송출"] },
      { name: "TOWNBOARD", sub: "아파트 엘리베이터 미디어보드", color: "#DC2626", stats: "3,650단지 · 67,517대 · 237만 세대", desc: "전국 아파트 1,100만 가구(52%)를 대상으로 삶에 녹아드는 일상 속 미디어 광고. 하루 4회 이상, 매주 30회 이상 반복 노출되며 광고 인지도 1.6배 상승, 구매 경험 31%의 성과를 기록합니다.", points: ["엘리베이터 내부 25인치 + 외부 50/55인치 송출", "래미안·자이·힐스테이트 등 대한민국 대표 아파트 입점", "심의 필증 없이 빠른 광고 집행 가능", "모니터 1대당 1일 최대 100회 보장 송출"] },
      { name: "GS MEDIAMEET", sub: "아파트 엘리베이터 매체", color: "#3B82F6", stats: "13,472대 · 전국 커버리지", desc: "가시성 및 주목도가 높은 아파트 엘리베이터TV. 강제 노출이 가능한 공간 점유형 미디어로, 일평균 EV 이용 6회 이상 60%, 미디어 시청 빈도 96%의 높은 광고 효과를 제공합니다.", points: ["15초 일 100회 송출, 1개월 단위 집행", "패키지/로컬 광고 모두 가능", "전국 수도권 9,600대 + 지방 3,800대", "3/6/12개월 계약 시 10/20/30% 할인"] },
      { name: "CGV 스크린광고", sub: "영화관 스크린 광고", color: "#E11D48", stats: "196개 극장 · 1,373개 스크린 · 월 500만명", desc: "전세계 영화 관람객이 사랑하는 글로벌 컬처플렉스 CGV. 연간 약 2억 명 관람객에게 18.4%의 낮은 회피율로 집중력 있게 다가가며, 광고 노출률 91%의 압도적 도달력을 제공합니다.", points: ["2030 핵심 소비층 60% 이상 집중", "상영 전 몰입형 대형 스크린 + 서라운드 사운드", "SMART 상품: 1/4 Cov. 월 0.9억원부터", "지역 타깃팅으로 지점별 로컬 광고 가능"] },
      { name: "MEGABOX 스크린광고", sub: "프리미엄 문화공간 광고", color: "#7C3AED", stats: "100개 극장 · 686개 스크린 · 월 300만명", desc: "프리미엄 문화공간 메가박스의 몰입도 높은 상영 환경. 대형 쇼핑몰 입점 시너지로 상영 후 즉시 방문 효과가 이어지며, 평균 노출률 98%로 브랜드 인지도와 호감도를 동시에 강화합니다.", points: ["메가M 상품: All 108개 극장 월 0.1억원부터", "대형 쇼핑몰·복합문화공간 입점 즉시 방문 유도", "총 광고 시간 300초, 15초/30초 구좌", "쇼핑·외식·여가 결합 일상 문화 공간 속 광고"] },
      { name: "HTPOST", sub: "아파트 우편함 광고", color: "#059669", stats: "전국 아파트 단지 우편함", desc: "아파트 우편함을 통한 직접 전달형 인쇄 광고. 입주민이 매일 확인하는 우편함에 전단지, 쿠폰 등을 직접 배포하여 높은 열람율과 즉각적인 행동 유도가 가능합니다.", points: ["입주민 직접 전달, 높은 열람율", "전단지·쿠폰·샘플 배포 가능", "단지별 세밀한 타깃팅", "온라인과 결합한 O2O 마케팅 효과"] },
    ],
    f2: [{ t: "FOCUSMEDIA", d: "수도권 No.1 엘리베이터TV" }, { t: "TOWNBOARD", d: "전국 아파트 미디어보드" }, { t: "CGV·MEGABOX", d: "영화관 스크린 광고" }, { t: "GS미디어밋·HTPOST", d: "엘리베이터TV + 우편함" }] },
  { id: "performance", lb: "PERFORMANCE", nm: "퍼포먼스\n마케팅", bt: "SEARCH", ht: "퍼포먼스 마케팅", ft: "'Do Hyeon',sans-serif", sb: "네이버 플레이스 · 파워링크 · 블로그 SEO", ac: "#2563EB", ds: "검색 1위는 우연이 아닙니다.", tg: ["플레이스 최적화", "파워링크", "블로그 SEO", "검색광고"], bg: "linear-gradient(160deg,#0a0f1f,#0f1a35 60%,#142550)", dc: "radial-gradient(ellipse at 80% 60%,rgba(37,99,235,.12),transparent 50%)", hb: "linear-gradient(135deg,#0a0f1f,#142550)", hd: "radial-gradient(ellipse at 70% 50%,rgba(37,99,235,.15),transparent 60%)", f2: [{ t: "플레이스 최적화", d: "검색 상위 노출" }, { t: "파워링크", d: "효율적 검색광고" }, { t: "블로그 SEO", d: "키워드 블로그" }, { t: "성과 리포트", d: "순위 분석" }] },
  { id: "contents", lb: "CONTENTS", nm: "콘텐츠\n마케팅", bt: "VIRAL", ht: "콘텐츠 마케팅", ft: "'Jua',sans-serif", sb: "브랜드블로그 · 체험단 · SNS · 인스타그램", ac: "#8B5CF6", ds: "진짜 고객이 쓰는 진짜 리뷰.", tg: ["브랜드블로그", "체험단", "SNS운영", "인스타그램"], bg: "linear-gradient(160deg,#150a25,#251540 60%,#351f5a)", dc: "radial-gradient(ellipse at 25% 75%,rgba(139,92,246,.12),transparent 50%)", hb: "linear-gradient(135deg,#150a25,#351f5a)", hd: "radial-gradient(ellipse at 30% 70%,rgba(139,92,246,.15),transparent 60%)", f2: [{ t: "브랜드블로그", d: "전문 콘텐츠 제작" }, { t: "체험단", d: "모집→방문→리뷰" }, { t: "SNS 대행", d: "인스타/페북 기획" }, { t: "리뷰 관리", d: "네이버/구글 모니터링" }] },
  { id: "delivery", lb: "DELIVERY PLATFORM", nm: "배달플랫폼\n마케팅", bt: "ORDER", ht: "배달플랫폼 마케팅", ft: "'Gugi',sans-serif", sb: "배민 · 요기요 · 쿠팡이츠 통합 관리", ac: "#EA580C", ds: "배달 매출을 끝까지 책임.", tg: ["배민", "요기요", "쿠팡이츠", "메뉴최적화"], bg: "linear-gradient(160deg,#12100a,#1e1a10 60%,#2a2415)", dc: "radial-gradient(ellipse at 60% 40%,rgba(234,88,12,.1),transparent 50%)", hb: "linear-gradient(135deg,#12100a,#2a2415)", hd: "radial-gradient(ellipse at 60% 40%,rgba(234,88,12,.15),transparent 60%)", f2: [{ t: "앱 등록 & 세팅", d: "3대 플랫폼 입점" }, { t: "메뉴 최적화", d: "사진/구성/가격" }, { t: "프로모션", d: "쿠폰/할인/광고" }, { t: "리뷰 관리", d: "별점 관리" }] },
  { id: "targetfit", lb: "TARGETFIT", nm: "타겟핏\n마케팅", bt: "TARGET", ht: "타겟핏 마케팅", ft: "'Gothic A1',sans-serif", sb: "정밀 타깃팅 · 데이터 기반 마케팅", ac: "#DB2777", ds: "데이터 기반 정밀 타깃팅.", tg: ["정밀 타깃팅", "데이터 분석", "맞춤 광고", "전환 최적화"], bg: "linear-gradient(160deg,#1a0a18,#2d0f28 60%,#401540)", dc: "radial-gradient(ellipse at 40% 30%,rgba(219,39,119,.1),transparent 50%)", hb: "linear-gradient(135deg,#1a0a18,#401540)", hd: "radial-gradient(ellipse at 50% 40%,rgba(219,39,119,.15),transparent 60%)", f2: [{ t: "데이터 분석", d: "업종/상권/고객층" }, { t: "정밀 타깃팅", d: "연령/성별/관심사" }, { t: "전환 최적화", d: "노출→전환" }, { t: "리타깃팅", d: "잠재고객 재노출" }] },
  { id: "production", lb: "PRODUCTION", nm: "촬영\n제작", bt: "STUDIO", ht: "촬영 / 제작", ft: "'Noto Sans KR',sans-serif", sb: "매장 사진 · 숏폼 영상 · 메뉴판", ac: "#059669", ds: "전문가의 손길로 만드는 콘텐츠.", tg: ["매장사진", "숏폼영상", "메뉴판", "전단지"], bg: "linear-gradient(160deg,#0a1210,#0f201a 60%,#153025)", dc: "radial-gradient(ellipse at 50% 50%,rgba(5,150,105,.1),transparent 50%)", hb: "linear-gradient(135deg,#0a1210,#153025)", hd: "radial-gradient(ellipse at 50% 50%,rgba(5,150,105,.15),transparent 60%)", f2: [{ t: "매장 촬영", d: "인테리어/메뉴" }, { t: "숏폼 영상", d: "릴스/쇼츠 제작" }, { t: "메뉴판/전단지", d: "맞춤 인쇄물" }, { t: "명함/배너", d: "브랜드 제작물" }] },
];
const IN = [
  { nm: "병원 / 의료", cp: "환자가 검색할 때\n가장 먼저 보이는 병원", sv: "퍼포먼스 + 콘텐츠 + 미디어" },
  { nm: "음식점", cp: "발걸되는 맛집,\n찾아오는 맛집으로", sv: "퍼포먼스 + 콘텐츠 + 촬영/제작" },
  { nm: "배달 전문", cp: "주문 수 늘리는\n가장 확실한 방법", sv: "배달플랫폼 + 퍼포먼스 + 촬영/제작" },
  { nm: "부동산", cp: "아파트 주민이\n매일 보는 광고", sv: "미디어 + 퍼포먼스 + 콘텐츠" },
  { nm: "학원 / 교육", cp: "학부모가 신뢰하는\n학원 만들기", sv: "퍼포먼스 + 콘텐츠 + 미디어" },
  { nm: "뷰티 / 운동", cp: "프리미엄 브랜드\n이미지 구축", sv: "퍼포먼스 + 콘텐츠 + 촬영/제작" },
];
