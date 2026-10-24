import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-[#0A0E14] text-white">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#121824] border border-[#1E293B] shadow-2xl text-center space-y-6">
        <div className="size-16 mx-auto rounded-2xl bg-[#0A0E14] border border-[#1E293B] flex items-center justify-center text-2xl font-black text-[#C6F827] shadow-[0_0_25px_rgba(198,248,39,0.25)]">
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#C6F827] to-[#10B981] text-[#0A0E14] font-black text-xs uppercase tracking-wider hover:brightness-110 transition shadow-lg shadow-[#C6F827]/20"
          >
            <span>←</span> Volver al Portal
          </Link>
        </div>
      </div>
    </main>
  );
}
