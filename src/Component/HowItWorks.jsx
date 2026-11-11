"use client";

const steps = [
  {
    number: 1,
    title: "Post",
    description:
      "Describe your project, budget and deadline. We review it within hours.",
  },
  {
    number: 2,
    title: "Bid",
    description: "Verified freelancers send price, timeline and a pitch.",
  },
  {
    number: 3,
    title: "Confirm",
    description: "Pick your developer. Admin confirms and starts the project.",
  },
  {
    number: 4,
    title: "Pay per sprint",
    description:
      "Fund each sprint. Money is released after you approve the work.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-[#f4f6fb] px-4 py-14 transition-colors duration-300 dark:bg-slate-950 sm:px-6 sm:py-16 lg:px-8"
    >
      <div className="mx-auto max-w-[1400px] lg:mx-20">
        <h2 className="mb-10 text-center text-3xl font-bold tracking-tight text-[#0d2c65] dark:text-white sm:mb-11 sm:text-4xl">
          How it works
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="min-h-[198px] rounded-[23px] border border-[#dfe5f1] bg-white p-6 shadow-[0_12px_40px_rgba(15,23,42,0.055)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.09)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none sm:p-[25px]"
            >
              <div className="flex h-[50px] w-[50px] items-center justify-center rounded-[17px] bg-gradient-to-br from-primary via-[#d52b59] to-secondary text-lg font-extrabold text-white">
                {step.number}
              </div>

              <h3 className="mt-4 text-[21px] font-bold leading-7 text-slate-950 dark:text-white">
                {step.title}
              </h3>

              <p className="mt-1 text-[16px] leading-[26px] text-slate-600 dark:text-slate-300">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
