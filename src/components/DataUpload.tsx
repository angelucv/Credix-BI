import React, { useState } from 'react';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  Loader2,
  Database,
  Globe,
  Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function DataUpload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState({
    ubii_active: null,
    ubii_mora: null,
    ubii_history: null,
    fibex: null,
  });

  const handleProcess = async () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Mock data that would normally come from the uploaded files
    const mockClients = [
      { id: '1', name: 'Juan Perez', yearsActive: 5, moraDays: 0, isFibex: true },
      { id: '2', name: 'Maria Garcia', yearsActive: 2, moraDays: 15, isFibex: false },
      { id: '3', name: 'Carlos Rodriguez', yearsActive: 1, moraDays: 95, isFibex: true },
      { id: '4', name: 'Ana Martinez', yearsActive: 8, moraDays: 0, isFibex: true },
    ];

    try {
      // Simulate progress steps
      const steps = [20, 45, 70, 90];
      for (const step of steps) {
        setProgress(step);
        await new Promise(resolve => setTimeout(resolve, 400));
      }

      const response = await fetch('/api/process-scoring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clients: mockClients }),
      });
      
      const data = await response.json();
      console.log('Scoring Results:', data.results);
      
      setProgress(100);
      setTimeout(() => setIsProcessing(false), 500);
      
    } catch (error) {
      console.error('Error processing scoring:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">Carga de Fuentes de Datos</h2>
          <p className="text-sm text-gray-500">Sube los archivos de Ubii y Fibex para iniciar el proceso de scoring.</p>
        </div>
        <Button 
          onClick={handleProcess} 
          disabled={isProcessing}
          className="w-full shrink-0 bg-gradient-to-r from-[#FF007F] to-[#a855f7] px-6 font-bold text-white shadow-md shadow-fuchsia-900/15 hover:from-[#e11d8c] hover:to-[#9333ea] sm:w-auto sm:px-8"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Procesando...
            </>
          ) : (
            'Iniciar Pipeline'
          )}
        </Button>
      </div>

      {isProcessing && (
        <Card className="border-fuchsia-200/80 bg-gradient-to-br from-fuchsia-50/90 to-violet-50/70">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-[#9d174d] uppercase tracking-wider">Progreso del Pipeline</span>
              <span className="text-sm font-bold text-[#7c3aed]">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-fuchsia-100" />
            <div className="mt-4 grid grid-cols-4 gap-4 text-[10px] font-bold uppercase tracking-widest text-[#c026d3]">
              <div className={cn("flex items-center gap-2", progress > 25 ? "opacity-100" : "opacity-30")}>
                <CheckCircle2 className="w-3 h-3" /> Limpieza
              </div>
              <div className={cn("flex items-center gap-2", progress > 50 ? "opacity-100" : "opacity-30")}>
                <CheckCircle2 className="w-3 h-3" /> Cruce
              </div>
              <div className={cn("flex items-center gap-2", progress > 75 ? "opacity-100" : "opacity-30")}>
                <CheckCircle2 className="w-3 h-3" /> Scoring
              </div>
              <div className={cn("flex items-center gap-2", progress === 100 ? "opacity-100" : "opacity-30")}>
                <CheckCircle2 className="w-3 h-3" /> Consolidación
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <SourceCard 
          title="Ubii - Carteras" 
          description="Líneas activas, mora y cuotas históricas"
          icon={Database}
          files={[
            { id: 'ubii_active', label: 'Cartera Activa (.xlsx)', status: 'ready' },
            { id: 'ubii_mora', label: 'Cartera en Mora (.xlsx)', status: 'ready' },
            { id: 'ubii_history', label: 'Cuotas Históricas (.xlsx)', status: 'pending' },
          ]}
        />
        <SourceCard 
          title="FIBEX - Clientes" 
          description="Base de datos de clientes Fibex"
          icon={Users}
          files={[
            { id: 'fibex', label: 'Clientes Fibex (.csv)', status: 'ready' },
          ]}
        />
        <SourceCard 
          title="Web Form" 
          description="Solicitudes desde el formulario web"
          icon={Globe}
          status="connected"
          files={[
            { id: 'web_form', label: 'Conexión Directa API', status: 'active' },
          ]}
        />
        <Card className="border-dashed border-2 flex flex-col items-center justify-center p-8 bg-gray-50/50">
          <div className="bg-white p-4 rounded-full shadow-sm mb-4">
            <Upload className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-bold text-gray-900">Arrastra archivos aquí</h3>
          <p className="text-xs text-gray-500 mt-1">Soporta .xlsx, .xls y .csv</p>
          <Button variant="outline" className="mt-4 border-gray-300">Seleccionar Archivos</Button>
        </Card>
      </div>
    </div>
  );
}

function SourceCard({ title, description, icon: Icon, files, status }: any) {
  return (
    <Card className="border-[#E4E3E0]/10 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <div className="p-1.5 bg-gray-100 rounded-md">
              <Icon className="w-4 h-4 text-gray-600" />
            </div>
            {title}
          </CardTitle>
          <CardDescription className="text-xs">{description}</CardDescription>
        </div>
        {status === 'connected' && (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100">
            Conectado
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {files.map((file: any) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className={cn("w-4 h-4", file.status === 'ready' ? "text-emerald-500" : "text-gray-400")} />
                <span className="text-xs font-medium text-gray-700">{file.label}</span>
              </div>
              {file.status === 'ready' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : file.status === 'active' ? (
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">Live</span>
                </div>
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-500" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
