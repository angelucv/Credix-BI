import React from 'react';
import { 
  LayoutDashboard, 
  UploadCloud, 
  Users, 
  Settings, 
  FileText, 
  ShieldAlert,
  ChevronRight,
  CreditCard
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
    { id: 'upload', label: 'Carga de Datos', icon: UploadCloud },
    { id: 'results', label: 'Resultados Scoring', icon: Users },
    { id: 'rules', label: 'Reglas de Negocio', icon: Settings },
    { id: 'reports', label: 'Reportes', icon: FileText },
  ];

  return (
    <div className="w-64 bg-[#141414] text-[#E4E3E0] h-screen flex flex-col border-r border-[#333]">
      <div className="p-6 flex items-center gap-3 border-bottom border-[#333]">
        <div className="bg-orange-600 p-2 rounded-lg">
          <CreditCard className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight">BETINA</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">Credix Scoring</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center justify-between px-4 py-3 rounded-md transition-all duration-200 group",
              activeTab === item.id 
                ? "bg-[#E4E3E0] text-[#141414]" 
                : "hover:bg-[#222] text-[#888] hover:text-[#E4E3E0]"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-[#141414]" : "text-[#555] group-hover:text-[#E4E3E0]")} />
              <span className="font-medium text-sm">{item.label}</span>
            </div>
            {activeTab === item.id && <ChevronRight className="w-4 h-4" />}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#333]">
        <div className="bg-[#222] p-4 rounded-lg flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-xs font-bold">
            PM
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-medium truncate">Pedro Martínez</p>
            <p className="text-[10px] opacity-50 truncate">Gerente de Automatización</p>
          </div>
        </div>
      </div>
    </div>
  );
}
