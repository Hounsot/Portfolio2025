import SplitText from "@/app/components/SplitText";
import AnimatedLine from "@/app/components/AnimatedLine";
import ProjectInfo from "@/app/components/ProjectInfo";
import ProjectPresentation from "@/app/components/ProjectPresentation";

const images = [
  { src: "/projects/postcraft/project_slide_01.png", alt: "Postcraft" },
];
export default function Postcraft() {
    return (
      <section className="flex flex-col gap-5 px-3 md:px-6 max-w-[1920px] mx-auto">
        <SplitText text="Postcraft" className="text-3xl md:text-6xl font-bold" />
        <AnimatedLine />
        <ProjectInfo roles="UI/UX, Dev, Management" description="Postcraft is a platform for creating and managing digital products. It allows you to create and manage your digital products in one place." />
        <ProjectPresentation items={images} />
      </section>
    );
  }