export const LoginHeader = () => {
  return (
    <header className="w-full mb-stack-lg text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface-container-high shadow-lg shadow-primary/10 mb-stack-md border border-white/5">
        <span
          className="material-symbols-outlined text-secondary text-5xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          casino
        </span>
      </div>
      <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
        ¡Bienvenido a LuckyBet!
      </h1>
      <p className="font-body-md text-on-surface-variant mt-2">
        Inicia sesión para continuar con tus misiones
      </p>
    </header>
  );
};
