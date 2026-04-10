import React from 'react';
import { 
  LayoutDashboard, 
  UploadCloud, 
  Users, 
  Settings, 
  FileText, 
  ChevronRight,
  PieChart,
  AlertOctagon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CredixLogo } from '../brand/CredixLogo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
    { id: 'portfolio', label: 'Análisis Cartera', icon: PieChart },
    { id: 'mora', label: 'Análisis Mora', icon: AlertOctagon },
    { id: 'upload', label: 'Carga de Datos', icon: UploadCloud },
    { id: 'results', label: 'Resultados Scoring', icon: Users },
    { id: 'rules', label: 'Reglas de Negocio', icon: Settings },
    { id: 'reports', label: 'Reportes', icon: FileText },
  ];

  return (
    <div className="w-72 min-w-[18rem] h-screen flex flex-col border-r border-violet-950/50 bg-gradient-to-b from-[#141018] via-[#100b14] to-[#0a060e] text-[#E8E4EF]">
      <div className="px-4 pt-5 pb-6 border-b border-violet-900/25">
        <CredixLogo className="w-full h-24 min-h-[6rem]" />
        <p className="text-[10px] uppercase tracking-[0.18em] text-violet-300/55 mt-3 pl-0.5">
          Inteligencia de negocio
        </p>
      </div>

      <nav className="flex-1 min-h-0 overflow-y-auto px-3 py-5 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group",
              activeTab === item.id 
                ? "bg-white/[0.94] text-[#1a0f1f] shadow-[0_0_0_1px_rgba(233,30,140,0.25)]" 
                : "hover:bg-violet-950/40 text-[#9ca3af] hover:text-[#f3e8ff]"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className={cn(
                "w-5 h-5",
                activeTab === item.id ? "text-[#c026d3]" : "text-[#6b5b7a] group-hover:text-violet-300"
              )} />
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {activeTab === item.id && <ChevronRight className="w-4 h-4 text-[#a855f7]" />}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-violet-950/40 space-y-3">
        <div className="bg-violet-950/35 p-3 rounded-xl flex items-center gap-3 ring-1 ring-violet-800/30">
          <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-[#FF007F] via-[#c026d3] to-[#6A0DAD] flex items-center justify-center text-[11px] font-bold text-white shadow-md shadow-fuchsia-900/25">
            PM
          </div>
          <p className="text-xs font-medium truncate text-violet-100 min-w-0">Pedro Martínez</p>
        </div>
        <div className="bg-violet-950/35 p-3 rounded-xl flex items-center gap-3 ring-1 ring-violet-800/30">
          <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-br from-[#6A0DAD] via-[#7c3aed] to-[#a855f7] flex items-center justify-center text-[11px] font-bold text-white shadow-md shadow-violet-900/25">
            AC
          </div>
          <p className="text-xs font-medium truncate text-violet-100 min-w-0">Angel Colmenares</p>
        </div>
      </div>
    </div>
  );
}
