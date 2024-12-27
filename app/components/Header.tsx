const Header = () => {
    const getCurrentDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad
        const year = today.getFullYear(); // Get full year
        return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
    }

    return (
        <div className="w-full flex">
            <div className="w-1/2">
                <h1 className="text-black text-5xl font-[Sinosans]">Ashesh</h1>
                <h1 className="text-black text-5xl font-[Sinosans]">Bandopadhyay</h1>
            </div>

            <div className="w-1/2 flex justify-end">
                <div className='text-black flex flex-col h-full'>
                    <div className='h-1/2 flex'>
                        <div className='relative'>
                            <h1 className='font-[Sinosans] text-xl pt-5'>Date: </h1>
                            <span className='h-[2px] w-full bg-black absolute bottom-0'></span>
                        </div>
                        <div className='relative'>
                            <h1 className='font-[Signature] pt-5 px-12'>{getCurrentDate()}</h1>
                            <span className='h-[2px] w-full bg-black absolute bottom-0'></span>
                        </div>
                    </div>
                    <div className='h-1/2 flex'>
                        <div className='relative'>
                            <h1 className='font-[Sinosans] text-xl pt-5'>Project: </h1>
                            <span className='h-[2px] w-full bg-black absolute bottom-0'></span>
                        </div>
                        <div className='relative'>
                            <h1 className='font-[Signature] pt-5 px-12'>Portfolio</h1>
                            <span className='h-[2px] w-full bg-black absolute bottom-0'></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Header