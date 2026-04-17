'use client'

const techs = ['Vercel', 'AWS', 'React', 'nextjs', 'Figma', 'Blender', 'GSAP', 'Notion', 'TypeScript']
const CLOUD = 'di7znsrrr'

function getImg(name: string) {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${name}.png`
}

export default function TechMarquee() {
  const items = [...techs, ...techs, ...techs, ...techs]

  return (
    <>
      <style>{`
        @keyframes marquee { 
          0% { transform: translateX(0); } 
          100% { transform: translateX(-50%); } 
        }
        @keyframes subtleAccentShift { 
          0% { background-position: 0% center; } 
          100% { background-position: 200% center; } 
        }
        
        .marquee-track { 
          display: flex; 
          width: max-content; 
          animation: marquee 40s linear infinite; 
        }
        .marquee-track:hover { 
          animation-play-state: paused; 
        }
        
        /* Dark Glass Background */
        .glass-accent-bg {
          background-color: rgba(10, 10, 10, 0.6); 
          background-image: linear-gradient(90deg, rgba(123, 97, 255, 0.05), rgba(123, 97, 255, 0.12), rgba(123, 97, 255, 0.05)); 
          background-size: 200% auto;
          animation: subtleAccentShift 6s linear infinite;
          backdrop-filter: blur(24px) saturate(120%);
          -webkit-backdrop-filter: blur(24px) saturate(120%);
        }

        /* Theme Color Glow (Exact Image Size) */
        .logo-theme-glow {
          position: absolute;
          inset: 15%; /* Yeh ensure karta hai ki glow image ke border tak rahe */
          border-radius: 20%;
          background: radial-gradient(circle at center, 
            rgba(10, 10, 10, 0.9) 0%,       /* Center mein dark taaki logo clearly kaat ke dikhe */
            rgba(123, 97, 255, 0.6) 25%,    /* Theme Purple */
            rgba(255, 97, 214, 0.4) 45%,    /* Theme Pink */
            rgba(97, 212, 255, 0.2) 65%,    /* Theme Cyan */
            transparent 90%                 /* Bahar fade out */
          );
          filter: blur(20px);
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      <section className="glass-accent-bg marquee-mask overflow-hidden h-36 md:h-44 flex items-center border-y border-white/10 relative">
        <div className="flex relative z-10">
          <div className="marquee-track">
            {items.map((tech, i) => (
              <span key={i} className="relative flex items-center justify-center px-10 h-full">

                {/* Har image ke size ka exact theme glow */}
                <div className="logo-theme-glow"></div>

                <img
                  src={getImg(tech)}
                  alt={tech}
                  className="relative z-10 h-full w-auto max-w-[200px] opacity-90 hover:opacity-100 transition-all duration-500 object-contain p-2 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
                  draggable={false}
                />

                <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0 absolute right-0" />
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}