import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { SellerForm } from "./components/SellerForm";
import { WhySell } from "./components/WhySell";
import { Process } from "./components/Process";
import { DirectContact } from "./components/DirectContact";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <SellerForm />
      <WhySell />
      <Process />
      <DirectContact />
      <FinalCta />
      <Footer />
    </>
  );
}
