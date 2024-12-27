import { ReactNode } from "react";

function DottedBg({ children }: { children: ReactNode }) {
    return (
        <div className="h-full w-full pt-6 pb-2">
            <div className="h-full w-full z-10 bg-dot-[#BBBBBB] relative p-4">
                {children}
            </div>
        </div>
    );
}

export default DottedBg