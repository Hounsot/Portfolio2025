import SplitText from "@/app/components/SplitText";
import AnimatedLine from "@/app/components/AnimatedLine";
import ProjectInfo from "@/app/components/ProjectInfo";
export default function Mailru() {
    return (
      <section className="flex flex-col gap-5 px-3 md:px-6">
        <SplitText text="Mail.ru" className="text-3xl md:text-6xl font-bold" />
        <AnimatedLine />
        <ProjectInfo roles="Branding" description="Mail.ru is a platform for creating and managing digital products. It allows you to create and manage your digital products in one place." />
      </section>
    );
  }