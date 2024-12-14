import React, { ReactNode } from 'react'

const DottedBg = ({ children }: { children: ReactNode }) => {
    return (
        <div className="h-full w-full dark:bg-black bg-white dark:bg-dot-white bg-dot-black absolute -z-10 flex items-center justify-center">
            {children}
        </div>
    )
}

export default DottedBg