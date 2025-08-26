import SplitText from "@/app/components/SplitText";
import AnimatedLine from "@/app/components/AnimatedLine";
import ProjectInfo from "@/app/components/ProjectInfo";
import ProjectPresentation from "@/app/components/ProjectPresentation";

const images = [
  { src: "/projects/dada/project_slide_01.png", alt: "Dada" },
  { src: "/projects/dada/project_slide_02.gif", alt: "Dada" },
  { src: "/projects/dada/project_slide_03.gif", alt: "Dada" },
  { src: "/projects/dada/project_slide_04.gif", alt: "Dada" },
  { src: "/projects/dada/project_slide_05.gif", alt: "Dada" },
  { src: "/projects/dada/project_slide_06.gif", alt: "Dada" },
  { src: "/projects/dada/project_slide_07.gif", alt: "Dada" },
  { src: "/projects/dada/project_slide_08.gif", alt: "Dada" },
  { src: "/projects/dada/project_slide_09.gif", alt: "Dada" },
  { src: "/projects/dada/project_slide_10.gif", alt: "Dada" },
  { src: "/projects/dada/project_slide_11.gif", alt: "Dada" },
];
export default function Dada() {
    return (
      <section className="flex flex-col gap-5 px-3 md:px-6 max-w-[1920px] mx-auto">
        <SplitText text="Neo-Dada Manifesto" className="text-3xl md:text-6xl font-bold" />
        <AnimatedLine />
        <ProjectInfo roles="Motion, Creative coding" description="Freedom: Dada Dada Dada, a roaring of tense colors, and interlacing of opposites and of all contradictions, grotesques, inconsistencies: LIFE" />
        <ProjectPresentation items={images} />
      </section>
    );
  }