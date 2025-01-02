const Portrait = () => {
    return (
        <div className='relative w-full border-2 border-black rounded-md'>

            <div className='h-full bg-[#FFD299] rounded-[4px] flex flex-col p-6'>
                <img src="/potrait.jpg" alt="Ashesh Bandopadhyay | Benediction Potrait" className="w-full rounded-md bg-cover" />

                <h1 className="text-black font-[Signature] text-[0.5rem] pt-6 text-center">We are supposed to change</h1>
            </div>


            <span className='absolute -z-10 -right-2 top-2 rounded-r-md h-full w-2 bg-[#2C2C2C]'></span>
            <span className='absolute -z-10 -bottom-2 left-2 rounded-b-md h-4 w-full bg-[#2C2C2C]'></span>
        </div>
    )
}

export default Portrait