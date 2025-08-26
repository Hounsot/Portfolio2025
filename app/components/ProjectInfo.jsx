import SplitText from "@/app/components/SplitText";
import SplitWords from "./SplitWords";
export default function ProjectInfo({ roles, description, about = false }) {
    return (
        <div className="flex justify-between flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-4 basis-1/2">
                <div className="flex flex-col gap-1 basis-1/2">
                    <p className="text-sm text-zinc-400">My role</p>
                    <p className="text-base text-zinc-50">{roles}</p>
                </div>
                {about && (
                    <>
                        <div className="flex flex-col gap-1 basis-1/2">
                            <p className="text-sm text-zinc-400">Who I worked with</p>
                            <p className="text-base text-zinc-50">Yandex, VTB, Samolet, PIK, Higher School of Economics, Magnit</p>
                        </div>
                        <div className="flex flex-row gap-2 flex-wrap">
                        <a className="flex items-center justify-center text-base border-1 border-zinc-50 hover:border-zinc-300 hover:text-zinc-300 px-5 py-1 rounded-full" href="/CV.pdf" download>Download CV</a>
                        <a className="flex items-center justify-center text-base border-1 border-zinc-50 hover:border-zinc-300 hover:text-zinc-300 px-5 py-1 rounded-full" target="_blank" href="https://t.me/hounsout">Telegram</a>
                            <a className="flex items-center justify-center text-base border-1 border-zinc-50 hover:border-zinc-300 hover:text-zinc-300 px-5 py-1 rounded-full" href="mailto:hounsout@yandex.ru">Email</a>
                        </div>
                    </>
                )}
            </div>
            <div className="basis-1/2">
                <SplitWords text={description} durationMs={1000} staggerMs={50} className="text-base md:text-3xl font-bold" />
            </div>
        </div>
    );
}