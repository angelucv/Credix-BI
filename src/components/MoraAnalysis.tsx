import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Percent, UserX } from 'lucide-react';
import { cn } from '@/lib/utils';

const moraEvolution = [
  { mes: 'Ene', tasa: 4.2, saldoMora: 0.51 },
  { mes: 'Feb', tasa: 4.0, saldoMora: 0.49 },
  { mes: 'Mar', tasa: 4.5, saldoMora: 0.55 },
  { mes: 'Abr', tasa: 4.8, saldoMora: 0.62 },
  { mes: 'May', tasa: 5.1, saldoMora: 0.68 },
  { mes: 'Jun', tasa: 5.4, saldoMora: 0.74 },
];

const bucketComposition = [
  { rango: '1-30 días', saldo: 0.28, cuentas: 142, color: '#fbbf24' },
  { rango: '31-60 días', saldo: 0.18, cuentas: 58, color: '#f97316' },
  { rango: '61-90 días', saldo: 0.14, cuentas: 31, color: '#ea580c' },
  { rango: '>90 días', saldo: 0.14, cuentas: 18, color: '#dc2626' },
];

const topDeudores = [
  { nombre: 'Comercial Omega 2024 C.A.', doc: 'J-40589***', saldo: 84200, dpd: 112, segmento: 'Jurídica' },
  { nombre: 'María Fernanda López', doc: 'V-18.2***,**', saldo: 62400, dpd: 98, segmento: 'Natural' },
  { nombre: 'Distribuidora El Ávila', doc: 'J-29876***', saldo: 51800, dpd: 86, segmento: 'Jurídica' },
  { nombre: 'Carlos Enrique Ruiz', doc: 'V-14.9***,**', saldo: 44100, dpd: 76, segmento: 'Natural' },
  { nombre: 'Inversiones Beta', doc: 'J-51234***', saldo: 38900, dpd: 71, segmento: 'Jurídica' },
  { nombre: 'Ana Karina Méndez', doc: 'V-22.1***,**', saldo: 31200, dpd: 64, segmento: 'Natural' },
  { nombre: 'Servicios Gamma', doc: 'J-38901***', saldo: 27600, dpd: 59, segmento: 'Jurídica' },
  { nombre: 'Luis Alberto Pérez', doc: 'V-17.5***,**', saldo: 24100, dpd: 54, segmento: 'Natural' },
];

function KpiMora({
  title,
  value,
  sub,
  icon: Icon,
  variant,
}: {
  title: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  variant: 'danger' | 'warning' | 'neutral';
}) {
  const ring =
    variant === 'danger'
      ? 'from-red-600 to-rose-700'
      : variant === 'warning'
        ? 'from-amber-500 to-orange-600'
        : 'from-slate-600 to-slate-800';
  return (
    <Card className="border-violet-100/80 bg-white shadow-sm overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold text-[#141414] mt-1">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{sub}</p>
          </div>
          <div className={cn('p-2.5 rounded-xl bg-gradient-to-br shadow-inner', ring)}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MoraAnalysis() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-[#141414] sm:text-2xl">Análisis de mora</h2>
        <p className="mt-1 max-w-3xl text-sm text-gray-500 sm:text-base">
          Seguimiento de cartera vencida, antigüedad de obligaciones y principales exposiciones. Datos ilustrativos para el demo Credix BI.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        <KpiMora
          title="Saldo en mora"
          value="$742K"
          sub="+8.2% vs mes anterior"
          icon={AlertTriangle}
          variant="danger"
        />
        <KpiMora
          title="Mora / cartera"
          value="5.4%"
          sub="+0.6 pp vs hace 6 meses"
          icon={Percent}
          variant="warning"
        />
        <KpiMora
          title="Cuentas en mora"
          value="249"
          sub="18 cuentas >90 dpd"
          icon={UserX}
          variant="danger"
        />
        <KpiMora
          title="DPD promedio (ponderado)"
          value="52 días"
          sub="Mediana 38 días"
          icon={Clock}
          variant="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-violet-100/80 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Evolución de la mora</CardTitle>
            <CardDescription>Tasa de mora sobre cartera (%) y saldo vencido (millones USD)</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[220px] h-[240px] sm:h-[280px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%" minHeight={200}>
              <LineChart data={moraEvolution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="mes" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} domain={['dataMin - 0.5', 'auto']} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}M`} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: 'none', background: '#141414', color: '#fff' }}
                  formatter={(v: number, key: string) =>
                    key === 'tasa' ? [`${v}%`, 'Tasa mora'] : [`$${v}M`, 'Saldo mora']
                  }
                />
                <Line yAxisId="left" type="monotone" dataKey="tasa" name="tasa" stroke="#FF007F" strokeWidth={3} dot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="saldoMora" name="saldoMora" stroke="#6A0DAD" strokeWidth={2} strokeDasharray="6 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-violet-100/80 bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Composición por antigüedad</CardTitle>
            <CardDescription>Saldo vencido agrupado por días de mora (DPD)</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[220px] h-[240px] sm:h-[280px] md:h-[300px]">
            <ResponsiveContainer width="100%" height="100%" minHeight={200}>
              <BarChart data={bucketComposition} layout="vertical" margin={{ left: 4, right: 12 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eee" />
                <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}M`} />
                <YAxis type="category" dataKey="rango" width={88} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: 'none', background: '#141414', color: '#fff' }}
                  formatter={(v: number, name: string, item: { payload?: { cuentas?: number } }) =>
                    name === 'saldo' ? [`$${v}M`, 'Saldo'] : [String(item?.payload?.cuentas ?? ''), 'Cuentas']
                  }
                />
                <Bar dataKey="saldo" name="Saldo (M USD)" radius={[0, 6, 6, 0]}>
                  {bucketComposition.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-violet-100/80 bg-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Top deudores</CardTitle>
          <CardDescription>Mayores saldos en mora (ordenado por exposición). Documentos parcialmente enmascarados.</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-b">
                <TableHead className="font-bold text-xs uppercase tracking-wider">#</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider">Cliente</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider">Documento</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider">Tipo</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-right">Saldo mora</TableHead>
                <TableHead className="font-bold text-xs uppercase tracking-wider text-right">DPD</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topDeudores.map((row, i) => (
                <TableRow key={row.doc} className="border-b border-gray-100">
                  <TableCell className="text-gray-400 font-mono text-sm">{i + 1}</TableCell>
                  <TableCell className="font-medium max-w-[200px] truncate">{row.nombre}</TableCell>
                  <TableCell className="font-mono text-xs text-gray-600">{row.doc}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[10px]">
                      {row.segmento}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">${row.saldo.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={cn(
                        'font-bold font-mono',
                        row.dpd > 90 ? 'text-red-600' : row.dpd > 60 ? 'text-orange-600' : 'text-amber-700'
                      )}
                    >
                      {row.dpd} d
                    </span>
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
