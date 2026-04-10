/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Overview } from './components/Overview';
import { DataUpload } from './components/DataUpload';
import { ScoringRules } from './components/ScoringRules';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#141414] font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 w-1/3">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar cliente, cédula o score..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold px-3 py-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                Sistema Online
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-gray-400">
              <button className="hover:text-orange-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="hover:text-orange-600 transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && <Overview />}
            {activeTab === 'upload' && <DataUpload />}
            {activeTab === 'rules' && <ScoringRules />}
            
            {(activeTab === 'results' || activeTab === 'reports') && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                <div className="bg-gray-100 p-6 rounded-full">
                  <Search className="w-12 h-12 text-gray-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Módulo en Desarrollo</h3>
                  <p className="text-gray-500 max-w-md mx-auto mt-2">
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

