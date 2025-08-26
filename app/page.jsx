import Image from "next/image";
import SplitText from "./components/SplitText";
import Project from "./components/Project";
export default function Home() {
  return (
    <section className="flex flex-col gap-5 px-3 md:px-6 max-w-[1920px] mx-auto">
      <SplitText text="Projects" className="text-3xl md:text-6xl font-bold" />
      <div id="profiles" className="flex flex-row flex-wrap gap-5 w-fill h-fit">
        <Project href="/parametr" src="/parametrCover.png" title="Parametr website" subtitle="UI/UX, Communication" />
        <Project href="/adc" src="/adcCover.png" title="ADC community" subtitle="Branding, UI/UX, Dev, Motion" />
        <Project href="/postcraft" src="/postcraftCover.png" title="Postcraft — figma HTML generator" subtitle="UI/UX, Dev, Management" />
        <Project href="/babank" src="/babankCover.png" title="BaBank" subtitle="UI/UX, Digital" />
        <Project href="/pik_hr" src="/pikHrCover.png" title="PIK x HH.RU — HR multi-platform" subtitle="UI, Web, Management" />
        <Project href="/adc_hub" src="/adcHubCover.png" title="ADC Hub — social network" subtitle="Branding, UI/UX, Dev, Motion" />
        <Project href="" src="/samoletCover.png" title="Samolet — COMING SOON" subtitle="UI/UX, Digital, Dev" />
        <Project href="" src="/marketCover.png" title="Yandex Market — COMING SOON" subtitle="UI/UX" />
        <Project href="/mailru" src="/mailCover.png" title="Mail.ru — rebranding concept" subtitle="Branding" />
        <Project href="/dada" src="/dadaCover.png" title="Neo-Dada Manifesto" subtitle="Motion, Creative coding" />
      </div>
    </section>
  );
}
