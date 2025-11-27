import React from 'react';

export interface FinancialMetric {
  year: string;
  revenue: number;
  netProfit: number;
}

export interface ExitStrategyMetric {
  year: string;
  valuation: number;
  noi: number;
}

export interface Amenity {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface DownloadItem {
  name: string;
  size: string;
  type: string;
  url?: string;
  isAnalyzing?: boolean;
  analysis?: string;
}