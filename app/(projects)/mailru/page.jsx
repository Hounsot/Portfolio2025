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
        <ProjectInfo roles="Branding" description="Mail.ru is a platform for creating and managing digital products. It allows you to create and manage your digital products in one place." />
        <ProjectPresentation items={images} />
      </section>
    );
  }