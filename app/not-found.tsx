import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#0A0E14] text-white">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#121824] border border-[#1E293B] shadow-lg text-center space-y-6">
        <div className="size-16 mx-auto rounded-2xl bg-[#0D121B] border border-[#1E293B] flex items-center justify-center text-2xl font-bold text-white shadow-sm">
          404
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight text-white">Ruta no encontrada</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            El endpoint o página solicitada no existe o fue reubicada en el gateway.
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm"
          >
            <span>←</span> Volver al Portal
          </Link>
        </div>
      </div>
    </main>
  );
}
