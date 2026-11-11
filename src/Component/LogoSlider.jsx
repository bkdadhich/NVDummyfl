"use client";

import React from "react";
import Image from "next/image";

const logos = [
  { id: 1, name: "Freevance", image: "/logos/freevance.png" },  
  { id: 2, name: "Kushi Gateway", image: "/logos/kushi-gateway.png" },
  { id: 3, name: "Legit Zone", image: "/logos/legit-zone.png" },
  { id: 4, name: "Nova Jobs", image: "/logos/nova-jobs.png" },
  { id: 5, name: "Nova Home Care", image: "/logos/novahomecare.png" },
  { id: 6, name: "Paradigm Shift", image: "/logos/paradigm-shift.png" },
  { id: 7, name: "UltraAura", image: "/logos/ultraaura.png" },
];

const LogoSlider = () => {
  return (
    <section className="w-full overflow-hidden bg-bgWhite dark:bg-[#171923] py-6 sm:py-8">
      <div className="logo-slider w-full overflow-hidden py-5">
        <div className="logo-track flex w-max items-center py-3">

          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex shrink-0 items-center gap-5 px-2 sm:gap-6"
              aria-hidden={group === 1}
            >
              {logos.map((logo) => (
                <div
                  key={`${group}-${logo.id}`}
                  className="logo-card group relative flex h-[75px] w-[145px] shrink-0 items-center justify-center rounded-xl border border-black bg-white dark:bg-gray-100 px-4 py-3 transition-all duration-300 ease-out hover:z-20 hover:scale-110 hover:border-[#fc3030] hover:shadow-[0_8px_25px_rgba(252,48,48,0.18)] sm:h-[85px] sm:w-[165px]"           
                >
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    width={150}
                    height={70}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    />
                </div>
              ))}
            </div>
          ))}

        </div>
      </div>

      <style jsx>{`
        .logo-track {
          animation: logo-marquee 25s linear infinite;
          will-change: transform;
        }

        .logo-slider:hover .logo-track {
          animation-play-state: paused;
        }

        @keyframes logo-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .logo-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default LogoSlider;
