import SplitText from "@/app/components/SplitText";
import AnimatedLine from "@/app/components/AnimatedLine";
import ProjectInfo from "@/app/components/ProjectInfo";
import ProjectPresentation from "@/app/components/ProjectPresentation";

const images = [
  { src: "/projects/parametr/project_slide_01.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_02.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_03.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_04.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_05.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_06.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_07.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_08.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_09.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_10.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_11.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_12.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_13.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_14.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_15.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_16.png", alt: "Parametr" },
  { src: "/projects/parametr/project_slide_17.png", alt: "Parametr" }
];
export default function Parametr() {
  return (
    <section className="flex flex-col gap-5 px-3 md:px-6 max-w-[1920px] mx-auto">
      <SplitText text="Parametr website" className="text-3xl md:text-6xl font-bold" />
      <AnimatedLine />
      <ProjectInfo roles="UI/UX, Communication" description="Parametr is a platform for creating and managing digital products. It allows you to create and manage your digital products in one place." />
      <ProjectPresentation items={images} />
    </section>
);
}