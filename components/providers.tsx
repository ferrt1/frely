"use client"

import { SplashScreen } from "./splash-screen"

export function Providers({ children }: { children: React.ReactNode }) {
  return <SplashScreen>{children}</SplashScreen>
}
