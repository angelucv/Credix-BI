import React from 'react';
import { 
  Settings2, 
  ShieldCheck, 
  Clock, 
  UserPlus, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export function ScoringRules() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reglas de Negocio</h2>
          <p className="text-gray-500">Configura los parámetros y pesos del motor de scoring BETINA.</p>
        </div>
        <Button className="bg-[#141414] text-white font-bold">Guardar Cambios</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-[#E4E3E0]/10 bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Umbrales de Decisión
              </CardTitle>
              <CardDescription>Define los puntos de corte para cada nivel de riesgo.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <RuleInput label="Nivel A (Excelente)" value="900" suffix="pts" />
                <RuleInput label="Nivel B (Bueno)" value="700" suffix="pts" />
                <RuleInput label="Nivel C (Regular)" value="500" suffix="pts" />
                <RuleInput label="Nivel D (Riesgo)" value="< 500" suffix="pts" readOnly />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E4E3E0]/10 bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-blue-600" />
                Pesos de Variables
              </CardTitle>
              <CardDescription>Ajusta el impacto de cada variable en el score final.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <WeightSlider label="Antigüedad del Cliente" value={30} />
                <WeightSlider label="Comportamiento de Pago (Mora)" value={45} />
                <WeightSlider label="Edad y Perfil Demográfico" value={15} />
                <WeightSlider label="Vínculo FIBEX" value={10} />
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm font-bold">
                <span>Total</span>
                <span className="text-emerald-600">100%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-[#E4E3E0]/10 bg-orange-50 border-orange-100">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-orange-800">
                <AlertTriangle className="w-4 h-4" />
                Reglas de Exclusión
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                <p className="text-xs text-orange-900 font-medium">Mora mayor a 90 días: Rechazo Automático (D)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                <p className="text-xs text-orange-900 font-medium">Menores de 18 años: Rechazo Automático</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0" />
                <p className="text-xs text-orange-900 font-medium">Cédula en Lista Negra: Bloqueo Permanente</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E4E3E0]/10 bg-white">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Info className="w-4 h-4 text-gray-400" />
                Info del Modelo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500 leading-relaxed">
                El modelo actual utiliza una base de 1000 puntos. Las penalizaciones por mora se calculan de forma quincenal según los cortes de Ubii.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Última Actualización</p>
                <p className="text-xs font-medium text-gray-700">10 de Abril, 2026 - 10:30 AM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function RuleInput({ label, value, suffix, readOnly }: any) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <Input 
          defaultValue={value} 
          readOnly={readOnly}
          className={cn(
            "font-mono font-bold text-lg border-gray-200 focus:ring-orange-500",
            readOnly && "bg-gray-50 text-gray-400"
          )} 
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">{suffix}</span>
      </div>
    </div>
  );
}

function WeightSlider({ label, value }: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold font-mono">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-orange-600 rounded-full" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
