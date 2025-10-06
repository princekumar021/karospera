"use client";

import { useUserData } from "@/hooks/use-user-data";
import { useEffect } from "react";

export function ThemeApplicator() {
  const { userData, loading } = useUserData();
  const theme = userData?.theme || 'dark';

  useEffect(() => {
    if (loading) return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
  }, [theme, loading]);

  return null;
}
