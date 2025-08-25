import SplitText from "@/app/components/SplitText";
import AnimatedLine from "@/app/components/AnimatedLine";
import ProjectInfo from "@/app/components/ProjectInfo";
export default function Dada() {
    return (
      <section className="flex flex-col gap-5 px-3 md:px-6">
        <SplitText text="Neo-Dada Manifesto" className="text-3xl md:text-6xl font-bold" />
        <AnimatedLine />
        <ProjectInfo roles="Motion, Creative coding" description="Neo-Dada Manifesto is a platform for creating and managing digital products. It allows you to create and manage your digital products in one place." />
      </section>
    );
  }