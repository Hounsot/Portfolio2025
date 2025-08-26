import SplitText from "@/app/components/SplitText";
import AnimatedLine from "@/app/components/AnimatedLine";
import ProjectInfo from "@/app/components/ProjectInfo";
import ProjectPresentation from "@/app/components/ProjectPresentation";

const images = [
  { src: "/projects/babank/project_slide_01.png", alt: "Babank" },
  { src: "/projects/babank/project_slide_02.png", alt: "Babank" },
  { src: "/projects/babank/project_slide_03.png", alt: "Babank" },
  { src: "/projects/babank/project_slide_04.png", alt: "Babank" },
  { src: "/projects/babank/project_slide_05.png", alt: "Babank" },
  { src: "/projects/babank/project_slide_06.png", alt: "Babank" },
  { src: "/projects/babank/project_slide_07.png", alt: "Babank" },
  { src: "/projects/babank/project_slide_08.png", alt: "Babank" },
  { src: "/projects/babank/project_slide_09.png", alt: "Babank" },
  { src: "/projects/babank/project_slide_10.png", alt: "Babank" },
  { src: "/projects/babank/project_slide_11.png", alt: "Babank" },
  { src: "/projects/babank/project_slide_12.png", alt: "Babank" },
  { src: "/projects/babank/project_slide_13.png", alt: "Babank" }
];

export default function Babank() {
    return (
      <section className="flex flex-col gap-5 px-3 md:px-6 max-w-[1920px] mx-auto">
        <SplitText text="Babank" className="text-3xl md:text-6xl font-bold" />
        <AnimatedLine />
        <ProjectInfo roles="Branding, UI/UX, Dev, Motion" description="Babank is a platform for creating and managing digital products. It allows you to create and manage your digital products in one place." />
        <ProjectPresentation items={images} />
      </section>
    );
  }