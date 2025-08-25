import Image from "next/image";

export default function Project({ src, title, subtitle, className, href }) {
  if (href) {
    return (
      <a href={href} className={`flex flex-col gap-2 basis-full lg:basis-[calc(50%-0.625rem)] ${className || ""}`}>
        <div className="relative" style={{ aspectRatio: "16 / 9" }}>
          <Image src={src} alt={title || "Project Cover"} fill className="object-cover" />
        </div>
        <div className="flex justify-between w-fill h-fit">
          <p className="text-base text-zinc-50">{title}</p>
          <p className="text-base text-zinc-400">{subtitle}</p>
        </div>
      </a>
    );
  }
  return (
    <div className={`flex flex-col gap-2 basis-full lg:basis-[calc(50%-0.625rem)] ${className || ""}`}>
      <div className="relative" style={{ aspectRatio: "16 / 9" }}>
        <Image src={src} alt={title || "Project Cover"} fill className="object-cover" />
      </div>
      <div className="flex justify-between w-fill h-fit">
          <p className="text-base text-zinc-50">{title}</p>
          <p className="text-base text-zinc-400">{subtitle}</p>
        </div>
    </div>
  );
}


