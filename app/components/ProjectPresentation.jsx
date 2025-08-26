import Image from "next/image";

export default function ProjectPresentation({ items = [] }) {
    const list = Array.isArray(items)
        ? items
        : items && typeof items === "object"
            ? Object.values(items)
            : [];

    return (
        <div className="flex flex-col gap-5">
            {list.map((item, index) => {
                const src = item?.url || item?.src;
                const alt = item?.alt || "";
                const videoSrc = item?.videoSrc || (item?.type === "video" ? src : undefined);
                if (videoSrc) {
                    return (
                        <div key={`video-${index}`} className="relative w-full aspect-16/9">
                            <iframe
                                src={videoSrc}
                                allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
                                frameBorder="0"
                                allowFullScreen
                                style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
                            />
                        </div>
                    );
                }
                return (
                    <div key={`image-${index}`} className="relative w-full aspect-16/9">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            sizes="100vw"
                            className="object-cover"
                        />
                    </div>
                );
            })}
        </div>
    );
}