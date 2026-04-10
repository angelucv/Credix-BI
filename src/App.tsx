/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Overview } from './components/Overview';
import { PortfolioAnalysis } from './components/PortfolioAnalysis';
import { MoraAnalysis } from './components/MoraAnalysis';
import { DataUpload } from './components/DataUpload';
import { ScoringRules } from './components/ScoringRules';
import { Badge } from '@/components/ui/badge';
import { Bell, HelpCircle, Menu, Search, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <div className="flex h-[100dvh] min-h-0 bg-[#f4f2f8] text-[#141414] font-sans">
      {/* Fondo oscuro al abrir menú (solo móvil/tablet) */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileMenuOpen}
        onNavigate={() => setMobileMenuOpen(false)}
      />

      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-3 sm:h-16 sm:gap-3 sm:px-4 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-200/80 bg-violet-50/90 text-[#5b21b6] shadow-sm lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="app-sidebar"
              onClick={() => setMobileMenuOpen((o) => !o)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="relative min-w-0 flex-1 max-w-full sm:max-w-md lg:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Buscar..."
                className="w-full rounded-full border border-violet-100/80 bg-white py-2 pl-9 pr-3 text-sm shadow-sm placeholder:text-gray-400 focus:border-fuchsia-200 focus:outline-none focus:ring-2 focus:ring-[#e91e8c]/40 sm:pl-10 sm:pr-4"
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4 md:gap-6">
            <Badge
              variant="outline"
              className="hidden border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 sm:inline-flex sm:px-3 sm:text-xs"
            >
              <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              <span className="hidden md:inline">Sistema </span>Online
            </Badge>
            <div className="flex items-center gap-1 text-gray-400 sm:gap-2">
              <button type="button" className="rounded-lg p-2 hover:bg-gray-50 hover:text-[#c026d3]" aria-label="Notificaciones">
                <Bell className="h-5 w-5" />
              </button>
              <button type="button" className="hidden rounded-lg p-2 hover:bg-gray-50 hover:text-[#c026d3] sm:inline-flex" aria-label="Ayuda">
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-7xl">
            {activeTab === 'overview' && <Overview />}
            {activeTab === 'portfolio' && <PortfolioAnalysis />}
            {activeTab === 'mora' && <MoraAnalysis />}
            {activeTab === 'upload' && <DataUpload />}
            {activeTab === 'rules' && <ScoringRules />}

            {(activeTab === 'results' || activeTab === 'reports') && (
              <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 px-2 text-center">
                <div className="rounded-full bg-gray-100 p-6">
                  <Search className="h-10 w-10 text-gray-300 sm:h-12 sm:w-12" />
                </div>
                <div>
                  <h3 className="text-lg font-bold sm:text-xl">Módulo en Desarrollo</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 sm:text-base">
                    Estamos trabajando para integrar los reportes detallados y la exportación masiva a Excel.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
