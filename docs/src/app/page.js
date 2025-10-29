import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Installation from "@/components/Installation";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import Support from "@/components/Support";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-gray-100">
      <Header />
      <Hero />
      <Feature />
      <KeyboardShortcuts />
      <Installation />
      <Support />
      <Footer />
    </div>
  );
}
