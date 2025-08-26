import SplitText from "@/app/components/SplitText";
import AnimatedLine from "@/app/components/AnimatedLine";
import ProjectInfo from "@/app/components/ProjectInfo";
import ProjectPresentation from "@/app/components/ProjectPresentation";

const images = [
  { src: "/projects/postcraft/project_slide_01.png", alt: "Postcraft" },
  { src: "/projects/postcraft/project_slide_02.png", alt: "Postcraft" },
  { src: "/projects/postcraft/project_slide_03.png", alt: "Postcraft" },
  { src: "/projects/postcraft/project_slide_04.png", alt: "Postcraft" }
];
export default function Postcraft() {
    return (
      <section className="flex flex-col gap-5 px-3 md:px-6 max-w-[1920px] mx-auto">
        <SplitText text="Postcraft" className="text-3xl md:text-6xl font-bold" />
        <AnimatedLine />
        <ProjectInfo roles="UI/UX, Dev, Management" description="Figma plugin that converts autolayout frames to email HTML code. Used by multiple companies, achieving up to 72X productivity improvements." />
        <ProjectPresentation items={images} />
      </section>
    );
  }