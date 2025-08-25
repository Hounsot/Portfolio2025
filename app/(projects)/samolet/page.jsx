import SplitText from "@/app/components/SplitText";
import AnimatedLine from "@/app/components/AnimatedLine";
import ProjectInfo from "@/app/components/ProjectInfo";
export default function Samolet() {
    return (
      <section className="flex flex-col gap-5 px-3 md:px-6">
        <SplitText text="Samolet" className="text-3xl md:text-6xl font-bold" />
        <AnimatedLine />
        <ProjectInfo roles="UI/UX, Dev" description="Samolet is a platform for creating and managing digital products. It allows you to create and manage your digital products in one place." />
      </section>
    );
  }