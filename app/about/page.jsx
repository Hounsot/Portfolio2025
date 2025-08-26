import SplitText from "@/app/components/SplitText";
import AnimatedLine from "@/app/components/AnimatedLine";
import ProjectInfo from "@/app/components/ProjectInfo";
import ProjectPresentation from "@/app/components/ProjectPresentation";

const images = [
  { src: "/me.png", alt: "Photo of me presenting my project on a conference" },
];
export default function About() {
  return (
    <section className="flex flex-col gap-5 px-3 md:px-6 max-w-[1920px] mx-auto min-h-[70vh] md:min-h-fit">
      <SplitText text="Matvey Vasilyev" className="text-3xl md:text-6xl font-bold" />
      <AnimatedLine />
      <ProjectInfo roles="Lead digital designer @ PIK && Lecturer @ HSE" description="Lead digital designer, HSE Design alumni. Specializing in UI/UX, web, AI and workflow automation." about={true} />
      <ProjectPresentation items={images} />
    </section>
);
}