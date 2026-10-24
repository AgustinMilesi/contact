import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0E14] text-slate-100 flex flex-col justify-between">
      <ContactForm />
    </main>
  );
}