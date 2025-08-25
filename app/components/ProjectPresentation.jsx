import Image from "next/image";

export default function ProjectPresentation({ items = [], className, sizes = "100vw" }) {
    const list = Array.isArray(items)
        ? items
        : items && typeof items === "object"
            ? Object.values(items)
            : [];

    return (
        <div className={className}>
            {list.map((item, index) => {
                const src = item?.url || item?.src;
                const alt = item?.alt || "";
                const aspectRatio = item?.aspectRatio
                    || (item?.width && item?.height ? `${item.width} / ${item.height}` : "16 / 9");
                return (
                    <div key={`${src || "image"}-${index}`} className="relative w-full aspect-16/9">
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            sizes={sizes}
                            className="object-cover"
                        />
                    </div>
                );
            })}
        </div>
    );
}