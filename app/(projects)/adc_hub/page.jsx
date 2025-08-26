import SplitText from "@/app/components/SplitText";
import AnimatedLine from "@/app/components/AnimatedLine";
import ProjectInfo from "@/app/components/ProjectInfo";
import ProjectPresentation from "@/app/components/ProjectPresentation";

const images = [
  { src: "/projects/adchub/AdcHubCover.png", alt: "ADC Hub" },
  { videoSrc: "https://kinescope.io/tFYxxS3JPzUYwsfLRaJFXx", alt: "ADC Hub" },
  { videoSrc: "https://kinescope.io/oBiT1MPAssCjLPsGCDTKBf", alt: "ADC Hub" },
  { videoSrc: "https://kinescope.io/kDipHTwUc2JzVUpFpv4bJT", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_01.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_02.png", alt: "ADC Hub" },
  { videoSrc: "https://kinescope.io/vvpPhpeC7EYqN6PDQ3ryU1", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_03.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_04.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_05.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_06.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_07.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_08.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_09.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_10.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_11.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_12.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_13.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_14.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_15.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_16.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_17.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_18.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_19.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_20.png", alt: "ADC Hub" },
  { src: "/projects/adchub/project_slide_21.png", alt: "ADC Hub" },
  { videoSrc: "https://kinescope.io/7cYhUzJv2cftEZZUPjD6MS", alt: "ADC Hub" },
  { videoSrc: "https://kinescope.io/pfY95xXzTWkVjQDHNvwMhG", alt: "ADC Hub" },
  { videoSrc: "https://kinescope.io/7owqAHr8kb6gyVjG78WUXJ", alt: "ADC Hub" }
];
export default function ADC_Hub() {
    return (
      <section className="flex flex-col gap-5 px-3 md:px-6 max-w-[1920px] mx-auto">
        <SplitText text="ADC Hub" className="text-3xl md:text-6xl font-bold" />
        <AnimatedLine />
        <ProjectInfo roles="Branding, UI/UX, Dev, Motion" description="ADC Hub is a service hub for young designers with unique offers and networking opportunities. Full project delivery included promotion, design, and development." />
        <ProjectPresentation items={images} />
      </section>
    );
  }