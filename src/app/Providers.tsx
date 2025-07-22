"use client";

import { ContestProvider } from "@/contexts/ContestsContext";

function Providers({ children }: { children: React.ReactNode }) {
  return <ContestProvider>{children}</ContestProvider>;
}

export default Providers;
