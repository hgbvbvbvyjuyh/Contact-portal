/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { MOCK_PROPOSAL } from '@/mock/proposal';
import { Proposal } from '@/types';
import { supabase } from '@/lib/supabase';

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
  proposal: Proposal | null;
  loading: boolean;
  error: string | null;
  fetchProposal: (id: string) => Promise<void>;
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

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProposal = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      // For development/preview when Supabase might not be configured
      // Strictly only in development mode
      if (import.meta.env.DEV && (!import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('placeholder'))) {
        console.warn('Supabase not configured in development, falling back to mock data');
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProposal(MOCK_PROPOSAL);
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from('proposals')
        .select('*')
        .eq('proposal_number', id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      if (data) {
        // If data has a 'content' field (normalized schema), merge it with the top-level fields
        // to match the expected Proposal interface structure.
        const normalizedProposal = data.content
          ? { ...data, ...data.content } as Proposal
          : data as Proposal;

        setProposal(normalizedProposal);
        // Also update brand config if agency info is present
        if (normalizedProposal.agency?.agencyName) {
          updateBrandConfig({
            agencyName: normalizedProposal.agency.agencyName,
          });
        }
      } else {
        setError('Proposal not found');
      }
    } catch (err: any) {
      console.error('Error fetching proposal:', err);
      setError(err.message || 'An error occurred while fetching the proposal');
    } finally {
      setLoading(false);
    }
  }, []);

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
        proposal,
        loading,
        error,
        fetchProposal,
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
