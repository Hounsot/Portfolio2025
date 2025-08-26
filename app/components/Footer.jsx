import AnimatedLine from "./AnimatedLine";
import SplitText from "./SplitText";

export default function Footer() {
    return (
        <footer className="flex flex-col gap-10 px-3 md:px-6 py-10 max-w-[1920px] mx-auto">
            <AnimatedLine />
            <div className="flex flex-row justify-between">
                <SplitText text="© 2025 Matt" durationMs={1000} staggerMs={50} className="text-base md:text-3xl min-w-fit" />
                <div className="flex flex-row gap-4 flex-wrap justify-end">
                    <a className="flex items-center justify-center text-base border-1 border-zinc-50 hover:border-zinc-300 hover:text-zinc-300 px-5 py-1 rounded-full" target="_blank" href="https://t.me/hounsout">Telegram</a>
                    <a className="flex items-center justify-center text-base border-1 border-zinc-50 hover:border-zinc-300 hover:text-zinc-300 px-5 py-1 rounded-full" href="mailto:hounsout@yandex.ru">Email</a>
                </div>
            </div>
        </footer>
    );
}