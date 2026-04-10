import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Wallet,
  Percent,
  Radio,
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

const data = [
  { name: 'Nivel A', value: 450, color: '#10b981' },
  { name: 'Nivel B', value: 300, color: '#3b82f6' },
  { name: 'Nivel C', value: 150, color: '#f59e0b' },
  { name: 'Nivel D', value: 100, color: '#ef4444' },
];

const trendData = [
  { month: 'Ene', score: 720 },
  { month: 'Feb', score: 750 },
  { month: 'Mar', score: 780 },
  { month: 'Abr', score: 810 },
  { month: 'May', score: 790 },
  { month: 'Jun', score: 840 },
];

const channelVolume = [
  { canal: 'Web Credix', volumen: 3.2, crecimiento: 14.2 },
  { canal: 'Ubii App', volumen: 4.8, crecimiento: 9.5 },
  { canal: 'Asesores / referidos', volumen: 2.1, crecimiento: 6.1 },
  { canal: 'Otros canales', volumen: 0.9, crecimiento: -2.0 },
];

const recentClients = [
  { id: '1', name: 'Juan Perez', score: 920, level: 'A', amount: '$5,000', date: '2026-04-10' },
  { id: '2', name: 'Maria Garcia', score: 750, level: 'B', amount: '$3,200', date: '2026-04-09' },
  { id: '3', name: 'Carlos Rodriguez', score: 450, level: 'D', amount: '$0', date: '2026-04-09' },
  { id: '4', name: 'Ana Martinez', score: 810, level: 'A', amount: '$4,500', date: '2026-04-08' },
  { id: '5', name: 'Luis Hernandez', score: 680, level: 'C', amount: '$1,500', date: '2026-04-08' },
];

export function Overview() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-[#141414] sm:text-2xl">Resumen ejecutivo</h2>
        <p className="mt-1 text-sm text-gray-500">Indicadores de scoring, cartera y canales (datos demo).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Procesados" 
          value="1,284" 
          trend="+12%" 
          trendUp={true} 
          icon={Users} 
        />
        <StatCard 
          title="Score Promedio" 
          value="742" 
          trend="+5.2" 
          trendUp={true} 
          icon={TrendingUp} 
        />
        <StatCard 
          title="Tasa de Aprobación" 
          value="78%" 
          trend="-2%" 
          trendUp={false} 
          icon={CheckCircle2} 
        />
        <StatCard 
          title="Alertas de Riesgo" 
          value="24" 
          trend="+4" 
          trendUp={false} 
          icon={AlertTriangle} 
        />
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Cartera, mora y crecimiento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Cartera activa (est.)" 
            value="$14.8M" 
            trend="+5.1% MoM" 
            trendUp={true} 
            icon={Wallet} 
          />
          <StatCard 
            title="Saldo en mora" 
            value="$742K" 
            trend="+8.2% MoM" 
            trendUp={false} 
            icon={AlertTriangle} 
          />
          <StatCard 
            title="Mora / cartera" 
            value="5.4%" 
            trend="+0.6 pp" 
            trendUp={false} 
            icon={Percent} 
          />
          <StatCard 
            title="Originación del mes" 
            value="$2.4M" 
            trend="+11%" 
            trendUp={true} 
            icon={Radio} 
          />
        </div>
      </div>

      <Card className="border-violet-100/80 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Volumen por canal de originación</CardTitle>
          <CardDescription>
            Millones USD en los últimos 30 días y variación vs periodo anterior
          </CardDescription>
        </CardHeader>
        <CardContent className="min-h-[220px] h-[240px] sm:h-[280px]">
          <div className="h-full w-full min-w-0 overflow-x-auto">
          <ResponsiveContainer width="100%" height="100%" minHeight={220}>
            <BarChart data={channelVolume} layout="vertical" margin={{ left: 4, right: 36, top: 4, bottom: 4 }}>
              <defs>
                <linearGradient id="chanBar" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF007F" />
                  <stop offset="100%" stopColor="#6A0DAD" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
              <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}M`} domain={[0, 'dataMax + 0.8']} />
              <YAxis type="category" dataKey="canal" width={118} tick={{ fontSize: 11 }} />
              <Tooltip
                cursor={{ fill: 'rgba(139, 92, 246, 0.06)' }}
                contentStyle={{ borderRadius: 8, border: 'none', background: '#141414', color: '#fff' }}
                formatter={(v: number, _n: string, item: { payload?: { crecimiento?: number } }) => {
                  const c = item?.payload?.crecimiento ?? 0;
                  return [`$${v}M · ${c > 0 ? '+' : ''}${c}% vs ant.`, 'Volumen'];
                }}
              />
              <Bar dataKey="volumen" fill="url(#chanBar)" radius={[0, 6, 6, 0]} barSize={22}>
                <LabelList
                  dataKey="crecimiento"
                  position="right"
                  formatter={(v: number) => `${v > 0 ? '+' : ''}${v}%`}
                  className="fill-gray-500 text-xs font-semibold"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-[#E4E3E0]/10 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Tendencia de Scoring</CardTitle>
            <CardDescription>Evolución del score promedio en los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[220px] h-[240px] sm:h-[280px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%" minHeight={220}>
              <BarChart data={trendData}>
                <defs>
                  <linearGradient id="credixBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF007F" stopOpacity={0.95} />
                    <stop offset="100%" stopColor="#6A0DAD" stopOpacity={0.9} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="score" fill="url(#credixBarGrad)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-[#E4E3E0]/10 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Distribución por Nivel</CardTitle>
            <CardDescription>Segmentación de cartera actual</CardDescription>
          </CardHeader>
          <CardContent className="flex min-h-[220px] h-[240px] flex-col items-center justify-center sm:h-[280px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%" minHeight={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4 w-full">
              {data.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-[#E4E3E0]/10 bg-white/50 backdrop-blur-sm">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Procesamientos Recientes</CardTitle>
            <CardDescription>Últimos clientes evaluados por el pipeline</CardDescription>
          </div>
          <button className="flex items-center gap-2 text-xs font-medium bg-[#141414] text-white px-3 py-1.5 rounded-md">
            <Filter className="w-3.5 h-3.5" />
            Filtrar
          </button>
        </CardHeader>
        <CardContent className="overflow-x-auto -mx-1 px-1">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b border-[#eee]">
                <TableHead className="text-[11px] uppercase tracking-wider font-bold">Cliente</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold">Score</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold">Nivel</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold">Monto Sugerido</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold">Fecha</TableHead>
                <TableHead className="text-[11px] uppercase tracking-wider font-bold text-right">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-gray-50 transition-colors border-b border-[#eee]">
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>
                    <span className="font-mono text-sm">{client.score}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "font-bold",
                      client.level === 'A' ? "text-emerald-600 border-emerald-200 bg-emerald-50" :
                      client.level === 'B' ? "text-blue-600 border-blue-200 bg-blue-50" :
                      client.level === 'C' ? "text-amber-600 border-amber-200 bg-amber-50" :
                      "text-red-600 border-red-200 bg-red-50"
                    )}>
                      Nivel {client.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{client.amount}</TableCell>
                  <TableCell className="text-gray-500 text-sm">{client.date}</TableCell>
                  <TableCell className="text-right">
                    <button type="button" className="text-xs font-semibold text-[#c026d3] hover:underline">Ver Detalle</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon: Icon }: any) {
  return (
    <Card className="border-[#E4E3E0]/10 bg-white shadow-sm overflow-hidden group">
      <CardContent className="p-4 sm:p-6">
        <div className="mb-3 flex items-center justify-between sm:mb-4">
          <div className="rounded-lg bg-violet-50/80 p-2 transition-colors group-hover:bg-fuchsia-50">
            <Icon className="h-5 w-5 text-violet-400 transition-colors group-hover:text-[#c026d3]" />
          </div>
          <div className={cn(
            "flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold sm:text-xs",
            trendUp ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"
          )}>
            {trendUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend}
          </div>
        </div>
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 sm:text-xs">{title}</p>
          <h3 className="text-xl font-bold tracking-tight text-[#141414] sm:text-2xl">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
