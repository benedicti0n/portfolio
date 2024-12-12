import React from 'react'

const Container = () => {
    return (
        <div className='relative h-40 w-80 border-2 border-blue-300 rounded-md flex flex-col'>
            <div className='h-[50px] bg-blue-200 flex justify-center items-center'>
                <h1 className='text-black'>Heading</h1>
            </div>
            <div className='flex-grow flex justify-center items-center overflow-hidden'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis dolore nulla consequuntur, libero eaque adipisci ipsam iure maiores! Q lorem</p>
            </div>

            <span className='absolute -right-2 top-1 rounded-r-md h-40 w-2 bg-blue-300'></span>
            <span className='absolute -bottom-2 left-1 rounded-b-md h-2 w-80 bg-blue-300'></span>
        </div>
    )
}

export default Container