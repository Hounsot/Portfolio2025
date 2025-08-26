import SplitText from "@/app/components/SplitText";
import AnimatedLine from "@/app/components/AnimatedLine";
import ProjectInfo from "@/app/components/ProjectInfo";
import ProjectPresentation from "@/app/components/ProjectPresentation";

const images = [
  { src: "/projects/mailru/project_slide_01.png", alt: "Mail.ru" },
  { src: "/projects/mailru/project_slide_02.png", alt: "Mail.ru" },
  { src: "/projects/mailru/project_slide_03.png", alt: "Mail.ru" },
  { src: "/projects/mailru/project_slide_04.png", alt: "Mail.ru" },
  { src: "/projects/mailru/project_slide_05.png", alt: "Mail.ru" },
  { src: "/projects/mailru/project_slide_06.png", alt: "Mail.ru" }
];
export default function Mailru() {
    return (
      <section className="flex flex-col gap-5 px-3 md:px-6 max-w-[1920px] mx-auto">
        <SplitText text="Mail.ru" className="text-3xl md:text-6xl font-bold" />
        <AnimatedLine />
        <ProjectInfo roles="Branding, Digital" description="As part of a closed competition, our team developed a design concept for Mail.ru. The project focused on modernizing the visual identity." />
        <ProjectPresentation items={images} />
      </section>
    );
  }