import Hero from "@/components/main/sections/Hero";
import Overview from "@/components/main/sections/Overview";
import HiringVelocity from "@/components/main/sections/HiringVelocity";
import DeliveryPods from "@/components/main/sections/DeliveryPods";
import TalentEcosystem from "@/components/main/sections/TalentEcosystem";
import DualSectorSolutions from "@/components/main/sections/DualSectorSolutions";
import AiHrmsPortal from "@/components/main/sections/AiHrmsPortal";
import SprintWorkflow from "@/components/main/sections/SprintWorkflow";
import WebProjects from "@/components/main/sections/WebProjects";
import ProductSolutions from "@/components/main/sections/ProductSolutions";
import CommercialTerms from "@/components/main/sections/CommercialTerms";
import CtaBanner from "@/components/main/sections/CtaBanner";

export default function MainPage() {
  return (
    <>
      <Hero />
      <Overview />
      <HiringVelocity />
      <DeliveryPods />
      <DualSectorSolutions />
      <SprintWorkflow />
      <ProductSolutions />
      <CommercialTerms />
      <AiHrmsPortal />
      <TalentEcosystem />
      <CtaBanner />
    </>
  );
}
