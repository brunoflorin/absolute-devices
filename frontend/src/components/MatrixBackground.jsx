// /frontend/src/components/MatrixBackground.jsx
import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.1 + 0.2,
      o: 0.3 + Math.random() * 0.5,
    }));

    const letters = "01";
    const fontSize = 18;
    const cols = Math.floor(w / fontSize);
    const drops = Array(cols).fill(0).map(() => Math.floor(Math.random() * (h / fontSize)));

    let alpha = 0;
    const fadeSpeed = 0.008;
    let rafId;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
      ctx.fillRect(0, 0, w, h);

      for (const s of stars) {
        ctx.fillStyle = `rgba(255,255,255,${s.o * Math.min(alpha, 1)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (alpha < 1) alpha += fadeSpeed;

      ctx.font = `${fontSize}px monospace`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#00ffff";

      for (let i = 0; i < drops.length; i++) {
        const y = drops[i] * fontSize;
        for (let j = 0; j < 14; j++) {
          const ch = letters.charAt((Math.random() * letters.length) | 0);
          const yOffset = y - j * fontSize;
          if (yOffset < 0) continue;

          const gradient = ctx.createLinearGradient(0, yOffset - fontSize, 0, yOffset);
          gradient.addColorStop(0, `rgba(0,255,255,${0.18 * alpha})`);
          gradient.addColorStop(1, j === 0 ? `rgba(255,255,255,${alpha})` : `rgba(0,255,255,${alpha})`);
          ctx.fillStyle = gradient;
          ctx.fillText(ch, i * fontSize, yOffset);
        }
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ backgroundColor: "black", display: "block" }}
    />
  );
}
