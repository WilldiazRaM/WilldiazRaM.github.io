import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CasesSection } from "@/components/CasesSection";
import { ServicesSection } from "@/components/ServicesSection";
import { RoiCalculator } from "@/components/RoiCalculator";
import { ProcessSection } from "@/components/ProcessSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { CredentialsSection } from "@/components/CredentialsSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CasesSection />
        <ServicesSection />
        <CredentialsSection />
        <RoiCalculator />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
