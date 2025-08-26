import SplitText from "@/app/components/SplitText";
import AnimatedLine from "@/app/components/AnimatedLine";
import ProjectInfo from "@/app/components/ProjectInfo";
import ProjectPresentation from "@/app/components/ProjectPresentation";

const images = [
  { src: "/projects/pik_hr/project_slide_01.png", alt: "Parametr" },
  { src: "/projects/pik_hr/project_slide_02.png", alt: "Parametr" },
  { src: "/projects/pik_hr/project_slide_03.png", alt: "Parametr" },
  { src: "/projects/pik_hr/project_slide_04.png", alt: "Parametr" },
  { src: "/projects/pik_hr/project_slide_05.png", alt: "Parametr" },
  { src: "/projects/pik_hr/project_slide_06.png", alt: "Parametr" },
  { src: "/projects/pik_hr/project_slide_07.png", alt: "Parametr" },
];
export default function PikHR() {
  return (
    <section className="flex flex-col gap-5 px-3 md:px-6 max-w-[1920px] mx-auto">
      <SplitText text="Pik HR" className="text-3xl md:text-6xl font-bold" />
      <AnimatedLine />
      <ProjectInfo roles="UI/UX, Communication" description="A unified design system for numerous PIK units, ensuring consistent hr/brand communication across the entire company ecosystem." />
      <ProjectPresentation items={images} />
    </section>
);
}