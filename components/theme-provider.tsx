// components/theme-provider.tsx
"use client"
import * as React from "react"
import { ThemeProvider as NextThemesProvider, ThemeProviderProps as NextThemesProviderProps } from "next-themes" // Importez le type directement

interface CustomThemeProviderProps extends NextThemesProviderProps {} // Renommer pour éviter confusion

export function ThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}