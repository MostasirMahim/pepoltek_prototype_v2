import Hero from "@/components/main/sections/Hero";
import Overview from "@/components/main/sections/Overview";
import HiringVelocity from "@/components/main/sections/HiringVelocity";
import DeliveryPods from "@/components/main/sections/DeliveryPods";
import TalentEcosystem from "@/components/main/sections/TalentEcosystem";
import DualSectorSolutions from "@/components/main/sections/DualSectorSolutions";
import SprintWorkflow from "@/components/main/sections/SprintWorkflow";
import WebProjects from "@/components/main/sections/WebProjects";
import ProductSolutions from "@/components/main/sections/ProductSolutions";
import CommercialTerms from "@/components/main/sections/CommercialTerms";

export default function MainPage() {
  return (
    <>
      <Hero />
      <Overview />
      <HiringVelocity />
      <DeliveryPods />
      <TalentEcosystem />
      <DualSectorSolutions />
      <SprintWorkflow />
      <WebProjects />
      <ProductSolutions />
      <CommercialTerms />
    </>
  );
}
