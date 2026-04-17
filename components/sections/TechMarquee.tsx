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
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes accentShift {
          0%   { background-position: 0% center; }
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
        .animated-accent-bg {
          background: linear-gradient(90deg, 
            #5b3fd4, 
            #7B61FF, 
            #8975ecff, 
            #624dcbff, 
            #5b3fd4
          );
          background-size: 200% auto;
          animation: accentShift 4s linear infinite;
        }
      `}</style>

      <section className="animated-accent-bg overflow-hidden h-36 md:h-44 flex items-center border-y border-[#7B61FF]/30 relative">
        <div className="flex relative z-10">
          <div className="marquee-track">
            {items.map((tech, i) => (
              <span
                key={i}
                className="flex items-center gap-10 px-10 h-full"
              >
                <img
                  src={getImg(tech)}
                  alt={tech}
                  className="h-full w-auto max-w-[200px] opacity-80 hover:opacity-100 transition-all duration-500 object-contain p-2
                    drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] drop-shadow-[0_0_1px_rgba(0,0,0,0.8)]"
                  draggable={false}
                />
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}