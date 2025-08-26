export default function Header({ children }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[999] flex bg-zinc-950 justify-between items-center px-3 md:px-6 h-16 max-w-[1920px] mx-auto">
        <a className="flex flex-col text-sm relative" href="/">
            <p>
                Matvey Vasilyev
            </p>
            <p className="absolute">
                Matvey Vasilyev
            </p>
        </a>
        <div className="flex gap-4">
        <a className="flex flex-col text-sm relative" href="/">
            <p>
                Works
            </p>
            <p className="absolute">
                Works
            </p>
        </a>
        <a className="flex flex-col text-sm relative" href="/about">
            <p>
                About
            </p>
            <p className="absolute">
                About
            </p>
        </a>
        </div>
    </header>
  );
}


