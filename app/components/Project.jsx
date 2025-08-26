import Image from "next/image";

export default function Project({ src, title, subtitle, className, href }) {
  if (href) { 
    return (
      <a href={href} className={`flex flex-col gap-2 basis-full lg:basis-[calc(50%-0.625rem)] ${className || ""}`}>
        <div className="relative aspect-16/9">
          <Image src={src} alt={title || "Project Cover"} fill className="object-cover" />
        </div>
        <div className="flex justify-between w-fill h-fit">
          <p className="text-sm sm:text-base text-zinc-50">{title}</p>
          <p className="text-sm sm:text-base text-zinc-400 text-right">{subtitle}</p>
        </div>
      </a>
    );
  }
  return (
    <div className={`flex flex-col gap-2 basis-full lg:basis-[calc(50%-0.625rem)] ${className || ""}`}>
      <div className="group relative aspect-16/9 transition-all duration-300 touch-manipulation" tabIndex={0}>
        <p className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl md:text-3xl 2xl:text-5xl z-50 font-bold text-zinc-50 transition-opacity duration-300">COMING SOON</p>
        <div className="absolute w-full h-full top-0 left-0 z-40 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-100 transition-opacity duration-300 bg-zinc-950/50 backdrop-blur-lg"></div>
        <Image src={src} alt={title || "Project Cover"} fill className="object-cover" />
      </div>
      <div className="flex justify-between w-fill h-fit">
          <p className="text-sm sm:text-base text-zinc-50">{title}</p>
          <p className="text-sm sm:text-base text-zinc-400 text-right">{subtitle}</p>
        </div>
    </div>
  );
}


