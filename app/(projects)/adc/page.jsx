import SplitText from "@/app/components/SplitText";
import AnimatedLine from "@/app/components/AnimatedLine";
import ProjectInfo from "@/app/components/ProjectInfo";
import ProjectPresentation from "@/app/components/ProjectPresentation";

const images = [
  { src: "/projects/adc/project_slide_01.png", alt: "adc" },
  { src: "/projects/adc/project_slide_02.png", alt: "adc" },
  { src: "/projects/adc/project_slide_03.png", alt: "adc" },
  { src: "/projects/adc/project_slide_04.png", alt: "adc" },
  { src: "/projects/adc/project_slide_05.png", alt: "adc" },
  { src: "/projects/adc/project_slide_06.png", alt: "adc" },
  { src: "/projects/adc/project_slide_07.png", alt: "adc" },
  { src: "/projects/adc/project_slide_08.png", alt: "adc" },
  { src: "/projects/adc/project_slide_09.png", alt: "adc" },
  { src: "/projects/adc/project_slide_10.png", alt: "adc" },
  { src: "/projects/adc/project_slide_11.png", alt: "adc" },
  { src: "/projects/adc/project_slide_12.png", alt: "adc" },
  { src: "/projects/adc/project_slide_13.png", alt: "adc" }
];

export default function ADC() {
    return (
      <section className="flex flex-col gap-5 px-3 md:px-6 max-w-[1920px] mx-auto">
      <SplitText text="ADC community" className="text-3xl md:text-6xl font-bold" />
      <AnimatedLine />
      <ProjectInfo roles="Branding, UI/UX, Dev, Motion" description="ADC is a community for young designers and developers with unique offers and opportunities to find connections in creative industries." />
      <ProjectPresentation items={images} />
      </section>
    );
  }