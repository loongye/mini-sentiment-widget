import { createContext, useContext, useState } from "react";

type StateProviderProps = {
  children: React.ReactNode;
  storageKey?: string;
};

export interface ISentiment {
  rating: number;
  comment: string;
}

type StateProviderState = {
  sentiments: ISentiment[];
  addSentiment: (sentiment: ISentiment) => void;
};

const initialState: StateProviderState = {
  sentiments: [],
  addSentiment: () => null,
};

const StateProviderContext = createContext<StateProviderState>(initialState);

export function StateProvider({
  children,
  storageKey = "vite-sentiment-state",
  ...props
}: StateProviderProps) {
  const [sentiments, setSentiments] = useState<ISentiment[]>(
    () => JSON.parse(localStorage.getItem(storageKey) ?? "[]") as ISentiment[],
  );

  const value = {
    sentiments,
    addSentiment: (sentiment: ISentiment) => {
      const newSentiments = [...sentiments, sentiment];
      localStorage.setItem(storageKey, JSON.stringify(newSentiments));
      setSentiments(newSentiments);
    },
  };

  return (
    <StateProviderContext.Provider {...props} value={value}>
      {children}
    </StateProviderContext.Provider>
  );
}

export const useStateProvider = () => {
  const context = useContext(StateProviderContext);

  if (context === undefined)
    throw new Error("useStateProvider must be used within a StateProvider");

  return context;
};
