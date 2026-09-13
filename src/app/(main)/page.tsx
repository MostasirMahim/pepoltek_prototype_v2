import Hero from "@/components/main/sections/Hero";
import SpecialistDeliveryTracks from "@/components/main/sections/SpecialistDeliveryTracks";
import HiringVelocity from "@/components/main/sections/HiringVelocity";
import CommercialTerms from "@/components/main/sections/CommercialTerms";
import SprintExecutionMatrix from "@/components/main/sections/SprintExecutionMatrix";
import AiHrmsPortal from "@/components/main/sections/AiHrmsPortal";
import ProductSolutions from "@/components/main/sections/ProductSolutions";
import TalentEcosystem from "@/components/main/sections/TalentEcosystem";
import CtaBanner from "@/components/main/sections/CtaBanner";

export default function MainPage() {
  return (
    <>
      <Hero />
      <SpecialistDeliveryTracks />
      <SprintExecutionMatrix />
      <HiringVelocity />
      <CommercialTerms />
      <AiHrmsPortal />
      <ProductSolutions />
      <TalentEcosystem />
      <CtaBanner />
    </>
  );
}
