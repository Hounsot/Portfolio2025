import SplitText from "@/app/components/SplitText";
import SplitWords from "./SplitWords";
export default function ProjectInfo({ roles, description }) {
    return (
        <div className="flex justify-between flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-2 basis-1/2">
                <p className="text-sm text-zinc-400">My role</p>
                <p className="text-sm text-zinc-50">{roles}</p>
            </div>
            <div className="basis-1/2">
                <SplitWords text={description} durationMs={1000} staggerMs={50} className="text-base md:text-3xl font-bold" />
            </div>
        </div>
    );
}