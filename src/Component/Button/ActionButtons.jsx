"use client";

export default function ActionButton({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
}) {
  const baseStyles =
    "inline-flex min-h-[45px] items-center justify-center rounded-full px-6 py-3 text-base font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-primary text-white shadow-[0_10px_25px_rgba(252,48,48,0.2)] hover:-translate-y-0.5 hover:bg-red-600",
    secondary:
      "border border-slate-200 bg-white text-slate-900 hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:border-primary",
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
