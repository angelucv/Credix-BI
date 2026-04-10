import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Filter
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
  Cell
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-[#E4E3E0]/10 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Tendencia de Scoring</CardTitle>
            <CardDescription>Evolución del score promedio en los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="score" fill="#ea580c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-[#E4E3E0]/10 bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Distribución por Nivel</CardTitle>
            <CardDescription>Segmentación de cartera actual</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
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
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Procesamientos Recientes</CardTitle>
            <CardDescription>Últimos clientes evaluados por el pipeline</CardDescription>
          </div>
          <button className="flex items-center gap-2 text-xs font-medium bg-[#141414] text-white px-3 py-1.5 rounded-md">
            <Filter className="w-3.5 h-3.5" />
            Filtrar
          </button>
        </CardHeader>
        <CardContent>
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
                    <button className="text-xs font-semibold text-orange-600 hover:underline">Ver Detalle</button>
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
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-orange-50 transition-colors">
            <Icon className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
          </div>
          <div className={cn(
            "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
            trendUp ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"
          )}>
            {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight text-[#141414]">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
