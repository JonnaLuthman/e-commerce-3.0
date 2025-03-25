import { createContext, PropsWithChildren, useState } from "react";

export type checkoutContext = {
  phase: number;
  setPhase: (phase: number) => void;
};

export const checkoutPhases = {
  first: 1,
  second: 2,
  third: 3,
};

export const CheckoutContext = createContext<checkoutContext>({
  phase: checkoutPhases.first,
  setPhase: () => {},
});

export const CheckoutProvider = ({ children }: PropsWithChildren) => {
  const [phase, setPhase] = useState<number>(checkoutPhases.first);

  return (
    <CheckoutContext.Provider value={{ phase, setPhase }}>
      {children}
    </CheckoutContext.Provider>
  );
};
