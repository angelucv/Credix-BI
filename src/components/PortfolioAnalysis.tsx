import React from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Landmark, TrendingUp, Users, PieChart as PieIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const composition = [
  { name: 'Línea revolving', value: 42, color: '#FF007F' },
  { name: 'Compras puntuales', value: 28, color: '#a855f7' },
  { name: 'Cuotas fijas', value: 22, color: '#6366f1' },
  { name: 'Otros', value: 8, color: '#94a3b8' },
];

const growthSeries = [
  { mes: 'Ene', saldo: 12.2, nuevos: 420 },
  { mes: 'Feb', saldo: 12.8, nuevos: 510 },
  { mes: 'Mar', saldo: 13.1, nuevos: 480 },
  { mes: 'Abr', saldo: 13.9, nuevos: 620 },
  { mes: 'May', saldo: 14.2, nuevos: 590 },
  { mes: 'Jun', saldo: 14.8, nuevos: 640 },
];

const segmentTable = [
  { segmento: 'Nivel A / Premium', clientes: 412, saldo: '4.2M', pct: '28%' },
  { segmento: 'Nivel B', clientes: 518, saldo: '5.8M', pct: '39%' },
  { segmento: 'Nivel C', clientes: 296, saldo: '3.1M', pct: '21%' },
  { segmento: 'En observación', clientes: 58, saldo: '0.7M', pct: '5%' },
];

function Kpi({ title, value, sub, icon: Icon, accent }: { title: string; value: string; sub: string; icon: React.ElementType; accent: string }) {
  return (
    <Card className="border-violet-100/80 bg-white shadow-sm overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold text-[#141414] mt-1">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{sub}</p>
          </div>
          <div className={cn('p-2.5 rounded-xl', accent)}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PortfolioAnalysis() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-[#141414] sm:text-2xl">Análisis de cartera</h2>
        <p className="mt-1 max-w-3xl text-sm text-gray-500 sm:text-base">
          Vista detallada de composición, concentración y evolución del saldo activo. Datos de demostración — conectar a fuentes Ubii / Fibex en producción.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        <Kpi
          title="Saldo cartera activa"
          value="$14.8M"
          sub="+5.1% vs mes anterior"
          icon={Landmark}
          accent="bg-gradient-to-br from-[#FF007F] to-[#a855f7]"
        />
        <Kpi
          title="Clientes con línea"
          value="1.284"
          sub="412 nuevos últimos 90 días"
          icon={Users}
          accent="bg-gradient-to-br from-violet-600 to-indigo-700"
        />
        <Kpi
          title="Ticket promedio"
          value="$11.5K"
          sub="Mediana $8.2K"
          icon={PieIcon}
          accent="bg-gradient-to-br from-fuchsia-600 to-pink-700"
        />
        <Kpi
          title="Concentración Top 10"
          value="18%"
          sub="Saldo en 10 mayores exposiciones"
          icon={TrendingUp}
          accent="bg-gradient-to-br from-[#6A0DAD] to-violet-800"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-violet-100/80 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Crecimiento de cartera</CardTitle>
            <CardDescription>Saldo total (millones USD) y altas netas mensuales (unidades)</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[220px] h-[260px] sm:h-[300px] md:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={growthSeries}>
                <defs>
                  <linearGradient id="saldoArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF007F" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#6A0DAD" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: 'none', background: '#141414', color: '#fff' }}
                  formatter={(value: number, name: string) =>
                    name === 'saldo' ? [`$${value}M`, 'Saldo'] : [value, 'Nuevas altas']
                  }
                />
                <Area yAxisId="left" type="monotone" dataKey="saldo" stroke="#FF007F" fill="url(#saldoArea)" strokeWidth={2} />
                <Bar yAxisId="right" dataKey="nuevos" fill="#a855f7" radius={[4, 4, 0, 0]} opacity={0.85} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-violet-100/80 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Composición</CardTitle>
            <CardDescription>Por tipo de producto (demostración)</CardDescription>
          </CardHeader>
          <CardContent className="flex min-h-[220px] h-[240px] flex-col sm:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={composition}
                  cx="50%"
                  cy="50%"
                  innerRadius={52}
                  outerRadius={78}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {composition.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-violet-100/80 bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Segmentación de cartera</CardTitle>
          <CardDescription>Distribución por nivel de riesgo / segmento operativo</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="font-bold text-xs uppercase tracking-wider">Segmento</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-right">Clientes</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-right">Saldo</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-right">% Cartera</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {segmentTable.map((row) => (
                <TableRow key={row.segmento} className="border-b border-gray-100">
                  <TableCell className="font-medium">{row.segmento}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{row.clientes}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{row.saldo}</TableCell>
                  <TableCell className="text-right text-[#c026d3] font-semibold">{row.pct}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
