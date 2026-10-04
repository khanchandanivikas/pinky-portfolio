import { createContext, useContext, useMemo, useState } from "react";

/**
 * loading:   preloader counts 0 to 100, page content waits.
 * revealing: header and hero animate in while the preloader slides out.
 * done:      preloader is unmounted.
 */
type IntroPhase = "loading" | "revealing" | "done";

type IntroContextValue = {
  phase: IntroPhase;
  setPhase: (phase: IntroPhase) => void;
};

const IntroContext = createContext<IntroContextValue | null>(null);

export const IntroProvider = ({ children }: { children: React.ReactNode }) => {
  const [phase, setPhase] = useState<IntroPhase>("loading");
  const value = useMemo(() => ({ phase, setPhase }), [phase]);

  return (
    <IntroContext.Provider value={value}>{children}</IntroContext.Provider>
  );
};

export const useIntro = () => {
  const context = useContext(IntroContext);
  if (!context) throw new Error("useIntro must be used inside IntroProvider");
  return context;
};

export const useIntroReady = () => {
  return useIntro().phase !== "loading";
};
