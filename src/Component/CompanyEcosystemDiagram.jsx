"use client";

import Image from "next/image";

const companies = [
  {
    name: "Nova Jobs",
    image: "/logos/nova-jobs.png",
    ring: "border-[#3d4149]",
    position: { left: "39.5%", top: "0%" },
  },
  {
    name: "Kushi Gateway",
    image: "/logos/kushi-gateway.png",
    ring: "border-[#ff3b22]",
    position: { left: "9%", top: "15%" },
  },
  {
    name: "UltraAura",
    image: "/logos/ultraaura.png",
    ring: "border-[#35c4c5]",
    position: { right: "9%", top: "15%" },
  },
  {
    name: "NovaHome.care",
    image: "/logos/novahomecare.png",
    ring: "border-[#514d86]",
    position: { right: "2.5%", top: "48%" },
  },
  {
    name: "Freevance",
    image: "/logos/freevance.png",
    ring: "border-[#ff3b22]",
    position: { right: "25%", bottom: "8.5%" },
  },
  {
    name: "Paradigm Shift",
    image: "/logos/paradigm-shift.png",
    ring: "border-[#3d4149]",
    position: { left: "23%", bottom: "8%" },
  },
  {
    name: "Legit Zone",
    image: "/logos/legit-zone.png",
    ring: "border-[#35c4c5]",
    position: { left: "2.5%", top: "47%" },
  },
];

const connections = [
  {
    name: "top-left",
    position: { left: "27.5%", top: "12%" },
    transform: "rotate(-25deg)",
  },
  {
    name: "top-right",
    position: { right: "27.5%", top: "12%" },
    transform: "rotate(25deg)",
  },
  {
    name: "right",
    position: { right: "6.5%", top: "38.5%" },
    transform: "rotate(78deg)",
  },
  {
    name: "bottom-right",
    position: { right: "14%", bottom: "23%" },
    transform: "rotate(-52deg)",
  },
  {
    name: "bottom",
    position: { left: "44%", bottom: "8%" },
    transform: "none",
  },
  {
    name: "bottom-left",
    position: { left: "13%", bottom: "24%" },
    transform: "rotate(52deg)",
  },
  {
    name: "left",
    position: { left: "6%", top: "38%" },
    transform: "rotate(-78deg)",
  },
];

function LogoNode({ company }) {
  return (
    <div
      aria-label={company.name}
      title={company.name}
      className={`absolute z-10 flex aspect-square w-[21%] 
                items-center justify-center rounded-full border-[10px] 
                transition-all duration-300 ease-out
                hover:z-20 hover:scale-110 bg-white 
                p-3 shadow-sm sm:border-[11px] sm:p-4 ${company.ring}`}
      style={company.position}
    >
      <div className="relative flex h-full w-full items-center justify-center">
        <Image
          src={company.image}
          alt={`${company.name} logo`}
          width={160}
          height={100}
          sizes="(max-width: 640px) 15vw, 120px"
          className="h-auto max-h-full w-full max-w-full object-contain"
        />
      </div>
    </div>
  );
}

export default function CompanyEcosystemDiagram() {
  return (    
      <div className="mx-auto w-full max-w-[610px]">
        <div className="relative mx-auto aspect-square w-full">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[10%] 
            animate-[spin_45s_linear_infinite] 
            rounded-full border-2 border-dashed 
            border-indigo-300/90 dark:border-indigo-400/40
            motion-reduce:animate-none"
          />

          {connections.map((connection) => (
            <div
              key={connection.name}
              className="absolute z-[1] flex h-[5%] min-w-[11%] 
              items-center justify-center rounded-lg border border-green-500 
              bg-white/95 px-2 text-[10px] font-semibold text-green-700 
              sm:text-xs md:text-sm dark:bg-slate-900 dark:text-green-400"
              style={{
                ...connection.position,
                transform: connection.transform,
              }}
              aria-label="Live connection"
            >
              Live
            </div>
          ))}

          {companies.map((company) => (
            <LogoNode key={company.name} company={company} />
          ))}

          <div className="absolute left-1/2 top-1/2 z-20 flex w-[46%] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-xl border-2 border-blue-600 bg-white px-3 py-2 text-center dark:border-blue-400 dark:bg-slate-900 sm:px-4 sm:py-3">
            <div className="relative w-full">
              <Image
                src="/logos/hyper-v-solutions.png"
                alt="Hyper V Solutions — AI Driven Business Incubator"
                width={600}
                height={180}
                sizes="(max-width: 640px) 42vw, 280px"
                className="h-auto w-full object-contain"
              />
            </div>
            <p className="mt-1 text-[8px] leading-tight text-slate-600 dark:text-slate-300 sm:text-[10px] md:text-xs">
              Parent company · South Carolina, USA
            </p>
          </div>
        </div>
      </div>
  );
}
