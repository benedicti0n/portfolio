import React, { ReactNode } from "react";

function DottedBg({ children }: { children: ReactNode }) {
    return (
        <div className="h-full z-10 w-full bg-dot-black relative flex items-center justify-center">
            {children}
        </div>
    );
}

export default DottedBg