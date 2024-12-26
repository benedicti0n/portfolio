import React, { ReactNode } from 'react'

const Canvas = ({ children }: { children: ReactNode }) => {
    return (
        <div className='h-screen w-full bg-[#F6EEE3] px-16 py-12'>
            <div className='h-full w-full border-2 border-black'>
                {children}
            </div>
        </div>
    )
}

export default Canvas