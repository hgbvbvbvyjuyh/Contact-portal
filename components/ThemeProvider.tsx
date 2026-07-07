/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { MOCK_PROPOSAL } from '@/mock/proposal';
import { Proposal } from '@/types';

export type Theme = 'light' | 'dark' | 'system';

export interface BrandConfig {
  primaryColor?: string;       // Dynamic primary accent color override
  primaryForeground?: string;  // Dynamic primary foreground color override
  radiusCard?: string;         // Dynamic card border-radius override
  radiusButton?: string;       // Dynamic button border-radius override
  agencyName?: string;         // Dynamic agency branding title
  logoUrl?: string;            // Dynamic agency logo URL
}

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  brandConfig: BrandConfig;
  updateBrandConfig: (config: BrandConfig) => void;
  resetBrandConfig: () => void;
  placeholderProposal: Proposal;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const DEFAULT_BRAND_CONFIG: BrandConfig = {
  agencyName: 'Project Proposal & Agreement',
  logoUrl: '',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 1. Initial State for Theme Preference
  const [theme, setThemeState] = useState<Theme>('light');

  // 2. State for Resolved Actual Theme ('light' | 'dark')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // 3. State for Dynamic White-Label Brand Configurations
  const [brandConfig, setBrandConfig] = useState<BrandConfig>(() => {
    if (typeof window === 'undefined') return DEFAULT_BRAND_CONFIG;
    const saved = localStorage.getItem('theme-brand-config');
    if (saved) {
      try {
        return { ...DEFAULT_BRAND_CONFIG, ...JSON.parse(saved) };
      } catch (e) {
        return DEFAULT_BRAND_CONFIG;
      }
    }
    return DEFAULT_BRAND_CONFIG;
  });

  // Effect to resolve system preferences and sync theme class on root element
  useEffect(() => {
    const root = window.document.documentElement;
    setResolvedTheme('light');
    root.classList.remove('dark');
  }, []);

  // Effect to apply brand overrides dynamically on the :root element (SaaS White-labeling)
  useEffect(() => {
    const root = window.document.documentElement;

    if (brandConfig.primaryColor) {
      root.style.setProperty('--brand-primary', brandConfig.primaryColor);
    } else {
      root.style.removeProperty('--brand-primary');
    }

    if (brandConfig.primaryForeground) {
      root.style.setProperty('--brand-primary-foreground', brandConfig.primaryForeground);
    } else {
      root.style.removeProperty('--brand-primary-foreground');
    }

    if (brandConfig.radiusCard) {
      root.style.setProperty('--brand-radius-card', brandConfig.radiusCard);
    } else {
      root.style.removeProperty('--brand-radius-card');
    }

    if (brandConfig.radiusButton) {
      root.style.setProperty('--brand-radius-button', brandConfig.radiusButton);
    } else {
      root.style.removeProperty('--brand-radius-button');
    }

    // Persist brand config changes
    localStorage.setItem('theme-brand-config', JSON.stringify(brandConfig));
  }, [brandConfig]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme-preference', newTheme);
  };

  const updateBrandConfig = (newConfig: BrandConfig) => {
    setBrandConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const resetBrandConfig = () => {
    setBrandConfig(DEFAULT_BRAND_CONFIG);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        brandConfig,
        updateBrandConfig,
        resetBrandConfig,
        placeholderProposal: MOCK_PROPOSAL,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
