"use client";

import { useRouter } from "next/navigation";

function App() {
  const router = useRouter();
  router.push("/contests");
  return <></>;
}

export default App;
